'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import TechmecsLogo from './TechmecsLogo';

// Dynamically import WebGL canvas with SSR disabled per global guideline
const FoyerHeroCanvas = dynamic(() => import('./FoyerHeroCanvas'), {
  ssr: false,
  loading: () => (
    <img
      src="/images/hero-black-gear.jpg"
      alt="Techmecs kinetic sculpture"
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
  ),
});

export default function ComingSoonPage() {

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#f3ece6',
        color: '#1f1f1f',
        overflowX: 'hidden',
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* =========================================================================
          TOP NAVIGATION BAR (Across entire viewport)
          ========================================================================= */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '32px 36px',
          pointerEvents: 'none',
        }}
      >
        {/* Top-Left Techmecs Brand Logo */}
        <a
          href="/"
          aria-label="Techmecs Homepage"
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <TechmecsLogo height={26} />
        </a>

        {/* Top-Right "Contact" Pill Button -> WhatsApp */}
        <a
          href="https://wa.me/919959989930"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact Techmecs on WhatsApp"
          style={{
            pointerEvents: 'auto',
            backgroundColor: '#1f1f1f',
            color: '#f3ece6',
            borderRadius: '9999px',
            padding: '12px 26px',
            fontSize: '14px',
            fontWeight: 500,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.15)';
          }}
        >
          Contact
        </a>
      </header>

      {/* =========================================================================
          MAIN 50 / 50 SPLIT GRID
          ========================================================================= */}
      <main
        className="foyer-main-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          minHeight: '100vh',
          width: '100%',
          position: 'relative',
        }}
      >
        {/* LEFT COLUMN: Warm Cream Background & Bottom Brand Info */}
        <div
          className="foyer-left-col"
          style={{
            backgroundColor: '#f3ece6',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '36px 40px',
            boxSizing: 'border-box',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* Bottom Left Footer Info: 3-column distributed layout */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              width: '100%',
              gap: '24px',
            }}
          >
            {/* 1. Social Icons & Tagline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '260px' }}>
              {/* Social Icons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  style={{
                    color: '#1f1f1f',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'opacity 0.2s ease, transform 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.6';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/919959989930"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  style={{
                    color: '#1f1f1f',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'opacity 0.2s ease, transform 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.6';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </a>
              </div>

              {/* Tagline / Subtext */}
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: 1.45,
                  color: '#1f1f1f',
                  margin: 0,
                  maxWidth: '280px',
                  fontWeight: 400,
                }}
              >
                Engineering modern digital experiences, web solutions & performance branding
              </p>
            </div>

            {/* 2. Email Contact Link */}
            <div style={{ paddingBottom: '4px' }}>
              <a
                href="mailto:contact@techmecs.com"
                style={{
                  color: '#1f1f1f',
                  fontSize: '14px',
                  textDecoration: 'underline dotted',
                  textUnderlineOffset: '4px',
                  fontWeight: 400,
                  transition: 'opacity 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                contact@techmecs.com
              </a>
            </div>

            {/* 3. Attribution */}
            <div style={{ paddingBottom: '4px' }}>
              <span
                style={{
                  fontSize: '13px',
                  color: '#555555',
                  letterSpacing: '0.01em',
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                Website by <TechmecsLogo height={15} />
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Editorial Visual with WebGL Ripple + Floating Card */}
        <div
          className="foyer-right-col"
          style={{
            position: 'relative',
            minHeight: '100vh',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          {/* Interactive WebGL Ripple Canvas */}
          <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <FoyerHeroCanvas imageSrc="/images/hero-black-gear.jpg" />
          </div>
        </div>

        {/* =========================================================================
            CENTER SPLIT HEADLINE (Precisely overlaid across 50% vertical boundary)
            ========================================================================= */}
        <div
          className="foyer-split-headline"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 25,
            width: '100%',
            maxWidth: '1200px',
            textAlign: 'center',
            pointerEvents: 'none',
            padding: '0 20px',
            boxSizing: 'border-box',
          }}
        >
          {/* Location / Status Pill Badge */}
          <div style={{ display: 'inline-block', marginBottom: '18px' }}>
            <span
              style={{
                display: 'inline-block',
                backgroundColor: '#1f1f1f',
                color: '#f3ece6',
                borderRadius: '9999px',
                padding: '6px 18px',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              KADAPA
            </span>
          </div>

          {/* Typography Relative Container */}
          <div style={{ position: 'relative', width: '100%', margin: '0 auto' }}>
            {/* Layer 1: Dark charcoal text on left side (visible across 0% to 50%) */}
            <h1
              style={{
                margin: 0,
                width: '100%',
                fontSize: 'clamp(54px, 7.2vw, 106px)',
                fontWeight: 700,
                fontFamily: '"Stack Sans Headline", sans-serif',
                lineHeight: 0.94,
                letterSpacing: '-3.68px',
                textAlign: 'center',
                color: '#1f1f1f',
                whiteSpace: 'normal',
                wordBreak: 'break-word',
              }}
            >
              We're
              <br />
              launching
              <br />
              soon
            </h1>

            {/* Layer 2: Cream white text on right side (clipped at 50% to align with right column) */}
            <h1
              aria-hidden="true"
              style={{
                margin: 0,
                width: '100%',
                fontSize: 'clamp(54px, 7.2vw, 106px)',
                fontWeight: 700,
                fontFamily: '"Stack Sans Headline", sans-serif',
                lineHeight: 0.94,
                letterSpacing: '-3.68px',
                textAlign: 'center',
                color: '#f3ece6',
                opacity: 0.88,
                position: 'absolute',
                inset: 0,
                clipPath: 'inset(0 0 0 50%)',
                pointerEvents: 'none',
                whiteSpace: 'normal',
                wordBreak: 'break-word',
              }}
            >
              We're
              <br />
              launching
              <br />
              soon
            </h1>
          </div>
        </div>
      </main>

      {/* Responsive Stacking Media Queries */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (max-width: 900px) {
              header {
                position: absolute !important;
                padding: 24px 20px !important;
              }
              .foyer-main-grid {
                grid-template-columns: 1fr !important;
                display: flex !important;
                flex-direction: column !important;
              }
              .foyer-split-headline {
                position: relative !important;
                top: auto !important;
                left: auto !important;
                transform: none !important;
                padding-top: 100px !important;
                padding-bottom: 32px !important;
              }
              .foyer-split-headline h1 {
                font-size: 56px !important;
                letter-spacing: -2px !important;
              }
              .foyer-split-headline h1:last-child {
                display: none !important;
              }
              .foyer-left-col {
                min-height: auto !important;
                padding: 32px 24px 48px !important;
                order: 2;
              }
              .foyer-left-col > div {
                flex-direction: column !important;
                align-items: flex-start !important;
                gap: 24px !important;
              }
              .foyer-right-col {
                min-height: 520px !important;
                order: 1;
              }
            }
          `,
        }}
      />
    </div>
  );
}
