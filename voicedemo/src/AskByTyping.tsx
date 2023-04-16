import React from "react";
import { Flex, TextArea, Button } from "@adobe/react-spectrum";
import Send from "@spectrum-icons/workflow/Send";
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
    const res = await askChatGPT(question);
    dispatch({ type: "ADD_MESSAGE", payload: { text: res, type: "system" } });
  }, [question, dispatch]);
  return (
    <Flex direction="column" marginBottom="32px">
      <TextArea value={question} onChange={setQuestion} />
      <Flex marginY="8px" justifyContent="end">
        <Button onPress={sendQuestion} variant="primary">
          <Send />
        </Button>
      </Flex>
    </Flex>
  );
};
