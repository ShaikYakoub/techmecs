'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes('@') || !trimmed.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    // Simulate swift server response & save to localStorage
    setTimeout(() => {
      try {
        const stored = JSON.parse(localStorage.getItem('techmecs_waitlist') || '[]');
        if (!stored.includes(trimmed)) {
          stored.push(trimmed);
          localStorage.setItem('techmecs_waitlist', JSON.stringify(stored));
        }
      } catch (err) {
        // ignore
      }
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleResetAndClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
      setError('');
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleResetAndClose}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(10, 10, 10, 0.65)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="waitlist-title"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '460px',
              backgroundColor: '#161617',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.6)',
              padding: '36px 32px',
              color: '#f5f4ec',
              zIndex: 1001,
            }}
          >
            {/* Close Button */}
            <button
              onClick={handleResetAndClose}
              aria-label="Close modal"
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.2s, transform 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.16)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 1L13 13M1 13L13 1"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {!submitted ? (
              <div>
                {/* Pill Tag */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    fontSize: '12px',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    color: 'rgba(255, 255, 255, 0.8)',
                    marginBottom: '18px',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#55e69e',
                      display: 'inline-block',
                    }}
                  />
                  EARLY ACCESS
                </div>

                {/* Title */}
                <h3
                  id="waitlist-title"
                  style={{
                    fontFamily: '"Stack Sans Headline", -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '28px',
                    fontWeight: 700,
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                    margin: '0 0 10px 0',
                    color: '#ffffff',
                  }}
                >
                  Join the waitlist
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.5,
                    color: 'rgba(255, 255, 255, 0.65)',
                    margin: '0 0 24px 0',
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  Be the first to know when we launch. Enter your email below to receive private access
                  and collection updates.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      autoFocus
                      style={{
                        width: '100%',
                        padding: '14px 18px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.14)',
                        borderRadius: '14px',
                        fontSize: '15px',
                        color: '#ffffff',
                        outline: 'none',
                        transition: 'border-color 0.2s, background-color 0.2s',
                        boxSizing: 'border-box',
                        fontFamily: '"Inter", sans-serif',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.14)';
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                      }}
                    />
                  </div>

                  {error && (
                    <div style={{ color: '#ff6b6b', fontSize: '13px', marginTop: '-4px' }}>
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '14px 20px',
                      backgroundColor: '#f3ece6',
                      color: '#161617',
                      border: 'none',
                      borderRadius: '14px',
                      fontSize: '15px',
                      fontWeight: 600,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      transition: 'transform 0.15s, opacity 0.15s',
                      opacity: loading ? 0.7 : 1,
                      fontFamily: '"Inter", sans-serif',
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) e.currentTarget.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                      if (!loading) e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    {loading ? 'Submitting...' : 'Join waitlist'}
                  </button>
                </form>

                <p
                  style={{
                    fontSize: '12px',
                    color: 'rgba(255, 255, 255, 0.4)',
                    textAlign: 'center',
                    marginTop: '16px',
                    marginBottom: 0,
                  }}
                >
                  No spam, ever. Unsubscribe at any time.
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '16px 8px' }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(85, 230, 158, 0.15)',
                    color: '#55e69e',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px auto',
                  }}
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 13L9 17L19 7"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <h3
                  style={{
                    fontFamily: '"Stack Sans Headline", sans-serif',
                    fontSize: '26px',
                    fontWeight: 700,
                    margin: '0 0 10px 0',
                    color: '#fff',
                  }}
                >
                  You're on the list!
                </h3>

                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.5,
                    color: 'rgba(255, 255, 255, 0.7)',
                    marginBottom: '24px',
                  }}
                >
                  Thank you for joining. We've recorded your email ({email}) and will notify you as soon
                  as the new experience goes live.
                </p>

                <button
                  onClick={handleResetAndClose}
                  style={{
                    padding: '12px 28px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  Done
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
