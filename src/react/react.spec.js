import React from 'react';
import ReactDOM from 'react-dom/server';
import { Server } from 'styletron-engine-atomic';
import createFactory, { Provider } from './index';

const { createElement } = React;

const factory = createFactory({
  createElement,
  breakpoints: {
    alpha: '(min-width: 100px)',
    beta: '(max-width: 800px)',
  },
  pseudos: ['hover', 'focus'],
});

function render(Component, props, ...children) {
  const styletron = new Server();
  expect(
    ReactDOM.renderToString(
      createElement(
        Provider,
        { value: styletron },
        createElement(Component, props, ...children)
      )
    )
  ).toMatchSnapshot();
  expect(styletron.getCss()).toMatchSnapshot();
}

describe('React createFactory', () => {
  it('should render stuff', () => {
    class MyStyle {
      static defaultStyle() {
        return {
          fontSize: '10px',
          color: 'black',
        };
      }
    }
    const MyComponent = factory('div', new MyStyle());
    render(
      MyComponent,
      {
        $fontSize: '12px',
        $alphaFontSize: '22px',
      },
      'foobar'
    );
  });
  it('should render animations', () => {
    class MyStyle {
      static defaultStyle() {
        return {
          animationName: {
            from: {
              opacity: 0,
            },
            to: {
              opacity: 0.5,
            },
          },
          fontFamily: {
            src: 'url("/fonts") format("woff2"), url("/font2") format("woff")',
          },
        };
      }
    }
    const MyComponent = factory('div', new MyStyle());
    render(MyComponent, null, 'foobar');
  });
});
