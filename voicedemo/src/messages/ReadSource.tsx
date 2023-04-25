import React from "react";
import { Flex } from "@adobe/react-spectrum";
import { SystemResponse } from "../providers/StateProvider";
import { useReadMessage } from "../util/readMessageOutLoud";

interface ReadSourceProps {
  message: SystemResponse;
}

export const ReadSource = (props: ReadSourceProps) => {
  const {
    message: { payload: response },
  } = props;
  const readMessage = useReadMessage("the_source");
  return (
    <Flex direction="column" width="100%" alignItems="end">
      <p
        onPointerDown={() => {
          readMessage(response);
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
