/**
 * HOME PAGE — Static Site Generation (SSG)
 * getStaticProps: fetch GitHub user profile saat build time.
 * Data statis: bio, skills, stats — ideal di-pre-render.
 */

import Link from 'next/link'

export async function getStaticProps() {
  try {
    // SSG: fetch GitHub profile saat build time
    const res = await fetch('https://api.github.com/users/Var1d', {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    })

    // Jika username tidak ada di GitHub, gunakan data fallback
    const github = res.ok ? await res.json() : null

    return {
      props: {
        github: github || {
          name: 'Farid Dhiya Fairuz',
          bio: 'VR Game Developer & XR Enthusiast',
          public_repos: 12,
          followers: 10000,
          following: 30,
          avatar_url: null,
          login: 'Var1d',
        }
      },
      revalidate: 3600, // ISR: revalidate setiap 1 jam
    }
  } catch {
    return {
      props: {
        github: {
          name: 'Farid Dhiya Fairuz',
          bio: 'VR Game Developer & XR Enthusiast',
          public_repos: 12,
          followers: 10000,
          following: 30,
          avatar_url: null,
          login: 'Var1d',
        }
      },
      revalidate: 3600,
    }
  }
}

const skills = [
  { name: 'Unity 3D', level: 92, color: '#00f5ff' },
  { name: 'Unreal Engine', level: 78, color: '#a855f7' },
  { name: 'C#', level: 88, color: '#00f5ff' },
  { name: 'C++', level: 70, color: '#a855f7' },
  { name: 'OpenXR SDK', level: 85, color: '#10b981' },
  { name: 'Blender', level: 75, color: '#f59e0b' },
  { name: 'Shader Programming', level: 80, color: '#00f5ff' },
  { name: 'Next.js', level: 72, color: '#a855f7' },
]

const timeline = [
  { year: '2025', title: 'VR Thesis Project', desc: 'Developed immersive VR training simulator for industrial safety using Unity + OpenXR.' },
  { year: '2020', title: 'Game Jam Winner', desc: 'Won 1st place at national game jam with an AR puzzle game using Vuforia SDK.' },
  { year: '2015', title: 'XR Internship', desc: 'Interned at local XR studio, built Meta Quest 2 experiences for museum clients.' },
  { year: '2010', title: 'First Unity Game', desc: 'Released first indie mobile game — a procedural dungeon crawler with 5K downloads.' },
]

