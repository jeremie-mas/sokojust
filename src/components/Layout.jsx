import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Clock, MapPin, Menu, Phone, X, ArrowRight, Facebook, Instagram, Linkedin } from 'lucide-react'
import { CONTACT, METIERS, waLink } from '../data'
import { Logo, WhatsAppIcon } from './ui'

const LINKS = [
  { to: '/services', label: 'Nos métiers' },
  { to: '/realisations', label: 'Réalisations' },
  { to: '/simulateur', label: 'Simulateur solaire' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/contact', label: 'Contact' },
]

function Topbar() {
  return (
    <div className="topbar">
      <div className="wrap">
        <span className="tb-hide"><MapPin /> {CONTACT.address[0]} — {CONTACT.address[1]}</span>
        <span><Clock /> {CONTACT.hours} · <a href={`tel:${CONTACT.tel}`}>{CONTACT.phone}</a></span>
      </div>
    </div>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <header className="header">
        <div className="wrap">
          <Logo />
          <nav className="nav" aria-label="Navigation principale">
            {LINKS.map((l) => <NavLink key={l.to} to={l.to}>{l.label}</NavLink>)}
          </nav>
          <div className="header-cta">
            <Link to="/devis" className="btn btn-sun btn-sm">Devis gratuit <ArrowRight /></Link>
            <button className="burger" aria-label="Ouvrir le menu" onClick={() => setOpen(true)}><Menu /></button>
          </div>
        </div>
      </header>

      <div className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="drawer-top">
          <Logo dark />
          <button aria-label="Fermer le menu" onClick={() => setOpen(false)}><X size={30} /></button>
        </div>
        <nav>
          <NavLink to="/" end>Accueil</NavLink>
          {LINKS.map((l) => <NavLink key={l.to} to={l.to}>{l.label}</NavLink>)}
        </nav>
        <div className="drawer-foot">
          <Link to="/devis" className="btn btn-sun btn-block">Demander un devis <ArrowRight /></Link>
          <a href={`tel:${CONTACT.tel}`} className="btn btn-ghost btn-block"><Phone /> {CONTACT.phone}</a>
        </div>
      </div>
    </>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Logo />
            <p style={{ marginTop: 20, maxWidth: '34ch' }}>
              Votre distributeur de confiance pour le BTP, le sanitaire et le solaire au Togo. Facilitateur de projets au quotidien.
            </p>
            <div className="socials" style={{ marginTop: 20 }}>
              <a href="#" aria-label="Facebook"><Facebook /></a>
              <a href="#" aria-label="Instagram"><Instagram /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin /></a>
            </div>
          </div>
          <div>
            <h4>Métiers</h4>
            <ul>{METIERS.map((m) => <li key={m.id}><Link to={`/services#${m.id}`}>{m.short}</Link></li>)}</ul>
          </div>
          <div>
            <h4>Navigation</h4>
            <ul>
              {LINKS.map((l) => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}
              <li><Link to="/devis">Demander un devis</Link></li>
            </ul>
          </div>
          <div>
            <h4>Nous trouver</h4>
            <ul>
              <li><a href={CONTACT.maps} target="_blank" rel="noreferrer">{CONTACT.address.join(', ')}</a></li>
              <li><a href={`tel:${CONTACT.tel}`}>{CONTACT.phone}</a></li>
              <li>{CONTACT.hours}</li>
            </ul>
          </div>
        </div>
        <div className="footer-big" aria-hidden="true">SOKOJUST</div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} SOKOJUST. Tous droits réservés.</span>
          <span>L'audace de bâtir l'avenir.</span>
        </div>
      </div>
    </footer>
  )
}

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) { setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 60); return }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

export default function Layout() {
  return (
    <>
      <ScrollManager />
      <Topbar />
      <Header />
      <main><Outlet /></main>
      <Footer />
      <a className="fab" href={waLink('Bonjour SOKOJUST, je souhaite un renseignement.')} target="_blank" rel="noreferrer" aria-label="Écrire sur WhatsApp">
        <WhatsAppIcon /> <span>WhatsApp</span>
      </a>
    </>
  )
}
