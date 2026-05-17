from motor.motor_asyncio import AsyncIOMotorDatabase

from app.db.utils import parse_object_id, utcnow
from app.schemas.media import MediaAsset, MediaAssetCreate, MediaDeleteResponse
from app.services.cloudinary_service import delete_from_cloudinary, upload_to_cloudinary
from app.services.pagination import build_paginated_response


def _to_media_asset(document: dict | None) -> MediaAsset | None:
  if not document:
    return None
  document["id"] = str(document.pop("_id"))
  return MediaAsset.model_validate(document)


async def list_media_assets(database: AsyncIOMotorDatabase, *, page: int, page_size: int, media_type: str | None):
  query = {"media_type": media_type} if media_type else {}
  skip = (page - 1) * page_size
  cursor = database.media_assets.find(query).sort("created_at", -1).skip(skip).limit(page_size)
  items = [_to_media_asset(item) async for item in cursor]
  total = await database.media_assets.count_documents(query)
  return build_paginated_response(items=items, page=page, page_size=page_size, total=total)


async def create_media_asset(database: AsyncIOMotorDatabase, payload: MediaAssetCreate, upload_file) -> MediaAsset:
  now = utcnow()
  uploaded = await upload_file.read()
  cloudinary_result = await upload_to_cloudinary(uploaded, upload_file.filename or payload.title, payload.folder, payload.media_type)
  document = {
    "title": payload.title,
    "description": payload.description,
    "alt_text": payload.alt_text,
    "media_type": payload.media_type,
    "tags": payload.tags,
    "url": cloudinary_result["url"],
    "secure_url": cloudinary_result["secure_url"],
    "public_id": cloudinary_result["public_id"],
    "width": cloudinary_result.get("width"),
    "height": cloudinary_result.get("height"),
    "duration": cloudinary_result.get("duration"),
    "bytes": cloudinary_result.get("bytes"),
    "format": cloudinary_result.get("format"),
    "resource_type": cloudinary_result.get("resource_type", payload.media_type),
    "created_at": now,
    "updated_at": now,
  }
  result = await database.media_assets.insert_one(document)
  document["id"] = str(result.inserted_id)
  return MediaAsset.model_validate(document)


async def delete_media_asset(database: AsyncIOMotorDatabase, asset_id: str) -> MediaDeleteResponse:
  document = await database.media_assets.find_one({"_id": parse_object_id(asset_id)})
  if not document:
    return MediaDeleteResponse(deleted=False, public_id="")

  await delete_from_cloudinary(document["public_id"], document["media_type"])
  await database.media_assets.delete_one({"_id": document["_id"]})
  return MediaDeleteResponse(deleted=True, public_id=document["public_id"])
