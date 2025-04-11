from sqlalchemy import create_engine, inspect, text
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)

try:
    # Check if 'users' table exists
    inspector = inspect(engine)
    tables = inspector.get_table_names()

    if "users" in tables:
        print("✅ Table 'users' exists in the database.")

        # Check and display 1 row from the table
        with engine.connect() as conn:
            result = conn.execute(text("SELECT * FROM users LIMIT 1"))
            row = result.fetchone()
            if row:
                print("✅ Table 'users' is working. Sample row:")
                print(dict(row._mapping))
            else:
                print("⚠️ Table 'users' is empty.")
    else:
        print("❌ Table 'users' does NOT exist.")
except Exception as e:
    print(f"❌ Error: {e}")
