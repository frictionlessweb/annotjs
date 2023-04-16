from fastapi.testclient import TestClient
from main import app


client = TestClient(app)


def test_heartbeat():
    response = client.get("/heartbeat")
    assert response.status_code == 200
    assert response.json() == {"message": "success"}
