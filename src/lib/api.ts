import type {
  AdminLoginResponse,
  AdminUser,
  BlogPost,
  BlogPostListItem,
  DashboardOverview,
  GalleryItem,
  MediaAsset,
  PaginationResponse,
  TaxonomyOption,
  WebsiteSettings,
} from '@/types/cms'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api/v1').replace(/\/$/, '')

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: BodyInit | null
  json?: unknown
  token?: string | null
  headers?: Record<string, string>
}

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers(options.headers)
  if (options.json !== undefined) {
    headers.set('Content-Type', 'application/json')
  }
  if (options.token) {
    headers.set('Authorization', `Bearer ${options.token}`)
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? (options.json !== undefined ? 'POST' : 'GET'),
    headers,
    body: options.json !== undefined ? JSON.stringify(options.json) : options.body ?? null,
  })

  if (!response.ok) {
    const text = await response.text()
    throw new ApiError(text || 'Request failed.', response.status)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}

export const api = {
  adminLogin(email: string, password: string) {
    return request<AdminLoginResponse>('/admin/auth/login', { json: { email, password } })
  },
  adminMe(token: string) {
    return request<AdminUser>('/admin/auth/me', { token })
  },
  getDashboardOverview(token: string) {
    return request<DashboardOverview>('/admin/dashboard/overview', { token })
  },
  listAdminGallery(token: string) {
    return request<PaginationResponse<GalleryItem>>('/admin/gallery?page=1&page_size=60', { token })
  },
  createGalleryItem(token: string, payload: Partial<GalleryItem>) {
    return request<GalleryItem>('/admin/gallery', { token, json: payload })
  },
  updateGalleryItem(token: string, itemId: string, payload: Partial<GalleryItem>) {
    return request<GalleryItem>(`/admin/gallery/${itemId}`, { method: 'PUT', token, json: payload })
  },
  reorderGallery(token: string, ids: string[]) {
    return request<GalleryItem[]>('/admin/gallery/reorder', { token, json: { ids } })
  },
  deleteGalleryItem(token: string, itemId: string) {
    return request<void>(`/admin/gallery/${itemId}`, { method: 'DELETE', token })
  },
  listPublicGallery(page = 1, pageSize = 24) {
    return request<PaginationResponse<GalleryItem>>(`/public/gallery?page=${page}&page_size=${pageSize}`)
  },
  listAdminBlogs(token: string, params?: { status?: string; search?: string }) {
    const query = new URLSearchParams({ page: '1', page_size: '50' })
    if (params?.status) query.set('status', params.status)
    if (params?.search) query.set('search', params.search)
    return request<PaginationResponse<BlogPostListItem>>(`/admin/blogs?${query.toString()}`, { token })
  },
  getAdminBlog(token: string, postId: string) {
    return request<BlogPost>(`/admin/blogs/${postId}`, { token })
  },
  createBlog(token: string, payload: unknown) {
    return request<BlogPost>('/admin/blogs', { token, json: payload })
  },
  updateBlog(token: string, postId: string, payload: unknown) {
    return request<BlogPost>(`/admin/blogs/${postId}`, { method: 'PUT', token, json: payload })
  },
  deleteBlog(token: string, postId: string) {
    return request<void>(`/admin/blogs/${postId}`, { method: 'DELETE', token })
  },
  listPublicBlogs(params?: { page?: number; pageSize?: number; category?: string; tag?: string; search?: string }) {
    const query = new URLSearchParams({
      page: String(params?.page ?? 1),
      page_size: String(params?.pageSize ?? 9),
    })
    if (params?.category) query.set('category', params.category)
    if (params?.tag) query.set('tag', params.tag)
    if (params?.search) query.set('search', params.search)
    return request<PaginationResponse<BlogPostListItem>>(`/public/blogs?${query.toString()}`)
  },
  getPublicBlog(slug: string) {
    return request<BlogPost>(`/public/blogs/${slug}`)
  },
  getRelatedBlogs(slug: string) {
    return request<BlogPostListItem[]>(`/public/blogs/${slug}/related`)
  },
  getHomeNews() {
    return request<BlogPostListItem[]>('/public/home/news')
  },
  getPublicSettings() {
    return request<WebsiteSettings>('/public/settings')
  },
  getAdminSettings(token: string) {
    return request<WebsiteSettings>('/admin/settings', { token })
  },
  updateAdminSettings(token: string, payload: Partial<WebsiteSettings>) {
    return request<WebsiteSettings>('/admin/settings', { method: 'PUT', token, json: payload })
  },
  listMedia(token: string, params?: { mediaType?: 'image' | 'video' }) {
    const query = new URLSearchParams({ page: '1', page_size: '60' })
    if (params?.mediaType) query.set('media_type', params.mediaType)
    return request<PaginationResponse<MediaAsset>>(`/admin/media?${query.toString()}`, { token })
  },
  uploadMedia(
    token: string,
    payload: {
      file: File
      title: string
      altText: string
      description: string
      mediaType: 'image' | 'video'
      folder?: string
      tags?: string[]
    },
  ) {
    const formData = new FormData()
    formData.append('file', payload.file)
    formData.append('title', payload.title)
    formData.append('alt_text', payload.altText)
    formData.append('description', payload.description)
    formData.append('media_type', payload.mediaType)
    formData.append('folder', payload.folder ?? 'drp/media')
    formData.append('tags', (payload.tags ?? []).join(','))
    return request<MediaAsset>('/admin/media', {
      method: 'POST',
      token,
      body: formData,
    })
  },
  deleteMedia(token: string, assetId: string) {
    return request<{ deleted: boolean; public_id: string }>(`/admin/media/${assetId}`, { method: 'DELETE', token })
  },
  listCategories(token: string) {
    return request<TaxonomyOption[]>('/admin/taxonomy/categories', { token })
  },
  createCategory(token: string, payload: { name: string; slug: string }) {
    return request<TaxonomyOption>('/admin/taxonomy/categories', { token, json: payload })
  },
  listTags(token: string) {
    return request<TaxonomyOption[]>('/admin/taxonomy/tags', { token })
  },
  createTag(token: string, payload: { name: string; slug: string }) {
    return request<TaxonomyOption>('/admin/taxonomy/tags', { token, json: payload })
  },
}
