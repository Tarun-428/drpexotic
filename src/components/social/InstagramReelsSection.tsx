import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUpRight, Clapperboard, Play, VolumeX } from 'lucide-react'
import { MobileAutoCarousel } from '@/components/ui/MobileAutoCarousel'

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
  if (!clean) return 'Latest farm reel'
  const firstSentence = clean.split(/[.!?\n]/)[0]?.trim()
  return (firstSentence || clean).slice(0, 58)
}

function formatReelDate(value?: string) {
  if (!value) return 'Fresh reel'
  return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short' }).format(new Date(value))
}

async function fetchInstagramReels(signal: AbortSignal): Promise<InstagramReel[]> {
  const endpoint = import.meta.env.VITE_INSTAGRAM_REELS_ENDPOINT as string | undefined
  const token = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN as string | undefined

  if (endpoint) {
    const response = await fetch(endpoint, { signal })
    if (!response.ok) throw new Error('Instagram reels endpoint failed')
    const payload = (await response.json()) as InstagramMediaResponse | { reels?: InstagramReel[] }
    if ('reels' in payload && Array.isArray(payload.reels)) {
      return payload.reels.filter((item) => item.thumbnailUrl && item.permalink).slice(0, 4)
    }
    return normalizeInstagramPayload(payload as InstagramMediaResponse)
  }

  if (!token) return []

  const query = new URLSearchParams({
    fields: 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp',
    limit: '12',
    access_token: token,
  })

  const response = await fetch(`https://graph.instagram.com/me/media?${query.toString()}`, { signal })
  if (!response.ok) throw new Error('Instagram media request failed')

  const payload = (await response.json()) as InstagramMediaResponse
  return normalizeInstagramPayload(payload)
}

