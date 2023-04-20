import React from "react";
import { Flex, Divider } from "@adobe/react-spectrum";
import { PDFViewer } from "./providers/PDFContext";
import { HomeButton } from "./buttons/HomeButton";
import { RecordButton } from "./buttons/RecordButton";
import { PlayButton } from "./buttons/PlayButton";
import { ChatMessages } from "./ChatMessages";
import Draggable from "react-draggable";

export const App = () => {
  const [y, setY] = React.useState(window.screen.availHeight * 0.5);
  const height = (1 - y / window.screen.availHeight) * 100;
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
            height: `${height}vh`,
            cursor: "pointer",
            zIndex: 2,
          }}
        >
          <Flex
            direction="column"
            marginY="32px"
            height="100%"
            width="100%"
            UNSAFE_style={{
              backgroundColor: "white",
              filter: "drop-shadow(1px 1px 1px rgba(0.3,0.3,0.3,1))",
              marginTop: "16px",
            }}
          >
            <Flex
              marginY="12px"
              width="100%"
              height="100%"
              justifyContent="center"
              UNSAFE_style={{ position: "absolute" }}
            >
              <Divider
                UNSAFE_style={{ backgroundColor: "lightgrey" }}
                size="L"
                width="300px"
              />
            </Flex>
            <Flex
              marginY="32px"
              height="100%"
              width="100%"
              direction="column"
              alignItems="center"
            >
              <ChatMessages />
            </Flex>
          </Flex>
        </div>
      </Draggable>
      <Flex
        UNSAFE_style={{
          width: "100vw",
          marginTop: "90vh",
          height: "10vh",
          zIndex: 6,
          backgroundColor: "lightblue",
          justifyContent: "center",
        }}
      >
        <Flex marginTop="16px" justifyContent="space-evenly" width="100%">
          <HomeButton />
          <RecordButton />
          <PlayButton />
        </Flex>
      </Flex>
    </Flex>
  );
};
