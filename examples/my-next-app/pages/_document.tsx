import Document, { Head, Main, NextScript } from "next/document";
import { StilrenProvider } from "stilren";
import { styletron } from "../styletron";

class MyDocument extends Document {
  static getInitialProps(props: any) {
    const page = props.renderPage((App: any) => (props: any) => (
      <StilrenProvider styletron={styletron}>
        <App {...props} />
      </StilrenProvider>
    ));
    const stylesheets = (styletron as any).getStylesheets() || [];
    return { ...page, stylesheets };
  }

  render() {
    return (
      <html>
        <Head>
          {(this.props as any).stylesheets.map((sheet: any, i: any) => (
            <style
              className="_styletron_hydrate_"
              dangerouslySetInnerHTML={{ __html: sheet.css }}
              media={sheet.attrs.media}
              data-hydrate={sheet.attrs["data-hydrate"]}
              key={i}
            />
          ))}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
