import '../';
import React, {
  AbstractView,
  AllHTMLAttributes,
  AnchorHTMLAttributes,
  AnimationEvent,
  AnimationEventHandler,
  AreaHTMLAttributes,
  AriaAttributes,
  Attributes,
  AudioHTMLAttributes,
  BaseHTMLAttributes,
  BaseSyntheticEvent,
  BlockquoteHTMLAttributes,
  ButtonHTMLAttributes,
  CElement,
  CFactory,
  CSSProperties,
  CanvasHTMLAttributes,
  ChangeEvent,
  ChangeEventHandler,
  ChildContextProvider,
  Children,
  ClassAttributes,
  ClassType,
  ClassicComponent,
  ClassicComponentClass,
  ClassicElement,
  ClassicFactory,
  ClipboardEvent,
  ClipboardEventHandler,
  ColHTMLAttributes,
  ColgroupHTMLAttributes,
  Component,
  ComponentClass,
  ComponentElement,
  ComponentFactory,
  ComponentLifecycle,
  ComponentProps,
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ComponentSpec,
  ComponentState,
  ComponentType,
  CompositionEvent,
  CompositionEventHandler,
  Consumer,
  ConsumerProps,
  Context,
  ContextType,
  DOMAttributes,
  DOMElement,
  DOMFactory,
  DataHTMLAttributes,
  DelHTMLAttributes,
  DependencyList,
  DeprecatedLifecycle,
  DetailedHTMLFactory,
  DetailedHTMLProps,
  DetailedReactHTMLElement,
  DetailsHTMLAttributes,
  DialogHTMLAttributes,
  Dispatch,
  DispatchWithoutAction,
  DragEvent,
  DragEventHandler,
  EffectCallback,
  ElementRef,
  ElementType,
  EmbedHTMLAttributes,
  ErrorInfo,
  EventHandler,
  ExoticComponent,
  FC,
  Factory,
  FieldsetHTMLAttributes,
  FocusEvent,
  FocusEventHandler,
  FormEvent,
  FormEventHandler,
  FormHTMLAttributes,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
  ForwardedRef,
  Fragment,
  FunctionComponent,
  FunctionComponentElement,
  FunctionComponentFactory,
  GetDerivedStateFromError,
  GetDerivedStateFromProps,
  HTMLAttributeReferrerPolicy,
  HTMLAttributes,
  HTMLFactory,
  HTMLProps,
  HtmlHTMLAttributes,
  IframeHTMLAttributes,
  ImgHTMLAttributes,
  InputHTMLAttributes,
  InsHTMLAttributes,
  InvalidEvent,
  JSXElementConstructor,
  Key,
  KeyboardEvent,
  KeyboardEventHandler,
  KeygenHTMLAttributes,
  LabelHTMLAttributes,
  LazyExoticComponent,
  LegacyRef,
  LiHTMLAttributes,
  LinkHTMLAttributes,
  MapHTMLAttributes,
  MediaHTMLAttributes,
  MemoExoticComponent,
  MenuHTMLAttributes,
  MetaHTMLAttributes,
  MeterHTMLAttributes,
  Mixin,
  MouseEvent,
  MouseEventHandler,
  MutableRefObject,
  NamedExoticComponent,
  NewLifecycle,
  ObjectHTMLAttributes,
  OlHTMLAttributes,
  OptgroupHTMLAttributes,
  OptionHTMLAttributes,
  OutputHTMLAttributes,
  ParamHTMLAttributes,
  PointerEvent,
  PointerEventHandler,
  Profiler,
  ProfilerOnRenderCallback,
  ProfilerProps,
  ProgressHTMLAttributes,
  Props,
  PropsWithChildren,
  PropsWithRef,
  PropsWithoutRef,
  Provider,
  ProviderExoticComponent,
  ProviderProps,
  PureComponent,
  QuoteHTMLAttributes,
  ReactChild,
  ReactChildren,
  ReactComponentElement,
  ReactDOM,
  ReactElement,
  ReactEventHandler,
  ReactFragment,
  ReactHTML,
  ReactHTMLElement,
  ReactInstance,
  ReactNode,
  ReactNodeArray,
  ReactPortal,
  ReactPropTypes,
  ReactSVG,
  ReactSVGElement,
  ReactText,
  ReactType,
  Reducer,
  ReducerAction,
  ReducerState,
  ReducerStateWithoutAction,
  ReducerWithoutAction,
  Ref,
  RefAttributes,
  RefCallback,
  RefForwardingComponent,
  RefObject,
  Requireable,
  SFC,
  SFCElement,
  SFCFactory,
  SVGAttributes,
  SVGFactory,
  SVGProps,
  ScriptHTMLAttributes,
  SelectHTMLAttributes,
  SetStateAction,
  SlotHTMLAttributes,
  SourceHTMLAttributes,
  StatelessComponent,
  StaticLifecycle,
  StrictMode,
  StyleHTMLAttributes,
  Suspense,
  SuspenseProps,
  SyntheticEvent,
  TableHTMLAttributes,
  TdHTMLAttributes,
  TextareaHTMLAttributes,
  ThHTMLAttributes,
  TimeHTMLAttributes,
  Touch,
  TouchEvent,
  TouchEventHandler,
  TouchList,
  TrackHTMLAttributes,
  TransitionEvent,
  TransitionEventHandler,
  UIEvent,
  UIEventHandler,
  VFC,
  ValidationMap,
  Validator,
  VideoHTMLAttributes,
  VoidFunctionComponent,
  WeakValidationMap,
  WebViewHTMLAttributes,
  WheelEvent,
  WheelEventHandler,
  cloneElement,
  createContext,
  createFactory,
  createRef,
  forwardRef,
  isValidElement,
  lazy,
  memo,
  useCallback,
  useContext,
  useDebugValue,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  version,
} from 'base-react';

