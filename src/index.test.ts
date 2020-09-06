import { StilrenProvider } from "./index";
import { createElement as h } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Engine from "styletron-engine-snapshot";

const styletron = new Engine();

describe("Transform", () => {
  it("should just work", () => {
    expect(
      renderToStaticMarkup(
        h(
          StilrenProvider,
          {
            styletron,
            mediaPrefixes: {
              small: "(max-width: 768px)",
              large: "(min-width: 1025px)",
            },
          },
          h(
            "div",
            {
              $color: "red",
              $smallLargeBackgroundColorHover: "yellow",
              $smallColor: "blue",
            },
            "Test"
          )
        )
      )
    ).toMatchSnapshot();
  });
});
