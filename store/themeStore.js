import { create } from 'zustand'

const useThemeStore = create((set, get) => ({
  theme: 'dark', // 'dark' | 'neon'
  activeSection: 'home',

  setTheme: (theme) => set({ theme }),
  toggleTheme: () => set({ theme: get().theme === 'dark' ? 'neon' : 'dark' }),
  setActiveSection: (section) => set({ activeSection: section }),
}))

export default useThemeStore
