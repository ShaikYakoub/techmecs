import type { Metadata, Viewport } from 'next';
import fs from 'fs';
import path from 'path';
import { AwardsMorphedMenu } from '@/components/AwardsMorphedMenu';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://techmecs.in'),
  title: 'Techmecs — Digital Marketing Agency & Academy | Kadapa',
  description:
    'Techmecs is a premier digital marketing agency and academy based in Kadapa, providing website development, performance marketing, videography, and student training.',
  icons: {
    icon: [
      { url: '/images/eCX2l5CSlTjb9d7xevX1VTxpwWc.svg', media: '(prefers-color-scheme: light)' },
      { url: '/images/eCX2l5CSlTjb9d7xevX1VTxpwWc.svg', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/images/CPPcnkZMxilv14OS93Qs7hyovnU.png',
  },
  openGraph: {
    type: 'website',
    title: 'Techmecs — Digital Marketing Agency & Academy | Kadapa',
    description:
      'Techmecs is a premier digital marketing agency and academy based in Kadapa, providing website development, performance marketing, videography, and student training.',
    url: 'https://techmecs.in/',
    images: [
      {
        url: '/images/YYNAY2NX1AQEurN4JkOTy8TcZJw.png',
        width: 1200,
        height: 630,
        alt: 'Techmecs Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Techmecs — Digital Marketing Agency & Academy | Kadapa',
    description:
      'Techmecs is a premier digital marketing agency and academy based in Kadapa, providing website development, performance marketing, videography, and student training.',
    images: ['/images/YYNAY2NX1AQEurN4JkOTy8TcZJw.png'],
  },
  other: {
    generator: 'Next.js 16',
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
    '@type': 'ProfessionalService',
    '@id': 'https://techmecs.in/#organization',
    name: 'Techmecs',
    description:
      'Techmecs is a premier digital marketing agency and academy in Kadapa offering website development, performance marketing, videography, and student training.',
    url: 'https://techmecs.in',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kadapa',
      addressRegion: 'Andhra Pradesh',
      addressCountry: 'India',
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
          id="foyer-font-css"
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: 'Stack Sans Headline';
                src: url('/fonts/stacksansheadline-700.woff2') format('woff2');
                font-weight: 700;
                font-style: normal;
                font-display: swap;
              }
              @font-face {
                font-family: 'Stack Sans Headline';
                src: url('/fonts/stacksansheadline-500.woff2') format('woff2');
                font-weight: 500;
                font-style: normal;
                font-display: swap;
              }
              @font-face {
                font-family: 'Stack Sans Headline';
                src: url('/fonts/stacksansheadline-400.woff2') format('woff2');
                font-weight: 400;
                font-style: normal;
                font-display: swap;
              }
            `,
          }}
        />
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
        <style
          id="framer-cleanup-overrides"
          dangerouslySetInnerHTML={{
            __html: `
              .framer-131nhti-container,
              nav.framer-twS70,
              [data-framer-name="Desktop - Home"],
              [data-framer-name="Phone - Home"],
              [data-framer-name="Tablet - Home"],
              .framer-1swg9it-container,
              .framer-1a4gf23-container,
              .framer-mwe28,
              #template-overlay,
              #__framer-badge-container,
              .__framer-badge,
              [data-framer-name="Light"].__framer-badge {
                display: none !important;
                opacity: 0 !important;
                visibility: hidden !important;
                pointer-events: none !important;
                position: absolute !important;
                left: -99999px !important;
                top: -99999px !important;
                width: 0 !important;
                height: 0 !important;
                overflow: hidden !important;
              }
              .framer-1b59nf9 {
                width: 270px !important;
                left: calc(50% - 135px) !important;
              }
              @keyframes hero-gear-spin {
                from {
                  transform: rotate(0deg);
                }
                to {
                  transform: rotate(360deg);
                }
              }
              .hero-spinning-gear {
                display: inline-block !important;
                vertical-align: -0.08em !important;
                height: 0.75em !important;
                width: 0.75em !important;
                margin: 0 0.25em !important;
                animation: hero-gear-spin 8s linear infinite !important;
                transform-origin: 50% 50% !important;
                flex-shrink: 0 !important;
                pointer-events: none !important;
                user-select: none !important;
              }
            `,
          }}
        />
      </head>
      <body>
        <AwardsMorphedMenu />
        {children}
      </body>
    </html>
  );
}
