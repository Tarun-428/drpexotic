from datetime import UTC, datetime

from motor.motor_asyncio import AsyncIOMotorDatabase
from slugify import slugify

from app.db.utils import parse_object_id, utcnow
from app.schemas.admin import AdminPublic
from app.schemas.blog import BlogPost, BlogPostCreate, BlogPostListItem, BlogPostUpdate
from app.services.pagination import build_paginated_response


def _normalize_post(document: dict | None) -> BlogPost | None:
  if not document:
    return None
  document["id"] = str(document.pop("_id"))
  document["author_id"] = str(document["author_id"])
  return BlogPost.model_validate(document)


def _normalize_post_list_item(document: dict | None) -> BlogPostListItem | None:
  if not document:
    return None
  document["id"] = str(document.pop("_id"))
  return BlogPostListItem.model_validate(document)


async def _ensure_unique_slug(database: AsyncIOMotorDatabase, slug: str, current_post_id: str | None = None) -> str:
  base_slug = slugify(slug)
  candidate = base_slug
  suffix = 1

  while True:
    existing = await database.blogs.find_one({"slug": candidate})
    if not existing or (current_post_id and str(existing["_id"]) == current_post_id):
      return candidate
    suffix += 1
    candidate = f"{base_slug}-{suffix}"


async def list_blog_posts(database: AsyncIOMotorDatabase, *, page: int, page_size: int, status_filter: str | None, search: str | None):
  query: dict = {}
  if status_filter:
    query["status"] = status_filter
  if search:
    query["$or"] = [
      {"title": {"$regex": search, "$options": "i"}},
      {"short_description": {"$regex": search, "$options": "i"}},
      {"tags": {"$elemMatch": {"$regex": search, "$options": "i"}}},
    ]
  skip = (page - 1) * page_size
  cursor = database.blogs.find(query).sort("updated_at", -1).skip(skip).limit(page_size)
  items = [_normalize_post_list_item(item) async for item in cursor]
  total = await database.blogs.count_documents(query)
  return build_paginated_response(items=items, page=page, page_size=page_size, total=total)


async def list_published_blog_posts(database: AsyncIOMotorDatabase, *, page: int, page_size: int, category: str | None, tag: str | None, search: str | None):
  query: dict = {"status": "published"}
  if category:
    query["categories"] = category
  if tag:
    query["tags"] = tag
  if search:
    query["$or"] = [
      {"title": {"$regex": search, "$options": "i"}},
      {"short_description": {"$regex": search, "$options": "i"}},
    ]
  skip = (page - 1) * page_size
  cursor = database.blogs.find(query).sort("published_at", -1).skip(skip).limit(page_size)
  items = [_normalize_post_list_item(item) async for item in cursor]
  total = await database.blogs.count_documents(query)
  return build_paginated_response(items=items, page=page, page_size=page_size, total=total)


async def get_blog_post_by_id(database: AsyncIOMotorDatabase, post_id: str) -> BlogPost | None:
  return _normalize_post(await database.blogs.find_one({"_id": parse_object_id(post_id)}))


async def get_blog_post_by_slug(database: AsyncIOMotorDatabase, slug: str) -> BlogPost | None:
  return _normalize_post(await database.blogs.find_one({"slug": slug}))


async def create_blog_post(database: AsyncIOMotorDatabase, payload: BlogPostCreate, admin: AdminPublic) -> BlogPost:
  now = utcnow()
  normalized_slug = await _ensure_unique_slug(database, payload.slug)
  published_at = now if payload.status == "published" else None
  
  # CHANGED: Added mode="json" to serialize HttpUrl fields into string primitives
  document = payload.model_dump(mode="json")
  
  document["slug"] = normalized_slug
  document["author_id"] = parse_object_id(admin.id)
  document["author_name"] = admin.display_name
  document["published_at"] = published_at
  document["created_at"] = now
  document["updated_at"] = now
  result = await database.blogs.insert_one(document)
  document["id"] = str(result.inserted_id)
  document["author_id"] = admin.id
  return BlogPost.model_validate(document)


async def update_blog_post(database: AsyncIOMotorDatabase, post_id: str, payload: BlogPostUpdate, admin: AdminPublic) -> BlogPost | None:
  # CHANGED: Added mode="json" here to handle image/url updates correctly
  changes = {key: value for key, value in payload.model_dump(mode="json", exclude_none=True).items()}
  if "slug" in changes:
    changes["slug"] = await _ensure_unique_slug(database, changes["slug"], current_post_id=post_id)

  existing = await database.blogs.find_one({"_id": parse_object_id(post_id)})
  if not existing:
    return None

  status_value = changes.get("status")
  if status_value == "published" and not existing.get("published_at"):
    changes["published_at"] = utcnow()
  elif status_value == "draft":
    changes["published_at"] = None

  changes["author_id"] = parse_object_id(admin.id)
  changes["author_name"] = admin.display_name
  changes["updated_at"] = utcnow()
  await database.blogs.update_one({"_id": parse_object_id(post_id)}, {"$set": changes})
  document = await database.blogs.find_one({"_id": parse_object_id(post_id)})
  return _normalize_post(document)


async def delete_blog_post(database: AsyncIOMotorDatabase, post_id: str) -> bool:
  result = await database.blogs.delete_one({"_id": parse_object_id(post_id)})
  return result.deleted_count > 0


async def get_related_blog_posts(database: AsyncIOMotorDatabase, slug: str, *, limit: int) -> list[BlogPostListItem]:
  post = await database.blogs.find_one({"slug": slug, "status": "published"})
  if not post:
    return []

  query = {
    "status": "published",
    "slug": {"$ne": slug},
    "$or": [
      {"categories": {"$in": post.get("categories", [])}},
      {"tags": {"$in": post.get("tags", [])}},
    ],
  }
  cursor = database.blogs.find(query).sort("published_at", -1).limit(limit)
  return [_normalize_post_list_item(item) async for item in cursor]


async def list_featured_news_items(database: AsyncIOMotorDatabase, *, limit: int) -> list[BlogPostListItem]:
  cursor = database.blogs.find({"status": "published"}).sort([("is_featured", -1), ("published_at", -1)]).limit(limit)
  return [_normalize_post_list_item(item) async for item in cursor]
