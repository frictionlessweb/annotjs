import React from "react";
import { Flex, Text } from "@adobe/react-spectrum";
import { CHAT_TEXT_COLOR, CHAT_USER_BACKGROUND_COLOR } from "../util/constants";
import { grammarify } from "../util/grammarify";

const clean: (str: string) => string = grammarify.clean;

interface UserMessageProps {
  text: string;
}

export const UserMessage = (props: UserMessageProps) => {
  const { text } = props;
  return (
    <Flex
      UNSAFE_style={{
        padding: "16px",
        backgroundColor: CHAT_USER_BACKGROUND_COLOR,
        width: "40%",
        borderRadius: "3px",
        color: CHAT_TEXT_COLOR,
        marginLeft: '32px',
        filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.3))",
      }}
    >
      <Text>{clean(text)}</Text>
    </Flex>
  );
};
