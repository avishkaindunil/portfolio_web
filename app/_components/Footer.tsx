'use client';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const LINKS = [
  { label: 'About',      href: '/about'      },
  { label: 'Experience', href: '/experience' },
  { label: 'Projects',   href: '/projects'   },
  { label: 'Skills',     href: '/skills'     },
  { label: 'Contact',    href: '/contact'    },
];

const SOCIAL = [
  {
    label: 'GitHub',
    href:  'https://github.com/avishkaindunil',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href:  'https://linkedin.com/in/avishkaindunil',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    href:  'mailto:haavishkaindunil@gmail.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m2 7 10 7 10-7"/>
      </svg>
    ),
  },
];

function BackToTop() {
  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.94 }}
      style={{
        background: 'none', border: '1px solid var(--gold-border)',
        color: 'var(--muted)', cursor: 'none', padding: '10px 18px',
        fontFamily: 'var(--font-sans)', fontSize: 9,
        letterSpacing: '0.22em', textTransform: 'uppercase',
        display: 'flex', alignItems: 'center', gap: 8,
        transition: 'color 0.3s, border-color 0.3s',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--gold)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--gold)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--gold-border)'; }}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M5 8V2M2 5l3-3 3 3"/>
      </svg>
      Back to top
    </motion.button>
  );
}

export default function Footer() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <footer
      ref={ref}
      style={{
        position: 'relative', overflow: 'hidden',
        background: 'var(--bg-2)',
        borderTop: '1px solid var(--border)',
      }}
    >
      {/* Gradient glow top-left */}
      <div style={{
        position: 'absolute', top: 0, left: '10%',
        width: 700, height: 1,
        background: 'linear-gradient(to right, transparent, var(--gold-soft), transparent)',
        pointerEvents: 'none',
      }} />

      {/* Ambient orb */}
      <div style={{
        position: 'absolute', bottom: '-20%', right: '-5%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(212,180,106,0.04) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Big background name */}
      <div
        aria-hidden
        style={{
          position: 'absolute', bottom: '-0.08em', left: 'var(--r-page)',
          fontFamily: 'var(--font-serif)', fontWeight: 300,
          fontSize: 'clamp(80px, 13vw, 190px)',
          letterSpacing: '-0.04em', lineHeight: 1,
          color: 'rgba(212,180,106,0.03)',
          userSelect: 'none', pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        Avishka Indunil
      </div>

      {/* ─── Main footer body ─── */}
      <div style={{
        padding: 'clamp(64px,8vw,112px) var(--r-page) 0',
        maxWidth: 1400, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 'clamp(40px, 6vw, 80px)',
        position: 'relative', zIndex: 1,
      }}>

        {/* Col 1 — Brand */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{
            fontFamily: 'var(--font-serif)', fontSize: 28,
            fontWeight: 300, color: 'var(--gold)',
            letterSpacing: '-0.01em', marginBottom: 20,
          }}>
            AI.
          </div>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: 12,
            lineHeight: 1.9, color: 'var(--text-dim)',
            maxWidth: 260, marginBottom: 28,
          }}>
            Crafting scalable software with precision and purpose. Based in Colombo, available worldwide.
          </p>
          {/* Availability badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 9,
            padding: '8px 16px',
            border: '1px solid rgba(74,222,128,0.25)',
            background: 'rgba(74,222,128,0.05)',
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: '#4ade80',
              boxShadow: '0 0 10px #4ade80',
              animation: 'pulseGreen 2s ease-in-out infinite',
              flexShrink: 0,
            }} />
            <span style={{
              fontFamily: 'var(--font-sans)', fontSize: 9,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'rgba(74,222,128,0.8)',
            }}>
              Available for hire
            </span>
          </div>
        </motion.div>

        {/* Col 2 — Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: 9,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--muted)', marginBottom: 24,
          }}>
            Navigation
          </p>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {LINKS.map(({ label, href }, i) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.06 }}
              >
                <Link
                  href={href}
                  style={{
                    fontFamily: 'var(--font-sans)', fontSize: 13,
                    color: 'var(--text-dim)', textDecoration: 'none',
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '7px 0',
                    borderBottom: '1px solid transparent',
                    transition: 'color 0.25s, border-color 0.25s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)';
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--gold-border)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-dim)';
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'transparent';
                  }}
                >
                  <span style={{ width: 12, height: 1, background: 'var(--muted)', display: 'inline-block', flexShrink: 0 }} />
                  {label}
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>

        {/* Col 3 — Contact */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: 9,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--muted)', marginBottom: 24,
          }}>
            Get in touch
          </p>
          <p style={{
            fontFamily: 'var(--font-serif)', fontSize: 22,
            fontWeight: 300, color: 'var(--text)', lineHeight: 1.3,
            marginBottom: 24, fontStyle: 'italic',
          }}>
            Have a project in mind? Let's build something great.
          </p>
          <Link
            href="/contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              fontFamily: 'var(--font-sans)', fontSize: 10,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--gold)', textDecoration: 'none',
              padding: '14px 28px',
              border: '1px solid var(--gold-border)',
              transition: 'background 0.3s, box-shadow 0.3s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'var(--gold-dim)';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 24px var(--gold-glow)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
            }}
          >
            Start a conversation
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M2 6h8M6 2l4 4-4 4"/>
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* ─── Bottom bar ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{
          maxWidth: 1400, margin: '0 auto',
          padding: 'clamp(32px,4vw,52px) var(--r-page)',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap',
          gap: 16, position: 'relative', zIndex: 1,
          borderTop: '1px solid var(--border)',
          marginTop: 'clamp(48px,7vw,96px)',
        }}
      >
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {SOCIAL.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{
                width: 38, height: 38, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                color: 'var(--muted)',
                border: '1px solid var(--border)',
                transition: 'color 0.25s, border-color 0.25s, background 0.25s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--gold-border)';
                (e.currentTarget as HTMLAnchorElement).style.background = 'var(--gold-dim)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted)';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)';
                (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
              }}
            >
              {icon}
            </a>
          ))}
        </div>

        <span style={{
          fontFamily: 'var(--font-sans)', fontSize: 10,
          letterSpacing: '0.1em', color: 'var(--muted)',
        }}>
          © {new Date().getFullYear()} Avishka Indunil · All Rights Reserved
        </span>

        <BackToTop />
      </motion.div>
    </footer>
  );
}
