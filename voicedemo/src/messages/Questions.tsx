import React from "react";
import { Flex, Text, Button } from "@adobe/react-spectrum";
import { useDispatch } from "../providers/StateProvider";
import { askChatGPT } from "../util/askChatGPT";

interface QuestionProps {
  questions: string[];
}

export const Questions = (props: QuestionProps) => {
  const { questions } = props;
  const dispatch = useDispatch();
  return (
    <Flex direction="column">
      {questions.map((question) => {
        return (
          <div
            onClick={async () => {
              dispatch({
                type: "ADD_MESSAGE",
                payload: { type: "user", text: question },
              });
              const res = await askChatGPT(question);
              dispatch({
                type: "ADD_MESSAGE",
                payload: { type: "system", text: res },
              });
            }}
            style={{
              width: "100%",
              marginBottom: "8px",
              backgroundColor: "rgb(248, 214, 140)",
              color: "black",
              cursor: "pointer",
              filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.3))",
              padding: "8px",
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
