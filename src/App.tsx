import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import {
  Linkedin, Twitter, Instagram, Facebook,
  MapPin, ArrowRight, ChevronDown,
  ExternalLink, Menu, X,
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
function useScrollReveal(threshold = 0.12) {
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

/* ─── Floating doodles ────────────────────────────────── */
const doodles = [
  { id: 'cap', factor: 18, delay: 0, top: '12%', left: '6%', opacity: 0.12,
    svg: <svg viewBox="0 0 64 64" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="72" height="72"><path d="M32 8 L60 22 L32 36 L4 22 Z"/><path d="M4 22 V40"/><path d="M16 28 V46 C16 52 48 52 48 46 V28"/><circle cx="4" cy="42" r="3"/></svg>
  },
  { id: 'leaf', factor: -14, delay: 0.3, top: '20%', right: '8%', opacity: 0.10,
    svg: <svg viewBox="0 0 64 64" fill="none" stroke="#40916C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="64" height="64"><path d="M12 52 Q28 12 52 8 Q48 36 12 52Z"/><path d="M12 52 L36 28"/></svg>
  },
  { id: 'pen', factor: -10, delay: 0.8, top: '80%', left: '20%', opacity: 0.09,
    svg: <svg viewBox="0 0 64 64" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="60" height="60"><path d="M44 8 L56 20 L22 54 L8 56 L10 42 Z"/><path d="M36 16 L48 28"/></svg>
  },
  { id: 'gear', factor: 10, delay: 1.2, top: '70%', right: '10%', opacity: 0.09,
    svg: <svg viewBox="0 0 64 64" fill="none" stroke="#40916C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="64" height="64"><circle cx="32" cy="32" r="12"/><circle cx="32" cy="32" r="5"/><path d="M32 8 L32 16 M32 48 L32 56 M8 32 L16 32 M48 32 L56 32"/></svg>
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
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-md border border-gold-500/40 flex items-center justify-center bg-navy-800/80 group-hover:border-gold-500/70 transition-colors duration-300">
            <span className="font-display text-sm font-semibold text-gold-400">RP</span>
          </div>
          <span className="font-display text-ivory-100 text-lg tracking-widest hidden sm:block uppercase">
            Rathnavel Pon
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.slice(0, 3).map(l => (
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

        <button onClick={() => setOpen(!open)} className="md:hidden text-ivory-100/70 p-1">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

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
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-[#0A1F38]" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gold-600/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-emerald-700/6 rounded-full blur-[100px] pointer-events-none" />
      </div>

      {/* Doodles — desktop only */}
      <div className="absolute inset-0 z-0 pointer-events-none hidden lg:block">
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

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-24 w-full">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-20">

          {/* Left: text */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-gold-500/20 bg-gold-500/5 flex-wrap"
            >
              <MapPin size={12} className="text-gold-400 flex-shrink-0" />
              <span className="font-sans text-xs text-gold-400/80 tracking-widest uppercase">
                Coimbatore · Tamil Nadu · India · Asia · Earth · Milky Way
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl text-ivory-100 leading-[1.08] mb-6"
            >
              Facilitator.{' '}
              <em className="text-gold-gradient not-italic">Educator.</em>
              <br />
              <span className="text-ivory-100/75">Writer.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.8 }}
              className="font-body text-xl text-ivory-200/55 leading-relaxed max-w-xl mb-10"
            >
              A facilitator for short learning sessions, activity based learning and quiz competitions.
              An educator formally and normally engaged in teaching Civil Engineering.
              A writer with adequate intelligence to compete with Artificial Intelligence.
            </motion.p>

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
              <a href="#programmes"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 border border-ivory-200/20 text-ivory-200/80 hover:text-ivory-100 hover:border-ivory-200/40 font-sans text-sm tracking-wide rounded transition-all duration-300 backdrop-blur-sm">
                Book a Session
                <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* Right: Photo */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-72 flex-shrink-0"
          >
            <div className="glow-border rounded-2xl overflow-hidden">
              <img
                src="/ai2.jpeg"
                alt="Rathnavel Ponnuswami"
                className="w-full h-[400px] object-cover object-top"
              />
            </div>
            <div className="mt-4 glow-border glass-card rounded-xl px-5 py-4">
              <p className="font-sans text-xs text-gold-400/70 tracking-wide text-center leading-relaxed">
                Organ Donor · A1B+ve · August Personality · Bilingual
              </p>
              <div className="h-px bg-gold-500/15 my-2" />
              <p className="font-sans text-xs text-ivory-200/40 tracking-wide text-center leading-relaxed">
                Not so voracious Reader · More than Usual Movie Viewer
              </p>
            </div>
          </motion.div>
        </div>

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

/* ─── Exclusive Programmes ───────────────────────────── */
const programmes = [
  { code: 'SAFE', audience: 'For 1st Year Engineering Students', emoji: '🎓', color: 'gold' },
  { code: 'PESA', audience: 'For 1st Year Arts / Sciences / Law Students', emoji: '📚', color: 'emerald' },
  { code: 'SIMBA', audience: 'For MBA Students', emoji: '💼', color: 'gold' },
  { code: 'TACT', audience: 'For Young Professionals', emoji: '🚀', color: 'emerald' },
]

function Programmes() {
  const { ref, visible } = useScrollReveal()
  return (
    <section id="programmes" ref={ref} className="py-16 border-y border-gold-500/10 bg-navy-900/40 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <div className="h-px w-8 bg-gold-500/50" />
          <span className="font-sans text-xs text-gold-400/70 tracking-widest uppercase">Exclusive Programmes</span>
          <div className="h-px w-8 bg-gold-500/50" />
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {programmes.map((p, i) => (
            <motion.div
              key={p.code}
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glow-border glass-card rounded-xl p-6 flex flex-col items-center text-center hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              <div className="text-3xl mb-3">{p.emoji}</div>
              <div className={`font-display text-2xl font-bold mb-2 ${p.color === 'emerald' ? 'text-emerald-500' : 'text-gold-400'}`}>
                {p.code}
              </div>
              <div className="font-sans text-xs text-ivory-200/50 leading-snug">{p.audience}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Stats / Number Crunching ───────────────────────── */
const stats = [
  { value: '100+', label: 'Quizzes', emoji: '🎤' },
  { value: '200+', label: 'Sessions', emoji: '🏫' },
  { value: '300+', label: 'MoCs', emoji: '🎙️' },
  { value: '10,000+', label: 'Participants', emoji: '👥' },
  { value: '26', label: 'Years in Facilitation', emoji: '⏳' },
]

function Stats() {
  const { ref, visible } = useScrollReveal()
  return (
    <section ref={ref} className="section-pad"
      style={{ background: 'linear-gradient(135deg, rgba(184,146,42,0.18) 0%, rgba(201,168,76,0.10) 50%, rgba(184,146,42,0.18) 100%)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4 mb-14"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px w-8 bg-gold-500/50" />
              <span className="font-sans text-xs text-gold-400/70 tracking-widest uppercase">Number Crunching</span>
            </div>
            <h2 className="font-display text-4xl text-ivory-100">Impact in Numbers</h2>
          </div>
          <p className="font-display text-2xl text-gold-400/60 italic">
            Coimbatore 🔵 Classrooms 🔵 Cricket
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glow-border glass-card rounded-xl p-6 text-center hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              <div className="text-2xl mb-3">{s.emoji}</div>
              <div className="font-display text-3xl font-bold text-gold-gradient mb-1">{s.value}</div>
              <div className="font-sans text-xs text-ivory-200/50 tracking-wide uppercase leading-snug">{s.label}</div>
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="h-px w-8 bg-gold-500/50" />
          <span className="font-sans text-xs text-gold-400/70 tracking-widest uppercase">About</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-4xl text-ivory-100 leading-tight mb-8">
              Coimbatore 🔵 Classrooms 🔵 Cricket
            </h2>
            <p className="font-body text-xl text-ivory-200/65 leading-loose mb-6">
              A thorough Coimbatore person, Rathnavel was schooled at Carmel Garden and SBOA. He completed B.E. Civil Engineering from KCT and M.E. Environmental Engineering in GCT. He has two decades of experience in technical education with 8 engineering colleges. In parallel, he has emerged over five lustrums, as a facilitator for short non formal programmes. He has also had a short stint in environmental management and life insurance.
            </p>
            <p className="font-body text-xl text-ivory-200/50 leading-loose mb-6">
              Rathnavel is a part of the lovely RATHNA KUNJARAM family. His social tryst is courtesy Rotary International, Senior Chamber International, Institute of Liberal Studies and Institution of Engineers (India).
            </p>
            <p className="font-body text-xl text-ivory-200/50 leading-loose">
              His life goal is to interact with youngsters and enhance their knowledge, skills, innovation and attitude. He plans to contribute to better waste management and urban development practices in Coimbatore. His interests are Indian Cricket, Tamil Cinema and Learning Innovations.
            </p>
          </motion.div>

          {/* Right: Photo + tags */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="flex flex-col gap-5"
          >
            <div className="glow-border rounded-2xl overflow-hidden">
              <img
                src="/ai2.jpeg"
                alt="Rathnavel Ponnuswami"
                className="w-full h-[380px] object-cover object-top"
              />
            </div>
            <div className="glow-border glass-card rounded-xl px-6 py-5">
              <p className="font-sans text-sm text-gold-400/80 tracking-wide text-center leading-relaxed">
                Organ Donor · A1B+ve · August Personality · Bilingual
              </p>
              <div className="h-px bg-gold-500/15 my-3" />
              <p className="font-sans text-sm text-ivory-200/45 tracking-wide text-center leading-relaxed">
                Not so voracious Reader · More than Usual Movie Viewer
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─── Journey Timeline ───────────────────────────────── */
const timelineItems = [
  { year: '2001', role: 'Freelance Trainer', org: 'MoC · Non Formal Learning · Quizzes', color: 'gold' },
  { year: '2004', role: 'Lecturer', org: 'Hindusthan College of Engineering and Technology', color: 'gold' },
  { year: '2005', role: 'Lecturer', org: 'Tamilnadu College of Engineering', color: 'gold' },
  { year: '2006', role: 'Chief Executive', org: 'ECO-TECH', color: 'emerald' },
  { year: '2007', role: 'Lecturer', org: 'SNS College of Engineering', color: 'gold' },
  { year: '2008', role: 'Lecturer', org: 'Adithya Institute of Technology', color: 'gold' },
  { year: '2009', role: 'Assistant Professor', org: 'Kalaivani College of Technology', color: 'gold' },
  { year: '2011', role: 'Assistant Professor', org: 'KTVR Knowledge Park for Engineering and Technology', color: 'gold' },
  { year: '2013', role: 'Assistant Professor', org: 'Coimbatore Institute of Engineering and Technology', color: 'gold' },
  { year: '2015', role: 'Assistant Professor', org: 'Akshaya College of Engineering and Technology', color: 'gold' },
  { year: '2019', role: 'Apex Person', org: 'Nicety Shelters and Solutions', color: 'emerald' },
  { year: '2020', role: 'Financial Advisor', org: 'ICICI Prudential', color: 'gold' },
]

function Journey() {
  const { ref, visible } = useScrollReveal(0.05)
  return (
    <section id="journey" ref={ref} className="section-pad bg-navy-900/30">
      <div className="max-w-3xl mx-auto px-6">
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

        <div className="relative">
          {/* Vertical spine — desktop only */}
          <div className="absolute left-[19px] top-4 bottom-4 w-px bg-gradient-to-b from-gold-500/40 via-emerald-600/25 to-transparent hidden sm:block" />

          <div className="flex flex-col">
            {timelineItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={visible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.07, duration: 0.6 }}
                className="flex gap-6 sm:pl-14 relative group pb-10 last:pb-0"
              >
                {/* Dot */}
                <div className={`absolute left-[10px] top-4 w-[20px] h-[20px] rounded-full border-2 hidden sm:flex items-center justify-center flex-shrink-0
                  ${item.color === 'emerald'
                    ? 'border-emerald-600/60 bg-emerald-700/30'
                    : 'border-gold-500/60 bg-gold-500/10'}
                  transition-all duration-300 group-hover:scale-125`}
                >
                  <div className={`w-2 h-2 rounded-full ${item.color === 'emerald' ? 'bg-emerald-500' : 'bg-gold-400'}`} />
                </div>

                {/* Card */}
                <div className="flex-1 glow-border glass-card rounded-xl px-6 py-5 group-hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="font-display text-xl text-ivory-100 font-semibold leading-tight">{item.role}</div>
                    <span className={`px-3 py-1 rounded-full text-xs font-sans tracking-widest flex-shrink-0
                      ${item.color === 'emerald'
                        ? 'bg-emerald-700/20 text-emerald-400/80 border border-emerald-600/20'
                        : 'bg-gold-500/10 text-gold-400/70 border border-gold-500/20'}`}>
                      {item.year}
                    </span>
                  </div>
                  <div className={`font-sans text-sm mt-1.5 leading-snug
                    ${item.color === 'emerald' ? 'text-emerald-500/60' : 'text-gold-400/55'}`}>
                    {item.org}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Advisory Role ──────────────────────────────────── */
const advisoryClients = [
  { name: 'SDS Land Surveyors', url: 'https://www.sdslandsurveyor.com/', abbr: 'SDS', logo: null },
  { name: 'Prajai Times', url: 'http://prajaitimes.in', abbr: 'PT', logo: null },
  { name: 'BESTOW', url: 'https://www.instagram.com/bestow.cbe/', abbr: 'BW', logo: null },
  { name: 'Elite Construction & Architects', url: 'https://www.facebook.com/people/Elite-Construction-And-Architects/61571073511891/', abbr: 'EC', logo: null },
]

function Advisory() {
  const { ref, visible } = useScrollReveal()
  return (
    <section id="work" ref={ref} className="section-pad bg-ivory-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-gold-600/35" />
            <span className="font-sans text-xs text-gold-600/60 tracking-widest uppercase">Advisory Role</span>
            <div className="h-px w-10 bg-gold-600/35" />
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-navy-950 mb-4">
            Organisations He Advises
          </h2>
          <p className="font-body text-xl text-navy-800/45 max-w-xl mx-auto">
            Providing strategic guidance and domain expertise to growing organisations across sectors.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {advisoryClients.map((c, i) => (
            <motion.a
              key={i}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 28 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.65 }}
              className="group flex flex-col items-center justify-center gap-4 p-8 rounded-2xl border border-navy-800/10 hover:border-gold-500/40 bg-white hover:bg-ivory-50 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Logo placeholder — swap with <img src="/logo-xxx.png" /> when logos are ready */}
              <div className="w-20 h-20 rounded-xl bg-navy-900/5 border border-navy-800/10 flex items-center justify-center group-hover:scale-105 group-hover:border-gold-500/30 transition-all duration-300">
                <span className="font-display text-xl font-bold text-navy-800/40 group-hover:text-gold-600 transition-colors">
                  {c.abbr}
                </span>
              </div>
              <div className="text-center">
                <div className="font-display text-base text-navy-900 font-semibold leading-tight group-hover:text-gold-700 transition-colors">
                  {c.name}
                </div>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <ExternalLink size={11} className="text-navy-800/25 group-hover:text-gold-500 transition-colors" />
                  <span className="font-sans text-xs text-navy-800/25 group-hover:text-gold-500 transition-colors">
                    Visit
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Social Connect ─────────────────────────────────── */
const socials = [
  {
    name: 'LinkedIn',
    handle: 'reavan',
    url: 'https://www.linkedin.com/in/reavan/',
    icon: <Linkedin size={22} />,
    desc: 'For professional updates and purposeful writing',
    color: '#0A66C2',
  },
  {
    name: 'X / Twitter',
    handle: '@reavan',
    url: 'https://x.com/reavan',
    icon: <Twitter size={22} />,
    desc: 'For cricket related stats and rants',
    color: '#1D9BF0',
  },
  {
    name: 'Threads',
    handle: '@reavan1881',
    url: 'https://www.threads.com/@reavan1881',
    icon: (
      <svg viewBox="0 0 192 192" width="22" height="22" fill="currentColor">
        <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.968 0-27.414 6.396-35.012 18.035l13.77 9.452c5.665-8.618 14.553-10.452 21.244-10.452h.23c8.209.054 14.415 2.456 18.452 7.145 2.904 3.374 4.845 8.04 5.798 13.955-7.258-1.233-15.104-1.609-23.502-1.122-23.65 1.361-38.857 15.2-37.83 34.416.522 9.765 5.267 18.167 13.35 23.59 6.832 4.658 15.629 6.99 24.8 6.5 12.07-.65 21.556-5.273 28.186-13.72 5.09-6.513 8.301-14.968 9.716-25.676 5.823 3.514 10.132 8.138 12.487 13.66 4.098 9.569 4.344 25.285-8.503 38.117-11.275 11.26-24.847 16.14-45.32 16.29-22.71-.168-39.904-7.452-51.103-21.656C52.36 138.85 47 122.364 46.734 101.963c.266-20.4 5.627-36.89 15.929-49.01 11.199-14.204 28.393-21.489 51.103-21.656 22.31.168 38.842 7.484 49.156 21.756 5.047 6.99 8.713 15.816 10.943 26.253l16.02-3.86c-2.677-12.075-7.222-22.63-13.587-31.498-13.703-18.983-34.262-28.72-61.077-28.946h-.418c-26.522.226-46.907 10.033-60.657 29.164C43.035 57.336 37.04 76.658 36.748 101.963v.075c.292 25.305 6.287 44.628 17.821 57.463 13.75 19.13 34.135 28.938 60.657 29.163h.418c23.591-.198 40.245-6.393 53.817-20.177 17.797-17.808 17.072-39.923 11.291-53.585-4.192-9.798-12.315-17.86-38.215-25.914Z"/>
        <path d="M96.754 113.447c-9.26.527-18.977-3.634-19.466-11.94-.347-6.067 4.28-12.753 20.295-13.678 1.903-.11 3.764-.162 5.583-.159 6.388.015 12.408.657 17.947 1.906-2.044 25.48-15.147 23.322-24.359 23.871Z"/>
      </svg>
    ),
    desc: 'For micro movie reviews',
    color: '#000000',
  },
  {
    name: 'QOTD Blog',
    handle: 'qotd2026',
    url: 'https://qotd2026.blogspot.com/',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d="M21 3H3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-1 16H4V5h16v14zM6 7h12v2H6zm0 4h12v2H6zm0 4h8v2H6z"/>
      </svg>
    ),
    desc: 'For quiz with AI-free questions and AI-powered answers',
    color: '#FF6B35',
  },
  {
    name: 'Instagram',
    handle: '@reavan1881',
    url: 'https://www.instagram.com/reavan1881?igsh=MW5obTJxemFpMnM2OQ==',
    icon: <Instagram size={22} />,
    desc: 'A Collection of Coimbatore Landmarks with Tree Marks',
    color: '#E1306C',
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
    desc: 'A collection of photos of people who inspire him',
    color: '#E60023',
  },
  {
    name: 'Facebook',
    handle: 'reavan',
    url: 'https://www.facebook.com/reavan',
    icon: <Facebook size={22} />,
    desc: 'Community updates and engagement',
    color: '#1877F2',
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
            <span className="font-sans text-xs text-gold-400/70 tracking-widest uppercase">Find Rathnavel Online</span>
            <div className="h-px w-8 bg-gold-500/50" />
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-ivory-100">Connect</h2>
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
              <div
                className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: s.color + '18', color: s.color }}
              >
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

/* ─── Footer ──────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-gold-500/10 py-10 bg-navy-950">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <div className="font-display text-ivory-100/60 text-sm mb-1 tracking-widest uppercase">Rathnavel Pon</div>
          <div className="font-sans text-ivory-100/25 text-xs">© 2026 · rathnavelpon.in</div>
        </div>
        <div className="flex items-center gap-4">
          {[
            { href: 'https://www.linkedin.com/in/reavan/', icon: <Linkedin size={16} /> },
            { href: 'https://x.com/reavan', icon: <Twitter size={16} /> },
            { href: 'https://www.instagram.com/reavan1881?igsh=MW5obTJxemFpMnM2OQ==', icon: <Instagram size={16} /> },
            { href: 'https://www.facebook.com/reavan', icon: <Facebook size={16} /> },
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
        <Programmes />
        <Stats />
        <About />
        <Journey />
        <Advisory />
        <SocialConnect />
      </main>
      <Footer />
    </div>
  )
}
