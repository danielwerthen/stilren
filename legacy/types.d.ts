import "react";
import { Properties, SvgProperties } from "csstype";

export type StilrenStyleObject = (Properties | SvgProperties) & {
  [key: string]: unknown;
};
