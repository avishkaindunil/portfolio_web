'use client';
import dynamic from 'next/dynamic';
import Link    from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { SplitWords } from './_components/Reveal';

const ThreeScene = dynamic(() => import('./_components/ThreeScene'), { ssr: false });

/* ── Animated counter ──────────────────────────────────────────────────── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref     = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start    = performance.now();
    const duration = 1400;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.floor(eased * to));
      if (t < 1) requestAnimationFrame(tick);
      else setVal(to);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);

  return <div ref={ref}>{val}{suffix}</div>;
}

/* ── Magnetic button ───────────────────────────────────────────────────── */
function MagBtn({ href, children, gold = false }: { href: string; children: React.ReactNode; gold?: boolean }) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const r = btnRef.current!.getBoundingClientRect();
    setPos({ x: (e.clientX - r.left - r.width / 2) * 0.28, y: (e.clientY - r.top - r.height / 2) * 0.28 });
  };
  const onLeave = () => setPos({ x: 0, y: 0 });

  return (
    <motion.a
      ref={btnRef}
      href={href}
      className={gold ? 'btn-gold' : 'btn'}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}
    >
      {children}
    </motion.a>
  );
}

/* ── Marquee strip ─────────────────────────────────────────────────────── */
const TECH = ['Java','Spring Boot','React','React Native','Flutter','AWS','GCP','Docker','Kotlin','TypeScript','PostgreSQL','Redis','Next.js','Android','Jetpack Compose'];

