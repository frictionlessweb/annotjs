import test from "ava";
import { createElement as h } from "react";
import { render, cleanup } from "@testing-library/react";
import {
  RenderPDFDocumentLayer,
  PDF_DOCUMENT_DIV_ID,
  EMBED_API_NOT_FOUND,
} from "./pdflayer.js";
import { ExtractDocumentProvider } from "../context/context.js";

import { JSDOM } from "jsdom";

test.beforeEach(() => {
  const DOM = new JSDOM();
  globalThis.document = DOM.window.document;
  // @ts-expect-error - We know that this window is OK.
  globalThis.window = DOM.window;
});

test.afterEach(cleanup);

test("Our PDFLayer tries to render the document if the embed API is loaded", (t) => {
  const initialDc = globalThis.window.AdobeDC;
  class View {
    constructor() {}
    previewFile = () => {
      return {
        getAPIs: () => {
          return {
            gotoLocation: () => {},
          };
        },
      };
    };
  }
  try {
    globalThis.window.AdobeDC = { View };
    const value = {
      extract: {
        elements: [],
        pages: [],
      },
      url: "",
      currentPage: 1,
      clientId: "",
      fileName: "",
    };
    render(
      h(ExtractDocumentProvider, {
        value,
        children: h(RenderPDFDocumentLayer),
      })
    );
    t.notDeepEqual(window.document.getElementById(PDF_DOCUMENT_DIV_ID), null);
  } finally {
    globalThis.window.AdobeDC = initialDc;
  }
});

test("Our PDFLayer renders an error message if the embed API is not loaded", (t) => {
  const initialDc = globalThis.window.AdobeDC;
  try {
    globalThis.window.AdobeDC = null;
    const value = {
      extract: {
        elements: [],
        pages: [],
      },
      url: "",
      currentPage: 1,
      fileName: "",
      clientId: "",
    };
    const { queryByText } = render(
      h(ExtractDocumentProvider, {
        value,
        children: h(RenderPDFDocumentLayer),
      })
    );
    t.notDeepEqual(queryByText(EMBED_API_NOT_FOUND), null);
  } finally {
    globalThis.window.AdobeDC = initialDc;
  }
});
