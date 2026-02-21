import '../styles/globals.css'
import { useEffect } from 'react'
import { ContactProvider } from '../context/ContactContext'
import Layout from '../components/Layout'
import useThemeStore from '../store/themeStore'

function ThemeApplier() {
  const { theme } = useThemeStore()

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'neon') {
      root.style.setProperty('--bg', '#000d00')
      root.style.setProperty('--bg2', '#001a00')
      root.style.setProperty('--bg3', '#002600')
      root.style.setProperty('--neon', '#00ff41')
      root.style.setProperty('--neon2', '#00cc33')
      root.style.setProperty('--accent', '#00ff41')
      root.style.setProperty('--accent2', '#39ff14')
      root.style.setProperty('--border', 'rgba(0, 255, 65, 0.2)')
      root.style.setProperty('--glow', '0 0 20px rgba(0, 255, 65, 0.4)')
      root.style.setProperty('--white', '#ccffcc')
      root.style.setProperty('--muted', '#3a7a3a')
    } else {
      // Reset to default dark theme
      root.style.setProperty('--bg', '#030712')
      root.style.setProperty('--bg2', '#0a0f1e')
      root.style.setProperty('--bg3', '#0f172a')
      root.style.setProperty('--neon', '#00f5ff')
      root.style.setProperty('--neon2', '#7c3aed')
      root.style.setProperty('--accent', '#00f5ff')
      root.style.setProperty('--accent2', '#a855f7')
      root.style.setProperty('--border', 'rgba(0, 245, 255, 0.15)')
      root.style.setProperty('--glow', '0 0 20px rgba(0, 245, 255, 0.3)')
      root.style.setProperty('--white', '#e2e8f0')
      root.style.setProperty('--muted', '#475569')
    }
  }, [theme])

  return null
}

export default function App({ Component, pageProps }) {
  return (
    <ContactProvider>
      <ThemeApplier />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ContactProvider>
  )
}