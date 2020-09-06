function getClassName(instance: Modifier) {
  return Reflect.getPrototypeOf(instance).constructor.name;
}

const modifiers: { [key: string]: Modifier } = {};

export type ModifierType = "prefix" | "suffix";

export class Modifier {
  value: string;
  type: ModifierType;
  constructor(value: string, type: ModifierType) {
    const id = `stil-ren-modifier:${getClassName(this)}+${value}`;
    const mod = modifiers[id];
    this.value = value;
    this.type = type;
    if (mod) {
      return mod;
    }
    modifiers[id] = this;
  }
  canCombine(_withMod: Modifier) {
    return false;
  }
  combine(withMod: Modifier): Modifier {
    throw new Error("Cannot combine with " + getClassName(withMod));
  }
  getKey() {
    return this.value;
  }

  toString() {
    return this.getKey();
  }

  static combineModifiers(mods: Modifier[]) {
    return mods.reduce<Modifier[]>((sum: Modifier[], item: Modifier) => {
      const last = sum[sum.length - 1];
      if (last && last.canCombine(item)) {
        return [...sum.slice(0, sum.length - 1), last.combine(item)];
      }
      return [...sum, item];
    }, []);
  }
}

export class MediaModifier extends Modifier {
  constructor(value: string) {
    super(value, "prefix");
  }
  canCombine(withMod: Modifier) {
    return withMod instanceof MediaModifier;
  }
  combine(withMod: Modifier): Modifier {
    const alpha = this;
    const beta = withMod;
    if (alpha === beta) {
      return beta;
    }
    const left = alpha.value < beta.value ? alpha : beta;
    const right = alpha.value < beta.value ? beta : alpha;
    return new MediaModifier(`${left.value} or ${right.value}`);
  }
  getKey() {
    return `@media ${this.value}`;
  }
}

export class PseudoModifier extends Modifier {
  constructor(value: string) {
    super(value, "suffix");
  }
  canCombine(withMod: Modifier) {
    return withMod instanceof PseudoModifier;
  }
  combine(withMod: Modifier): Modifier {
    const alpha = this;
    const beta = withMod;
    if (alpha === beta) {
      return beta;
    }
    let left: Modifier;
    let right: Modifier;
    const aStart = alpha.value.startsWith(":");
    const bStart = beta.value.startsWith(":");
    if (aStart && bStart) {
      left = alpha.value < beta.value ? alpha : beta;
      right = alpha.value < beta.value ? beta : alpha;
    } else if (aStart) {
      left = beta;
      right = alpha;
    } else if (bStart) {
      left = alpha;
      right = beta;
    } else {
      left = alpha.value < beta.value ? alpha : beta;
      right = alpha.value < beta.value ? beta : alpha;
    }

    return new PseudoModifier(`${left.value}:${right.value}`);
  }
  getKey() {
    return `:${this.value}`;
  }
}
