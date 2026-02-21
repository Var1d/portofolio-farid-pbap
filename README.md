# 🎮 Portfolio — Farid Dhiya Fairuz

Portofolio personal seorang VR Game Developer(Aamiin), dibangun dengan **Next.js** dan mengimplementasikan tiga teknik rendering modern.

> **Tugas 1 Individu** — Pengembangan Aplikasi Berbasis Platform  
> Topik: Implementasi Teknik Pengembangan pada Platform Web

---

## Cara Menjalankan

```bash
unzip portofolio-farid-pbap.zip
cd portofolio-farid-pbap
npm install
npm run dev

```

---

## Teknik Rendering

| Halaman    | Teknik       | Alasan                                                                       |
|------------|--------------|------------------------------------------------------------------------------|
| `/` (Home) | **SSG + ISR**| Profile & skills statis, di-pre-render saat build. ISR revalidate setiap jam |
| `/projects`| **CSR**      | GitHub repos di-fetch live di browser. Filter/sort interaktif                |
| `/blog`    | **SSR**      | Artikel Dev.to selalu fresh. Fetch ulang setiap request                      |
| `/contact` | **CSR**      | Form interaktif, state dikelola Context API                                  |

### SSG — `pages/index.js`
```js
export async function getStaticProps() {
  const res = await fetch('https://api.github.com/users/Var1d')
  return { props: { github: await res.json() }, revalidate: 3600 }
}
```

### SSR — `pages/blog.js`
```js
export async function getServerSideProps() {
  const res = await fetch('https://dev.to/api/articles?tag=gamedev')
  return { props: { articles: await res.json(), fetchedAt: new Date().toISOString() } }
}
```

### CSR — `pages/projects.js`
```js
useEffect(() => {
  fetch('https://api.github.com/users/Var1d/repos')
    .then(r => r.json())
    .then(setRepos)
}, [])
```

---

## State Management

### Zustand — Theme Store
**File:** `store/themeStore.js`
- Global theme state (dark / neon mode)
- Toggle button di Navbar
- Persists across halaman tanpa prop drilling

### React Context API — Contact Form
**File:** `context/ContactContext.js`
- Form state global (name, email, message)
- Status pengiriman (idle / sending / success / error)
- Notification system
- **Bukti CSR**: ketik di form, pindah halaman, kembali → data tetap ada

### Local State (`useState`)
- Filter kategori project
- Search query
- Sort order
- Active tag (blog)
- Mobile menu toggle

---

## Fitur Tambahan

| Fitur | Detail |
|-------|--------|
| **ISR** | SSG homepage revalidate setiap 1 jam |
| **Memoization** | `useMemo` untuk filter/sort projects |
| **AbortController** | Cleanup fetch request saat unmount |
| **Error Handling** | Fallback data jika API gagal, error state dengan pesan |
| **Loading State** | Animasi loading text untuk CSR |
| **Responsive** | Grid auto-fill, clamp font size |
| **Lazy Loading** | `loading="lazy"` pada semua gambar |
| **Animasi CSS** | fadeUp, float, blink, pulse-neon, scanline |
| **Scanline overlay** | Fixed texture overlay untuk estetik VR/HUD |
| **Notification toast** | Context-based global notification system |
| **Timestamp SSR** | Blog page menampilkan waktu render server |

---

## API Publik

| API | Digunakan di | Teknik |
|-----|-------------|--------|
| [GitHub API](https://api.github.com) | Homepage (profile + stats), Projects (repos) | SSG + CSR |
| [Dev.to API](https://dev.to/api) | Blog (artikel gamedev) | SSR |

---

## Struktur

```
portfolio-farid/
├── pages/
│   ├── _app.js         # Root + providers
│   ├── index.js        # Homepage (SSG + ISR)
│   ├── projects.js     # Projects (CSR)
│   ├── blog.js         # Blog (SSR)
│   ├── contact.js      # Contact (CSR + Context)
│   └── 404.js
├── components/
│   ├── Layout.js
│   ├── Navbar.js
│   └── Notifications.js
├── context/
│   └── ContactContext.js   # React Context API
├── store/
│   └── themeStore.js       # Zustand
└── styles/
    └── globals.css
```