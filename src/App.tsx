import { Suspense, lazy, type ReactNode } from 'react'
import { Route, Routes } from 'react-router-dom'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { RequireAuth } from '@/routes/RequireAuth'
import { AdminLayout } from '@/layouts/AdminLayout'
import { SplashScreenHost } from '@/components/splash/SplashScreenHost'

const HomePage = lazy(() => import('@/pages/HomePage'))
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const ServicesPage = lazy(() => import('@/pages/ServicesPage'))
const ProducePage = lazy(() => import('@/pages/ProducePage'))
const GalleryPage = lazy(() => import('@/pages/GalleryPage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'))
const TermsPage = lazy(() => import('@/pages/TermsPage'))
const BlogPage = lazy(() => import('@/pages/BlogPage'))
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

const AdminLoginPage = lazy(() => import('@/pages/admin/AdminLoginPage'))
const AdminDashboardPage = lazy(() => import('@/pages/admin/AdminDashboardPage'))
const AdminGalleryPage = lazy(() => import('@/pages/admin/AdminGalleryPage'))
const AdminBlogsPage = lazy(() => import('@/pages/admin/AdminBlogsPage'))
const AdminMediaPage = lazy(() => import('@/pages/admin/AdminMediaPage'))
const AdminSettingsPage = lazy(() => import('@/pages/admin/AdminSettingsPage'))

function SuspenseShell({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center bg-cream-200 px-4">
          <div className="h-12 w-12 animate-spin rounded-full border-2 border-gold-500 border-t-transparent" />
        </div>
      }
    >
      {children}
    </Suspense>
  )
}

export default function App() {
  return (
    <SplashScreenHost>
      <SuspenseShell>
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
              <Route path="media" element={<AdminMediaPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>
          </Route>
        </Routes>
      </SuspenseShell>
    </SplashScreenHost>
  )
}
