import React from 'react';
import PropTypes from 'prop-types';
import { createTransformer } from '../index';
import transformElement from './transformElement';
import { Provider, Consumer } from './context';

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

const inheritanceStore = '__STILREN_STORE__';

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
      transformElement(Component, props, ctx, extensions)
    );
  }
  StyledElement[inheritanceStore] = [Component, extensions];
  StyledElement.displayName = `stilren(${Component.displayName ||
    Component.name ||
    Component})`;
  return StyledElement;
}

export { Consumer };
