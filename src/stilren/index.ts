import { createParser } from './Parser';
import { createElement, ReactNode, Fragment } from 'base-react';
import Node from './Node';
import defaultPseudos from './default-pseudos';
import { PseudoModifier, MediaModifier } from './Modifier';
import {
  StandardEngine,
  renderDeclarativeRules,
  StyleObject,
} from 'styletron-standard';
import { StilrenStyleObject } from './types';
import { Client, Server, Sheet } from 'styletron-engine-atomic';

const getHydrateClass = () =>
  document.getElementsByClassName('_styletron_hydrate_');

export const defaultStyletron =
  typeof window === 'undefined'
    ? new Server()
    : new Client({
        hydrate: getHydrateClass() as any,
      });

export function getStylesheets(): ReactNode {
  if (typeof window !== 'undefined') {
    return null;
  }
  return createElement(
    Fragment,
    null,
    ...(defaultStyletron as Server)
      .getStylesheets()
      .map((sheet: Sheet, i: number) =>
        createElement('style', {
          key: i,
          className: '_styletron_hydrate_',
          dangerouslySetInnerHTML: { __html: sheet.css },
          media: sheet.attrs.media,
          'data-hydrate': sheet.attrs['data-hydrate'],
        })
      )
  );
}

export type RenderStyleFn = (props: StilrenStyleObject) => string;
export const defaultMediaPrefixes = {
  small: '(max-width: 425px)',
  medium: '(min-width: 426px) and (max-width: 1024px)',
  large: '(min-width: 1025px)',
  portrait: '(orientation: portrait)',
  landscape: '(orientation: landscape)',
};

export function createRenderStyle({
  mediaPrefixes = defaultMediaPrefixes,
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
};

let currentRenderStyle: RenderStyleFn | null = null;

export function initialize({
  mediaPrefixes,
  pseudoSuffixes,
  styletron,
}: StilrenOptions): RenderStyleFn {
  const renderStyle = createRenderStyle({
    styletron,
    mediaPrefixes,
    pseudoSuffixes,
  });
  return (currentRenderStyle = renderStyle);
}

export function getRenderer(): RenderStyleFn {
  if (!currentRenderStyle) {
    currentRenderStyle = initialize({
      styletron: defaultStyletron,
    });
  }
  return currentRenderStyle;
}

export function transform(
  tagName: unknown | string,
  props?: { [key: string]: unknown } | null
): { [key: string]: unknown } | null | undefined {
  if (typeof props !== 'object' || typeof tagName !== 'string') {
    return props;
  }
  const output: { [key: string]: unknown } = {};
  const style: { [key: string]: unknown } = {};
  let touched = false;
  for (var key in props) {
    if (props.hasOwnProperty(key)) {
      if (key.startsWith('$')) {
        style[key.substr(1)] = props[key];
        touched = true;
      } else {
        output[key] = props[key];
      }
    }
  }
  if (touched) {
    const className = getRenderer()(style);
    output.className = output.className
      ? `${output.className} ${className}`
      : className;
  }
  return output;
}

export function useStyle(style: StilrenStyleObject): string {
  if (!currentRenderStyle) {
    throw new Error('You need to call registerStilren before using this hook.');
  }
  return currentRenderStyle(style);
}
