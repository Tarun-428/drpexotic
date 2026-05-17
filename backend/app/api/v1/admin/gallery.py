from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.api.deps import get_current_admin
from app.db.mongo import get_database
from app.schemas.admin import AdminPublic
from app.schemas.common import PaginatedResponse
from app.schemas.gallery import GalleryItem, GalleryItemCreate, GalleryItemReorderRequest, GalleryItemUpdate
from app.services.gallery import create_gallery_item, delete_gallery_item, list_gallery_items, reorder_gallery_items, update_gallery_item

router = APIRouter()


@router.get("", response_model=PaginatedResponse[GalleryItem])
async def get_gallery_items(
  page: int = Query(1, ge=1),
  page_size: int = Query(24, ge=1, le=100),
  _: AdminPublic = Depends(get_current_admin),
) -> PaginatedResponse[GalleryItem]:
  return await list_gallery_items(get_database(), page=page, page_size=page_size, published_only=False)


@router.post("", response_model=GalleryItem, status_code=status.HTTP_201_CREATED)
async def add_gallery_item(payload: GalleryItemCreate, _: AdminPublic = Depends(get_current_admin)) -> GalleryItem:
  return await create_gallery_item(get_database(), payload)


@router.put("/{item_id}", response_model=GalleryItem)
async def edit_gallery_item(item_id: str, payload: GalleryItemUpdate, _: AdminPublic = Depends(get_current_admin)) -> GalleryItem:
  updated = await update_gallery_item(get_database(), item_id, payload)
  if not updated:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Gallery item not found.")
  return updated


@router.post("/reorder", response_model=list[GalleryItem])
async def reorder_gallery(payload: GalleryItemReorderRequest, _: AdminPublic = Depends(get_current_admin)) -> list[GalleryItem]:
  return await reorder_gallery_items(get_database(), payload.ids)


@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def remove_gallery_item(item_id: str, _: AdminPublic = Depends(get_current_admin)) -> None:
  deleted = await delete_gallery_item(get_database(), item_id)
  if not deleted:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Gallery item not found.")
