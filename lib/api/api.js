import { serializeBounds } from "../math/math.js";

/**
 * fourNumbersToBounds - Convert four numbers into bounds given the page the
 * four numbers are on.
 *
 * @param {import("./api.js").ExtractBounds} numberList
 * @param {import("./api.js").Page} page
 * @returns {import("../math/math.js").Bounds}
 */
export const fourNumbersToBounds = (numberList, page) => {
  const left = numberList[0];
  const right = numberList[2];
  const width = Math.abs(right - left);
  const top = numberList[1];
  const bottom = numberList[3];
  const height = Math.abs(top - bottom);
  /**
   * PDF coordinates go from the bottom to the top, but DOM coordinates go
   * from the top to the bottom. Therefore, to get the final top position,
   * we have to perform this subtraction.
   */
  return {
    top: page.height - bottom,
    left,
    width,
    height,
  };
};

/**
 * analyzeElements - Take the results of the extract API and return them
 * as JSON tokens that our library can more easily analyze.
 *
 * @param {import("./api.js").ExtractResult} extractApi
 * @returns {import("./api.js").AnnotContext}
 */
export const analyzeElements = (extractApi) => {
  const { elements, pages } = extractApi;

  const pageMap = new Map();
  for (const page of pages) {
    pageMap.set(page.page_number, page);
  }

  /** @type {import("./api.js").Paragraph[]} */
  let paragraphs = [];
  /** @type {import("./api.js").Character[]} */
  let characters = [];

  for (const element of elements) {
    if (
      element.Text === undefined ||
      element.Bounds === undefined ||
      element.CharBounds === undefined ||
      element.Page === undefined
    ) {
      continue;
    }
    const curPage = pageMap.get(element.Page);
    const paragraphBounds = fourNumbersToBounds(element.Bounds, curPage);

    /** @type {import("./api.js").Paragraph} */
    const paragraph = {
      id: serializeBounds(paragraphBounds),
      bounds: paragraphBounds,
      page: element.Page,
      text: element.Text,
    };
    paragraphs.push(paragraph);

    if (element.CharBounds.length !== element.Text.length) {
      continue;
    }
    for (let i = 0; i < element.CharBounds.length; ++i) {
      const letter = element.Text[i];
      const charBoundNumbers = element.CharBounds[i];
      const characterBounds = fourNumbersToBounds(charBoundNumbers, curPage);
      characters.push({
        id: serializeBounds(characterBounds),
        bounds: characterBounds,
        page: element.Page,
        letter,
        word_id: "THIS_GETS_MUTATED_IN_A_FUNCTION_BELOW",
        paragraph_id: paragraph.id,
      });
    }
    if (element.Kids) {
      const childElements = analyzeElements({
        elements: element.Kids,
        pages: pages,
      });
      paragraphs = [...paragraphs, ...childElements.paragraphs];
      characters = [...characters, ...childElements.characters];
    }
  }

  return {
    paragraphs,
    characters,
    words: [],
  };
};
