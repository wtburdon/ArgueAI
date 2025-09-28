import os
from dotenv import load_dotenv
import snowflake.connector
from datetime import datetime

load_dotenv()

class SnowflakeRepository:
    def __init__(self):
        self.conn = snowflake.connector.connect(
            user=os.getenv("SNOWFLAKE_USER"),
            password=os.getenv("SNOWFLAKE_PASSWORD"),
            account=os.getenv("SNOWFLAKE_ACCOUNT"),
            warehouse=os.getenv("SNOWFLAKE_WAREHOUSE"),
            database=os.getenv("SNOWFLAKE_DATABASE"),
            schema=os.getenv("SNOWFLAKE_SCHEMA"),
            role=os.getenv("SNOWFLAKE_ROLE")
        )

    def create_debate(self, debate_id: str, user_id: str, topic: str):
        cur = self.conn.cursor()
        cur.execute("""
            INSERT INTO debates (debate_id, user_id, topic, created_at)
            VALUES (%s, %s, %s, %s)
        """, (debate_id, user_id, topic, datetime.now()))
        cur.close()

    def save_argument(self, arg_id: str, debate_id: str, role: str, content: str):
        cur = self.conn.cursor()
        cur.execute("""
            INSERT INTO arguments (argument_id, debate_id, role, content, created_at)
            VALUES (%s, %s, %s, %s, %s)
        """, (arg_id, debate_id, role, content, datetime.now()))
        cur.close()

    def save_feedback(self, feedback_id: str, debate_id: str, clarity: float, logic: float,
                      rhetoric: float, evidence: float, comments: str):
        cur = self.conn.cursor()
        cur.execute("""
            INSERT INTO feedback (feedback_id, debate_id, clarity, logic, rhetoric, evidence, comments, created_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """, (feedback_id, debate_id, clarity, logic, rhetoric, evidence, comments, datetime.now()))
        cur.close()

    def get_user_stats(self, user_id: str):
        cur = self.conn.cursor()
        cur.execute("""
            SELECT AVG(clarity), AVG(logic), AVG(rhetoric), AVG(evidence)
            FROM feedback f
            JOIN debates d ON f.debate_id = d.debate_id
            WHERE d.user_id = %s
        """, (user_id,))
        result = cur.fetchone()
        cur.close()
        return {
            "avg_clarity": result[0],
            "avg_logic": result[1],
            "avg_rhetoric": result[2],
            "avg_evidence": result[3],
        }

    def get_arguments_by_debate(self, debate_id: str):
        """Fetch all arguments in a given debate, ordered by creation time."""
        cur = self.conn.cursor()
        cur.execute("""
                    SELECT argument_id, role, content, created_at
                    FROM arguments
                    WHERE debate_id = %s
                    ORDER BY created_at ASC
                """, (debate_id,))
        rows = cur.fetchall()
        cur.close()
        return [
            {
                "argument_id": row[0],
                "role": row[1],
                "content": row[2],
                "created_at": row[3],
            }
            for row in rows
        ]

    def close(self):
        self.conn.close()