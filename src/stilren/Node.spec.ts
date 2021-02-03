import Node from './Node';
import { MediaModifier, PseudoModifier, Modifier } from './Modifier';

describe('Node', () => {
  const a = new MediaModifier('a');
  const b = new MediaModifier('b');
  const c = new PseudoModifier('c');
  it('should place props at the correct pos', () => {
    const node = new Node();
    node.set('fontSize', '19px', [a]);
    node.set('fontSize', '15px', [a]);
    node.set('fontSize', '18px', Modifier.combineModifiers([a, b]));
    node.set('fontSize', '17px', Modifier.combineModifiers([b, c, a]));
    node.set('fontSize', '15px', Modifier.combineModifiers([b, a]));
    expect(node.props).toMatchSnapshot();
  });
});