function Marquee() {
  const items = [...TECH, ...TECH];
  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '18px 0' }}>
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', gap: 0, whiteSpace: 'nowrap', width: 'max-content' }}
      >
        {items.map((t, i) => (
          <span key={i} style={{
            fontFamily: 'var(--font-sans)', fontSize: 10, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'var(--muted)',
            padding: '0 36px', borderRight: '1px solid var(--border)',
          }}>
            {i % 2 === 0
              ? <span style={{ color: 'var(--gold)', marginRight: 12 }}>✦</span>
              : null}
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Stats section ─────────────────────────────────────────────────────── */
const STATS = [
  { val: 3,   suffix: '+', lbl: 'Years of Craft'     },
  { val: 5,   suffix: '+', lbl: 'Products Shipped'   },
  { val: 3,   suffix: '',  lbl: 'Companies Served'   },
  { val: 10,  suffix: '+', lbl: 'Technologies'       },
];

/* ── Capabilities ─────────────────────────────────────────────────────── */
const CAPS = [
  { icon: '⬡', title: 'Backend Architecture', desc: 'Java · Spring Boot · RESTful APIs · Microservices' },
  { icon: '◈', title: 'Frontend Interfaces',  desc: 'React · Next.js · TypeScript · Tailwind'           },
  { icon: '◎', title: 'Cloud & DevOps',       desc: 'AWS · GCP · Docker · CI/CD Pipelines'              },
  { icon: '◇', title: 'Mobile Engineering',   desc: 'React Native · Flutter · Android · Kotlin'          },
];

/* ── TESTIMONIAL ────────────────────────────────────────────────────────── */
const QUOTE = {
  text:   'Avishka consistently delivers beyond expectations — his attention to detail and architectural thinking are genuinely rare.',
  author: 'Senior Engineer, Zebra Technologies',
};

/* ─────────────────────────────────────────────────────────────────────── */
export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const heroY       = useTransform(scrollYProgress, [0, 1],    [0, 60]);
  const bgY         = useTransform(scrollYProgress, [0, 1],    [0, 120]);

  return (
    <>
      {/* ═══════════════════════════════════ HERO ══ */}
      <section
        ref={heroRef}
        style={{
          minHeight: '100vh', position: 'relative', overflow: 'hidden',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: '0 var(--r-page) 96px',
        }}
      >
        {/* Three.js particle network — reduced for perf */}
        <ThreeScene style={{ zIndex: 0 }} count={80} connectDist={13} />

        {/* Ambient orbs */}
        <motion.div aria-hidden style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none', y: bgY }}>
          <div style={{
            position:'absolute', top:'15%', right:'8%',
            width:500, height:500, borderRadius:'50%',
            background:'radial-gradient(ellipse, rgba(212,180,106,0.07) 0%, transparent 65%)',
          }} />
          <div style={{
            position:'absolute', bottom:'20%', left:'5%',
            width:400, height:400, borderRadius:'50%',
            background:'radial-gradient(ellipse, rgba(212,180,106,0.04) 0%, transparent 60%)',
          }} />
        </motion.div>

        {/* Gradient overlay */}
        <div aria-hidden style={{
          position:'absolute', inset:0, zIndex:2, pointerEvents:'none',
          background:`
            radial-gradient(ellipse 55% 70% at 0% 100%, rgba(19,18,15,0.9) 0%, transparent 70%),
            radial-gradient(ellipse 70% 60% at 100% 0%, rgba(19,18,15,0.6) 0%, transparent 60%)
          `,
        }} />

        {/* Large decorative SE */}
        <motion.div aria-hidden style={{
          position:'absolute', top:'50%', right:'3%', transform:'translateY(-50%)',
          fontFamily:'var(--font-serif)', fontSize:'clamp(160px,22vw,320px)',
          fontWeight:300, lineHeight:1, letterSpacing:'-0.05em',
          color:'rgba(212,180,106,0.03)', userSelect:'none', pointerEvents:'none',
          y: heroY, zIndex:1,
        }}>SE</motion.div>

        {/* Gold accent line */}
        <motion.div aria-hidden
          initial={{ scaleY:0, originY:0 }} animate={{ scaleY:1 }}
          transition={{ duration:1.4, ease:[0.16,1,0.3,1], delay:1.8 }}
          style={{
            position:'absolute', top:'24%', right:'var(--r-page)',
            width:1, height:110,
            background:'linear-gradient(to bottom, transparent, var(--gold), transparent)',
            zIndex:2,
          }}
        />

        {/* ── Content ── */}
        <motion.div style={{ position:'relative', zIndex:3, maxWidth:980, opacity: heroOpacity }}>

          {/* Availability badge */}
          <motion.div
            initial={{ opacity:0, x:-24 }}
            animate={{ opacity:1, x:0 }}
            transition={{ duration:0.8, ease:[0.16,1,0.3,1], delay:1.8 }}
            style={{ display:'flex', alignItems:'center', gap:20, marginBottom:36, flexWrap:'wrap' }}
          >
            <div style={{ display:'flex', alignItems:'center', gap:14 }}>
              <motion.div
                initial={{ scaleX:0, originX:0 }} animate={{ scaleX:1 }}
                transition={{ duration:0.8, ease:[0.16,1,0.3,1], delay:2.0 }}
                style={{ width:36, height:1, background:'var(--gold)', flexShrink:0 }}
              />
              <span style={{ fontFamily:'var(--font-sans)', fontSize:10, letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--gold)' }}>
                Software Engineer · Colombo, Sri Lanka
              </span>
            </div>

            {/* Pulsing available badge */}
            <motion.div
              initial={{ opacity:0 }} animate={{ opacity:1 }}
              transition={{ delay:2.4, duration:0.6 }}
              style={{
                display:'inline-flex', alignItems:'center', gap:8, padding:'6px 14px',
                border:'1px solid rgba(74,222,128,0.3)',
                background:'rgba(74,222,128,0.06)',
              }}
            >
              <span style={{
                width:6, height:6, borderRadius:'50%', background:'#4ade80',
                boxShadow:'0 0 8px #4ade80', animation:'pulseGreen 2s infinite',
                flexShrink:0,
              }} />
              <span style={{ fontFamily:'var(--font-sans)', fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(74,222,128,0.85)' }}>
                Available for hire
              </span>
            </motion.div>
          </motion.div>

          {/* Name */}
          <h1 style={{ fontFamily:'var(--font-serif)', fontWeight:300, lineHeight:0.88, fontSize:'clamp(68px,12.5vw,174px)', letterSpacing:'-0.02em', margin:0 }}>
            <SplitWords text="Avishka" delay={1.8} />
            <br />
            <SplitWords text="Indunil" delay={1.96} style={{ fontStyle:'italic', color:'var(--gold)' }} />
          </h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.9, ease:[0.16,1,0.3,1], delay:2.3 }}
            style={{ marginTop:52, maxWidth:520, fontFamily:'var(--font-sans)', fontSize:14, lineHeight:1.95, color:'var(--text-dim)', letterSpacing:'0.01em' }}
          >
            Building scalable web &amp; mobile solutions with Java, Spring Boot, React,
            and modern cloud infrastructure. Passionate about clean architecture
            and exceptional developer experience.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="hero-cta"
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.9, ease:[0.16,1,0.3,1], delay:2.55 }}
            style={{ marginTop:52, display:'flex', gap:20, alignItems:'center', flexWrap:'wrap' }}
          >
            <MagBtn href="/contact" gold>Get In Touch</MagBtn>
            <MagBtn href="/projects">
              View Work
              <motion.span animate={{ x:[0,5,0] }} transition={{ duration:1.8, repeat:Infinity, ease:'easeInOut' }}>→</motion.span>
            </MagBtn>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:3.2, duration:1 }}
          aria-hidden
          style={{ position:'absolute', right:'var(--r-page)', bottom:44, display:'flex', flexDirection:'column', alignItems:'center', gap:12, zIndex:3 }}
        >
          <span style={{ fontFamily:'var(--font-sans)', fontSize:9, letterSpacing:'0.2em', color:'var(--muted)', textTransform:'uppercase', writingMode:'vertical-rl' }}>scroll</span>
          <motion.div
            animate={{ scaleY:[1,0.4,1], opacity:[0.4,1,0.4] }}
            transition={{ duration:2.4, repeat:Infinity, ease:'easeInOut' }}
            style={{ width:1, height:60, background:'linear-gradient(to bottom, var(--muted), transparent)' }}
          />
        </motion.div>
      </section>

      {/* ═════════════════════════════════ MARQUEE ══ */}
      <Marquee />

      {/* ═════════════════════════════════ STATS ══ */}
      <section style={{ padding:'80px var(--r-page)', maxWidth:1200, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:2 }}>
          {STATS.map(({ val, suffix, lbl }, i) => (
            <motion.div
              key={lbl}
              className="glass"
              initial={{ opacity:0, y:24 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.7, ease:[0.16,1,0.3,1], delay:i*0.1 }}
              style={{ padding:'40px 32px', textAlign:'center' }}
            >
              <div className="stat-val"><Counter to={val} suffix={suffix} /></div>
              <div className="stat-lbl">{lbl}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═════════════════════════════════ WHO I AM ══ */}
      <section style={{ padding:'80px var(--r-page) 120px', maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center' }}>
        <motion.div
          initial={{ opacity:0, x:-32 }}
          whileInView={{ opacity:1, x:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.9, ease:[0.16,1,0.3,1] }}
        >
          <p style={{ fontFamily:'var(--font-sans)', fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--gold)', marginBottom:16 }}>Who I Am</p>
          <h2 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(36px,4.5vw,58px)', fontWeight:300, lineHeight:1.15, color:'var(--text)', marginBottom:28 }}>
            A developer who cares about <em style={{ fontStyle:'italic', color:'var(--gold)' }}>the craft</em>
          </h2>
          <p style={{ fontFamily:'var(--font-sans)', fontSize:14, lineHeight:1.95, color:'var(--text-dim)', marginBottom:16 }}>
            From enterprise barcode scanning systems at Zebra Technologies to full-stack
            SaaS platforms — I build things that work at scale, look good, and are a
            pleasure to maintain.
          </p>
          <p style={{ fontFamily:'var(--font-sans)', fontSize:14, lineHeight:1.95, color:'var(--text-dim)', marginBottom:36 }}>
            My philosophy: every line of code is a decision. I make those decisions deliberately,
            with long-term maintainability and user experience always at the forefront.
          </p>
          <Link href="/about" className="btn" style={{ display:'inline-flex', alignItems:'center', gap:10 }}>Read My Story →</Link>
        </motion.div>

        <motion.div
          initial={{ opacity:0, x:32 }}
          whileInView={{ opacity:1, x:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.9, ease:[0.16,1,0.3,1], delay:0.15 }}
          style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2 }}
        >
          {CAPS.map(({ icon, title, desc }, i) => (
            <motion.div
              key={title}
              className="glass card"
              initial={{ opacity:0, y:20 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.65, ease:[0.16,1,0.3,1], delay:i*0.09 }}
              whileHover={{ y:-5, boxShadow:'0 28px 72px var(--gold-glow)' }}
              style={{ padding:'28px 24px' }}
            >
              <div style={{ fontFamily:'var(--font-serif)', fontSize:26, color:'var(--gold)', marginBottom:12 }}>{icon}</div>
              <div style={{ fontFamily:'var(--font-sans)', fontSize:11, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--text)', marginBottom:8 }}>{title}</div>
              <div style={{ fontFamily:'var(--font-sans)', fontSize:11, color:'var(--muted)', lineHeight:1.65 }}>{desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ═════════════════════════════════ QUOTE ══ */}
      <section style={{
        padding:'100px var(--r-page)',
        background:'var(--bg-2)',
        borderTop:'1px solid var(--border)',
        borderBottom:'1px solid var(--border)',
        position:'relative', overflow:'hidden',
      }}>
        {/* Decorative quote mark */}
        <div aria-hidden style={{
          position:'absolute', top:'-0.1em', left:'calc(var(--r-page) - 0.05em)',
          fontFamily:'var(--font-serif)', fontSize:'clamp(160px,20vw,280px)',
          fontWeight:300, color:'rgba(212,180,106,0.04)',
          lineHeight:1, userSelect:'none', pointerEvents:'none',
        }}>"</div>

        <motion.div
          style={{ maxWidth:800, margin:'0 auto', position:'relative', zIndex:1, textAlign:'center' }}
          initial={{ opacity:0, y:32 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:1, ease:[0.16,1,0.3,1] }}
        >
          <div style={{ width:32, height:1, background:'var(--gold)', margin:'0 auto 36px' }} />
          <p style={{
            fontFamily:'var(--font-serif)', fontSize:'clamp(20px,2.5vw,30px)',
            fontWeight:300, fontStyle:'italic', lineHeight:1.6,
            color:'var(--text)', marginBottom:32,
          }}>
            "{QUOTE.text}"
          </p>
          <span style={{ fontFamily:'var(--font-sans)', fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--muted)' }}>
            — {QUOTE.author}
          </span>
        </motion.div>
      </section>

      {/* ═════════════════════════════════ CTA STRIP ══ */}
      <section style={{
        padding:'120px var(--r-page)',
        display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center',
        position:'relative', overflow:'hidden',
      }}>
        <div style={{
          position:'absolute', inset:0, pointerEvents:'none',
          background:'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(212,180,106,0.05) 0%, transparent 70%)',
        }} />
        <motion.p
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.7 }}
          style={{ fontFamily:'var(--font-sans)', fontSize:10, letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--gold)', marginBottom:20 }}
        >
          Ready to work together?
        </motion.p>
        <motion.h2
          initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.9, ease:[0.16,1,0.3,1], delay:0.1 }}
          style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(40px,6vw,80px)', fontWeight:300, lineHeight:1.1, color:'var(--text)', marginBottom:48, maxWidth:700 }}
        >
          Let's build something <em style={{ fontStyle:'italic', color:'var(--gold)' }}>remarkable</em> together.
        </motion.h2>
        <motion.div
          initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.8, delay:0.2 }}
          style={{ display:'flex', gap:16, flexWrap:'wrap', justifyContent:'center' }}
        >
          <Link href="/contact" className="btn-gold">Start a Conversation</Link>
          <Link href="/projects" className="btn" style={{ display:'inline-flex', alignItems:'center', gap:10 }}>See My Work →</Link>
        </motion.div>
      </section>
    </>
  );
}
