import test from "ava";
import { areOverlapping } from "./math.js";

test("areOverlapping is a function", (t) => {
  t.deepEqual(typeof areOverlapping, "function");
});

test("areOverlapping works when the bounds overlap", (t) => {
  const overlap = areOverlapping(
    { top: 0, left: 0, width: 10, height: 10 },
    { top: 0, left: 0, width: 5, height: 5 }
  );
  t.deepEqual(overlap, true);
});

test("areOverlapping works when the bounds do not overlap", (t) => {
  const overlap = areOverlapping(
    { top: 0, left: 0, width: 10, height: 10 },
    { top: 100, left: 100, width: 5, height: 5 }
  );
  t.deepEqual(overlap, false);
});
