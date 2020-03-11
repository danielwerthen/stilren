import {
  ExtensionProvider,
  originalCreateElement
} from "@dwerthen/react-extension";
import React from "react";
import { createParser } from "./Parser";
import Node from "./Node";
import defaultPseudos from "./default-pseudos";
import { PseudoModifier, MediaModifier } from "./Modifier";
import {
  StandardEngine,
  renderDeclarativeRules,
  StyleObject
} from "styletron-standard";

const defaultMediaPrefixes = Object.keys(process.env)
  .filter(key => key.startsWith("npm_package_stilren_mediaPrefixes"))
  .reduce((sum, key) => {
    const target = key.replace("npm_package_stilren_mediaPrefixes_", "");
    return Object.assign(sum, { [target]: process.env[key] });
  }, {});

export type StyleProps = { [key: string]: unknown };

export type RenderStyleFn = (props: StyleProps) => string;

export function createRenderStyle({
  mediaPrefixes = defaultMediaPrefixes,
  pseudoSuffixes = defaultPseudos,
  styletron
}: {
  styletron: StandardEngine;
  mediaPrefixes?: { [key: string]: string };
  pseudoSuffixes?: { [key: string]: string };
}): RenderStyleFn {
  const parser = createParser(
    Object.keys(mediaPrefixes).reduce(
      (sum, key) => ({
        ...sum,
        [key]: new MediaModifier(mediaPrefixes[key])
      }),
      {}
    ),
    Object.keys(pseudoSuffixes).reduce(
      (sum, key) => ({
        ...sum,
        [key]: new PseudoModifier(pseudoSuffixes[key])
      }),
      {}
    )
  );

  function renderStyle(props: StyleProps) {
    const node = new Node();
    for (var key in props) {
      if (props.hasOwnProperty(key)) {
        const value = props[key];
        const [inner, mods] = parser(key);
        node.set(inner, value, mods);
      }
    }
    const tx = renderDeclarativeRules(node.props as StyleObject, styletron);
    return styletron.renderStyle(tx);
  }

  return renderStyle;
}

const emptyRender = () => "";

export const stilrenContext = React.createContext<{
  renderStyle: RenderStyleFn;
}>({
  renderStyle: emptyRender
});

export function StilrenProvider({
  mediaPrefixes,
  pseudoSuffixes,
  styletron,
  propPrefix = "$",
  children
}: {
  styletron: StandardEngine;
  mediaPrefixes?: { [key: string]: string };
  pseudoSuffixes?: { [key: string]: string };
  propPrefix?: string;
  children?: any;
}) {
  const renderStyle = React.useMemo(
    () => createRenderStyle({ styletron, mediaPrefixes, pseudoSuffixes }),
    []
  );
  const extender = React.useMemo(
    () => createExtender(renderStyle, propPrefix),
    [renderStyle]
  );
  const ctx = React.useMemo(() => ({ renderStyle }), [renderStyle]);
  return originalCreateElement(
    stilrenContext.Provider,
    { value: ctx },
    originalCreateElement(ExtensionProvider, { value: extender }, children)
  );
}
export const StilrenConsumer = stilrenContext.Consumer;

export function useStilren(props: StyleProps) {
  const { renderStyle } = React.useContext(stilrenContext);
  if (renderStyle === emptyRender) {
    console.warn("Stilren Provider must be initialized with a renderStyle");
  }
  return renderStyle(props);
}

export function createExtender(
  renderStyle: RenderStyleFn,
  propPrefix: string = "$"
) {
  return (_tagName: string, props: { [key: string]: unknown }) => {
    const output: { [key: string]: unknown } = {};
    const style: { [key: string]: unknown } = {};
    let touched = false;
    for (var key in props) {
      if (props.hasOwnProperty(key)) {
        if (key.startsWith(propPrefix)) {
          style[key.substr(1)] = props[key];
          touched = true;
        } else {
          output[key] = props[key];
        }
      }
    }
    if (touched) {
      const className = renderStyle(style);
      output.className = output.className
        ? `${output.className} ${className}`
        : className;
    }
    return output;
  };
}
