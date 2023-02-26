import test from "ava";
import { areOverlapping, analyzeElements } from "./math.js";

test("areOverlapping is a function", (t) => {
  t.deepEqual(typeof areOverlapping, "function");
});

test("analyzeElements is a function", (t) => {
  t.deepEqual(typeof analyzeElements, "function");
});
