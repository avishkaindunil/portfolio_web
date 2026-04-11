'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useTheme } from './ThemeProvider';

const LINKS = [
  { href: '/about',      label: 'About'      },
  { href: '/experience', label: 'Experience' },
  { href: '/projects',   label: 'Projects'   },
  { href: '/skills',     label: 'Skills'     },
  { href: '/contact',    label: 'Contact'    },
];

export default function Nav() {
  const pathname = usePathname();
  const { toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      {/* Reading progress bar */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: 2,
          background: 'var(--gold)', transformOrigin: '0%', scaleX,
          zIndex: 9990, transformBox: 'fill-box',
        }}
      />

      <motion.header
        className={`nav${scrolled ? ' scrolled' : ''}`}
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.85, ease: [0.16,1,0.3,1], delay: 0.1 }}
        style={{ paddingTop: 24 }}
      >
        {/* Monogram */}
        <Link href="/" style={{ textDecoration:'none' }}>
          <motion.span
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            style={{ fontFamily:'var(--font-serif)', fontSize:22, fontWeight:400, letterSpacing:'0.08em', color:'var(--gold)' }}
          >
            AI.
          </motion.span>
        </Link>

        {/* Desktop links */}
        <nav className="nav-links-desktop" style={{ display:'flex', alignItems:'center', gap:'clamp(14px,2.5vw,32px)' }}>
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`nav-link${pathname === href ? ' active' : ''}`}
            >
              {label}
            </Link>
          ))}

          <div style={{ width:1, height:16, background:'var(--border-mid)', margin:'0 4px' }} />

          <button className="toggle" onClick={toggle} aria-label="Toggle theme">
            <div className="toggle__thumb" />
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          style={{
            display: 'none', background: 'none', border: 'none',
            cursor: 'none', padding: 8, gap: 5, flexDirection: 'column',
          }}
        >
          {[0,1,2].map(i => (
            <motion.span
              key={i}
              animate={{
                rotate: menuOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                y:      menuOpen ? (i === 0 ? 7  : i === 2 ? -7 : 0)  : 0,
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
              transition={{ duration: 0.28 }}
              style={{ display:'block', width:22, height:1, background:'var(--text-dim)', transformOrigin:'center' }}
            />
          ))}
        </button>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -16, pointerEvents: 'none' }}
        transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}
        style={{
          position: 'fixed', top: 72, left: 0, right: 0, zIndex: 199,
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--gold-border)',
          padding: '24px var(--r-page)',
          display: 'flex', flexDirection: 'column', gap: 4,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        {LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`nav-link${pathname === href ? ' active' : ''}`}
            style={{ padding: '12px 0', fontSize: 12 }}
          >
            {label}
          </Link>
        ))}
        <div style={{ height: 1, background: 'var(--border)', margin: '12px 0' }} />
        <button className="toggle" onClick={toggle} aria-label="Toggle theme" style={{ alignSelf: 'flex-start' }}>
          <div className="toggle__thumb" />
        </button>
      </motion.div>
    </>
  );
}
