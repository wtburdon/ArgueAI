from backend.controllers.actors import Opponent
from collections import defaultdict
import uuid

class Debate:
    def __init__(self,debate_id, topic):
        self.debate_id = debate_id
        self.topic = topic
        self.uuid = uuid.uuid4()

        self.opponent = Opponent()

        self.transcript = defaultdict(dict)

    def run_turn(self, user_content):
        argument_id = uuid.uuid4()
        self.transcript[argument_id]["player"] = user_content

        opponent_content = self.opponent.prompt(user_content)

        self.transcript[argument_id]["opponent"] = opponent_content

        return opponent_content
