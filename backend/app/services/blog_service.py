from sqlalchemy.orm import Session
from app import models, schemas
from datetime import datetime

def create_blog(db: Session, blog: schemas.BlogCreate):
    db_blog = models.Blog(
        title=blog.title,
        snippet=blog.snippet,
        content=blog.content,
        image_url=blog.image_url,
        video_url=blog.video_url,
        created_at=datetime.utcnow()
    )
    db.add(db_blog)
    db.commit()
    db.refresh(db_blog)
    return db_blog

def get_blog(db: Session, blog_id: int):
    return db.query(models.Blog).filter(models.Blog.id == blog_id).first()

def get_all_blogs(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Blog).offset(skip).limit(limit).all()

def update_blog(db: Session, blog_id: int, blog: schemas.BlogUpdate):
    db_blog = get_blog(db, blog_id)
    if not db_blog:
        return None

    for field, value in blog.dict(exclude_unset=True).items():
        setattr(db_blog, field, value)

    db.commit()
    db.refresh(db_blog)
    return db_blog

def delete_blog(db: Session, blog_id: int):
    db_blog = get_blog(db, blog_id)
    if db_blog:
        db.delete(db_blog)
        db.commit()
    return db_blog

def like_blog(db: Session, blog_id: int):
    db_blog = get_blog(db, blog_id)
    if db_blog:
        db_blog.likes += 1
        db.commit()
        db.refresh(db_blog)
    return db_blog

def dislike_blog(db: Session, blog_id: int):
    db_blog = get_blog(db, blog_id)
    if db_blog:
        db_blog.dislikes += 1
        db.commit()
        db.refresh(db_blog)
    return db_blog
