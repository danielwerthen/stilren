const fs = require("fs");
const humps = require("humps");
const path = require("path");
const recast = require("recast");

const input = recast.parse(
  fs.readFileSync(path.join(__dirname, "../node_modules/csstype/index.d.ts")),
  {
    parser: require("recast/parsers/typescript"),
  }
);

function mapPropSig(propSig) {
  return {
    name: propSig.key.name,
    type: propSig.typeAnnotation.typeAnnotation.typeName.right.name,
    typeArg:
      propSig.typeAnnotation.typeAnnotation.typeParameters &&
      propSig.typeAnnotation.typeAnnotation.typeParameters.params[0].typeName
        .name,
    comment:
      propSig.comments && propSig.comments[0] && propSig.comments[0].value,
  };
}

const allProps = input.program.body
  .filter(
    (node) =>
      node.declaration &&
      node.declaration.id.name.startsWith("Standard") &&
      node.declaration.id.name.endsWith("handProperties")
  )
  .reduce((sum, node) => [...sum, ...node.declaration.body.body], [])
  .map(mapPropSig);

const allSvgProps = input.program.body
  .filter(
    (node) => node.declaration && node.declaration.id.name === "SvgProperties"
  )
  .reduce((sum, node) => [...sum, ...node.declaration.body.body], [])
  .map(mapPropSig);

function renderProp(prop) {
  if (prop.name === "animationName") {
    return `$${prop.name}?: Property.${prop.type}${
      prop.typeArg ? `<${prop.typeArg}>` : ""
    } | { [key: string]: StandardProperties<TLength, TTime> };`;
  }
  if (prop.name === "fontFamily") {
    return `$${prop.name}?: Property.${prop.type}${
      prop.typeArg ? `<${prop.typeArg}>` : ""
    } | { src: string };`;
  }

  return `$${prop.name}?: Property.${prop.type}${
    prop.typeArg ? `<${prop.typeArg}>` : ""
  };`;
}

const props = allProps.reduce(
  (sum, prop) => [
    ...sum,
    prop.comment &&
      `/*${prop.comment
        .split("\n")
        .map((str) => `  ${str}`)
        .join("\n")}*/`,
    renderProp(prop),
  ],
  []
);
const svgProps = allSvgProps.reduce(
  (sum, prop) => [
    ...sum,
    ...[
      prop.comment &&
        `/*${prop.comment
          .split("\n")
          .map((str) => `  ${str}`)
          .join("\n")}*/`,
      renderProp(prop),
    ].filter((id) => id),
  ],
  []
);

const typeDef = [
  'import "react";',
  'import { Property, StandardProperties } from "csstype";',
  "",
  `declare module "react" {`,
  "  type TLength = (string & {}) | 0;",
  "  type TTime = string & {};",
  "  interface HTMLAttributes<T> {",
  ...props.map((p) => `    ${p}`),
  "    [key: string]: unknown;",
  "  }",
  "  interface SVGAttributes<T> {",
  ...svgProps.map((p) => `    ${p}`),
  "    [key: string]: unknown;",
  "  }",
  "}",
].join("\n");

fs.writeFileSync(path.join(__dirname, "../dist/types.d.ts"), typeDef);
