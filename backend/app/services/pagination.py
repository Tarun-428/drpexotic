import math

from app.schemas.common import PaginatedResponse


def build_paginated_response(*, items: list, page: int, page_size: int, total: int) -> PaginatedResponse:
  return PaginatedResponse(
    items=items,
    page=page,
    page_size=page_size,
    total=total,
    total_pages=max(1, math.ceil(total / page_size)) if page_size else 1,
  )
