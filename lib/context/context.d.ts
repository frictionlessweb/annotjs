import React from 'react';
import type { ExtractResult } from '../api/api.js';

export interface ExtractDocumentProviderProps {
  children: React.ReactNode;
  value: ExtractResult;
}

export const ExtractDocumentProvider: (props: ExtractDocumentProviderProps) => JSX.Element;
