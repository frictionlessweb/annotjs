import React from "react";
import { Button } from "@adobe/react-spectrum";
import Voice from "@spectrum-icons/workflow/VoiceOver";
import { RESIZE_STYLE } from './constants';

export const RecordButton = () => {
  return (
    <Button variant="primary">
      <Voice UNSAFE_style={RESIZE_STYLE} />
    </Button>
  );
};
