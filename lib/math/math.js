/**
 * areOverlapping - Determine whether two bounding boxes in the DOM overlap
 * or not.
 *
 * @param {import("./math.js").Bounds} boxOne - The first set of bounding boxes.
 * @param {import("./math.js").Bounds} boxTwo - The second set of bounding boxes.
 * @returns {boolean}
 */
export const areOverlapping = (boxOne, boxTwo) => {
  const verticallySeparate =
    boxOne.top >= boxTwo.top + boxTwo.height ||
    boxTwo.top >= boxOne.top + boxOne.height;
  const horizontallySeparate =
    boxOne.left >= boxTwo.left + boxTwo.width ||
    boxTwo.left >= boxOne.left + boxOne.width;
  return !verticallySeparate && !horizontallySeparate;
};

/**
 * serializeBounds - Take a DOM bounds object and serialize it into a string.
 * This behavior is useful when tagging various objects with IDs that would
 * not otherwise have a natural ID.
 *
 * @param {import("./math.js").Bounds} bounds
 * @returns {string}
 */
export const serializeBounds = (bounds) => {
  return `top${bounds.top}left${bounds.left}width${bounds.width}height${bounds.height}`;
};
