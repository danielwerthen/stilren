import { initialize } from './index';
import { createElement as h } from '../index';
import { renderToStaticMarkup } from 'react-dom/server';
import Engine from 'styletron-engine-snapshot';

const styletron = new Engine() as any;
initialize({
  styletron,
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
