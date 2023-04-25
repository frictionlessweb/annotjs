import React from "react";
import { useDoc } from "./DocumentProvider";

export const ReactView = () => {
  const { pdfString, divRef } = useDoc();
  return (
    <div
      id="PDF_CONTAINER_DIV"
      ref={divRef}
      style={{ overflowY: "scroll", height: "100vh" }}
      dangerouslySetInnerHTML={{ __html: pdfString }}
    />
  );
};
