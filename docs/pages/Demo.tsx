import React from "react";
import { Text } from "@/components/Typography";
import { Bounds, useDocument, useVoiceControls } from "annotjs";
import { Flex, Button } from "@adobe/react-spectrum";
import {
  ExtractDocumentProvider,
  RenderPDFDocumentLayer,
  CreateAnnotationLayer,
  RelativePDFContainer,
  areOverlapping,
  HighlightTextLayer,
  AnnotationProvider,
  useAnnotationHandlers,
  useAnnotations,
  serializeBounds,
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
        Try clicking the microphone below and saying {`"next page"`} or{" "}
        {`"previous page"`} to the computer. Doing so will let you navigate
        through the document.
      </Text>
      <Text>
        You can also highlight a portion of the document and click {`"play"`} in
        order to hear that part of the document read out loud.
      </Text>
    </>
  );
};

interface SpokenHighlightsProps {
  listening: boolean;
  setListening: React.Dispatch<React.SetStateAction<boolean>>;
  setHighlights: React.Dispatch<React.SetStateAction<string[]>>;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const VOICE_INDEX = 20;

const SpokenHighlights = (props: SpokenHighlightsProps) => {
  const { listening, setListening, setPage, setPlaying, setHighlights } = props;
  const {
    documentContext: { pages },
  } = useDocument();
  useVoiceControls({
    listening,
    setListening,
    onMessage: (result: string) => {
      switch (result) {
        case "next page": {
          setPage((prevPage) => {
            return prevPage >= pages.length ? prevPage : prevPage + 1;
          });
          setPlaying(false);
          setHighlights([]);
          return;
        }
        case "previous page": {
          setPage((prevPage) => {
            return prevPage === 1 ? prevPage : prevPage - 1;
          });
          setPlaying(false);
          setHighlights([]);
          return;
        }
        default: {
          console.log(result);
          return;
        }
      }
    },
  });
  React.useEffect(() => {
    if (!listening) return;
  }, [listening]);
  return null;
};

interface CreateAnnotationsProps {
  divRef: React.MutableRefObject<HTMLDivElement | null>;
  setHighlights: React.Dispatch<React.SetStateAction<string[]>>;
}

const CreateAnnotations = (props: CreateAnnotationsProps) => {
  const { divRef, setHighlights } = props;
  const {
    currentPage,
    documentContext: { words, paragraphs },
  } = useDocument();
  return (
    <CreateAnnotationLayer
      pdfContainer={divRef as React.MutableRefObject<HTMLDivElement>}
      tokens={words}
      onCreateAnnotation={(bounds) => {
        const pageParagraphs = paragraphs.filter(
          (par) => par.page === currentPage - 1
        );
        const currentPar = pageParagraphs.find((paragraph) =>
          areOverlapping(paragraph.bounds, bounds)
        );
        if (currentPar === undefined) return;
        setHighlights([currentPar.text]);
      }}
    />
  );
};

const DemoCore = () => {
  const [listening, setListening] = React.useState(false);
  const [page, setPage] = React.useState(1);

  const [highlights, setHighlights] = React.useState<string[]>([]);
  const [playing, setPlaying] = React.useState(false);

  const value = React.useMemo(() => {
    return {
      ...EXTRACT_DOCUMENT_VALUE,
      currentPage: page,
    };
  }, [page]);
  const divRef = React.useRef<HTMLDivElement | null>(null);
  return (
    <>
      <Flex direction="column">
        <Flex marginY="16px">
          <Flex marginEnd="16px">
            <button
              onClick={() => {
                speechSynthesis.cancel();
                setListening(true);
              }}
              disabled={listening}
            >
              <Text>Speak Command</Text>
            </button>
          </Flex>
          <Flex marginEnd="16px">
            <button
              onClick={() => {
                speechSynthesis.cancel();
                setListening(false);
              }}
              disabled={!listening}
            >
              <Text>Cancel Command</Text>
            </button>
          </Flex>
          <Flex marginEnd="16px">
            <button
              onClick={() => {
                setPlaying(true);
                const theMessage = new SpeechSynthesisUtterance();
                theMessage.voice =
                  window.speechSynthesis.getVoices()[VOICE_INDEX];
                theMessage.rate = 0.85;
                theMessage.text = highlights[0];
                theMessage.onend = () => {
                  setHighlights([]);
                  setPlaying(false);
                };
                window.speechSynthesis.speak(theMessage);
              }}
              disabled={playing || highlights.length === 0}
            >
              Play
            </button>
          </Flex>
          <Flex marginEnd="16px">
            <button
              disabled={highlights.length === 0 || !playing}
              onClick={() => {
                speechSynthesis.cancel();
                setHighlights([]);
                setPlaying(false);
              }}
            >
              <Text>Stop</Text>
            </button>
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
              setHighlights={setHighlights}
              setPlaying={setPlaying}
              page={page}
              setPage={setPage}
            />
            <CreateAnnotations divRef={divRef} setHighlights={setHighlights} />
            <RenderPDFDocumentLayer />
            <HighlightTextLayer highlights={highlights} />
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
