import test from "ava";
import { createElement as h } from "react";
import { render } from "@testing-library/react";
import { ExtractDocumentProvider } from "./context.js";

import { JSDOM } from "jsdom";

test.beforeEach(() => {
  const DOM = new JSDOM();
  globalThis.document = DOM.window.document;
  // @ts-expect-error - We know that this window is OK.
  globalThis.window = DOM.window;
});

test("Our context renders its children", (t) => {
  const CHILD_TEXT = "Hello!";
  const { queryByText } = render(
    h(ExtractDocumentProvider, {
      value: { elements: [], pages: [] },
      children: h("p", {}, CHILD_TEXT),
    })
  );
  const result = queryByText(CHILD_TEXT);
  t.notDeepEqual(result, null);
});

test.skip("useContext throws outside of its provider", (t) => {});

test.skip("useContext returns the correct context inside of its provider", (t) => {});
