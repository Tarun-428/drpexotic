export type PaginationResponse<T> = {
  items: T[]
  page: number
  page_size: number
  total: number
  total_pages: number
}

export type MediaType = 'image' | 'video'
export type BlogStatus = 'draft' | 'published'

export type AdminUser = {
  id: string
  email: string
  display_name: string
  created_at: string
  updated_at: string
}

export type AdminLoginResponse = {
  access_token: string
  token_type: 'bearer'
  admin: AdminUser
}

export type DashboardOverview = {
  stats: Array<{ label: string; value: number; accent: string }>
  latest_blog_titles: string[]
  latest_gallery_titles: string[]
}

export type MediaAsset = {
  id: string
  title: string
  description: string
  alt_text: string
  media_type: MediaType
  tags: string[]
  url: string
  secure_url: string
  public_id: string
  width?: number | null
  height?: number | null
  duration?: number | null
  bytes?: number | null
  format?: string | null
  resource_type: string
  created_at: string
  updated_at: string
}

export type GalleryItem = {
  id: string
  title: string
  description: string
  media_type: MediaType
  media_url: string
  thumbnail_url?: string | null
  public_id: string
  sort_order: number
  is_published: boolean
  tags?: string[]
  created_at: string
  updated_at: string
}

export type BlogMediaReference = {
  title: string
  media_type: MediaType
  url: string
  public_id: string
  caption: string
  alt_text: string
  width?: number | null
  height?: number | null
  duration?: number | null
}

export type BlogContentBlock = {
  id: string
  type: 'paragraph' | 'heading' | 'quote' | 'list' | 'image' | 'video'
  text?: string | null
  level?: number | null
  items: string[]
  media?: BlogMediaReference | null
  alignment?: 'left' | 'center' | 'wide' | null
}

export type BlogSeoMeta = {
  meta_title: string
  meta_description: string
  canonical_url?: string | null
}

export type BlogPostListItem = {
  id: string
  title: string
  slug: string
  short_description: string
  featured_image: BlogMediaReference
  tags: string[]
  categories: string[]
  reading_time_minutes: number
  status: BlogStatus
  is_featured: boolean
  author_name: string
  published_at?: string | null
  created_at: string
  updated_at: string
}

export type BlogPost = BlogPostListItem & {
  content_blocks: BlogContentBlock[]
  seo: BlogSeoMeta
  author_id: string
}

export type TaxonomyOption = {
  id: string
  name: string
  slug: string
  created_at: string
  updated_at: string
}

export type WebsiteSettings = {
  whatsapp_number: string
  contact_phone_display: string
  contact_phone_tel: string
  email: string
  farm_location: string
  google_maps_embed_url: string
  footer_content: string
  social_links: {
    instagram: string
    facebook: string
    youtube: string
    linkedin: string
    twitter?: string
    whatsapp?: string
  }
  hero_cta_links: {
    primary_label: string
    primary_url: string
    secondary_label: string
    secondary_url: string
  }
  updated_at?: string | null
}
