import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware # Import the middleware
from backend.controllers.debate_store import create_debate, get_debate, remove_debate
from backend.controllers.request_objects import DebateStartRequest, DebateTurnRequest, DebateJudgeRequest

app = FastAPI()

# --- Add this section to handle CORS ---
# List of origins that are allowed to make requests to your API
origins = [
    "http://localhost:3000",  # Common port for Create React App
    "http://localhost:5173",  # Common port for Vite
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,      # Origins allowed to make requests
    allow_credentials=True,
    allow_methods=["*"],        # Allow all methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],        # Allow all headers
)
# ------------------------------------

@app.post("/debate/start")
async def debate_start(request: DebateStartRequest):
    debate = create_debate(request.topic)
    return {"debate_id": debate.debate_id, "topic": "Should phones be allowed in class?"}

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
    debate = get_debate(request.debate_id)
    debate_stats = debate.run_judge()
    remove_debate(request.debate_id)
    debate_stats = debate_stats.replace(r"\n","")
    debate_stats = debate_stats.replace("\\", "")
    return json.loads(debate_stats)
