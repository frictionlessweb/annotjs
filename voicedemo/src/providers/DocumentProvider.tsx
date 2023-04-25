import React from "react";
import html from "./html.json";

interface DocumentProvider {
  isPlaying: boolean;
  pdfString: string;
  divRef: React.MutableRefObject<HTMLDivElement | null>;
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
  const divRef = React.useRef<HTMLDivElement | null>(null);
  const [state, setState] = React.useState<DocumentProvider>({
    isPlaying: false,
    pdfString: html.html,
    divRef: divRef,
  });
  return (
    <DocumentProviderContext.Provider value={state}>
      <DocumentSetterContext.Provider value={setState}>
        {children}
      </DocumentSetterContext.Provider>
    </DocumentProviderContext.Provider>
  );
};
