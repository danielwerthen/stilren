import "@dwerthen/react-extension/react";
import { TeardownCallback } from "@dwerthen/react-extension";
import { StandardEngine } from "styletron-standard";
import { StilrenStyleObject } from "./types";
export declare type RenderStyleFn = (props: StilrenStyleObject) => string;
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
export declare function registerStilren({ mediaPrefixes, pseudoSuffixes, styletron, propPrefix, }: StilrenOptions): TeardownCallback;
export declare function useStyle(style: StilrenStyleObject): string;
