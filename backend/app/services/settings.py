from motor.motor_asyncio import AsyncIOMotorDatabase

from app.db.utils import utcnow
from app.schemas.settings import HeroCtaLinks, SocialLinks, WebsiteSettings, WebsiteSettingsUpdate

SETTINGS_ID = "website"


def _default_settings() -> dict:
  return {
    "_id": SETTINGS_ID,
    "whatsapp_number": "919876543210",
    "contact_phone_display": "+91 — configure in admin",
    "contact_phone_tel": "+910000000000",
    "email": "hello@drpexoticfarms.example",
    "farm_location": "India — update precise farm / office address in admin settings.",
    "google_maps_embed_url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.0!2d75.8577!3d22.7196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fcad1b0e1eaf%3A0xc3a449dae441bcdf!2sIndore!5e0!3m2!1sen!2sin!4v1",
    "footer_content": "DRP Exotic Farms blends estate-grown produce, grower partnerships, and long-horizon orchard programmes into one continuous experience.",
    "social_links": SocialLinks().model_dump(),
    "hero_cta_links": HeroCtaLinks().model_dump(),
    "updated_at": utcnow(),
  }


def _to_settings(document: dict | None) -> WebsiteSettings:
  data = _default_settings()
  if document:
    data.update({key: value for key, value in document.items() if key != "_id"})
  return WebsiteSettings.model_validate(data)


async def get_website_settings(database: AsyncIOMotorDatabase) -> WebsiteSettings:
  document = await database.website_settings.find_one({"_id": SETTINGS_ID})
  if not document:
    document = _default_settings()
    await database.website_settings.update_one({"_id": SETTINGS_ID}, {"$set": document}, upsert=True)
  return _to_settings(document)


async def update_website_settings(database: AsyncIOMotorDatabase, payload: WebsiteSettingsUpdate) -> WebsiteSettings:
  changes = {key: value for key, value in payload.model_dump(mode="json", exclude_none=True).items()}
  changes["updated_at"] = utcnow()
  await database.website_settings.update_one({"_id": SETTINGS_ID}, {"$set": changes}, upsert=True)
  return await get_website_settings(database)
