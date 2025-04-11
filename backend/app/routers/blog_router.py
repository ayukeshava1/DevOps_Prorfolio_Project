from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app import schemas, database
from app.services.blog_service import (
    create_blog,
    get_all_blogs,
    get_blog,
    update_blog,
    delete_blog,
    like_blog,
    dislike_blog
)

router = APIRouter(
    prefix="",  # No prefix to keep /api/blogs/ clean
    tags=["Blogs"]
)

get_db = database.get_db


@router.post("/", response_model=schemas.BlogOut)
def create_blog_route(blog: schemas.BlogCreate, db: Session = Depends(get_db)):
    try:
        return create_blog(db, blog)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Create blog failed: {e}")


@router.get("/", response_model=List[schemas.BlogOut])
def read_all_blogs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_all_blogs(db, skip, limit)


@router.get("/{blog_id}", response_model=schemas.BlogOut)
def read_blog(blog_id: int, db: Session = Depends(get_db)):
    blog = get_blog(db, blog_id)
    if blog is None:
        raise HTTPException(status_code=404, detail="Blog not found")
    return blog


@router.put("/{blog_id}", response_model=schemas.BlogOut)
def update_blog_route(blog_id: int, blog: schemas.BlogUpdate, db: Session = Depends(get_db)):
    updated_blog = update_blog(db, blog_id, blog)
    if updated_blog is None:
        raise HTTPException(status_code=404, detail="Blog not found")
    return updated_blog


@router.delete("/{blog_id}")
def delete_blog_route(blog_id: int, db: Session = Depends(get_db)):
    deleted = delete_blog(db, blog_id)
    if deleted is None:
        raise HTTPException(status_code=404, detail="Blog not found")
    return {"detail": "Blog deleted"}


@router.post("/{blog_id}/like", response_model=schemas.BlogOut)
def like_blog_route(blog_id: int, db: Session = Depends(get_db)):
    blog = like_blog(db, blog_id)
    if blog is None:
        raise HTTPException(status_code=404, detail="Blog not found")
    return blog


@router.post("/{blog_id}/dislike", response_model=schemas.BlogOut)
def dislike_blog_route(blog_id: int, db: Session = Depends(get_db)):
    blog = dislike_blog(db, blog_id)
    if blog is None:
        raise HTTPException(status_code=404, detail="Blog not found")
    return blog
