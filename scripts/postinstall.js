const fs = require("fs");
const humps = require("humps");
const path = require("path");
const recast = require("recast");

const input = recast.parse(
  fs.readFileSync(path.join(__dirname, "../node_modules/csstype/index.d.ts")),
  {
    parser: require("recast/parsers/typescript")
  }
);
const csstypes = input.program.body
  .filter(
    node =>
      node.declaration && node.declaration.type === "TSTypeAliasDeclaration"
  )
  .map(node => node.declaration)
  .filter(node => node.id.name.endsWith("Property"))
  .filter(
    node =>
      !node.id.name.startsWith("Ms") &&
      !node.id.name.startsWith("Moz") &&
      !node.id.name.startsWith("Webkit")
  )
  .map(decl => ({
    name: decl.id.name,
    params:
      (decl.typeParameters &&
        decl.typeParameters.params.map(param => param.name)) ||
      []
  }));

const mediaPrefixes = Object.keys(process.env)
  .filter(key => key.startsWith("npm_package_stilren_mediaPrefixes"))
  .reduce((sum, key) => {
    const target = key.replace("npm_package_stilren_mediaPrefixes_", "");
    return Object.assign(sum, { [target]: process.env[key] });
  }, {});

const prefixes = Object.keys(mediaPrefixes);

const pseudoSuffixes = (
  process.env.npm_package_stilren_pseudoSuffixes || ""
).split(",");

function spreadIxes(prop) {
  return [
    prop,
    ...prefixes.map(pre => `${pre}${humps.pascalize(prop)}`),
    ...pseudoSuffixes.map(suf => `${prop}${humps.pascalize(suf)}`)
  ];
}

const allProperties = csstypes.map(({ name, params }) => ({
  propName: humps.camelize(name.substr(0, name.length - "Property".length)),
  typeName: name,
  typeInstance: params.length > 0 ? `${name}<${params.join(", ")}>` : name
}));

const props = allProperties
  .flatMap(({ propName, typeInstance }) =>
    spreadIxes(propName).map(name => `$${name}?: ${typeInstance}`)
  )
  .join("\n      ");
const typeImports = [
  ...allProperties.reduce((sum, { typeName }) => sum.add(typeName), new Set())
].join(",\n      ");

const typeDef = `
  import 'react'
  import {
    ${typeImports}
  } from 'csstype'

  declare module 'react' {
    interface HTMLAttributes<T> {
      ${props}
    }
  }
`;

fs.writeFileSync(path.join(__dirname, "../dist/types.d.ts"), typeDef);
