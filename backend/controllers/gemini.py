import os
from dotenv import load_dotenv
from google import genai

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# Start a chat session with a given model
chat = client.chats.create(model="gemini-2.5-flash")