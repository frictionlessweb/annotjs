import { useMemo, useEffect } from "react";

/**
 * useVoiceControls - A hook to facilitate controlling a PDF with your voice.
 *
 * @param {import("./voices.js").VoiceControlConfig} config
 */
export const useVoiceControls = (config) => {
  const { listening, setListening, onMessage } = config;
  const recognition = useMemo(() => {
    /**
     * Browsers have not caught up to the many ways that SpeechRecognition can be
     * defined, so we need to disable the linters/TypeScript compiler below.
     */

    /* eslint-disable */
    const SpeechRecognition =
      // @ts-ignore
      window.SpeechRecognition || window.webkitSpeechRecognition;
    /* eslint-enable */
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    /**
     * onresult.
     *
     * @param {any} event
     */
    const onresult = (event) => {
      const { transcript } = event.results[0][0];
      setListening(false);
      onMessage(transcript);
    };
    recognition.onresult = onresult;
    recognition.onspeechend = () => {
      recognition.stop();
    };
    return recognition;
  }, [onMessage, setListening]);
  useEffect(() => {
    if (listening) {
      recognition.start();
    } else {
      recognition.stop();
    }
  }, [listening, recognition]);
};
