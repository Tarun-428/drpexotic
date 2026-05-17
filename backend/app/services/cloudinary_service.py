import cloudinary
import cloudinary.uploader

from app.core.config import get_settings

settings = get_settings()

cloudinary.config(
  cloud_name=settings.cloudinary_cloud_name or None,
  api_key=settings.cloudinary_api_key or None,
  api_secret=settings.cloudinary_api_secret or None,
  secure=True,
)


async def upload_to_cloudinary(file_bytes: bytes, filename: str, folder: str, media_type: str) -> dict:
  resource_type = "video" if media_type == "video" else "image"
  return cloudinary.uploader.upload(
    file_bytes,
    folder=folder,
    public_id=None,
    resource_type=resource_type,
    use_filename=True,
    unique_filename=True,
    overwrite=False,
    filename=filename,
  )


async def delete_from_cloudinary(public_id: str, media_type: str) -> dict:
  resource_type = "video" if media_type == "video" else "image"
  return cloudinary.uploader.destroy(public_id, resource_type=resource_type, invalidate=True)
