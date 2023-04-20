import React from "react";
import { useDoc } from './DocumentProvider';

interface PDFHandlers {
  apis: any;
  setApis: (apis: any) => void;
}

export const PDFContext = React.createContext<PDFHandlers | null>(null);

export const usePDF = () => {
  const ctx = React.useContext(PDFContext);
  if (ctx === null) {
    throw new Error(`Please use usePDF inside of its provider.`);
  }
  return ctx;
};

interface PDFViewerProps {
  url: string;
}

declare global {
  interface Window {
    AdobeDC: any;
  }
}

interface HasIdAndText {
  id: string;
  [data: string]: unknown;
}

interface AdobeEvent {
  type: string;
  data: unknown;
}

interface AdobeAnnotationAddedEvent {
  type: "ANNOTATION_ADDED";
  data: {
    id: string;
    target: {
      selector: {
        node: {
          index: number;
        };
        quadPoints: Array<number>;
      };
    };
  };
}

interface AdobeAnnotationDeletedEvent {
  type: "ANNOTATION_DELETED";
  data: {
    id: string;
  };
}

interface PdfViewerProps {
  url: string;
}

const DEFAULT_VIEW_CONFIG = {
  embedMode: "FULL_WINDOW",
  showDownloadPDF: false,
  showFullScreen: false,
  showPrintPDF: false,
  enableAnnotationAPIs: true,
  includePDFAnnotations: true,
} as const;

export const PDFViewer = (props: PdfViewerProps) => {
  const { url } = props;
  const viewerRef = React.useRef(null);
  const { setApis } = usePDF();
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
      const preview = await view.previewFile(config, DEFAULT_VIEW_CONFIG);
      console.log('preview ran');
      // For mysterious reasons, if you don't call this function, the Embed API
      // won't actually return the new annotation object to you.
      const manager = await preview.getAnnotationManager();
      console.log('got annotation manager');
      await manager.setConfig({ showCommentsPanel: false });
      console.log('ran set config');
      // @ts-expect-error - We're attaching this in a dirty way.
      window.manager = manager;
      console.log('attached manager to window');
      setApis({ manager });
    };
    viewDocument();
  }, [url, setApis, window.AdobeDC, viewerRef.current]);
  return (
    <div
      ref={viewerRef}
      id="adobe-dc-view"
      style={{ width: "100%", height: "100%", position: "absolute", zIndex: 1 }}
    />
  );
};

const EmptyDiv = () => <div />;

const Viewer =
  globalThis?.process?.env?.NODE_ENV === undefined ? PDFViewer : EmptyDiv;

export default Viewer;
