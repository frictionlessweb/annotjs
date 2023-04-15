from analyzer.aisingleton import openai
from translate.translate import ExtractOutput, translate_extract_document


def analyze_user_request(request: str, extract: ExtractOutput) -> str:
    res = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": """You are a powerful voice assistant helping a distracted user understand a document while driving.
You answer questions in the following way: 
1. You provide a succinct overall answer that is easy to listen to. Provide this under a title ANSWER.
2. For each sentence in your answer, you provide exactly one sentence in the document that
is most relevant to the answer. Provide these sentences as a list titled SOURCES. Rank this list in order of most to least important. Don't include any sentences that aren't in the document. 
3. Last, based on the user's question, you provide the user one suggestion of the most relevant follow-up topic in the text. Provide this under a title SUGGESTION. Provide your recommendation as a question using the following format: Would you like me to tell you about {topic recommendation}.
""",
            },
            {
                "role": "assistant",
                "content": f"""The document that you are reading is below:
{translate_extract_document(extract)}
                """,
            },
            {
                "role": "user",
                "content": f"{request}\nJust return the answer as plain text from the document. Don't include any text that isn't in the document. Don't include any quotation marks that aren't in the text.",
            },
        ],
    )
    return res["choices"][0]["message"]["content"]  # type: ignore
