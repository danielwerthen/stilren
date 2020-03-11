import { Modifier } from "./Modifier";
export default class Node {
    props: {
        [key: string]: unknown;
    };
    constructor(props?: {});
    set(key: string, value: unknown, mods: Modifier[]): void;
    getNode(mods: Modifier[]): Node;
}
