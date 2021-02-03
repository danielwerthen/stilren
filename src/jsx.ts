import { ComponentType, ReactElement } from 'react';
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
  console.log('Jsx base for ', type, config);
  return base(type, config, maybeKey, ...rest);
}
