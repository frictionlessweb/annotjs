import React from "react";
import { Flex, Text, Heading } from "@adobe/react-spectrum";
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
import { PageButtons } from "./buttons/PageButtons";
import { useDoc } from "./providers/DocumentProvider";

export const App = () => {
  const { width } = useDocument();
  const { highlights } = useDoc();
  return (
    <Flex height="100%" direction="column" alignItems="center">
      <Flex>
        <Flex direction="column" justifyContent="center">
          <Heading level={1} marginBottom={0}>
            SNAP
          </Heading>
          <Heading level={3}>SNippets for Audio PDFs</Heading>
        </Flex>
        <Flex width="500px" marginStart="32px">
          <Text marginTop="32px">
            Hit the microphone button on the right and ask questions about the
            document on the left. ChatGPT will answer and source them, and our
            code will interactively highlight their sources in the PDF.
          </Text>
        </Flex>
      </Flex>
      <Flex>
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
    </Flex>
  );
};
