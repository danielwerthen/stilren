import React, {
  ReactHTML,
  ReactSVG,
  HTMLAttributes,
  SVGFactory,
  DOMAttributes,
  DOMFactory,
  FunctionComponent,
  ClassType,
  ClassicComponent,
  ComponentState,
  ClassicComponentClass,
  ReactElement
} from "react";
export * from "react";

export default React;

export function StilrenProvider(options: {
  styletron: any;
  stylePrefix: string;
  breakpoints: object;
  pseudos: string[];
  extensions: object[];
}): ReactElement;

export function StilrenExtender(options: {
  children: any;
  extensions: object[];
  replace: boolean;
}): ReactElement;

type Extension = {};

export const DECORATE_KEY = Symbol("Key for storing wrapped components");

export function componentFactory(
  type: keyof ReactHTML,
  ...extensions: Extension[]
): FunctionComponent<HTMLElement>;

export function componentFactory(
  type: keyof ReactSVG,
  ...extensions: Extension[]
): FunctionComponent<SVGElement>;
export function componentFactory<P extends DOMAttributes<T>, T extends Element>(
  type: string,
  ...extensions: Extension[]
): FunctionComponent<HTMLElement>;

// Custom components
export function componentFactory<P>(
  type: FunctionComponent<P>,
  ...extensions: Extension[]
): FunctionComponent<P>;
export function createFactory<P>(
  type: ClassType<
    P,
    ClassicComponent<P, ComponentState>,
    ClassicComponentClass<P>
  >,
  ...extensions: Extension[]
): FunctionComponent<P>;
