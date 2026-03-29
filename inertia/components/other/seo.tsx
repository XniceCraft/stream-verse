import { Head, usePage } from '@inertiajs/react'

import type { SharedProps } from '@adonisjs/inertia/types'

interface SEOProps {
  title: string
  path?: string
  allowRobots?: boolean
}

export function Seo({ title, path, allowRobots = true }: SEOProps) {
  const { seo } = usePage<SharedProps>().props

  return (
    <Head title={`${title} - ${seo.name}`}>
      <meta name="title" content={`${title} - ${seo.name}`} />
      {seo.description && <meta name="description" content={seo.description} />}
      {seo.keywords && <meta name="keywords" content={seo.keywords} />}
      {seo.author && <meta name="author" content={seo.author} />}
      <meta name="robots" content={allowRobots ? 'index, follow' : 'noindex, nofollow'} />
      <meta name="language" content="English" />

      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`${import.meta.env.VITE_APP_URL}${path ? `/${path}` : ''}`}
      />
      <meta property="og:title" content={`${title} - ${seo.name}`} />
      {seo.description && <meta property="og:description" content={seo.description} />}
      {seo.ogImage && <meta property="og:image" content={seo.ogImage} />}
      <meta property="og:site_name" content={seo.name} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:url"
        content={`${import.meta.env.VITE_APP_URL}${path ? `/${path}` : ''}`}
      />
      <meta name="twitter:title" content={seo.name} />
      {seo.description && <meta name="twitter:description" content={seo.description} />}
      {seo.ogImage && <meta name="twitter:image" content={seo.ogImage} />}
    </Head>
  )
}
