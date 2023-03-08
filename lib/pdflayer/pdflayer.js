import { createElement as h } from "react";
import { useDocument } from '../context/context.js';

export const EMBED_API_NOT_FOUND =
  "We could not detect the Embed API on this web page. Please add it and try again.";

export const PDF_DOCUMENT_DIV_ID = "__ANNOTJS_PDF_DIV__";

export const RenderPDFDocumentLayer = () => {
  const ctx = useDocument();
  if (!window.AdobeDC) {
    return h("div", { children: EMBED_API_NOT_FOUND });
  }
  return h("div", { id: PDF_DOCUMENT_DIV_ID, style: { position: "absolute" } });
};
