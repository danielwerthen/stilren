import { createParser } from "./Parser";
import Node from "./Node";
import defaultPseudos from "./default-pseudos";
import { PseudoModifier, MediaModifier } from "./Modifier";

const defaultMediaPrefixes = Object.keys(process.env)
  .filter(key => key.startsWith("npm_package_stilren_mediaPrefixes"))
  .reduce((sum, key) => {
    const target = key.replace("npm_package_stilren_mediaPrefixes_", "");
    return Object.assign(sum, { [target]: process.env[key] });
  }, {});

export function createTransformer({
  mediaPrefixes = defaultMediaPrefixes,
  pseudoSuffixes = defaultPseudos
}: {
  mediaPrefixes?: { [key: string]: string };
  pseudoSuffixes?: { [key: string]: string };
}) {
  const parser = createParser(
    Object.keys(mediaPrefixes).reduce(
      (sum, key) => ({
        ...sum,
        [key]: new MediaModifier(mediaPrefixes[key])
      }),
      {}
    ),
    Object.keys(pseudoSuffixes).reduce(
      (sum, key) => ({
        ...sum,
        [key]: new PseudoModifier(pseudoSuffixes[key])
      }),
      {}
    )
  );

  function transform(props: { [key: string]: unknown }) {
    const node = new Node();
    for (var key in props) {
      if (props.hasOwnProperty(key)) {
        const value = props[key];
        const [inner, mods] = parser(key);
        node.set(inner, value, mods);
      }
    }
    return node.props;
  }

  return transform;
}
