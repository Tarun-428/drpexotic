import certifi
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase

from app.core.config import get_settings

settings = get_settings()
client: AsyncIOMotorClient | None = None
database: AsyncIOMotorDatabase | None = None


async def connect_to_mongo() -> None:
  global client, database
  if client is None:
    client = AsyncIOMotorClient(
      settings.mongo_uri,
      tlsCAFile=certifi.where()
    )
    database = client[settings.mongo_db_name]
    await ensure_indexes(database)


async def close_mongo_connection() -> None:
  global client, database
  if client is not None:
    client.close()
    client = None
    database = None


def get_database() -> AsyncIOMotorDatabase:
  if database is None:
    raise RuntimeError("Database connection has not been initialized.")
  return database


async def ensure_indexes(db: AsyncIOMotorDatabase) -> None:
  await db.admins.create_index("email", unique=True)
  await db.blogs.create_index("slug", unique=True)
  await db.blogs.create_index([("status", 1), ("published_at", -1)])
  await db.blogs.create_index([("tags", 1)])
  await db.blogs.create_index([("categories", 1)])
  await db.gallery_items.create_index([("sort_order", 1), ("created_at", -1)])
  await db.gallery_items.create_index([("is_published", 1), ("sort_order", 1)])
  await db.media_assets.create_index([("media_type", 1), ("created_at", -1)])
  await db.categories.create_index("slug", unique=True)
  await db.tags.create_index("slug", unique=True)
  await db.website_settings.create_index("updated_at")
