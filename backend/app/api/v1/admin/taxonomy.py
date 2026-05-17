from fastapi import APIRouter, Depends

from app.api.deps import get_current_admin
from app.db.mongo import get_database
from app.schemas.admin import AdminPublic
from app.schemas.taxonomy import Category, CategoryCreate, Tag, TagCreate
from app.services.taxonomy import create_category, create_tag, list_categories, list_tags

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
