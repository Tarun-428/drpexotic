from motor.motor_asyncio import AsyncIOMotorDatabase

from app.db.utils import utcnow
from app.schemas.taxonomy import Category, CategoryCreate, Tag, TagCreate


def _to_category(document: dict | None) -> Category | None:
  if not document:
    return None
  document["id"] = str(document.pop("_id"))
  return Category.model_validate(document)


def _to_tag(document: dict | None) -> Tag | None:
  if not document:
    return None
  document["id"] = str(document.pop("_id"))
  return Tag.model_validate(document)


async def list_categories(database: AsyncIOMotorDatabase) -> list[Category]:
  cursor = database.categories.find({}).sort("name", 1)
  return [_to_category(item) async for item in cursor]


async def create_category(database: AsyncIOMotorDatabase, payload: CategoryCreate) -> Category:
  now = utcnow()
  document = payload.model_dump()
  document["created_at"] = now
  document["updated_at"] = now
  result = await database.categories.insert_one(document)
  document["id"] = str(result.inserted_id)
  return Category.model_validate(document)


async def list_tags(database: AsyncIOMotorDatabase) -> list[Tag]:
  cursor = database.tags.find({}).sort("name", 1)
  return [_to_tag(item) async for item in cursor]


async def create_tag(database: AsyncIOMotorDatabase, payload: TagCreate) -> Tag:
  now = utcnow()
  # Check if tag already exists (case-insensitive)
  existing = await database.tags.find_one({"name": {"$regex": f"^{payload.name}$", "$options": "i"}})
  if existing:
    return _to_tag(existing)

  document = payload.model_dump()
  document["created_at"] = now
  document["updated_at"] = now
  result = await database.tags.insert_one(document)
  document["id"] = str(result.inserted_id)
  return Tag.model_validate(document)


async def update_tag(database: AsyncIOMotorDatabase, tag_id: str, payload: TagCreate) -> Tag | None:
  now = utcnow()
  document = payload.model_dump()
  document["updated_at"] = now
  
  from app.db.utils import parse_object_id
  oid = parse_object_id(tag_id)
  old_tag = await database.tags.find_one({"_id": oid})
  if not old_tag:
    return None

  await database.tags.update_one({"_id": oid}, {"$set": document})
  updated = await database.tags.find_one({"_id": oid})
  
  # Update tag name in gallery_items and blogs
  if old_tag["name"] != updated["name"]:
    await database.gallery_items.update_many(
      {"tags": old_tag["name"]},
      {"$set": {"tags.$": updated["name"]}}
    )
    await database.blogs.update_many(
      {"tags": old_tag["name"]},
      {"$set": {"tags.$": updated["name"]}}
    )

  return _to_tag(updated)


async def delete_tag(database: AsyncIOMotorDatabase, tag_id: str) -> bool:
  from app.db.utils import parse_object_id
  oid = parse_object_id(tag_id)
  tag = await database.tags.find_one({"_id": oid})
  if not tag:
    return False

  result = await database.tags.delete_one({"_id": oid})
  if result.deleted_count > 0:
    # Remove tag from gallery_items and blogs
    await database.gallery_items.update_many(
      {"tags": tag["name"]},
      {"$pull": {"tags": tag["name"]}}
    )
    await database.blogs.update_many(
      {"tags": tag["name"]},
      {"$pull": {"tags": tag["name"]}}
    )
    return True
  return False
