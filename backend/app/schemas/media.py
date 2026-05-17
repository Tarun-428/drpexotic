from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field, HttpUrl

from app.schemas.base import MongoModel

MediaType = Literal["image", "video"]


class MediaAssetBase(BaseModel):
  title: str = Field(min_length=1, max_length=160)
  description: str = Field(default="", max_length=400)
  alt_text: str = Field(default="", max_length=180)
  media_type: MediaType
  tags: list[str] = Field(default_factory=list)


class MediaAssetCreate(MediaAssetBase):
  folder: str = "drp/media"


class MediaAsset(MongoModel, MediaAssetBase):
  url: HttpUrl
  secure_url: HttpUrl
  public_id: str
  width: int | None = None
  height: int | None = None
  duration: float | None = None
  bytes: int | None = None
  format: str | None = None
  resource_type: str
  created_at: datetime
  updated_at: datetime


class MediaDeleteResponse(BaseModel):
  deleted: bool
  public_id: str
