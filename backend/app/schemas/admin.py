from datetime import datetime

from pydantic import BaseModel, EmailStr

from app.schemas.base import MongoModel


class AdminLoginRequest(BaseModel):
  email: EmailStr
  password: str


class AdminDocument(MongoModel):
  email: EmailStr
  password_hash: str
  display_name: str
  created_at: datetime
  updated_at: datetime


class AdminPublic(MongoModel):
  email: EmailStr
  display_name: str
  created_at: datetime
  updated_at: datetime


class AdminLoginResponse(BaseModel):
  access_token: str
  token_type: str = "bearer"
  admin: AdminPublic
