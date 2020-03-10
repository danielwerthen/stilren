import { transform } from "./index";

describe("Transform", () => {
  it("should just work", () => {
    expect(transform(2)).toEqual(4);
  });
});
