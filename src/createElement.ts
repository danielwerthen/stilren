import {
  createElement as base,
  FunctionComponent,
  ComponentClass,
  Attributes,
  ReactNode,
  ReactElement,
} from 'base-react';
import { transform } from './stilren';

export function createElement<P extends {}>(
  type: FunctionComponent<P> | ComponentClass<P> | string,
  props?: (Attributes & P) | null,
  ...children: ReactNode[]
): ReactElement<P> {
  return base(type, transform(type, props) as P, ...children);
}
