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
            styletron
          },
          h(
            "div",
            {
              $color: "red",
              $smallLargeBackgroundColorHover: "yellow",
              $smallColor: "red"
            },
            "Test"
          )
        )
      )
    ).toMatchSnapshot();
  });
});
