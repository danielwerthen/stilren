const fs = require("fs");
const humps = require("humps");
import path from "path";

const prefixes = Object.keys(process.env)
  .filter(key => key.startsWith("npm_package_stilren_mediaPrefixes"))
  .reduce((sum, key) => {
    const target = key.replace("npm_package_stilren_mediaPrefixes_", "");
    return Object.assign(sum, { [target]: process.env[key] });
  }, {});

const pseudoSuffixes = (
  process.env.npm_package_stilren_pseudoSuffixes || ""
).split(",");

const properties = JSON.parse(
  fs.readFileSync(require.resolve("mdn-data/css/properties.json"), "utf8")
);

console.log(properties);
