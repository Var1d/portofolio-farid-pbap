/**
 * BLOG PAGE — Server-Side Rendering (SSR)
 * getServerSideProps: fetch artikel dari Dev.to API di server setiap request.
 * Data blog selalu fresh — ideal untuk konten yang sering diupdate.
 */

import { useState } from 'react'
import Link from 'next/link'

export async function getServerSideProps() {
  try {
    // SSR: fetch di server setiap request
    const res = await fetch(
      'https://dev.to/api/articles?tag=gamedev&per_page=6&top=1',
      { headers: { 'Accept': 'application/json' } }
    )

    if (!res.ok) throw new Error('Dev.to API error')

    const articles = await res.json()

    return {
      props: {
        articles: articles.map(a => ({
          id: a.id,
          title: a.title,
          description: a.description,
          url: a.url,
          cover: a.cover_image,
          tags: a.tag_list || [],
          reactions: a.positive_reactions_count,
          comments: a.comments_count,
          readTime: a.reading_time_minutes,
          author: a.user?.name || 'Unknown',
          date: a.published_at,
        })),
        fetchedAt: new Date().toISOString(),
        error: null,
      }
    }
  } catch (err) {
    // Fallback data jika API gagal
    return {
      props: {
        articles: fallbackArticles,
        fetchedAt: new Date().toISOString(),
        error: err.message,
      }
    }
  }
}

const fallbackArticles = [
  {
    id: 1,
    title: 'Building Your First VR Experience in Unity',
    description: 'A complete guide to getting started with VR development using Unity and the XR Interaction Toolkit. We cover setup, locomotion, and interaction systems.',
    url: '#',
    cover: null,
    tags: ['unity', 'vr', 'gamedev', 'xr'],
    reactions: 234,
    comments: 45,
    readTime: 12,
    author: 'Farid Dhiya Fairuz',
    date: '2024-01-15T00:00:00Z',
  },
  {
    id: 2,
    title: 'Optimizing VR Performance: 90 FPS or Bust',
    description: 'Performance is everything in VR — dropping below 90 FPS causes motion sickness. Learn GPU instancing, occlusion culling, and foveated rendering tricks.',
    url: '#',
    cover: null,
    tags: ['performance', 'vr', 'unity', 'optimization'],
    reactions: 187,
    comments: 32,
    readTime: 8,
    author: 'Farid Dhiya Fairuz',
    date: '2024-02-03T00:00:00Z',
  },
  {
    id: 3,
    title: 'GLSL Shaders for Game Developers',
    description: 'From basic vertex shaders to complex procedural textures — a practical introduction to writing GLSL shaders that actually run in your games.',
    url: '#',
    cover: null,
    tags: ['glsl', 'shaders', 'graphics', 'webgl'],
    reactions: 312,
    comments: 67,
    readTime: 15,
    author: 'Farid Dhiya Fairuz',
    date: '2024-03-22T00:00:00Z',
  },
]

const tagColors = {
  unity: '#00f5ff',
  vr: '#a855f7',
  xr: '#10b981',
  gamedev: '#f59e0b',
  performance: '#ef4444',
  glsl: '#00f5ff',
  optimization: '#10b981',
}

