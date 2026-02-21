import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={styles.page}>
      <div style={styles.content}>
        <span className="mono" style={styles.code}>404</span>
        <h1 style={styles.title}>PAGE_NOT_FOUND</h1>
        <p className="mono" style={styles.sub}>{'> ERROR: The requested route does not exist in this reality.'}</p>
        <Link href="/" style={styles.btn}>
          <span className="mono">{'> RETURN_HOME()'}</span>
        </Link>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  },
  content: {
    textAlign: 'center',
    padding: '60px 40px',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    position: 'relative',
  },
  code: {
    display: 'block',
    fontSize: '100px',
    fontWeight: 900,
    color: 'var(--neon)',
    textShadow: '0 0 40px rgba(0,245,255,0.5)',
    lineHeight: 1,
    marginBottom: '16px',
  },
  title: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '24px',
    fontWeight: 700,
    letterSpacing: '4px',
    marginBottom: '16px',
    color: 'var(--white)',
  },
  sub: {
    color: 'var(--muted)',
    fontSize: '14px',
    marginBottom: '32px',
  },
  btn: {
    display: 'inline-block',
    padding: '12px 28px',
    border: '1px solid var(--neon)',
    borderRadius: '2px',
    color: 'var(--neon)',
    fontSize: '13px',
    letterSpacing: '2px',
    boxShadow: '0 0 15px rgba(0,245,255,0.2)',
    transition: 'all 0.2s',
  }
}
