from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class BlogBase(BaseModel):
    title: str
    snippet: Optional[str] = None
    content: str
    image_url: Optional[str] = None  # changed
    video_url: Optional[str] = None  # changed
    is_published: Optional[bool] = True

class BlogCreate(BlogBase):
    pass

class BlogUpdate(BlogBase):
    title: Optional[str] = None
    content: Optional[str] = None

class BlogOut(BlogBase):
    id: int
    likes: int
    dislikes: int
    created_at: datetime

    class Config:
        orm_mode = True
