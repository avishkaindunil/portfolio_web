'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { SplitWords } from '../_components/Reveal';
import Reveal from '../_components/Reveal';

/* Animated concentric rings graphic */
function RingsGraphic() {
  return (
    <div style={{ position:'relative', width:320, height:320, flexShrink:0 }}>
      <svg viewBox="0 0 320 320" fill="none" style={{ width:'100%', height:'100%' }}>
        {[140,110,80,52,28].map((r, i) => (
          <motion.circle
            key={r} cx="160" cy="160" r={r}
            stroke="var(--gold)"
            strokeWidth={i === 4 ? 1.5 : 1}
            opacity={0.06 + i * 0.06}
            strokeDasharray={i % 2 === 0 ? '5 4' : 'none'}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            style={{ originX:'160px', originY:'160px' }}
            transition={{ duration: 18 + i * 8, repeat:Infinity, ease:'linear' }}
          />
        ))}
        {/* Center */}
        <motion.circle cx="160" cy="160" r="18"
          fill="var(--gold-dim)" stroke="var(--gold)" strokeWidth="1"
          animate={{ scale:[1, 1.12, 1], opacity:[0.8, 1, 0.8] }}
          transition={{ duration:2.4, repeat:Infinity, ease:'easeInOut' }}
          style={{ originX:'160px', originY:'160px' }}
        />
        <text x="160" y="165" textAnchor="middle" dominantBaseline="middle"
          fontFamily="var(--font-serif)" fontSize="14" fill="var(--gold)" fontStyle="italic">
          AI
        </text>
        {/* Orbit dots */}
        {[0, 72, 144, 216, 288].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x   = 160 + 80 * Math.cos(rad);
          const y   = 160 + 80 * Math.sin(rad);
          return (
            <motion.circle key={i} cx={x} cy={y} r="4"
              fill="var(--gold)" opacity="0.5"
              animate={{ opacity:[0.3, 0.8, 0.3] }}
              transition={{ duration:1.8, delay:i*0.36, repeat:Infinity }}
            />
          );
        })}
      </svg>
    </div>
  );
}

const SOCIALS = [
  { label:'Email',    href:'mailto:haavishkaindunil@gmail.com', display:'haavishkaindunil@gmail.com' },
  { label:'LinkedIn', href:'https://linkedin.com/in/avishkaindunil', display:'linkedin.com/in/avishkaindunil' },
  { label:'GitHub',   href:'https://github.com/avishkaindunil',     display:'github.com/avishkaindunil' },
  { label:'Phone',    href:'tel:+94704951749',                        display:'+94 70 495 1749' },
];

