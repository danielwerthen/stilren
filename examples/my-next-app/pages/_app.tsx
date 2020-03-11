import React from "react";
import App from "next/app";
import { styletron } from "../styletron";
import { StilrenProvider } from "stilren";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <StilrenProvider styletron={styletron}>
        <Component {...pageProps} />
      </StilrenProvider>
    );
  }
}
