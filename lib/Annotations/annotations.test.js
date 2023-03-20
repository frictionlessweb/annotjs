import { createElement as h } from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import {
  AnnotationProvider,
  useAnnotations,
  useAnnotationHandlers,
} from "./annotations.js";
import test from "ava";
import { JSDOM } from "jsdom";

const originalError = console.error;
console.error = (...args) => {
  if (args[0].includes("Each child in a list should have a unique")) {
    return;
  }
  originalError(args);
};

test.beforeEach(() => {
  const DOM = new JSDOM();
  globalThis.document = DOM.window.document;
  // @ts-expect-error - We know that this window is OK.
  globalThis.window = DOM.window;
});

test("Annotation provider renders its children", (t) => {
  const TEXT = "TEXT";
  const { getByText } = render(h(AnnotationProvider, { children: TEXT }));
  t.notDeepEqual(getByText(TEXT), null);
  t.teardown(cleanup);
});

test("We can add an annotation and delete an annotation and update an annotation", (t) => {
  const ID = "1234";
  const MISSING = "MISSING";
  const NEW_ANNOTATION = {
    id: ID,
    height: 10,
    page: 1,
    backgroundColor: "blue",
    border: "1px solid blue",
    left: 10,
    top: 10,
    width: 10,
    label: "",
  };
  const UPDATED_ANNOTATION = {
    id: ID,
    height: 10,
    page: 1,
    backgroundColor: "green",
    border: "1px solid blue",
    left: 20,
    top: 20,
    width: 20,
    label: "",
  };
  const IS_SELECTED = `ID ${ID} IS SELECTED`;
  const AnnotationTest = () => {
    const annotations = useAnnotations();
    const {
      createAnnotation,
      deleteAnnotation,
      updateAnnotation,
      selectAnnotation,
      deselectAnnotation,
    } = useAnnotationHandlers();
    return h("div", {
      children: [
        h("div", {
          children: [
            h("p", {
              key: "1",
              children: annotations.annotations[ID]
                ? JSON.stringify(annotations.annotations[ID])
                : MISSING,
            }),
            h("p", {
              key: "2",
              children: annotations.selectedAnnotations[ID]
                ? IS_SELECTED
                : "NONE SELECTED",
            }),
          ],
        }),
        h("button", {
          "data-testid": "create-annotation",
          onClick: () => createAnnotation(NEW_ANNOTATION),
          children: "Create annotation",
        }),
        h("button", {
          "data-testid": "update-annotation",
          onClick: () => updateAnnotation(UPDATED_ANNOTATION),
          children: "Update annotation",
        }),
        h("button", {
          "data-testid": "delete-annotation",
          onClick: () => deleteAnnotation(ID),
          children: "Delete annotation",
        }),
        h("button", {
          "data-testid": "select-annotation",
          onClick: () => selectAnnotation(ID),
          children: "Select annotation",
        }),
        h("button", {
          "data-testid": "deselect-annotation",
          onClick: () => deselectAnnotation(ID),
          children: "Select annotation",
        }),
      ],
    });
  };
  const { getByTestId, getByText } = render(
    h(AnnotationProvider, { children: h(AnnotationTest, {}) })
  );
  getByText(MISSING);
  fireEvent.click(getByTestId("create-annotation"));
  getByText(JSON.stringify(NEW_ANNOTATION));
  fireEvent.click(getByTestId("update-annotation"));
  getByText(JSON.stringify(UPDATED_ANNOTATION));
  fireEvent.click(getByTestId("delete-annotation"));
  t.notDeepEqual(getByText(MISSING), null);
  t.teardown(cleanup);
});

test("We can select an annotation and deslect an annotation", (t) => {
  const ID = "1234";
  const MISSING = "MISSING";
  const NEW_ANNOTATION = {
    id: ID,
    height: 10,
    page: 1,
    backgroundColor: "blue",
    border: "1px solid blue",
    left: 10,
    top: 10,
    width: 10,
    label: "",
  };
  const UPDATED_ANNOTATION = {
    id: ID,
    height: 10,
    page: 1,
    backgroundColor: "green",
    border: "1px solid blue",
    left: 20,
    top: 20,
    width: 20,
    label: "",
  };
  const IS_SELECTED = `ID ${ID} IS SELECTED`;
  const NONE_SELECTED = "NONE SELECTED";
  const AnnotationTest = () => {
    const annotations = useAnnotations();
    const {
      createAnnotation,
      deleteAnnotation,
      updateAnnotation,
      selectAnnotation,
      deselectAnnotation,
    } = useAnnotationHandlers();
    return h("div", {
      key: "test",
      children: [
        h("div", {
          children: [
            h("p", {
              key: "1",
              children: annotations.annotations[ID]
                ? JSON.stringify(annotations.annotations[ID])
                : MISSING,
            }),
            h("p", {
              key: "2",
              children: annotations.selectedAnnotations[ID]
                ? IS_SELECTED
                : NONE_SELECTED,
            }),
          ],
        }),
        h("button", {
          "data-testid": "create-annotation",
          onClick: () => createAnnotation(NEW_ANNOTATION),
          key: "3",
          children: "Create annotation",
        }),
        h("button", {
          "data-testid": "update-annotation",
          onClick: () => updateAnnotation(UPDATED_ANNOTATION),
          key: "4",
          children: "Update annotation",
        }),
        h("button", {
          "data-testid": "delete-annotation",
          onClick: () => deleteAnnotation(ID),
          children: "Delete annotation",
          key: "5",
        }),
        h("button", {
          "data-testid": "select-annotation",
          onClick: () => selectAnnotation(ID),
          children: "Select annotation",
          key: "6",
        }),
        h("button", {
          "data-testid": "deselect-annotation",
          onClick: () => deselectAnnotation(ID),
          children: "Select annotation",
          key: "7",
        }),
      ],
    });
  };
  const { getByTestId, getByText } = render(
    h(AnnotationProvider, { children: h(AnnotationTest, {}) })
  );
  getByText(NONE_SELECTED);
  fireEvent.click(getByTestId("create-annotation"));
  fireEvent.click(getByTestId("select-annotation"));
  getByText(IS_SELECTED);
  fireEvent.click(getByTestId("deselect-annotation"));
  t.notDeepEqual(getByText(NONE_SELECTED), null);
  t.teardown(cleanup);
});

