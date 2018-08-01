import React from 'react';
import ReactDOM from 'react-dom/server';
import { Server } from 'styletron-engine-atomic';
import {
  componentFactory,
  StilrenProvider,
  createElement,
  StilrenExtender,
} from './index';

const breakpoints = {
  alpha: '(min-width: 100px)',
  beta: '(max-width: 800px)',
};
const pseudos = ['hover', 'focus'];

function render(Component, props, ...children) {
  const styletron = new Server();
  expect(
    ReactDOM.renderToString(
      React.createElement(
        StilrenProvider,
        { styletron, breakpoints, pseudos },
        React.createElement(Component, props, ...children)
      )
    )
  ).toMatchSnapshot();
  expect(styletron.getCss()).toMatchSnapshot();
}

describe('React createFactory', () => {
  it('should render stuff', () => {
    const MyComponent = componentFactory('div');
    const first = createElement('p', { $fontSize: '15px' }, 'Daniel');
    const cloned = React.cloneElement(
      first,
      {
        $fontSize: '25px',
      },
      'Cloned'
    );
    render(
      MyComponent,
      {
        $fontSize: '15px',
        $alphaFontSize: '25px',
      },
      cloned
    );
  });
});

class Extension {
  foo() {
    return {
      color: 'red',
    };
  }
  baz() {
    return {
      background: 'yellow',
    };
  }
}

class Extension2 {
  baz() {
    return {
      background: 'green',
    };
  }
}

describe('React extensions', () => {
  it('should render stuff', () => {
    const first = createElement(
      'p',
      { $fontSize: '15px', $foo: true, $baz: true },
      'Daniel'
    );
    const body = createElement(
      StilrenExtender,
      {
        extensions: [Extension],
      },
      first,
      createElement(
        StilrenExtender,
        {
          extensions: [Extension2],
        },
        first
      ),
      createElement(
        StilrenExtender,
        {
          extensions: [Extension2],
          replace: true,
        },
        React.cloneElement(first, { $foo: undefined })
      )
    );
    render('div', {}, body);
  });
});
