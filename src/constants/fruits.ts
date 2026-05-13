export type FruitVariety = {
  slug: string
  name: string
  tagline: string
  description: string
  notes: string[]
  image: string
}

export const FRUIT_VARIETIES: FruitVariety[] = [
  {
    slug: 'blueberry',
    name: 'Blueberry',
    tagline: 'Acidic soils, disciplined nutrition, clean picking windows.',
    description:
      'High-value berries with tight quality gates—suited to controlled nutrition programs and residue-aware protocols.',
    notes: ['Premium retail & ingredient channels', 'Cold-chain sensitive—planned logistics'],
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=1400&q=80',
  },
  {
    slug: 'avocado',
    name: 'Avocado',
    tagline: 'Water-smart establishment, long-horizon canopy design.',
    description:
      'Orchard layouts that respect slope, drainage, and varietal behaviour—aimed at steady bearing, not short-lived spikes.',
    notes: ['Establishment plans tuned to local climate', 'Irrigation scheduling guidance'],
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b404?w=1400&q=80',
  },
  {
    slug: 'dragon-fruit',
    name: 'Dragon fruit',
    tagline: 'Trellised systems with clear labour paths and harvest rhythm.',
    description:
      'Structural support and row architecture that keeps crews efficient and fruit damage low across flushes.',
    notes: ['Post & trellis patterns', 'Night-bloom pollination considerations'],
    image: 'https://images.unsplash.com/photo-1595476105560-3f2c27ce7a9e?w=1400&q=80',
  },
  {
    slug: 'kesar-mango',
    name: 'Kesar mango',
    tagline: 'Regional excellence with traceable orchard practices.',
    description:
      'Heritage flavour with modern nutrition diagnostics—bridging market demand and sustainable intensity.',
    notes: ['Canopy management for airflow', 'Grade-out planning for packhouses'],
    image: 'https://images.unsplash.com/photo-1517282009859-f000e3a26c1f?w=1400&q=80',
  },
  {
    slug: 'red-diamond-guava',
    name: 'Red Diamond guava',
    tagline: 'Colour-forward fruit with disciplined thinning strategy.',
    description:
      'Balanced crop loads for size, brix, and shelf appeal—aligned with cleaner spray schedules where feasible.',
    notes: ['Bagging options by market', 'Nutrition maps for colour expression'],
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1400&q=80',
  },
  {
    slug: 'banana',
    name: 'Banana',
    tagline: 'Rhythm farming—ratoon cycles with soil health in view.',
    description:
      'High-turnover blocks managed for Panama/TR4 awareness contexts and efficient desuckering labour models.',
    notes: ['Drainage & bunding patterns', 'Desuckering SOPs'],
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=1400&q=80',
  },
]
