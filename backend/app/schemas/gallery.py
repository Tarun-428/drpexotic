from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field, HttpUrl

from app.schemas.base import MongoModel

GalleryMediaType = Literal["image", "video"]


class GalleryItemBase(BaseModel):
  title: str = Field(min_length=1, max_length=160)
  description: str = Field(default="", max_length=500)
  media_type: GalleryMediaType
  media_url: HttpUrl
  thumbnail_url: HttpUrl | None = None
  public_id: str = Field(min_length=1)
  sort_order: int = 0
  is_published: bool = True


class GalleryItemCreate(GalleryItemBase):
  pass


class GalleryItemUpdate(BaseModel):
  title: str | None = Field(default=None, min_length=1, max_length=160)
  description: str | None = Field(default=None, max_length=500)
  media_type: GalleryMediaType | None = None
  media_url: HttpUrl | None = None
  thumbnail_url: HttpUrl | None = None
  public_id: str | None = None
  sort_order: int | None = None
  is_published: bool | None = None


class GalleryItem(MongoModel, GalleryItemBase):
  created_at: datetime
  updated_at: datetime


class GalleryItemReorderRequest(BaseModel):
  ids: list[str] = Field(min_length=1)
