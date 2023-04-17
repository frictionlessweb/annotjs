import React from "react";
import { Flex } from "@adobe/react-spectrum";
import { useSetDoc } from "../providers/DocumentProvider";
import { pageOfString, useDocument } from "annotjs";

interface ReadSourceProps {
  sources: string[];
}

export const ReadSource = (props: ReadSourceProps) => {
  const { sources } = props;
  const setDoc = useSetDoc();
  const {
    documentContext: { characters },
  } = useDocument();
  return (
    <Flex direction="column" width="100%" alignItems="end">
      <p
        onClick={() => {
          const theSource = sources[0];
          const page = pageOfString(theSource, characters);
          const theMessage = new SpeechSynthesisUtterance();
          theMessage.voice = window.speechSynthesis.getVoices()[20];
          theMessage.rate = 0.85;
          theMessage.text = theSource;
          speechSynthesis.speak(theMessage);
          setDoc({
            currentPage: page + 1,
            highlights: [theSource],
            isPlaying: true,
          });
          theMessage.onend = () => {
            setDoc((prev) => {
              return {
                ...prev,
                highlights: [],
                isPlaying: false,
              };
            });
          };
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
