import { Helmet } from 'react-helmet-async'

type PageMetaProps = {
  title: string
  description: string
  path: string
  ogImage?: string
  type?: 'website' | 'article'
}

export function PageMeta({ title, description, path, ogImage = '/logo_farmer.png', type = 'website' }: PageMetaProps) {
  const site = 'DRP Exotic Farms'
  const fullTitle = title.includes(site) ? title : `${title} | ${site}`
  const origin =
    typeof window !== 'undefined' && window.location?.origin
      ? window.location.origin
      : 'https://drpexoticfarms.com'
  const fullUrl = `${origin}${path}`
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${origin}${ogImage}`

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      <meta property="og:site_name" content={site} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullOgImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
    </Helmet>
  )
}
