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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <SSRProvider>
          <Provider theme={defaultTheme}>
            <Main />
          </Provider>
        </SSRProvider>
        <NextScript />
      </body>
    </Html>
  );
}
