/**
 * areOverlapping - Determine whether two bounding boxes in the DOM overlap
 * or not.
 *
 * @param {import("./math").Bounds} a - The first set of bounding boxes.
 * @param {import("./math").Bounds} b - The second set of bounding boxes.
 * @returns {boolean}
 */
export const areOverlapping = (a, b) => {
  return false;
};

/**
 * analyzeElements - Take the results of the extract API and return them
 * as JSON tokens that our library can more easily analyze.
 *
 * @param {import("./api").ExtractResult} extractApi
 * @returns {import("./math").AnnotContext}
 */
export const analyzeElements = (extractApi) => {
  const { elements, pages } = extractApi;
  return {
    characters: [],
    words: [],
    paragraphs: [],
  };
};
