import { LOCAL_ASSETS, LOCAL_GALLERY_IMAGES } from '@/constants/assets'
import type { BlogPost, BlogPostListItem, GalleryItem } from '@/types/cms'

export const FALLBACK_GALLERY_ITEMS: GalleryItem[] = LOCAL_GALLERY_IMAGES.map((item, index) => ({
  id: item.id,
  title: item.alt,
  description: 'A cinematic orchard study from DRP Exotic Farms.',
  media_type: 'image',
  media_url: item.url,
  thumbnail_url: item.url,
  public_id: item.id,
  sort_order: index,
  is_published: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}))

export const FALLBACK_BLOG_POSTS: BlogPostListItem[] = [
  {
    id: 'editorial-harvest-rhythm',
    title: 'Harvest rhythm as a luxury signal',
    slug: 'harvest-rhythm-as-a-luxury-signal',
    short_description: 'How orchard timing, visual calm, and handling discipline shape premium fruit perception before a buyer tastes anything.',
    featured_image: {
      title: 'Harvest rhythm',
      media_type: 'image',
      url: LOCAL_ASSETS.dragonFruitRows,
      public_id: 'fallback-harvest-rhythm',
      caption: 'Structured orchard lanes before harvest movement begins.',
      alt_text: 'Structured dragon fruit orchard lanes',
    },
    tags: ['Harvest', 'Premium quality'],
    categories: ['Editorial'],
    reading_time_minutes: 4,
    status: 'published',
    is_featured: true,
    author_name: 'DRP Editorial',
    published_at: '2026-05-01T08:00:00.000Z',
    created_at: '2026-05-01T08:00:00.000Z',
    updated_at: '2026-05-01T08:00:00.000Z',
  },
  {
    id: 'residue-aware-systems',
    title: 'Residue-aware systems that still feel cinematic',
    slug: 'residue-aware-systems-that-still-feel-cinematic',
    short_description: 'A look at how cleaner programmes, observation, and field restraint can support both trust and visual storytelling.',
    featured_image: {
      title: 'Residue-aware systems',
      media_type: 'image',
      url: LOCAL_ASSETS.dragonFruitCut,
      public_id: 'fallback-residue-aware',
      caption: 'Cleaner orchard thinking translated into premium produce.',
      alt_text: 'Cut dragon fruit showing vivid color',
    },
    tags: ['Agritech', 'Field systems'],
    categories: ['Farm journal'],
    reading_time_minutes: 5,
    status: 'published',
    is_featured: false,
    author_name: 'DRP Editorial',
    published_at: '2026-04-23T08:00:00.000Z',
    created_at: '2026-04-23T08:00:00.000Z',
    updated_at: '2026-04-23T08:00:00.000Z',
  },
  {
    id: 'orchard-storytelling',
    title: 'Why orchard storytelling matters in premium produce',
    slug: 'why-orchard-storytelling-matters-in-premium-produce',
    short_description: 'Modern buyers increasingly respond to clarity, provenance, and atmosphere as much as to specs and grades.',
    featured_image: {
      title: 'Orchard storytelling',
      media_type: 'image',
      url: LOCAL_ASSETS.orchardNight,
      public_id: 'fallback-storytelling',
      caption: 'An orchard viewed as a living editorial landscape.',
      alt_text: 'Night-lit orchard with premium atmosphere',
    },
    tags: ['Brand', 'Editorial'],
    categories: ['Insights'],
    reading_time_minutes: 6,
    status: 'published',
    is_featured: true,
    author_name: 'DRP Editorial',
    published_at: '2026-04-10T08:00:00.000Z',
    created_at: '2026-04-10T08:00:00.000Z',
    updated_at: '2026-04-10T08:00:00.000Z',
  },
] as const

export const FALLBACK_BLOG_DETAILS: BlogPost[] = FALLBACK_BLOG_POSTS.map((post, index) => ({
  ...post,
  author_id: 'fallback-editorial',
  seo: {
    meta_title: post.title,
    meta_description: post.short_description,
    canonical_url: null,
  },
  content_blocks: [
    {
      id: `${post.id}-intro`,
      type: 'paragraph',
      text:
        'DRP Exotic Farms approaches orchard storytelling as a premium operational language: atmosphere, field discipline, and visual calm should all reinforce one another.',
      items: [],
      alignment: 'center',
    },
    {
      id: `${post.id}-heading`,
      type: 'heading',
      text: index === 0 ? 'Why timing changes perception' : 'How atmosphere supports trust',
      level: 2,
      items: [],
      alignment: 'center',
    },
    {
      id: `${post.id}-quote`,
      type: 'quote',
      text:
        'The orchard does not just produce fruit. It produces confidence, continuity, and a clearer market story.',
      items: [],
      alignment: 'center',
    },
    {
      id: `${post.id}-image`,
      type: 'image',
      text: '',
      items: [],
      alignment: 'wide',
      media: {
        ...post.featured_image,
        caption: post.featured_image.caption || 'Cinematic proof from the field.',
      },
    },
    {
      id: `${post.id}-body`,
      type: 'paragraph',
      text:
        'That means building every narrative around actual orchard logic: harvest pacing, cleaner protocols, labour flow, canopy clarity, and a visual rhythm that premium buyers can feel immediately.',
      items: [],
      alignment: 'center',
    },
    {
      id: `${post.id}-list`,
      type: 'list',
      text: '',
      items: [
        'Field observation before irreversible decisions.',
        'Residue-aware systems framed as trust infrastructure.',
        'Visual storytelling grounded in real operational detail.',
      ],
      alignment: 'center',
    },
  ],
}))
