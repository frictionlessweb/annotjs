import React from "react";
import type { ExtractResult, DocumentContext } from "../api/api.js";

export interface ExtractDocumentProviderProps {
  children: React.ReactNode;
  value: ExtractResult;
}

export const ExtractDocumentProvider: (
  props: ExtractDocumentProviderProps
) => JSX.Element;

export const useDocument: () => DocumentContext;
