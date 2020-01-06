import React from "react";

export default React.createContext({
  transform({ $color, ...props }: any) {
    return {
      ...props,
      className: "foobar",
      style: {
        color: $color
      }
    };
  }
});
