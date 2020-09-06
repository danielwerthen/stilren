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

const allProps = input.program.body
  .filter(
    (node) =>
      node.declaration &&
      node.declaration.id.name.startsWith("Standard") &&
      node.declaration.id.name.endsWith("handProperties")
  )
  .reduce((sum, node) => [...sum, ...node.declaration.body.body], [])
  .map((propSig) => ({
    name: propSig.key.name,
    type: propSig.typeAnnotation.typeAnnotation.typeName.name,
    typeArg:
      propSig.typeAnnotation.typeAnnotation.typeParameters &&
      propSig.typeAnnotation.typeAnnotation.typeParameters.params[0].typeName
        .name,
    comment: propSig.comments[0].value,
  }));

const typeImports = allProps.map((p) => p.type).join(",\n  ");
const props = allProps.reduce(
  (sum, prop) => [
    ...sum,
    `/*${prop.comment
      .split("\n")
      .map((str) => `  ${str}`)
      .join("\n")}*/`,
    `$${prop.name}?: ${prop.type}${prop.typeArg ? `<${prop.typeArg}>` : ""},`,
  ],
  []
);

const typeDef = [
  'import "react"',
  "import {",
  "  " + typeImports,
  '} from "csstype"',
  "",
  'declare module "react" {',
  "  interface HTMLAttributes<T> {",
  ...props.map((p) => `    ${p}`),
  "  }",
  "}",
].join("\n");

fs.writeFileSync(path.join(__dirname, "../dist/types.d.ts"), typeDef);
