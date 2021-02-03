import { registerStilren } from './index';
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Engine from 'styletron-engine-snapshot';

const styletron = new Engine() as any;
registerStilren({
  styletron,
  mediaPrefixes: {
    small: '(max-width: 768px)',
    large: '(min-width: 1025px)',
  },
});

function Base(props: any) {
  return h('div', {
    $margin: '11em',
    $background: 'red',
    ...props,
  });
}

describe('Transform', () => {
  it('should just work', () => {
    expect(
      renderToStaticMarkup(
        h(
          Base,
          {
            $margin: '5em',
            $color: 'red',
            $smallLargeBackgroundColorHover: 'yellow',
            $smallColor: 'blue',
          },
          'Test'
        )
      )
    ).toMatchSnapshot();
  });
});
