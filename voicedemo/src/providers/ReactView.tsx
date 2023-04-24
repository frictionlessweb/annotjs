import React from "react";
import { Flex, Heading } from "@adobe/react-spectrum";
import { useDoc } from "./DocumentProvider";

export const ReactView = () => {
  const { pdfString } = useDoc();
  return (
    <div
      style={{ overflowY: "scroll" }}
      dangerouslySetInnerHTML={{ __html: pdfString }}
    />
  );
};
