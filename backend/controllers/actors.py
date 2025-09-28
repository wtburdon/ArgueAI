import os
from dotenv import load_dotenv
from google import genai

from backend.controllers import packet

load_dotenv("backend/.env")

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

class Actor:
    def __init__(self):
        self._gemini_client = genai.Client(api_key=GEMINI_API_KEY)
        self._chat = self._gemini_client.chats.create(model="gemini-2.5-flash")

class Opponent(Actor):
    def __init__(self):
        super().__init__()
        self._chat.send_message(packet.OPPONENT_PROMPT)

    def prompt(self, user_content):
        return self._chat.send_message(user_content).text

class Judge(Actor):
    def __init__(self):
        super().__init__()
        self._chat.send_message(packet.JUDGE_PROMPT)

    def prompt(self, player_position: str, opponent_position: str) -> dict:
        response = self._chat.send_message()
        pass