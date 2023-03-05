import test from "ava";
import { analyzeElements, fourNumbersToBounds } from "./api.js";
import fs from "fs";
import path from "path";

import * as url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

test("analyzeElements is a function", (t) => {
  t.deepEqual(typeof analyzeElements, "function");
});

test("fourNumbersToBounds is a function", (t) => {
  t.deepEqual(typeof fourNumbersToBounds, "function");
});

test("fourNumbersToBounds works on a simple example", (t) => {
  t.deepEqual(
    fourNumbersToBounds(
      [
        77.09342956542969, 711.0675964355469, 537.0668182373047,
        763.4272308349609,
      ],
      {
        height: 792,
        width: 612,
        page_number: 0,
      }
    ),
    {
      top: 28.572769165039062,
      left: 77.09342956542969,
      width: 459.973388671875,
      height: 52.35963439941406,
    }
  );
});

// test("analyzeElements works on the hard coded test cases", (t) => {
//   const testCases = JSON.parse(
//     fs.readFileSync(path.join(__dirname, "testCases.json"), {
//       encoding: "utf-8",
//     })
//   );
//   for (const testCase of testCases) {
//     t.deepEqual(analyzeElements(testCase.api), testCase.annotationContext);
//   }
// });
