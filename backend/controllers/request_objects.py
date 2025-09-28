from pydantic import BaseModel

# request model for starting debate
class DebateStartRequest(BaseModel):
    topic: str

# request model for a debate turn
class DebateTurnRequest(BaseModel):
    debate_id: int
    content: str

class DebateJudgeRequest(BaseModel):
    debate_id: int