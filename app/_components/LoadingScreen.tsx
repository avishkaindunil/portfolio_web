'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount]   = useState(0);
  const [phase, setPhase]   = useState<'count' | 'name' | 'done'>('count');
  const NAME = 'AVISHKA  INDUNIL';

  useEffect(() => {
    const duration = 1700;
    const start    = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      setCount(Math.floor(eased * 100));
      if (t < 1) { requestAnimationFrame(tick); return; }
      setCount(100);
      setTimeout(() => setPhase('name'), 180);
      setTimeout(() => setPhase('done'), 1050);
      setTimeout(onComplete, 1680);
    };

    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="loader"
          exit={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#080705',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-serif)',
          }}
        >
          {/* Noise overlay */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.04,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '180px', pointerEvents: 'none',
          }} />

          {/* Ambient glow */}
          <div style={{
            position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)',
            width: 600, height: 600, borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(212,180,106,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Monogram */}
          <motion.div
            initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 88, fontWeight: 300, color: '#d4b46a',
              lineHeight: 1, letterSpacing: '-0.03em', marginBottom: 40,
            }}
          >
            AI.
          </motion.div>

          {/* Character reveal */}
          <div style={{ height: 18, overflow: 'hidden', marginBottom: 64 }}>
            <div style={{ display: 'flex' }}>
              {NAME.split('').map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ y: '110%' }}
                  animate={phase === 'name' ? { y: '0%' } : { y: '110%' }}
                  transition={{
                    duration: 0.55, ease: [0.16, 1, 0.3, 1],
                    delay: phase === 'name' ? i * 0.032 : 0,
                  }}
                  style={{
                    fontFamily: 'var(--font-sans)', fontSize: 10,
                    letterSpacing: '0.38em', color: 'rgba(212,180,106,0.55)',
                    display: 'inline-block', whiteSpace: 'pre',
                  }}
                >
                  {ch}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Counter */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
              position: 'absolute', bottom: 52, right: 52,
              fontFamily: 'var(--font-serif)', fontSize: 12,
              fontStyle: 'italic', color: 'rgba(212,180,106,0.4)',
              minWidth: 32, textAlign: 'right',
            }}
          >
            {count}
          </motion.div>

          {/* Progress bar */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
            background: 'rgba(212,180,106,0.08)',
          }}>
            <motion.div
              style={{
                height: '100%', background: 'var(--gold)',
                transformOrigin: 'left', scaleX: count / 100,
              }}
            />
          </div>

          {/* Location tag */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 0.38 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{
              position: 'absolute', bottom: 52, left: 52,
              fontFamily: 'var(--font-sans)', fontSize: 9,
              letterSpacing: '0.25em', textTransform: 'uppercase',
              color: '#d4b46a',
            }}
          >
            Colombo · Sri Lanka
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
