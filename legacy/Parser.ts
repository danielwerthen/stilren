import { Modifier } from "./Modifier";

function isUpperCase(str: string): boolean {
  return str !== str.toLowerCase() && str === str.toUpperCase();
}

export type ModifierMap = {
  [key: string]: Modifier;
};

function cache<T>(fn: (key: string) => T): (key: string) => T {
  const store: { [key: string]: T } = {};
  return (key: string) => {
    if (!store[key]) {
      store[key] = fn(key);
    }
    return store[key];
  };
}

export function createParser(prefixMap: ModifierMap, suffixMap: ModifierMap) {
  const prefixes = Object.keys(prefixMap);
  const suffixes = Object.keys(suffixMap);

  function parsePrefix(key: string): [string, Modifier[]] {
    const match = prefixes.find(item => {
      return (
        key.length > item.length &&
        isUpperCase(key[item.length]) &&
        key.startsWith(item)
      );
    });
    if (match) {
      const modifier = prefixMap[match];
      const [inner, mods] = parsePrefix(
        key[match.length].toLowerCase() + key.slice(match.length + 1)
      );
      return [inner, [...mods, modifier]];
    }
    return [key, []];
  }
  function parseSuffix(key: string): [string, Modifier[]] {
    const match = suffixes.find(item => {
      return key.length > item.length && key.endsWith(item);
    });
    if (match) {
      const modifier = suffixMap[match];
      const [inner, mods] = parseSuffix(
        key.substring(0, key.length - match.length)
      );
      return [inner, [...mods, modifier]];
    }
    return [key, []];
  }
  function parse(key: string): [string, Modifier[]] {
    const [first, prefixMods] = parsePrefix(key);
    const [innerKey, suffixMods] = parseSuffix(first);
    return [
      innerKey,
      Modifier.combineModifiers([...prefixMods, ...suffixMods])
    ];
  }
  return cache(parse);
}
