from fastapi import FastAPI
from pydantic import BaseModel
from analyzer.chatgpt import analyze_user_request
from analyzer.extract import attach_annotations_to_response
import json


class UserRequest(BaseModel):
    request: str


app = FastAPI(root_path="/api/v1")


@app.get("/heartbeat")
def read_root():
    return {"message": "success"}


@app.post("/chat-response")
def chat_response(req: UserRequest):
    response = analyze_user_request(req.request)
    try:
        a_map = json.loads(response)
        attach_annotations_to_response(a_map)
        return {"type": "GOOD_RESPONSE", "payload": a_map}
    except Exception:
        return {"type": "BAD_RESPONSE"}
