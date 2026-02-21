import '../styles/globals.css'
import { ContactProvider } from '../context/ContactContext'
import Layout from '../components/Layout'

export default function App({ Component, pageProps }) {
  return (
    <ContactProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ContactProvider>
  )
}
