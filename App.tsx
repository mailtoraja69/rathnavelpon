import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import {
  Linkedin, Twitter, Instagram, Facebook,
  Mail, MapPin, ArrowRight, BookOpen, Leaf,
  Shield, FileText, Users, GraduationCap,
  ChevronDown, ExternalLink, Menu, X, Award
} from 'lucide-react'

/* ─── Mouse parallax hook ─────────────────────────────── */
function useMouseParallax() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 })

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      mouseX.set((e.clientX - cx) / cx)
      mouseY.set((e.clientY - cy) / cy)
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [mouseX, mouseY])

  return { springX, springY }
}

/* ─── Scroll reveal hook ──────────────────────────────── */
function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

/* ─── Floating doodle SVGs ────────────────────────────── */
const doodles = [
  // Graduation cap
  { id: 'cap', factor: 18, delay: 0, top: '12%', left: '6%', opacity: 0.12,
    svg: <svg viewBox="0 0 64 64" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="72" height="72"><path d="M32 8 L60 22 L32 36 L4 22 Z"/><path d="M4 22 V40"/><path d="M16 28 V46 C16 52 48 52 48 46 V28"/><circle cx="4" cy="42" r="3"/></svg>
  },
  // Leaf / environment
  { id: 'leaf', factor: -14, delay: 0.3, top: '20%', right: '8%', opacity: 0.1,
    svg: <svg viewBox="0 0 64 64" fill="none" stroke="#40916C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="64" height="64"><path d="M12 52 Q28 12 52 8 Q48 36 12 52Z"/><path d="M12 52 L36 28"/></svg>
  },
  // Book / memoir
  { id: 'book', factor: 12, delay: 0.6, top: '65%', left: '4%', opacity: 0.10,
    svg: <svg viewBox="0 0 64 64" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="68" height="68"><rect x="8" y="8" width="36" height="48" rx="3"/><path d="M8 12 Q4 12 4 16 V56 Q4 60 8 60 H44"/><line x1="16" y1="20" x2="36" y2="20"/><line x1="16" y1="28" x2="36" y2="28"/><line x1="16" y1="36" x2="28" y2="36"/></svg>
  },
  // Shield / insurance
  { id: 'shield', factor: -16, delay: 0.9, top: '45%', right: '5%', opacity: 0.10,
    svg: <svg viewBox="0 0 64 64" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="60" height="60"><path d="M32 4 L8 14 V32 C8 46 18 56 32 60 C46 56 56 46 56 32 V14 Z"/><path d="M22 32 L28 38 L42 24"/></svg>
  },
  // Rotary gear
  { id: 'gear', factor: 10, delay: 1.2, top: '80%', right: '10%', opacity: 0.09,
    svg: <svg viewBox="0 0 64 64" fill="none" stroke="#40916C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="64" height="64"><circle cx="32" cy="32" r="12"/><circle cx="32" cy="32" r="5"/><path d="M32 8 L32 16 M32 48 L32 56 M8 32 L16 32 M48 32 L56 32 M14.7 14.7 L20.5 20.5 M43.5 43.5 L49.3 49.3 M49.3 14.7 L43.5 20.5 M20.5 43.5 L14.7 49.3"/></svg>
  },
  // Water drop / environment
  { id: 'drop', factor: -12, delay: 0.5, top: '30%', left: '85%', opacity: 0.09,
    svg: <svg viewBox="0 0 64 64" fill="none" stroke="#40916C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="52" height="52"><path d="M32 8 C32 8 12 28 12 40 C12 51 21 60 32 60 C43 60 52 51 52 40 C52 28 32 8 32 8Z"/><path d="M22 42 Q28 36 34 42"/></svg>
  },
  // Column / civil engineering
  { id: 'column', factor: 14, delay: 1.0, top: '55%', left: '90%', opacity: 0.09,
    svg: <svg viewBox="0 0 64 64" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="56" height="56"><rect x="16" y="52" width="32" height="5"/><rect x="16" y="8" width="32" height="5"/><rect x="24" y="13" width="4" height="39"/><rect x="36" y="13" width="4" height="39"/></svg>
  },
  // Pen / writing
  { id: 'pen', factor: -10, delay: 0.8, top: '88%', left: '20%', opacity: 0.09,
    svg: <svg viewBox="0 0 64 64" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="60" height="60"><path d="M44 8 L56 20 L22 54 L8 56 L10 42 Z"/><path d="M36 16 L48 28"/></svg>
  },
]

