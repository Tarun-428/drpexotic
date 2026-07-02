import { LOCAL_ASSETS, CLIENT_ASSETS } from '@/constants/assets'

export type FruitVariety = {
  slug: string
  name: string
  tagline: string
  description: string
  notes: string[]
  image: string
}

export const FRUIT_VARIETIES: FruitVariety[] = [
  // {
  //   slug: 'blueberry',
  //   name: 'Blueberry',
  //   tagline: 'Acidic soils, disciplined nutrition, clean picking windows.',
  //   description:
  //     'High-value berries with tight quality gates—suited to controlled nutrition programs and residue-aware protocols.',
  //   notes: ['Premium retail & ingredient channels', 'Cold-chain sensitive—planned logistics'],
  //   image: CLIENT_ASSETS.blueberry,
  // },
  {
    slug: 'hass-avocado',
    name: 'Hass Avocado',
    tagline: 'Water-smart establishment, long-horizon canopy design.',
    description:
      'Orchard layouts that respect slope, drainage, and varietal behaviour—aimed at steady bearing, not short-lived spikes.',
    notes: ['Establishment plans tuned to local climate', 'Irrigation scheduling guidance'],
    image: LOCAL_ASSETS.avocado,
  },
  {
    slug: 'dragon-fruit',
    name: 'Dragon fruit',
    tagline: 'Trellised systems with clear labour paths and harvest rhythm.',
    description:
      'Structural support and row architecture that keeps crews efficient and fruit damage low across flushes.',
    notes: ['Post & trellis patterns', 'Night-bloom pollination considerations'],
    image: LOCAL_ASSETS.dragonFruitWhole,
  },
  {
    slug: 'Mango',
    name: 'Mango',
    tagline: 'Regional excellence with traceable orchard practices.',
    description:
      'Heritage flavour with modern nutrition diagnostics—bridging market demand and sustainable intensity.',
    notes: ['Canopy management for airflow', 'Grade-out planning for packhouses'],
    image: CLIENT_ASSETS.mangoHarvest,
  },
  {
    slug: 'red-diamond-guava',
    name: 'Red Diamond guava',
    tagline: 'Colour-forward fruit with disciplined thinning strategy.',
    description:
      'Balanced crop loads for size, brix, and shelf appeal—aligned with cleaner spray schedules where feasible.',
    notes: ['Bagging options by market', 'Nutrition maps for colour expression'],
    image: LOCAL_ASSETS.guava,
  },
  {
    slug: 'banana',
    name: 'Banana',
    tagline: 'Rhythm farming—ratoon cycles with soil health in view.',
    description:
      'High-turnover blocks managed for Panama/TR4 awareness contexts and efficient desuckering labour models.',
    notes: ['Drainage & bunding patterns', 'Desuckering SOPs'],
    image: CLIENT_ASSETS.banana,
  },
]
