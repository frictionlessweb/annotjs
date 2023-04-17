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
      value: {
        extract: { elements: [], pages: [] },
        url: "",
        currentPage: 1,
        clientId: "",
        fileName: "",
      },
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
  // eslint-disable-next-line
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
    clientId: "",
    fileName: "",
  };
  const EXPECTED_TEXT = 'This rendered!';
  const ShouldNotThrow = () => {
    const _ = useDocument();
    return h("p", {}, EXPECTED_TEXT);
  };
  const { queryByText } = render(
    h(ExtractDocumentProvider, { value, children: h(ShouldNotThrow) })
  );
  t.notDeepEqual(queryByText(EXPECTED_TEXT), null);
});
