from backend.controllers.debate import Debate
from typing import Dict

# simple in-memory store
debates: Dict[int, Debate] = {}
debate_counter = 0

def create_debate(topic: str) -> Debate:
    global debate_counter
    debate_counter += 1
    debate = Debate(debate_counter, topic)
    debates[debate_counter] = debate
    return debate

def get_debate(debate_id: int) -> Debate | None:
    return debates.get(debate_id)
