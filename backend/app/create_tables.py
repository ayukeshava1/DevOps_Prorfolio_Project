from app.database import Base, engine
from app.models.blogs import Blog

print("🛠 Creating tables...")
Base.metadata.create_all(bind=engine)
print("✅ All tables created!")
