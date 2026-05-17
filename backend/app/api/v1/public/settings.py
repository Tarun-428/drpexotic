from fastapi import APIRouter

from app.db.mongo import get_database
from app.schemas.settings import WebsiteSettings
from app.services.settings import get_website_settings

router = APIRouter()


@router.get("", response_model=WebsiteSettings)
async def public_settings() -> WebsiteSettings:
  return await get_website_settings(get_database())
