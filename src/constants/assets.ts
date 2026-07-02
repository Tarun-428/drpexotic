import orchardNightUrl from '../../img/img1.webp'
import orchardTeamUrl from '../../img/img2.webp'
import dragonFruitCutUrl from '../../img/img3.jpg'
import dragonFruitRowsUrl from '../../img/img4.jpg'
import dragonFruitHalvesUrl from '../../img/img5.jpg'
import dragonFruitWholeUrl from '../../img/img6.jpg'
import guavaUrl from '../../img/img7.jpg'
import avocadoUrl from '../../img/img8.jpg'

export const LOCAL_ASSETS = {
  orchardNight: orchardNightUrl,
  orchardTeam: orchardTeamUrl,
  dragonFruitCut: dragonFruitCutUrl,
  dragonFruitRows: dragonFruitRowsUrl,
  dragonFruitHalves: dragonFruitHalvesUrl,
  dragonFruitWhole: dragonFruitWholeUrl,
  guava: guavaUrl,
  avocado: avocadoUrl,
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

const clientImage = (name: string) => `/client-images/${name}.jpg`
const clientImageWithExt = (name: string, ext: string) => `/client-images/${name}.${ext}`

export const CLIENT_ASSETS = {
  founder: clientImage('founder'),
  cofounder: clientImage('cofounder'),
  consultation: clientImage('IMG_1935'),
  consultationRoom: clientImage('IMG_1936'),
  publicRecognition: clientImage('IMG_2381'),
  aboutPage: clientImage('about_page'),
  plantingMaterial: clientImage('planting_material'),
  marketDisplay: clientImage('IMG_2099'),
  orchardOverview: clientImage('IMG_1941'),
  protectedCultivation: clientImage('IMG_1938'),
  orchardRows: clientImage('IMG_7840'),
  orchardSunrise: clientImage('IMG_8222'),
  nightBloom: clientImage('IMG_5733'),
  dragonFruitSingle: clientImage('img_dragon_new'),
  dragonFruitPlated: clientImage('IMG_5286'),
  yellowDragonFruit: clientImage('IMG_6280'),
  avocadoCluster: clientImage('IMG_1870'),
  avocadoTree: clientImage('IMG_2504'),
  avocadoHarvest: clientImage('IMG_8426'),
  mangoCluster: clientImage('IMG_2116'),
  mangoHarvest: clientImage('IMG_2528'),
  guavaHarvest: clientImage('IMG_8674'),
  cropInspection: clientImage('IMG_8568'),
  guavaCut: clientImage('IMG_8608'),
  guavaNew: clientImageWithExt('guava_new', 'png'),
  foundersJoint: clientImage('IMG_1982'),
  blueberry: clientImage('blueberry'),
  banana: clientImage('banana'),
} as const

export const CLIENT_GALLERY_IMAGES = [
  { id: 'founder-portrait', url: CLIENT_ASSETS.founder, alt: 'Founder portrait in the orchard', title: 'Founder in the Orchard', tags: [] },
  { id: 'cofounder-portrait', url: CLIENT_ASSETS.cofounder, alt: 'Co-founder portrait in the orchard', title: 'Co-Founder in the Orchard', tags: [] },
  { id: 'consultation', url: CLIENT_ASSETS.consultation, alt: 'One-to-one grower consultation meeting', title: 'Grower Consultation', tags: [] },
  { id: 'consultation-room', url: CLIENT_ASSETS.consultationRoom, alt: 'DRP team in a planning discussion', title: 'Planning Discussion', tags: [] },
  { id: 'public-recognition', url: CLIENT_ASSETS.publicRecognition, alt: 'Public recognition moment with DRP leadership', title: 'Recognition Moment', tags: [] },
  { id: 'protected-cultivation', url: CLIENT_ASSETS.protectedCultivation, alt: 'Protected dragon fruit cultivation structure', title: 'Protected Cultivation', tags: ['Farm', 'Dragon Fruit'] },
  { id: 'orchard-overview', url: CLIENT_ASSETS.orchardOverview, alt: 'Wide orchard rows under open sky', title: 'Orchard Layout', tags: ['Farm'] },
  { id: 'market-display', url: clientImage('IMG_2099'), alt: 'DRP fruit display with exotic produce', title: 'Market Display', tags: [] },
  { id: 'mango-young-tree', url: clientImage('IMG_2110'), alt: 'Young mango tree carrying fruit', title: 'Young Mango Crop', tags: ['Mango', 'Farm'] },
  { id: 'mango-branch', url: clientImage('IMG_2113'), alt: 'Mangoes growing on a low branch', title: 'Mango Branch', tags: ['Mango', 'Farm'] },
  { id: 'mango-cluster', url: CLIENT_ASSETS.mangoCluster, alt: 'Mango cluster growing on the tree', title: 'Mango Cluster', tags: ['Mango', 'Farm'] },
  { id: 'avocado-tree', url: CLIENT_ASSETS.avocadoTree, alt: 'Avocados growing densely on a tree', title: 'Avocado Tree', tags: ['Avocado', 'Farm'] },
  { id: 'avocado-branch', url: clientImage('IMG_2505'), alt: 'Avocado branch with developing fruit', title: 'Avocado Branch', tags: ['Avocado', 'Farm'] },
  { id: 'mango-harvest', url: CLIENT_ASSETS.mangoHarvest, alt: 'Ripe mangoes held in hand', title: 'Mango Harvest', tags: ['Mango'] },
  { id: 'mango-canopy', url: clientImage('IMG_2531'), alt: 'Mangoes under a healthy canopy', title: 'Mango Canopy', tags: ['Mango', 'Farm'] },
  { id: 'mango-row', url: clientImage('IMG_2533'), alt: 'Mangoes growing in orchard rows', title: 'Mango Row', tags: ['Mango', 'Farm'] },
  { id: 'mango-study', url: clientImage('IMG_2541'), alt: 'Mango crop study collage', title: 'Mango Crop Study', tags: ['Mango'] },
  { id: 'night-bloom', url: clientImage('IMG_4235'), alt: 'Dragon fruit flowers blooming at night', title: 'Night Bloom', tags: ['Dragon Fruit', 'Farm'] },
  { id: 'dragon-fruit-plated', url: CLIENT_ASSETS.dragonFruitPlated, alt: 'Dragon fruit and fresh juice presentation', title: 'Fruit Presentation', tags: ['Dragon Fruit'] },
  { id: 'dragon-flower', url: CLIENT_ASSETS.nightBloom, alt: 'Close-up of dragon fruit flowers at night', title: 'Flowering Stage', tags: ['Dragon Fruit', 'Farm'] },
  { id: 'yellow-dragon-fruit', url: CLIENT_ASSETS.yellowDragonFruit, alt: 'Yellow dragon fruit held in a garden', title: 'Yellow Dragon Fruit', tags: ['Dragon Fruit'] },
  { id: 'dragon-fruit-single', url: CLIENT_ASSETS.dragonFruitSingle, alt: 'Pink dragon fruit on the plant', title: 'Dragon Fruit Crop', tags: ['Dragon Fruit', 'Farm'] },
  { id: 'avocado-pair', url: clientImage('IMG_7824'), alt: 'Two avocados held near the tree', title: 'Avocado Pair', tags: ['Avocado'] },
  { id: 'orchard-rows', url: CLIENT_ASSETS.orchardRows, alt: 'Structured dragon fruit orchard rows', title: 'Dragon Fruit Rows', tags: ['Dragon Fruit', 'Farm'] },
  { id: 'dragon-flower-day', url: clientImage('IMG_8207'), alt: 'Dragon fruit flower in daylight', title: 'Day Flowering', tags: ['Dragon Fruit', 'Farm'] },
  { id: 'orchard-sunrise', url: CLIENT_ASSETS.orchardSunrise, alt: 'Dragon fruit orchard in warm morning light', title: 'Morning Orchard', tags: ['Dragon Fruit', 'Farm'] },
  { id: 'avocado-harvest', url: clientImage('IMG_8426'), alt: 'Avocados harvested by hand', title: 'Avocado Harvest', tags: ['Avocado'] },
  { id: 'avocado-cluster-hand', url: clientImage('IMG_8435'), alt: 'Avocado cluster held in the orchard', title: 'Avocado Cluster', tags: ['Avocado'] },
  { id: 'guava-grower', url: clientImage('IMG_8568'), alt: 'Grower holding guava in the orchard', title: 'Guava Grower', tags: ['Guava'] },
  { id: 'guava-half-tree', url: clientImage('IMG_8583'), alt: 'Cut guava held in front of the tree', title: 'Guava Fruit Check', tags: ['Guava'] },
  { id: 'guava-cut', url: CLIENT_ASSETS.guavaCut, alt: 'Pink guava halves held in hand', title: 'Pink Guava Interior', tags: ['Guava'] },
  { id: 'avocado-three', url: clientImage('IMG_8639'), alt: 'Three avocados held in the orchard', title: 'Avocado Field Check', tags: ['Avocado'] },
  { id: 'guava-on-tree', url: clientImage('IMG_8673'), alt: 'Guavas growing on the tree', title: 'Guava on Tree', tags: ['Guava', 'Farm'] },
  { id: 'guava-harvest', url: CLIENT_ASSETS.guavaHarvest, alt: 'Fresh guavas held after harvest', title: 'Guava Harvest', tags: ['Guava'] },
  { id: 'guava-cut-branch', url: clientImage('IMG_8679'), alt: 'Cut guava beside orchard foliage', title: 'Guava Quality Check', tags: ['Guava'] },
  { id: 'jackfruit', url: clientImage('IMG_1544'), alt: 'Jackfruit growing on the tree', title: 'Fruit Diversity', tags: ['Farm'] },
  { id: 'avocado-cluster', url: CLIENT_ASSETS.avocadoCluster, alt: 'Avocado cluster held by hand', title: 'Avocado Cluster Study', tags: ['Avocado'] },
] as const
