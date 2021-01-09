import "react";
import { Properties, SvgProperties } from "csstype";

export type PrefixedProperties = {
  [K in keyof Properties as `$${K}`]: Properties[K];
}
export type PrefixedSvgProperties = {
  [K in keyof SvgProperties as `$${K}`]: SvgProperties[K];
}

export type StilrenStyleObject = (Properties | SvgProperties) & { [key: string]: unknown };

declare module "react" {
  interface HTMLAttributes<T> extends PrefixedProperties {
    [key: string]: unknown;
  }
  interface SVGAttributes<T> extends PrefixedSvgProperties {
    [key: string]: unknown;
  }
}