import React from "react";
import html from "./html.json";

interface DocumentProvider {
  currentPage: number;
  isPlaying: boolean;
  pdfString: string;
}

const DocumentProviderContext = React.createContext<DocumentProvider | null>(
  null
);

type SetterContext = null | React.Dispatch<
  React.SetStateAction<DocumentProvider>
>;

const DocumentSetterContext = React.createContext<SetterContext>(null);

interface DocumentProviderProps {
  children: React.ReactNode;
}

export const useDoc = () => {
  const ctx = React.useContext(DocumentProviderContext);
  if (ctx === null) {
    throw new Error("Please use useDoc inside its provider.");
  }
  return ctx;
};

export const useSetDoc = () => {
  const ctx = React.useContext(DocumentSetterContext);
  if (ctx === null) {
    throw new Error("Please use useSetDoc inside its provider.");
  }
  return ctx;
};

export const DocumentProvider = (props: DocumentProviderProps) => {
  const { children } = props;
  const [state, setState] = React.useState<DocumentProvider>({
    currentPage: 1,
    isPlaying: false,
    pdfString: html.html,
  });
  return (
    <DocumentProviderContext.Provider value={state}>
      <DocumentSetterContext.Provider value={setState}>
        {children}
      </DocumentSetterContext.Provider>
    </DocumentProviderContext.Provider>
  );
};
