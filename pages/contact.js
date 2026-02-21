/**
 * CONTACT PAGE — Client-Side Rendering (CSR)
 * Form state dikelola via React Context API (ContactContext).
 * Demonstrasi: Context API, useState, form validation, async simulation.
 */

import { useContact } from '../context/ContactContext'

const socialLinks = [
  { name: 'GitHub', icon: '⌥', url: 'https://github.com/Var1d', color: '#00f5ff' },
  { name: 'LinkedIn', icon: '◈', url: 'https://www.linkedin.com/in/farid-dhiya-10a7553b2?utm_source=share_via&utm_content=profile&utm_medium=member_android', color: '#a855f7' },
  { name: 'Instagram', icon: '▣', url: 'https://www.instagram.com/frddhyfrz/', color: '#10b981' },
  { name: 'WhatsApp', icon: '◉', url: 'https://wa.me/+6281321550948', color: '#f59e0b' },
]

export default function ContactPage() {
  const { form, updateField, status, submitForm } = useContact()

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header} className="grid-bg">
        <div style={styles.orb} />
        <div style={styles.headerInner}>
          <span className="mono" style={styles.badge}>
            💡 CSR + CONTEXT API · FORM STATE MANAGEMENT
          </span>
          <h1 style={styles.title}>CONTACT<span style={{ color: 'var(--neon)', animation: 'blink 1s infinite', display: 'inline-block' }}>_</span></h1>
          <p style={styles.sub}>Form state managed globally via React Context API — persists across navigation</p>
        </div>
      </div>

      <div style={styles.container}>
        <div style={styles.grid}>
          {/* Left: Form */}
          <div>
            <div style={styles.formCard}>
              {/* HUD corners */}
              <div style={styles.cornerTL} />
              <div style={styles.cornerBR} />

              <p className="mono" style={styles.formPre}>{'> SEND_MESSAGE.exe'}</p>
              <h2 style={styles.formTitle}>GET IN TOUCH</h2>

              {/* Context API state note */}
              <div style={styles.contextNote} className="mono">
                <span style={{ color: 'var(--accent2)' }}>✦</span>
                {' '}Form data lives in React Context — type something, navigate away, come back: data persists!
              </div>

              <div style={styles.form}>
                <div style={styles.field}>
                  <label style={styles.label} className="mono">NAME_</label>
                  <input
                    value={form.name}
                    onChange={e => updateField('name', e.target.value)}
                    placeholder="your name"
                    style={styles.input}
                  />
                </div>

                <div style={styles.field}>
                  <label style={styles.label} className="mono">EMAIL_</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => updateField('email', e.target.value)}
                    placeholder="your@email.com"
                    style={styles.input}
                  />
                </div>

                <div style={styles.field}>
                  <label style={styles.label} className="mono">MESSAGE_</label>
                  <textarea
                    value={form.message}
                    onChange={e => updateField('message', e.target.value)}
                    placeholder="tell me about your project..."
                    rows={5}
                    style={{ ...styles.input, resize: 'vertical', minHeight: '120px' }}
                  />
                </div>

                <button
                  onClick={submitForm}
                  disabled={status === 'sending' || status === 'success'}
                  style={{
                    ...styles.submitBtn,
                    opacity: status === 'sending' ? 0.7 : 1,
                    borderColor: status === 'success' ? 'var(--green)' : 'var(--neon)',
                    color: status === 'success' ? 'var(--green)' : 'var(--neon)',
                    boxShadow: status === 'success'
                      ? '0 0 20px rgba(16,185,129,0.3)'
                      : '0 0 20px rgba(0,245,255,0.2)',
                  }}
                >
                  <span className="mono" style={{ letterSpacing: '2px', fontSize: '13px' }}>
                    {status === 'idle' && '> SEND_MESSAGE()'}
                    {status === 'sending' && '> TRANSMITTING...'}
                    {status === 'success' && '> TRANSMITTED ✓'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: Info */}
          <div style={styles.rightCol}>
            {/* Contact info */}
            <div style={styles.infoCard}>
              <h3 style={styles.infoTitle} className="mono">{'// CONTACT_INFO'}</h3>
              <div style={styles.infoList}>
                {[
                  { label: 'EMAIL', val: '247006111058@student.unsil.ac.id', icon: '◉' },
                  { label: 'LOCATION', val: 'Ciamis, Jawa Barat, Indonesia', icon: '⬡' },
                  { label: 'TIMEZONE', val: 'WIB (UTC+7)', icon: '◈' },
                  { label: 'STATUS', val: 'Open to opportunities', icon: '▣', green: true },
                ].map(item => (
                  <div key={item.label} style={styles.infoRow}>
                    <span style={{ color: 'var(--neon)', marginRight: '10px' }}>{item.icon}</span>
                    <div>
                      <div className="mono" style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '1px' }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: '14px', color: item.green ? 'var(--green)' : 'var(--white)', marginTop: '2px' }}>
                        {item.val}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div style={styles.socialCard}>
              <h3 style={styles.infoTitle} className="mono">{'// SOCIAL_LINKS'}</h3>
              <div style={styles.socials}>
                {socialLinks.map(s => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      ...styles.socialBtn,
                      borderColor: `${s.color}33`,
                      color: s.color,
                    }}
                  >
                    <span style={{ fontSize: '18px' }}>{s.icon}</span>
                    <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '11px', letterSpacing: '1px' }}>
                      {s.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Tech note */}
            <div style={styles.techCard}>
              <h3 style={styles.infoTitle} className="mono">{'// STATE_ARCHITECTURE'}</h3>
              <div style={styles.techItems}>
                {[
                  { lib: 'Zustand', use: 'Theme toggle state (global)', color: '#00f5ff' },
                  { lib: 'Context API', use: 'Form & notifications state', color: '#a855f7' },
                  { lib: 'useState', use: 'Local UI states (filters, etc)', color: '#10b981' },
                ].map(t => (
                  <div key={t.lib} style={styles.techItem}>
                    <span style={{ ...styles.techLib, color: t.color, borderColor: `${t.color}33` }} className="mono">
                      {t.lib}
                    </span>
                    <span style={styles.techUse}>{t.use}</span>
                  </div>
                ))}
              </div>
            </div>
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
  },
  orb: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)',
    top: '-100px',
    right: '100px',
    pointerEvents: 'none',
  },
  headerInner: {
    maxWidth: '1100px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
  },
  badge: {
    display: 'inline-block',
    background: 'rgba(200,149,108,0.08)',
    border: '1px solid rgba(200,149,108,0.3)',
    color: '#f59e0b',
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
    letterSpacing: '6px',
    color: 'var(--white)',
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
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 400px',
    gap: '40px',
    alignItems: 'start',
  },
  formCard: {
    border: '1px solid var(--border)',
    borderRadius: '4px',
    padding: '36px',
    background: 'rgba(0,245,255,0.02)',
    position: 'relative',
  },
  cornerTL: {
    position: 'absolute', top: 0, left: 0,
    width: '20px', height: '20px',
    borderTop: '2px solid var(--neon)',
    borderLeft: '2px solid var(--neon)',
  },
  cornerBR: {
    position: 'absolute', bottom: 0, right: 0,
    width: '20px', height: '20px',
    borderBottom: '2px solid var(--accent2)',
    borderRight: '2px solid var(--accent2)',
  },
  formPre: {
    color: 'var(--muted)',
    fontSize: '13px',
    letterSpacing: '1px',
    marginBottom: '8px',
  },
  formTitle: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '24px',
    fontWeight: 700,
    color: 'var(--white)',
    letterSpacing: '3px',
    marginBottom: '20px',
  },
  contextNote: {
    fontSize: '11px',
    color: 'var(--muted)',
    letterSpacing: '0.5px',
    padding: '10px 14px',
    border: '1px solid rgba(168,85,247,0.2)',
    borderRadius: '2px',
    marginBottom: '24px',
    lineHeight: 1.6,
    background: 'rgba(168,85,247,0.03)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  field: {},
  label: {
    display: 'block',
    fontSize: '11px',
    color: 'var(--accent2)',
    letterSpacing: '2px',
    marginBottom: '8px',
    fontWeight: 700,
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid var(--border)',
    borderRadius: '2px',
    color: 'var(--white)',
    fontSize: '14px',
    fontFamily: "'Exo 2', sans-serif",
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  submitBtn: {
    width: '100%',
    padding: '14px',
    background: 'transparent',
    border: '1px solid',
    borderRadius: '2px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    display: 'flex',
    justifyContent: 'center',
  },
  rightCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  infoCard: {
    border: '1px solid var(--border)',
    borderRadius: '4px',
    padding: '24px',
    background: 'rgba(255,255,255,0.02)',
  },
  infoTitle: {
    color: 'var(--accent2)',
    fontSize: '12px',
    letterSpacing: '1px',
    marginBottom: '16px',
  },
  infoList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '4px',
  },
  socialCard: {
    border: '1px solid var(--border)',
    borderRadius: '4px',
    padding: '24px',
    background: 'rgba(255,255,255,0.02)',
  },
  socials: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
  },
  socialBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 14px',
    border: '1px solid',
    borderRadius: '2px',
    background: 'transparent',
    transition: 'all 0.2s',
    cursor: 'pointer',
  },
  techCard: {
    border: '1px solid var(--border)',
    borderRadius: '4px',
    padding: '24px',
    background: 'rgba(255,255,255,0.02)',
  },
  techItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  techItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  techLib: {
    fontSize: '11px',
    fontWeight: 700,
    border: '1px solid',
    padding: '3px 10px',
    borderRadius: '2px',
    whiteSpace: 'nowrap',
    minWidth: '100px',
    textAlign: 'center',
  },
  techUse: {
    fontSize: '12px',
    color: 'var(--muted)',
    lineHeight: 1.4,
  },
}
