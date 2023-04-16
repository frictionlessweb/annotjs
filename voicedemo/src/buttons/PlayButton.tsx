import React from "react";
import { Button } from "@adobe/react-spectrum";
import Play from "@spectrum-icons/workflow/Play";
import { RESIZE_STYLE } from "../util/constants";

export const PlayButton = () => {
  return (
    <Button variant="primary">
      <Play UNSAFE_style={RESIZE_STYLE} />
    </Button>
  );
};
