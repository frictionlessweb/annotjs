import test from "ava";
import { analyzeElements } from "./api.js";

test("analyzeElements is a function", (t) => {
  t.deepEqual(typeof analyzeElements, "function");
});
