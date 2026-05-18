import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Clapperboard, Play, VolumeX } from 'lucide-react'
import { FaInstagram } from 'react-icons/fa6'
import { MobileAutoCarousel } from '@/components/ui/MobileAutoCarousel'
import { useSiteConfigStore } from '@/store/siteConfigStore'

const instagramHandle = 'drpexoticfarms'
const instagramReelsUrl = `https://www.instagram.com/${instagramHandle}/reels/`

export type InstagramReel = {
  id: string
  title: string
  label: string
  permalink: string
  thumbnailUrl: string
  videoUrl?: string
  timestamp?: string
}

type InstagramMediaResponse = {
  data?: Array<{
    id: string
    caption?: string
    media_product_type?: string
    media_type?: string
    media_url?: string
    permalink?: string
    thumbnail_url?: string
    timestamp?: string
  }>
}

type ReelsStatus = 'loading' | 'ready' | 'unavailable'

function captionToTitle(caption?: string) {
  const clean = caption?.replace(/\s+/g, ' ').trim()
  if (!clean) return 'Inside the orchard'
  const firstSentence = clean.split(/[.!?\n]/)[0]?.trim()
  return (firstSentence || clean).slice(0, 74)
}

function formatReelDate(value?: string) {
  if (!value) return 'Latest reel'
  return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short' }).format(new Date(value))
}

function byNewest(first: { timestamp?: string }, second: { timestamp?: string }) {
  return new Date(second.timestamp || 0).getTime() - new Date(first.timestamp || 0).getTime()
}

function isEligibleReel(item: {
  media_product_type?: string
  media_type?: string
  permalink?: string
  thumbnail_url?: string
  media_url?: string
}) {
  const isReelProduct = item.media_product_type === 'REELS'
  const isVideoLike = item.media_type === 'VIDEO' || item.media_type === 'CAROUSEL_ALBUM'
  const hasPreview = Boolean(item.thumbnail_url || item.media_url)
  return (isReelProduct || isVideoLike) && Boolean(item.permalink) && hasPreview
}

async function fetchInstagramReels(signal: AbortSignal): Promise<InstagramReel[]> {
  const endpoint = import.meta.env.VITE_INSTAGRAM_REELS_ENDPOINT as string | undefined
  const token = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN as string | undefined

  if (endpoint) {
    const response = await fetch(endpoint, { signal, cache: 'no-store' })
    if (!response.ok) throw new Error('Instagram reels endpoint failed')
    const payload = (await response.json()) as InstagramMediaResponse | { reels?: InstagramReel[] }

    if ('reels' in payload && Array.isArray(payload.reels)) {
      return [...payload.reels]
        .filter((item) => item.thumbnailUrl && item.permalink)
        .sort(byNewest)
        .slice(0, 4)
    }

    return normalizeInstagramPayload(payload as InstagramMediaResponse)
  }

  if (!token) return []

  const query = new URLSearchParams({
    fields: 'id,caption,media_product_type,media_type,media_url,permalink,thumbnail_url,timestamp',
    limit: '25',
    access_token: token,
  })

  const response = await fetch(`https://graph.instagram.com/me/media?${query.toString()}`, {
    signal,
    cache: 'no-store',
  })
  if (!response.ok) throw new Error('Instagram media request failed')

  const payload = (await response.json()) as InstagramMediaResponse
  return normalizeInstagramPayload(payload)
}

function normalizeInstagramPayload(payload: InstagramMediaResponse): InstagramReel[] {
  return (payload.data ?? [])
    .filter(isEligibleReel)
    .sort(byNewest)
    .slice(0, 2)
    .map((item, index) => ({
      id: item.id,
      title: captionToTitle(item.caption),
      label: index === 0 ? 'Newest story' : formatReelDate(item.timestamp),
      permalink: item.permalink || instagramReelsUrl,
      thumbnailUrl: item.thumbnail_url || item.media_url || '',
      videoUrl: item.media_url,
      timestamp: item.timestamp,
    }))
}

function useInstagramReels() {
  const [reels, setReels] = useState<InstagramReel[]>([])
  const [status, setStatus] = useState<ReelsStatus>('loading')

  useEffect(() => {
    const controller = new AbortController()

    void fetchInstagramReels(controller.signal)
      .then((items) => {
        if (items.length > 0) {
          setReels(items)
          setStatus('ready')
          return
        }

        setStatus('unavailable')
      })
      .catch(() => setStatus('unavailable'))

    return () => controller.abort()
  }, [])

  return { reels, status }
}

