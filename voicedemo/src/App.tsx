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
0;
import { PlayButton } from "./PlayButton";

export const App = () => {
  const { width } = useDocument();
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
      <ChatMessages />
      <Flex marginBottom="16px" width={width} justifyContent="space-evenly">
        <HomeButton />
        <RecordButton />
        <PlayButton />
      </Flex>
    </Flex>
  );
};
