import React from "react";
import { Flex, Text } from "@adobe/react-spectrum";
import { CHAT_TEXT_COLOR } from "../util/constants";
import { AnswerWithQuestions } from "../util/askChatGPT";
import { ReadSource } from "./ReadSource";
import { Questions } from "./Questions";
import { useDoc, useSetDoc } from "../providers/DocumentProvider";
import { pageOfString, useDocument } from "annotjs";

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
  const {
    documentContext: { characters },
  } = useDocument();
  const setDoc = useSetDoc();
  React.useEffect(() => {
    try {
      const response: AnswerWithQuestions = JSON.parse(text);
      const theSource = response.answer.sources[0];
      const page = pageOfString(theSource, characters);
      if (page === -1) {
        return;
      }
      const theMessage = new SpeechSynthesisUtterance();
      theMessage.rate = 0.85;
      theMessage.text = theSource;
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
