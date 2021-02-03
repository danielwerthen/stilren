import { createParser } from './Parser';
import Node from './Node';
import defaultPseudos from './default-pseudos';
import { PseudoModifier, MediaModifier } from './Modifier';
import {
  StandardEngine,
  renderDeclarativeRules,
  StyleObject,
} from 'styletron-standard';
import { StilrenStyleObject } from './types';

export type RenderStyleFn = (props: StilrenStyleObject) => string;

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

  function renderStyle(props: StilrenStyleObject) {
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

/*
let currentRenderStyle: RenderStyleFn | null = null;

export function registerStilren({
  mediaPrefixes,
  pseudoSuffixes,
  styletron,
  propPrefix = "$",
}: StilrenOptions): TeardownCallback {
  const renderStyle = createRenderStyle({
    styletron,
    mediaPrefixes,
    pseudoSuffixes,
  });
  currentRenderStyle = renderStyle;
  return registerExtension((tagName, props: any, ...children) => {
    if (typeof props !== "object" || typeof tagName !== "string") {
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

export function useStyle(style: StilrenStyleObject): string {
  if (!currentRenderStyle) {
    throw new Error("You need to call registerStilren before using this hook.");
  }
  return currentRenderStyle(style);
}

*/
