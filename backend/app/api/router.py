from fastapi import APIRouter

from app.api.v1.admin.auth import router as admin_auth_router
from app.api.v1.admin.blogs import router as admin_blogs_router
from app.api.v1.admin.dashboard import router as admin_dashboard_router
from app.api.v1.admin.gallery import router as admin_gallery_router
from app.api.v1.admin.media import router as admin_media_router
from app.api.v1.admin.settings import router as admin_settings_router
from app.api.v1.admin.taxonomy import router as admin_taxonomy_router
from app.api.v1.public.blogs import router as public_blogs_router
from app.api.v1.public.gallery import router as public_gallery_router
from app.api.v1.public.home import router as public_home_router
from app.api.v1.public.settings import router as public_settings_router

api_router = APIRouter()
api_router.include_router(admin_auth_router, prefix="/admin/auth", tags=["admin-auth"])
api_router.include_router(admin_dashboard_router, prefix="/admin/dashboard", tags=["admin-dashboard"])
api_router.include_router(admin_media_router, prefix="/admin/media", tags=["admin-media"])
api_router.include_router(admin_gallery_router, prefix="/admin/gallery", tags=["admin-gallery"])
api_router.include_router(admin_blogs_router, prefix="/admin/blogs", tags=["admin-blogs"])
api_router.include_router(admin_taxonomy_router, prefix="/admin/taxonomy", tags=["admin-taxonomy"])
api_router.include_router(admin_settings_router, prefix="/admin/settings", tags=["admin-settings"])
api_router.include_router(public_gallery_router, prefix="/public/gallery", tags=["public-gallery"])
api_router.include_router(public_blogs_router, prefix="/public/blogs", tags=["public-blogs"])
api_router.include_router(public_home_router, prefix="/public/home", tags=["public-home"])
api_router.include_router(public_settings_router, prefix="/public/settings", tags=["public-settings"])
