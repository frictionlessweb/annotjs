import React from "react";
import { Heading, Text } from "@/components/Typography";
import { useDocument, useVoiceControls } from "annotjs";
import { Flex, Button } from "@adobe/react-spectrum";
import VoiceOver from "@spectrum-icons/workflow/VoiceOver";
import Stop from "@spectrum-icons/workflow/Stop";
import {
  ExtractDocumentProvider,
  RenderPDFDocumentLayer,
  HighlightTextLayer,
  RelativePDFContainer,
} from "annotjs";
import api from "./api.json";

const CLIENT_ID: string = process.env.NEXT_PUBLIC_ADOBE_EMBED_API_KEY as string;

const EXTRACT_DOCUMENT_VALUE = {
  clientId: CLIENT_ID,
  fileName: "AudioDemo.pdf",
  url: "/AudioDemo.pdf",
  currentPage: 1,
  extract: api,
};

const DemoIntroduction = () => {
  return (
    <>
      <Text marginBottom="8px">
        Try clicking the microphone below and saying {`"read paragraph three"`}{" "}
        to the computer. Doing so will highlight that paragraph in the document
        and cause it to be spoken out loud.
      </Text>
    </>
  );
};

interface SpokenHighlightsProps {
  listening: boolean;
  setListening: React.Dispatch<React.SetStateAction<boolean>>;
}

const VOICE_INDEX = 20;

const SpokenHighlights = (props: SpokenHighlightsProps) => {
  const { listening, setListening } = props;
  const {
    documentContext: { paragraphs },
  } = useDocument();
  const [highlights, setHighlights] = React.useState<string[]>([]);
  useVoiceControls({
    listening,
    setListening,
    onMessage: (result: string) => {
      const words = result.split(" ");
      const number = Number.parseInt(words[words.length - 1], 10);
      const parText = paragraphs[number - 1]?.text;
      if (parText === undefined) return;
      setHighlights([parText]);
      const theMessage = new SpeechSynthesisUtterance();
      theMessage.voice = window.speechSynthesis.getVoices()[VOICE_INDEX];
      theMessage.rate = 0.85;
      theMessage.text = parText;
      theMessage.onend = () => {
        setHighlights([]);
      };
      window.speechSynthesis.speak(theMessage);
    },
  });
  React.useEffect(() => {
    if (!listening) return;
    setHighlights([]);
  }, [listening]);
  return <HighlightTextLayer highlights={highlights} />;
};

const DemoCore = () => {
  const [listening, setListening] = React.useState(false);
  const value = React.useMemo(() => {
    return {
      ...EXTRACT_DOCUMENT_VALUE,
      currentPage: 0,
    };
  }, []);
  return (
    <>
      <Flex direction="column">
        <Flex marginY="16px">
          <Flex marginEnd="16px">
            <Button
              onPress={() => {
                speechSynthesis.cancel();
                setListening(true);
              }}
              variant={listening ? "primary" : "secondary"}
            >
              <VoiceOver size="S" />
            </Button>
          </Flex>
          <Flex>
            <Button
              variant="primary"
              isDisabled={!listening}
              onPress={() => setListening(false)}
            >
              <Stop size="S" />
            </Button>
          </Flex>
        </Flex>
        {/* @ts-ignore */}
        <ExtractDocumentProvider value={value}>
          <RelativePDFContainer
            style={{ border: "2px solid grey", marginTop: "16px" }}
          >
            <SpokenHighlights
              listening={listening}
              setListening={setListening}
            />
            <RenderPDFDocumentLayer />
          </RelativePDFContainer>
        </ExtractDocumentProvider>
      </Flex>
    </>
  );
};

const Demo = () => {
  const isChrome = "chrome" in window;
  if (!isChrome) {
    return (
      <>
        <Text marginBottom="8px">
          You must use Google Chrome to view the demo.
        </Text>
      </>
    );
  }
  return (
    <>
      <Heading level={2}>Demo</Heading>
      <DemoIntroduction />
      <DemoCore />
    </>
  );
};

export default Demo;
