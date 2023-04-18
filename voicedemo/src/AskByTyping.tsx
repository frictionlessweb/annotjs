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
    <Flex direction="column" marginBottom="32px" width="100%">
      <Flex alignItems="start" UNSAFE_style={{ border: "1px solid grey" }}>
        <TextArea
          value={question}
          onChange={setQuestion}
          UNSAFE_style={{ width: "100%" }}
          UNSAFE_className="custom-textarea"
        />
        <Flex marginX="8px" height="100%" alignItems="center">
          <Button
            isDisabled={question === ""}
            onPress={sendQuestion}
            variant="primary"
          >
            <Send />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
