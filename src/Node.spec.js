import Node from './Node';
import { MediaModifier, PseudoModifier } from './Modifier';

describe('Node', () => {
  const a = new MediaModifier('a');
  const b = new MediaModifier('b');
  const c = new PseudoModifier('c');
  const d = new PseudoModifier('d');
  it('should place props at the correct pos', () => {
    const node = new Node();
    node.set('fontSize', '19px', [a]);
    node.set('fontSize', '15px', [a]);
    node.set('fontSize', '18px', [a, b]);
    node.set('fontSize', '17px', [b, c, a]);
    node.set('fontSize', '15px', [b, a]);
    expect(node.props).toMatchSnapshot();
  });
});
