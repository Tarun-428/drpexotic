import { Link } from 'react-router-dom'
import { ArrowUpRight, Compass } from 'lucide-react'
import { LOCAL_ASSETS } from '@/constants/assets'

type ExploreItem = {
  title: string
  line: string
  to: string
  image: string
}

const exploreItems: ExploreItem[] = [
  {
    title: 'About',
    line: 'Rooted in growers',
    to: '/about',
    image: LOCAL_ASSETS.orchardTeam,
  },
  {
    title: 'Services',
    line: 'Orchard systems',
    to: '/services',
    image: LOCAL_ASSETS.orchardNight,
  },
  {
    title: 'Produce',
    line: 'Freshly cultivated',
    to: '/produce',
    image: LOCAL_ASSETS.dragonFruitHalves,
  },
  {
    title: 'Gallery',
    line: 'Moments from the orchard',
    to: '/gallery',
    image: LOCAL_ASSETS.dragonFruitRows,
  },
  {
    title: 'Journal',
    line: 'Stories from the field',
    to: '/journal',
    image: LOCAL_ASSETS.orchardNight,
  },
  {
    title: 'Contact',
    line: 'Begin the conversation',
    to: '/contact',
    image: LOCAL_ASSETS.guava,
  },
]

export function ExploreGateway() {
  const loop = [...exploreItems, ...exploreItems]

  return (
    <section className="section-shell relative z-10 py-10 sm:py-12 lg:py-14" aria-labelledby="explore-gateway-title">
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a241b] py-5 text-cream-50 shadow-[0_28px_90px_-62px_rgba(0,0,0,0.82)] sm:rounded-[2.4rem] sm:py-6">
        <div className="mb-5 flex flex-col gap-3 px-5 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
          <div>
            <span className="section-label border-white/14 bg-white/8 text-cream-50/82">
              <Compass className="size-4 text-gold-400" />
              Explore
            </span>
            <h2 id="explore-gateway-title" className="mt-4 font-display text-[clamp(2rem,3.4vw,3.8rem)] leading-[0.96]">
              Enter the orchard ecosystem.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-cream-50/62">A cinematic path through the full estate.</p>
        </div>

        <div className="explore-gateway" role="list">
          <div className="explore-gateway__track">
            {loop.map((item, index) => (
              <Link
                key={`${item.to}-${index}`}
                to={item.to}
                role="listitem"
                className="explore-gateway__card group"
                aria-label={`Open ${item.title}`}
              >
                <img
                  src={item.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/76 via-black/20 to-black/8" />
                <div className="pointer-events-none absolute inset-0 opacity-0 ring-1 ring-inset ring-gold-400/35 transition duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-4 bottom-4">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-gold-400">{item.line}</p>
                  <div className="mt-2 flex items-end justify-between gap-3">
                    <h3 className="font-display text-[1.85rem] leading-none text-cream-50">{item.title}</h3>
                    <span className="grid size-9 shrink-0 place-items-center rounded-full border border-white/18 bg-white/8 text-cream-50 backdrop-blur transition group-hover:bg-gold-400 group-hover:text-forest-900">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
