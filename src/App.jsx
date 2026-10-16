import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Services from './pages/Services'
import Realisations from './pages/Realisations'
import Simulateur from './pages/Simulateur'
import About from './pages/About'
import Contact from './pages/Contact'
import Devis from './pages/Devis'
import NotFound from './pages/NotFound'

const TITLES = {
  '/': 'SOKOJUST — Matériaux, sanitaire & solaire à Lomé',
  '/services': 'Nos métiers — BTP, sanitaire & solaire | SOKOJUST',
  '/realisations': 'Réalisations | SOKOJUST',
  '/simulateur': 'Simulateur solaire | SOKOJUST',
  '/a-propos': 'À propos | SOKOJUST',
  '/contact': 'Contact | SOKOJUST',
  '/devis': 'Demander un devis | SOKOJUST',
}

export default function App() {
  const { pathname } = useLocation()
  useEffect(() => { document.title = TITLES[pathname] ?? 'Page introuvable | SOKOJUST' }, [pathname])

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="realisations" element={<Realisations />} />
        <Route path="projets" element={<Realisations />} />
        <Route path="simulateur" element={<Simulateur />} />
        <Route path="a-propos" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="devis" element={<Devis />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
