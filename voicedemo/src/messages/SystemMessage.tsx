import React from "react";
import { Flex, Text } from "@adobe/react-spectrum";
import { CHAT_TEXT_COLOR } from "../util/constants";

interface SystemMessageProps {
  text: string;
}

export const SystemMessage = (props: SystemMessageProps) => {
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
        <Text>{text}</Text>
      </Flex>
    </Flex>
  );
};
