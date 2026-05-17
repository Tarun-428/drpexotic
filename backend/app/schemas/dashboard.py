from pydantic import BaseModel


class DashboardStat(BaseModel):
  label: str
  value: int
  accent: str


class DashboardOverview(BaseModel):
  stats: list[DashboardStat]
  latest_blog_titles: list[str]
  latest_gallery_titles: list[str]
