import { createElement as h, Fragment } from "react";
import { useDocument } from "../context/context.js";
import { serializeBounds } from "../index.js";
import { searchForString } from "../search/search.js";

/**
 * HighlightTextLayer - highlight the portions of a PDF document that map with
 * the current underlying div.
 *
 * @param {import("./highlight.js").HighlightTextLayerProps} props
 */
export const HighlightTextLayer = (props) => {
  const { highlights } = props;
  const {
    currentPage,
    documentContext: { characters },
  } = useDocument();
  const relevantCharacters = characters.filter(
    (char) => char.page === currentPage
  );
  const results = highlights.map((highlight) => {
    return searchForString(highlight, relevantCharacters);
  });
  const children = results.flatMap((characterMatches) => {
    return characterMatches.flatMap((characterMatch) => {
      return characterMatch.flatMap((match) => {
        return h("div", {
          key: serializeBounds(match.bounds),
          style: {
            position: "absolute",
            backgroundColor: "rgba(255, 99, 71, 0.3)",
            zIndex: 3,
            ...match.bounds,
          },
        });
      });
    });
  });
  return h(Fragment, { children });
};
