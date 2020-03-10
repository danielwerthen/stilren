import { Modifier, MediaModifier, PseudoModifier } from "./Modifier";

describe("Modifier", () => {
  it("enforces singletons", () => {
    const a = new Modifier("a", "prefix");
    const b = new Modifier("a", "prefix");
    expect(a).toBe(b);
  });
  it("can combine media modifiers", () => {
    const a = new MediaModifier("(min-width: 450px)");
    const b = new MediaModifier("(max-width: 800px)");
    const aAndB = a.canCombine(b) && a.combine(b);
    expect(typeof aAndB !== "boolean" && aAndB.getKey()).toMatchSnapshot();
  });
  it("can not combine pseudo and media modifiers", () => {
    const a = new MediaModifier("(min-width: 450px)");
    const b = new PseudoModifier("hover");
    const aAndB = a.canCombine(b) && a.combine(b);
    expect(aAndB).toEqual(false);
  });
  it("can combine pseudo modifiers", () => {
    const a = new PseudoModifier("hover");
    const b = new PseudoModifier("focus");
    const aAndB = a.canCombine(b) && a.combine(b);
    expect(aAndB instanceof PseudoModifier && aAndB.getKey()).toMatchSnapshot();
  });

  it("can reduce multiple modifiers", () => {
    const a = new MediaModifier("(min-width: 450px)");
    const b = new MediaModifier("(max-width: 800px)");
    const c = new PseudoModifier("hover");
    const d = new PseudoModifier("focus");
    const mods = [d, a, b, c];
    const reduced = PseudoModifier.combineModifiers(mods);
    expect(reduced.length).toEqual(3);
  });
});
