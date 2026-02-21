import Navbar from './Navbar'
import Notifications from './Notifications'

export default function Layout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1, paddingTop: '64px' }}>
        {children}
      </main>
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <span className="mono" style={styles.footerText}>
            {'>'} Farid Dhiya Fairuz | VR Game Developer
          </span>
          <span className="mono" style={{ color: 'var(--muted)', fontSize: '12px' }}>
            Built with Next.js · SSG · SSR · CSR · Zustand · Context API
          </span>
        </div>
      </footer>
      <Notifications />
    </div>
  )
}

const styles = {
  footer: {
    borderTop: '1px solid rgba(0,245,255,0.08)',
    padding: '24px',
    marginTop: '80px',
  },
  footerInner: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '8px',
  },
  footerText: {
    color: 'var(--neon)',
    fontSize: '13px',
    textShadow: '0 0 8px rgba(0,245,255,0.5)',
  }
}
