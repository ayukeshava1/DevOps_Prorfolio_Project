import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Read values from .env file
PROJECT_NAME = os.getenv("PROJECT_NAME", "Default Project")
API_VERSION = os.getenv("API_VERSION", "v1")
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:Ayu123%40%40@localhost:5432/devops_dashboard")
SECRET_KEY = os.getenv("SECRET_KEY", "default_secret_key")
