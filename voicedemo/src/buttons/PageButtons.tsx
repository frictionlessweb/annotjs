import React from "react";
import { Flex, Button } from "@adobe/react-spectrum";
import ArrowUp from "@spectrum-icons/workflow/ArrowUp";
import ArrowDown from "@spectrum-icons/workflow/ArrowDown";
import { useDocument } from "annotjs";
import { useSetDoc } from "../providers/DocumentProvider";

export const PageButtons = () => {
  const {
    currentPage,
    documentContext: { pages },
  } = useDocument();
  const setDoc = useSetDoc();
  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= pages.length;
  return (
    <Flex
      direction="column"
      marginTop="32px"
      marginStart="32px"
      height="100px"
      alignItems="self-start"
    >
      <Button
        onPress={() => {
          setDoc((prev) => {
            return { ...prev, currentPage: prev.currentPage - 1 };
          });
        }}
        isDisabled={prevDisabled}
        variant="primary"
        marginBottom="32px"
      >
        <ArrowUp />
      </Button>
      <Button
        onPress={() => {
          setDoc((prev) => {
            return { ...prev, currentPage: prev.currentPage + 1 };
          });
        }}
        isDisabled={nextDisabled}
        variant="primary"
      >
        <ArrowDown />
      </Button>
    </Flex>
  );
};