function ReelCard({
  reel,
  index,
  instagramUrl,
  cardClassName = '',
}: {
  reel: InstagramReel
  index: number
  instagramUrl: string
  cardClassName?: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !reel.videoUrl) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && window.matchMedia('(hover: hover)').matches) {
          void video.play().catch(() => undefined)
          return
        }

        video.pause()
        video.currentTime = 0
      },
      { threshold: 0.6 },
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [reel.videoUrl])

  const play = () => {
    const video = videoRef.current
    if (video && window.matchMedia('(hover: hover)').matches) {
      void video.play().catch(() => undefined)
    }
  }

  const pause = () => {
    const video = videoRef.current
    if (video) {
      video.pause()
      video.currentTime = 0
    }
  }

  return (
    <motion.a
      href={reel.permalink}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={play}
      onMouseLeave={pause}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative isolate block w-full overflow-hidden rounded-[1.25rem] border border-white/12 bg-[#102c22]/84 text-left shadow-[0_24px_70px_-46px_rgba(5,24,18,0.86)] outline-none transition duration-500 will-change-transform hover:-translate-y-1 hover:border-gold-400/42 hover:shadow-[0_32px_86px_-42px_rgba(7,29,22,0.92)] focus-visible:ring-2 focus-visible:ring-gold-400/75 sm:rounded-[1.38rem] ${cardClassName}`}
      aria-label={`Watch ${reel.title} on Instagram`}
    >
      <div className="relative aspect-[9/16] overflow-hidden bg-[radial-gradient(circle_at_50%_20%,rgba(253,250,244,0.08),transparent_26%),linear-gradient(180deg,rgba(6,21,16,0.96),rgba(5,18,13,0.98))]">
        <img
          src={reel.thumbnailUrl}
          alt={reel.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 will-change-transform group-hover:scale-[1.035]"
          loading="lazy"
          decoding="async"
        />
        {reel.videoUrl ? (
          <video
            ref={videoRef}
            src={reel.videoUrl}
            className="absolute inset-0 hidden h-full w-full object-cover opacity-0 transition duration-500 md:block md:group-hover:opacity-100"
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : null}

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,18,14,0.1)_0%,rgba(4,18,14,0.04)_26%,rgba(4,18,14,0.72)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_16%,rgba(252,245,230,0.12),transparent_22%),radial-gradient(circle_at_50%_84%,rgba(13,43,33,0.16),transparent_28%)] opacity-85 transition duration-500 group-hover:opacity-100" />

        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/14 bg-black/22 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-cream-50/86 backdrop-blur-md">
            <Clapperboard className="size-3.5" />
            Reel
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/14 bg-black/22 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-cream-50/74 backdrop-blur-md">
            <VolumeX className="size-3.5" />
            Preview
          </span>
        </div>

        <span className="absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/28 bg-cream-50/14 text-cream-50 shadow-[0_18px_50px_-26px_rgba(253,250,244,0.7)] backdrop-blur-md transition duration-500 group-hover:scale-110 group-hover:border-gold-400/45 group-hover:bg-gold-400/90 group-hover:text-forest-900">
          <Play className="ml-0.5 size-3.5 fill-current" />
        </span>

        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5">
          <div className="rounded-[1rem] border border-white/10 bg-black/18 p-2.5 backdrop-blur-md sm:p-3">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-gold-400">{reel.label}</span>
              <span className="inline-flex items-center gap-1 text-[0.68rem] font-medium text-cream-50/58">
                <FaInstagram className="size-3.5" />
                DRP
              </span>
            </div>
            <h3 className="mt-2 line-clamp-2 font-display text-[1rem] leading-[1.02] text-cream-50 sm:text-[1.08rem]">
              {reel.title}
            </h3>
            <div className="mt-2.5 inline-flex items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-cream-50/72 transition duration-300 group-hover:text-cream-50">
              Watch on Instagram
              <ArrowUpRight className="size-3.5" />
            </div>
          </div>
        </div>
      </div>

      <span className="sr-only">Open reel from {instagramUrl}</span>
    </motion.a>
  )
}

function ReelSyncState({ status }: { status: ReelsStatus }) {
  const message = status === 'loading' ? 'Syncing latest orchard stories' : 'Instagram feed available once connected'

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-[1.45rem] border border-white/10 bg-[linear-gradient(145deg,rgba(253,250,244,0.14),rgba(9,32,24,0.52))] shadow-[0_22px_60px_-40px_rgba(5,24,18,0.72)]"
        >
          <div className="aspect-[10/12] bg-[radial-gradient(circle_at_50%_16%,rgba(220,195,144,0.2),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0.2))]" />
          <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4">
            <div className="rounded-[1.1rem] border border-white/10 bg-black/16 p-3 backdrop-blur-md">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-gold-400">Reel 0{index + 1}</p>
              <p className="mt-2 font-display text-[1.1rem] leading-[1.04] text-cream-50">{message}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function InstagramReelsPanel() {
  const configuredInstagramUrl = useSiteConfigStore((state) => state.config?.socialLinks?.instagram?.trim() ?? '')
  const instagramUrl = configuredInstagramUrl || instagramReelsUrl
  const { reels, status } = useInstagramReels()

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="cinematic-surface relative overflow-hidden rounded-[1.35rem] p-2.5 text-cream-50 sm:rounded-[1.65rem] sm:p-3"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(200,169,107,0.12),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.06),transparent_18%),linear-gradient(180deg,rgba(253,250,244,0.02),transparent_30%)]" />
      <div className="relative rounded-[1.05rem] border border-white/10 bg-black/14 p-2 backdrop-blur-md sm:rounded-[1.2rem] sm:p-2.5">
        {reels.length > 0 ? (
          <>
            <MobileAutoCarousel
              className="h-[24.25rem] md:hidden"
              slideClassName="mx-auto w-full max-w-[13.625rem]"
              intervalMs={3200}
              slideOffsetPercent={88}
              transitionDuration={0.78}
              inactiveOpacity={0.24}
              inactiveScale={0.94}
              ariaLabel="Auto sliding Instagram reels"
            >
              {reels.map((reel, index) => (
                <div key={reel.id}>
                  <ReelCard
                    reel={reel}
                    index={index}
                    instagramUrl={instagramUrl}
                    cardClassName="max-w-[13.625rem]"
                  />
                </div>
              ))}
            </MobileAutoCarousel>

            <div className="hidden justify-items-center gap-2.5 md:grid md:grid-cols-2 lg:gap-3">
              {reels.map((reel, index) => (
                <ReelCard
                  key={reel.id}
                  reel={reel}
                  index={index}
                  instagramUrl={instagramUrl}
                  cardClassName="max-w-[12rem] lg:max-w-[13.625rem]"
                />
              ))}
            </div>
          </>
        ) : (
          <ReelSyncState status={status} />
        )}
      </div>
    </motion.div>
  )
}

export const InstagramReelsSection = InstagramReelsPanel
