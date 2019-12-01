import React from "react";
import PropTypes from "prop-types";
import { createTransformer } from "../index";
import transformProps from "./transformProps";
import context from "./context";
import { inheritanceStore } from "./constants";

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
  styletron: PropTypes.object,
  stylePrefix: PropTypes.string,
  breakpoints: PropTypes.object,
  pseudos: PropTypes.arrayOf(PropTypes.string),
  extensions: PropTypes.array
};

const cache = {};

export function createElement(Component, ...args) {
  let decoratedComponent = Component;
  if (typeof Component === "string") {
    decoratedComponent = cache[Component] =
      cache[Component] || componentFactory(Component);
  }
  return React.createElement(decoratedComponent, ...args);
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
  function StyledElement(props) {
    const ctx = React.useContext(context);
    return React.createElement(
      Component,
      transformProps(props, ctx, extensions)
    );
  }
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
