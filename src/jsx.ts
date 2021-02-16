import { ComponentType, ReactElement } from 'base-react';
import { transform } from './stilren';
export type JsxSignature = (
  type: ComponentType,
  config: {},
  maybeKey?: string,
  ...rest: any[]
) => ReactElement;

export function jsx(
  base: JsxSignature,
  type: ComponentType,
  config: {},
  maybeKey?: string,
  ...rest: any[]
) {
  return base(type, transform(type, config) || config, maybeKey, ...rest);
}
