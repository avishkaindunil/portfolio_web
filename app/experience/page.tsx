'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SplitWords } from '../_components/Reveal';
import Reveal from '../_components/Reveal';

const EXP = [
  {
    title:'Software Engineering Intern', company:'Zebra Technologies',
    period:'Jan 2025 — Jul 2025', type:'Hybrid · Full-time', color:'#d4b46a',
    points:[
      'Developed a real-time Android MVVM application for multi-barcode scanning using CameraX and Google ML Kit.',
      'Created developer-friendly Android sample apps using the Zebra EMC AI Suite SDK.',
      'Redesigned and improved the UI of an enterprise web tool, addressing performance issues and enhancing usability.',
      'Delivered an Android benchmarking application to analyze CameraX use-cases and provide insights.',
      'Actively participated in iterative SAFe Agile Scrum cycles with cross-functional teams.',
    ],
    stack:'Java · Kotlin · React · C++ · Flutter · Jetpack Compose · CameraX · Google MLKit · JIRA',
  },
  {
    title:'Software Developer', company:'Falcon Webio',
    period:'Aug 2023 — Sep 2024', type:'Remote · Part-time', color:'#b0a898',
    points:[
      'Contributed to ongoing deliverables while supporting the broader software development lifecycle.',
      'Applied engineering best practices including version control, unit testing, and code quality guidelines.',
      'Supported application testing, deployments, and maintenance activities.',
    ],
    stack:'React · React Native · PHP · JavaScript · MySQL · WordPress · GitHub',
  },
  {
    title:'Web Developer Consultant', company:'Notch Digital',
    period:'Jun 2023 — Jul 2023', type:'Colombo · Contract', color:'#b0a898',
    points:[
      'Contributed to project deliverables as a Web Developer Consultant in an agile team.',
      'Participated in design and code reviews as well as scrum ceremonies.',
      'Collaborated with clients across multiple countries on tailored, growth-focused web solutions.',
    ],
    stack:'React · PHP · MySQL · WordPress · AWS · WooCommerce · Yoast SEO',
  },
];

