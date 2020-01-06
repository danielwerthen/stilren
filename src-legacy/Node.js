import { Modifier } from './Modifier';

function getNode(modifier, node) {
  if (!(modifier instanceof Modifier)) {
    throw new Error('Cannot get branch of unknown modifier');
  }
  const id = modifier.getKey();
  if (!node[id]) {
    node[id] = {};
  }
  return node[id];
}

export default class Node {
  constructor(props = {}) {
    this.props = props;
  }
  set(key, value, mods) {
    const node = Modifier.combineModifiers(mods).reduce(
      (node, mod) => getNode(mod, node),
      this.props
    );
    node[key] = value;
  }
  getNode(mods) {
    if (mods.length < 1) {
      return this;
    }
    const props = Modifier.combineModifiers(mods).reduce(
      (node, mod) => getNode(mod, node),
      this.props
    );
    return new Node(props);
  }
}
