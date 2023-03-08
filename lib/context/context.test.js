import test from "ava";
import { createElement as h } from "react";
import { render, cleanup } from "@testing-library/react";
import { ExtractDocumentProvider, useDocument } from "./context.js";

import { JSDOM } from "jsdom";

test.beforeEach(() => {
  const DOM = new JSDOM();
  globalThis.document = DOM.window.document;
  // @ts-expect-error - We know that this window is OK.
  globalThis.window = DOM.window;
});

test.afterEach(cleanup);

test("Our context renders its children", (t) => {
  const CHILD_TEXT = "Hello!";
  const { queryByText } = render(
    h(ExtractDocumentProvider, {
      value: { extract: { elements: [], pages: [] }, url: "", currentPage: 1 },
      children: h("p", {}, CHILD_TEXT),
    })
  );
  const result = queryByText(CHILD_TEXT);
  t.notDeepEqual(result, null);
});

test("useContext throws outside of its provider", (t) => {
  const ShouldThrow = () => {
    useDocument();
    return h("p", {}, "Hi");
  };
  const originalError = console.error;
  console.error = () => {};
  try {
    t.throws(() => render(h(ShouldThrow)));
  } finally {
    console.error = originalError;
  }
});

test("useContext returns the correct context inside of its provider", (t) => {
  const value = {
    extract: { elements: [], pages: [] },
    url: "",
    currentPage: 1,
  };
  const ShouldNotThrow = () => {
    const ctx = useDocument();
    return h("p", {}, JSON.stringify(ctx));
  };
  const { queryByText, debug } = render(
    h(ExtractDocumentProvider, { value, children: h(ShouldNotThrow) })
  );
  const inDocument = {
    documentContext: {
      paragraphs: [],
      characters: [],
      words: [],
      textContent: "",
      pages: [],
    },
    url: "",
    currentPage: 1,
  };
  t.notDeepEqual(queryByText(JSON.stringify(inDocument)), null);
});
