/**
 * PROJECTS PAGE — Client-Side Rendering (CSR)
 * Data GitHub repos di-fetch di browser menggunakan useEffect.
 * Filter by category menggunakan useState + useMemo (memoization).
 */

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'

const featuredProjects = [
  {
    id: 1,
    title: 'VR Safety Simulator',
    desc: 'Industrial safety training application in VR. Workers experience hazardous scenarios in a safe virtual environment. Built with Unity + OpenXR + Meta Quest 2.',
    tech: ['Unity', 'C#', 'OpenXR', 'Meta SDK'],
    category: 'VR',
    stars: 42,
    color: '#00f5ff',
    icon: '⬡',
    featured: true,
  },
  {
    id: 2,
    title: 'AR Museum Guide',
    desc: 'Augmented reality museum experience — point your phone at exhibits to see 3D reconstructions and interactive information overlays. Won 1st place at national game jam.',
    tech: ['Unity', 'Vuforia', 'AR Foundation', 'C#'],
    category: 'AR',
    stars: 89,
    color: '#a855f7',
    icon: '◈',
    featured: true,
  },
  {
    id: 3,
    title: 'Procedural Dungeon VR',
    desc: 'Fully procedurally generated dungeon crawler built for Meta Quest 2. Features AI enemies, physics-based combat, and infinite replayability.',
    tech: ['Unreal Engine', 'C++', 'Blueprints', 'Meta SDK'],
    category: 'VR',
    stars: 67,
    color: '#10b981',
    icon: '▣',
    featured: true,
  },
  {
    id: 4,
    title: 'XR Portfolio Viewer',
    desc: 'View portfolios and 3D assets in mixed reality. Architects and designers can walk around their designs at 1:1 scale before building.',
    tech: ['Unity', 'MRTK', 'HoloLens 2', 'C#'],
    category: 'MR',
    stars: 33,
    color: '#f59e0b',
    icon: '◉',
    featured: false,
  },
  {
    id: 5,
    title: 'Shader Art Gallery',
    desc: 'WebGL-based interactive shader art gallery. Each artwork is a real-time shader program that reacts to mouse movement and audio input.',
    tech: ['GLSL', 'Three.js', 'WebGL', 'GSAP'],
    category: 'Web',
    stars: 55,
    color: '#00f5ff',
    icon: '⬡',
    featured: false,
  },
  {
    id: 6,
    title: 'Mobile Puzzle Game',
    desc: 'Physics-based mobile puzzle game with 100+ levels. Features procedural level generation and cloud saves. 5K+ downloads on Play Store.',
    tech: ['Unity', 'C#', 'Firebase', 'Android'],
    category: 'Mobile',
    stars: 28,
    color: '#a855f7',
    icon: '◈',
    featured: false,
  },
]

const categories = ['All', 'VR', 'AR', 'MR', 'Web', 'Mobile']

