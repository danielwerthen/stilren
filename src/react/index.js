import createReactContext from 'create-react-context';
import { createTransformer } from '../index';
import { driver } from 'styletron-standard';

const StyletronContext = createReactContext();

const Provider = StyletronContext.Provider;

const Consumer = StyletronContext.Consumer;

export function getDefaultStyle(extensions) {
  return extensions
    .reverse()
    .map(ext => ext.prototype || ext)
    .filter(ext => Reflect.has(ext, 'defaultStyle'))
    .map(
      ext =>
        typeof ext.defaultStyle === 'function'
          ? ext.defaultStyle()
          : ext.defaultStyle
    )
    .reduce((sum, item) => Object.assign(sum, item), {});
}

const inheritanceStore = '__STILREN_STORE__';

export default function createFactory(options) {
  const { createElement, styleIndicator = '$' } = options;
  const transformer = createTransformer(options);
  function factory(Component, ...extensions) {
    if (Component[inheritanceStore]) {
      const [a, b] = Component[inheritanceStore];
      return factory(a, ...extensions, ...b);
    }
    const transform = transformer(...extensions);
    const defaultStyle = getDefaultStyle(extensions);
    function StyledElement(props) {
      return createElement(Consumer, null, styletron => {
        const elementProps = {},
          styleProps = Object.assign({}, defaultStyle);
        for (var key in props) {
          const val = props[key];
          if (key === 'innerRef') {
            elementProps.ref = val;
          } else if (key[0] === styleIndicator) {
            styleProps[key.slice(1)] = val;
          } else {
            elementProps[key] = props[key];
          }
        }
        const styleClassName = driver(transform(styleProps), styletron);
        elementProps.className = elementProps.className
          ? `${elementProps.className} ${styleClassName}`
          : styleClassName;
        return createElement(Component, elementProps);
      });
    }
    StyledElement[inheritanceStore] = [Component, extensions];
    StyledElement.displayName = `stilren(${Component.displayName ||
      Component.name ||
      Component})`;
    return StyledElement;
  }
  return factory;
}

export { createFactory, Provider, Consumer };
