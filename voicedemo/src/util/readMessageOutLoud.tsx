import { useSetDoc } from "../providers/DocumentProvider";
import { useDocument, pageOfString } from "annotjs";
import { AnswerWithQuestions } from "./askChatGPT";

export const useReadMessage = () => {
  const {
    documentContext: { characters },
  } = useDocument();
  const setDoc = useSetDoc();
  const readMessage = (message: string) => {
    const res: AnswerWithQuestions = JSON.parse(message);
    let answer = res.answer.answer;
    const theSource = res.answer.sources.find((source) => {
      return pageOfString(source, characters) !== -1;
    });
    const page = pageOfString(theSource || res.answer.sources[0], characters);
    if (page === -1) {
      answer = `I couldn't find that information in the document. Here's what I know: ${answer}`;
    }
    const theMessage = new SpeechSynthesisUtterance();
    theMessage.rate = 0.85;
    theMessage.text = answer;
    console.log("about to try speaking...");
    // @ts-expect-error - very bad, trying to debug
    window.theMessage = theMessage;
    speechSynthesis.speak(theMessage);
    setDoc((prev) => {
      return {
        currentPage: page !== -1 ? page + 1 : prev.currentPage,
        highlights: theSource !== undefined ? [theSource] : [],
        isPlaying: true,
      };
    });
    theMessage.onend = () => {
      setDoc((prev) => {
        return {
          ...prev,
          highlights: [],
          isPlaying: false,
        };
      });
    };
  };
  return readMessage;
};
