/**
 * areOverlapping - Determine whether two bounding boxes in the DOM overlap
 * or not.
 *
 * @param {import("./math").Bounds} boxOne - The first set of bounding boxes.
 * @param {import("./math").Bounds} boxTwo - The second set of bounding boxes.
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
