from fastapi import APIRouter, HTTPException, Query, status

from app.db.mongo import get_database
from app.schemas.blog import BlogPost, BlogPostListItem
from app.schemas.common import PaginatedResponse
from app.services.blogs import get_blog_post_by_slug, get_related_blog_posts, list_published_blog_posts

router = APIRouter()


@router.get("", response_model=PaginatedResponse[BlogPostListItem])
async def public_blogs(
  page: int = Query(1, ge=1),
  page_size: int = Query(9, ge=1, le=24),
  category: str | None = Query(None),
  tag: str | None = Query(None),
  search: str | None = Query(None),
) -> PaginatedResponse[BlogPostListItem]:
  return await list_published_blog_posts(get_database(), page=page, page_size=page_size, category=category, tag=tag, search=search)


@router.get("/{slug}", response_model=BlogPost)
async def public_blog_detail(slug: str) -> BlogPost:
  post = await get_blog_post_by_slug(get_database(), slug)
  if not post or post.status != "published":
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Blog post not found.")
  return post


@router.get("/{slug}/related", response_model=list[BlogPostListItem])
async def related_posts(slug: str, limit: int = Query(3, ge=1, le=6)) -> list[BlogPostListItem]:
  return await get_related_blog_posts(get_database(), slug, limit=limit)
