import { MediaModifier, PseudoModifier } from './Modifier';
import Node from './Node';

function isUpperCase(str) {
  return str !== str.toLowerCase() && str === str.toUpperCase();
}

export function parseKey(key, keys, modifiers) {
  const match = keys.find(item => {
    return (
      key.startsWith(item) &&
      key.length > item.length &&
      isUpperCase(key[item.length])
    );
  });
  if (match) {
    const modifier = modifiers[match];
    const inner = parseKey(
      key[match.length].toLowerCase() + key.slice(match.length + 1),
      keys,
      modifiers
    );
    return [...inner, modifier];
  }
  return [key];
}

function cache(fn) {
  const store = {};
  return (key, ...args) => {
    if (!store[key]) {
      store[key] = fn(key, ...args);
    }
    return store[key];
  };
}

export default function createTransformer(options) {
  const { breakpoints = {}, pseudos = [] } = options;
  const modifiers = {};
  for (var point in breakpoints) {
    modifiers[point] = new MediaModifier(breakpoints[point]);
  }
  for (var key in pseudos) {
    const pseudo = pseudos[key];
    modifiers[pseudo] = new PseudoModifier(pseudo);
  }

  const keys = Object.keys(modifiers);
  const parse = cache(parseKey);

  return extender => {
    function transform(props, output = new Node()) {
      for (var key in props) {
        const [innerKey, ...mods] = parse(key, keys, modifiers);
        const value = props[key];
        if (
          Reflect.has(extender, innerKey) &&
          typeof extender[innerKey] === 'function'
        ) {
          const result = extender[innerKey](value);
          if (typeof result === 'object') {
            transform(result, output.getNode(mods));
          } else {
            output.set(innerKey, result, mods);
          }
        } else {
          output.set(innerKey, value, mods);
        }
      }
      return output.props;
    }
    return transform;
  };
}
