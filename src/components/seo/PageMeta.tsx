import { Helmet } from 'react-helmet-async'

type PageMetaProps = {
  title: string
  description: string
  path: string
}

export function PageMeta({ title, description, path }: PageMetaProps) {
  const site = 'Drpexoticfarms™'
  const fullTitle = `${title} · ${site}`
  const origin =
    typeof window !== 'undefined' && window.location?.origin
      ? window.location.origin
      : 'https://drpexoticfarms.example'

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`${origin}${path}`} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}
