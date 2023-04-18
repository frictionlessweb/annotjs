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
    const {
      answer: { answer, sources },
    } = res;
    const theSource = sources[sources.length - 1];
    const page = pageOfString(theSource, characters);
    if (page === -1) {
      return;
    }
    const theMessage = new SpeechSynthesisUtterance();
    theMessage.rate = 0.85;
    theMessage.text = answer;
    speechSynthesis.speak(theMessage);
    setDoc({
      currentPage: page + 1,
      highlights: [theSource],
      isPlaying: true,
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
