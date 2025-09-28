from backend.controllers.actors import Opponent, Judge
from collections import defaultdict
import uuid

class Debate:
    def __init__(self,debate_id, topic):
        self.debate_id = debate_id
        self.topic = topic
        self.uuid = uuid.uuid4()

        self.judge = Judge()

        self.opponent = Opponent()
        self.opponent.prompt(f"The following is the topic you will be arguing the opposite position that the user: {topic}")

        self.transcript = defaultdict(dict)

    def run_turn(self, user_content):
        argument_id = uuid.uuid4()
        self.transcript[argument_id]["player"] = user_content

        opponent_content = self.opponent.prompt(user_content)

        self.transcript[argument_id]["opponent"] = opponent_content

        return opponent_content

    def _format_transcript(self):
        lines = []
        for _, entry in self.transcript.items():
            if "player" in entry:
                lines.append(f"[user]: {entry['player']}")
            if "opponent" in entry:
                lines.append(f"[opponent]: {entry['opponent']}")
        return "\n".join(lines)

    def run_judge(self):
        return self.judge.prompt(self._format_transcript())