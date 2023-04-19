import React from "react";
import { Flex, Text } from "@adobe/react-spectrum";
import { PDFViewer } from "./providers/PDFContext";
import Draggable from "react-draggable";

type DivState =
  | {
      height: number;
      isHeldDown: true;
      clientX: number;
      clientY: number;
    }
  | { height: number; isHeldDown: false; clientX: null; clientY: null };

export const App = () => {
  const [y, setY] = React.useState(window.screen.availHeight / 2);
  // const height = (y / window.screen.availHeight) * 100;
  return (
    <Flex height="100%" direction="column" wrap="wrap">
      <PDFViewer url="/document.pdf" />
      <Draggable
        onDrag={(_, data) => {
          setY(data.y);
        }}
        position={{ x: 0, y }}
      >
        <div
          style={{
            position: "absolute",
            width: "100vw",
            height: `50vh`,
            cursor: "pointer",
            zIndex: 2,
          }}
        >
          <Flex
            direction="column"
            height="100%"
            UNSAFE_style={{ backgroundColor: "red" }}
          >
            Text
          </Flex>
        </div>
      </Draggable>
    </Flex>
  );
};
