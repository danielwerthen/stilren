import createReactContext from 'create-react-context';
import { createTransformer } from '../index';

const StyletronContext = createReactContext();

const Provider = StyletronContext.Provider;

const Consumer = StyletronContext.Consumer;

function StyledElement(props) {
  return createElement(Consumer, null, styletron => {
    const elementProps = omitPrefixedKeys(props);
    const style = resolveStyle(getInitialStyle, reducers, props);
    const styleClassString = driver(style, styletron);
    const element = props.$as ? props.$as : base;

    elementProps.className = props.className
      ? `${props.className} ${styleClassString}`
      : styleClassString;

    if (props.$ref) {
      elementProps.ref = props.$ref;
    }

    return createElement(element, elementProps);
  });
}

function getDefaultStyle(extender) {
  const prototype = Reflect.getPrototypeOf(extender);
  const defaultStyle =
    prototype && prototype.constructor && prototype.constructor.defaultStyle;
  if (typeof defaultStyle === 'function') {
    return defaultStyle();
  }
  return defaultStyle;
}

const defaultWhitelist = ['children'];

export default function createFactory(options) {
  const {
    createElement,
    styleIndicator = '$',
    whitelist = defaultWhitelist,
  } = options;
  const transformer = createTransformer(options);
  return (Component, extender, invert = false) => {
    const transform = transformer(extender);
    function StyledElement(props) {
      return createElement(Consumer, null, styletron => {
        const elementProps = {},
          styleProps = Object.assign({}, getDefaultStyle(extender));
        for (var key in props) {
          const val = props[key];
          if (key === '$ref') {
            elementProps.ref = val;
          } else if (whitelist.indexOf(key) > -1) {
            elementProps[key] = val;
          } else if (key[0] === styleIndicator) {
            if (invert) {
              elementProps[key.slice(1)] = val;
            } else {
              styleProps[key.slice(1)] = val;
            }
          } else {
            if (invert) {
              styleProps[key] = val;
            } else {
              elementProps[key] = props[key];
            }
          }
        }
        if (
          styleProps.animationName &&
          typeof styleProps.animationName !== 'string'
        ) {
          styleProps.animationName = styletron.renderKeyframes(
            styleProps.animationName
          );
        }
        if (
          styleProps.fontFamily &&
          typeof styleProps.fontFamily !== 'string'
        ) {
          styleProps.fontFamily = styletron.renderFontFace(
            styleProps.fontFamily
          );
        }
        const styleClassName = styletron.renderStyle(transform(styleProps));
        elementProps.className = elementProps.className
          ? `${elementProps.className} ${styleClassName}`
          : styleClassName;
        return createElement(Component, elementProps);
      });
    }
    StyledElement.displayName = `stilren(${Component.displayName ||
      Component.name ||
      Component})`;
    return StyledElement;
  };
}

export { createFactory, Provider, Consumer };
