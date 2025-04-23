# File: main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine, SessionLocal
from app.routers import auth
from app.routers import blog_router

# 🚀 Initialize Database
Base.metadata.create_all(bind=engine)

# 🎉 Create FastAPI app
app = FastAPI()

# 🌐 Update CORS origins
origins = [
    "http://react-service",                         # internal service
    "http://localhost:3000",                        # local dev
    "http://127.0.0.1:3000",
    "http://frontend.13.233.88.55.nip.io"           # ingress frontend domain
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Include routers
app.include_router(blog_router.router, prefix="/api/blogs", tags=["Blogs"])
app.include_router(auth.router)

# ✅ Enhanced Health Check Endpoint
@app.get("/health")
def health_check():
    try:
        with SessionLocal() as session:
            session.execute("SELECT 1")
        return {"status": "ok", "database": "connected"}
    except Exception:
        return {"status": "error", "database": "not connected"}

# 🏁 Optional: For local dev / Docker run
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
