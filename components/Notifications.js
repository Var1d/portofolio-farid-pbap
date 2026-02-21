import { useContact } from '../context/ContactContext'

export default function Notifications() {
  const { notifications } = useContact()
  return (
    <div style={styles.wrap}>
      {notifications.map(n => (
        <div key={n.id} style={{
          ...styles.toast,
          borderColor: n.type === 'error' ? '#ef4444' : n.type === 'success' ? 'var(--green)' : 'var(--neon)',
          boxShadow: n.type === 'error'
            ? '0 0 20px rgba(239,68,68,0.3)'
            : n.type === 'success'
              ? '0 0 20px rgba(16,185,129,0.3)'
              : 'var(--glow)',
        }}>
          <span style={{ marginRight: '8px' }}>
            {n.type === 'error' ? '⚠' : n.type === 'success' ? '✓' : 'ℹ'}
          </span>
          {n.msg}
        </div>
      ))}
    </div>
  )
}

const styles = {
  wrap: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    pointerEvents: 'none',
  },
  toast: {
    background: 'rgba(10,15,30,0.95)',
    border: '1px solid',
    borderRadius: '6px',
    padding: '12px 20px',
    fontSize: '14px',
    fontFamily: "'Share Tech Mono', monospace",
    color: 'var(--white)',
    animation: 'fadeUp 0.3s ease forwards',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
  }
}
