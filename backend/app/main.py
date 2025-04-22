from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine, SessionLocal
from app.routers import auth
from app.routers import blog_router

# Initialize DB schema
Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI()

# CORS settings
origins = [
    "http://react-service",
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(blog_router.router, prefix="/api/blogs", tags=["Blogs"])
app.include_router(auth.router)

# ✅ Simple Health Check for Kubernetes (no DB dependency)
@app.get("/health")
def health_check():
    return {"status": "ok"}

# ✅ Optional DB Health Check (not used in readiness/liveness probes)
@app.get("/health/db")
def health_check_db():
    try:
        with SessionLocal() as session:
            session.execute("SELECT 1")
        return {"status": "ok", "database": "connected"}
    except Exception:
        return {"status": "error", "database": "not connected"}
