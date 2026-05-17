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
  document = payload.model_dump()
  document["created_at"] = now
  document["updated_at"] = now
  result = await database.tags.insert_one(document)
  document["id"] = str(result.inserted_id)
  return Tag.model_validate(document)
