const fs = require("fs");
const humps = require("humps");
const path = require("path");

const selectors = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "../node_modules/mdn-data/css/selectors.json")
  )
);

const pseudos = Object.keys(selectors)
  .filter(key => {
    const { syntax, groups, status } = selectors[key];
    return (
      key === syntax &&
      status === "standard" &&
      groups[0] === "Pseudo-classes" &&
      groups[1] === "Selectors" &&
      groups.length === 2
    );
  })
  .map(key => selectors[key]);

fs.writeFileSync(
  path.join(__dirname, "../src/default-pseudos.js"),
  `
export default {
${pseudos
  .map(
    pseudo =>
      `  ${humps.pascalize(pseudo.syntax.substr(1))}: "${pseudo.syntax}"`
  )
  .join(",\n")}
}
`
);
