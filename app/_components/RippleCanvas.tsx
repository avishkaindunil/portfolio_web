'use client';
import { useEffect, useRef } from 'react';

interface Ripple {
  x: number;
  y: number;
  r: number;
  maxR: number;
  alpha: number;
  speed: number;
}

export default function RippleCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    const ripples: Ripple[] = [];
    let animId: number;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const addRipple = (x: number, y: number) => {
      const maxR = 80 + Math.random() * 60;
      ripples.push({ x, y, r: 0, maxR, alpha: 0.55, speed: 1.2 + Math.random() * 0.8 });
      if (ripples.length > 24) ripples.splice(0, 1);
    };

    let lastX = -1, lastY = -1, moveThrottle = 0;
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > canvas.width || y > canvas.height) return;
      if (++moveThrottle % 3 !== 0) return;
      const dist = Math.hypot(x - lastX, y - lastY);
      if (dist > 20) { addRipple(x, y); lastX = x; lastY = y; }
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      addRipple(e.clientX - rect.left, e.clientY - rect.top);
    };

    // Seed some ambient ripples
    const seedRipples = () => {
      setInterval(() => {
        addRipple(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
        );
      }, 1800);
    };
    seedRipples();

    window.addEventListener('mousemove', onMove, { passive: true });
    canvas.addEventListener('click', onClick);
    window.addEventListener('resize', resize, { passive: true });

    const tick = () => {
      animId = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r     += rp.speed;
        rp.alpha -= 0.008;

        if (rp.alpha <= 0) { ripples.splice(i, 1); continue; }

        // Outer ring
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(212,180,106,${rp.alpha * 0.7})`;
        ctx.lineWidth   = 1.2;
        ctx.stroke();

        // Inner glow ring
        if (rp.r > 12) {
          ctx.beginPath();
          ctx.arc(rp.x, rp.y, rp.r * 0.6, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(232,204,136,${rp.alpha * 0.3})`;
          ctx.lineWidth   = 0.6;
          ctx.stroke();
        }
      }
    };
    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('click', onClick);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'crosshair' }}
    />
  );
}
