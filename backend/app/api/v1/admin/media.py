from fastapi import APIRouter, Depends, File, Form, Query, UploadFile, status

from app.api.deps import get_current_admin
from app.db.mongo import get_database
from app.schemas.admin import AdminPublic
from app.schemas.common import PaginatedResponse
from app.schemas.media import MediaAsset, MediaAssetCreate, MediaDeleteResponse
from app.services.media import create_media_asset, delete_media_asset, list_media_assets

router = APIRouter()


@router.get("", response_model=PaginatedResponse[MediaAsset])
async def get_media_assets(
  page: int = Query(1, ge=1),
  page_size: int = Query(12, ge=1, le=100),
  media_type: str | None = Query(None),
  _: AdminPublic = Depends(get_current_admin),
) -> PaginatedResponse[MediaAsset]:
  database = get_database()
  return await list_media_assets(database, page=page, page_size=page_size, media_type=media_type)


@router.post("", response_model=MediaAsset, status_code=status.HTTP_201_CREATED)
async def upload_media(
  file: UploadFile = File(...),
  title: str = Form(...),
  alt_text: str = Form(""),
  media_type: str = Form(...),
  folder: str = Form("drp/media"),
  description: str = Form(""),
  tags: str = Form(""),
  _: AdminPublic = Depends(get_current_admin),
) -> MediaAsset:
  database = get_database()
  payload = MediaAssetCreate(
    title=title,
    alt_text=alt_text,
    media_type=media_type,
    folder=folder,
    description=description,
    tags=[item.strip() for item in tags.split(",") if item.strip()],
  )
  return await create_media_asset(database, payload, file)


@router.delete("/{asset_id}", response_model=MediaDeleteResponse)
async def remove_media(asset_id: str, _: AdminPublic = Depends(get_current_admin)) -> MediaDeleteResponse:
  database = get_database()
  return await delete_media_asset(database, asset_id)
