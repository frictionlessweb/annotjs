import React from "react";
import { useSelector } from "./StateProvider";
import { ReactView } from "./ReactView";

interface PdfViewerProps {
  url: string;
}

const DEFAULT_VIEW_CONFIG = {
  embedMode: "FULL_WINDOW",
} as const;

export const PDFViewer = (props: PdfViewerProps) => {
  const { url } = props;
  const viewerRef = React.useRef(null);
  const isPDF = useSelector((state) => state.isPDF);
  React.useEffect(() => {
    const viewDocument = async () => {
      if (!viewerRef.current) return;
      if (!window.AdobeDC) return;
      const view = new window.AdobeDC.View({
        clientId: process.env.VITE_PUBLIC_ADOBE_EMBED_API_KEY,
        divId: "adobe-dc-view",
      });
      const config = {
        content: {
          location: {
            url: url,
          },
        },
        metaData: {
          fileName: "document",
          id: "id",
        },
      };
      await view.previewFile(config, DEFAULT_VIEW_CONFIG);
    };
    viewDocument();
    // We actually DO need to track when window.AdobeDC and viewerRef.current change
    // eslint-disable-next-line
  }, [url, window.AdobeDC, viewerRef.current]);
  if (!isPDF) {
    return <ReactView />;
  }
  return (
    <div
      ref={viewerRef}
      id="adobe-dc-view"
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 1,
      }}
    />
  );
};

const EmptyDiv = () => <div />;

const Viewer =
  globalThis?.process?.env?.NODE_ENV === undefined ? PDFViewer : EmptyDiv;

export default Viewer;
