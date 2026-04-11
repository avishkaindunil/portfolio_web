'use client';
import { useEffect, useRef } from 'react';

const SKILLS_FLAT = [
  'Java','Spring Boot','React','Kotlin','PostgreSQL',
  'Node.js','MySQL','Python','Docker','Firebase',
  'AWS','GCP','TypeScript','Flutter','Android',
  'MongoDB','Redis','REST','GraphQL','Git',
];

interface Node { x:number; y:number; vx:number; vy:number; label:string; r:number; }

export default function SkillsCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let nodes: Node[] = [];

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      init();
    };

    const init = () => {
      nodes = SKILLS_FLAT.map(label => ({
        x:  Math.random() * canvas.width,
        y:  Math.random() * canvas.height,
        vx: (Math.random()-0.5) * 0.5,
        vy: (Math.random()-0.5) * 0.5,
        label,
        r:  label.length > 6 ? 36 : 30,
      }));
    };

    const mouse = { x: -999, y: -999 };
    const onMouse = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    canvas.addEventListener('mousemove', onMouse);

    // Read CSS var for gold color
    const goldColor = () => getComputedStyle(document.documentElement).getPropertyValue('--gold').trim() || '#d4b46a';

    const tick = () => {
      animId = requestAnimationFrame(tick);
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const gold = goldColor();

      // Move nodes
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < n.r || n.x > W-n.r) n.vx *= -1;
        if (n.y < n.r || n.y > H-n.r) n.vy *= -1;

        // mouse repel
        const dx = n.x - mouse.x, dy = n.y - mouse.y;
        const d  = Math.sqrt(dx*dx+dy*dy);
        if (d < 80 && d > 0) { n.vx += (dx/d)*0.18; n.vy += (dy/d)*0.18; }

        // speed cap
        const spd = Math.sqrt(n.vx*n.vx+n.vy*n.vy);
        if (spd > 1.2) { n.vx = (n.vx/spd)*1.2; n.vy = (n.vy/spd)*1.2; }
      });

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i+1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d  = Math.sqrt(dx*dx+dy*dy);
          if (d < 140) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = gold;
            ctx.globalAlpha = (1 - d/140) * 0.2;
            ctx.lineWidth   = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach(n => {
        ctx.globalAlpha = 1;

        // Glow
        const grd = ctx.createRadialGradient(n.x,n.y,0, n.x,n.y, n.r*1.6);
        grd.addColorStop(0,  `${gold}18`);
        grd.addColorStop(1,  `${gold}00`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r*1.6, 0, Math.PI*2);
        ctx.fill();

        // Circle
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI*2);
        ctx.fillStyle   = 'var(--glass-bg)';
        ctx.strokeStyle = gold;
        ctx.lineWidth   = 1;
        ctx.globalAlpha = 0.85;
        ctx.fill();
        ctx.globalAlpha = 0.55;
        ctx.stroke();

        // Label
        ctx.globalAlpha = 0.9;
        ctx.fillStyle   = gold;
        ctx.font        = `500 10px var(--font-sans, Syne, system-ui)`;
        ctx.textAlign   = 'center';
        ctx.textBaseline= 'middle';
        ctx.fillText(n.label, n.x, n.y);
      });
    };

    resize();
    tick();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}
