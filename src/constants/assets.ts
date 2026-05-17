import orchardNightUrl from '../../img/img1.webp'
import orchardTeamUrl from '../../img/img2.webp'
import dragonFruitCutUrl from '../../img/img3.jpg'
import dragonFruitRowsUrl from '../../img/img4.jpg'
import dragonFruitHalvesUrl from '../../img/img5.jpg'
import dragonFruitWholeUrl from '../../img/img6.jpg'
import guavaUrl from '../../img/img7.jpg'
import avocadoUrl from '../../img/img8.jpg'
import orchardClipUrl from '../../img/clip.mp4'

export const LOCAL_ASSETS = {
  orchardNight: orchardNightUrl,
  orchardTeam: orchardTeamUrl,
  dragonFruitCut: dragonFruitCutUrl,
  dragonFruitRows: dragonFruitRowsUrl,
  dragonFruitHalves: dragonFruitHalvesUrl,
  dragonFruitWhole: dragonFruitWholeUrl,
  guava: guavaUrl,
  avocado: avocadoUrl,
  orchardClip: orchardClipUrl,
} as const

export const LOCAL_GALLERY_IMAGES = [
  {
    id: 'orchard-night',
    url: LOCAL_ASSETS.orchardNight,
    alt: 'Night-lit dragon fruit orchard rows',
  },
  {
    id: 'orchard-team',
    url: LOCAL_ASSETS.orchardTeam,
    alt: 'DRP Exotic Farms team in the orchard',
  },
  {
    id: 'dragon-fruit-cut',
    url: LOCAL_ASSETS.dragonFruitCut,
    alt: 'Cut red dragon fruit in hand',
  },
  {
    id: 'dragon-fruit-rows',
    url: LOCAL_ASSETS.dragonFruitRows,
    alt: 'Whole dragon fruit in orchard rows',
  },
  {
    id: 'dragon-fruit-halves',
    url: LOCAL_ASSETS.dragonFruitHalves,
    alt: 'Halved dragon fruit held against green foliage',
  },
  {
    id: 'dragon-fruit-whole',
    url: LOCAL_ASSETS.dragonFruitWhole,
    alt: 'Whole red dragon fruit close-up',
  },
  {
    id: 'guava',
    url: LOCAL_ASSETS.guava,
    alt: 'Red Diamond guava fruit in the orchard',
  },
  {
    id: 'avocado',
    url: LOCAL_ASSETS.avocado,
    alt: 'Avocados held in the orchard',
  },
] as const
