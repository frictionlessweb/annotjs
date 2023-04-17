import React from "react";
import { Flex, Text } from "@adobe/react-spectrum";

interface ReadSourceProps {
  sources: string[];
}

export const ReadSource = (props: ReadSourceProps) => {
  const { sources } = props;
  return (
    <Flex direction="column" width="100%" alignItems="end">
      <p
        onClick={() => {
          console.log("do something");
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
