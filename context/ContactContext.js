import { createContext, useContext, useState, useCallback } from 'react'

const ContactContext = createContext(null)

export function ContactProvider({ children }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [notifications, setNotifications] = useState([])

  const updateField = useCallback((field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }, [])

  const addNotification = useCallback((msg, type = 'info') => {
    const id = Date.now()
    setNotifications(prev => [...prev, { id, msg, type }])
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, 4000)
  }, [])

  const submitForm = useCallback(async () => {
    if (!form.name || !form.email || !form.message) {
      addNotification('Semua field wajib diisi!', 'error')
      return
    }
    setStatus('sending')
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500))
    setStatus('success')
    setForm({ name: '', email: '', message: '' })
    addNotification('Pesan berhasil dikirim! 🚀', 'success')
    setTimeout(() => setStatus('idle'), 3000)
  }, [form, addNotification])

  return (
    <ContactContext.Provider value={{ form, updateField, status, submitForm, notifications, addNotification }}>
      {children}
    </ContactContext.Provider>
  )
}

export const useContact = () => {
  const ctx = useContext(ContactContext)
  if (!ctx) throw new Error('useContact must be used within ContactProvider')
  return ctx
}
