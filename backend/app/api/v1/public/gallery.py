from fastapi import APIRouter, Query

from app.db.mongo import get_database
from app.schemas.common import PaginatedResponse
from app.schemas.gallery import GalleryItem
from app.services.gallery import list_gallery_items

router = APIRouter()


@router.get("", response_model=PaginatedResponse[GalleryItem])
async def public_gallery(
  page: int = Query(1, ge=1),
  page_size: int = Query(24, ge=1, le=100),
) -> PaginatedResponse[GalleryItem]:
  return await list_gallery_items(get_database(), page=page, page_size=page_size, published_only=True)