function ExpCard({ exp, index }: { exp: typeof EXP[0]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once:true, margin:'-8%' });
  const isFirst = index === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity:0, x:-32 }}
      animate={inView ? { opacity:1, x:0 } : {}}
      transition={{ duration:0.9, ease:[0.16,1,0.3,1], delay:index*0.12 }}
      style={{ display:'grid', gridTemplateColumns:'clamp(130px,16vw,200px) 1fr', gap:'clamp(24px,4vw,56px)', marginBottom:8, position:'relative' }}
    >
      {/* Meta */}
      <div style={{ paddingTop:28 }}>
        <div style={{ fontFamily:'var(--font-sans)', fontSize:10, color:'var(--gold)', letterSpacing:'0.06em', marginBottom:8 }}>{exp.period}</div>
        <div style={{ fontFamily:'var(--font-sans)', fontSize:9, letterSpacing:'0.14em', color:'var(--muted)', textTransform:'uppercase', marginBottom:16 }}>{exp.type}</div>
        {isFirst && (
          <motion.span
            initial={{ opacity:0 }}
            animate={inView ? { opacity:1 } : {}}
            style={{
              display:'inline-block',
              fontFamily:'var(--font-sans)', fontSize:8, letterSpacing:'0.14em',
              textTransform:'uppercase', color:'var(--gold)', padding:'4px 10px',
              border:'1px solid var(--gold)', borderRadius:1,
            }}
          >
            Latest
          </motion.span>
        )}
      </div>

      {/* Card */}
      <motion.div
        className="exp-card glass"
        whileHover={{ x:6 }}
      >
        <div style={{ display:'flex', alignItems:'baseline', gap:14, marginBottom:24, flexWrap:'wrap' }}>
          <h3 style={{ fontFamily:'var(--font-serif)', fontSize:26, fontWeight:400, color:'var(--text)', margin:0 }}>{exp.title}</h3>
          <span style={{ fontFamily:'var(--font-sans)', fontSize:12, color:'var(--muted)' }}>— {exp.company}</span>
        </div>

        <motion.ul
          variants={{ hidden:{}, visible:{ transition:{ staggerChildren:0.08 }} }}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ listStyle:'none', padding:0, display:'flex', flexDirection:'column', gap:10, marginBottom:24 }}
        >
          {exp.points.map((pt, j) => (
            <motion.li key={j}
              variants={{ hidden:{opacity:0,x:-12}, visible:{opacity:1,x:0, transition:{duration:0.55, ease:[0.16,1,0.3,1]}} }}
              style={{ display:'flex', gap:12, alignItems:'flex-start' }}
            >
              <span style={{ color:'var(--gold)', fontSize:7, marginTop:6, flexShrink:0 }}>◆</span>
              <span style={{ fontFamily:'var(--font-sans)', fontSize:13, color:'var(--text-dim)', lineHeight:1.82 }}>{pt}</span>
            </motion.li>
          ))}
        </motion.ul>

        <div style={{ borderTop:'1px solid var(--border)', paddingTop:18, fontFamily:'var(--font-sans)', fontSize:10, color:'var(--muted)', letterSpacing:'0.08em', transition:'opacity 0.3s' }}>
          {exp.stack}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ExperiencePage() {
  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero" style={{ paddingTop:120 }}>
        <div className="page-hero-bg" />
        {/* Animated timeline graphic in background */}
        <div aria-hidden style={{ position:'absolute', right:'var(--r-page)', top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}>
          <svg width="280" height="260" viewBox="0 0 280 260" fill="none">
            {[0,1,2].map(i => (
              <g key={i}>
                <motion.circle
                  cx="20" cy={40 + i*90} r="7" fill="var(--gold)" opacity={i===0?0.9:0.35}
                  animate={{ scale:[1,1.3,1], opacity:[i===0?0.9:0.35, i===0?1:0.55, i===0?0.9:0.35] }}
                  transition={{ duration:2.4, delay:i*0.8, repeat:Infinity }}
                />
                {i < 2 && <motion.line x1="20" y1={47+i*90} x2="20" y2={130+i*90} stroke="var(--gold-border)" strokeWidth="1"
                  initial={{ pathLength:0 }} animate={{ pathLength:1 }} transition={{ duration:1.2, delay:0.4+i*0.3 }} />}
                <motion.rect x="40" y={28+i*90} width={120+Math.random()*60} height="1" fill="var(--border-mid)"
                  initial={{ scaleX:0, originX:0 }} animate={{ scaleX:1 }} transition={{ duration:0.8, delay:0.6+i*0.2 }} />
                <motion.rect x="40" y={42+i*90} width={80+Math.random()*40}  height="1" fill="var(--border)"
                  initial={{ scaleX:0, originX:0 }} animate={{ scaleX:1 }} transition={{ duration:0.8, delay:0.8+i*0.2 }} />
              </g>
            ))}
          </svg>
        </div>
        <div style={{ position:'relative', zIndex:1, maxWidth:1200, margin:'0 auto', width:'100%' }}>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3, duration:0.7 }}
            style={{ fontFamily:'var(--font-sans)', fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--gold)', marginBottom:16 }}>
            02 · Experience
          </motion.p>
          <h1 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(52px,7.5vw,96px)', fontWeight:300, lineHeight:0.9, letterSpacing:'-0.02em' }}>
            <SplitWords text="Where I've" delay={0.3} />
            <br />
            <SplitWords text="worked & grown" delay={0.5} style={{ fontStyle:'italic', color:'var(--gold)' }} />
          </h1>
        </div>
      </section>

      <main style={{ maxWidth:1200, margin:'0 auto', padding:'80px var(--r-page) 120px' }}>
        {/* Gold separator */}
        <Reveal>
          <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:64 }}>
            <div style={{ width:36, height:1, background:'var(--gold)' }} />
            <span style={{ fontFamily:'var(--font-sans)', fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--muted)' }}>Professional Timeline</span>
            <div style={{ flex:1, height:1, background:'var(--border)' }} />
          </div>
        </Reveal>

        {EXP.map((exp, i) => <ExpCard key={i} exp={exp} index={i} />)}

        {/* Education */}
        <Reveal delay={0.1} className="">
          <div style={{ marginTop:72 }}>
            <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:32 }}>
              <div style={{ width:36, height:1, background:'var(--gold)' }} />
              <span style={{ fontFamily:'var(--font-sans)', fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--muted)' }}>Education</span>
            </div>
            <motion.div className="glass" style={{ padding:'40px' }} whileHover={{ x:4 }}>
              <div style={{ display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
                <div>
                  <h3 style={{ fontFamily:'var(--font-serif)', fontSize:22, fontWeight:400, color:'var(--text)', marginBottom:8 }}>B.Sc. in Computer Science</h3>
                  <p style={{ fontFamily:'var(--font-sans)', fontSize:12, color:'var(--muted)', marginBottom:6 }}>University of Colombo School of Computing</p>
                  <p style={{ fontFamily:'var(--font-sans)', fontSize:11, color:'var(--text-dim)', lineHeight:1.7 }}>
                    IEEE Student Branch · IEEE CS Chapter · ISACA Student Group · Exploration Club
                  </p>
                </div>
                <div style={{ textAlign:'right' }}>
                  <div style={{ fontFamily:'var(--font-sans)', fontSize:11, color:'var(--gold)', letterSpacing:'0.06em' }}>Jun 2022 — Present</div>
                  <div style={{ fontFamily:'var(--font-sans)', fontSize:10, color:'var(--muted)', marginTop:4 }}>Colombo 07, Sri Lanka</div>
                </div>
              </div>
            </motion.div>
          </div>
        </Reveal>
      </main>
    </>
  );
}
