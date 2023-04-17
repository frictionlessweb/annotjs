import React from "react";
import { Button } from "@adobe/react-spectrum";
import Play from "@spectrum-icons/workflow/Play";
import Pause from "@spectrum-icons/workflow/Pause";
import { useDoc, useSetDoc } from "../providers/DocumentProvider";
import { RESIZE_STYLE } from "../util/constants";

export const PlayButton = () => {
  const { currentPage, highlights, isPlaying } = useDoc();
  const setDoc = useSetDoc();
  return (
    <Button
      onPress={() => {
        if (!isPlaying) return;
        speechSynthesis.cancel();
        setDoc((prev) => {
          return {
            ...prev,
            highlights: [],
            isPlaying: false,
          };
        });
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