export default function BlogPage({ articles, fetchedAt, error }) {
  const [activeTag, setActiveTag] = useState('all')

  const allTags = ['all', ...new Set(articles.flatMap(a => a.tags))]

  const filtered = activeTag === 'all'
    ? articles
    : articles.filter(a => a.tags.includes(activeTag))

  const formatDate = (d) => {
    try { return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) }
    catch { return d }
  }

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerOrb} />
        <div style={styles.headerInner}>
          <span className="mono" style={styles.ssrBadge}>
            🔄 SERVER-SIDE RENDERING · getServerSideProps
          </span>
          <h1 style={styles.title}>BLOG_<span style={{ animation: 'blink 1s infinite', display: 'inline-block', color: 'var(--neon)' }}>|</span></h1>
          <p style={styles.sub}>Articles from Dev.to — fetched fresh from the server on every request</p>

          {/* Fetch timestamp */}
          <div style={styles.fetchInfo} className="mono">
            <span style={{ color: 'var(--green)' }}>✓</span>
            {' '}SERVER RENDERED AT: {new Date(fetchedAt).toLocaleTimeString()}
            {error && <span style={{ color: '#ef4444', marginLeft: '16px' }}>⚠ Using fallback data</span>}
          </div>
        </div>
      </div>

      <div style={styles.container}>
        {/* Tag filters */}
        <div style={styles.tagRow}>
          {allTags.slice(0, 8).map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              style={{
                ...styles.tagBtn,
                border: `1px solid ${activeTag === tag ? (tagColors[tag] || 'var(--neon)') : 'var(--border)'}`,
                color: activeTag === tag ? (tagColors[tag] || 'var(--neon)') : 'var(--muted)',
                background: activeTag === tag ? `${(tagColors[tag] || '#00f5ff')}0d` : 'transparent',
              }}
              className="mono"
            >
              #{tag}
            </button>
          ))}
        </div>

        <p className="mono" style={{ color: 'var(--muted)', fontSize: '12px', marginBottom: '32px' }}>
          {'>'} {filtered.length} article{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Articles grid */}
        <div style={styles.grid}>
          {filtered.map((article, i) => (
            <a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...styles.card, animationDelay: `${i * 80}ms` }}
              className="animate-fade-up"
            >
              {/* Cover image or placeholder */}
              <div style={styles.cover}>
                {article.cover ? (
                  <img src={article.cover} alt={article.title} style={styles.coverImg} loading="lazy" />
                ) : (
                  <div style={styles.coverPlaceholder}>
                    <span style={{ fontSize: '40px', opacity: 0.3 }}>📝</span>
                  </div>
                )}
              </div>

              <div style={styles.cardBody}>
                {/* Tags */}
                <div style={styles.cardTags}>
                  {article.tags.slice(0, 3).map(t => (
                    <span
                      key={t}
                      style={{ ...styles.cardTag, color: tagColors[t] || 'var(--muted)' }}
                      className="mono"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <h3 style={styles.cardTitle}>{article.title}</h3>
                <p style={styles.cardDesc}>{article.description?.slice(0, 120)}...</p>

                <div style={styles.cardMeta} className="mono">
                  <span style={{ color: 'var(--muted)', fontSize: '11px' }}>
                    {formatDate(article.date)}
                  </span>
                  <div style={styles.metaRight}>
                    <span style={{ color: '#f59e0b' }}>♥ {article.reactions}</span>
                    <span style={{ color: 'var(--muted)' }}>⏱ {article.readTime}m</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* SSR explanation box */}
        <div style={styles.infoBox}>
          <div style={styles.infoBoxCorner} />
          <h3 style={styles.infoTitle} className="mono">{'// WHY SSR HERE?'}</h3>
          <p style={styles.infoText}>
            Blog posts use <span style={{ color: 'var(--neon)' }}>Server-Side Rendering</span> because
            articles are updated frequently and we always want fresh data.
            Unlike SSG, SSR re-fetches from Dev.to on every request, ensuring readers see the latest posts.
            The fetch timestamp above updates every time you reload this page.
          </p>
          <div style={styles.infoCode} className="mono">
            {`// pages/blog.js
export async function getServerSideProps() {
  const res = await fetch('https://dev.to/api/articles?tag=gamedev')
  const articles = await res.json()
  return { props: { articles, fetchedAt: new Date().toISOString() } }
}`}
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh' },
  header: {
    padding: '80px 24px 60px',
    borderBottom: '1px solid var(--border)',
    position: 'relative',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, var(--bg) 0%, var(--bg2) 100%)',
  },
  headerOrb: {
    position: 'absolute',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(0,245,255,0.05) 0%, transparent 70%)',
    top: '-150px',
    left: '-100px',
    pointerEvents: 'none',
  },
  headerInner: {
    maxWidth: '1100px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
  },
  ssrBadge: {
    display: 'inline-block',
    background: 'rgba(41,128,185,0.1)',
    border: '1px solid rgba(41,128,185,0.3)',
    color: '#5dade2',
    padding: '6px 14px',
    borderRadius: '2px',
    fontSize: '11px',
    letterSpacing: '1px',
    marginBottom: '16px',
  },
  title: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: 'clamp(40px, 7vw, 80px)',
    fontWeight: 900,
    letterSpacing: '6px',
    color: 'var(--white)',
    marginBottom: '12px',
  },
  sub: {
    color: 'var(--muted)',
    fontSize: '14px',
    marginBottom: '16px',
  },
  fetchInfo: {
    fontSize: '12px',
    color: 'var(--muted)',
    letterSpacing: '1px',
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '48px 24px',
  },
  tagRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '24px',
  },
  tagBtn: {
    padding: '6px 14px',
    borderRadius: '2px',
    fontSize: '12px',
    letterSpacing: '1px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '24px',
    marginBottom: '60px',
  },
  card: {
    border: '1px solid var(--border)',
    borderRadius: '4px',
    background: 'rgba(255,255,255,0.02)',
    overflow: 'hidden',
    transition: 'border-color 0.2s, transform 0.2s',
    opacity: 0,
    animation: 'fadeUp 0.5s ease forwards',
    display: 'block',
  },
  cover: {
    height: '160px',
    overflow: 'hidden',
  },
  coverImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(0.85)',
  },
  coverPlaceholder: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, var(--bg2) 0%, var(--bg3) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: '1px solid var(--border)',
  },
  cardBody: { padding: '20px' },
  cardTags: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    marginBottom: '10px',
  },
  cardTag: {
    fontSize: '11px',
    letterSpacing: '0.5px',
  },
  cardTitle: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '15px',
    fontWeight: 700,
    color: 'var(--white)',
    marginBottom: '10px',
    lineHeight: 1.4,
    letterSpacing: '0.5px',
  },
  cardDesc: {
    color: 'var(--muted)',
    fontSize: '13px',
    lineHeight: 1.7,
    marginBottom: '16px',
  },
  cardMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '12px',
  },
  metaRight: {
    display: 'flex',
    gap: '12px',
  },
  infoBox: {
    border: '1px solid var(--border)',
    borderRadius: '4px',
    padding: '28px',
    background: 'rgba(0,245,255,0.02)',
    position: 'relative',
  },
  infoBoxCorner: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '16px',
    height: '16px',
    borderTop: '2px solid var(--neon)',
    borderLeft: '2px solid var(--neon)',
  },
  infoTitle: {
    color: 'var(--accent2)',
    fontSize: '13px',
    letterSpacing: '1px',
    marginBottom: '12px',
  },
  infoText: {
    color: 'var(--muted)',
    fontSize: '14px',
    lineHeight: 1.8,
    marginBottom: '20px',
  },
  infoCode: {
    background: 'var(--bg)',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    padding: '16px',
    fontSize: '12px',
    color: 'var(--green)',
    lineHeight: 1.8,
    whiteSpace: 'pre',
    overflowX: 'auto',
  },
}
