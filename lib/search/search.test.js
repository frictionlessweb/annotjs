import test from "ava";
import { searchForString } from "./search.js";

test("An empty search returns nothing", (t) => {
  const input = [
    { letter: "t" },
    { letter: "e" },
    { letter: "s" },
    { letter: "t" },
  ];
  /** @type [] */
  const expected = [];
  // @ts-expect-error - We only need the letter property to search.
  const actual = searchForString("", input);
  t.deepEqual(actual, expected);
});

test("We can find characters in a search", (t) => {
  const input = [
    { letter: "t" },
    { letter: "e" },
    { letter: "s" },
    { letter: "t" },
  ];
  const expected = [input];
  // @ts-expect-error - We only need the letter property to search.
  const actual = searchForString("test", input);
  t.deepEqual(actual, expected);
});

test("We do not find the characters if they aren't in the array", (t) => {
  const input = [
    { letter: "t" },
    { letter: "e" },
    { letter: " " },
    { letter: "s" },
    { letter: "t" },
  ];
  /** @type [] */
  const expected = [];
  // @ts-expect-error - We only need the letter property to search.
  const actual = searchForString("test", input);
  t.deepEqual(actual, expected);
});

test("We can find the output in a larger array", (t) => {
  const input = [
    { letter: "t" },
    { letter: "e" },
    { letter: " " },
    { letter: "t" },
    { letter: "e" },
    { letter: "s" },
    { letter: "t", id: "3" },
    { letter: "t", id: "3" },
  ];
  const expected = [
    [
      { letter: "t" },
      { letter: "e" },
      { letter: "s" },
      { letter: "t", id: "3" },
    ],
  ];
  // @ts-expect-error - We only need the letter property to search.
  const actual = searchForString("test", input);
  t.deepEqual(actual, expected);
});

test("We can find the output multiple times", (t) => {
  const input = [
    { letter: "t" },
    { letter: "e" },
    { letter: " " },
    { letter: "t" },
    { letter: "e" },
    { letter: "s" },
    { letter: "t", id: "3" },
    { letter: "t", id: "4" },
    { letter: "t", id: "5" },
    { letter: "e" },
    { letter: "s" },
    { letter: "t", id: "6" },
  ];
  const expected = [
    [
      { letter: "t" },
      { letter: "e" },
      { letter: "s" },
      { letter: "t", id: "3" },
    ],
    [
      { letter: "t", id: "5" },
      { letter: "e" },
      { letter: "s" },
      { letter: "t", id: "6" },
    ],
  ];
  // @ts-expect-error - We only need the letter property to search.
  const actual = searchForString("test", input);
  t.deepEqual(actual, expected);
});
