import React from 'react';
import ReactDOM from 'react-dom/server';
import { Server } from 'styletron-engine-atomic';
import { componentFactory, StilrenProvider } from './index';
import FreezeStyle from './FreezeStyle';

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
    MyComponent.defaultProps = {
      $fontSize: '15px',
    };
    render(
      FreezeStyle,
      {
        Frozen: MyComponent,
      },
      ({ Frozen }) =>
        React.createElement(
          Frozen,
          { $fontSize: '16px', $color: 'red' },
          'Normal props is OK'
        )
    );
  });
});