export default React;
export {
  AbstractView,
  AllHTMLAttributes,
  AnchorHTMLAttributes,
  AnimationEvent,
  AnimationEventHandler,
  AreaHTMLAttributes,
  AriaAttributes,
  Attributes,
  AudioHTMLAttributes,
  BaseHTMLAttributes,
  BaseSyntheticEvent,
  BlockquoteHTMLAttributes,
  ButtonHTMLAttributes,
  CElement,
  CFactory,
  CSSProperties,
  CanvasHTMLAttributes,
  ChangeEvent,
  ChangeEventHandler,
  ChildContextProvider,
  Children,
  ClassAttributes,
  ClassType,
  ClassicComponent,
  ClassicComponentClass,
  ClassicElement,
  ClassicFactory,
  ClipboardEvent,
  ClipboardEventHandler,
  ColHTMLAttributes,
  ColgroupHTMLAttributes,
  Component,
  ComponentClass,
  ComponentElement,
  ComponentFactory,
  ComponentLifecycle,
  ComponentProps,
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ComponentSpec,
  ComponentState,
  ComponentType,
  CompositionEvent,
  CompositionEventHandler,
  Consumer,
  ConsumerProps,
  Context,
  ContextType,
  DOMAttributes,
  DOMElement,
  DOMFactory,
  DataHTMLAttributes,
  DelHTMLAttributes,
  DependencyList,
  DeprecatedLifecycle,
  DetailedHTMLFactory,
  DetailedHTMLProps,
  DetailedReactHTMLElement,
  DetailsHTMLAttributes,
  DialogHTMLAttributes,
  Dispatch,
  DispatchWithoutAction,
  DragEvent,
  DragEventHandler,
  EffectCallback,
  ElementRef,
  ElementType,
  EmbedHTMLAttributes,
  ErrorInfo,
  EventHandler,
  ExoticComponent,
  FC,
  Factory,
  FieldsetHTMLAttributes,
  FocusEvent,
  FocusEventHandler,
  FormEvent,
  FormEventHandler,
  FormHTMLAttributes,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
  ForwardedRef,
  Fragment,
  FunctionComponent,
  FunctionComponentElement,
  FunctionComponentFactory,
  GetDerivedStateFromError,
  GetDerivedStateFromProps,
  HTMLAttributeReferrerPolicy,
  HTMLAttributes,
  HTMLFactory,
  HTMLProps,
  HtmlHTMLAttributes,
  IframeHTMLAttributes,
  ImgHTMLAttributes,
  InputHTMLAttributes,
  InsHTMLAttributes,
  InvalidEvent,
  JSXElementConstructor,
  Key,
  KeyboardEvent,
  KeyboardEventHandler,
  KeygenHTMLAttributes,
  LabelHTMLAttributes,
  LazyExoticComponent,
  LegacyRef,
  LiHTMLAttributes,
  LinkHTMLAttributes,
  MapHTMLAttributes,
  MediaHTMLAttributes,
  MemoExoticComponent,
  MenuHTMLAttributes,
  MetaHTMLAttributes,
  MeterHTMLAttributes,
  Mixin,
  MouseEvent,
  MouseEventHandler,
  MutableRefObject,
  NamedExoticComponent,
  NewLifecycle,
  ObjectHTMLAttributes,
  OlHTMLAttributes,
  OptgroupHTMLAttributes,
  OptionHTMLAttributes,
  OutputHTMLAttributes,
  ParamHTMLAttributes,
  PointerEvent,
  PointerEventHandler,
  Profiler,
  ProfilerOnRenderCallback,
  ProfilerProps,
  ProgressHTMLAttributes,
  Props,
  PropsWithChildren,
  PropsWithRef,
  PropsWithoutRef,
  Provider,
  ProviderExoticComponent,
  ProviderProps,
  PureComponent,
  QuoteHTMLAttributes,
  ReactChild,
  ReactChildren,
  ReactComponentElement,
  ReactDOM,
  ReactElement,
  ReactEventHandler,
  ReactFragment,
  ReactHTML,
  ReactHTMLElement,
  ReactInstance,
  ReactNode,
  ReactNodeArray,
  ReactPortal,
  ReactPropTypes,
  ReactSVG,
  ReactSVGElement,
  ReactText,
  ReactType,
  Reducer,
  ReducerAction,
  ReducerState,
  ReducerStateWithoutAction,
  ReducerWithoutAction,
  Ref,
  RefAttributes,
  RefCallback,
  RefForwardingComponent,
  RefObject,
  Requireable,
  SFC,
  SFCElement,
  SFCFactory,
  SVGAttributes,
  SVGFactory,
  SVGProps,
  ScriptHTMLAttributes,
  SelectHTMLAttributes,
  SetStateAction,
  SlotHTMLAttributes,
  SourceHTMLAttributes,
  StatelessComponent,
  StaticLifecycle,
  StrictMode,
  StyleHTMLAttributes,
  Suspense,
  SuspenseProps,
  SyntheticEvent,
  TableHTMLAttributes,
  TdHTMLAttributes,
  TextareaHTMLAttributes,
  ThHTMLAttributes,
  TimeHTMLAttributes,
  Touch,
  TouchEvent,
  TouchEventHandler,
  TouchList,
  TrackHTMLAttributes,
  TransitionEvent,
  TransitionEventHandler,
  UIEvent,
  UIEventHandler,
  VFC,
  ValidationMap,
  Validator,
  VideoHTMLAttributes,
  VoidFunctionComponent,
  WeakValidationMap,
  WebViewHTMLAttributes,
  WheelEvent,
  WheelEventHandler,
  cloneElement,
  createContext,
  createFactory,
  createRef,
  forwardRef,
  isValidElement,
  lazy,
  memo,
  useCallback,
  useContext,
  useDebugValue,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  version,
};
export { jsx } from './jsx';
export { createElement } from './createElement';

export const __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = (React as any)
  .__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
