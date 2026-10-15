'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import WaitlistModal from './WaitlistModal';

// Dynamically import WebGL canvas with SSR disabled per global guideline
const FoyerHeroCanvas = dynamic(() => import('./FoyerHeroCanvas'), {
  ssr: false,
  loading: () => (
    <img
      src="/images/foyer/hero.png"
      alt="Editorial artwork"
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
  ),
});

export default function ComingSoonPage() {
  const [modalOpen, setModalOpen] = useState(false);

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
        {/* Top-Left Geometric Mark */}
        <a
          href="/"
          aria-label="Homepage"
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: '#1f1f1f',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 331 202"
            fill="none"
            style={{ width: '42px', height: 'auto', display: 'block' }}
          >
            <path
              stroke="#1f1f1f"
              strokeWidth="48"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M222.564 23.743 96.04 65.463l166 34.919-136.984 79.361"
            />
          </svg>
        </a>

        {/* Top-Right "Join waitlist" Pill Button */}
        <button
          onClick={() => setModalOpen(true)}
          style={{
            pointerEvents: 'auto',
            backgroundColor: '#1f1f1f',
            color: '#f3ece6',
            border: 'none',
            borderRadius: '9999px',
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: 500,
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
          Join waitlist
        </button>
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

                {/* TikTok */}
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
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
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                  </svg>
                </a>

                {/* Pinterest */}
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Pinterest"
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
                    <line x1="12" y1="9" x2="12" y2="21" />
                    <path d="M8 12a4 4 0 1 1 8 0c0 3-2 5-4 5s-2-2-2-4" />
                    <circle cx="12" cy="12" r="10" />
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
                  maxWidth: '240px',
                  fontWeight: 400,
                }}
              >
                Hand-dyed kimono, made in small runs. First collection this autumn
              </p>
            </div>

            {/* 2. Email Contact Link */}
            <div style={{ paddingBottom: '4px' }}>
              <a
                href="mailto:hello@foyer.com"
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
                hello@foyer.com
              </a>
            </div>

            {/* 3. Attribution */}
            <div style={{ paddingBottom: '4px' }}>
              <span
                style={{
                  fontSize: '13px',
                  color: '#777777',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                MADE BY <strong style={{ color: '#1f1f1f', fontWeight: 600 }}>tmpl</strong>
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
            <FoyerHeroCanvas imageSrc="/images/foyer/hero.png" />
          </div>

          {/* Floating Card: "Work in progress" */}
          <div
            className="foyer-floating-card"
            style={{
              position: 'absolute',
              bottom: '32px',
              right: '32px',
              zIndex: 30,
              backgroundColor: 'rgba(24, 24, 26, 0.92)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '20px',
              padding: '16px',
              boxShadow: '0 20px 45px rgba(0, 0, 0, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              maxWidth: '380px',
              cursor: 'pointer',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            }}
            onClick={() => setModalOpen(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 25px 55px rgba(0, 0, 0, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 20px 45px rgba(0, 0, 0, 0.4)';
            }}
          >
            {/* Thumbnail Image */}
            <div
              style={{
                width: '78px',
                height: '98px',
                flexShrink: 0,
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: '#2b2b2e',
              }}
            >
              <img
                src="/images/foyer/work-in-progress.png"
                alt="Work in progress kimono"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>

            {/* Card Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                <h4
                  style={{
                    margin: 0,
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#ffffff',
                    fontFamily: '"Stack Sans Headline", sans-serif',
                    letterSpacing: '-0.01em',
                  }}
                >
                  Work in progress
                </h4>
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: '12px',
                  }}
                >
                  ↗
                </div>
              </div>

              <p
                style={{
                  margin: 0,
                  fontSize: '13px',
                  lineHeight: 1.4,
                  color: 'rgba(255, 255, 255, 0.65)',
                }}
              >
                Follow the making of our kimono collection on Instagram
              </p>
            </div>
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
          {/* Date / Status Pill Badge */}
          <div style={{ display: 'inline-block', marginBottom: '18px' }}>
            <span
              style={{
                display: 'inline-block',
                backgroundColor: '#1f1f1f',
                color: '#f3ece6',
                borderRadius: '9999px',
                padding: '5px 16px',
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.01em',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              October 2027
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
              .foyer-floating-card {
                bottom: 20px !important;
                right: 16px !important;
                left: 16px !important;
                max-width: none !important;
              }
            }
          `,
        }}
      />

      {/* Waitlist Modal */}
      <WaitlistModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
