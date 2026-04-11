'use client';

import { useEffect, useRef, type CSSProperties } from 'react';

const SKILLS_FLAT = [
  'Java',
  'Spring Boot',
  'React',
  'Kotlin',
  'PostgreSQL',
  'Node.js',
  'MySQL',
  'Python',
  'Docker',
  'Firebase',
  'AWS',
  'GCP',
  'TypeScript',
  'Flutter',
  'Android',
  'MongoDB',
  'Redis',
  'REST',
  'GraphQL',
  'Git',
];

interface SkillNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  label: string;
  r: number;
}

type SkillsCanvasProps = {
  className?: string;
  style?: CSSProperties;
};

export default function SkillsCanvas({
  className,
  style,
}: SkillsCanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let nodes: SkillNode[] = [];

    const mouse = { x: -999, y: -999 };

    const getCssVar = (name: string, fallback: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

    const goldColor = () => getCssVar('--gold', '#d4b46a');
    const glassBgColor = () => getCssVar('--glass-bg', 'rgba(255, 255, 255, 0.06)');

    const init = () => {
      nodes = SKILLS_FLAT.map((label) => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        label,
        r: label.length > 6 ? 36 : 30,
      }));
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      init();
    };

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouse.x = -999;
      mouse.y = -999;
    };

    const tick = () => {
      animId = window.requestAnimationFrame(tick);

      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);

      const gold = goldColor();
      const glassBg = glassBgColor();

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < n.r || n.x > W - n.r) n.vx *= -1;
        if (n.y < n.r || n.y > H - n.r) n.vy *= -1;

        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);

        if (d < 80 && d > 0) {
          n.vx += (dx / d) * 0.18;
          n.vy += (dy / d) * 0.18;
        }

        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (speed > 1.2) {
          n.vx = (n.vx / speed) * 1.2;
          n.vy = (n.vy / speed) * 1.2;
        }
      });

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);

          if (d < 140) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = gold;
            ctx.globalAlpha = (1 - d / 140) * 0.2;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        ctx.globalAlpha = 1;

        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 1.6);
        glow.addColorStop(0, `${gold}18`);
        glow.addColorStop(1, `${gold}00`);

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 1.6, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = glassBg;
        ctx.strokeStyle = gold;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.85;
        ctx.fill();
        ctx.globalAlpha = 0.55;
        ctx.stroke();

        ctx.globalAlpha = 0.9;
        ctx.fillStyle = gold;
        ctx.font = '500 10px var(--font-sans, Syne, system-ui)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(n.label, n.x, n.y);
      });

      ctx.globalAlpha = 1;
    };

    resize();
    tick();

    canvas.addEventListener('mousemove', onMouse);
    canvas.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', resize);

    return () => {
      window.cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', onMouse);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        ...style,
      }}
    />
  );
}
