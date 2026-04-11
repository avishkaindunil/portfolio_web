'use client';
import Link   from 'next/link';
import { motion } from 'framer-motion';
import Reveal  from '../_components/Reveal';
import { SplitWords } from '../_components/Reveal';

const DETAILS = [
  { key:'Education', val:'B.Sc. Computer Science\nUniv. of Colombo School of Computing' },
  { key:'Location',  val:'Colombo, Sri Lanka' },
  { key:'Focus',     val:'Full-Stack & Backend Engineering' },
  { key:'Status',    val:'Open to Opportunities' },
  { key:'Languages', val:'Sinhala (Native) · English (Fluent)' },
  { key:'Interests', val:'Clean Architecture · Dev Experience · OSS' },
];

const CERTS = [
  { name:'Python for Data Science AI & Development', issuer:'Coursera / IBM', year:'2024' },
  { name:'Python Projects for AI & Application Development', issuer:'Coursera / IBM', year:'2024' },
  { name:'Programming with JavaScript', issuer:'Coursera / Meta', year:'2023' },
  { name:'Web Design & Development Techniques', issuer:'Web Sayura', year:'2023' },
];

/* Animated code bracket SVG graphic */
function DevGraphic() {
  return (
    <div style={{ position:'relative', width:'100%', paddingBottom:'90%', maxWidth:440 }}>
      <svg
        viewBox="0 0 400 360" fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}
      >
        {/* Outer ring */}
        <motion.circle
          cx="200" cy="180" r="155"
          stroke="var(--gold-border)" strokeWidth="1"
          strokeDasharray="6 4"
          animate={{ rotate:360 }} style={{ originX:'200px', originY:'180px' }}
          transition={{ duration:60, repeat:Infinity, ease:'linear' }}
        />
        {/* Inner ring */}
        <motion.circle
          cx="200" cy="180" r="100"
          stroke="var(--border-mid)" strokeWidth="1"
          strokeDasharray="4 6"
          animate={{ rotate:-360 }} style={{ originX:'200px', originY:'180px' }}
          transition={{ duration:40, repeat:Infinity, ease:'linear' }}
        />
        {/* Orbit dot 1 */}
        <motion.circle r="5" fill="var(--gold)"
          animate={{ rotate:360 }}
          style={{ originX:'200px', originY:'180px' }}
          transition={{ duration:12, repeat:Infinity, ease:'linear' }}
        >
          <animateMotion dur="12s" repeatCount="indefinite">
            <mpath href="#orbit1" />
          </animateMotion>
        </motion.circle>
        <path id="orbit1" d="M 200 25 A 155 155 0 1 1 199.9 25" fill="none" />

        {/* Orbit dot 2 */}
        <circle r="3.5" fill="var(--text-dim)" opacity="0.6">
          <animateMotion dur="8s" repeatCount="indefinite" begin="-4s">
            <mpath href="#orbit2" />
          </animateMotion>
        </circle>
        <path id="orbit2" d="M 200 80 A 100 100 0 1 1 199.9 80" fill="none" />

        {/* Center hex */}
        <motion.polygon
          points="200,148 224,162 224,190 200,204 176,190 176,162"
          fill="var(--glass-bg)" stroke="var(--gold)" strokeWidth="1.5"
          initial={{ scale:0.8, opacity:0 }}
          animate={{ scale:1, opacity:1 }}
          transition={{ duration:1, ease:[0.16,1,0.3,1] }}
          style={{ originX:'200px', originY:'176px' }}
        />
        <text x="200" y="182" textAnchor="middle" dominantBaseline="middle"
          fontFamily="var(--font-serif)" fontSize="22" fill="var(--gold)" fontStyle="italic">
          AI
        </text>

        {/* Tech labels at cardinal points */}
        {[
          { x:200, y:16,  label:'Java'    },
          { x:378, y:180, label:'React'   },
          { x:200, y:350, label:'Kotlin'  },
          { x:22,  y:180, label:'Docker'  },
          { x:338, y:68,  label:'Spring'  },
          { x:338, y:296, label:'Node.js' },
          { x:62,  y:68,  label:'Python'  },
          { x:62,  y:296, label:'MySQL'   },
        ].map(({ x, y, label }) => (
          <motion.text
            key={label} x={x} y={y}
            textAnchor="middle" dominantBaseline="middle"
            fontFamily="var(--font-sans)" fontSize="9.5"
            fill="var(--text-dim)" letterSpacing="0.12em"
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ duration:1, delay: Math.random() * 0.8 }}
          >
            {label.toUpperCase()}
          </motion.text>
        ))}

        {/* Cross-hair lines */}
        {[[200,28,200,152],[200,204,200,340],[48,180,176,180],[224,180,352,180]].map(([x1,y1,x2,y2],i) => (
          <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="var(--border)" strokeWidth="1"
            initial={{ pathLength:0 }} animate={{ pathLength:1 }}
            transition={{ duration:1.2, delay:0.3+i*0.1 }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* ── Page Hero ──────────────────────────────────────────────── */}
      <section className="page-hero" style={{ paddingTop: 120 }}>
        <div className="page-hero-bg" />
        <div style={{ position:'relative', zIndex:1, maxWidth:1200, margin:'0 auto', width:'100%' }}>
          <motion.p
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3, duration:0.7 }}
            style={{ fontFamily:'var(--font-sans)', fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--gold)', marginBottom:16 }}
          >
            01 · About
          </motion.p>
          <h1 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(52px,7.5vw,96px)', fontWeight:300, lineHeight:0.9, letterSpacing:'-0.02em' }}>
            <SplitWords text="The person" delay={0.3} />
            <br />
            <SplitWords text="behind the code" delay={0.5} style={{ fontStyle:'italic', color:'var(--gold)' }} />
          </h1>
        </div>
      </section>

      <main style={{ maxWidth:1200, margin:'0 auto', padding:'80px var(--r-page) 120px' }}>

        {/* ── Bio + Graphic ──────────────────────────────────────── */}
        <div className="about-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center', marginBottom:120 }}>
          <Reveal>
            <DevGraphic />
          </Reveal>
          <Reveal delay={0.15}>
            <p style={{ fontFamily:'var(--font-sans)', fontSize:14, lineHeight:1.95, color:'var(--text-dim)', marginBottom:32 }}>
              I&apos;m a motivated Software Engineer currently completing my B.Sc. in Computer
              Science at the University of Colombo School of Computing. My experience spans
              enterprise Android development at Zebra Technologies, part-time web development
              at Falcon Webio, and web consulting at Notch Digital.
            </p>
            <p style={{ fontFamily:'var(--font-sans)', fontSize:14, lineHeight:1.95, color:'var(--text-dim)', marginBottom:40 }}>
              I care deeply about architecture, code quality, and the developer experience. Whether
              it&apos;s a real-time barcode scanning app or a cloud-based SaaS POS system, I try to
              build things that are fast, maintainable, and a joy to use.
            </p>
            <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
              <Link href="/experience" className="btn-gold">My Experience</Link>
              <Link href="/contact"    className="btn">Hire Me</Link>
            </div>
          </Reveal>
        </div>

        {/* ── Detail Grid ─────────────────────────────────────────── */}
        <Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2, marginBottom:80 }}>
            {DETAILS.map(({ key, val }) => (
              <motion.div
                key={key} className="glass"
                whileHover={{ x:4 }}
                style={{ padding:'28px 32px' }}
              >
                <div style={{ fontFamily:'var(--font-sans)', fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--gold)', marginBottom:10 }}>{key}</div>
                <div style={{ fontFamily:'var(--font-sans)', fontSize:13, color:'var(--text-dim)', lineHeight:1.6, whiteSpace:'pre-line' }}>{val}</div>
              </motion.div>
            ))}
          </div>
        </Reveal>

        {/* ── Certifications ──────────────────────────────────────── */}
        <Reveal>
          <p style={{ fontFamily:'var(--font-sans)', fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--gold)', marginBottom:32 }}>Certifications</p>
          <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
            {CERTS.map(({ name, issuer, year }, i) => (
              <motion.div
                key={name}
                className="glass"
                initial={{ opacity:0, x:-20 }}
                whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true }}
                transition={{ duration:0.6, delay:i*0.08 }}
                style={{ padding:'24px 32px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}
              >
                <div>
                  <div style={{ fontFamily:'var(--font-sans)', fontSize:13, color:'var(--text)', marginBottom:4 }}>{name}</div>
                  <div style={{ fontFamily:'var(--font-sans)', fontSize:11, color:'var(--muted)' }}>{issuer}</div>
                </div>
                <span style={{ fontFamily:'var(--font-serif)', fontSize:18, color:'var(--gold)', fontStyle:'italic' }}>{year}</span>
              </motion.div>
            ))}
          </div>
        </Reveal>

        {/* ── Leadership ──────────────────────────────────────────── */}
        <Reveal delay={0.1}>
          <p style={{ fontFamily:'var(--font-sans)', fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--gold)', marginTop:80, marginBottom:32 }}>Leadership & Volunteering</p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2 }}>
            {[
              { role:'Refounding President', org:'Exploration Club of UCSC', period:'Jul 2024 – Oct 2025' },
              { role:'Community Volunteer',  org:'Google Developer Group – Sri Lanka', period:'Jun 2024 – Present' },
              { role:'Webmaster',            org:'SEDS University of Colombo', period:'Feb 2023 – Feb 2024' },
              { role:'Webmaster',            org:'SEDS Sri Lanka',             period:'Feb 2024 – Feb 2025' },
            ].map(({ role, org, period }) => (
              <motion.div
                key={org} className="glass"
                whileHover={{ y:-3 }}
                style={{ padding:'28px 32px' }}
              >
                <div style={{ fontFamily:'var(--font-sans)', fontSize:12, color:'var(--text)', marginBottom:6 }}>{role}</div>
                <div style={{ fontFamily:'var(--font-sans)', fontSize:11, color:'var(--muted)', marginBottom:4 }}>{org}</div>
                <div style={{ fontFamily:'var(--font-sans)', fontSize:10, color:'var(--gold)', letterSpacing:'0.05em' }}>{period}</div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </main>
    </>
  );
}
