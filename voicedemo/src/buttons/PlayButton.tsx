import React from "react";
import { Button } from "@adobe/react-spectrum";
import Play from "@spectrum-icons/workflow/Play";
import Pause from "@spectrum-icons/workflow/Pause";
import { useDoc, useSetDoc } from "../providers/DocumentProvider";
import { useSelector } from "../providers/StateProvider";
import { useReadMessage } from "../util/readMessageOutLoud";
import { RESIZE_STYLE } from "../util/constants";

export const PlayButton = () => {
  const { isPlaying } = useDoc();
  const latestMessage = useSelector((state) => {
    return state.messages[state.messages.length - 1];
  });
  const readMessage = useReadMessage();
  const setDoc = useSetDoc();
  return (
    <Button
      onPress={() => {
        if (!isPlaying && latestMessage !== undefined) {
          readMessage(latestMessage.text);
        } else {
          speechSynthesis.cancel();
          setDoc((prev) => {
            return {
              ...prev,
              highlights: [],
              isPlaying: false,
            };
          });
        }
      }}
      variant={isPlaying ? "accent" : "primary"}
    >
      {isPlaying ? (
        <Pause UNSAFE_style={RESIZE_STYLE} />
      ) : (
        <Play UNSAFE_style={RESIZE_STYLE} />
      )}
    </Button>
  );
};
