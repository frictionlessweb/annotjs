import React from "react";
import { Button, Flex } from "@adobe/react-spectrum";
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
import { PageButtons } from './buttons/PageButtons';
import { useDoc } from "./providers/DocumentProvider";

export const App = () => {
  const { width } = useDocument();
  const { highlights } = useDoc();
  return (
    <Flex height="100%">
      <PageButtons />
      <Flex
        width={width}
        direction="column"
        marginX="32px"
        marginY="32px"
        UNSAFE_style={{ border: "1px solid black", paddingTop: "16px" }}
      >
        <RelativePDFContainer>
          <HighlightTextLayer highlights={highlights} />
          <BlockControlLayer />
          <RenderPDFDocumentLayer />
        </RelativePDFContainer>
      </Flex>
      <Flex direction="column" height="100vh">
        <ChatMessages />
        <AskByTyping />
        <Flex marginBottom="16px" width={width} justifyContent="space-evenly">
          <HomeButton />
          <RecordButton />
          <PlayButton />
        </Flex>
      </Flex>
    </Flex>
  );
};
