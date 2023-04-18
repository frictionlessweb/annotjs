import React from "react";
import { Flex } from "@adobe/react-spectrum";
import { useReadMessage } from "../util/readMessageOutLoud";

interface ReadSourceProps {
  messageText: string;
}

export const ReadSource = (props: ReadSourceProps) => {
  const { messageText } = props;
  const readMessage = useReadMessage();
  return (
    <Flex direction="column" width="100%" alignItems="end">
      <p
        onClick={() => {
          readMessage(messageText);
        }}
        style={{
          cursor: "pointer",
          textDecoration: "underline",
          color: "blue",
        }}
      >
        Read Source
      </p>
    </Flex>
  );
};
