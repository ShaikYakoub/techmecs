'use client';

import React from 'react';

interface TechmecsLogoProps {
  fontSize?: number | string;
  spinGearOnHover?: boolean;
  style?: React.CSSProperties;
}

export default function TechmecsLogo({
  fontSize = 26,
  spinGearOnHover = true,
  style = {},
}: TechmecsLogoProps) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        fontFamily: '"Public Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize,
        fontWeight: 800,
        letterSpacing: '-0.035em',
        lineHeight: 1,
        userSelect: 'none',
        cursor: 'pointer',
        ...style,
      }}
    >
      <span style={{ color: '#141414' }}>tech</span>
      <span style={{ color: '#ea4335' }}>m</span>
      <span style={{ color: '#4285f4' }}>e</span>
      <span style={{ color: '#fbbc05' }}>c</span>
      <span style={{ color: '#34a853' }}>s</span>
      <span
        style={{
          display: 'inline-block',
          marginLeft: '3px',
          verticalAlign: 'super',
          transform: 'translateY(-0.35em)',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          style={{
            width: '0.36em',
            height: '0.36em',
            display: 'block',
            fill: '#1f1f1f',
            transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transform: spinGearOnHover && hovered ? 'rotate(180deg)' : 'rotate(0deg)',
            transformOrigin: '50% 50%',
          }}
        >
          <path
            fillRule="evenodd"
            d="M 84.08 28.76 L 83.67 6.41 A 95 95 0 0 1 116.33 6.41 L 115.92 28.76 A 73 73 0 0 0 139.12 38.36 L 139.12 38.36 L 154.63 22.28 A 95 95 0 0 1 177.72 45.37 L 161.64 60.88 A 73 73 0 0 0 171.24 84.08 L 171.24 84.08 L 193.59 83.67 A 95 95 0 0 1 193.59 116.33 L 171.24 115.92 A 73 73 0 0 0 161.64 139.12 L 161.64 139.12 L 177.72 154.63 A 95 95 0 0 1 154.63 177.72 L 139.12 161.64 A 73 73 0 0 0 115.92 171.24 L 115.92 171.24 L 116.33 193.59 A 95 95 0 0 1 83.67 193.59 L 84.08 171.24 A 73 73 0 0 0 60.88 161.64 L 60.88 161.64 L 45.37 177.72 A 95 95 0 0 1 22.28 154.63 L 38.36 139.12 A 73 73 0 0 0 28.76 115.92 L 28.76 115.92 L 6.41 116.33 A 95 95 0 0 1 6.41 83.67 L 28.76 84.08 A 73 73 0 0 0 38.36 60.88 L 38.36 60.88 L 22.28 45.37 A 95 95 0 0 1 45.37 22.28 L 60.88 38.36 A 73 73 0 0 0 84.08 28.76 Z M 100 62 A 38 38 0 1 0 100 138 A 38 38 0 1 0 100 62 Z"
          />
        </svg>
      </span>
    </span>
  );
}
