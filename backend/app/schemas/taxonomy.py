from datetime import datetime

from pydantic import BaseModel, Field

from app.schemas.base import MongoModel


class CategoryCreate(BaseModel):
  name: str = Field(min_length=2, max_length=80)
  slug: str = Field(min_length=2, max_length=80)


class TagCreate(BaseModel):
  name: str = Field(min_length=2, max_length=80)
  slug: str = Field(min_length=2, max_length=80)


class Category(MongoModel):
  name: str
  slug: str
  created_at: datetime
  updated_at: datetime


class Tag(MongoModel):
  name: str
  slug: str
  created_at: datetime
  updated_at: datetime
