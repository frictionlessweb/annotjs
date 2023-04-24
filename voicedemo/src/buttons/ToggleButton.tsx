import React from "react";
import { Button } from "@adobe/react-spectrum";
import Web from "@spectrum-icons/workflow/WebPage";
import Document from "@spectrum-icons/workflow/Document";
import { RESIZE_STYLE } from "../util/constants";
import { useSelector, useDispatch } from "../providers/StateProvider";

export const ToggleButton = () => {
  const isPDF = useSelector((state) => state.isPDF);
  const dispatch = useDispatch();
  const togglePDF = () => {
    dispatch({ type: "TOGGLE_PDF" });
  };
  return (
    <Button onPress={togglePDF} variant="primary">
      {isPDF ? (
        <Web UNSAFE_style={RESIZE_STYLE} />
      ) : (
        <Document UNSAFE_style={RESIZE_STYLE} />
      )}
    </Button>
  );
};
