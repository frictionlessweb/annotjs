import React from "react";
import { Flex, Text } from "@adobe/react-spectrum";
import { CHAT_TEXT_COLOR } from "../util/constants";
import { AnswerWithQuestions } from "../util/askChatGPT";
import { ReadSource } from "./ReadSource";
import { Questions } from "./Questions";

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
            <ReadSource messageText={text} />
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
