import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  Linkedin, Twitter, Instagram, Facebook,
  Mail, MapPin, ArrowRight, Menu, X, ExternalLink
} from 'lucide-react'

/* ─────────────────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────────────────── */
function useMouseParallax() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 35, damping: 18 })
  const springY = useSpring(mouseY, { stiffness: 35, damping: 18 })
  useEffect(() => {
    const h = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      mouseX.set((e.clientX - cx) / cx)
      mouseY.set((e.clientY - cy) / cy)
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

/* ─────────────────────────────────────────────────────────
   NAVIGATION
───────────────────────────────────────────────────────── */
function Navigation() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const links = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Journey', href: '#journey' },
    { label: 'Work', href: '#work' },
  ]

  return (
    <motion.header
      className={`nav-root ${scrolled ? 'nav-solid' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="nav-inner">
        <a href="#home" className="nav-logo">
          <div className="nav-logo-badge">
            <span className="nav-logo-initials">RP</span>
          </div>
          <span className="nav-logo-name">Rathnavel Ponnuswami</span>
        </a>
        <div className="nav-links">
          {links.map(l => (
            <a key={l.label} href={l.href} className="nav-link">{l.label}</a>
          ))}
          <a href="#connect" className="nav-cta">Connect</a>
        </div>
        <button className="nav-mobile-toggle" onClick={() => setOpen(!open)} aria-label="menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {[...links, { label: 'Connect', href: '#connect' }].map(l => (
              <a key={l.label} href={l.href} className="nav-link"
                onClick={() => setOpen(false)}>{l.label}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

/* ─────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────── */
function Hero() {
  const { springX, springY } = useMouseParallax()
  const photoX = useTransform(springX, v => v * 12)
  const photoY = useTransform(springY, v => v * 12)
  const threadX = useTransform(springX, v => v * -6)
  const threadY = useTransform(springY, v => v * -4)

  const wordAnim = (delay: number) => ({
    initial: { opacity: 0, y: 70, skewY: 4 },
    animate: { opacity: 1, y: 0, skewY: 0 },
    transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  })

  return (
    <section id="home" className="hero-section">
      {/* Dot grid bg */}
      <div className="hero-dot-grid" />

      {/* Animated SVG thread */}
      <motion.svg
        className="hero-thread-svg"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ x: threadX, y: threadY }}
      >
        <motion.path
          d="M -80 750 C 180 640, 260 180, 480 280 C 680 370, 560 580, 860 360 C 1060 210, 1180 480, 1560 160"
          stroke="rgba(200,150,62,0.13)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, delay: 0.3, ease: 'easeInOut' }}
        />
        <motion.path
          d="M 0 820 C 220 700, 360 380, 580 460 C 780 540, 660 200, 980 280 C 1180 340, 1280 580, 1650 380"
          stroke="rgba(45,106,79,0.08)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3.5, delay: 0.8, ease: 'easeInOut' }}
        />
        <motion.path
          d="M 100 880 C 300 780, 500 500, 700 560 C 900 620, 800 300, 1100 380 C 1300 440, 1380 660, 1700 460"
          stroke="rgba(200,150,62,0.06)"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 4, delay: 1.2, ease: 'easeInOut' }}
        />
      </motion.svg>

      <div className="hero-inner">
        {/* LEFT */}
        <div className="hero-left">
          <motion.div
            className="hero-location"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="loc-dot" />
            <MapPin size={10} style={{ opacity: 0.5 }} />
            Coimbatore, Tamil Nadu
          </motion.div>

          <h1 className="hero-headline">
            <span className="line">
              <motion.span {...wordAnim(0.4)}>Educator.</motion.span>
            </span>
            <span className="line line-gold">
              <motion.span {...wordAnim(0.55)}>Environmental</motion.span>
            </span>
            <span className="line">
              <motion.span {...wordAnim(0.7)}>Thinker.</motion.span>
            </span>
            <span className="line line-muted">
              <motion.span {...wordAnim(0.85)}>Mentor. Storyteller.</motion.span>
            </span>
          </h1>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            Rathnavel Ponnuswami brings together engineering education,
            environmental awareness, insurance advisory, and community
            service — a career dedicated to learning, guidance, and public impact.
          </motion.p>

          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <a
              href="https://www.linkedin.com/in/reavan/"
              target="_blank" rel="noopener noreferrer"
              className="btn-primary"
            >
              <Linkedin size={15} />
              Connect on LinkedIn
              <ArrowRight size={14} />
            </a>
            <a href="#journey" className="btn-outline">
              Explore Journey ↓
            </a>
          </motion.div>
        </div>

        {/* RIGHT */}
        <div className="hero-right">
          <motion.div
            className="hero-photo-wrap"
            style={{ x: photoX, y: photoY }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src="/rathnavel.jpg" alt="Rathnavel Ponnuswami" className="hero-photo" />
            <div className="hero-photo-ring" />
          </motion.div>

          <motion.div
            className="stats-card"
            initial={{ opacity: 0, x: 40, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="stats-badge">RP</div>
            <div className="stats-number">20<span>+</span></div>
            <div className="stats-number-label">Years of Impact</div>
            <p className="stats-desc">
              Teaching, mentoring, institution building, environmental engineering,
              and community engagement.
            </p>
            <div className="stats-tags">
              <span>Educator</span>
              <span>Engineer</span>
              <span>Advisor</span>
              <span>Rotarian</span>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="scroll-hint"
        animate={{ y: [0, 9, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
      >
        <div className="scroll-line" />
        <span>Scroll</span>
      </motion.div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────
   CREDIBILITY STRIP
───────────────────────────────────────────────────────── */
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
          <motion.div
            key={i}
            className="strip-item"
            initial={{ opacity: 0, y: 20 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08 }}
          >
            <span className="strip-icon">{item.icon}</span>
            <span className="strip-title">{item.title}</span>
            <span className="strip-sub">{item.sub}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   ABOUT
───────────────────────────────────────────────────────── */
function About() {
  const { ref, visible } = useScrollReveal()
  return (
    <section id="about" className="about-section section-pad" ref={ref}>
      <div className="about-inner">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={visible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="eyebrow">About Rathnavel</div>
          <h2 className="about-heading">
            Two Decades of<br />
            <span className="gold-text">Purposeful Work</span>
          </h2>
          <p className="about-body">
            With a Master's in Environmental Engineering from Government College of Technology,
            Coimbatore, Rathnavel has spent over two decades at the intersection of education,
            environment, and community. From shaping engineering students to advising families
            on financial security, every chapter reflects a commitment to service and depth.
          </p>
          <p className="about-body">
            Beyond the classroom, he is a Rotarian, a memoir writer, and a believer in the
            transformative power of knowledge. His work spans civil engineering, solid waste
            management, GIS, irrigation systems, and structural design — always anchored in
            real-world impact.
          </p>
          <div className="about-stats-row">
            {[
              { num: '9', lbl: 'Institutions' },
              { num: '1000+', lbl: 'Students Mentored' },
              { num: '4', lbl: 'Domains of Work' },
            ].map((s, i) => (
              <div key={i}>
                <span className="about-stat-num">{s.num}</span>
                <span className="about-stat-lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="about-photo-frame"
          initial={{ opacity: 0, x: 40 }}
          animate={visible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src="/rathnavel.jpg" alt="Rathnavel Ponnuswami" className="about-photo" />
          <div className="about-accent-line" />
          <div className="about-accent-dot" />
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────
   JOURNEY TIMELINE
───────────────────────────────────────────────────────── */
function Journey() {
  const { ref: secRef, visible } = useScrollReveal(0.05)
  const { scrollYProgress } = useScroll({ target: secRef })
  const lineScale = useTransform(scrollYProgress, [0, 0.8], [0, 1])

  const entries = [
    { year: '2004', org: 'Hindusthan College', role: 'Lecturer', detail: 'Environmental Science & Strength of Materials' },
    { year: '2005', org: 'Tamilnadu College', role: 'Lecturer', detail: 'Municipal Solid Waste, Railway Engineering' },
    { year: '2007', org: 'SNS College of Engineering', role: 'Lecturer', detail: 'Engineering Graphics & Environmental Science' },
    { year: '2008', org: 'Adithya Institute', role: 'Senior Lecturer', detail: 'Mechanical Engineering Dept, Industry Relations' },
    { year: '2009', org: 'Kalaivani College', role: 'Assistant Professor', detail: 'Soil Mechanics, Applied Hydraulics, Geology' },
    { year: '2012', org: 'KTVR Knowledge Park', role: 'Asst. Prof. Senior Grade', detail: 'Dept Incharge, Accreditation Cell Lead' },
    { year: '2013', org: 'Coimbatore Institute', role: 'Assistant Professor Gr.3', detail: 'Civil Engineering Department' },
    { year: '2015', org: 'Akshaya College', role: 'Assistant Professor', detail: '9 years — classroom management, student engagement' },
    { year: '2021', org: 'ICICI Prudential Life', role: 'Insurance Advisor', detail: 'Present — protecting futures, advisory excellence' },
  ]

  return (
    <section id="journey" className="journey-section section-pad" ref={secRef}>
      <div className="journey-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="eyebrow" style={{ justifyContent: 'center' }}>The Journey</div>
          <h2 className="journey-heading">
            20 Years, <span className="gold-text">One Direction</span>
          </h2>
        </motion.div>

        <div className="timeline">
          <div className="timeline-spine" />
          <motion.div
            className="timeline-spine-fill"
            style={{ scaleY: lineScale, originY: 0, height: '100%' }}
          />
          {entries.map((e, i) => {
            const isLeft = i % 2 === 0
            return (
              <motion.div
                key={i}
                className="tl-item"
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                animate={visible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.07 }}
              >
                {isLeft ? (
                  <>
                    <div className="tl-left">
                      <span className="tl-year">{e.year}</span>
                      <div className="tl-org">{e.org}</div>
                      <div className="tl-role">{e.role}</div>
                      <div className="tl-detail">{e.detail}</div>
                    </div>
                    <div className="tl-center"><div className="tl-dot" /></div>
                    <div className="tl-right" />
                  </>
                ) : (
                  <>
                    <div className="tl-left" />
                    <div className="tl-center"><div className="tl-dot" /></div>
                    <div className="tl-right">
                      <span className="tl-year">{e.year}</span>
                      <div className="tl-org">{e.org}</div>
                      <div className="tl-role">{e.role}</div>
                      <div className="tl-detail">{e.detail}</div>
                    </div>
                  </>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────
   PILLARS
───────────────────────────────────────────────────────── */
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Pillars of Work</div>
          <h2 className="pillars-heading">
            Five Roles, <span className="gold-text">One Purpose</span>
          </h2>
        </motion.div>
        <div className="pillars-grid">
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              className="pillar-card"
              initial={{ opacity: 0, y: 30 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.05 + i * 0.09 }}
              whileHover={{ y: -6 }}
            >
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

/* ─────────────────────────────────────────────────────────
   EXPERIENCE HIGHLIGHTS
───────────────────────────────────────────────────────── */
function ExperienceHighlights() {
  const { ref, visible } = useScrollReveal()
  const cards = [
    {
      period: 'Jun 2015 – May 2024',
      title: 'Assistant Professor',
      org: 'Akshaya College of Engineering & Technology',
      accent: '#C8963E',
      bullets: [
        'Laboratory & classroom management for 9 years',
        'Student engagement and academic mentorship',
        'Curriculum oversight across Civil Engineering subjects',
      ],
    },
    {
      period: 'Jan 2021 – Present',
      title: 'Insurance Advisor',
      org: 'ICICI Prudential Life Insurance',
      accent: '#2D6A4F',
      bullets: [
        'Financial planning advisory for families',
        'Building trust through long-term relationships',
        'Protecting futures across Tamil Nadu',
      ],
    },
    {
      period: 'Jul 2012 – Jul 2013',
      title: 'Asst. Prof. (Senior Grade)',
      org: 'KTVR Knowledge Park',
      accent: '#1B4F72',
      bullets: [
        'Department Incharge for Civil Engineering',
        'Head of Curriculum Development Cell',
        'Led Accreditation Cell and Public Relations',
      ],
    },
  ]
  return (
    <section className="exp-section section-pad" ref={ref}>
      <div className="exp-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Experience</div>
          <h2 className="pillars-heading">
            Career <span className="gold-text">Highlights</span>
          </h2>
        </motion.div>
        <div className="exp-grid">
          {cards.map((c, i) => (
            <motion.div
              key={i}
              className="exp-card"
              initial={{ opacity: 0, y: 30 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.1 }}
            >
              <div className="exp-accent" style={{ background: c.accent }} />
              <div className="exp-period">{c.period}</div>
              <div className="exp-title">{c.title}</div>
              <div className="exp-org">{c.org}</div>
              <ul className="exp-bullets">
                {c.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────
   SOCIAL CONNECT
───────────────────────────────────────────────────────── */
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Social</div>
          <h2 className="social-heading">Connect with <span className="gold-text">Rathnavel</span></h2>
          <p className="social-sub">Follow the journey across platforms — professional, personal, and community.</p>
        </motion.div>
        <div className="social-grid">
          {socials.map((s, i) => (
            <motion.a
              key={i}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
              initial={{ opacity: 0, y: 24 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.05 + i * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <div
                className="social-icon-wrap"
                style={{ background: s.color + '14', color: s.color, border: `1px solid ${s.color}22` }}
              >
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

/* ─────────────────────────────────────────────────────────
   FINAL CTA
───────────────────────────────────────────────────────── */
function FinalCTA() {
  const { ref, visible } = useScrollReveal()
  return (
    <section className="cta-section section-pad" ref={ref}>
      <div className="cta-glow-1" />
      <div className="cta-glow-2" />
      <div className="cta-divider" />
      <div className="cta-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={visible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="cta-badge">RP</div>
          <h2 className="cta-heading">
            Let's connect through education,<br />environment, and stories.
          </h2>
          <p className="cta-sub">
            Whether you're a student, a professional, a Rotarian, or someone seeking guidance —
            reach out. Every meaningful journey starts with a simple conversation.
          </p>
          <div className="cta-buttons">
            <a
              href="https://www.linkedin.com/in/reavan/"
              target="_blank" rel="noopener noreferrer"
              className="btn-white"
            >
              <Linkedin size={15} />
              Connect on LinkedIn
              <ArrowRight size={13} />
            </a>
            <a href="mailto:reavan@gmail.com" className="btn-ghost">
              <Mail size={15} />
              reavan@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────── */
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
            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="footer-social-btn">
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

/* ─────────────────────────────────────────────────────────
   APP ROOT
───────────────────────────────────────────────────────── */
export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF' }}>
      <Navigation />
      <main>
        <Hero />
        <CredibilityStrip />
        <About />
        <Journey />
        <Pillars />
        <ExperienceHighlights />
        <SocialConnect />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
