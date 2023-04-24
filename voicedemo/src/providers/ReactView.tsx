import React from "react";
import { Flex, Heading } from "@adobe/react-spectrum";
import html from "./html.json";

const __html = html.html;

export const ReactView = () => {
  return (
    <div style={{ overflowY: "scroll" }} dangerouslySetInnerHTML={{ __html }} />
  );
};
