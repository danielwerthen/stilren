import { createParser } from "./Parser";
import { Modifier } from "./Modifier";

describe("Parser", () => {
  const prefixes = {
    alpha: new Modifier("a", "prefix"),
    beta: new Modifier("b", "prefix"),
    zeta: new Modifier("z", "prefix")
  };
  const suffixes = {
    Less: new Modifier("l", "suffix"),
    More: new Modifier("m", "suffix"),
    Often: new Modifier("o", "suffix")
  };
  it("should parse prefixes properly", () => {
    const parser = createParser(prefixes, {});
    const result = parser("alphaBetaZetaDaniel");
    expect(result).toEqual([
      "daniel",
      [prefixes.zeta, prefixes.beta, prefixes.alpha]
    ]);
  });
  it("should parse prefixes and suffixes properly", () => {
    const parser = createParser(prefixes, suffixes);
    const result = parser("alphaBetaZetaDanielLessMoreOften");
    expect(result).toEqual([
      "daniel",
      [
        prefixes.zeta,
        prefixes.beta,
        prefixes.alpha,
        suffixes.Less,
        suffixes.More,
        suffixes.Often
      ]
    ]);
  });
  it("should not match on mismatched casing properly", () => {
    const parser = createParser(prefixes, suffixes);
    const result = parser("alphaBetaZetaDanielLessMoreOften".toLowerCase());
    expect(result).toEqual([
      "alphaBetaZetaDanielLessMoreOften".toLowerCase(),
      []
    ]);
  });
});
