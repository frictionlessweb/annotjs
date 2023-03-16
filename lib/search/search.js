/**
 * searchForString.
 *
 * @param {string} str - The string to search for.
 * @param {import("../api/api.js").Character[]} characters - characters in which to serach.
 * @returns {import("../api/api.js").Character[][]}
 */
export const searchForString = (str, characters) => {
  if (str === "") return [];
  /** @type {import("../api/api.js").Character[][]} */
  const out = [];
  /** @type {import("../api/api.js").Character[]} */
  let cur = [];
  /** @type {string} */
  let curString = "";
  let curIdx = 0;
  for (let i = 0; i < characters.length; ++i) {
    let shouldReset = false;
    const curChar = characters[i];
    if (curChar.letter === str[curIdx]) {
      curString += curChar.letter;
      cur.push(curChar);
      ++curIdx;
    } else {
      shouldReset = true;
    }
    if (curString === str) {
      out.push(cur);
      shouldReset = true;
    }
    if (shouldReset) {
      curString = "";
      cur = [];
      curIdx = 0;
    }
    if (curChar.letter === str[curIdx]) {
      curString += curChar.letter;
      cur.push(curChar);
      ++curIdx;
    }
  }
  return out;
};
