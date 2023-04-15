import React from "react";
import { Flex, Text, Divider } from "@adobe/react-spectrum";
import { useDocument } from "annotjs";

export const ChatMessages = () => {
  const { width } = useDocument();
  return (
    <Flex
      direction="column"
      width={width}
      alignItems="center"
      UNSAFE_style={{
        backgroundColor: "rgb(248, 248, 248)",
        height: "100px",
        overflowY: "scroll",
      }}
    >
      <div style={{ width: width / 3, marginTop: '8px', marginBottom: '8px' }}>
        <Divider UNSAFE_style={{ backgroundColor: 'rgb(213, 213, 213)' }} />
      </div>
      <Text>This is a test</Text>
    </Flex>
  );
};
