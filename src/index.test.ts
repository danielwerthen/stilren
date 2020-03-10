import { createTransformer } from "./index";

describe("Transform", () => {
  const transform = createTransformer({});
  it("should just work", () => {
    expect(
      transform({
        fontSize: "66px",
        smallMediumFontSize: "12px"
      })
    ).toEqual(4);
  });
});
