from fastapi import APIRouter, Depends

from app.api.deps import get_current_admin
from app.db.mongo import get_database
from app.schemas.admin import AdminPublic
from app.schemas.settings import WebsiteSettings, WebsiteSettingsUpdate
from app.services.settings import get_website_settings, update_website_settings

router = APIRouter()


@router.get("", response_model=WebsiteSettings)
async def get_settings(_: AdminPublic = Depends(get_current_admin)) -> WebsiteSettings:
  return await get_website_settings(get_database())


@router.put("", response_model=WebsiteSettings)
async def save_settings(payload: WebsiteSettingsUpdate, _: AdminPublic = Depends(get_current_admin)) -> WebsiteSettings:
  return await update_website_settings(get_database(), payload)
