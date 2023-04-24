import React from "react";
import { Flex, Text, Button } from "@adobe/react-spectrum";
import { useDispatch } from "../providers/StateProvider";
import { askChatGPT } from "../util/askChatGPT";
import { useReadMessage } from "../util/readMessageOutLoud";
import { useSelector } from "../providers/StateProvider";

interface QuestionProps {
  questions: string[];
}

export const Questions = (props: QuestionProps) => {
  const { questions } = props;
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.isLoading);
  const readMessage = useReadMessage();
  return (
    <Flex direction="column">
      {questions.map((question) => {
        return (
          <div
            onPointerDown={async () => {
              if (isLoading) return;
              dispatch({
                type: "ADD_MESSAGE",
                payload: { type: "user", text: question },
              });
              const res = await askChatGPT(question);
              const stringified = JSON.stringify(res);
              dispatch({
                type: "ADD_MESSAGE",
                payload: { type: "system", text: stringified },
              });
              try {
                readMessage(stringified);
              } catch (err) {
                console.error(err);
              }
            }}
            style={{
              width: "100%",
              marginBottom: "8px",
              backgroundColor: "rgb(248, 214, 140)",
              color: "black",
              cursor: "pointer",
              filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.3))",
              paddingLeft: "4px",
              paddingTop: "8px",
              paddingBottom: "8px",
            }}
            key={question}
          >
            <Text>{question}</Text>
          </div>
        );
      })}
    </Flex>
  );
};
