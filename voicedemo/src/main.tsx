import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { Providers } from "./providers/Providers";
import "./index.css";

/**
 * We need to call this function before rendering our app; otherwise, 
 * text-to-speech doesn't work properly/.
 */
window.speechSynthesis.getVoices();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Providers>
    <App />
  </Providers>
);
