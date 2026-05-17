from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field, HttpUrl, field_validator

from app.schemas.base import MongoModel

BlogStatus = Literal["draft", "published"]


class BlogSeoMeta(BaseModel):
  meta_title: str = Field(min_length=1, max_length=70)
  meta_description: str = Field(min_length=1, max_length=160)
  canonical_url: HttpUrl | None = None


class BlogMediaReference(BaseModel):
  title: str = Field(min_length=1, max_length=160)
  media_type: Literal["image", "video"]
  url: HttpUrl
  public_id: str
  caption: str = Field(default="", max_length=240)
  alt_text: str = Field(default="", max_length=180)
  width: int | None = None
  height: int | None = None
  duration: float | None = None


class BlogContentBlock(BaseModel):
  id: str = Field(min_length=1)
  type: Literal["paragraph", "heading", "quote", "list", "image", "video"]
  text: str | None = None
  level: int | None = Field(default=None, ge=2, le=4)
  items: list[str] = Field(default_factory=list)
  media: BlogMediaReference | None = None
  alignment: Literal["left", "center", "wide"] | None = None


class BlogPostBase(BaseModel):
  title: str = Field(min_length=8, max_length=180)
  slug: str = Field(min_length=3, max_length=200)
  short_description: str = Field(min_length=20, max_length=220)
  featured_image: BlogMediaReference
  content_blocks: list[BlogContentBlock] = Field(default_factory=list)
  tags: list[str] = Field(default_factory=list, max_length=12)
  categories: list[str] = Field(default_factory=list, max_length=6)
  seo: BlogSeoMeta
  reading_time_minutes: int = Field(ge=1, le=60)
  status: BlogStatus = "draft"
  is_featured: bool = False

  @field_validator("content_blocks")
  @classmethod
  def validate_blocks(cls, value: list[BlogContentBlock]) -> list[BlogContentBlock]:
    image_count = sum(1 for block in value if block.type == "image")
    video_count = sum(1 for block in value if block.type == "video")
    if image_count > 5:
      raise ValueError("A blog can include at most 5 embedded images.")
    if video_count > 2:
      raise ValueError("A blog can include at most 2 embedded videos.")
    return value


class BlogPostCreate(BlogPostBase):
  pass


class BlogPostUpdate(BaseModel):
  title: str | None = Field(default=None, min_length=8, max_length=180)
  slug: str | None = Field(default=None, min_length=3, max_length=200)
  short_description: str | None = Field(default=None, min_length=20, max_length=220)
  featured_image: BlogMediaReference | None = None
  content_blocks: list[BlogContentBlock] | None = None
  tags: list[str] | None = None
  categories: list[str] | None = None
  seo: BlogSeoMeta | None = None
  reading_time_minutes: int | None = Field(default=None, ge=1, le=60)
  status: BlogStatus | None = None
  is_featured: bool | None = None


class BlogPostListItem(MongoModel):
  title: str
  slug: str
  short_description: str
  featured_image: BlogMediaReference
  tags: list[str]
  categories: list[str]
  reading_time_minutes: int
  status: BlogStatus
  is_featured: bool
  author_name: str
  published_at: datetime | None = None
  created_at: datetime
  updated_at: datetime


class BlogPost(MongoModel, BlogPostBase):
  author_id: str
  author_name: str
  published_at: datetime | None = None
  created_at: datetime
  updated_at: datetime
