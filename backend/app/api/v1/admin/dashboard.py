from fastapi import APIRouter, Depends

from app.api.deps import get_current_admin
from app.db.mongo import get_database
from app.schemas.admin import AdminPublic
from app.schemas.dashboard import DashboardOverview
from app.services.dashboard import build_dashboard_overview

router = APIRouter()


@router.get("/overview", response_model=DashboardOverview)
async def overview(_: AdminPublic = Depends(get_current_admin)) -> DashboardOverview:
  database = get_database()
  return await build_dashboard_overview(database)
