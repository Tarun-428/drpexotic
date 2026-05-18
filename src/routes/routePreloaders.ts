import { lazy, type ComponentType } from 'react'
import { LOCAL_ASSETS } from '@/constants/assets'

type PreloadableComponent = ComponentType & {
  preload: () => Promise<unknown>
}

export const chunkReloadStorageKey = 'drp-route-chunk-reload'

function shouldForceChunkReload(error: unknown) {
  if (!(error instanceof Error)) return false
  const message = error.message.toLowerCase()
  return (
    message.includes('failed to fetch dynamically imported module') ||
    message.includes('importing a module script failed') ||
    message.includes('loading chunk') ||
    message.includes('chunkloaderror')
  )
}

function lazyRoute<T extends ComponentType>(importer: () => Promise<{ default: T }>) {
  let importPromise: Promise<{ default: T }> | null = null

  const load = async () => {
    if (!importPromise) {
      importPromise = importer().catch((error: unknown) => {
        importPromise = null

        if (typeof window !== 'undefined' && shouldForceChunkReload(error)) {
          const alreadyReloaded = window.sessionStorage.getItem(chunkReloadStorageKey) === 'true'
          if (!alreadyReloaded) {
            window.sessionStorage.setItem(chunkReloadStorageKey, 'true')
            window.location.reload()
          }
        }

        throw error
      })
    }

    return importPromise
  }

  const Component = lazy(load) as unknown as PreloadableComponent
  Component.preload = () => load()
  return Component
}

export const HomePage = lazyRoute(() => import('@/pages/HomePage'))
export const AboutPage = lazyRoute(() => import('@/pages/AboutPage'))
export const ServicesPage = lazyRoute(() => import('@/pages/ServicesPage'))
export const ProducePage = lazyRoute(() => import('@/pages/ProducePage'))
export const GalleryPage = lazyRoute(() => import('@/pages/GalleryPage'))
export const ContactPage = lazyRoute(() => import('@/pages/ContactPage'))
export const PrivacyPage = lazyRoute(() => import('@/pages/PrivacyPage'))
export const TermsPage = lazyRoute(() => import('@/pages/TermsPage'))
export const BlogPage = lazyRoute(() => import('@/pages/BlogPage'))
export const BlogPostPage = lazyRoute(() => import('@/pages/BlogPostPage'))
export const NotFoundPage = lazyRoute(() => import('@/pages/NotFoundPage'))

export const AdminLoginPage = lazyRoute(() => import('@/pages/admin/AdminLoginPage'))
export const AdminDashboardPage = lazyRoute(() => import('@/pages/admin/AdminDashboardPage'))
export const AdminGalleryPage = lazyRoute(() => import('@/pages/admin/AdminGalleryPage'))
export const AdminBlogsPage = lazyRoute(() => import('@/pages/admin/AdminBlogsPage'))
export const AdminMediaPage = lazyRoute(() => import('@/pages/admin/AdminMediaPage'))
export const AdminSettingsPage = lazyRoute(() => import('@/pages/admin/AdminSettingsPage'))

export const routePreloaders: Record<string, () => Promise<unknown>> = {
  '/': HomePage.preload,
  '/about': AboutPage.preload,
  '/services': ServicesPage.preload,
  '/produce': ProducePage.preload,
  '/gallery': GalleryPage.preload,
  '/contact': ContactPage.preload,
  '/journal': BlogPage.preload,
  '/privacy': PrivacyPage.preload,
  '/terms': TermsPage.preload,
  '/admin/login': AdminLoginPage.preload,
  '/admin': AdminDashboardPage.preload,
  '/admin/gallery': AdminGalleryPage.preload,
  '/admin/blogs': AdminBlogsPage.preload,
  '/admin/media': AdminMediaPage.preload,
  '/admin/settings': AdminSettingsPage.preload,
}

let warmRoutesPromise: Promise<void> | null = null
let criticalAssetsPromise: Promise<void> | null = null

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new Image()
    image.onload = () => resolve()
    image.onerror = () => resolve()
    image.src = src
  })
}

export function warmPublicRoutes() {
  if (!warmRoutesPromise) {
    warmRoutesPromise = Promise.all([
      AboutPage.preload(),
      ServicesPage.preload(),
      ProducePage.preload(),
      GalleryPage.preload(),
      ContactPage.preload(),
      BlogPage.preload(),
    ])
      .then(() => undefined)
      .catch(() => undefined)
  }

  return warmRoutesPromise
}

export function preloadCriticalAssets() {
  if (!criticalAssetsPromise) {
    criticalAssetsPromise = Promise.all([
      preloadImage(LOCAL_ASSETS.orchardNight),
      preloadImage(LOCAL_ASSETS.orchardTeam),
      preloadImage(LOCAL_ASSETS.dragonFruitCut),
      preloadImage(LOCAL_ASSETS.dragonFruitRows),
      preloadImage(LOCAL_ASSETS.guava),
      preloadImage(LOCAL_ASSETS.avocado),
    ])
      .then(() => undefined)
      .catch(() => undefined)
  }

  return criticalAssetsPromise
}
