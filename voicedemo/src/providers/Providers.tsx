import React from "react";
import { Provider, defaultTheme } from "@adobe/react-spectrum";
import { ChromeProvider } from "./ChromeProvider";
import { StateProvider } from "./StateProvider";
import { ChatRefProvider } from "./ChatRefProvider";
import { DocumentProvider } from "./DocumentProvider";
import { ExtractProvider } from "./ExtractProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = (props: ProvidersProps) => {
  const { children } = props;
  return (
    <Provider theme={defaultTheme} UNSAFE_style={{ backgroundColor: "white" }}>
      <DocumentProvider>
        <ChatRefProvider>
          <StateProvider>
            <ExtractProvider>
              <ChromeProvider>{children}</ChromeProvider>
            </ExtractProvider>
          </StateProvider>
        </ChatRefProvider>
      </DocumentProvider>
    </Provider>
  );
};
