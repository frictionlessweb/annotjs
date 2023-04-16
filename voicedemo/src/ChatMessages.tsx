import React from "react";
import { Divider, ProgressCircle } from "@adobe/react-spectrum";
import { useDocument } from "annotjs";
import { useSelector } from "./providers/StateProvider";
import { useChatDivRef } from "./providers/ChatRefProvider";
import { UserMessage } from './messages/UserMessage';
import { SystemMessage } from './messages/SystemMessage';

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
        marginBottom: "32px",
        alignItems: "center",
        width,
        height: "150px",
        overflowY: "scroll",
      }}
    >
      <div style={{ width: width / 3, marginTop: "8px", marginBottom: "8px" }}>
        <Divider UNSAFE_style={{ backgroundColor: "rgb(213, 213, 213)" }} />
      </div>
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
