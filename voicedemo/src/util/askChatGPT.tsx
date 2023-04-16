const ANSWER = "ANSWER: ";

const SOURCES = "SOURCES:";

type Answer =
  | {
      type: "GOOD_ANSWER";
      payload: { response: string; sources: string[] };
    }
  | { type: "BAD_ANSWER"; payload: string };

export const parseAnswer = (apiResponse: string): Answer => {
  if (!apiResponse.includes("ANSWER:")) {
    return { type: "BAD_ANSWER", payload: apiResponse };
  }
  const answerIndex = apiResponse.indexOf(ANSWER) + ANSWER.length;
  const answerEnd = apiResponse.indexOf(SOURCES);
  const sourcesStart = answerEnd + SOURCES.length;
  const response = apiResponse.substring(answerIndex, answerEnd);
  const sourcesSubstring = apiResponse.substring(
    sourcesStart,
    apiResponse.length
  );
  return {
    type: "GOOD_ANSWER",
    payload: {
      response,
      sources: sourcesSubstring.split(" - ").filter((x) => x !== ""),
    },
  };
};

export const askChatGPT = async (question: string): Promise<string> => {
  const res = await window.fetch("/api/v1/chat-response", {
    method: "POST",
    body: JSON.stringify({
      request: question,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const theJson = await res.json();
  return theJson.response;
};
