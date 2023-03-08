import { createContext, createElement as h, useContext, useMemo } from "react";
import { analyzeElements } from "../api/api.js";

/** @type {React.Context<import("../api/api.js").DocumentContext | null>} */
// @ts-expect-error  - Initializing the context null is OK.
const ExtractContext = createContext(null);

/**
 * useDocument - A hook for using the Extract document context.
 * @returns {import("../api/api.js").DocumentContext}
 */
export const useDocument = () => {
  const ctx = useContext(ExtractContext);
  if (ctx === null) {
    throw new Error(
      "Please use useDocument inside of the ExtractDocumentProvider component."
    );
  }
  return ctx;
};

/**
 * ExtractDocumentProvider - React context that provides information about the
 * document being annotated to the rest of our code.
 *
 * @param {import("./context.js").ExtractDocumentProviderProps} props
 * @returns {JSX.Element};
 */
export const ExtractDocumentProvider = (props) => {
  const { children, value: extractValue } = props;
  const value = useMemo(() => {
    return analyzeElements(extractValue);
  }, [extractValue]);
  return h(ExtractContext.Provider, { value, children });
};
