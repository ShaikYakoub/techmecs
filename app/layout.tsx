import type { Metadata, Viewport } from 'next';
import fs from 'fs';
import path from 'path';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://cohesion.framer.ai'),
  title: 'Cohesion - Portfolio Template made in Framer',
  description:
    'Cohesion is a free single-page Framer portfolio template for UI/UX designers and freelancers. Colourful 3D design with services, tech stack, pricing, and projects included.',
  icons: {
    icon: [
      { url: '/images/eCX2l5CSlTjb9d7xevX1VTxpwWc.svg', media: '(prefers-color-scheme: light)' },
      { url: '/images/eCX2l5CSlTjb9d7xevX1VTxpwWc.svg', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/images/CPPcnkZMxilv14OS93Qs7hyovnU.png',
  },
  openGraph: {
    type: 'website',
    title: 'Cohesion - Portfolio Template made in Framer',
    description:
      'Cohesion is a free single-page Framer portfolio template for UI/UX designers and freelancers. Colourful 3D design with services, tech stack, pricing, and projects included.',
    url: 'https://cohesion.framer.ai/',
    images: [
      {
        url: '/images/YYNAY2NX1AQEurN4JkOTy8TcZJw.png',
        width: 1200,
        height: 630,
        alt: 'Cohesion Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cohesion - Portfolio Template made in Framer',
    description:
      'Cohesion is a free single-page Framer portfolio template for UI/UX designers and freelancers. Colourful 3D design with services, tech stack, pricing, and projects included.',
    images: ['/images/YYNAY2NX1AQEurN4JkOTy8TcZJw.png'],
  },
  other: {
    generator: 'Framer fd0ec14',
    'framer-search-index': '/modules/searchIndex-Tyew3rs3ueZk.json',
    'framer-search-index-fallback': '/modules/searchIndex-xKTrPYdBlPB9.json',
    robots: 'max-image-preview:large',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const stylesPath = path.join(process.cwd(), 'data', 'styles.json');
  const stylesData = JSON.parse(fs.readFileSync(stylesPath, 'utf8'));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': 'https://www.uihub.design/templates/cohesion#product',
    name: 'Cohesion — UI/UX Designer Portfolio Framer Template',
    description:
      'A free single-page Framer portfolio template for UI/UX designers and freelancers. Colourful 3D design with services, tech stack, pricing plans, projects, and testimonials included.',
    url: 'https://www.uihub.design/templates/cohesion',
    image: '/images/lpBCQr5W4Ewj19l58acLZ2k3I4.png',
    category: 'Personal Portfolio Framer Template',
    sku: 'UIHUB-COHESION-001',
    brand: {
      '@type': 'Brand',
      name: 'Organization',
    },
    offers: {
      '@type': 'Offer',
      url: 'https://framer.link/SW15EBF',
      priceCurrency: 'USD',
      price: '0',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'UIHub',
        url: 'https://www.uihub.design',
      },
    },
  };

  return (
    <html lang="en" data-redirect-timezone="1" dir="ltr">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.addEventListener('error', function(e) { console.error('CAUGHT_EXACT_ERROR:', e.message, 'AT:', e.filename, 'LINE:', e.lineno, 'COL:', e.colno, 'STACK:', e.error ? e.error.stack : 'no stack'); });`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <style
          data-framer-font-css=""
          dangerouslySetInnerHTML={{ __html: stylesData.fontCss }}
        />
        <style
          data-framer-breakpoint-css=""
          dangerouslySetInnerHTML={{ __html: stylesData.breakpointCss }}
        />
        <style
          data-framer-css-ssr-minified=""
          data-framer-components={stylesData.ssrCssComponents}
          dangerouslySetInnerHTML={{ __html: stylesData.ssrCss }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
