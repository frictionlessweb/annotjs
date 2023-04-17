import React from "react";
import { Flex, Text } from "@adobe/react-spectrum";
import { CHAT_TEXT_COLOR } from "../util/constants";
import { AnswerWithQuestions } from "../util/askChatGPT";
import { ReadSource } from "./ReadSource";
import { Questions } from "./Questions";
import { useDoc, useSetDoc } from "../providers/DocumentProvider";

interface SystemMessageProps {
  text: string;
}

const STYLE = {
  padding: "16px",
  backgroundColor: "white",
  width: "40%",
  borderRadius: "3px",
  color: CHAT_TEXT_COLOR,
  filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.3))",
};

export const SystemMessage = (props: SystemMessageProps) => {
  const { text } = props;
  const { currentPage } = useDoc();
  const setDoc = useSetDoc();
  React.useEffect(() => {
    try {
      const response: AnswerWithQuestions = JSON.parse(text);
      setDoc((prev) => {
        return { ...prev, isPlaying: true };
      });
      const theMessage = new SpeechSynthesisUtterance();
      theMessage.rate = 0.85;
      theMessage.text = response.answer.answer;
      speechSynthesis.speak(theMessage);
      theMessage.onend = () => {
        setDoc((prev) => {
          return { ...prev, isPlaying: false };
        });
      };
    } catch (err) {
      console.error(err);
    }
  }, [text, currentPage]);
  try {
    const response: AnswerWithQuestions = JSON.parse(text);
    return (
      <Flex
        width="100%"
        justifyContent="end"
        UNSAFE_style={{ paddingLeft: "32px", marginBottom: "16px" }}
      >
        <Flex UNSAFE_style={STYLE}>
          <Flex direction="column">
            <Text marginBottom="8px">{response.answer.answer}</Text>
            <Questions questions={response.questions} />
            <ReadSource sources={response.answer.sources} />
          </Flex>
        </Flex>
      </Flex>
    );
  } catch (err) {
    return (
      <Flex
        width="100%"
        justifyContent="end"
        UNSAFE_style={{ paddingLeft: "32px", marginBottom: "16px" }}
      >
        <Flex UNSAFE_style={STYLE}>
          <Text>{`I'm sorry, I couldn't understand that. Could you please ask me something else?`}</Text>
        </Flex>
      </Flex>
    );
  }
};