/* ─── Navigation ─────────────────────────────────────── */
function Navigation() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Journey', href: '#journey' },
    { label: 'Work', href: '#work' },
    { label: 'Connect', href: '#connect' },
  ]

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3 glass-card border-b border-gold-500/10' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-md border border-gold-500/40 flex items-center justify-center bg-navy-800/80 group-hover:border-gold-500/70 transition-colors duration-300">
            <span className="font-display text-sm font-semibold text-gold-400">RP</span>
          </div>
          <span className="font-display text-ivory-100 text-lg tracking-wide hidden sm:block">
            Rathnavel Ponnuswami
          </span>
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.slice(0, -1).map(l => (
            <a key={l.label} href={l.href}
              className="font-sans text-sm text-ivory-100/60 hover:text-gold-400 transition-colors duration-300 tracking-wide">
              {l.label}
            </a>
          ))}
          <a href="#connect"
            className="font-sans text-sm px-5 py-2 border border-gold-500/50 text-gold-400 rounded hover:bg-gold-500/10 transition-all duration-300 tracking-wide">
            Connect
          </a>
        </nav>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-ivory-100/70 p-1">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card border-t border-gold-500/10 overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-4 gap-4">
              {links.map(l => (
                <a key={l.label} href={l.href} onClick={() => setOpen(false)}
                  className="font-sans text-sm text-ivory-100/70 hover:text-gold-400 transition-colors py-1">
                  {l.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

/* ─── Hero Section ───────────────────────────────────── */
function Hero() {
  const { springX, springY } = useMouseParallax()

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-[#0A1F38]" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gold-600/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-emerald-700/6 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-navy-800/30 rounded-full blur-[80px] pointer-events-none" />
      </div>

      {/* Floating doodles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {doodles.map(d => {
          const x = useTransform(springX, v => v * d.factor)
          const y = useTransform(springY, v => v * d.factor)
          return (
            <motion.div
              key={d.id}
              style={{ x, y, opacity: d.opacity, position: 'absolute',
                top: d.top, left: (d as any).left, right: (d as any).right }}
              initial={{ opacity: 0 }}
              animate={{ opacity: d.opacity }}
              transition={{ delay: d.delay + 0.5, duration: 1.2 }}
            >
              {d.svg}
            </motion.div>
          )
        })}
      </div>

      {/* Horizontal rule decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-20">
          {/* Left: text */}
          <div className="flex-1">
            {/* Location tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-gold-500/20 bg-gold-500/5"
            >
              <MapPin size={12} className="text-gold-400" />
              <span className="font-sans text-xs text-gold-400/80 tracking-widest uppercase">Coimbatore, Tamil Nadu</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl text-ivory-100 leading-[1.08] mb-6"
            >
              Educator.{' '}
              <em className="text-gold-gradient not-italic">Environmental</em>
              {' '}Thinker.
              <br />
              <span className="text-ivory-100/75">Mentor. Storyteller.</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.8 }}
              className="font-body text-xl text-ivory-200/55 leading-relaxed max-w-xl mb-10"
            >
              Rathnavel Ponnuswami brings together engineering education, environmental awareness, insurance advisory, and community service — a career dedicated to learning, guidance, and public impact.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <a href="https://www.linkedin.com/in/reavan/" target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-gold-500 hover:bg-gold-400 text-navy-950 font-sans font-semibold text-sm tracking-wide rounded transition-all duration-300 hover:shadow-[0_8px_30px_rgba(201,168,76,0.3)]">
                <Linkedin size={16} />
                Connect on LinkedIn
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#journey"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 border border-ivory-200/20 text-ivory-200/80 hover:text-ivory-100 hover:border-ivory-200/40 font-sans text-sm tracking-wide rounded transition-all duration-300 backdrop-blur-sm">
                Explore Journey
                <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* Right: hero card */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-80 flex-shrink-0"
          >
            <div className="glow-border glass-card rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-gold-500/5 rounded-full blur-2xl" />

              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl border border-gold-500/30 bg-gold-500/10 flex items-center justify-center">
                  <span className="font-display text-2xl font-bold text-gold-400">RP</span>
                </div>
                <div className="font-display text-4xl font-bold text-gold-gradient mb-1">20+</div>
                <div className="font-sans text-xs text-gold-400/60 tracking-widest uppercase">Years of Impact</div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-gold-500/25 to-transparent mb-6" />

              <p className="font-body text-base text-ivory-200/60 leading-relaxed text-center">
                Teaching, mentoring, institution building, environmental engineering, and community engagement.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {['Educator', 'Engineer', 'Advisor', 'Rotarian'].map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full border border-gold-500/20 text-gold-400/70 font-sans text-xs tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-sans text-xs text-ivory-100/25 tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-gold-500/40 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Credibility Strip ──────────────────────────────── */
const credItems = [
  { icon: <GraduationCap size={18} />, label: '20+ Years', sub: 'Education & Mentorship' },
  { icon: <Leaf size={18} />, label: 'M.E.', sub: 'Environmental Engineering' },
  { icon: <Shield size={18} />, label: 'Advisor', sub: 'ICICI Prudential Life' },
  { icon: <Users size={18} />, label: 'Rotarian', sub: 'Community Contributor' },
  { icon: <Award size={18} />, label: 'Guest Professor', sub: 'Public Speaker' },
]

function CredibilityStrip() {
  const { ref, visible } = useScrollReveal()
  return (
    <section ref={ref} className="py-12 border-y border-gold-500/10 bg-navy-900/40 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {credItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glow-border glass-card rounded-xl p-4 flex flex-col items-center text-center group cursor-default transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-gold-400/70 mb-2 group-hover:text-gold-400 transition-colors">{item.icon}</div>
              <div className="font-display text-ivory-100 font-semibold text-base">{item.label}</div>
              <div className="font-sans text-gold-400/50 text-xs mt-0.5 tracking-wide">{item.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── About Section ──────────────────────────────────── */
function About() {
  const { ref, visible } = useScrollReveal()
  return (
    <section id="about" ref={ref} className="section-pad">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left label */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:w-64 flex-shrink-0"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold-500/50" />
              <span className="font-sans text-xs text-gold-400/70 tracking-widest uppercase">About</span>
            </div>
            <h2 className="font-display text-4xl text-ivory-100 leading-tight">
              A career built around people, learning, and responsible growth.
            </h2>
          </motion.div>

          {/* Right content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="flex-1"
          >
            <p className="font-body text-xl text-ivory-200/65 leading-loose mb-8">
              From engineering classrooms and laboratories to community initiatives and professional advisory work, Rathnavel Ponnuswami has spent his career helping students, institutions, and individuals move forward with clarity.
            </p>
            <p className="font-body text-xl text-ivory-200/50 leading-loose mb-10">
              His work spans civil engineering education, environmental engineering, curriculum development, accreditation support, public relations, insurance guidance, and memoir-based storytelling — each domain connected by a deep commitment to people-first service.
            </p>

            {/* Detail grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Education', value: 'Government College of Technology, KCT' },
                { label: 'Specialisation', value: 'Environmental Engineering, Civil' },
                { label: 'Current Role', value: 'Insurance Advisor, ICICI Prudential' },
                { label: 'Location', value: 'Coimbatore, Tamil Nadu' },
              ].map(item => (
                <div key={item.label} className="glow-border glass-card rounded-lg p-4">
                  <div className="font-sans text-xs text-gold-400/50 tracking-widest uppercase mb-1">{item.label}</div>
                  <div className="font-body text-ivory-200/80 text-base">{item.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─── Journey Timeline ───────────────────────────────── */
const timelineItems = [
  {
    period: '2002 – 2004',
    role: 'M.E. Environmental Engineering',
    org: 'Government College of Technology, Coimbatore',
    desc: 'Postgraduate specialisation in environmental engineering, focusing on water treatment, waste management, and sustainable development principles.',
    color: 'emerald',
    icon: <GraduationCap size={16} />,
  },
  {
    period: '2004 – 2015',
    role: 'Lecturer & Senior Lecturer',
    org: 'Engineering Institutions, Tamil Nadu',
    desc: 'Two decades of classroom teaching, laboratory supervision, department coordination, curriculum development, accreditation support, and student engagement across multiple engineering institutions.',
    color: 'gold',
    icon: <BookOpen size={16} />,
  },
  {
    period: '2015 – 2024',
    role: 'Assistant Professor',
    org: 'Akshaya College of Engineering and Technology',
    desc: 'Senior academic role encompassing teaching, mentoring, departmental responsibilities, public relations, and student-community engagement initiatives.',
    color: 'gold',
    icon: <Award size={16} />,
  },
  {
    period: '2021 – Present',
    role: 'Insurance Advisor',
    org: 'ICICI Prudential Life Insurance Company Limited',
    desc: 'Guiding individuals and families with life insurance and protection planning, combining professional expertise with a commitment to financial well-being.',
    color: 'gold',
    icon: <Shield size={16} />,
  },
  {
    period: 'Ongoing',
    role: 'Community, Memoirs & Mentoring',
    org: 'Rotary, Guest Lectures & Writing',
    desc: 'Active participation in Rotary/Rotaract, guest professorship engagements, memoir writing, environmental awareness initiatives, and public speaking.',
    color: 'emerald',
    icon: <Users size={16} />,
  },
]

function Journey() {
  const { ref, visible } = useScrollReveal(0.1)
  return (
    <section id="journey" ref={ref} className="section-pad bg-navy-900/30">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold-500/50" />
            <span className="font-sans text-xs text-gold-400/70 tracking-widest uppercase">Timeline</span>
            <div className="h-px w-8 bg-gold-500/50" />
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-ivory-100">Professional Journey</h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-gold-500/30 via-emerald-600/30 to-transparent hidden sm:block" />

          <div className="space-y-8">
            {timelineItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={visible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                className="flex gap-6 sm:pl-16 relative group"
              >
                {/* Dot */}
                <div className={`absolute left-3.5 top-5 w-5 h-5 rounded-full border-2 hidden sm:flex items-center justify-center
                  ${item.color === 'emerald' ? 'border-emerald-600/60 bg-emerald-700/30 text-emerald-500' : 'border-gold-500/60 bg-gold-500/10 text-gold-400'}
                  transition-all duration-300 group-hover:scale-125`}
                >
                  <div className="scale-75">{item.icon}</div>
                </div>

                {/* Card */}
                <div className="flex-1 glow-border glass-card rounded-xl p-6 group-hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="font-display text-xl text-ivory-100 font-semibold">{item.role}</div>
                      <div className={`font-sans text-sm mt-0.5 ${item.color === 'emerald' ? 'text-emerald-500/70' : 'text-gold-400/70'}`}>
                        {item.org}
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-sans tracking-wide flex-shrink-0
                      ${item.color === 'emerald' ? 'bg-emerald-700/20 text-emerald-500/80 border border-emerald-600/20' : 'bg-gold-500/10 text-gold-400/70 border border-gold-500/20'}`}>
                      {item.period}
                    </span>
                  </div>
                  <p className="font-body text-ivory-200/50 leading-relaxed text-lg">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Pillars Section ────────────────────────────────── */
const pillars = [
  {
    icon: <GraduationCap size={28} />,
    title: 'Education',
    color: 'gold',
    desc: 'Classroom teaching, student engagement, department coordination, laboratories, curriculum design, and academic growth across engineering institutions.',
  },
  {
    icon: <Leaf size={28} />,
    title: 'Environment',
    color: 'emerald',
    desc: 'Environmental engineering foundation with interest in sustainability, public awareness, water, waste management, and responsible development.',
  },
  {
    icon: <Shield size={28} />,
    title: 'Insurance',
    color: 'gold',
    desc: 'Guiding individuals and families with protection-focused advisory through ICICI Prudential Life Insurance — clarity-first planning.',
  },
  {
    icon: <FileText size={28} />,
    title: 'Memoirs & Public Voice',
    color: 'ivory',
    desc: 'Writing, reflection, public speaking, and sharing life lessons through personal and professional experience — storytelling as service.',
  },
]

function Pillars() {
  const { ref, visible } = useScrollReveal()
  return (
    <section ref={ref} id="work" className="section-pad">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold-500/50" />
            <span className="font-sans text-xs text-gold-400/70 tracking-widest uppercase">Core Domains</span>
            <div className="h-px w-8 bg-gold-500/50" />
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-ivory-100">Four Pillars of Work</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.7 }}
              className="glow-border glass-card rounded-2xl p-7 flex flex-col group hover:-translate-y-2 transition-all duration-400 cursor-default"
            >
              <div className={`mb-6 w-14 h-14 rounded-xl flex items-center justify-center
                ${p.color === 'emerald' ? 'bg-emerald-700/20 text-emerald-500 border border-emerald-600/20' :
                  p.color === 'ivory' ? 'bg-ivory-100/5 text-ivory-200/60 border border-ivory-200/15' :
                  'bg-gold-500/10 text-gold-400 border border-gold-500/20'}
                group-hover:scale-105 transition-transform duration-300`}>
                {p.icon}
              </div>
              <h3 className="font-display text-xl text-ivory-100 font-semibold mb-3">{p.title}</h3>
              <p className="font-body text-ivory-200/50 leading-relaxed text-lg flex-1">{p.desc}</p>
              <div className={`mt-6 h-0.5 rounded-full transition-all duration-500
                ${p.color === 'emerald' ? 'bg-emerald-600/0 group-hover:bg-emerald-600/40' :
                  p.color === 'ivory' ? 'bg-ivory-200/0 group-hover:bg-ivory-200/20' :
                  'bg-gold-500/0 group-hover:bg-gold-500/40'}`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Experience Highlights ──────────────────────────── */
const experiences = [
  { title: 'Assistant Professor', org: 'Akshaya College of Engineering & Technology', period: '2015–2024', icon: <GraduationCap size={20} /> },
  { title: 'Insurance Advisor', org: 'ICICI Prudential Life Insurance', period: '2021–Present', icon: <Shield size={20} /> },
  { title: 'Environmental Engineering', org: 'M.E. Postgraduate Specialisation', period: '2002–2004', icon: <Leaf size={20} /> },
  { title: 'PR, Accreditation & Curriculum', org: 'Academic Leadership Contributions', period: '2004–2024', icon: <Award size={20} /> },
  { title: 'Rotaract & Rotary', org: 'Community Engagement & Service', period: 'Ongoing', icon: <Users size={20} /> },
]

function ExperienceHighlights() {
  const { ref, visible } = useScrollReveal()
  return (
    <section ref={ref} className="section-pad bg-gradient-to-b from-navy-900/20 to-navy-950/80">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 flex items-center gap-3"
        >
          <div className="h-px w-8 bg-gold-500/50" />
          <span className="font-sans text-xs text-gold-400/70 tracking-widest uppercase">Experience</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="font-display text-4xl text-ivory-100 mb-10"
        >
          Highlights Across Roles
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {experiences.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={visible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glow-border glass-card rounded-xl p-6 flex gap-4 items-start group hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400/70 group-hover:text-gold-400 flex-shrink-0 transition-colors">
                {e.icon}
              </div>
              <div>
                <div className="font-display text-ivory-100 font-semibold text-lg leading-tight">{e.title}</div>
                <div className="font-sans text-ivory-200/40 text-xs mt-1 mb-2 leading-snug">{e.org}</div>
                <div className="font-sans text-gold-400/50 text-xs tracking-wide">{e.period}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Social Connect Section ─────────────────────────── */
const socials = [
  {
    name: 'LinkedIn',
    handle: 'reavan',
    url: 'https://www.linkedin.com/in/reavan/',
    icon: <Linkedin size={22} />,
    desc: 'Professional network, updates & articles',
    color: '#0A66C2',
  },
  {
    name: 'X / Twitter',
    handle: '@reavan',
    url: 'https://x.com/reavan',
    icon: <Twitter size={22} />,
    desc: 'Thoughts, reflections & public discourse',
    color: '#1D9BF0',
  },
  {
    name: 'Instagram',
    handle: 'reavan1881',
    url: 'https://www.instagram.com/reavan1881?igsh=MW5obTJxemFpMnM2OQ==',
    icon: <Instagram size={22} />,
    desc: 'Personal moments & community snapshots',
    color: '#E1306C',
  },
  {
    name: 'Facebook',
    handle: 'reavan',
    url: 'https://www.facebook.com/reavan',
    icon: <Facebook size={22} />,
    desc: 'Community, family & professional updates',
    color: '#1877F2',
  },
  {
    name: 'Pinterest',
    handle: 'ponrathnavel',
    url: 'https://pin.it/34KNJeLko',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
      </svg>
    ),
    desc: 'Curated boards — inspiration & ideas',
    color: '#E60023',
  },
]

function SocialConnect() {
  const { ref, visible } = useScrollReveal()
  return (
    <section id="connect" ref={ref} className="section-pad">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold-500/50" />
            <span className="font-sans text-xs text-gold-400/70 tracking-widest uppercase">Social</span>
            <div className="h-px w-8 bg-gold-500/50" />
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-ivory-100 mb-4">Connect with Rathnavel</h2>
          <p className="font-body text-xl text-ivory-200/45 max-w-xl mx-auto">
            Follow the journey across platforms — professional, personal, and community.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {socials.map((s, i) => (
            <motion.a
              key={i}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glow-border glass-card rounded-xl p-6 flex items-start gap-4 group hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: s.color + '18', color: s.color }}>
                {s.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-display text-ivory-100 font-semibold text-lg">{s.name}</span>
                  <ExternalLink size={12} className="text-ivory-200/30 group-hover:text-gold-400/60 transition-colors flex-shrink-0" />
                </div>
                <div className="font-sans text-xs mb-2" style={{ color: s.color + 'AA' }}>{s.handle}</div>
                <p className="font-body text-ivory-200/45 text-base leading-snug">{s.desc}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Final CTA Section ──────────────────────────────── */
function FinalCTA() {
  const { ref, visible } = useScrollReveal()
  return (
    <section ref={ref} className="section-pad relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-800/40 via-navy-900 to-navy-950" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-600/6 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-700/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={visible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-14 h-14 mx-auto mb-8 rounded-xl border border-gold-500/30 bg-gold-500/10 flex items-center justify-center">
            <span className="font-display text-2xl font-bold text-gold-400">RP</span>
          </div>

          <h2 className="font-display text-4xl lg:text-5xl text-ivory-100 leading-tight mb-6">
            Let's connect through education, environment, community, and stories.
          </h2>
          <p className="font-body text-xl text-ivory-200/45 mb-10">
            Whether you're a student, a professional, a Rotarian, or someone seeking guidance — reach out. Every conversation starts with a simple hello.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://www.linkedin.com/in/reavan/" target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-8 py-4 bg-gold-500 hover:bg-gold-400 text-navy-950 font-sans font-semibold text-sm tracking-wide rounded transition-all duration-300 hover:shadow-[0_12px_40px_rgba(201,168,76,0.35)]">
              <Linkedin size={17} />
              Connect on LinkedIn
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="mailto:reavan@gmail.com"
              className="group inline-flex items-center gap-2.5 px-8 py-4 border border-ivory-200/20 text-ivory-200/75 hover:text-ivory-100 hover:border-ivory-200/40 font-sans text-sm tracking-wide rounded transition-all duration-300">
              <Mail size={16} />
              reavan@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Footer ──────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-gold-500/10 py-10 bg-navy-950">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <div className="font-display text-ivory-100/60 text-sm mb-1">Rathnavel Ponnuswami</div>
          <div className="font-sans text-ivory-100/25 text-xs">© 2026 · Built for ponrathnavel.io</div>
        </div>

        <div className="flex items-center gap-4">
          {[
            { href: 'https://www.linkedin.com/in/reavan/', icon: <Linkedin size={16} /> },
            { href: 'https://x.com/reavan', icon: <Twitter size={16} /> },
            { href: 'https://www.instagram.com/reavan1881?igsh=MW5obTJxemFpMnM2OQ==', icon: <Instagram size={16} /> },
            { href: 'https://www.facebook.com/reavan', icon: <Facebook size={16} /> },
            {
              href: 'https://pin.it/34KNJeLko',
              icon: (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                </svg>
              )
            },
          ].map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg border border-gold-500/15 flex items-center justify-center text-ivory-100/30 hover:text-gold-400 hover:border-gold-500/40 transition-all duration-300">
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

/* ─── App Root ─────────────────────────────────────────── */
export default function App() {
  return (
    <div className="min-h-screen bg-navy-950">
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
