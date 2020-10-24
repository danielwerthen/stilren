import { StandardEngine } from "styletron-standard";
export declare type StyleProps = {
    [key: string]: unknown;
};
export declare type RenderStyleFn = (props: StyleProps) => string;
export declare function createRenderStyle({ mediaPrefixes, pseudoSuffixes, styletron, }: {
    styletron: StandardEngine;
    mediaPrefixes?: {
        [key: string]: string;
    };
    pseudoSuffixes?: {
        [key: string]: string;
    };
}): RenderStyleFn;
export declare type StilrenOptions = {
    styletron: StandardEngine;
    mediaPrefixes?: {
        [key: string]: string;
    };
    pseudoSuffixes?: {
        [key: string]: string;
    };
    propPrefix?: string;
};
export declare function registerStilren({ mediaPrefixes, pseudoSuffixes, styletron, propPrefix, }: StilrenOptions): void;