export default function ContactPage() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once:true, margin:'-10%' });
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('haavishkaindunil@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero" style={{ paddingTop:120 }}>
        <div className="page-hero-bg" />
        <div style={{ position:'relative', zIndex:1, maxWidth:1200, margin:'0 auto', width:'100%' }}>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3, duration:0.7 }}
            style={{ fontFamily:'var(--font-sans)', fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--gold)', marginBottom:16 }}>
            05 · Contact
          </motion.p>
          <h1 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(52px,7.5vw,96px)', fontWeight:300, lineHeight:0.9, letterSpacing:'-0.02em' }}>
            <SplitWords text="Let's build" delay={0.3} />
            <br />
            <SplitWords text="something great" delay={0.5} style={{ fontStyle:'italic', color:'var(--gold)' }} />
          </h1>
        </div>
      </section>

      <main style={{ maxWidth:1200, margin:'0 auto', padding:'80px var(--r-page) 120px' }} ref={ref}>

        {/* ── Main CTA + Rings ── */}
        <div style={{ display:'flex', gap:80, alignItems:'center', marginBottom:96, flexWrap:'wrap' }}>
          <motion.div
            initial={{ opacity:0, y:24 }}
            animate={inView ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.9, ease:[0.16,1,0.3,1] }}
            style={{ flex:1, minWidth:260 }}
          >
            <p style={{ fontFamily:'var(--font-sans)', fontSize:14, lineHeight:1.95, color:'var(--text-dim)', marginBottom:36 }}>
              I&apos;m currently open to new opportunities — whether it&apos;s a full-time role,
              a freelance project, or just a great conversation about tech.
              Don&apos;t hesitate to reach out.
            </p>
            <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
              <a href="mailto:haavishkaindunil@gmail.com" className="btn-gold">Send Email</a>
              <button className="btn" onClick={copyEmail} style={{ border:'1px solid var(--border-mid)' }}>
                {copied ? '✓ Copied!' : 'Copy Email'}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity:0, scale:0.85 }}
            animate={inView ? { opacity:1, scale:1 } : {}}
            transition={{ duration:0.9, ease:[0.16,1,0.3,1], delay:0.15 }}
          >
            <RingsGraphic />
          </motion.div>
        </div>

        {/* ── Social Links ── */}
        <Reveal>
          <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
            {SOCIALS.map(({ label, href, display }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="glass"
                initial={{ opacity:0, x:-20 }}
                whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true }}
                transition={{ duration:0.6, delay:i*0.1 }}
                whileHover={{ x:8 }}
                style={{
                  padding:'28px 36px', display:'flex', justifyContent:'space-between',
                  alignItems:'center', textDecoration:'none', gap:16,
                  borderRadius:2,
                }}
              >
                <div style={{ display:'flex', alignItems:'center', gap:20 }}>
                  <span style={{ fontFamily:'var(--font-sans)', fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--muted)', width:64 }}>{label}</span>
                  <span style={{ fontFamily:'var(--font-sans)', fontSize:13, color:'var(--text)' }}>{display}</span>
                </div>
                <motion.span
                  animate={{ x:[0,5,0] }}
                  transition={{ duration:1.8, repeat:Infinity, ease:'easeInOut' }}
                  style={{ color:'var(--gold)', fontSize:16 }}
                >
                  →
                </motion.span>
              </motion.a>
            ))}
          </div>
        </Reveal>

        {/* ── References ── */}
        {/* <Reveal delay={0.1}>
          <div style={{ marginTop:72 }}>
            <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:32 }}>
              <div style={{ width:36, height:1, background:'var(--gold)' }} />
              <span style={{ fontFamily:'var(--font-sans)', fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--muted)' }}>References</span>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2 }}>
              {[
                { name:'Charitha Kariyawasam', title:'Software Engineering Manager', company:'Zebra Technologies', email:'charitha.kariyawasam@zebra.com' },
                { name:'Kushan Ravindu Samaranayake', title:'Associate Tech Lead', company:'Aventude Pvt. Ltd.', email:'kushan.s@aventude.com' },
              ].map(ref => (
                <motion.div key={ref.name} className="glass" whileHover={{ y:-3 }} style={{ padding:'32px' }}>
                  <div style={{ fontFamily:'var(--font-sans)', fontSize:13, color:'var(--text)', marginBottom:6 }}>{ref.name}</div>
                  <div style={{ fontFamily:'var(--font-sans)', fontSize:11, color:'var(--muted)', marginBottom:4 }}>{ref.title}</div>
                  <div style={{ fontFamily:'var(--font-sans)', fontSize:11, color:'var(--gold)', marginBottom:10 }}>{ref.company}</div>
                  <a href={`mailto:${ref.email}`} style={{ fontFamily:'var(--font-sans)', fontSize:11, color:'var(--text-dim)', textDecoration:'none' }}>{ref.email}</a>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal> */}
      </main>

      {/* Footer */}
      {/* <footer style={{ padding:'24px var(--r-page)', borderTop:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12, maxWidth:1200, margin:'0 auto' }}>
        <span style={{ fontFamily:'var(--font-serif)', fontSize:14, color:'var(--muted)', fontStyle:'italic' }}>Avishka Indunil</span>
        <span style={{ fontFamily:'var(--font-sans)', fontSize:10, letterSpacing:'0.12em', color:'var(--muted)' }}>© 2025 · All Rights Reserved</span>
      </footer> */}
    </>
  );
}
