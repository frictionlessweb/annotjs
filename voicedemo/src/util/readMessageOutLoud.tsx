import { useSetDoc } from "../providers/DocumentProvider";
import { useDocument, pageOfString } from "annotjs";
import { usePDF } from "../providers/PDFContext";
import { ApiResponse } from "./askChatGPT";

type SpeechConfig = "the_answer" | "the_source";

export const useReadMessage = (config: SpeechConfig = "the_answer") => {
  const { apis } = usePDF();
  const {
    documentContext: { characters },
  } = useDocument();
  const setDoc = useSetDoc();
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
    if (res.annotations.length > 0) {
      try {
        await apis.manager.addAnnotations(res.annotations);
        // @ts-expect-error - At runtime, the object has an ID.
        await apis.manager.selectAnnotation(res.annotations[0].id);
      } catch (err) {
        console.error(err);
      }
    }
    setDoc((prev) => {
      return {
        currentPage: page !== -1 ? page + 1 : prev.currentPage,
        isPlaying: true,
      };
    });
    theMessage.onend = async () => {
      if (res.annotations.length > 0) {
        try {
          await apis.manager.removeAnnotationsFromPDF();
        } catch (err) {
          console.error(err);
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
