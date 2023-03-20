import { Html, Head, Main, NextScript } from "next/document";
import { SSRProvider, Provider, defaultTheme } from "@adobe/react-spectrum";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="description"
          content="Annotjs - a library for document annotations."
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <body>
        <SSRProvider>
          <Provider theme={defaultTheme} locale="en-US">
            <Main />
          </Provider>
        </SSRProvider>
        <NextScript />
      </body>
    </Html>
  );
}
