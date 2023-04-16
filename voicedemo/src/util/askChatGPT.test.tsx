import { parseAnswer } from "./askChatGPT";

const GOOD_ANSWER = `ANSWER: The most important paragraph in the document is the one titled "Delivering Financial Performance That Is Consistently Best-In-Class. " SOURCES: - In 2022, CCB delivered a 29% return on equity (ROE) on net income of $14. 9 billion. - Revenue of $55 billion was up 10% year-over-year, and our overhead ratio was 57%, down one percentage point. - We take a long-term approach to investments and focus on delivering sustainable growth and outperformance.`;

const BAD_ANSWER = `I'm sorry, I don't understand what you are asking for. Could you please rephrase or provide more context?`;

describe("Parsing answers from ChatGPT", () => {
  test("Works in a good case", () => {
    const res = parseAnswer(GOOD_ANSWER);
    expect(res.type).toEqual("GOOD_ANSWER");
    if (res.type === "BAD_ANSWER") {
      throw new Error("IMPOSSIBLE");
    }
    expect(res.payload.response).toEqual(
      'The most important paragraph in the document is the one titled "Delivering Financial Performance That Is Consistently Best-In-Class. " '
    );
    expect(res.payload.sources).toEqual([
      "In 2022, CCB delivered a 29% return on equity (ROE) on net income of $14. 9 billion.",
      "Revenue of $55 billion was up 10% year-over-year, and our overhead ratio was 57%, down one percentage point.",
      "We take a long-term approach to investments and focus on delivering sustainable growth and outperformance.",
    ]);
  });
  test("Works in an error case", () => {
    const res = parseAnswer(BAD_ANSWER);
    expect(res.type).toEqual("BAD_ANSWER");
    expect(res.payload).toEqual(BAD_ANSWER);
  });
});
