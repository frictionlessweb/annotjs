import React from "react";
import { Flex, TextArea, Button } from "@adobe/react-spectrum";
import Send from "@spectrum-icons/workflow/send";

export const AskByTyping = () => {
  return (
    <Flex marginTop="32px" direction="column">
      <TextArea />
      <Flex marginY="8px" justifyContent="end">
        <Button variant="primary">
          <Send />
        </Button>
      </Flex>
    </Flex>
  );
};
