from datetime import datetime

from pydantic import BaseModel, Field, HttpUrl


class SocialLinks(BaseModel):
  instagram: str = ""
  facebook: str = ""
  youtube: str = ""
  linkedin: str = ""
  twitter: str = ""
  whatsapp: str = ""


class HeroCtaLinks(BaseModel):
  primary_label: str = "Explore our produce"
  primary_url: str = "/produce"
  secondary_label: str = "Talk on WhatsApp"
  secondary_url: str = ""


class WebsiteSettings(BaseModel):
  whatsapp_number: str = Field(default="", max_length=32)
  contact_phone_display: str = Field(default="", max_length=48)
  contact_phone_tel: str = Field(default="", max_length=32)
  email: str = Field(default="", max_length=120)
  farm_location: str = Field(default="", max_length=500)
  google_maps_embed_url: HttpUrl | str = ""
  footer_content: str = Field(default="", max_length=700)
  social_links: SocialLinks = Field(default_factory=SocialLinks)
  hero_cta_links: HeroCtaLinks = Field(default_factory=HeroCtaLinks)
  updated_at: datetime | None = None


class WebsiteSettingsUpdate(BaseModel):
  whatsapp_number: str | None = Field(default=None, max_length=32)
  contact_phone_display: str | None = Field(default=None, max_length=48)
  contact_phone_tel: str | None = Field(default=None, max_length=32)
  email: str | None = Field(default=None, max_length=120)
  farm_location: str | None = Field(default=None, max_length=500)
  google_maps_embed_url: HttpUrl | str | None = None
  footer_content: str | None = Field(default=None, max_length=700)
  social_links: SocialLinks | None = None
  hero_cta_links: HeroCtaLinks | None = None
