import React from "react";
import { Flex } from "@adobe/react-spectrum";
import {
  RelativePDFContainer,
  RenderPDFDocumentLayer,
  HighlightTextLayer,
  BlockControlLayer,
  useDocument,
} from "annotjs";
import { AskByTyping } from "./AskByTyping";
import { ChatMessages } from "./ChatMessages";
import { HomeButton } from "./buttons/HomeButton";
import { RecordButton } from "./buttons/RecordButton";
import { PlayButton } from "./buttons/PlayButton";

export const App = () => {
  const { width } = useDocument();
  return (
    <Flex height="100%" alignItems="end">
      <Flex
        width={width}
        direction="column"
        marginX="32px"
        marginY="32px"
        UNSAFE_style={{ border: "1px solid black", paddingTop: "16px" }}
      >
        <RelativePDFContainer>
          <HighlightTextLayer highlights={[]} />
          <BlockControlLayer />
          <RenderPDFDocumentLayer />
        </RelativePDFContainer>

        <ChatMessages />
        <Flex marginBottom="16px" width={width} justifyContent="space-evenly">
          <HomeButton />
          <RecordButton />
          <PlayButton />
        </Flex>
      </Flex>
      <AskByTyping />
    </Flex>
  );
};
