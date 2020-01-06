import {
  createElement as baseCreateElement,
  createFactory as baseCreateFactory,
  createContext,
  createRef,
  useCallback,
  useContext,
  useDebugValue,
  useEffect,
  useLayoutEffect,
  useImperativeHandle,
  useMemo,
  useReducer,
  useRef,
  useState,
  cloneElement,
  forwardRef,
  isValidElement,
  lazy,
  memo
} from "react";
import { extendComponent } from "../extendComponent";

type createElementType = typeof baseCreateElement;

export const createElement: createElementType = ((
  type: any,
  props?: any,
  ...children: any
) => {
  return baseCreateElement(extendComponent(type), props, children);
}) as createElementType;

type createFactoryType = typeof baseCreateFactory;

export const createFactory: createFactoryType = ((type: any) => {
  const factory = createElement.bind(null, type) as any;
  // Expose the type on the factory and the prototype so that it can be
  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
  // This should not be named `constructor` since this may not be the function
  // that created the element, and it may not even be a constructor.
  // Legacy hook: remove it
  factory.type = type;
  return factory;
}) as createFactoryType;

export default {
  createElement,
  createContext,
  createFactory,
  createRef,
  useCallback,
  useContext,
  useDebugValue,
  useEffect,
  useLayoutEffect,
  useImperativeHandle,
  useMemo,
  useReducer,
  useRef,
  useState,
  cloneElement,
  forwardRef,
  isValidElement,
  lazy,
  memo
};

export {
  createContext,
  createRef,
  useCallback,
  useContext,
  useDebugValue,
  useEffect,
  useLayoutEffect,
  useImperativeHandle,
  useMemo,
  useReducer,
  useRef,
  useState,
  cloneElement,
  forwardRef,
  isValidElement,
  lazy,
  memo
};

declare module "react" {
  interface HTMLAttributes<T> {
    [key: string]: any;
  }
}
