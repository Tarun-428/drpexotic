from motor.motor_asyncio import AsyncIOMotorDatabase

from app.db.utils import parse_object_id, utcnow
from app.schemas.gallery import GalleryItem, GalleryItemCreate, GalleryItemUpdate
from app.services.pagination import build_paginated_response


def _to_gallery_item(document: dict | None) -> GalleryItem | None:
  if not document:
    return None
  document["id"] = str(document.pop("_id"))
  return GalleryItem.model_validate(document)


async def list_gallery_items(database: AsyncIOMotorDatabase, *, page: int, page_size: int, published_only: bool, tag: str | None = None):
  query = {"is_published": True} if published_only else {}
  if tag:
    query["tags"] = tag
  skip = (page - 1) * page_size
  cursor = database.gallery_items.find(query).sort([("sort_order", 1), ("created_at", -1)]).skip(skip).limit(page_size)
  items = [_to_gallery_item(item) async for item in cursor]
  total = await database.gallery_items.count_documents(query)
  return build_paginated_response(items=items, page=page, page_size=page_size, total=total)

async def create_gallery_item(database: AsyncIOMotorDatabase, payload: GalleryItemCreate) -> GalleryItem:
  now = utcnow()
  # mode="json" converts HttpUrl fields to plain strings automatically
  document = payload.model_dump(mode="json")
  document["created_at"] = now
  document["updated_at"] = now

  result = await database.gallery_items.insert_one(document)
  document["id"] = str(result.inserted_id)
  return GalleryItem.model_validate(document)


async def update_gallery_item(database: AsyncIOMotorDatabase, item_id: str, payload: GalleryItemUpdate) -> GalleryItem | None:
  # mode="json" is required here too, in case 'url' is updated
  changes = {key: value for key, value in payload.model_dump(mode="json", exclude_none=True).items()}
  if not changes:
    document = await database.gallery_items.find_one({"_id": parse_object_id(item_id)})
    return _to_gallery_item(document)

  changes["updated_at"] = utcnow()
  await database.gallery_items.update_one({"_id": parse_object_id(item_id)}, {"$set": changes})
  document = await database.gallery_items.find_one({"_id": parse_object_id(item_id)})
  return _to_gallery_item(document)

async def delete_gallery_item(database: AsyncIOMotorDatabase, item_id: str) -> bool:
  result = await database.gallery_items.delete_one({"_id": parse_object_id(item_id)})
  return result.deleted_count > 0


async def reorder_gallery_items(database: AsyncIOMotorDatabase, ids: list[str]) -> list[GalleryItem]:
  now = utcnow()
  for index, item_id in enumerate(ids):
    await database.gallery_items.update_one(
      {"_id": parse_object_id(item_id)},
      {"$set": {"sort_order": index, "updated_at": now}},
    )
  cursor = database.gallery_items.find({"_id": {"$in": [parse_object_id(item_id) for item_id in ids]}}).sort("sort_order", 1)
  return [_to_gallery_item(item) async for item in cursor]
