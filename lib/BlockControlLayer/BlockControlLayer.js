import { createElement } from "react";
import { useDocument } from "../context/context.js";

/**
 * BlockControlLayer - block most user interactions atop the PDF.
 */
export const BlockControlLayer = () => {
  const { width, height } = useDocument();
  return createElement("div", {
    style: { zIndex: 2, width, height, position: "absolute" },
  });
};
