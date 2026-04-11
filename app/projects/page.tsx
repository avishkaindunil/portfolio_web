'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SplitWords } from '../_components/Reveal';
import Reveal from '../_components/Reveal';

const PROJECTS = [
  {
    n:'01', name:'SwiftPOS', label:'Cloud-Based SaaS POS System',
    desc:'A cloud-based SaaS point-of-sale application for retail shops with modules for billing, products, stock management, reporting, and role-based employee access control.',
    stack:['Java','Spring Boot','React','MySQL','REST APIs','Microservices'],
    badge:'Ongoing',
    gradient:'linear-gradient(135deg, rgba(212,180,106,0.18) 0%, rgba(180,130,60,0.08) 50%, transparent 100%)',
    icon:'◈',
  },
  {
    n:'02', name:'PrimePro', label:'Car Wash Service Platform',
    desc:'Full-stack platform for users to find and book nearby car wash centers via mobile app, with a web management system for booking, payroll, and inventory tracking.',
    stack:['React','React Native','Spring Boot','PostgreSQL','GCP','Firebase'],
    badge:'Completed',
    gradient:'linear-gradient(135deg, rgba(100,160,220,0.12) 0%, rgba(80,130,200,0.06) 50%, transparent 100%)',
    icon:'⬡',
  },
  {
    n:'03', name:'SkillSparQ', label:'Freelance Marketplace',
    desc:'A platform connecting Sri Lankan freelancers with local clients, designed with a focus on usability, accessibility, and practical support for freelance career growth.',
    stack:['PHP','HTML','CSS','JavaScript','MySQL','GitHub'],
    badge:'Completed',
    gradient:'linear-gradient(135deg, rgba(160,220,140,0.10) 0%, rgba(120,190,100,0.05) 50%, transparent 100%)',
    icon:'◎',
  },
  {
    n:'04', name:'SEDS UCSC', label:'University Organization Site',
    desc:'Designed and developed the SEDS University of Colombo website and blog, turning them into engaging platforms for the student technology community.',
    stack:['WordPress','PHP','jQuery','MySQL','GitHub Pages'],
    badge:'Completed',
    gradient:'linear-gradient(135deg, rgba(220,120,160,0.10) 0%, rgba(200,100,140,0.05) 50%, transparent 100%)',
    icon:'◇',
  },
];

function ProjectCard({ p, index }: { p: typeof PROJECTS[0]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once:true, margin:'-8%' });
  const isOngoing = p.badge === 'Ongoing';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity:0, y:40 }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.9, ease:[0.16,1,0.3,1], delay:index*0.1 }}
      className="proj-card glass"
    >
      {/* Visual header with gradient + icon */}
      <div style={{
        margin:'-44px -44px 32px', padding:'36px 44px 28px',
        background: p.gradient, borderBottom:'1px solid var(--border)',
        display:'flex', justifyContent:'space-between', alignItems:'flex-start',
      }}>
        <span style={{ fontFamily:'var(--font-serif)', fontSize:60, fontWeight:300, color:'rgba(212,180,106,0.22)', lineHeight:1 }}>{p.n}</span>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <span style={{ fontFamily:'var(--font-serif)', fontSize:28, color:'var(--gold)', opacity:0.7 }}>{p.icon}</span>
          <motion.span
            whileHover={{ scale:1.05 }}
            style={{
              fontFamily:'var(--font-sans)', fontSize:9, letterSpacing:'0.15em',
              textTransform:'uppercase',
              color:   isOngoing ? 'var(--gold)' : 'var(--muted)',
              padding:'5px 12px', border:`1px solid ${isOngoing ? 'var(--gold)' : 'var(--muted)'}`,
              opacity: isOngoing ? 1 : 0.65, display:'block',
            }}
          >
            {p.badge}
          </motion.span>
        </div>
      </div>

      <h3 style={{ fontFamily:'var(--font-serif)', fontSize:32, fontWeight:400, color:'var(--text)', margin:'0 0 6px' }}>{p.name}</h3>
      <p style={{ fontFamily:'var(--font-sans)', fontSize:10, letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--gold)', marginBottom:20 }}>{p.label}</p>
      <p style={{ fontFamily:'var(--font-sans)', fontSize:13, lineHeight:1.88, color:'var(--text-dim)', marginBottom:28 }}>{p.desc}</p>

      <div style={{ borderTop:'1px solid var(--border)', paddingTop:20, display:'flex', flexWrap:'wrap', gap:8 }}>
        {p.stack.map(s => (
          <span key={s} style={{
            fontFamily:'var(--font-sans)', fontSize:10, letterSpacing:'0.06em',
            color:'var(--muted)', padding:'4px 10px', border:'1px solid var(--border)', borderRadius:1,
          }}>
            {s}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero" style={{ paddingTop:120 }}>
        <div className="page-hero-bg" />
        {/* Abstract grid graphic */}
        <div aria-hidden style={{ position:'absolute', right:'var(--r-page)', top:'50%', transform:'translateY(-50%)', pointerEvents:'none', opacity:0.6 }}>
          <svg width="320" height="280" viewBox="0 0 320 280" fill="none">
            {[0,1,2,3].map(col => [0,1,2].map(row => (
              <motion.rect
                key={`${col}-${row}`}
                x={col*80} y={row*88} width={72} height={80}
                fill="none" stroke="var(--gold-border)" strokeWidth="1"
                initial={{ opacity:0, scale:0.9 }}
                animate={{ opacity:1, scale:1 }}
                transition={{ duration:0.6, delay:(col+row)*0.08 }}
                style={{ originX:`${col*80+36}px`, originY:`${row*88+40}px` }}
              />
            )))}
            {/* highlight one cell */}
            <motion.rect x={0} y={0} width={72} height={80}
              fill="var(--gold-dim)"
              animate={{ opacity:[0.5,1,0.5] }}
              transition={{ duration:2.5, repeat:Infinity }}
            />
          </svg>
        </div>
        <div style={{ position:'relative', zIndex:1, maxWidth:1200, margin:'0 auto', width:'100%' }}>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3, duration:0.7 }}
            style={{ fontFamily:'var(--font-sans)', fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--gold)', marginBottom:16 }}>
            03 · Projects
          </motion.p>
          <h1 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(52px,7.5vw,96px)', fontWeight:300, lineHeight:0.9, letterSpacing:'-0.02em' }}>
            <SplitWords text="Things I've" delay={0.3} />
            <br />
            <SplitWords text="built & shipped" delay={0.5} style={{ fontStyle:'italic', color:'var(--gold)' }} />
          </h1>
        </div>
      </section>

      <main style={{ maxWidth:1200, margin:'0 auto', padding:'80px var(--r-page) 120px' }}>
        <Reveal>
          <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:64 }}>
            <div style={{ width:36, height:1, background:'var(--gold)' }} />
            <span style={{ fontFamily:'var(--font-sans)', fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--muted)' }}>Selected Work</span>
            <div style={{ flex:1, height:1, background:'var(--border)' }} />
            <span style={{ fontFamily:'var(--font-sans)', fontSize:10, color:'var(--muted)' }}>{PROJECTS.length} projects</span>
          </div>
        </Reveal>

        <div className="proj-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.n} p={p} index={i} />)}
        </div>
      </main>
    </>
  );
}
