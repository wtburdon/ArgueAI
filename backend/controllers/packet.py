from pathlib import Path
import configparser

config = configparser.ConfigParser()
config.read("backend/controllers/config.ini")

_PROMPT_PATHS_CONFIG = config["PROMPT_PATHS"]
OPPONENT_PROMPT = Path(_PROMPT_PATHS_CONFIG["OPPONENT_PATH"]).read_text()
JUDGE_PROMPT = Path(_PROMPT_PATHS_CONFIG["JUDGE_PATH"]).read_text()