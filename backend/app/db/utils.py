from datetime import UTC, datetime

from bson import ObjectId
from fastapi import HTTPException, status


def utcnow() -> datetime:
  return datetime.now(UTC)


def parse_object_id(value: str) -> ObjectId:
  if not ObjectId.is_valid(value):
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid resource id.")
  return ObjectId(value)
