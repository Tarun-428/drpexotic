from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
  model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

  app_name: str = "DRP Exotic Farms CMS API"
  api_v1_prefix: str = "/api/v1"
  mongo_uri: str = Field(..., alias="MONGO_URI")
  mongo_db_name: str = Field("drp_exotic_farms", alias="MONGO_DB_NAME")
  jwt_secret_key: str = Field(..., alias="JWT_SECRET_KEY")
  jwt_algorithm: str = Field("HS256", alias="JWT_ALGORITHM")
  jwt_expire_minutes: int = Field(60 * 24, alias="JWT_EXPIRE_MINUTES")
  cors_origins: list[str] = Field(default_factory=lambda: ["http://localhost:5173", "http://127.0.0.1:5173"], alias="CORS_ORIGINS")
  admin_email: str = Field("admin@drpexoticfarms.com", alias="ADMIN_EMAIL")
  admin_password: str = Field("ChangeMeImmediately123!", alias="ADMIN_PASSWORD")
  cloudinary_cloud_name: str = Field("", alias="CLOUDINARY_CLOUD_NAME")
  cloudinary_api_key: str = Field("", alias="CLOUDINARY_API_KEY")
  cloudinary_api_secret: str = Field("", alias="CLOUDINARY_API_SECRET")


@lru_cache
def get_settings() -> Settings:
  return Settings()
