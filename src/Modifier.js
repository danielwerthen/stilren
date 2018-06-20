function getClassName(instance) {
  return Reflect.getPrototypeOf(instance).constructor.name;
}

const modifiers = {};

export class Modifier {
  constructor(value) {
    const id = Symbol.for(`stil-ren-modifier:${getClassName(this)}+${value}`);
    const mod = modifiers[id];
    if (mod) {
      return mod;
    }
    this.value = value;
    Object.freeze(this);
    modifiers[id] = this;
  }
  canCombine(withMod) {
    return false;
  }
  combine(withMod) {
    throw new Error('Cannot combine with ' + getClassName(withMod));
  }
  getKey() {
    return this.value;
  }

  toString() {
    return this.getKey();
  }

  static getModifierById(id) {
    return getModifier(id);
  }

  static combineModifiers(mods) {
    return mods.reduce((sum, item) => {
      const last = sum[sum.length - 1];
      if (last && last.canCombine(item)) {
        return [...sum.slice(0, sum.length - 1), last.combine(item)];
      }
      return [...sum, item];
    }, []);
  }
}

export class MediaModifier extends Modifier {
  canCombine(withMod) {
    return withMod instanceof MediaModifier;
  }
  combine(withMod, optional) {
    const alpha = optional ? withMod : this;
    const beta = optional ? optional : withMod;
    if (alpha === beta) {
      return beta;
    }
    const left = alpha.value < beta.value ? alpha : beta;
    const right = alpha.value < beta.value ? beta : alpha;
    return new MediaModifier(`${left.value} and ${right.value}`);
  }
  getKey() {
    return `@media ${this.value}`;
  }
}

export class PseudoModifier extends Modifier {
  canCombine(withMod) {
    return withMod instanceof PseudoModifier;
  }
  combine(withMod, optional) {
    const alpha = optional ? withMod : this;
    const beta = optional ? optional : withMod;
    if (alpha === beta) {
      return beta;
    }
    const left = alpha.value < beta.value ? alpha : beta;
    const right = alpha.value < beta.value ? beta : alpha;
    return new PseudoModifier(`${left.value}:${right.value}`);
  }
  getKey() {
    return `:${this.value}`;
  }
}
