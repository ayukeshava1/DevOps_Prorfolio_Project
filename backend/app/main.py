from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine
from app.routers import auth

# 🚀 Import your blog router
from app.routers import blog_router

# 🔨 Create tables if not already created
Base.metadata.create_all(bind=engine)

# 🎉 Create FastAPI app
app = FastAPI()

# 🌐 CORS setup to allow frontend on port 3000
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Include blog router
app.include_router(blog_router.router, prefix="/api/blogs", tags=["Blogs"])
app.include_router(auth.router)

# ✅ Health check endpoint
@app.get("/health")
def health_check():
    return {"status": "ok"}
