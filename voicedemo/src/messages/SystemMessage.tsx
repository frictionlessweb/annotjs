import React from "react";
import { Flex, Text } from "@adobe/react-spectrum";
import { CHAT_TEXT_COLOR } from "../util/constants";
import { ApiResponse } from "../util/askChatGPT";
import { ReadSource } from "./ReadSource";
import { Questions } from "./Questions";

interface SystemMessageProps {
  text: string;
}

const STYLE = {
  display: "flex",
  justifyContent: "center",
  padding: "16px",
  backgroundColor: "rgb(237, 251, 234)",
  width: "100%",
  borderRadius: "3px",
  color: CHAT_TEXT_COLOR,
  marginLeft: '16px',
  marginRight: '16px',
  marginBottom: '16px',
  filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.3))",
};

export const SystemMessage = (props: SystemMessageProps) => {
  const { text } = props;
  try {
    const response: ApiResponse = JSON.parse(text);
    if (response.type === "BAD_RESPONSE") {
      throw new Error("BAD RESPONSE");
    }
    const {
      questions,
      answer: { answer },
    } = response.payload;
    return (
      <Flex width="100%" justifyContent="center">
        <Flex UNSAFE_style={STYLE}>
          <Flex direction="column" width="100%">
            <Text marginBottom="8px">{answer}</Text>
            <Questions questions={questions} />
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
