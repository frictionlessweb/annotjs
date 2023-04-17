import React from "react";
import {
  ExtractDocumentProvider,
  ExtractDocumentProviderContextInitializer,
  ExtractResult,
} from "annotjs";
import { useDoc } from "./DocumentProvider";
import api from "../util/api.json";

const valueBase = {
  extract: api as unknown as ExtractResult,
  currentPage: 1,
  fileName: "document.pdf",
  url: "/document.pdf",
  clientId: process.env.VITE_PUBLIC_ADOBE_EMBED_API_KEY!,
};

interface ExtractProviderProps {
  children: React.ReactNode;
}

export const ExtractProvider = (props: ExtractProviderProps) => {
  const { children } = props;
  const { currentPage } = useDoc();
  return (
    <ExtractDocumentProvider value={{ ...valueBase, currentPage }}>
      {children}
    </ExtractDocumentProvider>
  );
};
