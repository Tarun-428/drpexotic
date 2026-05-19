import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { RequireAuth } from '@/routes/RequireAuth'
import { AdminLayout } from '@/layouts/AdminLayout'
import { SplashScreenHost } from '@/components/splash/SplashScreenHost'
import {
  AdminBlogsPage,
  AdminDashboardPage,
  AdminGalleryPage,
  AdminLoginPage,
  AdminSettingsPage,
  AboutPage,
  BlogPage,
  BlogPostPage,
  chunkReloadStorageKey,
  ContactPage,
  GalleryPage,
  HomePage,
  NotFoundPage,
  PrivacyPage,
  ProducePage,
  ServicesPage,
  TermsPage,
  warmPublicRoutes,
} from '@/routes/routePreloaders'

export default function App() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    window.sessionStorage.removeItem(chunkReloadStorageKey)

    const scheduleWarmup = () => warmPublicRoutes()
    const requestIdleCallback =
      'requestIdleCallback' in window ? window.requestIdleCallback.bind(window) : null
    if (requestIdleCallback) {
      const idleId = requestIdleCallback(scheduleWarmup, { timeout: 1200 })
      return () => window.cancelIdleCallback(idleId)
    }

    const timeoutId = globalThis.setTimeout(scheduleWarmup, 600)
    return () => globalThis.clearTimeout(timeoutId)
  }, [])

  return (
    <SplashScreenHost>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="produce" element={<ProducePage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="journal" element={<BlogPage />} />
          <Route path="journal/:slug" element={<BlogPostPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="/admin/login" element={<AdminLoginPage />} />

        <Route element={<RequireAuth />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="gallery" element={<AdminGalleryPage />} />
            <Route path="blogs" element={<AdminBlogsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>
        </Route>
      </Routes>
    </SplashScreenHost>
  )
}
