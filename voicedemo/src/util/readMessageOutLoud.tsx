import { useSetDoc } from "../providers/DocumentProvider";
import { useSelector } from "../providers/StateProvider";
import { useDocument, pageOfString } from "annotjs";
import { usePDF } from "../providers/PDFContext";
import { ApiResponse } from "./askChatGPT";
import html from "../providers/html.json";

type SpeechConfig = "the_answer" | "the_source";

const highlightSource = (pdfString: string, theSource: string): string => {
  console.log(pdfString);
  console.log(pdfString.indexOf('In 2022,'));
  const res = pdfString.replaceAll(
    theSource,
    `<span style="background-color: yellow;">${theSource}</span>`
  );
  console.log(res === pdfString);
  return res;
};

export const useReadMessage = (config: SpeechConfig = "the_answer") => {
  const { apis } = usePDF();
  const {
    documentContext: { characters },
  } = useDocument();
  const setDoc = useSetDoc();
  const isPDF = useSelector((state) => state.isPDF);
  const readMessage = async (message: string) => {
    const response: ApiResponse = JSON.parse(message);
    if (response.type === "BAD_RESPONSE") {
      return;
    }
    const res = response.payload;
    let answer = res.answer.answer;
    const theSource = res.answer.sources.find((source) => {
      return pageOfString(source, characters) !== -1;
    });
    const page = pageOfString(theSource || res.answer.sources[0], characters);
    if (page === -1) {
      answer = `I couldn't find that information in the document. Here's what I know: ${answer}`;
    } else if (config === "the_source" && theSource !== undefined) {
      answer = theSource;
    }
    const theMessage = new SpeechSynthesisUtterance();
    theMessage.rate = 0.85;
    theMessage.text = answer;
    speechSynthesis.speak(theMessage);
    // @ts-expect-error - We've attached it to the window object.
    const manager = apis?.manager || window.manager;
    const shouldUseAnnotationApi = isPDF && Boolean(manager);
    if (res.annotations.length > 0) {
      if (shouldUseAnnotationApi) {
        try {
          await manager.addAnnotations(res.annotations);
          // @ts-expect-error - At runtime, the object has an ID.
          await manager.selectAnnotation(res.annotations[0].id);
        } catch (err) {
          console.error(err);
        }
      } else if (page !== -1) {
        setDoc((prev) => {
          return {
            ...prev,
            pdfString: highlightSource(prev.pdfString, theSource!),
          };
        });
      }
    }
    setDoc((prev) => {
      return {
        ...prev,
        currentPage: page !== -1 ? page + 1 : prev.currentPage,
        isPlaying: true,
      };
    });
    theMessage.onend = async () => {
      if (res.annotations.length > 0) {
        if (shouldUseAnnotationApi) {
          try {
            await manager.removeAnnotationsFromPDF();
          } catch (err) {
            console.error(err);
          }
        } else if (page !== -1) {
          setDoc((prev) => {
            return {
              ...prev,
              pdfString: html.html,
            };
          });
        }
      }
      setDoc((prev) => {
        return {
          ...prev,
          isPlaying: false,
        };
      });
    };
  };
  return readMessage;
};
