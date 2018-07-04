export default function createExtender(...extensions) {
  const exts = extensions.map(ext => ext.prototype || ext);
  return function extender(key) {
    for (var i in exts) {
      const extension = exts[i];
      if (Reflect.has(extension, key)) {
        return Reflect.get(extension, key);
      }
    }
    return null;
  };
}
