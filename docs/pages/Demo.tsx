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
  CreateAnnotationLayer,
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
  highlights: string[];
  setHighlights: React.Dispatch<React.SetStateAction<string[]>>;
}

const VOICE_INDEX = 20;

const SpokenHighlights = (props: SpokenHighlightsProps) => {
  const { listening, setListening, highlights, setHighlights } = props;
  const {
    documentContext: { paragraphs },
  } = useDocument();
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
  }, [listening, setHighlights]);
  return <HighlightTextLayer highlights={highlights} />;
};

interface CreateAnnotationsProps {
  divRef: React.MutableRefObject<HTMLDivElement | null>;
}

const CreateAnnotations = (props: CreateAnnotationsProps) => {
  const { divRef } = props;
  const {
    documentContext: { words },
  } = useDocument();
  return (
    <CreateAnnotationLayer
      pdfContainer={divRef as React.MutableRefObject<HTMLDivElement>}
      tokens={words}
      onCreateAnnotation={console.log}
    />
  );
};

const DemoCore = () => {
  const [listening, setListening] = React.useState(false);
  const [highlights, setHighlights] = React.useState<string[]>([]);
  const value = React.useMemo(() => {
    return {
      ...EXTRACT_DOCUMENT_VALUE,
      currentPage: 1,
    };
  }, []);
  const divRef = React.useRef<HTMLDivElement | null>(null);
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
              isDisabled={!listening && highlights.length === 0}
              onPress={() => {
                speechSynthesis.cancel();
                setListening(false);
                setHighlights([]);
              }}
            >
              <Stop size="S" />
            </Button>
          </Flex>
        </Flex>
        {/* @ts-ignore */}
        <ExtractDocumentProvider value={value}>
          <RelativePDFContainer
            divRef={divRef}
            style={{ border: "2px solid grey", marginTop: "16px" }}
          >
            <SpokenHighlights
              listening={listening}
              setListening={setListening}
              highlights={highlights}
              setHighlights={setHighlights}
            />
            <CreateAnnotations divRef={divRef} />
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
          You must use Google Chrome to view the demo. Most of the code in the
          library works with any browser, but the text recognition features hook
          used here rely on features that are not yet standardized across all
          browsers.
        </Text>
      </>
    );
  }
  return (
    <>
      <DemoIntroduction />
      <DemoCore />
    </>
  );
};

export default Demo;
