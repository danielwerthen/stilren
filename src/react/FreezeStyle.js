import React from 'react';
import { Consumer } from './context';
import transformProps from './transformProps';
import { inheritanceStore } from './constants';

function comp(Component, staticProps) {
  function Frozen(props) {
    const finalProps = Object.assign({}, staticProps, props);
    if (props.className && staticProps.className) {
      finalProps.className = `${props.className} ${staticProps.className}`;
    }
    return React.createElement(Component, finalProps);
  }
  Frozen.displayName = `Frozen(${Component.displayName ||
    Component.name ||
    Component})`;
  return Frozen;
}

export default class FreezeStyle extends React.Component {
  render() {
    const { children, ...components } = this.props;
    return React.createElement(Consumer, {}, ctx => {
      const result = Object.keys(components).reduce((sum, key) => {
        const item = components[key];
        let Component,
          props = {};
        if (Array.isArray(item)) {
          Component = item[0];
          props = item[1];
        } else {
          Component = item;
        }
        if (!Component[inheritanceStore]) {
          console.warn('Component is not freezeable', Component);
          return sum;
        }
        const [originalComponent, extensions] = Component[inheritanceStore];
        sum[key] = comp(
          originalComponent,
          transformProps(
            {
              ...(Component.defaultProps || {}),
              ...props,
            },
            ctx,
            extensions
          )
        );
        return sum;
      }, {});

      return children(result);
    });
  }
}
