import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "@/components/Layout";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>AnnotJS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* eslint-disable-next-line */}
      <Script
        strategy="beforeInteractive"
        src="https://documentservices.adobe.com/view-sdk/viewer.js"
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
