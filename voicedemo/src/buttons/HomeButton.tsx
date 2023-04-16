import React from "react";
import { Button } from "@adobe/react-spectrum";
import Home from "@spectrum-icons/workflow/Home";
import { RESIZE_STYLE } from "../util/constants";

export const HomeButton = () => {
  return (
    <Button variant="primary">
      <Home UNSAFE_style={RESIZE_STYLE} />
    </Button>
  );
};