export default function ProjectsPage() {
  // CSR: GitHub repos fetch di browser
  const [repos, setRepos] = useState([])
  const [reposLoading, setReposLoading] = useState(true)
  const [reposError, setReposError] = useState(null)

  // Local state for filtering
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('stars')
  const [showGithub, setShowGithub] = useState(false)

  // CSR: fetch GitHub repos saat komponen mount
  useEffect(() => {
    const controller = new AbortController()
    fetch('https://api.github.com/users/Var1d/repos?per_page=6&sort=updated', {
      signal: controller.signal,
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    })
      .then(r => r.ok ? r.json() : Promise.reject('GitHub API error'))
      .then(data => setRepos(Array.isArray(data) ? data : []))
      .catch(err => { if (err.name !== 'AbortError') setReposError(String(err)) })
      .finally(() => setReposLoading(false))
    return () => controller.abort()
  }, [])

  // Memoized filtered projects
  const filtered = useMemo(() => {
    let result = [...featuredProjects]
    if (activeCategory !== 'All') result = result.filter(p => p.category === activeCategory)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(p => p.title.toLowerCase().includes(q) || p.tech.some(t => t.toLowerCase().includes(q)))
    }
    if (sortBy === 'stars') result.sort((a, b) => b.stars - a.stars)
    else if (sortBy === 'name') result.sort((a, b) => a.title.localeCompare(b.title))
    return result
  }, [activeCategory, searchQuery, sortBy])

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header} className="grid-bg">
        <div style={styles.orb} />
        <div style={styles.headerInner}>
          <span className="mono" style={styles.renderBadge}>⚡ CLIENT-SIDE RENDERING · useEffect + useMemo</span>
          <h1 style={styles.title}>PROJECTS<span style={styles.titleAccent}>_</span></h1>
          <p style={styles.sub}>Interactive filter & GitHub repos fetched live in the browser</p>
        </div>
      </div>

      <div style={styles.container}>
        {/* Controls */}
        <div style={styles.controls}>
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="search by name or tech..."
            style={styles.searchInput}
            className="mono"
          />
          <div style={styles.cats}>
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                style={{
                  ...styles.catBtn,
                  border: `1px solid ${activeCategory === c ? 'var(--neon)' : 'var(--border)'}`,
                  color: activeCategory === c ? 'var(--neon)' : 'var(--muted)',
                  background: activeCategory === c ? 'rgba(0,245,255,0.05)' : 'transparent',
                  textShadow: activeCategory === c ? '0 0 8px rgba(0,245,255,0.5)' : 'none',
                }}
              >
                {c}
              </button>
            ))}
          </div>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={styles.select} className="mono">
            <option value="stars">Sort: Stars</option>
            <option value="name">Sort: Name</option>
          </select>
        </div>

        {/* Count */}
        <p className="mono" style={{ color: 'var(--muted)', fontSize: '12px', marginBottom: '32px' }}>
          {'>'} {filtered.length} project{filtered.length !== 1 ? 's' : ''} found
        </p>

        {/* Projects grid */}
        <div style={styles.grid}>
          {filtered.map((p, i) => (
            <div
              key={p.id}
              style={{
                ...styles.card,
                borderColor: p.featured ? `${p.color}33` : 'var(--border)',
                animationDelay: `${i * 80}ms`,
              }}
              className="animate-fade-up"
            >
              {p.featured && (
                <span className="mono" style={{ ...styles.featuredTag, color: p.color, borderColor: `${p.color}44` }}>
                  ★ FEATURED
                </span>
              )}
              <div style={{ ...styles.cardIcon, color: p.color, textShadow: `0 0 15px ${p.color}` }}>
                {p.icon}
              </div>
              <div style={{ ...styles.cardCat, color: p.color }} className="mono">{p.category}</div>
              <h3 style={styles.cardTitle}>{p.title}</h3>
              <p style={styles.cardDesc}>{p.desc}</p>
              <div style={styles.techRow}>
                {p.tech.map(t => (
                  <span key={t} style={styles.techTag} className="mono">{t}</span>
                ))}
              </div>
              <div style={styles.cardFooter}>
                <span style={{ ...styles.stars, color: p.color }} className="mono">★ {p.stars}</span>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub Repos Toggle */}
        <div style={styles.githubSection}>
          <button
            onClick={() => setShowGithub(v => !v)}
            style={styles.toggleBtn}
          >
            <span className="mono" style={{ fontSize: '13px' }}>
              {showGithub ? '▼' : '▶'} GITHUB REPOSITORIES (CSR)
            </span>
          </button>

          {showGithub && (
            <div style={{ marginTop: '24px' }}>
              {reposLoading && (
                <div className="mono" style={{ color: 'var(--muted)', fontSize: '13px', padding: '20px' }}>
                  {'> FETCHING_REPOS...'} <span style={{ animation: 'blink 1s infinite', display: 'inline-block' }}>_</span>
                </div>
              )}
              {reposError && (
                <div style={styles.repoError} className="mono">
                  ⚠ {reposError} — check if username exists on GitHub
                </div>
              )}
              {!reposLoading && repos.length === 0 && !reposError && (
                <div style={styles.repoError} className="mono">
                  No public repos found for this username.
                </div>
              )}
              {!reposLoading && repos.length > 0 && (
                <div style={styles.repoGrid}>
                  {repos.map((r, i) => (
                    <a
                      key={r.id}
                      href={r.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ ...styles.repoCard, animationDelay: `${i * 60}ms` }}
                      className="animate-fade-up"
                    >
                      <div style={styles.repoHeader}>
                        <span style={styles.repoName}>{r.name}</span>
                        <span className="mono" style={styles.repoStars}>★ {r.stargazers_count}</span>
                      </div>
                      <p style={styles.repoDesc}>{r.description || 'No description'}</p>
                      {r.language && (
                        <span className="mono" style={styles.repoLang}>{r.language}</span>
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh' },
  header: {
    padding: '80px 24px 60px',
    position: 'relative',
    overflow: 'hidden',
    borderBottom: '1px solid var(--border)',
  },
  orb: {
    position: 'absolute',
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)',
    top: '-200px',
    right: '-100px',
    pointerEvents: 'none',
  },
  headerInner: {
    maxWidth: '1100px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
  },
  renderBadge: {
    display: 'inline-block',
    background: 'rgba(168,85,247,0.08)',
    border: '1px solid rgba(168,85,247,0.3)',
    color: '#a855f7',
    padding: '6px 14px',
    borderRadius: '2px',
    fontSize: '11px',
    letterSpacing: '1px',
    marginBottom: '16px',
  },
  title: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: 'clamp(36px, 6vw, 72px)',
    fontWeight: 900,
    letterSpacing: '8px',
    color: 'var(--white)',
  },
  titleAccent: {
    color: 'var(--neon)',
    textShadow: '0 0 20px rgba(0,245,255,0.7)',
    animation: 'blink 1s infinite',
  },
  sub: {
    color: 'var(--muted)',
    marginTop: '12px',
    fontSize: '14px',
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '48px 24px',
  },
  controls: {
    display: 'flex',
    gap: '16px',
    marginBottom: '20px',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  searchInput: {
    flex: '1',
    minWidth: '200px',
    padding: '10px 14px',
    background: 'rgba(0,245,255,0.03)',
    border: '1px solid var(--border)',
    borderRadius: '2px',
    color: 'var(--white)',
    fontSize: '13px',
    outline: 'none',
    letterSpacing: '1px',
  },
  cats: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  catBtn: {
    padding: '8px 16px',
    borderRadius: '2px',
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '10px',
    letterSpacing: '2px',
    fontWeight: 700,
    transition: 'all 0.2s',
    cursor: 'pointer',
  },
  select: {
    padding: '9px 14px',
    background: 'rgba(0,245,255,0.03)',
    border: '1px solid var(--border)',
    borderRadius: '2px',
    color: 'var(--muted)',
    fontSize: '13px',
    cursor: 'pointer',
    outline: 'none',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    marginBottom: '60px',
  },
  card: {
    padding: '24px',
    border: '1px solid',
    borderRadius: '4px',
    background: 'rgba(255,255,255,0.02)',
    position: 'relative',
    transition: 'transform 0.2s, box-shadow 0.2s',
    opacity: 0,
    animation: 'fadeUp 0.5s ease forwards',
  },
  featuredTag: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    fontSize: '10px',
    fontFamily: "'Share Tech Mono', monospace",
    border: '1px solid',
    padding: '3px 8px',
    borderRadius: '2px',
    letterSpacing: '1px',
  },
  cardIcon: {
    fontSize: '28px',
    marginBottom: '8px',
  },
  cardCat: {
    fontSize: '11px',
    letterSpacing: '2px',
    fontWeight: 700,
    marginBottom: '8px',
  },
  cardTitle: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '16px',
    fontWeight: 700,
    color: 'var(--white)',
    marginBottom: '10px',
    letterSpacing: '1px',
  },
  cardDesc: {
    color: 'var(--muted)',
    fontSize: '13px',
    lineHeight: 1.7,
    marginBottom: '16px',
  },
  techRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginBottom: '16px',
  },
  techTag: {
    fontSize: '11px',
    padding: '3px 8px',
    border: '1px solid var(--border)',
    borderRadius: '2px',
    color: 'var(--muted)',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stars: {
    fontSize: '13px',
    fontWeight: 700,
  },
  githubSection: {
    borderTop: '1px solid var(--border)',
    paddingTop: '40px',
  },
  toggleBtn: {
    background: 'transparent',
    border: '1px solid var(--border)',
    borderRadius: '2px',
    padding: '10px 20px',
    color: 'var(--neon)',
    cursor: 'pointer',
    letterSpacing: '1px',
    transition: 'all 0.2s',
  },
  repoError: {
    color: '#ef4444',
    fontSize: '12px',
    padding: '16px',
    border: '1px solid rgba(239,68,68,0.2)',
    borderRadius: '4px',
    background: 'rgba(239,68,68,0.05)',
  },
  repoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '16px',
  },
  repoCard: {
    padding: '20px',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    background: 'rgba(0,245,255,0.02)',
    transition: 'border-color 0.2s',
    opacity: 0,
    animation: 'fadeUp 0.4s ease forwards',
  },
  repoHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  repoName: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '13px',
    fontWeight: 700,
    color: 'var(--neon)',
  },
  repoStars: {
    fontSize: '12px',
    color: '#f59e0b',
  },
  repoDesc: {
    fontSize: '13px',
    color: 'var(--muted)',
    lineHeight: 1.6,
    marginBottom: '12px',
  },
  repoLang: {
    fontSize: '11px',
    color: 'var(--accent2)',
    border: '1px solid rgba(168,85,247,0.3)',
    padding: '2px 8px',
    borderRadius: '2px',
  },
}
