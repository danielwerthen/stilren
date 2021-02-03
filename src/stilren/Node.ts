import { Modifier } from './Modifier';

type Props = { [key: string]: unknown | Props };

function getProps(modifier: Modifier, props: Props): Props {
  if (!(modifier instanceof Modifier)) {
    throw new Error('Cannot get branch of unknown modifier');
  }
  const id = modifier.getKey();
  if (!props[id]) {
    props[id] = {};
  }
  return props[id] as Props;
}

export default class Node {
  props: { [key: string]: unknown };
  constructor(props = {}) {
    this.props = props;
  }
  set(key: string, value: unknown, mods: Modifier[]) {
    const node = mods.reduce((node, mod) => getProps(mod, node), this.props);
    node[key] = value;
  }
  getNode(mods: Modifier[]): Node {
    if (mods.length < 1) {
      return this;
    }
    const props = mods.reduce((node, mod) => getProps(mod, node), this.props);
    return new Node(props);
  }
}
