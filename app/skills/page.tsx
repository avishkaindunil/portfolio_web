'use client';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Reveal from '../_components/Reveal';
import { SplitWords } from '../_components/Reveal';

const SkillsCanvas = dynamic(() => import('../_components/SkillsCanvas'), { ssr:false });

const SKILL_GROUPS = [
  { label:'Languages',         items:['Java','JavaScript','TypeScript','Kotlin','Python','C++','C#','Scala'], color:'#d4b46a' },
  { label:'Backend',           items:['Spring Boot','Node.js','Express','REST APIs','Microservices'], color:'#a8c4e8' },
  { label:'Frontend & Mobile', items:['React','React Native','Jetpack Compose','Flutter','Material UI','Bootstrap'], color:'#a8e8c4' },
  { label:'Databases',         items:['MySQL','PostgreSQL','MongoDB','Firebase'], color:'#e8a8c4' },
  { label:'Cloud & DevOps',    items:['AWS','GCP','Azure','Docker','GitHub','JIRA','Confluence'], color:'#c4a8e8' },
  { label:'Design & Tools',    items:['Figma','Adobe Photoshop','Adobe Illustrator','WordPress','WooCommerce','Yoast SEO'], color:'#e8c4a8' },
];

function SkillTag({ label, delay }: { label:string; delay:number }) {
  return (
    <motion.span
      className="skill-tag"
      initial={{ opacity:0, scale:0.88 }}
      whileInView={{ opacity:1, scale:1 }}
      viewport={{ once:true }}
      transition={{ duration:0.45, delay }}
      whileHover={{ y:-2 }}
    >
      {label}
    </motion.span>
  );
}

export default function SkillsPage() {
  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero" style={{ paddingTop:120 }}>
        <div className="page-hero-bg" />
        <div style={{ position:'relative', zIndex:1, maxWidth:1200, margin:'0 auto', width:'100%' }}>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3, duration:0.7 }}
            style={{ fontFamily:'var(--font-sans)', fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--gold)', marginBottom:16 }}>
            04 · Skills
          </motion.p>
          <h1 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(52px,7.5vw,96px)', fontWeight:300, lineHeight:0.9, letterSpacing:'-0.02em' }}>
            <SplitWords text="Tools of the" delay={0.3} />
            <br />
            <SplitWords text="trade" delay={0.5} style={{ fontStyle:'italic', color:'var(--gold)' }} />
          </h1>
        </div>
      </section>

      <main style={{ maxWidth:1200, margin:'0 auto', padding:'80px var(--r-page) 120px' }}>

        {/* ── Canvas constellation ── */}
        <Reveal>
          <div
            className="glass"
            style={{ width:'100%', height:'clamp(320px, 45vh, 520px)', borderRadius:2, overflow:'hidden', marginBottom:80, position:'relative' }}
          >
            <SkillsCanvas style={{ position:'absolute', inset:0 }} />
            <div style={{
              position:'absolute', bottom:20, left:'50%', transform:'translateX(-50%)',
              fontFamily:'var(--font-sans)', fontSize:9, letterSpacing:'0.18em',
              textTransform:'uppercase', color:'var(--muted)',
            }}>
              Move cursor to interact
            </div>
          </div>
        </Reveal>

        {/* ── Grouped skills ── */}
        <div className="skills-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'56px 64px' }}>
          {SKILL_GROUPS.map((group, gi) => (
            <Reveal key={group.label} delay={gi * 0.08}>
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
                  <div style={{ width:6, height:6, borderRadius:'50%', background:group.color, boxShadow:`0 0 8px ${group.color}66` }} />
                  <span style={{ fontFamily:'var(--font-sans)', fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--gold)' }}>
                    {group.label}
                  </span>
                </div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {group.items.map((item, j) => (
                    <SkillTag key={item} label={item} delay={(gi * group.items.length + j) * 0.03} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Professional strengths ── */}
        <Reveal delay={0.2}>
          <div style={{ marginTop:80 }}>
            <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:36 }}>
              <div style={{ width:36, height:1, background:'var(--gold)' }} />
              <span style={{ fontFamily:'var(--font-sans)', fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--muted)' }}>Professional Strengths</span>
            </div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
              {['Team Leadership','Decision-Making','Public Speaking','Strategic Planning','Emotional Intelligence','Technical Consulting','Problem Solving','Client Analysis','Communication','Team Collaboration','Presentation Skills'].map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity:0, y:10 }}
                  whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }}
                  transition={{ duration:0.5, delay:i*0.04 }}
                  style={{
                    fontFamily:'var(--font-sans)', fontSize:11, letterSpacing:'0.05em',
                    color:'var(--text-dim)', padding:'8px 16px',
                    border:'1px solid var(--border-mid)', borderRadius:1,
                  }}
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </div>
        </Reveal>
      </main>
    </>
  );
}
