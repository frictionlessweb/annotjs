import React from "react";
import { Flex, Text, Divider, ProgressCircle } from "@adobe/react-spectrum";
import { useDocument } from "annotjs";
import { CHAT_TEXT_COLOR, CHAT_USER_BACKGROUND_COLOR } from "./constants";
// @ts-ignore
import { grammarify } from "./grammarify";

const clean: (str: string) => string = grammarify.clean;

interface UserMessageProps {
  text: string;
}

const UserMessage = (props: UserMessageProps) => {
  const { text } = props;
  return (
    <Flex width="100%" UNSAFE_style={{ paddingLeft: "32px" }}>
      <Flex
        UNSAFE_style={{
          padding: "16px",
          backgroundColor: CHAT_USER_BACKGROUND_COLOR,
          width: "40%",
          borderRadius: "3px",
          color: CHAT_TEXT_COLOR,
          filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.3))",
        }}
      >
        <Text>{clean(text)}</Text>
      </Flex>
    </Flex>
  );
};

interface SystemMessageProps {
  text: string;
}

const SystemMessage = (props: SystemMessageProps) => {
  const { text } = props;
  return (
    <Flex
      width="100%"
      justifyContent="end"
      UNSAFE_style={{ paddingLeft: "32px", marginBottom: "16px" }}
    >
      <Flex
        UNSAFE_style={{
          padding: "16px",
          backgroundColor: "white",
          width: "40%",
          borderRadius: "3px",
          color: CHAT_TEXT_COLOR,
          filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.3))",
        }}
      >
        <Text>{clean(text)}</Text>
      </Flex>
    </Flex>
  );
};

interface Message {
  type: "user" | "system";
  text: string;
}

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export const ChatMessages = (props: ChatMessagesProps) => {
  const { messages, isLoading } = props;
  const { width } = useDocument();
  return (
    <Flex
      direction="column"
      width={width}
      alignItems="center"
      marginY="32px"
      UNSAFE_style={{
        backgroundColor: "rgb(248, 248, 248)",
        height: "100px",
        overflowY: "scroll",
      }}
    >
      <div style={{ width: width / 3, marginTop: "8px", marginBottom: "8px" }}>
        <Divider UNSAFE_style={{ backgroundColor: "rgb(213, 213, 213)" }} />
      </div>
      {messages.map((message) => {
        if (message.type === "user") {
          return <UserMessage text={message.text} />;
        }
        return <SystemMessage text={message.text} />;
      })}
      {isLoading ? (
        <ProgressCircle marginY="16px" size="M" isIndeterminate />
      ) : null}
    </Flex>
  );
};
