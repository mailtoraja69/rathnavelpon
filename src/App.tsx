import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  Linkedin, Twitter, Instagram, Facebook,
  Mail, MapPin, ArrowRight, Menu, X, ExternalLink, Heart, Calendar
} from 'lucide-react'

/* ═══════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════ */
function useMouseParallax() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 35, damping: 18 })
  const springY = useSpring(mouseY, { stiffness: 35, damping: 18 })
  useEffect(() => {
    const h = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 2)
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2)
    }
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [mouseX, mouseY])
  return { springX, springY }
}

function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

/* ═══════════════════════════════════════════════════
   COUNT UP
═══════════════════════════════════════════════════ */
function CountUp({ to, suffix = '', duration = 2200 }: { to: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const spanRef = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !started) setStarted(true) },
      { threshold: 0.5 }
    )
    if (spanRef.current) obs.observe(spanRef.current)
    return () => obs.disconnect()
  }, [started])
  useEffect(() => {
    if (!started) return
    let startTime = 0
    const animate = (now: number) => {
      if (!startTime) startTime = now
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * to))
      if (progress < 1) requestAnimationFrame(animate)
      else setCount(to)
    }
    requestAnimationFrame(animate)
  }, [started, to, duration])
  return <span ref={spanRef}>{count.toLocaleString()}{suffix}</span>
}

