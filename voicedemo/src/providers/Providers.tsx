import React from "react";
import { Provider, defaultTheme } from "@adobe/react-spectrum";
import { StateProvider } from "./StateProvider";
import { ChatRefProvider } from "./ChatRefProvider";
import { DocumentProvider } from "./DocumentProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = (props: ProvidersProps) => {
  const { children } = props;
  return (
    <Provider
      theme={defaultTheme}
      colorScheme="light"
      UNSAFE_style={{
        backgroundColor: "white",
        display: "flex",
        alignItems: "end",
      }}
    >
      <DocumentProvider>
        <ChatRefProvider>
          <StateProvider>
            {children}
          </StateProvider>
        </ChatRefProvider>
      </DocumentProvider>
    </Provider>
  );
};