test("Creating an annotation selects it", (t) => {
  const ID = "1234";
  const MISSING = "MISSING";
  const NEW_ANNOTATION = {
    id: ID,
    height: 10,
    page: 1,
    backgroundColor: "blue",
    border: "1px solid blue",
    left: 10,
    top: 10,
    width: 10,
    label: "",
  };
  const UPDATED_ANNOTATION = {
    id: ID,
    height: 10,
    page: 1,
    backgroundColor: "green",
    border: "1px solid blue",
    left: 20,
    top: 20,
    width: 20,
    label: "",
  };
  const IS_SELECTED = `ID ${ID} IS SELECTED`;
  const NONE_SELECTED = "NONE SELECTED";
  const AnnotationTest = () => {
    const annotations = useAnnotations();
    const {
      createAnnotation,
      deleteAnnotation,
      updateAnnotation,
      selectAnnotation,
      deselectAnnotation,
    } = useAnnotationHandlers();
    return h("div", {
      children: [
        h("div", {
          children: [
            h("p", {
              children: annotations.annotations[ID]
                ? JSON.stringify(annotations.annotations[ID])
                : MISSING,
            }),
            h("p", {
              children: annotations.selectedAnnotations[ID]
                ? IS_SELECTED
                : NONE_SELECTED,
            }),
          ],
        }),
        h("button", {
          "data-testid": "create-annotation",
          onClick: () => createAnnotation(NEW_ANNOTATION),
          children: "Create annotation",
        }),
        h("button", {
          "data-testid": "update-annotation",
          onClick: () => updateAnnotation(UPDATED_ANNOTATION),
          children: "Update annotation",
        }),
        h("button", {
          "data-testid": "delete-annotation",
          onClick: () => deleteAnnotation(ID),
          children: "Delete annotation",
        }),
        h("button", {
          "data-testid": "select-annotation",
          onClick: () => selectAnnotation(ID),
          children: "Select annotation",
        }),
        h("button", {
          "data-testid": "deselect-annotation",
          onClick: () => deselectAnnotation(ID),
          children: "Select annotation",
        }),
      ],
    });
  };
  const { getByTestId, getByText } = render(
    h(AnnotationProvider, { children: h(AnnotationTest, {}) })
  );
  fireEvent.click(getByTestId("create-annotation"));
  t.notDeepEqual(getByText(IS_SELECTED), null);
  t.teardown(cleanup);
});

test("Deleting an annotation unselects it", (t) => {
  const ID = "1234";
  const MISSING = "MISSING";
  const NEW_ANNOTATION = {
    id: ID,
    height: 10,
    page: 1,
    backgroundColor: "blue",
    border: "1px solid blue",
    left: 10,
    top: 10,
    width: 10,
    label: "",
  };
  const UPDATED_ANNOTATION = {
    id: ID,
    height: 10,
    page: 1,
    backgroundColor: "green",
    border: "1px solid blue",
    left: 20,
    top: 20,
    width: 20,
    label: "",
  };
  const IS_SELECTED = `ID ${ID} IS SELECTED`;
  const NONE_SELECTED = "NONE SELECTED";
  const AnnotationTest = () => {
    const annotations = useAnnotations();
    const {
      createAnnotation,
      deleteAnnotation,
      updateAnnotation,
      selectAnnotation,
      deselectAnnotation,
    } = useAnnotationHandlers();
    return h("div", {
      children: [
        h("div", {
          children: [
            h("p", {
              children: annotations.annotations[ID]
                ? JSON.stringify(annotations.annotations[ID])
                : MISSING,
            }),
            h("p", {
              children: annotations.selectedAnnotations[ID]
                ? IS_SELECTED
                : NONE_SELECTED,
            }),
          ],
        }),
        h("button", {
          "data-testid": "create-annotation",
          onClick: () => createAnnotation(NEW_ANNOTATION),
          children: "Create annotation",
        }),
        h("button", {
          "data-testid": "update-annotation",
          onClick: () => updateAnnotation(UPDATED_ANNOTATION),
          children: "Update annotation",
        }),
        h("button", {
          "data-testid": "delete-annotation",
          onClick: () => deleteAnnotation(ID),
          children: "Delete annotation",
        }),
        h("button", {
          "data-testid": "select-annotation",
          onClick: () => selectAnnotation(ID),
          children: "Select annotation",
        }),
        h("button", {
          "data-testid": "deselect-annotation",
          onClick: () => deselectAnnotation(ID),
          children: "Select annotation",
        }),
      ],
    });
  };
  const { getByTestId, getByText } = render(
    h(AnnotationProvider, { children: h(AnnotationTest, {}) })
  );
  fireEvent.click(getByTestId("create-annotation"));
  getByText(IS_SELECTED);
  fireEvent.click(getByTestId("delete-annotation"));
  t.notDeepEqual(getByText(NONE_SELECTED), null);
  t.teardown(cleanup);
});
