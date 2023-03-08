declare global {
  interface Window {
    AdobeDC: any;
  }
}

export const RenderPDFDocumentLayer: () => JSX.Element;

export const EMBED_API_NOT_FOUND =
  "We could not detect the Embed API on this web page. Please add it and try again.";

export const PDF_DOCUMENT_DIV_ID = "__ANNOTJS_PDF_DIV__";
