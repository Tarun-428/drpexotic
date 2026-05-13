import { PageMeta } from '@/components/seo/PageMeta'
import { HomeHero } from '@/components/home/HomeHero'
import { HomeMetrics } from '@/components/home/HomeMetrics'
import { HomeProducePeek } from '@/components/home/HomeProducePeek'
import { HomeServicesPeek } from '@/components/home/HomeServicesPeek'
import { HomeTestimonials } from '@/components/home/HomeTestimonials'

export default function HomePage() {
  return (
    <>
      <PageMeta
        title="Exotic fruits & orchard programmes"
        description="Drpexoticfarms™ — 50 acres of premium produce, residue-aware practices, turnkey orchard solutions, and a grower network across 105+ acres."
        path="/"
      />
      <HomeHero />
      <HomeMetrics />
      <HomeProducePeek />
      <HomeServicesPeek />
      <HomeTestimonials />
    </>
  )
}
