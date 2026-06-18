from fastapi import APIRouter, Depends, HTTPException, status

from app.api.deps import get_current_admin
from app.db.mongo import get_database
from app.schemas.admin import AdminPublic
from app.schemas.taxonomy import Category, CategoryCreate, Tag, TagCreate
from app.services.taxonomy import create_category, create_tag, list_categories, list_tags, update_tag, delete_tag

router = APIRouter()


@router.get("/categories", response_model=list[Category])
async def get_categories(_: AdminPublic = Depends(get_current_admin)) -> list[Category]:
  return await list_categories(get_database())


@router.post("/categories", response_model=Category)
async def add_category(payload: CategoryCreate, _: AdminPublic = Depends(get_current_admin)) -> Category:
  return await create_category(get_database(), payload)


@router.get("/tags", response_model=list[Tag])
async def get_tags(_: AdminPublic = Depends(get_current_admin)) -> list[Tag]:
  return await list_tags(get_database())


@router.post("/tags", response_model=Tag)
async def add_tag(payload: TagCreate, _: AdminPublic = Depends(get_current_admin)) -> Tag:
  return await create_tag(get_database(), payload)


@router.put("/tags/{tag_id}", response_model=Tag)
async def edit_tag(tag_id: str, payload: TagCreate, _: AdminPublic = Depends(get_current_admin)) -> Tag:
  updated = await update_tag(get_database(), tag_id, payload)
  if not updated:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tag not found")
  return updated


@router.delete("/tags/{tag_id}", status_code=status.HTTP_204_NO_CONTENT)
async def remove_tag(tag_id: str, _: AdminPublic = Depends(get_current_admin)):
  deleted = await delete_tag(get_database(), tag_id)
  if not deleted:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tag not found")
  return None
