from fastapi import APIRouter

from app.db.mongo import get_database
from app.schemas.blog import BlogPostListItem
from app.services.blogs import list_featured_news_items

router = APIRouter()


@router.get("/news", response_model=list[BlogPostListItem])
async def home_news() -> list[BlogPostListItem]:
  return await list_featured_news_items(get_database(), limit=6)
