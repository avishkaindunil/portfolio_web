'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Reveal({
  children, delay = 0, y = 30, className = '', as = 'div',
}: {
  children: React.ReactNode;
  delay?:   number;
  y?:       number;
  className?:string;
  as?:      keyof JSX.IntrinsicElements;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  const Tag = as as React.ElementType;
  const isMotion = true;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Word-by-word split text ───────────────────────────────────────────── */
export function SplitWords({
  text, delay = 0, style = {}, className = '',
}: {
  text:      string;
  delay?:    number;
  style?:    React.CSSProperties;
  className?:string;
}) {
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <span ref={ref} className={className} style={{ display: 'inline', ...style }}>
      {text.split(' ').map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: '0.35em' }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.07 }}
          style={{ display: 'inline-block', marginRight: '0.26em' }}
        >
          {w}
        </motion.span>
      ))}
    </span>
  );
}
