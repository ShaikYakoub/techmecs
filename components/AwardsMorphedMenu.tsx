'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';

interface NavLink {
  title: string;
  url: string;
}

interface FooterLink {
  title: string;
  url: string;
}

interface AwardsMorphedMenuProps {
  navLinks?: NavLink[];
  footerLinks?: FooterLink[];
  menuBackgroundColor?: string;
  menuTextColor?: string;
  hoverLineColor?: string;
  btnClosedBg?: string;
  btnClosedColor?: string;
  btnOpenBg?: string;
  btnOpenColor?: string;
}

const DEFAULT_NAV_LINKS: NavLink[] = [
  { title: 'About', url: '#about' },
  { title: 'Skills', url: '#stack' },
  { title: 'Experience', url: '#services' },
  { title: 'Projects', url: '#projects' },
  { title: 'Contact', url: '#contact' },
];

const DEFAULT_FOOTER_LINKS: FooterLink[] = [
  { title: 'Facebook', url: 'https://facebook.com' },
  { title: 'LinkedIn', url: 'https://linkedin.com' },
  { title: 'Instagram', url: 'https://instagram.com' },
  { title: 'Twitter', url: 'https://twitter.com' },
];

export function AwardsMorphedMenu({
  navLinks = DEFAULT_NAV_LINKS,
  footerLinks = DEFAULT_FOOTER_LINKS,
  menuBackgroundColor = '#000000',
  menuTextColor = '#FFFFFF',
  hoverLineColor = '#FFFFFF',
  btnClosedBg = '#000000',
  btnClosedColor = '#FFFFFF',
  btnOpenBg = '#FFFFFF',
  btnOpenColor = '#000000',
}: AwardsMorphedMenuProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [hoveredNavIndex, setHoveredNavIndex] = useState<number | null>(null);
  const [hoveredFooterIndex, setHoveredFooterIndex] = useState<number | null>(null);
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Click outside to close
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Delayed content appearance when opening
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isOpen) {
      timer = setTimeout(() => setContentVisible(true), 320);
    } else {
      setContentVisible(false);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOpen]);

  const isMobile = windowWidth < 768;
  const btnWidth = isMobile ? '90px' : '110px';
  const btnHeight = isMobile ? '40px' : '46px';
  const btnFontSize = isMobile ? '16px' : '18px';

  // Panel spring animations matching Awwwards Morphed Menu
  const panelVariants = {
    open: {
      width: isMobile ? 'min(90vw, 360px)' : '440px',
      height: isMobile ? 'min(70vh, 500px)' : '460px',
      top: '0px',
      right: '0px',
      borderRadius: '24px',
      transition: {
        type: 'spring' as const,
        stiffness: 60,
        damping: 14,
        mass: 1,
      },
    },
    closed: {
      width: btnWidth,
      height: btnHeight,
      top: '0px',
      right: '0px',
      borderRadius: '24px',
      transition: {
        type: 'spring' as const,
        stiffness: 60,
        damping: 14,
        mass: 1,
      },
    },
  };

  const navLinkVariants = {
    initial: {
      opacity: 0,
      rotateX: 100,
      translateY: 80,
    },
    enter: (index: number) => ({
      opacity: 1,
      rotateX: 0,
      translateY: 0,
      transition: {
        delay: index * 0.03,
        type: 'spring' as const,
        stiffness: 80,
        damping: 15,
        mass: 0.8,
      },
    }),
    exit: {
      opacity: 0,
      translateY: 20,
      transition: { duration: 0.15 },
    },
  };

  const footerLinkVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    enter: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.25 + index * 0.08,
        type: 'spring' as const,
        stiffness: 80,
        damping: 15,
        mass: 0.8,
      },
    }),
    exit: {
      opacity: 0,
      transition: { duration: 0.1 },
    },
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    setIsOpen(false);
    if (url.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(url);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (pathname === '/') {
    return null;
  }

  if (!mounted) {
    // Return static SSR placeholder to prevent hydration flicker
    return (
      <div
        className="fixed top-6 right-6 sm:top-6 sm:right-8 z-[9999]"
        style={{
          position: 'fixed',
          top: '24px',
          right: '32px',
          zIndex: 9999,
          width: '110px',
          height: '46px',
        }}
      >
        <div
          style={{
            width: '110px',
            height: '46px',
            borderRadius: '25px',
            backgroundColor: btnClosedBg,
            color: btnClosedColor,
            fontSize: '18px',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontFamily: '"Public Sans", "Inter", sans-serif',
          }}
        >
          MENU
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: isMobile ? '16px' : '24px',
        right: isMobile ? '16px' : '32px',
        zIndex: 9999,
        width: btnWidth,
        height: btnHeight,
        fontFamily: '"Public Sans", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      {/* Morphing Menu Panel */}
      <motion.div
        id="as-animated-menu-box"
        role="menu"
        aria-label="Site navigation"
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: menuBackgroundColor,
          overflow: 'hidden',
          zIndex: 1,
          boxShadow: isOpen ? '0 25px 60px -15px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)' : 'none',
        }}
        variants={panelVariants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
      >
        {/* Main Navigation Items */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: isMobile ? '24px' : '40px',
            marginTop: isMobile ? '16px' : '20px',
          }}
        >
          <AnimatePresence>
            {contentVisible &&
              navLinks.map((link, idx) => {
                const isHovered = hoveredNavIndex === idx;
                return (
                  <div
                    key={link.title}
                    style={{
                      marginBottom: '-4px',
                      perspective: '70px',
                      perspectiveOrigin: 'bottom',
                    }}
                  >
                    <motion.div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        cursor: 'pointer',
                      }}
                      variants={navLinkVariants}
                      initial="initial"
                      animate="enter"
                      exit="exit"
                      custom={idx}
                      onMouseEnter={() => setHoveredNavIndex(idx)}
                      onMouseLeave={() => setHoveredNavIndex(null)}
                    >
                      {/* Animated Arrow Icon */}
                      <motion.svg
                        animate={isHovered ? { width: 44, opacity: 1 } : { width: 0, opacity: 0 }}
                        initial={{ width: 0, opacity: 0 }}
                        width="0"
                        height="28"
                        viewBox="0 0 105 62"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                        aria-hidden="true"
                        style={{ overflow: 'hidden', flexShrink: 0 }}
                      >
                        <path
                          d="M0 31H103M103 31L73.5 1.5M103 31L73.5 60.5"
                          stroke={hoverLineColor}
                          strokeWidth="3.5"
                          vectorEffect="non-scaling-stroke"
                        />
                      </motion.svg>

                      <a
                        href={link.url}
                        role="menuitem"
                        onClick={(e) => handleLinkClick(e, link.url)}
                        style={{
                          color: menuTextColor,
                          textDecoration: 'none',
                          fontSize: isMobile ? '34px' : '44px',
                          fontWeight: 500,
                          lineHeight: 1.15,
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {link.title}
                      </a>
                    </motion.div>
                  </div>
                );
              })}
          </AnimatePresence>
        </div>

        {/* Footer / Social Links */}
        <AnimatePresence>
          {contentVisible && (
            <motion.div
              aria-label="Social links"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                columnGap: '24px',
                rowGap: '8px',
                marginLeft: isMobile ? '28px' : '48px',
                marginTop: isMobile ? '24px' : '36px',
              }}
            >
              {footerLinks.map((link, idx) => {
                const isHovered = hoveredFooterIndex === idx;
                return (
                  <motion.div
                    key={link.title}
                    style={{
                      position: 'relative',
                      width: 'fit-content',
                      marginBottom: '6px',
                    }}
                    variants={footerLinkVariants}
                    custom={idx}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    onMouseEnter={() => setHoveredFooterIndex(idx)}
                    onMouseLeave={() => setHoveredFooterIndex(null)}
                  >
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      role="menuitem"
                      style={{
                        color: 'rgba(255, 255, 255, 0.85)',
                        textDecoration: 'none',
                        fontSize: isMobile ? '16px' : '18px',
                        fontWeight: 400,
                        display: 'inline-block',
                        paddingBottom: '2px',
                      }}
                    >
                      {link.title}
                    </a>

                    {/* Animated Underline */}
                    <motion.div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        height: '2px',
                        backgroundColor: hoverLineColor,
                      }}
                      animate={{ width: isHovered ? '100%' : '0%' }}
                      initial={{ width: '0%' }}
                      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Rolling Pill Button (MENU / CLOSE) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsBtnHovered(true)}
        onMouseLeave={() => setIsBtnHovered(false)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls="as-animated-menu-box"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        style={{
          position: 'absolute',
          top: isOpen ? '12px' : '0px',
          right: isOpen ? '12px' : '0px',
          cursor: 'pointer',
          fontFamily: 'inherit',
          zIndex: 2,
          width: btnWidth,
          height: btnHeight,
          borderRadius: '25px',
          overflow: 'hidden',
          border: 'none',
          padding: 0,
          backgroundColor: 'transparent',
          transition: 'top 0.3s ease, right 0.3s ease',
        }}
      >
        {/* Vertical translation between MENU and CLOSE layers */}
        <motion.div
          style={{ position: 'relative', width: '100%', height: '100%' }}
          animate={{ y: isOpen ? '-100%' : '0%' }}
          transition={{ type: 'spring', stiffness: 200, damping: 22 }}
        >
          {/* MENU State Layer */}
          <div style={{ position: 'relative', height: '100%', width: '100%', overflow: 'hidden' }}>
            {/* Upper text */}
            <motion.div
              style={{ height: '100%', width: '100%' }}
              animate={{ y: isBtnHovered ? '-100%' : '0%' }}
              initial={false}
              transition={{ type: 'spring', stiffness: 200, damping: 22 }}
            >
              <PillLabel bg={btnClosedBg} color={btnClosedColor} fontSize={btnFontSize}>
                MENU
              </PillLabel>
            </motion.div>
            {/* Lower text (rolls in on hover) */}
            <motion.div
              style={{ position: 'absolute', inset: 0 }}
              animate={{ y: isBtnHovered ? '0%' : '100%' }}
              initial={false}
              transition={{ type: 'spring', stiffness: 200, damping: 22 }}
            >
              <PillLabel bg={btnClosedBg} color={btnClosedColor} fontSize={btnFontSize}>
                MENU
              </PillLabel>
            </motion.div>
          </div>

          {/* CLOSE State Layer */}
          <div style={{ position: 'relative', height: '100%', width: '100%', overflow: 'hidden' }}>
            {/* Upper text */}
            <motion.div
              style={{ height: '100%', width: '100%' }}
              animate={{ y: isBtnHovered ? '-100%' : '0%' }}
              initial={false}
              transition={{ type: 'spring', stiffness: 200, damping: 22 }}
            >
              <PillLabel bg={btnOpenBg} color={btnOpenColor} fontSize={btnFontSize}>
                CLOSE
              </PillLabel>
            </motion.div>
            {/* Lower text (rolls in on hover) */}
            <motion.div
              style={{ position: 'absolute', inset: 0 }}
              animate={{ y: isBtnHovered ? '0%' : '100%' }}
              initial={false}
              transition={{ type: 'spring', stiffness: 200, damping: 22 }}
            >
              <PillLabel bg={btnOpenBg} color={btnOpenColor} fontSize={btnFontSize}>
                CLOSE
              </PillLabel>
            </motion.div>
          </div>
        </motion.div>
      </button>
    </div>
  );
}

function PillLabel({
  children,
  bg,
  color,
  fontSize,
}: {
  children: React.ReactNode;
  bg: string;
  color: string;
  fontSize: string;
}) {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: bg,
        color,
        fontSize,
        fontWeight: 600,
        letterSpacing: '0.02em',
        borderRadius: '25px',
      }}
    >
      {children}
    </div>
  );
}

export default AwardsMorphedMenu;
