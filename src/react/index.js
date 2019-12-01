import React from "react";
import PropTypes from "prop-types";
import { createTransformer } from "../index";
import context from "./context";
import { inheritanceStore } from "./constants";
import { driver } from "styletron-standard";

const defaultOptions = {
  stylePrefix: "$",
  extensions: []
};

export function StilrenProvider({ children, ...options }) {
  const value = Object.assign({}, options, defaultOptions);
  const transformer = createTransformer(value);
  return React.createElement(
    context.Provider,
    {
      value: {
        ...value,
        transformer
      }
    },
    children
  );
}

StilrenProvider.propTypes = {
  styletron: PropTypes.object,
  stylePrefix: PropTypes.string,
  breakpoints: PropTypes.object,
  pseudos: PropTypes.arrayOf(PropTypes.string),
  extensions: PropTypes.array
};

export function StilrenExtender({ children, extensions, replace = false }) {
  const options = React.useContext(context) || {};
  const value = Object.assign({}, options);
  value.extensions = replace
    ? extensions
    : [...extensions, ...options.extensions];
  return React.createElement(
    context.Provider,
    {
      value: value
    },
    children
  );
}

StilrenExtender.propTypes = {
  extensions: PropTypes.array,
  replace: PropTypes.bool
};

const cache = {};

export const DECORATE_KEY = Symbol("Key for storing wrapped components");

export function createElement(Component, ...args) {
  if (typeof Component === "string") {
    const decoratedComponent = (cache[Component] =
      cache[Component] || componentFactory(Component));
    return React.createElement(decoratedComponent, ...args);
  } else if (!Component[DECORATE_KEY]) {
    const decoratedComponent = componentFactory(Component);
    Component[DECORATE_KEY] = decoratedComponent;
  }
  return React.createElement(Component[DECORATE_KEY], ...args);
}

export function componentFactory(Component, ...extensions) {
  if (Component[inheritanceStore]) {
    const [a, b] = Component[inheritanceStore];
    const ExtendedComponent = componentFactory(a, ...extensions, ...b);
    if (Component.defaultProps) {
      ExtendedComponent.defaultProps = Object.assign(
        {},
        Component.defaultProps
      );
    }
    return ExtendedComponent;
  }
  const StyledElement = React.forwardRef((props, ref) => {
    const {
      styletron,
      stylePrefix,
      transformer,
      extensions: contextExtensions
    } = React.useContext(context);
    const transform = React.useMemo(() => {
      const transform = transformer(...extensions, ...contextExtensions);
      return props => {
        const elementProps = { ref },
          styleProps = {};
        for (var key in props) {
          const val = props[key];
          if (key[0] === stylePrefix && val !== undefined) {
            styleProps[key.slice(1)] = val;
          } else {
            elementProps[key] = props[key];
          }
        }
        const styleClassName = driver(transform(styleProps), styletron);
        if (styleClassName) {
          elementProps.className = elementProps.className
            ? `${styleClassName} ${elementProps.className}`
            : styleClassName;
        }
        return elementProps;
      };
    }, [styletron, stylePrefix, transformer, extensions, contextExtensions]);
    return React.createElement(Component, transform(props));
  });
  StyledElement[inheritanceStore] = [Component, extensions];
  StyledElement.displayName = `stilren(${Component.displayName ||
    Component.name ||
    Component})`;
  return StyledElement;
}

export default {
  ...React,
  createElement
};
