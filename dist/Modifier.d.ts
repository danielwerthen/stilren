export declare type ModifierType = "prefix" | "suffix";
export declare class Modifier {
    value: string;
    type: ModifierType;
    constructor(value: string, type: ModifierType);
    canCombine(_withMod: Modifier): boolean;
    combine(withMod: Modifier): Modifier;
    getKey(): string;
    toString(): string;
    static combineModifiers(mods: Modifier[]): Modifier[];
}
export declare class MediaModifier extends Modifier {
    constructor(value: string);
    canCombine(withMod: Modifier): boolean;
    combine(withMod: Modifier): Modifier;
    getKey(): string;
}
export declare class PseudoModifier extends Modifier {
    constructor(value: string);
    canCombine(withMod: Modifier): boolean;
    combine(withMod: Modifier): Modifier;
    getKey(): string;
}
