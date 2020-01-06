import React from 'react'
export * from 'react'

export default React

export function StilrenProvider(options: { styletron: any, stylePrefix: string, breakpoints: object, pseudos: string[], extensions: object[] }) {
}

export function StilrenExtender(options: { children: any, extensions: object[], replace: boolean }) {
}

type Extension = {}

export const DECORATE_KEY = Symbol("Key for storing wrapped components");

type Component = keyof ReactHTM

export function componentFactory<P extends {}>(Component: , ...extensions: Extension[]): React.FC<P>

    export function componentFactory<T extends HTMLElement>( type: keyof ReactHTML): HTMLFactory<T>;
    export function createFactory(
        type: keyof ReactSVG): SVGFactory;
    export function createFactory<P extends DOMAttributes<T>, T extends Element>(
        type: string): DOMFactory<P, T>;

    // Custom components
    export function createFactory<P>(type: FunctionComponent<P>): FunctionComponentFactory<P>;
    export function createFactory<P>(
        type: ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>>): CFactory<P, ClassicComponent<P, ComponentState>>;
    export function createFactory<P, T extends Component<P, ComponentState>, C extends ComponentClass<P>>(
        type: ClassType<P, T, C>): CFactory<P, T>;
    export function createFactory<P>(type: ComponentClass<P>): Factory<P>;