import React from 'react';
import PropTypes from 'prop-types';
import { createTransformer } from '../index';
import transformProps from './transformProps';
import { Provider, Consumer } from './context';
import { inheritanceStore } from './constants';
import FreezeStyle from './FreezeStyle';

export function StilrenProvider({
  styletron,
  stylePrefix = '$',
  extensions = [],
  children,
  ...options
}) {
  const transformer = createTransformer(options);
  return React.createElement(
    Provider,
    {
      value: {
        styletron,
        stylePrefix,
        transformer,
        extensions,
      },
    },
    children
  );
}

StilrenProvider.propTypes = {
  styletron: PropTypes.object.isRequired,
  stylePrefix: PropTypes.string,
  breakpoints: PropTypes.object,
  pseudos: PropTypes.arrayOf(PropTypes.string),
};

const cache = {};

export function createElement(Component, ...args) {
  let decoratedComponent = Component;
  if (typeof Component === 'string') {
    decoratedComponent = cache[Component] =
      cache[Component] || componentFactory(Component);
  }
  return React.createElement(decoratedComponent, ...args);
}

export function componentFactory(Component, ...extensions) {
  if (Component[inheritanceStore]) {
    const [a, b] = Component[inheritanceStore];
    const ExtendedComponent = factory(a, ...extensions, ...b);
    if (Component.defaultProps) {
      ExtendedComponent.defaultProps = Object.assign(
        {},
        Component.defaultProps
      );
    }
    return ExtendedComponent;
  }
  function StyledElement(props) {
    return React.createElement(Consumer, null, ctx =>
      React.createElement(Component, transformProps(props, ctx, extensions))
    );
  }
  StyledElement[inheritanceStore] = [Component, extensions];
  StyledElement.displayName = `stilren(${Component.displayName ||
    Component.name ||
    Component})`;
  return StyledElement;
}

export { Consumer, FreezeStyle };

export default {
  ...React,
  createElement,
};
