from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.api.deps import get_current_admin
from app.db.mongo import get_database
from app.schemas.admin import AdminPublic
from app.schemas.blog import BlogPost, BlogPostCreate, BlogPostListItem, BlogPostUpdate
from app.schemas.common import PaginatedResponse
from app.services.blogs import create_blog_post, delete_blog_post, get_blog_post_by_id, list_blog_posts, update_blog_post

router = APIRouter()


@router.get("", response_model=PaginatedResponse[BlogPostListItem])
async def get_blog_posts(
  page: int = Query(1, ge=1),
  page_size: int = Query(10, ge=1, le=50),
  status_filter: str | None = Query(None, alias="status"),
  search: str | None = Query(None),
  _: AdminPublic = Depends(get_current_admin),
) -> PaginatedResponse[BlogPostListItem]:
  return await list_blog_posts(get_database(), page=page, page_size=page_size, status_filter=status_filter, search=search)


@router.get("/{post_id}", response_model=BlogPost)
async def get_blog_post(post_id: str, _: AdminPublic = Depends(get_current_admin)) -> BlogPost:
  post = await get_blog_post_by_id(get_database(), post_id)
  if not post:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Blog post not found.")
  return post


@router.post("", response_model=BlogPost, status_code=status.HTTP_201_CREATED)
async def add_blog_post(payload: BlogPostCreate, current_admin: AdminPublic = Depends(get_current_admin)) -> BlogPost:
  return await create_blog_post(get_database(), payload, current_admin)


@router.put("/{post_id}", response_model=BlogPost)
async def edit_blog_post(
  post_id: str,
  payload: BlogPostUpdate,
  current_admin: AdminPublic = Depends(get_current_admin),
) -> BlogPost:
  updated = await update_blog_post(get_database(), post_id, payload, current_admin)
  if not updated:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Blog post not found.")
  return updated


@router.delete("/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
async def remove_blog_post(post_id: str, _: AdminPublic = Depends(get_current_admin)) -> None:
  deleted = await delete_blog_post(get_database(), post_id)
  if not deleted:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Blog post not found.")
