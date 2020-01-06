import React, {
  ReactHTML,
  FunctionComponent,
  ReactSVG,
  ClassType,
  ClassicComponent,
  ComponentState,
  ClassicComponentClass,
  ComponentClass,
  Component
} from "react";
import context from "./context";

export const EXTENDED_BY = Symbol("Used to store the original component");

export function extendComponent(type: keyof ReactHTML): FunctionComponent<{}>;
export function extendComponent(type: keyof ReactSVG): FunctionComponent<{}>;
export function extendComponent(type: string): FunctionComponent<{}>;

// Custom components
export function extendComponent<P>(
  type: FunctionComponent<P>
): FunctionComponent<P>;
export function extendComponent<P>(
  type: ClassType<
    P,
    ClassicComponent<P, ComponentState>,
    ClassicComponentClass<P>
  >
): FunctionComponent<P>;
export function extendComponent<
  P,
  T extends Component<P, ComponentState>,
  C extends ComponentClass<P>
>(type: ClassType<P, T, C>): FunctionComponent<P>;
export function extendComponent<P>(
  type: ComponentClass<P>
): FunctionComponent<P>;

export function extendComponent(Component: any) {
  if (!Component) {
    return Component;
  }
  // We only need to wrapp each component once
  if (Component[EXTENDED_BY]) {
    return Component;
  }
  const factory = React.createFactory(Component);
  function StilrenComponent(props: any) {
    const { transform } = React.useContext(context);
    return factory(transform(props));
  }
  for (var key in Component) {
    (StilrenComponent as any)[key] = Component[key];
  }
  (StilrenComponent as any)[EXTENDED_BY] = Component;
  if (typeof Component === "string") {
    StilrenComponent.displayName = `Stilren(${Component})`;
  }
  return StilrenComponent;
}
