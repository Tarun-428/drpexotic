from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.core.config import get_settings
from app.db.mongo import close_mongo_connection, connect_to_mongo

settings = get_settings()

app = FastAPI(
  title=settings.app_name,
  version="1.0.0",
  docs_url="/docs",
  redoc_url="/redoc",
)

app.add_middleware(
  CORSMiddleware,
  allow_origins=settings.cors_origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)


@app.on_event("startup")
async def on_startup() -> None:
  await connect_to_mongo()


@app.on_event("shutdown")
async def on_shutdown() -> None:
  await close_mongo_connection()


@app.get("/health", tags=["health"])
async def healthcheck() -> dict[str, str]:
  return {"status": "ok"}


app.include_router(api_router, prefix=settings.api_v1_prefix)
