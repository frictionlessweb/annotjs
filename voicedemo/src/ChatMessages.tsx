import React from "react";
import { Fade } from "react-awesome-reveal";
import { Flex, ProgressCircle } from "@adobe/react-spectrum";
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
        width: "100%",
        zIndex: 6,
        overflowY: "scroll",
      }}
    >
      <Fade>
        {isLoading ? (
          <Flex width="100%" justifyContent="center">
            <ProgressCircle marginBottom="16px" size="L" isIndeterminate />
          </Flex>
        ) : null}
        {messages.map((message, index) => {
          const key = `${JSON.stringify(message.payload) + index}`;
          if (message.type === "user") {
            return <UserMessage key={key} message={message} />;
          }
          return <SystemMessage key={key} message={message}  />;
        })}
      </Fade>
    </div>
  );
};
