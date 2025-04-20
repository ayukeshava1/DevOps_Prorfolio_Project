# from sqlalchemy import create_engine, MetaData
# from sqlalchemy.orm import sessionmaker, declarative_base
# from sqlalchemy.orm import Session


# DATABASE_URL = "postgresql://postgres:Ayu123%40%40@localhost:5432/devops_dashboard"

# engine = create_engine(DATABASE_URL)

# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# Base = declarative_base()
# metadata = MetaData()

# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# # from fastapi import FastAPI
# # from sqlalchemy import create_engine, Column, Integer, String
# # from sqlalchemy.ext.declarative import declarative_base
# # from sqlalchemy.orm import sessionmaker

# # DATABASE_URL = "postgresql://postgres:Ayu123%40%40@localhost:5432/devops_dashboard"

# # engine = create_engine(DATABASE_URL)
# # SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# # Base = declarative_base()

# # app = FastAPI()

# # from fastapi import Depends
# # from sqlalchemy.orm import Session

# # def get_db():
# #     db = SessionLocal()
# #     try:
# #         yield db
# #     finally:
# #         db.close()

# app/database.py

# from sqlalchemy import create_engine
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker
# from dotenv import load_dotenv
# import os

# # Load environment variables from .env
# load_dotenv()

# DATABASE_URL = "sqlite:///./dev.db"

# # SQLAlchemy setup
# engine = create_engine(DATABASE_URL)
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# Base = declarative_base()

# # Dependency to get DB session
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# # Optional check on startup
# def check_database():
#     from app.models.blogs import Blog  # Local import to avoid circular dependency
#     try:
#         with SessionLocal() as session:
#             session.query(Blog).first()  # ✅ FIXED: Changed from User to Blog
#         print("✅ Database connection successful and 'blogs' table found.")
#     except Exception as e:
#         print(f"❌ Database connection failed: {e}")

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

# Load environment variables (including Kubernetes secrets)
load_dotenv()

# Use Kubernetes secret first, fallback to individual env vars
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    DATABASE_URL = f"postgresql://{os.getenv('POSTGRES_USER')}:{os.getenv('POSTGRES_PASSWORD')}@{os.getenv('DB_HOST', 'postgres-service')}:{os.getenv('DB_PORT', '5432')}/{os.getenv('DB_NAME')}"

# ✅ Improved connection handling with `pool_pre_ping`
engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def check_database():
    try:
        with SessionLocal() as session:
            session.execute("SELECT 1")
        print("✅ Database connection successful.")
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
