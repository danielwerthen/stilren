import { registerStilren } from "stilren";
import React from "react";
import App from "next/app";
import { styletron } from "../styletron";

registerStilren({
  styletron,
  mediaPrefixes: {
    mobile: "(max-width: 640px)",
  },
});

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}