function normalizeInstagramPayload(payload: InstagramMediaResponse): InstagramReel[] {
  return (payload.data ?? [])
    .filter((item) => item.media_type === 'VIDEO' && item.permalink && item.thumbnail_url)
    .slice(0, 4)
    .map((item, index) => ({
      id: item.id,
      title: captionToTitle(item.caption),
      label: index === 0 ? 'Latest reel' : formatReelDate(item.timestamp),
      permalink: item.permalink || instagramReelsUrl,
      thumbnailUrl: item.thumbnail_url || '',
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

function ReelCard({ reel, index }: { reel: InstagramReel; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && window.matchMedia('(max-width: 767px)').matches) {
          void video.play().catch(() => undefined)
        } else {
          video.pause()
        }
      },
      { threshold: 0.62 },
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  const play = () => {
    const video = videoRef.current
    if (video) void video.play().catch(() => undefined)
  }

  const pause = () => {
    const video = videoRef.current
    if (video && !window.matchMedia('(max-width: 767px)').matches) {
      video.pause()
      video.currentTime = 0
    }
  }

  return (
    <a
      href={reel.permalink}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={play}
      onMouseLeave={pause}
      className="group relative isolate block aspect-[9/16] overflow-hidden rounded-[1.2rem] border border-white/12 bg-black/28 text-left shadow-[0_18px_50px_rgb(0_0_0/0.2)] outline-none transition duration-500 hover:-translate-y-1 hover:border-gold-400/45 hover:shadow-[0_22px_70px_rgb(200_169_107/0.22)] focus-visible:ring-2 focus-visible:ring-gold-400/80"
      aria-label={`Watch ${reel.title} on Instagram`}
    >
      <img
        src={reel.thumbnailUrl}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
        loading={index === 0 ? 'eager' : 'lazy'}
        decoding="async"
      />
      {reel.videoUrl ? (
        <video
          ref={videoRef}
          src={reel.videoUrl}
          className="absolute inset-0 h-full w-full object-cover opacity-100 transition duration-500 md:opacity-0 md:group-hover:opacity-100"
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-b from-black/18 via-black/8 to-black/74" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(253,250,244,0.14),transparent_24%)] opacity-0 transition duration-500 group-hover:opacity-100" />
      <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/16 bg-black/30 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-cream-50/82 backdrop-blur-md">
        <VolumeX className="size-3.5" />
        Muted
      </span>
      <span className="absolute left-3 top-3 rounded-full border border-white/18 bg-black/24 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-cream-50/88 backdrop-blur-md">
        Reel 0{index + 1}
      </span>
      <span className="absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/35 bg-cream-50/18 text-cream-50 shadow-glow backdrop-blur-md transition duration-500 group-hover:scale-110 group-hover:bg-gold-400 group-hover:text-forest-900">
        <Play className="ml-0.5 size-4 fill-current" />
      </span>
      <span className="absolute inset-x-3 bottom-3">
        <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">{reel.label}</span>
        <span className="mt-1 line-clamp-2 block text-sm font-semibold leading-tight text-cream-50">{reel.title}</span>
      </span>
    </a>
  )
}

function ReelSyncState({ status }: { status: ReelsStatus }) {
  const message = status === 'loading' ? 'Syncing latest reels' : 'Instagram feed needs connection'

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="relative aspect-[9/16] overflow-hidden rounded-[1.2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(253,250,244,0.12),rgba(9,32,24,0.42))]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(200,169,107,0.18),transparent_28%),linear-gradient(180deg,transparent,rgba(0,0,0,0.42))]" />
          <div className="absolute inset-x-4 bottom-4">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-gold-400">Reel 0{index + 1}</p>
            <p className="mt-2 font-display text-xl leading-none text-cream-50">{message}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function InstagramReelsPanel() {
  const { reels, status } = useInstagramReels()
  const visibleReels = useMemo(() => reels.slice(0, 4), [reels])

  return (
    <div id="reels" className="hero-reveal cinematic-surface relative ml-auto w-full max-w-[26rem] scroll-mt-24 rounded-[1.75rem] p-3.5 text-cream-50 sm:rounded-[2rem] sm:p-4">
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_20%_10%,rgba(200,169,107,0.16),transparent_34%),linear-gradient(180deg,rgba(5,18,13,0.14),transparent)]" />
      <div className="relative mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-cream-50/58">
            Instagram reels
          </p>
          <p className="mt-1 font-display text-2xl leading-none text-cream-50">Farm stories in motion</p>
        </div>
        <a
          href={instagramReelsUrl}
          target="_blank"
          rel="noreferrer"
          className="grid size-11 shrink-0 place-items-center rounded-full border border-white/18 bg-black/18 text-gold-400 transition duration-300 hover:border-gold-400/50 hover:bg-gold-400 hover:text-forest-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/80"
          aria-label="Open DRP Exotic Farms Instagram reels"
        >
          <Clapperboard className="size-5" />
        </a>
      </div>

      {visibleReels.length > 0 ? (
        <MobileAutoCarousel
          className="h-[22rem] md:hidden"
          intervalMs={2800}
          slideOffsetPercent={84}
          inactiveOpacity={0.42}
          inactiveScale={0.9}
          pauseOnTouch={false}
          ariaLabel="Auto sliding Instagram reels"
        >
          {visibleReels.map((reel, index) => (
            <div key={reel.id}>
              <ReelCard reel={reel} index={index} />
            </div>
          ))}
        </MobileAutoCarousel>
      ) : null}

      {visibleReels.length > 0 ? (
        <div className="relative hidden gap-3 md:grid md:grid-cols-2">
          {visibleReels.map((reel, index) => (
            <ReelCard key={reel.id} reel={reel} index={index} />
          ))}
        </div>
      ) : (
        <ReelSyncState status={status} />
      )}

      <div className="relative mt-4 flex items-center justify-between gap-4 rounded-[1.35rem] bg-black/18 px-4 py-3">
        <p className="text-sm leading-relaxed text-cream-50/72">
          {status === 'ready' ? 'Latest from the farm.' : 'Connect Instagram to show live reel covers.'}
        </p>
        <a
          href={instagramReelsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-gold-400 transition hover:text-cream-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70"
        >
          View all
          <ArrowUpRight className="size-4" />
        </a>
      </div>
    </div>
  )
}
