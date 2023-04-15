import React from "react";
import type { ExtractResult, DocumentContext } from "../api/api.js";

export interface ExtractDocumentProviderContextInitializer {
  extract: ExtractResult;
  url: string;
  currentPage: number;
  fileName: string;
  clientId: string;
  headers?: Array<any>;
}

export interface ExtractDocumentProviderContextValue {
  url: string;
  currentPage: number;
  documentContext: DocumentContext;
  fileName: string;
  clientId: string;
  width: number;
  height: number;
  headers?: Array<any>;
}

export interface ExtractDocumentProviderProps {
  children: React.ReactNode;
  value: ExtractDocumentProviderContextInitializer;
}

export const ExtractDocumentProvider: (
  props: ExtractDocumentProviderProps
) => JSX.Element;

export const useDocument: () => ExtractDocumentProviderContextValue;
