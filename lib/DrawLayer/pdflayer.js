import { createElement as h, useEffect, useRef } from "react";
import { useDocument } from "../context/context.js";

export const EMBED_API_NOT_FOUND =
  "We could not detect the Embed API on this web page. Please add it and try again.";

export const PDF_DOCUMENT_DIV_ID = "__ANNOTJS_PDF_DIV__";

const DEFAULT_VIEW_CONFIG = {
  embedMode: "SIZED_CONTAINER",
  showDownloadPDF: false,
  showFullScreen: false,
  showPrintPDF: false,
};

/**
 * RelativePDFContainer - A container for the Adobe Embed API PDF.
 *
 * @param {import("./pdflayer.js").RelativePDFContainerProps} props
 * @returns {JSX.Element}
 */
export const RelativePDFContainer = (props) => {
  const { style, children, divRef } = props;
  const { documentContext } = useDocument();
  const { pages } = documentContext;
  const width = Math.max(...pages.map((page) => page.width));
  const height = Math.max(...pages.map((page) => page.height));
  return h("div", {
    children,
    ref: divRef,
    style: { position: "relative", width, height, ...style },
  });
};

export const RenderPDFDocumentLayer = () => {
  const { currentPage, url, fileName, clientId, headers } = useDocument();
  /** @type {React.MutableRefObject<null | { gotoLocation: (page: number, x: number, y: number) => void }>} */
  const apis = useRef(null);
  useEffect(() => {
    const render = async () => {
      if (!window.AdobeDC) {
        return;
      }
      const view = new window.AdobeDC.View({
        clientId,
        divId: PDF_DOCUMENT_DIV_ID,
      });
      const config = {
        content: {
          location: {
            url: url,
            headers: headers,
          },
        },
        metaData: {
          fileName,
        },
      };
      const preview = await view.previewFile(config, DEFAULT_VIEW_CONFIG);
      const curApis = await preview.getAPIs();
      apis.current = curApis;
    };
    render();
  }, [clientId, fileName, headers, url]);
  useEffect(() => {
    if (apis.current === null) return;
    apis.current.gotoLocation(currentPage, 0, 0);
  }, [currentPage]);
  return h(
    "div",
    { id: PDF_DOCUMENT_DIV_ID, style: { position: "absolute" } },
    globalThis?.window?.AdobeDC ? "" : EMBED_API_NOT_FOUND
  );
};
