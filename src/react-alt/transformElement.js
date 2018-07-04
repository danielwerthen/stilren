import React from 'react';
import { driver } from 'styletron-standard';

export default function transformElement(
  Component,
  props,
  { styletron, stylePrefix, transformer, extensions },
  innerExtensions
) {
  const transform = transformer(...innerExtensions, ...extensions);
  const elementProps = {},
    styleProps = {};
  for (var key in props) {
    const val = props[key];
    if (key === 'innerRef') {
      elementProps.ref = val;
    } else if (key[0] === stylePrefix) {
      styleProps[key.slice(1)] = val;
    } else {
      elementProps[key] = props[key];
    }
  }
  const styleClassName = driver(transform(styleProps), styletron);
  if (styleClassName) {
    elementProps.className = elementProps.className
      ? `${elementProps.className} ${styleClassName}`
      : styleClassName;
  }
  return React.createElement(Component, elementProps);
}
