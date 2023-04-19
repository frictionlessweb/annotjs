import React from "react";
import { Provider, defaultTheme } from "@adobe/react-spectrum";
import { StateProvider } from "./StateProvider";
import { ChatRefProvider } from "./ChatRefProvider";
import { DocumentProvider } from "./DocumentProvider";
import { ExtractProvider } from "./ExtractProvider";
import { PDFContext } from "./PDFContext";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = (props: ProvidersProps) => {
  const { children } = props;
  const [apis, setApis] = React.useState<unknown>(null);
  return (
    <Provider
      theme={defaultTheme}
      colorScheme="light"
      UNSAFE_style={{ backgroundColor: "white", display: 'flex', alignItems: 'end' }}
    >
      <PDFContext.Provider value={{ apis, setApis }}>
        <DocumentProvider>
          <ChatRefProvider>
            <StateProvider>
              <ExtractProvider>{children}</ExtractProvider>
            </StateProvider>
          </ChatRefProvider>
        </DocumentProvider>
      </PDFContext.Provider>
    </Provider>
  );
};
