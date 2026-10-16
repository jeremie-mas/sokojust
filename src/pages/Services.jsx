import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, HardHat, Droplets, Sun } from 'lucide-react'
import { METIERS } from '../data'
import { CtaBand, PageHero, Reveal } from '../components/ui'

const ICONS = { btp: HardHat, sanitaire: Droplets, solaire: Sun }

export default function Services() {
  const [active, setActive] = useState(METIERS[0].id)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    METIERS.forEach((m) => { const el = document.getElementById(m.id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])

  return (
    <>
      <PageHero
        crumb="Nos métiers"
        eyebrow="Nos métiers"
        title="Trois expertises pour vos chantiers"
        lead="BTP, sanitaire et solaire : des produits choisis pour durer, des conseils pour bien les choisir, et des livraisons calées sur votre chantier."
        image="/images/btp.jpg"
      />

      <div className="tabs-sticky">
        <div className="wrap">
          <nav className="tabs" aria-label="Métiers">
            {METIERS.map((m) => {
              const Icon = ICONS[m.id]
              return (
                <a key={m.id} href={`#${m.id}`} className={active === m.id ? 'on' : ''}>
                  <Icon size={18} /> <b>{m.num}</b> {m.short}
                </a>
              )
            })}
          </nav>
        </div>
      </div>

      <div>
        {METIERS.map((m, idx) => (
          <section key={m.id} id={m.id} className={`section service ${idx % 2 ? 'bg-paper-2' : ''}`}>
            <div className="wrap service-grid">
              <Reveal className="service-media"><img src={m.image} alt={m.alt} /></Reveal>
              <Reveal delay={100}>
                <div className="service-num">{m.num}</div>
                <h2 className="display h2">{m.title}</h2>
                <p className="lead">{m.lead}</p>
                {m.body.map((b) => <p key={b}>{b}</p>)}
                <ul className="checklist">
                  {m.items.map((it) => <li key={it}><Check /> {it}</li>)}
                </ul>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <Link to={`/devis?metier=${m.id}`} className="btn btn-ink">Devis {m.short} <ArrowRight /></Link>
                  {m.id === 'solaire' && <Link to="/simulateur" className="btn btn-ghost">Simuler mon installation</Link>}
                </div>
              </Reveal>
            </div>
          </section>
        ))}
      </div>

      <CtaBand title="Un doute sur un produit ?" text="Décrivez-nous votre besoin, on vous oriente vers la solution juste — pas forcément la plus chère." />
    </>
  )
}
