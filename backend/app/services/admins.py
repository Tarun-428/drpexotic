from motor.motor_asyncio import AsyncIOMotorDatabase

from app.core.config import get_settings
from app.core.security import hash_password
from app.db.utils import parse_object_id, utcnow
from app.schemas.admin import AdminDocument

settings = get_settings()


def _to_admin(document: dict | None) -> AdminDocument | None:
  if not document:
    return None
  document["id"] = str(document.pop("_id"))
  return AdminDocument.model_validate(document)


async def ensure_default_admin(database: AsyncIOMotorDatabase) -> None:
  existing = await database.admins.find_one({"email": settings.admin_email})
  if existing:
    return

  now = utcnow()
  await database.admins.insert_one(
    {
      "email": settings.admin_email,
      "password_hash": hash_password(settings.admin_password),
      "display_name": "DRP Administrator",
      "created_at": now,
      "updated_at": now,
    }
  )


async def get_admin_by_email(database: AsyncIOMotorDatabase, email: str) -> AdminDocument | None:
  return _to_admin(await database.admins.find_one({"email": email}))


async def get_admin_by_id(database: AsyncIOMotorDatabase, admin_id: str) -> AdminDocument | None:
  return _to_admin(await database.admins.find_one({"_id": parse_object_id(admin_id)}))
