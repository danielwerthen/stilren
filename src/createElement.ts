import {
  createElement as base,
  FunctionComponent,
  ComponentClass,
  Attributes,
  ReactNode,
  ReactElement,
} from 'react';

export function createElement<P extends {}>(
  type: FunctionComponent<P> | ComponentClass<P> | string,
  props?: (Attributes & P) | null,
  ...children: ReactNode[]
): ReactElement<P> {
  console.log('JSX', type, props);
  return base(type, props, ...children);
}
