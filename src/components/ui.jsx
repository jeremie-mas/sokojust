import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Phone, Plus, X, Check } from 'lucide-react'
import { CONTACT, FAQ, waLink } from '../data'

/**
 * Logo SKJ redessiné en SVG d'après le logo officiel (maison + SKJ + bandeau « SO KO JUST »).
 * Couleur via `currentColor`. `full` ajoute le texte du bandeau (lisible seulement en grand).
 * À remplacer par le fichier vectoriel officiel dès qu'il est disponible.
 */
export function SkjLogo({ full = false, className = '', title }) {
  return (
    <svg className={className} viewBox="340 120 1240 900" role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true} fill="currentColor">
      <polygon points="352,470 604,149 640,199 427,472" />
      <polygon points="612,136 1139,136 1382,472 857,472" />
      <rect x="459" y="445" width="58" height="562" />
      <rect x="459" y="830" width="1106" height="177" />
      <text x="822" y="806" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="420" textLength="744" lengthAdjust="spacingAndGlyphs">SKJ</text>
      {full && (
        <text x="836" y="979" fill="#fff" fontFamily="'Archivo', Arial, sans-serif" fontWeight="800" fontSize="168" textLength="690" lengthAdjust="spacingAndGlyphs">SO KO JUST</text>
      )}
    </svg>
  )
}

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="SOKOJUST — accueil">
      <SkjLogo className="logo-mark" />
      <span className="logo-text">
        SOKOJUST
        <small>BTP · SANITAIRE · SOLAIRE</small>
      </span>
    </Link>
  )
}

export function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91A9.86 9.86 0 0 0 12.04 2Zm5.8 14.13c-.24.68-1.42 1.3-1.95 1.34-.5.05-.97.23-3.27-.68-2.77-1.09-4.52-3.92-4.66-4.1-.13-.18-1.11-1.48-1.11-2.83s.71-2 .96-2.28c.25-.27.54-.34.72-.34h.52c.17 0 .39-.06.6.46.24.56.8 1.93.87 2.07.07.14.11.3.02.48-.09.18-.14.3-.27.46-.14.16-.29.36-.41.48-.14.14-.28.29-.12.56.16.27.71 1.17 1.52 1.9 1.05.93 1.93 1.22 2.2 1.36.27.14.43.11.59-.07.16-.18.68-.79.86-1.06.18-.27.36-.23.6-.14.25.09 1.58.75 1.85.88.27.14.45.2.52.32.07.11.07.66-.17 1.33Z" />
    </svg>
  )
}

/** Fades elements in when they enter the viewport. */
export function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect() } },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref} className={`reveal ${shown ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  )
}

export function PageHero({ crumb, eyebrow, title, lead, image }) {
  return (
    <section className="page-hero on-dark">
      {image && <div className="page-hero-img"><img src={image} alt="" /></div>}
      <div className="wrap">
        <div className="crumbs"><Link to="/">Accueil</Link><span>/</span><span>{crumb}</span></div>
        <div style={{ marginTop: 28 }}><span className="eyebrow">{eyebrow}</span></div>
        <h1 className="display h1">{title}</h1>
        {lead && <p className="lead">{lead}</p>}
      </div>
    </section>
  )
}

export function CtaBand({ title = 'Parlons de votre projet, simplement.', text = "Un plan, une photo ou un simple appel : nous vous répondons vite avec un conseil clair et un devis adapté." }) {
  return (
    <section className="cta-band">
      <div className="wrap">
        <div>
          <h2 className="display h2">{title}</h2>
          <p>{text}</p>
        </div>
        <div className="cta-actions">
          <a className="cta-phone" href={`tel:${CONTACT.tel}`}><Phone /> {CONTACT.phone}</a>
          <Link to="/devis" className="btn btn-ink">Demander un devis <ArrowRight /></Link>
          <a className="btn btn-ghost" href={waLink('Bonjour SOKOJUST, je souhaite un renseignement.')} target="_blank" rel="noreferrer">
            <WhatsAppIcon /> Écrire sur WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

export function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="section">
      <div className="wrap faq-grid">
        <Reveal>
          <span className="eyebrow">Questions fréquentes</span>
          <h2 className="display h2" style={{ marginTop: 14 }}>Vous vous demandez&nbsp;?</h2>
          <p className="lead" style={{ marginTop: 20 }}>Et si votre question n'y est pas, le plus simple reste de nous appeler.</p>
        </Reveal>
        <Reveal delay={100}>
          {FAQ.map((f, i) => (
            <div key={f.q} className={`faq-item ${open === i ? 'open' : ''}`}>
              <button className="faq-q" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                {f.q}
                <span className="icon"><Plus size={18} /></span>
              </button>
              <div className="faq-a"><div><p>{f.a}</p></div></div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

export function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [project, onClose])
  if (!project) return null
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={project.title} onClick={(e) => e.stopPropagation()}>
        <img src={project.image} alt={project.alt} />
        <div className="modal-body">
          <span className="eyebrow">{project.tag}</span>
          <h3 className="display h3">{project.title}</h3>
          <p>{project.text}</p>
          <ul>{project.points.map((p) => <li key={p}><Check /> {p}</li>)}</ul>
          <Link to="/devis" className="btn btn-ink" onClick={onClose}>Un projet similaire&nbsp;? <ArrowRight /></Link>
        </div>
        <button className="modal-close" onClick={onClose} aria-label="Fermer"><X size={20} /></button>
      </div>
    </div>
  )
}
