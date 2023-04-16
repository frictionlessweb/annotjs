import React from "react";
import { Provider, defaultTheme } from "@adobe/react-spectrum";
import {
  ExtractDocumentProvider,
  ExtractDocumentProviderContextInitializer,
  ExtractResult,
} from "annotjs";
import { ChromeProvider } from "./ChromeProvider";
import { StateProvider } from "./StateProvider";
import { ChatRefProvider } from "./ChatRefProvider";
import api from "../util/api.json";

interface ProvidersProps {
  children: React.ReactNode;
}

const value: ExtractDocumentProviderContextInitializer = {
  extract: api as unknown as ExtractResult,
  currentPage: 1,
  fileName: "document.pdf",
  url: "/document.pdf",
  clientId: process.env.VITE_PUBLIC_ADOBE_EMBED_API_KEY!,
};

export const Providers = (props: ProvidersProps) => {
  const { children } = props;
  return (
    <Provider theme={defaultTheme} UNSAFE_style={{ backgroundColor: "white" }}>
      <ChatRefProvider>
        <StateProvider>
          <ExtractDocumentProvider value={value}>
            <ChromeProvider>{children}</ChromeProvider>
          </ExtractDocumentProvider>
        </StateProvider>
      </ChatRefProvider>
    </Provider>
  );
};
