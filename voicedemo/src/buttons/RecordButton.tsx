import React from "react";
import { Button } from "@adobe/react-spectrum";
import Voice from "@spectrum-icons/workflow/VoiceOver";
import { RESIZE_STYLE } from "../util/constants";
import { askChatGPT } from "../util/askChatGPT";
import { useDispatch } from "../providers/StateProvider";
import { useVoiceControls } from "annotjs";
import { useReadMessage } from "../util/readMessageOutLoud";

export const RecordButton = () => {
  const readMessage = useReadMessage();
  const [listening, setListening] = React.useState(false);
  const dispatch = useDispatch();
  useVoiceControls({
    listening,
    setListening,
    onMessage: async (message: string) => {
      dispatch({
        type: "ADD_MESSAGE",
        payload: { type: "user", payload: message },
      });
      const payload = await askChatGPT(message);
      dispatch({ type: "ADD_MESSAGE", payload: { payload, type: "system" } });
      try {
        readMessage(payload);
      } catch (err) {
        console.error(err);
      }
    },
  });
  return (
    <Button
      onPress={() => {
        setListening((prev) => !prev);
      }}
      variant={listening ? "accent" : "primary"}
    >
      <Voice UNSAFE_style={RESIZE_STYLE} />
    </Button>
  );
};
