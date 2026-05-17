from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.core.security import decode_access_token
from app.db.mongo import get_database
from app.schemas.admin import AdminPublic
from app.services.admins import get_admin_by_id

security = HTTPBearer(auto_error=False)


async def get_current_admin(
  credentials: HTTPAuthorizationCredentials | None = Depends(security),
) -> AdminPublic:
  if not credentials:
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing authentication token.")

  try:
    payload = decode_access_token(credentials.credentials)
  except ValueError as exc:
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token.") from exc

  admin_id = payload.get("sub")
  if not admin_id:
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token payload.")

  database = get_database()
  admin = await get_admin_by_id(database, admin_id)
  if not admin:
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Admin account was not found.")

  return admin
