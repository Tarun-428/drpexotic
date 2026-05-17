from fastapi import APIRouter, Depends, HTTPException, status

from app.api.deps import get_current_admin
from app.core.security import create_access_token, verify_password
from app.db.mongo import get_database
from app.schemas.admin import AdminLoginRequest, AdminLoginResponse, AdminPublic
from app.services.admins import ensure_default_admin, get_admin_by_email

router = APIRouter()


@router.post("/login", response_model=AdminLoginResponse)
async def login(payload: AdminLoginRequest) -> AdminLoginResponse:
  database = get_database()
  await ensure_default_admin(database)
  admin = await get_admin_by_email(database, payload.email)
  if not admin or not verify_password(payload.password, admin.password_hash):
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password.")

  token = create_access_token(str(admin.id))
  return AdminLoginResponse(access_token=token, admin=AdminPublic.model_validate(admin.model_dump()))


@router.get("/me", response_model=AdminPublic)
async def me(current_admin: AdminPublic = Depends(get_current_admin)) -> AdminPublic:
  return current_admin
