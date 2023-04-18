import React from "react";
import { Divider, ProgressCircle } from "@adobe/react-spectrum";
import { useDocument } from "annotjs";
import { useSelector } from "./providers/StateProvider";
import { useChatDivRef } from "./providers/ChatRefProvider";
import { UserMessage } from "./messages/UserMessage";
import { SystemMessage } from "./messages/SystemMessage";

export const ChatMessages = () => {
  const divRef = useChatDivRef();
  const { messages, isLoading } = useSelector((state) => state);
  const { width } = useDocument();
  React.useEffect(
    function scrollToBottomOfChatWindow() {
      if (divRef.current === null) return;
      divRef.current.scroll({
        top: divRef.current.scrollHeight,
        behavior: "smooth",
      });
    },
    [messages, divRef]
  );
  return (
    <div
      ref={divRef}
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgb(248, 248, 248)",
        marginTop: "32px",
        alignItems: "center",
        paddingTop: '8px',
        width,
        height: "100%",
        overflowY: "scroll",
      }}
    >
      {messages.map((message) => {
        if (message.type === "user") {
          return <UserMessage key={message.text} text={message.text} />;
        }
        return <SystemMessage key={message.text} text={message.text} />;
      })}
      {isLoading ? (
        <ProgressCircle marginY="16px" size="M" isIndeterminate />
      ) : null}
    </div>
  );
};
