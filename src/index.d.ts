import { JSX } from '@types/react';

declare global {
  namespace JSX {
    interface Element extends JSX.Element {}
    interface ElementClass extends JSX.ElementClass {}
    interface ElementAttributesProperty extends JSX.ElementAttributesProperty {}
    interface ElementChildrenAttribute extends JSX.ElementChildrenAttribute {}

    // We can't recurse forever because `type` can't be self-referential;
    // let's assume it's reasonable to do a single React.lazy() around a single React.memo() / vice-versa
    type LibraryManagedAttributes<C, P> = JSX.LibraryManagedAttributes<C, P>;

    interface IntrinsicAttributes extends JSX.IntrinsicAttributes {}
    interface IntrinsicClassAttributes<T>
      extends JSX.IntrinsicClassAttributes<T> {}

    interface IntrinsicElements extends JSX.IntrinsicElements {}
  }
}
