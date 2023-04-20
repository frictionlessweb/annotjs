import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { Providers } from "./providers/Providers";
import "./index.css";

/**
 * Ugly hack to force the Embed API to allow annotations on mobile.
 */
// @ts-expect-error - Here be dragons.
navigator.__defineGetter__("userAgent", function () {
  return "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36";
});

console.log('user agent ', navigator.userAgent);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Providers>
    <App />
  </Providers>
);
