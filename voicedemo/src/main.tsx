import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { Providers } from "./providers/Providers";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Providers>
    <App />
  </Providers>
);
