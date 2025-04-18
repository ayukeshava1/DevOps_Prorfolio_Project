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

# Load environment variables from .env
load_dotenv()

# Use DATABASE_URL if available, otherwise construct from individual env vars
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    DB_USER = os.getenv("DB_USER")
    DB_PASS = os.getenv("DB_PASS")
    DB_HOST = os.getenv("DB_HOST")
    DB_PORT = os.getenv("DB_PORT", "5432")
    DB_NAME = os.getenv("DB_NAME")
    DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def check_database():
    from app.models.blogs import Blog
    try:
        with SessionLocal() as session:
            session.query(Blog).first()
        print("✅ Database connection successful and 'blogs' table found.")
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
