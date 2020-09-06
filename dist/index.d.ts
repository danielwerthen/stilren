import React from "react";
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
export declare const stilrenContext: React.Context<{
    renderStyle: RenderStyleFn;
}>;
export declare function StilrenProvider({ mediaPrefixes, pseudoSuffixes, styletron, propPrefix, children, }: {
    styletron: StandardEngine;
    mediaPrefixes?: {
        [key: string]: string;
    };
    pseudoSuffixes?: {
        [key: string]: string;
    };
    propPrefix?: string;
    children?: any;
}): any;
export declare const StilrenConsumer: React.Consumer<{
    renderStyle: RenderStyleFn;
}>;
export declare function useStilren(props: StyleProps): string;
export declare function createExtender(renderStyle: RenderStyleFn, propPrefix?: string): (_tagName: string, props: {
    [key: string]: unknown;
}) => {
    [key: string]: unknown;
};
