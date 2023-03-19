import React from "react";

export interface VoiceControlConfig {
  listening: boolean;
  setListening: React.Dispatch<React.SetStateAction<boolean>>;
  onMessage: (result: string) => void | Promise<void>;
}

export const useVoiceControls: (config: VoiceControlConfig) => void;
