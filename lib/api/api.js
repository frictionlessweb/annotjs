/**
 * analyzeElements - Take the results of the extract API and return them
 * as JSON tokens that our library can more easily analyze.
 *
 * @param {import("./api").ExtractResult} extractApi
 * @returns {import("./api").AnnotContext}
 */
export const analyzeElements = (extractApi) => {
  const { elements, pages } = extractApi;
  return {
    characters: [],
    words: [],
    paragraphs: [],
  };
};
