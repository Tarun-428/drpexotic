import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Filter, ShoppingBag, Sparkles, Star } from 'lucide-react'
import { PageMeta } from '@/components/seo/PageMeta'
import { Button } from '@/components/ui/button'
import { LOCAL_ASSETS } from '@/constants/assets'

const categories = ['All', 'Fresh fruit', 'Gifting', 'Pantry'] as const

const products = [
  {
    name: 'Signature Orchard Box',
    category: 'Fresh fruit',
    price: 'By enquiry',
    image: LOCAL_ASSETS.dragonFruitHalves,
    description: 'A curated seasonal assortment designed for premium gifting, chef sourcing, and hospitality introductions.',
  },
  {
    name: 'Chef Selection Crate',
    category: 'Fresh fruit',
    price: 'By enquiry',
    image: LOCAL_ASSETS.avocado,
    description: 'Colour, texture, and ripeness chosen for plating and elevated culinary programmes.',
  },
  {
    name: 'Preserve Collection',
    category: 'Pantry',
    price: 'Coming soon',
    image: LOCAL_ASSETS.guava,
    description: 'Future pantry editions for brand-led extensions into refined packaged goods.',
  },
  {
    name: 'Estate Gift Hamper',
    category: 'Gifting',
    price: 'Coming soon',
    image: LOCAL_ASSETS.dragonFruitCut,
    description: 'A premium hamper concept built around orchard storytelling, provenance, and tactile presentation.',
  },
] as const

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('All')
  const [cartCount, setCartCount] = useState(0)

  const filteredProducts = useMemo(
    () => products.filter((product) => activeCategory === 'All' || product.category === activeCategory),
    [activeCategory],
  )

  return (
    <>
      <PageMeta
        title="Shop"
        description="Explore the DRP Exotic Farms marketplace concept through premium produce boxes, gifting experiences, and future packaged goods."
        path="/shop"
      />

      <div className="relative overflow-hidden">
        <section className="relative isolate overflow-hidden bg-[#103126] text-cream-50">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(8,24,18,0.25), rgba(8,24,18,0.82)), url(${LOCAL_ASSETS.dragonFruitWhole})`,
            }}
          />
          <div className="section-shell relative z-10 py-18 sm:py-24 lg:py-28">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.94fr)] lg:items-end">
              <div className="max-w-4xl">
                <span className="section-label border-white/14 bg-white/8 text-cream-50/82">
                  <ShoppingBag className="size-4 text-gold-400" />
                  Marketplace
                </span>
                <h1 className="editorial-title mt-6 max-w-5xl text-cream-50">
                  A luxury organic marketplace in cultivation, not a generic ecommerce shelf.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream-50/74 sm:text-lg lg:mt-6 lg:text-xl">
                  The DRP shop is being designed as a premium extension of the orchard story: curated boxes, gifting
                  formats, chef-ready selections, and future pantry products shaped with the same care as the farm.
                </p>
              </div>

              <div className="cinematic-surface rounded-[2rem] p-5 text-cream-50">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-gold-400">Cart preview</p>
                <div className="mt-4 flex items-end justify-between rounded-[1.5rem] bg-black/18 p-5">
                  <div>
                    <p className="text-5xl text-gold-400">
                      <span className="font-numeric tabular-nums">{cartCount}</span>
                    </p>
                    <p className="mt-2 text-sm text-cream-50/72">curated selections saved to your interest list</p>
                  </div>
                  <ShoppingBag className="size-10 text-cream-50/72" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell py-14 sm:py-18 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] lg:items-end">
            <div>
              <span className="section-label">
                <Filter className="size-4 text-gold-600" />
                Curated filtering
              </span>
              <h2 className="section-title mt-6 text-forest-900">Filter the future collection by occasion, not just inventory type.</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category, index) => (
                <button
                  key={`${category}-${index}`}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                    activeCategory === category
                      ? 'bg-forest-900 text-cream-50 shadow-[0_18px_42px_-26px_rgba(11,61,46,0.8)]'
                      : 'cinematic-surface text-forest-900'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="responsive-card-row mt-8 gap-4 lg:mt-12 lg:grid-cols-2 lg:gap-5">
            {filteredProducts.map((product, index) => (
              <motion.article
                key={product.name}
                initial={{ opacity: 0, y: 28, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.8, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                className="cinematic-surface overflow-hidden rounded-[1.8rem] sm:rounded-[2rem]"
              >
                <div className="overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-56 w-full object-cover transition duration-700 hover:scale-[1.04] sm:h-64 lg:h-72"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="grid gap-4 p-5 sm:gap-5 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-forest-900/48">
                        {product.category}
                      </p>
                      <h3 className="mt-3 font-display text-4xl leading-none text-forest-900">{product.name}</h3>
                    </div>
                    <span className="w-fit shrink-0 rounded-full bg-forest-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-gold-400">
                      {product.price}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-forest-900/68">{product.description}</p>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="inline-flex items-center gap-2 text-sm text-forest-900/58">
                      <Star className="size-4 text-gold-600" />
                      Presented as a premium concept, not a mass-market SKU.
                    </div>
                    <Button type="button" onClick={() => setCartCount((count) => count + 1)}>
                      Save to interest list
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section-shell pb-18 pt-8 sm:pb-24 sm:pt-10 lg:pb-28">
          <div className="cinematic-surface rounded-[2.4rem] p-8 sm:p-10">
            <span className="section-label">
              <Sparkles className="size-4 text-gold-600" />
              Product philosophy
            </span>
            <h2 className="mt-5 font-display text-[clamp(2rem,3.6vw,4rem)] leading-[0.96] text-forest-900">
              The shop experience will be built around freshness, provenance, and luxury gifting behaviour.
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-forest-900/72">
              For now, this page acts as a premium preview environment while checkout and operational fulfilment are
              still being cultivated with the same level of care as the rest of the brand.
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
