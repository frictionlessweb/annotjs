import React from "react";
import { Flex, TextArea, Button } from "@adobe/react-spectrum";
import Send from "@spectrum-icons/workflow/send";
import { useDispatch } from "./providers/StateProvider";
import { askChatGPT } from "./util/askChatGPT";

export const AskByTyping = () => {
  const [question, setQuestion] = React.useState("");
  const dispatch = useDispatch();
  const sendQuestion = React.useCallback(async () => {
    dispatch({
      type: "ADD_MESSAGE",
      payload: { text: question, type: "user" },
    });
  }, [question, dispatch]);
  return (
    <Flex marginTop="32px" direction="column">
      <TextArea value={question} onChange={setQuestion} />
      <Flex marginY="8px" justifyContent="end">
        <Button onPress={sendQuestion} variant="primary">
          <Send />
        </Button>
      </Flex>
    </Flex>
  );
};