export default function Home({ github }) {
  return (
    <div>
      {/* ============ HERO ============ */}
      <section style={styles.hero} className="grid-bg">
        {/* Floating orbs */}
        <div style={styles.orb1} />
        <div style={styles.orb2} />
        <div style={styles.orb3} />

        <div style={styles.heroInner}>
          {/* HUD frame */}
          <div style={styles.hudFrame}>
            <div style={styles.hudCornerTL} />
            <div style={styles.hudCornerTR} />
            <div style={styles.hudCornerBL} />
            <div style={styles.hudCornerBR} />

            <div style={styles.heroContent}>
              {/* Status badge */}
              <div style={styles.statusBadge} className="mono">
                <span style={styles.statusDot} />
                SYSTEM ONLINE · VR_DEV_MODE
              </div>

              <p style={styles.heroLabel} className="mono">{'> INITIALIZING PORTFOLIO...'}</p>

              <h1 style={styles.heroName}>
                <span style={styles.heroFirst}>FARID</span>
                <br />
                <span style={styles.heroLast}>DHIYA FAIRUZ</span>
              </h1>

              <div style={styles.heroRole}>
                <span style={styles.roleTag} className="mono">VR_</span>
                <span style={styles.roleText}>GAME DEVELOPER</span>
                <span style={styles.roleCursor} className="mono">|</span>
              </div>

              <p style={styles.heroDesc}>
                {github.bio || 'Crafting immersive virtual reality experiences that blur the line between the digital and physical world. Specializing in Unity, OpenXR, and interactive 3D environments.'}
              </p>

              <div style={styles.heroCtas}>
                <Link href="/projects" style={styles.ctaPrimary}>
                  <span>VIEW PROJECTS</span>
                  <span style={styles.ctaArrow}>→</span>
                </Link>
                <Link href="/contact" style={styles.ctaSecondary}>CONTACT ME</Link>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={styles.stats}>
            {[
              { label: 'REPOS', value: github.public_repos, icon: '◈' },
              { label: 'FOLLOWERS', value: github.followers, icon: '◉' },
              { label: 'VR PROJECTS', value: '8+', icon: '⬡' },
              { label: 'GAME JAMS', value: '12', icon: '▣' },
            ].map((s, i) => (
              <div key={s.label} style={{ ...styles.statCard, animationDelay: `${i * 100}ms` }} className="animate-fade-up">
                <span style={styles.statIcon}>{s.icon}</span>
                <span style={styles.statValue}>{s.value}</span>
                <span style={styles.statLabel} className="mono">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SSG badge */}
        <div style={styles.renderBadge}>
          <span className="mono" style={{ color: 'var(--green)', fontSize: '11px' }}>
            ◈ SSG + ISR · BUILD TIME RENDER
          </span>
        </div>
      </section>

      {/* ============ SKILLS ============ */}
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span className="mono" style={styles.sectionPre}>{'// SKILL_MATRIX'}</span>
            <h2 style={styles.sectionTitle}>TECH STACK</h2>
          </div>

          <div style={styles.skillsGrid}>
            {skills.map((s, i) => (
              <div key={s.name} style={{ ...styles.skillCard, animationDelay: `${i * 60}ms` }} className="animate-fade-up">
                <div style={styles.skillTop}>
                  <span style={styles.skillName}>{s.name}</span>
                  <span style={{ ...styles.skillPct, color: s.color }} className="mono">{s.level}%</span>
                </div>
                <div style={styles.skillBarBg}>
                  <div style={{
                    ...styles.skillBar,
                    width: `${s.level}%`,
                    background: `linear-gradient(90deg, ${s.color}, ${s.color}88)`,
                    boxShadow: `0 0 10px ${s.color}66`,
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TIMELINE ============ */}
      <section style={{ ...styles.section, background: 'var(--bg2)' }}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span className="mono" style={styles.sectionPre}>{'// EXPERIENCE_LOG'}</span>
            <h2 style={styles.sectionTitle}>TIMELINE</h2>
          </div>

          <div style={styles.timeline}>
            {timeline.map((t, i) => (
              <div key={t.year} style={{ ...styles.timelineItem, animationDelay: `${i * 100}ms` }} className="animate-fade-up">
                <div style={styles.timelineLeft}>
                  <span style={styles.timelineYear} className="mono">{t.year}</span>
                  <div style={styles.timelineLine} />
                </div>
                <div style={styles.timelineContent}>
                  <div style={styles.timelineDot} />
                  <h3 style={styles.timelineTitle}>{t.title}</h3>
                  <p style={styles.timelineDesc}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section style={styles.ctaSection}>
        <div style={styles.container}>
          <div style={styles.ctaBox}>
            <div style={styles.ctaBoxCornerTL} />
            <div style={styles.ctaBoxCornerBR} />
            <span className="mono" style={{ color: 'var(--muted)', fontSize: '13px' }}>{'> READY TO COLLABORATE?'}</span>
            <h2 style={{ ...styles.sectionTitle, marginTop: '12px', fontSize: '32px' }}>
              LET'S BUILD SOMETHING<br />
              <span className="neon-text">IMMERSIVE</span>
            </h2>
            <div style={{ display: 'flex', gap: '16px', marginTop: '28px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link href="/contact" style={styles.ctaPrimary}>START A PROJECT</Link>
              <Link href="/projects" style={styles.ctaSecondary}>SEE MY WORK</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const styles = {
  hero: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    padding: '80px 24px 40px',
  },
  orb1: {
    position: 'absolute',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(0,245,255,0.08) 0%, transparent 70%)',
    top: '-100px',
    right: '-100px',
    animation: 'float 8s ease-in-out infinite',
    pointerEvents: 'none',
  },
  orb2: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)',
    bottom: '0px',
    left: '-50px',
    animation: 'float 10s ease-in-out infinite reverse',
    pointerEvents: 'none',
  },
  orb3: {
    position: 'absolute',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)',
    top: '30%',
    left: '30%',
    animation: 'float 6s ease-in-out infinite',
    pointerEvents: 'none',
  },
  heroInner: {
    maxWidth: '900px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
    width: '100%',
  },
  hudFrame: {
    position: 'relative',
    padding: '40px',
    marginBottom: '40px',
  },
  hudCornerTL: {
    position: 'absolute', top: 0, left: 0,
    width: '24px', height: '24px',
    borderTop: '2px solid var(--neon)',
    borderLeft: '2px solid var(--neon)',
    boxShadow: '-4px -4px 8px rgba(0,245,255,0.3)',
  },
  hudCornerTR: {
    position: 'absolute', top: 0, right: 0,
    width: '24px', height: '24px',
    borderTop: '2px solid var(--neon)',
    borderRight: '2px solid var(--neon)',
    boxShadow: '4px -4px 8px rgba(0,245,255,0.3)',
  },
  hudCornerBL: {
    position: 'absolute', bottom: 0, left: 0,
    width: '24px', height: '24px',
    borderBottom: '2px solid var(--accent2)',
    borderLeft: '2px solid var(--accent2)',
    boxShadow: '-4px 4px 8px rgba(168,85,247,0.3)',
  },
  hudCornerBR: {
    position: 'absolute', bottom: 0, right: 0,
    width: '24px', height: '24px',
    borderBottom: '2px solid var(--accent2)',
    borderRight: '2px solid var(--accent2)',
    boxShadow: '4px 4px 8px rgba(168,85,247,0.3)',
  },
  heroContent: { textAlign: 'center' },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(0,245,255,0.05)',
    border: '1px solid rgba(0,245,255,0.2)',
    borderRadius: '2px',
    padding: '6px 14px',
    fontSize: '11px',
    color: 'var(--neon)',
    letterSpacing: '2px',
    marginBottom: '20px',
  },
  statusDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'var(--green)',
    boxShadow: '0 0 6px var(--green)',
    animation: 'pulse-neon 2s infinite',
  },
  heroLabel: {
    color: 'var(--muted)',
    fontSize: '13px',
    marginBottom: '16px',
    letterSpacing: '1px',
  },
  heroName: {
    fontFamily: "'Orbitron', sans-serif",
    fontWeight: 900,
    lineHeight: 1.0,
    marginBottom: '16px',
  },
  heroFirst: {
    fontSize: 'clamp(48px, 8vw, 96px)',
    color: 'var(--neon)',
    textShadow: '0 0 30px rgba(0,245,255,0.6), 0 0 60px rgba(0,245,255,0.2)',
    letterSpacing: '12px',
  },
  heroLast: {
    fontSize: 'clamp(20px, 4vw, 40px)',
    color: 'var(--white)',
    letterSpacing: '6px',
    opacity: 0.8,
  },
  heroRole: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '24px',
    fontSize: '18px',
  },
  roleTag: {
    color: 'var(--accent2)',
    textShadow: '0 0 10px rgba(168,85,247,0.7)',
    fontSize: '20px',
    fontWeight: 700,
  },
  roleText: {
    fontFamily: "'Orbitron', sans-serif",
    fontWeight: 700,
    letterSpacing: '4px',
    fontSize: '16px',
    color: 'var(--white)',
  },
  roleCursor: {
    color: 'var(--neon)',
    animation: 'blink 1s infinite',
    fontSize: '20px',
  },
  heroDesc: {
    color: 'var(--muted)',
    maxWidth: '560px',
    margin: '0 auto 36px',
    lineHeight: 1.8,
    fontSize: '15px',
  },
  heroCtas: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  ctaPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 28px',
    background: 'transparent',
    border: '1px solid var(--neon)',
    borderRadius: '2px',
    color: 'var(--neon)',
    fontFamily: "'Orbitron', sans-serif",
    fontWeight: 700,
    fontSize: '12px',
    letterSpacing: '2px',
    boxShadow: '0 0 20px rgba(0,245,255,0.2), inset 0 0 20px rgba(0,245,255,0.05)',
    transition: 'all 0.3s',
    position: 'relative',
    overflow: 'hidden',
  },
  ctaArrow: {
    transition: 'transform 0.2s',
  },
  ctaSecondary: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '12px 28px',
    border: '1px solid rgba(168,85,247,0.4)',
    borderRadius: '2px',
    color: 'var(--accent2)',
    fontFamily: "'Orbitron', sans-serif",
    fontWeight: 700,
    fontSize: '12px',
    letterSpacing: '2px',
    transition: 'all 0.3s',
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
  },
  statCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    padding: '20px 12px',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    background: 'rgba(0,245,255,0.02)',
    opacity: 0,
    animation: 'fadeUp 0.5s ease forwards',
  },
  statIcon: {
    color: 'var(--neon)',
    fontSize: '18px',
    marginBottom: '4px',
  },
  statValue: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '28px',
    fontWeight: 900,
    color: 'var(--neon)',
    textShadow: '0 0 15px rgba(0,245,255,0.5)',
  },
  statLabel: {
    fontSize: '10px',
    color: 'var(--muted)',
    letterSpacing: '2px',
  },
  renderBadge: {
    position: 'absolute',
    bottom: '20px',
    right: '24px',
    background: 'rgba(16,185,129,0.08)',
    border: '1px solid rgba(16,185,129,0.2)',
    borderRadius: '2px',
    padding: '6px 12px',
  },
  section: {
    padding: '80px 24px',
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
  },
  sectionHeader: {
    marginBottom: '48px',
  },
  sectionPre: {
    color: 'var(--accent2)',
    fontSize: '13px',
    letterSpacing: '1px',
    display: 'block',
    marginBottom: '8px',
  },
  sectionTitle: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '36px',
    fontWeight: 900,
    color: 'var(--white)',
    letterSpacing: '4px',
  },
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '16px',
  },
  skillCard: {
    padding: '16px 20px',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    background: 'rgba(0,245,255,0.02)',
    opacity: 0,
    animation: 'fadeUp 0.5s ease forwards',
  },
  skillTop: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    fontSize: '14px',
    fontWeight: 600,
  },
  skillName: { color: 'var(--white)' },
  skillPct: { fontSize: '13px', fontWeight: 700 },
  skillBarBg: {
    height: '4px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  skillBar: {
    height: '100%',
    borderRadius: '2px',
    transition: 'width 1s ease',
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
  },
  timelineItem: {
    display: 'flex',
    gap: '32px',
    opacity: 0,
    animation: 'fadeUp 0.5s ease forwards',
  },
  timelineLeft: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '60px',
  },
  timelineYear: {
    color: 'var(--neon)',
    fontSize: '13px',
    fontWeight: 700,
    letterSpacing: '1px',
    marginBottom: '8px',
    textShadow: '0 0 8px rgba(0,245,255,0.5)',
  },
  timelineLine: {
    flex: 1,
    width: '1px',
    background: 'linear-gradient(to bottom, var(--neon), rgba(0,245,255,0.1))',
    marginTop: '4px',
    minHeight: '60px',
  },
  timelineContent: {
    flex: 1,
    paddingBottom: '40px',
    position: 'relative',
  },
  timelineDot: {
    position: 'absolute',
    left: '-41px',
    top: '4px',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background: 'var(--neon)',
    boxShadow: '0 0 10px var(--neon)',
  },
  timelineTitle: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '16px',
    fontWeight: 700,
    color: 'var(--white)',
    marginBottom: '8px',
    letterSpacing: '1px',
  },
  timelineDesc: {
    color: 'var(--muted)',
    fontSize: '14px',
    lineHeight: 1.7,
  },
  ctaSection: {
    padding: '80px 24px',
  },
  ctaBox: {
    textAlign: 'center',
    padding: '60px 40px',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    background: 'rgba(0,245,255,0.02)',
    position: 'relative',
    maxWidth: '700px',
    margin: '0 auto',
  },
  ctaBoxCornerTL: {
    position: 'absolute', top: 0, left: 0,
    width: '20px', height: '20px',
    borderTop: '2px solid var(--neon)',
    borderLeft: '2px solid var(--neon)',
  },
  ctaBoxCornerBR: {
    position: 'absolute', bottom: 0, right: 0,
    width: '20px', height: '20px',
    borderBottom: '2px solid var(--accent2)',
    borderRight: '2px solid var(--accent2)',
  },
}
