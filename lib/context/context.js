import { createContext, createElement as h, useContext, useMemo } from "react";
import { analyzeElements } from "../api/api.js";

/** @type {React.Context<import("./context.js").ExtractDocumentProviderContextValue | null>} */
// @ts-expect-error  - Initializing the context null is OK.
const ExtractContext = createContext(null);

/**
 * useDocument - A hook for using the Extract document context.
 * @returns {import("./context.js").ExtractDocumentProviderContextValue}
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
  const { children, value: providerValue } = props;
  const { extract, currentPage, url, clientId, fileName } = providerValue;
  const value = useMemo(() => {
    const doc = analyzeElements(extract);
    return {
      documentContext: doc,
      url,
      currentPage,
      clientId,
      fileName,
    };
  }, [extract, currentPage, url, clientId, fileName]);
  return h(ExtractContext.Provider, { value, children });
};
