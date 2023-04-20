type Answer = {
  sources: string[];
  answer: string;
};

export type AnswerWithQuestions = {
  answer: Answer;
  questions: string[];
  annotations: object[];
};

export type ApiResponse =
  | { type: "BAD_RESPONSE" }
  | { type: "GOOD_RESPONSE"; payload: AnswerWithQuestions };

export const askChatGPT = async (question: string): Promise<ApiResponse> => {
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
  return theJson;
};
