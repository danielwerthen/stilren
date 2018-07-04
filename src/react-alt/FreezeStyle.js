import React from 'react';
import { Consumer } from './context';
import transformElement from './transformElement';

function comp(element, component) {
  function Frozen(props) {
    return React.cloneElement(element, props);
  }
  Frozen.displayName = `Frozen(${component.displayName ||
    component.name ||
    component})`;
  return Frozen;
}

export default class FreezeStyle extends React.Component {
  render() {
    const { children, ...components } = this.props;
    return React.createElement(Consumer, {}, ctx => {
      const result = Object.keys(components).reduce((sum, key) => {
        const item = components[key];
        let component,
          props = {};
        if (Array.isArray(item)) {
          component = item[0];
          props = item[1];
        } else {
          component = item;
        }
        sum[key] = comp(transformElement(component, props, ctx, []), component);
        return sum;
      }, {});

      return children(result);
    });
  }
}
