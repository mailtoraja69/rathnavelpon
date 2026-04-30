import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Linkedin, Twitter, Instagram, Facebook, MapPin, ArrowRight, ExternalLink, Menu, X } from 'lucide-react'

/* ── Scroll reveal ── */
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true) }, { threshold })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [threshold])
  return { ref, v }
}

const GOLD = '#C9A84C'
const DARK = '#111827'

/* ── Pin SVG ── */
function Pin({ color = GOLD }: { color?: string }) {  return (
    <svg width={28} height={28} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  )
}

/* ══════════════════════════════════════════
   NAV
══════════════════════════════════════════ */
function Nav() {
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
    { label: 'Connect', href: '#connect' },
  ]
  return (
    <motion.header initial={{ y: -70 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur shadow-sm border-b border-gray-100' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded bg-gray-900 flex items-center justify-center">
            <span className="font-display text-xs font-bold" style={{ color: GOLD }}>RP</span>
          </div>
          <span className="font-display text-gray-900 font-bold tracking-[0.15em] text-base uppercase hidden sm:block">Rathnavel Pon</span>
        </a>
        <nav className="hidden md:flex items-center gap-7">
          {links.slice(0, 3).map(l => (
            <a key={l.label} href={l.href} className="font-sans text-sm text-gray-500 hover:text-gray-900 transition-colors tracking-wide">{l.label}</a>
          ))}
          <a href="https://calendly.com/reavan/connect-with-rathnavel" target="_blank" rel="noopener noreferrer"
            className="font-sans text-sm px-4 py-2 rounded border text-white transition-all duration-300"
            style={{ backgroundColor: DARK, borderColor: DARK }}>
            Book a Session
          </a>
        </nav>
        <button onClick={() => setOpen(!open)} className="md:hidden text-gray-700 p-1">{open ? <X size={20}/> : <Menu size={20}/>}</button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden shadow-md">
            <nav className="flex flex-col px-6 py-3 gap-3">
              {links.map(l => (
                <a key={l.label} href={l.href} onClick={() => setOpen(false)}
                  className="font-sans text-sm text-gray-700 hover:text-yellow-700 py-1 border-b border-gray-50 last:border-0">{l.label}</a>
              ))}
              <a href="https://calendly.com/reavan/connect-with-rathnavel" target="_blank" rel="noopener noreferrer"
                className="font-sans text-sm font-semibold text-white text-center py-2.5 rounded mt-1"
                style={{ backgroundColor: DARK }}>Book a Session</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

/* ══════════════════════════════════════════
   HERO  (white bg)
══════════════════════════════════════════ */
function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center bg-white pt-16">
      <div className="max-w-6xl mx-auto px-6 py-16 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left */}
          <div className="flex-1">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border text-xs font-sans tracking-widest uppercase"
              style={{ borderColor: GOLD + '44', color: GOLD, backgroundColor: GOLD + '0D' }}>
              <MapPin size={10}/> Coimbatore · Tamil Nadu · India · Asia · Earth · Milky Way
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
              className="font-display text-5xl sm:text-6xl xl:text-7xl leading-[1.06] font-bold text-gray-900 mb-5">
              Facilitator.<br/>
              <span className="gold-text">Educator.</span><br/>
              <span className="text-gray-400">Writer.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
              className="font-body text-lg text-gray-500 leading-relaxed max-w-lg mb-8">
              A facilitator for short learning sessions, activity based learning and quiz competitions.
              An educator formally engaged in teaching Civil Engineering.
              A writer with adequate intelligence to compete with Artificial Intelligence.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-3">
              <a href="https://www.linkedin.com/in/reavan/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded font-sans font-semibold text-sm text-white transition-all hover:opacity-90"
                style={{ backgroundColor: DARK }}>
                <Linkedin size={15}/> Connect on LinkedIn <ArrowRight size={13}/>
              </a>
              <a href="https://calendly.com/reavan/connect-with-rathnavel" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded font-sans text-sm border-2 transition-all hover:bg-yellow-50"
                style={{ borderColor: GOLD, color: GOLD }}>
                📅 Book a Session
              </a>
            </motion.div>
          </div>

          {/* Right: Photo with overlaid tag */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.9 }}
            className="w-full lg:w-80 flex-shrink-0">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img src="/ai2.png" alt="Rathnavel Ponnuswami" className="w-full h-[460px] object-cover object-top"/>
              
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════
   PROGRAMMES  (dark bg)
══════════════════════════════════════════ */
const programmes = [
  { code: 'SAFE',  sub: '1st Year Engineering',        emoji: '🎓' },
  { code: 'PESA',  sub: '1st Year Arts / Sciences / Law', emoji: '📚' },
  { code: 'SIMBA', sub: 'MBA Students',                emoji: '💼' },
  { code: 'TACT',  sub: 'Young Professionals',         emoji: '🚀' },
]
function Programmes() {
  const { ref, v } = useReveal()
  return (
    <section id="programmes" ref={ref} className="py-16" style={{ backgroundColor: DARK }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          className="flex items-center gap-3 justify-center mb-10">
          <div className="h-px w-8" style={{ backgroundColor: GOLD + '60' }}/>
          <span className="font-sans text-xs tracking-widest uppercase" style={{ color: GOLD }}>Exclusive Programmes</span>
          <div className="h-px w-8" style={{ backgroundColor: GOLD + '60' }}/>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {programmes.map((p, i) => (
            <motion.div key={p.code}
              initial={{ opacity: 0, y: 20 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-xl p-6 text-center border border-white/8 hover:-translate-y-1 transition-all duration-300 cursor-default"
              style={{ backgroundColor: '#ffffff' }}>
              <div className="text-3xl mb-3">{p.emoji}</div>
              <div className="font-display text-2xl font-bold mb-1 gold-text">{p.code}</div>
              <div className="font-sans text-xs text-grey/900 leading-snug">{p.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════
   STATS  (white bg)
══════════════════════════════════════════ */
const stats = [
  { value: '100+',    label: 'Quizzes',              emoji: '🎤' },
  { value: '200+',    label: 'Sessions',              emoji: '🏫' },
  { value: '300+',    label: 'MoCs',                  emoji: '🎙️' },
  { value: '10,000+', label: 'Participants',           emoji: '👥' },
  { value: '26',      label: 'Years in Facilitation',  emoji: '⏳' },
]
function Stats() {
  const { ref, v } = useReveal()
  return (
    <section ref={ref} className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="h-px w-6" style={{ backgroundColor: GOLD }}/>
              <span className="font-sans text-xs tracking-widest uppercase" style={{ color: GOLD }}>Number Crunching</span>
            </div>
            <h2 className="font-display text-3xl font-bold text-gray-900">Impact in Numbers</h2>
          </div>
          <p className="font-display text-xl italic" style={{ color: GOLD }}></p>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08, duration: 0.5 }}
              className="rounded-xl p-5 text-center border border-gray-100 hover:border-yellow-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="text-xl mb-2">{s.emoji}</div>
              <div className="font-display text-2xl font-bold mb-0.5" style={{ color: GOLD }}>{s.value}</div>
              <div className="font-sans text-xs text-gray-400 tracking-wide uppercase leading-tight">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════
   ABOUT  (dark bg)
══════════════════════════════════════════ */
function About() {
  const { ref, v } = useReveal()
  return (
    <section id="about" ref={ref} className="py-16" style={{ backgroundColor: DARK }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0 }} animate={v ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-10">
          <div className="h-px w-6" style={{ backgroundColor: GOLD }}/>
          <span className="font-sans text-xs tracking-widest uppercase" style={{ color: GOLD }}>About</span>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={v ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white leading-tight mb-6">
              Coimbatore.<br/>
                Classrooms.<br/>
              Cricket.
            </h2>
            <p className="font-body text-lg text-white/60 leading-loose mb-4">
              A thorough Coimbatore person, Rathnavel was schooled at Carmel Garden and SBOA. He completed B.E. Civil Engineering from KCT and M.E. Environmental Engineering in GCT. He has two decades of experience in technical education with 8 engineering colleges. In parallel, he has emerged over five lustrums, as a facilitator for short non formal programmes. He has also had a short stint in environmental management and life insurance.
            </p>
            <p className="font-body text-lg text-white/45 leading-loose mb-4">
              Rathnavel is a part of the lovely RATHNA KUNJARAM family. His social tryst is courtesy Rotary International, Senior Chamber International, Institute of Liberal Studies and Institution of Engineers (India).
            </p>
            <p className="font-body text-lg text-white/45 leading-loose">
              His life goal is to interact with youngsters and enhance their knowledge, skills, innovation and attitude. He plans to contribute to better waste management and urban development practices in Coimbatore. His interests are Indian Cricket, Tamil Cinema and Learning Innovations.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} animate={v ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.15, duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img src="/ai1.png" alt="Rathnavel Ponnuswami" className="w-full h-[550px] object-cover object-top"/>
            <div className="absolute bottom-0 left-0 right-0 px-5 py-4"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 100%)' }}>
              <div className="flex items-center justify-center flex-wrap gap-x-3 gap-y-1">
                <span className="text-white/90 text-xs font-sans">🫀 Organ Donor</span>
                <span className="text-white/30 text-xs">·</span>
                <span className="text-white/90 text-xs font-sans">🩸 A1B+ve</span>
                <span className="text-white/30 text-xs">·</span>
                <span className="text-white/90 text-xs font-sans">♌ August Born</span>
                <span className="text-white/30 text-xs">·</span>
                <span className="text-white/90 text-xs font-sans">🗣️ Bilingual</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════
   JOURNEY — sketch roadmap with pins
══════════════════════════════════════════ */
const milestones = [
  { year:'2001', role:'Freelance Trainer',   org:'MoC · Non Formal Learning · Quizzes',               color:'#E53935', bg:'#fff5f5', side:'left'  },
  { year:'2004', role:'Lecturer',            org:'Hindusthan College of Engineering & Technology',     color:'#1E88E5', bg:'#f0f6ff', side:'right' },
  { year:'2005', role:'Lecturer',            org:'Tamilnadu College of Engineering',                   color:'#F59E0B', bg:'#fffbf0', side:'left'  },
  { year:'2006', role:'Chief Executive',     org:'ECO-TECH',                                           color:'#43A047', bg:'#f0fff4', side:'right' },
  { year:'2007', role:'Lecturer',            org:'SNS College of Engineering',                         color:'#8E24AA', bg:'#fdf4ff', side:'left'  },
  { year:'2008', role:'Lecturer',            org:'Adithya Institute of Technology',                    color:'#E53935', bg:'#fff5f5', side:'right' },
  { year:'2009', role:'Assistant Professor', org:'Kalaivani College of Technology',                    color:'#1E88E5', bg:'#f0f6ff', side:'left'  },
  { year:'2011', role:'Assistant Professor', org:'KTVR Knowledge Park for Engg. & Technology',         color:'#F59E0B', bg:'#fffbf0', side:'right' },
  { year:'2013', role:'Assistant Professor', org:'Coimbatore Institute of Engg. and Technology',       color:'#43A047', bg:'#f0fff4', side:'left'  },
  { year:'2015', role:'Assistant Professor', org:'Akshaya College of Engineering & Technology',        color:'#8E24AA', bg:'#fdf4ff', side:'right' },
  { year:'2019', role:'Apex Person',         org:'Nicety Shelters and Solutions',                      color:'#E53935', bg:'#fff5f5', side:'left'  },
  { year:'2020', role:'Financial Advisor',   org:'ICICI Prudential',                                   color:'#1E88E5', bg:'#f0f6ff', side:'right' },
]

function Pushpin({ color }: { color: string }) {
  return (
    <svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ position:'absolute', top:'-10px', left:'14px', filter:'drop-shadow(1px 2px 2px rgba(0,0,0,0.25))' }}>
      <ellipse cx="14" cy="11" rx="10" ry="10" fill={color}/>
      <ellipse cx="14" cy="11" rx="7" ry="7" fill="white" fillOpacity="0.35"/>
      <ellipse cx="11" cy="8" rx="3" ry="2" fill="white" fillOpacity="0.5" transform="rotate(-20 11 8)"/>
      <line x1="14" y1="20" x2="14" y2="35" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  )
}

function RoadPin({ color }: { color: string }) {
  return (
    <svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 7.5 12 20 12 20S24 19.5 24 12C24 5.373 18.627 0 12 0z" fill={color}/>
      <circle cx="12" cy="12" r="5" fill="white" fillOpacity="0.9"/>
    </svg>
  )
}

function Journey() {
  const { ref, v } = useReveal(0.03)

  return (
    <section id="journey" ref={ref} className="py-20 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <motion.div initial={{ opacity:0, y:20 }} animate={v ? { opacity:1, y:0 } : {}} transition={{ duration:0.6 }}
          className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-10" style={{ background:'#C9A84C55' }}/>
            <span className="font-sans text-xs tracking-widest uppercase" style={{ color:'#C9A84C' }}>The Journey</span>
            <div className="h-px w-10" style={{ background:'#C9A84C55' }}/>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900">
            26 Years, <span style={{
              background:'linear-gradient(135deg,#E53935,#F59E0B,#43A047,#1E88E5)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text'
            }}>One Direction</span>
          </h2>
          <p className="font-body text-gray-400 mt-2 text-lg italic">Each pin marks a chapter. Follow the road.</p>
        </motion.div>

        {/* Desktop roadmap */}
        <div className="hidden md:block relative" style={{ minHeight: `${milestones.length * 160}px` }}>

          {/* SVG curved path */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex:0 }} preserveAspectRatio="none"
            viewBox="0 0 900 1920" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="sketch">
                <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="2" result="noise"/>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G"/>
              </filter>
            </defs>
            <path
              d="M450,40 C650,40 750,200 450,240 C150,280 50,440 450,480 C750,520 650,680 450,720 C150,760 50,920 450,960 C750,1000 650,1160 450,1200 C150,1240 50,1400 450,1440 C750,1480 650,1640 450,1680 C150,1720 250,1840 450,1880"
              fill="none" stroke="#CBD5E0" strokeWidth="3" strokeDasharray="10 6"
              filter="url(#sketch)" strokeLinecap="round"/>
          </svg>

          {milestones.map((m, i) => {
            const isLeft = m.side === 'left'
            const topPct = (i / (milestones.length - 1)) * 100
            const pinColors = ['#E53935','#1E88E5','#F59E0B','#43A047','#8E24AA']
            const pinColor = pinColors[i % pinColors.length]

            return (
              <motion.div key={i}
                initial={{ opacity:0, x: isLeft ? -40 : 40 }}
                animate={v ? { opacity:1, x:0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.55 }}
                style={{
                  position:'absolute',
                  top: `${(i / milestones.length) * 100 + 1}%`,
                  left: isLeft ? '2%' : '52%',
                  width:'42%',
                  zIndex: 2,
                }}>

                {/* Card */}
                <div style={{
                  position:'relative',
                  background: m.bg,
                  border: `1.5px solid ${m.color}33`,
                  borderRadius:'12px',
                  padding:'20px 20px 16px 22px',
                  boxShadow:`3px 4px 0px ${m.color}22, 0 2px 12px rgba(0,0,0,0.06)`,
                  fontFamily:'inherit',
                }}>
                  {/* Sketch corner accent */}
                  <div style={{
                    position:'absolute', top:6, right:8,
                    width:28, height:28, borderTop:`2px solid ${m.color}40`,
                    borderRight:`2px solid ${m.color}40`, borderRadius:'0 6px 0 0',
                  }}/>
                  {/* Pushpin */}
                  <Pushpin color={m.color}/>
                  {/* Year */}
                  <div style={{ color: m.color, fontFamily:'"Playfair Display",Georgia,serif', fontSize:'1.4rem', fontWeight:700, marginBottom:2 }}>
                    {m.year}
                  </div>
                  {/* Role */}
                  <div style={{ color:'#111827', fontFamily:'"Playfair Display",Georgia,serif', fontSize:'1.05rem', fontWeight:700, marginBottom:3, lineHeight:1.3 }}>
                    {m.role}
                  </div>
                  {/* Org */}
                  <div style={{ color:'#6B7280', fontFamily:'"Manrope",sans-serif', fontSize:'0.78rem', lineHeight:1.4 }}>
                    {m.org}
                  </div>
                </div>

                {/* Map pin connector — points toward center path */}
                <div style={{
                  position:'absolute',
                  top:'50%',
                  [isLeft ? 'right' : 'left']: '-36px',
                  transform:'translateY(-50%)',
                  display:'flex',
                  alignItems:'center',
                }}>
                  <RoadPin color={pinColor}/>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Mobile: simple vertical list */}
        <div className="md:hidden space-y-5">
          {milestones.map((m, i) => (
            <motion.div key={i}
              initial={{ opacity:0, x:-20 }} animate={v ? { opacity:1, x:0 } : {}}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="flex gap-3 items-start">
              <div className="flex-shrink-0 mt-1">
                <RoadPin color={m.color}/>
              </div>
              <div style={{
                flex:1, background:m.bg,
                border:`1.5px solid ${m.color}30`,
                borderRadius:'10px', padding:'14px 16px',
                boxShadow:`2px 3px 0px ${m.color}20`,
              }}>
                <div style={{ color:m.color, fontFamily:'"Playfair Display",Georgia,serif', fontWeight:700, fontSize:'1.1rem' }}>{m.year}</div>
                <div style={{ color:'#111827', fontFamily:'"Playfair Display",Georgia,serif', fontWeight:700, fontSize:'0.95rem', marginBottom:2 }}>{m.role}</div>
                <div style={{ color:'#6B7280', fontFamily:'"Manrope",sans-serif', fontSize:'0.75rem' }}>{m.org}</div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

/* ══════════════════════════════════════════
   ADVISORY  (dark bg)
══════════════════════════════════════════ */
const advisoryClients = [
  { name: 'SDS Land Surveyors',              url: 'https://www.sdslandsurveyor.com/',                                               abbr: 'SDS' },
  { name: 'Prajai Times',                    url: 'http://prajaitimes.in',                                                           abbr: 'PT'  },
  { name: 'BESTOW',                          url: 'https://www.instagram.com/bestow.cbe/',                                           abbr: 'BW'  },
  { name: 'Elite Construction & Architects', url: 'https://www.facebook.com/people/Elite-Construction-And-Architects/61571073511891/', abbr: 'EC'  },
]
function Advisory() {
  const { ref, v } = useReveal()
  return (
    <section id="work" ref={ref} className="py-16" style={{ backgroundColor: DARK }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-8" style={{ backgroundColor: GOLD + '55' }}/>
            <span className="font-sans text-xs tracking-widest uppercase" style={{ color: GOLD }}>Advisory Role</span>
            <div className="h-px w-8" style={{ backgroundColor: GOLD + '55' }}/>
          </div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white">Organisations He Advises</h2>
          <p className="font-body text-lg text-white/40 mt-2">Logos coming soon — click to visit each organisation.</p>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {advisoryClients.map((c, i) => (
            <motion.a key={i} href={c.url} target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.12, duration: 0.5 }}
              className="group flex flex-col items-center justify-center gap-3 p-6 rounded-xl border border-white/8 hover:border-yellow-500/40 transition-all duration-300 hover:-translate-y-1"
              style={{ backgroundColor: '#ffffff' }}>
              {/* Logo placeholder — replace span with <img src="/logo-sds.png" ...> when logos arrive */}
              <div className="w-16 h-16 rounded-lg border border-white/10 flex items-center justify-center group-hover:border-yellow-500/30 transition-all">
                <span className="font-display text-lg font-bold text-yellow-600 transition-colors">{c.abbr}</span>
              </div>
              <div className="text-center">
                <div className="font-display text-sm text-grey/900 font-semibold leading-tight group-hover:text-yellow-300 transition-colors">{c.name}</div>
                <div className="flex items-center justify-center gap-1 mt-1.5">
                  <ExternalLink size={10} className="text-grey/900 group-hover:text-yellow-400 transition-colors"/>
                  <span className="font-sans text-xs text-grey/900 group-hover:text-yellow-400 transition-colors">Visit</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════
   CONNECT  (white bg)
══════════════════════════════════════════ */
const socials = [
  { name: 'LinkedIn',    handle: 'reavan',       url: 'https://www.linkedin.com/in/reavan/',
    icon: <Linkedin size={20}/>, desc: 'Professional updates and purposeful writing', color: '#0A66C2' },
  { name: 'X / Twitter', handle: '@reavan',      url: 'https://x.com/reavan',
    icon: <Twitter size={20}/>, desc: 'Cricket related stats and rants', color: '#1D9BF0' },
  { name: 'Threads',     handle: '@reavan1881',  url: 'https://www.threads.com/@reavan1881',
    icon: (
      <svg viewBox="0 0 192 192" width="20" height="20" fill="currentColor">
        <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.968 0-27.414 6.396-35.012 18.035l13.77 9.452c5.665-8.618 14.553-10.452 21.244-10.452h.23c8.209.054 14.415 2.456 18.452 7.145 2.904 3.374 4.845 8.04 5.798 13.955-7.258-1.233-15.104-1.609-23.502-1.122-23.65 1.361-38.857 15.2-37.83 34.416.522 9.765 5.267 18.167 13.35 23.59 6.832 4.658 15.629 6.99 24.8 6.5 12.07-.65 21.556-5.273 28.186-13.72 5.09-6.513 8.301-14.968 9.716-25.676 5.823 3.514 10.132 8.138 12.487 13.66 4.098 9.569 4.344 25.285-8.503 38.117-11.275 11.26-24.847 16.14-45.32 16.29-22.71-.168-39.904-7.452-51.103-21.656C52.36 138.85 47 122.364 46.734 101.963c.266-20.4 5.627-36.89 15.929-49.01 11.199-14.204 28.393-21.489 51.103-21.656 22.31.168 38.842 7.484 49.156 21.756 5.047 6.99 8.713 15.816 10.943 26.253l16.02-3.86c-2.677-12.075-7.222-22.63-13.587-31.498-13.703-18.983-34.262-28.72-61.077-28.946h-.418c-26.522.226-46.907 10.033-60.657 29.164C43.035 57.336 37.04 76.658 36.748 101.963v.075c.292 25.305 6.287 44.628 17.821 57.463 13.75 19.13 34.135 28.938 60.657 29.163h.418c23.591-.198 40.245-6.393 53.817-20.177 17.797-17.808 17.072-39.923 11.291-53.585-4.192-9.798-12.315-17.86-38.215-25.914Z"/>
        <path d="M96.754 113.447c-9.26.527-18.977-3.634-19.466-11.94-.347-6.067 4.28-12.753 20.295-13.678 1.903-.11 3.764-.162 5.583-.159 6.388.015 12.408.657 17.947 1.906-2.044 25.48-15.147 23.322-24.359 23.871Z"/>
      </svg>
    ), desc: 'Micro movie reviews', color: '#000000' },
  { name: 'QOTD Blog',   handle: 'qotd2026',    url: 'https://qotd2026.blogspot.com/',
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M21 3H3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-1 16H4V5h16v14zM6 7h12v2H6zm0 4h12v2H6zm0 4h8v2H6z"/></svg>,
    desc: 'Quiz with AI-free questions and AI-powered answers', color: '#FF6B35' },
  { name: 'Instagram',   handle: '@reavan1881', url: 'https://www.instagram.com/reavan1881?igsh=MW5obTJxemFpMnM2OQ==',
    icon: <Instagram size={20}/>, desc: 'Coimbatore Landmarks with Tree Marks', color: '#E1306C' },
  { name: 'Pinterest',   handle: 'ponrathnavel', url: 'https://pin.it/34KNJeLko',
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>,
    desc: 'Photos of people who inspire him', color: '#E60023' },
  { name: 'Facebook',    handle: 'reavan',      url: 'https://www.facebook.com/reavan',
    icon: <Facebook size={20}/>, desc: 'Community updates and engagement', color: '#1877F2' },
]
function Connect() {
  const { ref, v } = useReveal()
  return (
    <section id="connect" ref={ref} className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-8" style={{ backgroundColor: GOLD + '50' }}/>
            <span className="font-sans text-xs tracking-widest uppercase" style={{ color: GOLD }}>Find Rathnavel Online</span>
            <div className="h-px w-8" style={{ backgroundColor: GOLD + '50' }}/>
          </div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900">Connect</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {socials.map((s, i) => (
            <motion.a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08, duration: 0.5 }}
              className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group bg-white">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: s.color + '15', color: s.color }}>
                {s.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="font-display text-gray-900 font-semibold text-base">{s.name}</span>
                  <ExternalLink size={11} className="text-gray-300 group-hover:text-yellow-500 transition-colors"/>
                </div>
                <div className="font-sans text-xs mb-1" style={{ color: s.color + 'BB' }}>{s.handle}</div>
                <p className="font-body text-gray-400 text-sm leading-snug">{s.desc}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════
   FOOTER  (dark)
══════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="py-8 border-t border-white/8" style={{ backgroundColor: DARK }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="font-display text-white/50 text-sm tracking-widest uppercase mb-0.5">Rathnavel Pon</div>
          <div className="font-sans text-white/25 text-xs">© 2026 · rathnavelpon.in</div>
          <div className="font-sans text-white/25 text-xs">© All Lefts Are Unreserved😉</div>

        </div>
        <div className="flex items-center gap-3">
          {[
            { href: 'https://www.linkedin.com/in/reavan/', icon: <Linkedin size={15}/> },
            { href: 'https://x.com/reavan',               icon: <Twitter size={15}/> },
            { href: 'https://www.instagram.com/reavan1881?igsh=MW5obTJxemFpMnM2OQ==', icon: <Instagram size={15}/> },
            { href: 'https://www.facebook.com/reavan',    icon: <Facebook size={15}/> },
          ].map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-yellow-400 hover:border-yellow-400/40 transition-all">
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

/* ══════════════════════════════════════════
   ROOT
══════════════════════════════════════════ */
export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main>
        <Hero />
        <Programmes />
        <Stats />
        <About />
        <Journey />
        <Advisory />
        <Connect />
      </main>
      <Footer />
    </div>
  )
}
