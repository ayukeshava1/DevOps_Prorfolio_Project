from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine
from app.routers import auth
# 🚀 Import your blog router
from app.routers import blog_router

# 🚀 Initialize Database
Base.metadata.create_all(bind=engine)

# 🎉 Create FastAPI app
app = FastAPI()

# 🌐 Update CORS origins for Kubernetes compatibility
origins = [
    "http://react-service",  # Kubernetes service name
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

# ✅ Include routers
app.include_router(blog_router.router, prefix="/api/blogs", tags=["Blogs"])
app.include_router(auth.router)

# ✅ Enhanced Health Check Endpoint for Kubernetes
@app.get("/health")
def health_check():
    try:
        with SessionLocal() as session:
            session.execute("SELECT 1")  # Quick DB check
        return {"status": "ok", "database": "connected"}
    except Exception:
        return {"status": "error", "database": "not connected"}
