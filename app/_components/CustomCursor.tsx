'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  // Dot: extremely fast — near-instant
  const dx = useSpring(mx, { stiffness: 3000, damping: 55, mass: 0.08 });
  const dy = useSpring(my, { stiffness: 3000, damping: 55, mass: 0.08 });

  // Ring: snappy but with a tiny lag for elegance
  const rx = useSpring(mx, { stiffness: 600, damping: 42, mass: 0.2 });
  const ry = useSpring(my, { stiffness: 600, damping: 42, mass: 0.2 });

  const [hover,   setHover]   = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setVisible(true);
      const t = e.target as HTMLElement;
      setHover(!!t.closest('button,a,.proj-card,.exp-card,.card,.skill-tag,.btn,.btn-gold'));
    };
    const hide  = () => setVisible(false);
    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', hide);
    return () => { window.removeEventListener('mousemove', move); document.removeEventListener('mouseleave', hide); };
  }, [mx, my]);

  const dotSize  = hover ? 11 : 7;
  const ringSize = hover ? 52 : 34;

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{ x: dx, y: dy, translateX: '-50%', translateY: '-50%', opacity: visible ? 1 : 0 }}
        animate={{ width: dotSize, height: dotSize }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className="cursor-ring"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%', opacity: visible ? 1 : 0 }}
        animate={{ width: ringSize, height: ringSize, borderColor: hover ? 'var(--gold)' : 'var(--gold-soft)' }}
        transition={{ duration: 0.25 }}
      />
    </>
  );
}