/* ═══════════════════════════════════════════════════
   MAP PIN SVG
═══════════════════════════════════════════════════ */
function MapPinDrop({ x, y, color, delay }: { x: number; y: number; color: string; delay: number }) {
  return (
    <motion.g
      initial={{ scale: 0, opacity: 0, y: -20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 280, damping: 18 }}
      style={{ transformOrigin: `${x}px ${y}px` }}
    >
      {/* Drop shadow */}
      <ellipse cx={x} cy={y + 3} rx={8} ry={3} fill="rgba(0,0,0,0.18)" />
      {/* Pin head */}
      <circle cx={x} cy={y - 18} r={14} fill={color} />
      {/* Pin tip */}
      <path
        d={`M${x - 10} ${y - 8} Q${x} ${y + 2} ${x + 10} ${y - 8}`}
        fill={color}
      />
      {/* Inner dot */}
      <circle cx={x} cy={y - 18} r={6} fill="white" />
      {/* Bounce shadow on land */}
      <motion.ellipse
        cx={x} cy={y + 3} rx={8} ry={3} fill="rgba(0,0,0,0.08)"
        animate={{ scaleX: [1, 0.5, 1], opacity: [0.18, 0.05, 0.18] }}
        transition={{ duration: 1.2, delay: delay + 0.3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.g>
  )
}

/* ═══════════════════════════════════════════════════
   DOODLES
═══════════════════════════════════════════════════ */
function CricketDoodle({ style }: { style: React.CSSProperties }) {
  return (
    <motion.div style={{ position: 'absolute', pointerEvents: 'none', ...style }}
      animate={{ y: [-10, 10, -10], rotate: [-4, 4, -4] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
      <svg viewBox="0 0 80 80" width="72" height="72" fill="none">
        <motion.circle cx="60" cy="16" r="10" stroke="rgba(200,150,62,0.35)" strokeWidth="1.5"
          animate={{ cx: [60, 35, 60], cy: [16, 44, 16] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} />
        <motion.path d="M 8 72 L 20 60 L 42 38 L 36 32 L 14 54 Z"
          stroke="rgba(45,106,79,0.35)" strokeWidth="1.5" fill="none" strokeLinejoin="round"
          animate={{ rotate: [-8, 12, -8] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '8px 72px' }} />
        <line x1="8" y1="72" x2="14" y2="66" stroke="rgba(45,106,79,0.2)" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </motion.div>
  )
}

function CinemaDoodle({ style }: { style: React.CSSProperties }) {
  return (
    <motion.div style={{ position: 'absolute', pointerEvents: 'none', ...style }}
      animate={{ y: [8, -8, 8], x: [-4, 4, -4] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
      <svg viewBox="0 0 80 80" width="68" height="68" fill="none">
        <rect x="8" y="26" width="56" height="42" rx="4" stroke="rgba(200,150,62,0.35)" strokeWidth="1.5" />
        <motion.rect x="8" y="16" width="56" height="14" rx="3" stroke="rgba(200,150,62,0.35)" strokeWidth="1.5"
          animate={{ rotate: [0, -18, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
          style={{ transformOrigin: '8px 16px' }} />
        <line x1="24" y1="16" x2="20" y2="30" stroke="rgba(200,150,62,0.25)" strokeWidth="1.5" />
        <line x1="38" y1="16" x2="34" y2="30" stroke="rgba(200,150,62,0.25)" strokeWidth="1.5" />
        <line x1="52" y1="16" x2="48" y2="30" stroke="rgba(200,150,62,0.25)" strokeWidth="1.5" />
        <circle cx="28" cy="47" r="8" stroke="rgba(45,106,79,0.3)" strokeWidth="1" />
        <circle cx="28" cy="47" r="3" stroke="rgba(45,106,79,0.3)" strokeWidth="1" />
        <circle cx="52" cy="47" r="8" stroke="rgba(45,106,79,0.3)" strokeWidth="1" />
        <circle cx="52" cy="47" r="3" stroke="rgba(45,106,79,0.3)" strokeWidth="1" />
        <motion.path d="M 64 10 L 80 2 M 64 10 L 80 10 M 64 10 L 80 18"
          stroke="rgba(200,150,62,0.2)" strokeWidth="1" strokeLinecap="round"
          animate={{ opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} />
      </svg>
    </motion.div>
  )
}

function RotaryDoodle({ style }: { style: React.CSSProperties }) {
  return (
    <motion.div style={{ position: 'absolute', pointerEvents: 'none', ...style }}
      animate={{ y: [-6, 6, -6] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}>
      <svg viewBox="0 0 70 70" width="60" height="60" fill="none">
        <motion.g animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '35px 35px' }}>
          <circle cx="35" cy="35" r="26" stroke="rgba(200,150,62,0.28)" strokeWidth="1.5" />
          <circle cx="35" cy="35" r="18" stroke="rgba(200,150,62,0.18)" strokeWidth="1" />
          <circle cx="35" cy="35" r="5" stroke="rgba(200,150,62,0.3)" strokeWidth="1.5" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <line key={angle} x1="35" y1="9" x2="35" y2="17"
              stroke="rgba(200,150,62,0.3)" strokeWidth="1.5" strokeLinecap="round"
              transform={`rotate(${angle} 35 35)`} />
          ))}
        </motion.g>
      </svg>
    </motion.div>
  )
}

function LeafDoodle({ style }: { style: React.CSSProperties }) {
  return (
    <motion.div style={{ position: 'absolute', pointerEvents: 'none', ...style }}
      animate={{ y: [6, -6, 6], rotate: [-6, 6, -6] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
      <svg viewBox="0 0 60 60" width="54" height="54" fill="none">
        <path d="M 12 50 Q 28 8 52 6 Q 46 34 12 50Z" stroke="rgba(45,106,79,0.35)" strokeWidth="1.5" />
        <path d="M 12 50 L 36 24" stroke="rgba(45,106,79,0.25)" strokeWidth="1" strokeLinecap="round" />
      </svg>
    </motion.div>
  )
}

function PoliticsDoodle({ style }: { style: React.CSSProperties }) {
  return (
    <motion.div style={{ position: 'absolute', pointerEvents: 'none', ...style }}
      animate={{ y: [-8, 8, -8] }}
      transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}>
      <svg viewBox="0 0 64 64" width="56" height="56" fill="none">
        <rect x="20" y="32" width="24" height="24" rx="2" stroke="rgba(200,150,62,0.32)" strokeWidth="1.5" />
        <line x1="16" y1="56" x2="48" y2="56" stroke="rgba(200,150,62,0.3)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="28" y1="32" x2="32" y2="12" stroke="rgba(200,150,62,0.25)" strokeWidth="1.5" strokeLinecap="round" />
        <motion.path d="M 32 12 L 48 18 L 32 24 Z"
          stroke="rgba(45,106,79,0.35)" strokeWidth="1.5" fill="rgba(45,106,79,0.08)"
          animate={{ scaleX: [1, 0.85, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '32px 18px' }} />
      </svg>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════════════════ */
function Navigation() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])
  const links = [
    { label: 'Home', href: '#home' }, { label: 'About', href: '#about' },
    { label: 'Journey', href: '#journey' }, { label: 'Work', href: '#work' },
  ]
  return (
    <motion.header className={`nav-root ${scrolled ? 'nav-solid' : ''}`}
      initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
      <div className="nav-inner">
        <a href="#home" className="nav-logo">
          <div className="nav-logo-badge"><span className="nav-logo-initials">RP</span></div>
          <span className="nav-logo-name">Rathnavel Ponnuswami</span>
        </a>
        <div className="nav-links">
          {links.map(l => <a key={l.label} href={l.href} className="nav-link">{l.label}</a>)}
          <a href="#book" className="nav-cta">Book a Call</a>
        </div>
        <button className="nav-mobile-toggle" onClick={() => setOpen(!open)} aria-label="menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className="nav-mobile-menu"
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
            {[...links, { label: 'Book a Call', href: '#book' }].map(l => (
              <a key={l.label} href={l.href} className="nav-link" onClick={() => setOpen(false)}>{l.label}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

/* ═══════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════ */
function Hero() {
  const { springX, springY } = useMouseParallax()
  const photoX = useTransform(springX, v => v * 12)
  const photoY = useTransform(springY, v => v * 10)
  const doodleX = useTransform(springX, v => v * -8)
  const doodleY = useTransform(springY, v => v * -6)
  const threadX = useTransform(springX, v => v * -5)
  const threadY = useTransform(springY, v => v * -3)
  const [imgError, setImgError] = useState(false)

  const wordAnim = (delay: number) => ({
    initial: { opacity: 0, y: 70, skewY: 3 },
    animate: { opacity: 1, y: 0, skewY: 0 },
    transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  })

  return (
    <section id="home" className="hero-section">
      <div className="hero-dot-grid" />
      <motion.svg className="hero-thread-svg" viewBox="0 0 1440 900" fill="none" style={{ x: threadX, y: threadY }}>
        <motion.path d="M -80 750 C 180 640, 260 180, 480 280 C 680 370, 560 580, 860 360 C 1060 210, 1180 480, 1560 160"
          stroke="rgba(200,150,62,0.12)" strokeWidth="1.5" fill="none" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3.2, delay: 0.3, ease: 'easeInOut' }} />
        <motion.path d="M 0 820 C 220 700, 360 380, 580 460 C 780 540, 660 200, 980 280 C 1180 340, 1280 580, 1650 380"
          stroke="rgba(45,106,79,0.07)" strokeWidth="1" fill="none" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3.8, delay: 0.8, ease: 'easeInOut' }} />
      </motion.svg>

      <motion.div style={{ x: doodleX, y: doodleY, position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <CricketDoodle style={{ top: '14%', left: '5%' }} />
        <CinemaDoodle style={{ top: '22%', right: '4%' }} />
        <RotaryDoodle style={{ top: '62%', left: '3%' }} />
        <LeafDoodle style={{ top: '72%', right: '6%' }} />
        <PoliticsDoodle style={{ top: '45%', right: '2%' }} />
      </motion.div>

      <div className="hero-inner">
        <div className="hero-left">
          <motion.div className="hero-location"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}>
            <span className="loc-dot" /><MapPin size={10} style={{ opacity: 0.5 }} />
            Coimbatore, Tamil Nadu
          </motion.div>
          <h1 className="hero-headline">
            <span className="line"><motion.span {...wordAnim(0.4)}>Educator.</motion.span></span>
            <span className="line line-gold"><motion.span {...wordAnim(0.55)}>Environmental</motion.span></span>
            <span className="line"><motion.span {...wordAnim(0.7)}>Thinker.</motion.span></span>
            <span className="line line-muted"><motion.span {...wordAnim(0.85)}>Mentor. Storyteller.</motion.span></span>
          </h1>
          <motion.p className="hero-sub"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}>
            Rathnavel Ponnuswami brings together engineering education,
            environmental awareness, insurance advisory, and community
            service — a career dedicated to learning, guidance, and public impact.
          </motion.p>
          <motion.div className="hero-ctas"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}>
            <a href="https://www.linkedin.com/in/reavan/" target="_blank" rel="noopener noreferrer" className="btn-primary">
              <Linkedin size={15} /> Connect on LinkedIn <ArrowRight size={14} />
            </a>
            <a href="#book" className="btn-outline"><Calendar size={14} /> Book a Session</a>
          </motion.div>
        </div>

        <div className="hero-right">
          <motion.div className="hero-photo-wrap" style={{ x: photoX, y: photoY }}
            initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}>
            {!imgError ? (
              <img src="/rathnavel.jpg" alt="Rathnavel Ponnuswami" className="hero-photo"
                onError={() => setImgError(true)} />
            ) : (
              <div className="hero-photo-fallback"><span>RP</span></div>
            )}
            <div className="hero-photo-ring" />
          </motion.div>
          <motion.div className="stats-card"
            initial={{ opacity: 0, x: 40, y: 10 }} animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <div className="stats-badge">RP</div>
            <div className="stats-number">20<span>+</span></div>
            <div className="stats-number-label">Years of Impact</div>
            <p className="stats-desc">Teaching, mentoring, institution building, environmental engineering, and community engagement.</p>
            <div className="stats-tags">
              <span>Educator</span><span>Engineer</span><span>Advisor</span><span>Rotarian</span>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div className="scroll-hint" animate={{ y: [0, 9, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}>
        <div className="scroll-line" /><span>Scroll</span>
      </motion.div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   CREDIBILITY STRIP
═══════════════════════════════════════════════════ */
function CredibilityStrip() {
  const { ref, visible } = useScrollReveal()
  const items = [
    { icon: '🎓', title: '20+ Years', sub: 'Education & Mentorship' },
    { icon: '🌿', title: 'M.E.', sub: 'Environmental Engineering' },
    { icon: '🛡️', title: 'Advisor', sub: 'ICICI Prudential Life' },
    { icon: '🔵', title: 'Rotarian', sub: 'Community Contributor' },
    { icon: '🎤', title: 'Speaker', sub: 'Public Engagement' },
  ]
  return (
    <div className="strip-section" ref={ref}>
      <div className="strip-inner">
        {items.map((item, i) => (
          <motion.div key={i} className="strip-item"
            initial={{ opacity: 0, y: 20 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08 }}>
            <span className="strip-icon">{item.icon}</span>
            <span className="strip-title">{item.title}</span>
            <span className="strip-sub">{item.sub}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   IMPACT NUMBERS — COUNTUP  (color fixed: white text on dark)
═══════════════════════════════════════════════════ */
function ImpactNumbers() {
  const { ref, visible } = useScrollReveal(0.2)
  const stats = [
    { to: 299, suffix: '+', label: 'Sessions Handled', icon: '🎤' },
    { to: 15000, suffix: '+', label: 'Participants Reached', icon: '👥' },
    { to: 20, suffix: '+', label: 'Years of Teaching', icon: '📚' },
    { to: 9, suffix: '', label: 'Institutions Served', icon: '🏛️' },
  ]
  return (
    <section style={{ background: '#1D1D1F', padding: '5rem 0', position: 'relative', overflow: 'hidden' }} ref={ref}>
      <div style={{ position: 'absolute', top: -100, left: -100, width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(200,150,62,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -100, right: -100, width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(45,106,79,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}>
        <motion.div style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>
          <div className="eyebrow" style={{ justifyContent: 'center', color: 'rgba(200,150,62,0.75)' }}>Impact in Numbers</div>
          <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(2rem,3.5vw,3rem)',
            fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>
            20 Years. Thousands of{' '}
            <span style={{ color: '#E8C97A' }}>Lives Touched.</span>
          </h2>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1,
          background: 'rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.06)' }}>
          {stats.map((s, i) => (
            <motion.div key={i}
              style={{ background: '#1D1D1F', padding: '2.5rem 2rem', textAlign: 'center' }}
              initial={{ opacity: 0, y: 24 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{s.icon}</div>
              {/* ← FIXED: direct color, no gradient class */}
              <div style={{ fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(2.5rem,4vw,3.8rem)', fontWeight: 700, lineHeight: 1,
                marginBottom: '0.5rem', color: '#E8C97A' }}>
                {visible ? <CountUp to={s.to} suffix={s.suffix} /> : `0${s.suffix}`}
              </div>
              <div style={{ fontFamily: '"Manrope", system-ui, sans-serif', fontSize: '0.72rem',
                letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.35)' }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   ABOUT
═══════════════════════════════════════════════════ */
function About() {
  const { ref, visible } = useScrollReveal()
  const [imgError, setImgError] = useState(false)
  const badges = [
    { icon: '🔵', label: 'Rotarian', color: '#1B4F72' },
    { icon: '❤️', label: 'Organ Donor', color: '#C0392B' },
    { icon: '🌿', label: 'Environmentalist', color: '#2D6A4F' },
    { icon: '🎓', label: 'Educator', color: '#7D6608' },
    { icon: '🏏', label: 'Cricket Fan', color: '#1A5276' },
    { icon: '🎬', label: 'Cinema Lover', color: '#6C3483' },
  ]
  return (
    <section id="about" className="about-section section-pad" ref={ref}>
      <div className="about-inner">
        <motion.div initial={{ opacity: 0, x: -40 }}
          animate={visible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          <div className="eyebrow">About Rathnavel</div>
          <h2 className="about-heading">Two Decades of<br /><span className="gold-text">Purposeful Work</span></h2>
          <p className="about-body">
            With a Master's in Environmental Engineering from Government College of Technology,
            Coimbatore, Rathnavel has spent over two decades at the intersection of education,
            environment, and community. From shaping engineering students to advising families
            on financial security, every chapter reflects a commitment to service and depth.
          </p>
          <p className="about-body">
            Beyond the classroom, he is a proud Rotarian, an organ donor, a memoir writer, and
            a lifelong lover of cricket, cinema, and civic discourse. His work spans civil
            engineering, solid waste management, GIS, and structural design — always anchored
            in real-world impact.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '0.5rem', marginBottom: '2rem' }}>
            {badges.map((b, i) => (
              <motion.span key={i}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                  padding: '0.35rem 0.85rem', borderRadius: '100px', fontSize: '0.72rem',
                  fontFamily: '"Manrope", system-ui, sans-serif', fontWeight: 500,
                  border: `1px solid ${b.color}30`, background: `${b.color}0A`, color: b.color }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={visible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                whileHover={{ scale: 1.06 }}>
                {b.icon} {b.label}
              </motion.span>
            ))}
          </div>
          <div className="about-stats-row">
            {[{ num: '9', lbl: 'Institutions' }, { num: '1000+', lbl: 'Students Mentored' }, { num: '4', lbl: 'Domains of Work' }].map((s, i) => (
              <div key={i}>
                <span className="about-stat-num">{s.num}</span>
                <span className="about-stat-lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div className="about-photo-frame"
          initial={{ opacity: 0, x: 40 }}
          animate={visible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
          {!imgError ? (
            <img src="/rathnavel.jpg" alt="Rathnavel Ponnuswami" className="about-photo"
              onError={() => setImgError(true)} />
          ) : (
            <div className="about-photo-fallback">RP</div>
          )}
          <div className="about-accent-line" />
          <div className="about-accent-dot" />
          <motion.div
            style={{ position: 'absolute', bottom: '2rem', right: '-1.5rem',
              background: 'white', borderRadius: 12, padding: '0.75rem 1rem',
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)', border: '1px solid rgba(0,0,0,0.06)',
              display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap' as const, zIndex: 3 }}
            initial={{ opacity: 0, x: 20 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}>
            <Heart size={16} color="#C0392B" fill="#C0392B" />
            <span style={{ fontFamily: '"Manrope", system-ui, sans-serif', fontSize: '0.72rem', fontWeight: 600, color: '#1D1D1F' }}>
              Organ Donor
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   SKETCH ROAD MAP TIMELINE
═══════════════════════════════════════════════════ */
function Journey() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const pathLength = useTransform(scrollYProgress, [0.05, 0.85], [0, 1])
  const { ref: titleRef, visible: titleVisible } = useScrollReveal(0.1)

  const entries = [
    { year: '2004', org: 'Hindusthan College', role: 'Lecturer', detail: 'Environmental Science & Strength of Materials' },
    { year: '2005', org: 'Tamilnadu College', role: 'Lecturer', detail: 'Municipal Solid Waste, Railway Engineering' },
    { year: '2007', org: 'SNS College', role: 'Lecturer', detail: 'Engineering Graphics & Environmental Science' },
    { year: '2008', org: 'Adithya Institute', role: 'Senior Lecturer', detail: 'Mechanical Dept, Industry Relations Head' },
    { year: '2009', org: 'Kalaivani College', role: 'Assistant Professor', detail: 'Soil Mechanics, Applied Hydraulics, Geology' },
    { year: '2012', org: 'KTVR Knowledge Park', role: 'Asst. Prof. Senior Grade', detail: 'Department Incharge, Accreditation Cell' },
    { year: '2013', org: 'Coimbatore Institute', role: 'Asst. Prof. Gr.3', detail: 'Civil Engineering Department' },
    { year: '2015', org: 'Akshaya College', role: 'Assistant Professor', detail: '9 years — student engagement & mentorship' },
    { year: '2021', org: 'ICICI Prudential Life', role: 'Insurance Advisor', detail: 'Present — protecting futures across Tamil Nadu' },
  ]

  // Pin colors — one per milestone, vibrant like the doodle reference
  const pinColors = ['#E74C3C','#E67E22','#27AE60','#2980B9','#8E44AD','#E74C3C','#16A085','#E67E22','#C0392B']

  // Pin positions (px, py = TIP of pin) and card side
  // SVG viewBox: 0 0 920 2020
  // Right-side pins (x≈740): card goes to the left
  // Left-side pins (x≈160): card goes to the right
  const pins = [
    { x: 740, y: 100,  side: 'left'  as const },
    { x: 160, y: 320,  side: 'right' as const },
    { x: 740, y: 540,  side: 'left'  as const },
    { x: 160, y: 760,  side: 'right' as const },
    { x: 740, y: 980,  side: 'left'  as const },
    { x: 160, y: 1200, side: 'right' as const },
    { x: 740, y: 1420, side: 'left'  as const },
    { x: 160, y: 1640, side: 'right' as const },
    { x: 460, y: 1880, side: 'right' as const },
  ]

  // Winding sketch road connecting all pins
  const roadPath = [
    'M 740 100',
    'C 580 160, 320 240, 160 320',
    'C 60 380, 100 460, 740 540',
    'C 880 580, 860 680, 160 760',
    'C 50 820, 100 900, 740 980',
    'C 880 1020, 850 1120, 160 1200',
    'C 50 1260, 100 1340, 740 1420',
    'C 880 1460, 850 1560, 160 1640',
    'C 50 1700, 280 1820, 460 1880',
  ].join(' ')

  return (
    <section id="journey" className="journey-section section-pad" ref={sectionRef}>
      <div ref={titleRef} style={{ textAlign: 'center', marginBottom: '3rem', padding: '0 2rem' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={titleVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>The Journey</div>
          <h2 className="journey-heading">
            20 Years, <span className="gold-text">One Direction</span>
          </h2>
          <p style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '1.1rem',
            color: 'var(--text-3)', maxWidth: 480, margin: '0 auto' }}>
            Each pin marks a chapter. Follow the road.
          </p>
        </motion.div>
      </div>

      {/* SKETCH ROAD CONTAINER */}
      <div style={{ position: 'relative', maxWidth: 960, margin: '0 auto', padding: '0 1rem', minHeight: 2060 }}>

        {/* SVG SKETCH ROAD */}
        <svg
          style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'visible' }}
          viewBox="0 0 920 2020"
          preserveAspectRatio="xMidYMin meet"
          fill="none"
        >
          <defs>
            {/* Hand-drawn sketch filter */}
            <filter id="sketch-road" x="-5%" y="-1%" width="110%" height="102%">
              <feTurbulence type="fractalNoise" baseFrequency="0.025 0.055" numOctaves="3" seed="8" result="noise"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.5" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
            {/* Slightly different seed for the dashed overlay */}
            <filter id="sketch-dash" x="-5%" y="-1%" width="110%" height="102%">
              <feTurbulence type="fractalNoise" baseFrequency="0.03 0.06" numOctaves="2" seed="12" result="noise"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
          </defs>

          {/* Base road — dark thin sketch line */}
          <motion.path
            d={roadPath}
            stroke="rgba(0,0,0,0.14)"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#sketch-road)"
            style={{ pathLength }}
          />

          {/* Second pass — slightly offset for sketch texture */}
          <motion.path
            d={roadPath}
            stroke="rgba(0,0,0,0.06)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#sketch-dash)"
            style={{ pathLength, opacity: 0.7 }}
          />

          {/* Gold dashed center line — like a road marking */}
          <motion.path
            d={roadPath}
            stroke="rgba(200,150,62,0.3)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="14 8"
            filter="url(#sketch-road)"
            style={{ pathLength, opacity: 0.5 }}
          />

          {/* MAP PINS — each drops with a bounce */}
          {pins.map((pin, i) => (
            <MapPinDrop key={i} x={pin.x} y={pin.y} color={pinColors[i]} delay={0.5 + i * 0.14} />
          ))}
        </svg>

        {/* MILESTONE CARDS — absolutely positioned near each pin */}
        {pins.map((pin, i) => {
          const isLeft = pin.side === 'left'
          // Left side card: positioned to the left of the right-side pin
          // Right side card: positioned to the right of the left-side pin
          const cardStyle: React.CSSProperties = {
            position: 'absolute',
            top: pin.y - 52,
            zIndex: 2,
            width: 268,
            ...(isLeft
              ? { right: `${920 - pin.x + 18}px` }
              : { left: `${pin.x + 22}px` }),
          }
          // For center pin (item 8, x=460), position card to right
          if (i === 8) {
            cardStyle.left = `${pin.x + 22}px`
            cardStyle.right = undefined
          }

          return (
            <motion.div key={i} style={cardStyle}
              initial={{ opacity: 0, x: isLeft ? 16 : -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
              <div style={{
                background: 'white',
                border: '1px solid rgba(0,0,0,0.07)',
                borderRadius: 12,
                padding: '1rem 1.25rem',
                boxShadow: '0 4px 18px rgba(0,0,0,0.07)',
                borderLeft: `3px solid ${pinColors[i]}`,
                position: 'relative',
              }}>
                <span className="tl-year">{entries[i].year}</span>
                <div className="tl-org">{entries[i].org}</div>
                <div className="tl-role">{entries[i].role}</div>
                <div className="tl-detail">{entries[i].detail}</div>
                {i === 8 && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: '0.5rem',
                    fontFamily: '"Manrope", system-ui, sans-serif', fontSize: '0.62rem', fontWeight: 700,
                    color: '#27AE60', background: 'rgba(39,174,96,0.08)', padding: '0.2rem 0.6rem',
                    borderRadius: 100, letterSpacing: '0.08em' }}>
                    ● PRESENT
                  </span>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   PILLARS
═══════════════════════════════════════════════════ */
function Pillars() {
  const { ref, visible } = useScrollReveal()
  const pillars = [
    { icon: '🎓', name: '20+ Years', sub: 'Education & Mentorship' },
    { icon: '🌿', name: 'M.E.', sub: 'Environmental Engineering' },
    { icon: '🛡️', name: 'Advisor', sub: 'ICICI Prudential Life' },
    { icon: '🔵', name: 'Rotarian', sub: 'Community Contributor' },
    { icon: '✍️', name: 'Author', sub: 'Memoir Writer' },
  ]
  return (
    <section id="work" className="pillars-section section-pad" ref={ref}>
      <div className="pillars-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Pillars of Work</div>
          <h2 className="pillars-heading">Five Roles, <span className="gold-text">One Purpose</span></h2>
        </motion.div>
        <div className="pillars-grid">
          {pillars.map((p, i) => (
            <motion.div key={i} className="pillar-card"
              initial={{ opacity: 0, y: 30 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.05 + i * 0.09 }}
              whileHover={{ y: -6 }}>
              <div className="pillar-icon-wrap">{p.icon}</div>
              <div className="pillar-name">{p.name}</div>
              <div className="pillar-sub">{p.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   EXPERIENCE HIGHLIGHTS
═══════════════════════════════════════════════════ */
function ExperienceHighlights() {
  const { ref, visible } = useScrollReveal()
  const cards = [
    { period: 'Jun 2015 – May 2024', title: 'Assistant Professor', org: 'Akshaya College of Engineering & Technology', accent: '#C8963E',
      bullets: ['Laboratory & classroom management for 9 years', 'Student engagement and academic mentorship', 'Curriculum oversight across Civil Engineering subjects'] },
    { period: 'Jan 2021 – Present', title: 'Insurance Advisor', org: 'ICICI Prudential Life Insurance', accent: '#2D6A4F',
      bullets: ['Financial planning advisory for families', 'Building trust through long-term relationships', 'Protecting futures across Tamil Nadu'] },
    { period: 'Jul 2012 – Jul 2013', title: 'Asst. Prof. (Senior Grade)', org: 'KTVR Knowledge Park', accent: '#1B4F72',
      bullets: ['Department Incharge for Civil Engineering', 'Head of Curriculum Development Cell', 'Led Accreditation Cell and Public Relations'] },
  ]
  return (
    <section className="exp-section section-pad" ref={ref}>
      <div className="exp-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Experience</div>
          <h2 className="pillars-heading">Career <span className="gold-text">Highlights</span></h2>
        </motion.div>
        <div className="exp-grid">
          {cards.map((c, i) => (
            <motion.div key={i} className="exp-card"
              initial={{ opacity: 0, y: 30 }} animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.1 }}>
              <div className="exp-accent" style={{ background: c.accent }} />
              <div className="exp-period">{c.period}</div>
              <div className="exp-title">{c.title}</div>
              <div className="exp-org">{c.org}</div>
              <ul className="exp-bullets">{c.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   BOOK A SESSION — CALENDLY PLACEHOLDER
═══════════════════════════════════════════════════ */
function BookSession() {
  const { ref, visible } = useScrollReveal()
  return (
    <section id="book" className="section-pad" style={{ background: '#FAFAFA', borderTop: '1px solid rgba(0,0,0,0.06)' }} ref={ref}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Book a Session</div>
          <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(2rem,3.5vw,3rem)',
            fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Schedule a <span className="gold-text">Conversation</span>
          </h2>
          <p style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '1.15rem',
            color: 'var(--text-3)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            Whether you need mentorship, career guidance, insurance advisory, or just a meaningful conversation —
            Rathnavel is open to connecting.
          </p>

          {/* ── CALENDLY PLACEHOLDER ─────────────────────────
              When you have your Calendly link, replace this div with:

              <div className="calendly-inline-widget"
                data-url="https://calendly.com/YOUR_USERNAME"
                style={{ minWidth: 320, height: 700 }} />
              <script src="https://assets.calendly.com/assets/external/widget.js" async />
          ──────────────────────────────────────────────── */}
          <div style={{
            background: 'white',
            border: '2px dashed rgba(200,150,62,0.3)',
            borderRadius: 20,
            padding: '4rem 2rem',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'
          }}>
            <motion.div
              animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
              <Calendar size={48} color="rgba(200,150,62,0.5)" />
            </motion.div>
            <p style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '1.3rem',
              color: 'var(--text-2)', margin: 0, fontWeight: 600 }}>
              Calendly Booking Coming Soon
            </p>
            <p style={{ fontFamily: '"Manrope", system-ui, sans-serif', fontSize: '0.78rem',
              color: 'var(--text-4)', letterSpacing: '0.08em', margin: 0 }}>
              SHARE YOUR CALENDLY LINK TO ACTIVATE THIS SECTION
            </p>
            <a href="mailto:reavan@gmail.com" className="btn-primary" style={{ marginTop: '0.5rem' }}>
              <Mail size={15} /> Email to Book Instead
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   SOCIAL CONNECT
═══════════════════════════════════════════════════ */
const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
  </svg>
)

function SocialConnect() {
  const { ref, visible } = useScrollReveal()
  const socials = [
    { name: 'LinkedIn', handle: '@reavan', url: 'https://www.linkedin.com/in/reavan/', icon: <Linkedin size={18} />, color: '#0A66C2', desc: 'Professional updates and career milestones.' },
    { name: 'X / Twitter', handle: '@reavan', url: 'https://x.com/reavan', icon: <Twitter size={18} />, color: '#1DA1F2', desc: 'Thoughts on education, society, and daily life.' },
    { name: 'Instagram', handle: '@reavan1881', url: 'https://www.instagram.com/reavan1881', icon: <Instagram size={18} />, color: '#E1306C', desc: 'Moments, memories, and the world around.' },
    { name: 'Facebook', handle: '@reavan', url: 'https://www.facebook.com/reavan', icon: <Facebook size={18} />, color: '#1877F2', desc: 'Community, stories, and personal milestones.' },
    { name: 'Pinterest', handle: '@reavan', url: 'https://pin.it/34KNJeLko', icon: <PinterestIcon />, color: '#E60023', desc: 'Curated interests and visual inspiration.' },
    { name: 'Email', handle: 'reavan@gmail.com', url: 'mailto:reavan@gmail.com', icon: <Mail size={18} />, color: '#C8963E', desc: 'For collaborations, speaking, and inquiries.' },
  ]
  return (
    <section id="connect" className="social-section section-pad" ref={ref}>
      <div className="social-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Social</div>
          <h2 className="social-heading">Connect with <span className="gold-text">Rathnavel</span></h2>
          <p className="social-sub">Follow the journey across platforms — professional, personal, and community.</p>
        </motion.div>
        <div className="social-grid">
          {socials.map((s, i) => (
            <motion.a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="social-card"
              initial={{ opacity: 0, y: 24 }} animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.05 + i * 0.08 }} whileHover={{ y: -4 }}>
              <div className="social-icon-wrap" style={{ background: s.color + '14', color: s.color, border: `1px solid ${s.color}22` }}>
                {s.icon}
              </div>
              <div>
                <div className="social-platform">{s.name}</div>
                <div className="social-handle">{s.handle}</div>
                <p className="social-desc">{s.desc}</p>
              </div>
              <ExternalLink size={12} style={{ color: '#AEAEB2', flexShrink: 0, marginLeft: 'auto', marginTop: '0.2rem' }} />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   FINAL CTA
═══════════════════════════════════════════════════ */
function FinalCTA() {
  const { ref, visible } = useScrollReveal()
  return (
    <section className="cta-section section-pad" ref={ref}>
      <div className="cta-glow-1" /><div className="cta-glow-2" /><div className="cta-divider" />
      <div className="cta-container">
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={visible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          <div className="cta-badge">RP</div>
          <h2 className="cta-heading">Let's connect through education,<br />environment, and stories.</h2>
          <p className="cta-sub">Whether you're a student, a professional, a Rotarian, or someone seeking guidance — reach out.</p>
          <div className="cta-buttons">
            <a href="https://www.linkedin.com/in/reavan/" target="_blank" rel="noopener noreferrer" className="btn-white">
              <Linkedin size={15} /> Connect on LinkedIn <ArrowRight size={13} />
            </a>
            <a href="mailto:reavan@gmail.com" className="btn-ghost">
              <Mail size={15} /> reavan@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════ */
function Footer() {
  const socials = [
    { href: 'https://www.linkedin.com/in/reavan/', icon: <Linkedin size={15} /> },
    { href: 'https://x.com/reavan', icon: <Twitter size={15} /> },
    { href: 'https://www.instagram.com/reavan1881', icon: <Instagram size={15} /> },
    { href: 'https://www.facebook.com/reavan', icon: <Facebook size={15} /> },
  ]
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="footer-name">Rathnavel Ponnuswami</div>
          <div className="footer-copy">© 2025 · rathnavelpon.in · All rights reserved</div>
        </div>
        <div className="footer-socials">
          {socials.map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="footer-social-btn">{s.icon}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}

/* ═══════════════════════════════════════════════════
   APP ROOT
═══════════════════════════════════════════════════ */
export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF' }}>
      <Navigation />
      <main>
        <Hero />
        <CredibilityStrip />
        <ImpactNumbers />
        <About />
        <Journey />
        <Pillars />
        <ExperienceHighlights />
        <BookSession />
        <SocialConnect />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
