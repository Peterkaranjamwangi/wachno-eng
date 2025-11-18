import { Metadata } from 'next'

const siteConfig = {
  name: 'Wachno Engineering',
  description:
    'Professional engineering solutions including stainless steel fabrication, mild steel products, refrigeration solutions, architectural drawings, and maintenance services in Kenya.',
  url: 'https://wachnoengineering.com',
  ogImage: '/images/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/wachnoeng',
    facebook: 'https://www.facebook.com/wachnoengineering',
    tiktok: 'https://www.tiktok.com/@wachnoengineering',
  },
}

export function generateMetadata({
  title,
  description,
  image,
  url,
  type = 'website',
  keywords,
}: {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  keywords?: string[]
}): Metadata {
  const metadata: Metadata = {
    title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
    description: description || siteConfig.description,
    keywords: keywords || [
      'engineering kenya',
      'stainless steel fabrication',
      'mild steel products',
      'refrigeration solutions',
      'architectural drawings',
      'metal fabrication',
      'kitchen equipment kenya',
      'cold rooms kenya',
      'engineering services',
    ],
    authors: [{ name: 'Wachno Engineering' }],
    creator: 'Wachno Engineering',
    publisher: 'Wachno Engineering',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type,
      locale: 'en_KE',
      url: url || siteConfig.url,
      title: title || siteConfig.name,
      description: description || siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: image || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title || siteConfig.name,
      description: description || siteConfig.description,
      images: [image || siteConfig.ogImage],
      creator: '@wachnoeng',
    },
    alternates: {
      canonical: url || siteConfig.url,
    },
  }

  return metadata
}

export function generateProductJsonLd(product: {
  id: string
  title: string
  description: string
  image: string
  price?: number
  inStock?: boolean
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.image,
    ...(product.price && {
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'KES',
        availability: product.inStock
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      },
    }),
  }
}

export function generateServiceJsonLd(service: {
  id: string
  title: string
  description: string
  image: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    image: service.image,
    provider: {
      '@type': 'Organization',
      name: 'Wachno Engineering',
      url: siteConfig.url,
    },
  }
}

export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+254-705-383332',
      contactType: 'customer service',
      areaServed: 'KE',
      availableLanguage: ['English', 'Swahili'],
    },
    sameAs: [
      siteConfig.links.facebook,
      siteConfig.links.twitter,
      siteConfig.links.tiktok,
    ],
  }
}

export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
