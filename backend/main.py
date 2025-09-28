from controllers.actors import Judge
from fastapi import FastAPI
from backend.controllers.debate_store import create_debate, get_debate
from backend.controllers.request_objects import DebateStartRequest, DebateTurnRequest, DebateJudgeRequest

app = FastAPI()

@app.post("/debate/start")
async def debate_start(request: DebateStartRequest):
    debate = create_debate(request.topic)
    return {"debate_id": debate.debate_id}

@app.post("/debate/turn")
async def debate_turn(request: DebateTurnRequest):
    debate = get_debate(request.debate_id)
    opponent_content = debate.run_turn(request.content)
    return {
        "opponent_content": opponent_content,
        "message": "Debate turn received"
    }

@app.post("/debate/judge")
async def debate_judge(request: DebateJudgeRequest):
    return {
        "debate_id": request.debate_id,
        "message": f"Judging debate {request.debate_id}"
    }
