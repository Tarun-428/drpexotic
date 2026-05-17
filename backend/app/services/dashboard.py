from motor.motor_asyncio import AsyncIOMotorDatabase

from app.schemas.dashboard import DashboardOverview, DashboardStat


async def build_dashboard_overview(database: AsyncIOMotorDatabase) -> DashboardOverview:
  draft_blogs = await database.blogs.count_documents({"status": "draft"})
  published_blogs = await database.blogs.count_documents({"status": "published"})
  gallery_count = await database.gallery_items.count_documents({})
  media_count = await database.media_assets.count_documents({})

  latest_blog_cursor = database.blogs.find({}).sort("updated_at", -1).limit(4)
  latest_gallery_cursor = database.gallery_items.find({}).sort("updated_at", -1).limit(4)

  return DashboardOverview(
    stats=[
      DashboardStat(label="Published stories", value=published_blogs, accent="gold"),
      DashboardStat(label="Draft articles", value=draft_blogs, accent="moss"),
      DashboardStat(label="Gallery assets", value=gallery_count, accent="cream"),
      DashboardStat(label="Media library", value=media_count, accent="forest"),
    ],
    latest_blog_titles=[item["title"] async for item in latest_blog_cursor],
    latest_gallery_titles=[item["title"] async for item in latest_gallery_cursor],
  )
