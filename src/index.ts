import { registerExtension } from "@dwerthen/react-extension";
import { createParser } from "./Parser";
import Node from "./Node";
import defaultPseudos from "./default-pseudos";
import { PseudoModifier, MediaModifier } from "./Modifier";
import {
  StandardEngine,
  renderDeclarativeRules,
  StyleObject,
} from "styletron-standard";

export type StyleProps = { [key: string]: unknown };

export type RenderStyleFn = (props: StyleProps) => string;

export function createRenderStyle({
  mediaPrefixes = {},
  pseudoSuffixes = defaultPseudos,
  styletron,
}: {
  styletron: StandardEngine;
  mediaPrefixes?: { [key: string]: string };
  pseudoSuffixes?: { [key: string]: string };
}): RenderStyleFn {
  const parser = createParser(
    Object.keys(mediaPrefixes).reduce(
      (sum, key) => ({
        ...sum,
        [key]: new MediaModifier(mediaPrefixes[key]),
      }),
      {}
    ),
    Object.keys(pseudoSuffixes).reduce(
      (sum, key) => ({
        ...sum,
        [key]: new PseudoModifier(pseudoSuffixes[key]),
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

export type StilrenOptions = {
  styletron: StandardEngine;
  mediaPrefixes?: { [key: string]: string };
  pseudoSuffixes?: { [key: string]: string };
  propPrefix?: string;
};

export function registerStilren({
  mediaPrefixes,
  pseudoSuffixes,
  styletron,
  propPrefix = "$",
}: StilrenOptions) {
  const renderStyle = createRenderStyle({
    styletron,
    mediaPrefixes,
    pseudoSuffixes,
  });
  registerExtension((tagName, props: any, ...children) => {
    if (typeof props !== "object") {
      return [tagName, props, children];
    }
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
    return [tagName, output, children];
  });
}
