import React from 'react';
import ReactDOM from 'react-dom/server';
import { Server } from 'styletron-engine-atomic';
import { componentFactory, StilrenProvider, createElement } from './index';

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