import React from "react";
import { Flex, Text } from "@adobe/react-spectrum";
import {
  RelativePDFContainer,
  RenderPDFDocumentLayer,
  HighlightTextLayer,
  BlockControlLayer,
  useDocument,
} from "annotjs";
import { ChatMessages } from "./ChatMessages";
import { HomeButton } from "./HomeButton";
import { RecordButton } from "./RecordButton";
import { PlayButton } from "./PlayButton";
import { askChatGPT } from "./askChatGPT";

export const App = () => {
  const { width } = useDocument();
  React.useEffect(() => {
    askChatGPT("test")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
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
      <ChatMessages isLoading messages={[]} />
      <Flex marginBottom="16px" width={width} justifyContent="space-evenly">
        <HomeButton />
        <RecordButton />
        <PlayButton />
      </Flex>
    </Flex>
  );
};
