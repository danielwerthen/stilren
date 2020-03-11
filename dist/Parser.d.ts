import { Modifier } from "./Modifier";
export declare type ModifierMap = {
    [key: string]: Modifier;
};
export declare function createParser(prefixMap: ModifierMap, suffixMap: ModifierMap): (key: string) => [string, Modifier[]];
