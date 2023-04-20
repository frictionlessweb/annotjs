import React from "react";
import { Fade } from "react-awesome-reveal";
import { Flex, ProgressCircle } from "@adobe/react-spectrum";
import { useDocument } from "annotjs";
import { useSelector } from "./providers/StateProvider";
import { useChatDivRef } from "./providers/ChatRefProvider";
import { UserMessage } from "./messages/UserMessage";
import { SystemMessage } from "./messages/SystemMessage";

export const ChatMessages = () => {
  const divRef = useChatDivRef();
  const { messages, isLoading } = useSelector((state) => {
    return {
      isLoading: state.isLoading,
      messages: [...state.messages].reverse(),
    };
  });
  return (
    <div
      ref={divRef}
      style={{
        width: "80%",
        height: `300px`,
        zIndex: 6,
        overflowY: "scroll",
      }}
    >
      <Fade>
        {isLoading ? (
          <Flex width="100%" justifyContent="center">
            <ProgressCircle marginY="16px" size="L" isIndeterminate />
          </Flex>
        ) : null}
        {messages.map((message) => {
          if (message.type === "user") {
            return <UserMessage key={message.text} text={message.text} />;
          }
          return <SystemMessage key={message.text} text={message.text} />;
        })}
      </Fade>
    </div>
  );
};
