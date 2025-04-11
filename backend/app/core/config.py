from pydantic import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "devops-automation-dashboard"
    API_VERSION: str = "v1"
    DATABASE_URL: str = "sqlite:///./database.db"  # Change this if using PostgreSQL/MySQL
    SECRET_KEY: str = "your_secret_key"

    class Config:
        env_file = ".env"  # Load values from .env file

settings = Settings()
