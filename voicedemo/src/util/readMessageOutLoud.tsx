import { useSetDoc } from "../providers/DocumentProvider";
import { useSelector, useDispatch } from "../providers/StateProvider";
import { ApiResponse } from "./askChatGPT";
import html from "../providers/html.json";

type SpeechConfig = "the_answer" | "the_source";

const highlightSource = (pdfString: string, theSource: string): string => {
  const res = pdfString.replaceAll(
    theSource,
    `<span style="background-color: yellow;">${theSource}</span>`
  );
  return res;
};

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const useReadMessage = (config: SpeechConfig = "the_answer") => {
  const setDoc = useSetDoc();
  const isPDF = useSelector((state) => state.isPDF);
  const dispatch = useDispatch();
  const readMessage = async (message: string) => {
    const response: ApiResponse = JSON.parse(message);
    if (response.type === "BAD_RESPONSE") {
      return;
    }
    const res = response.payload;
    let answer = res.answer.answer;
    const theSource = res.answer.sources.find((source) => {
      return html.html.indexOf(source) !== -1;
    });
    if (theSource === undefined) {
      answer = `I couldn't find that information in the document. Here's what I know: ${answer}`;
    } else if (config === "the_source" && theSource !== undefined) {
      answer = theSource;
    }
    const theMessage = new SpeechSynthesisUtterance();
    theMessage.rate = 0.85;
    theMessage.text = answer;
    speechSynthesis.speak(theMessage);
    let initialPosition =
      document.getElementById("PDF_CONTAINER_DIV")?.scrollTop || 0;
    if (res.annotations.length > 0 && theSource !== undefined) {
      if (isPDF) {
        dispatch({ type: "SET_HTML" });
      }
      setDoc((prev) => {
        return {
          ...prev,
          pdfString: highlightSource(prev.pdfString, theSource),
        };
      });
      // We need to let the next microtask occur so we can actually grab the div and adjust
      // the scroll position.
      await delay(0);
      const theDiv = document.getElementById("PDF_CONTAINER_DIV");
      if (theDiv !== null) {
        const matchingElements = [...document.querySelectorAll("span")].filter(
          // @ts-expect-error - We know there's a valid textContent field.
          (span) => span.textContent.includes(theSource)
        );
        const matchingElement = matchingElements[matchingElements.length - 1];
        if (matchingElement !== undefined) {
          theDiv.scrollTop = 0;
          const newTop = matchingElement.getBoundingClientRect().top - 10;
          theDiv.scrollTop = newTop;
          initialPosition = newTop;
        }
      }
    }
    setDoc((prev) => {
      return {
        ...prev,
        isPlaying: true,
      };
    });

    theMessage.onend = async () => {
      if (res.annotations.length > 0) {
        if (theSource !== undefined) {
          setDoc((prev) => {
            return {
              ...prev,
              pdfString: html.html,
            };
          });
          const theDiv = document.getElementById("PDF_CONTAINER_DIV");
          if (theDiv !== null) {
            theDiv.scrollTop = initialPosition;
          }
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
