import createTransformer, { parseKey } from './transformer';

describe('parseKey', () => {
  it('should parse properly', () => {
    const breakpoints = {
      alpha: 1,
      beta: 2,
      zeta: 3,
    };
    const result = parseKey(
      'alphaBetaZetaDaniel',
      Object.keys(breakpoints),
      breakpoints
    );
    expect(result).toEqual(['daniel', 3, 2, 1]);
  });
  it('should only parse on camelcase', () => {
    const breakpoints = {
      alpha: 1,
      beta: 2,
      zeta: 3,
    };
    const result = parseKey(
      'alphametaDaniel',
      Object.keys(breakpoints),
      breakpoints
    );
    expect(result).toEqual(['alphametaDaniel']);
  });
});

describe('transformer', () => {
  const breakpoints = {
    alpha: '(min-width: 100px)',
    beta: '(max-width: 800px)',
  };
  const pseudos = ['hover', 'focus'];
  const transformer = createTransformer({
    breakpoints,
    pseudos,
  });
  describe('without extensions', () => {
    const transform = transformer({});
    expect(
      transform({
        fontSize: '15px',
        alphaBetaFontSize: '16px',
        betaAlphaFontSize: '17px',
      })
    ).toMatchSnapshot();
  });
  describe('with extensions', () => {
    const transform = transformer({
      myAttribute() {
        return 5;
      },
      myFunction(value) {
        return {
          color: value,
          background: value,
        };
      },
    });
    expect(
      transform({
        fontSize: '15px',
        myAttribute: true,
        myFunction: 'red',
        alphaMyFunction: 'yellow',
        alphaAlphaMyFunction: 'red',
        alphaHoverMyAttribute: true,
      })
    ).toMatchSnapshot();
  });
});
