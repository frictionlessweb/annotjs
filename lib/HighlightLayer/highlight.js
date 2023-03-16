import { createElement as h, Fragment } from "react";
import { useDocument } from "../context/context.js";

export const HighlightTextLayer = () => {
  const {
    currentPage,
    documentContext: { words },
  } = useDocument();
  return h(Fragment, {});
};
