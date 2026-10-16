import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Ear, Lightbulb, Truck, ShieldCheck, Calculator } from 'lucide-react'
import { CONTACT, ETAPES, METIERS, PROJETS } from '../data'
import { CtaBand, Faq, ProjectModal, Reveal } from '../components/ui'

const MARQUEE = ['Ciment', 'Acier à béton', 'Carrelage', 'Robinetterie', 'Plomberie PPR', 'Panneaux solaires', 'Batteries lithium', 'Onduleurs', 'Outillage pro', 'Chauffe-eau']

export default function Home() {
  const [project, setProject] = useState(null)

  return (
    <>
      {/* HERO */}
      <section className="hero on-dark">
        <div className="hero-bg"><img src="/images/hero.jpg" alt="" /></div>
        <div className="wrap">
          <span className="eyebrow">L'audace de bâtir l'avenir · Lomé</span>
          <h1 className="display h1" style={{ marginTop: 20 }}>
            On fournit. On conseille. <span className="hl-sun">Vous bâtissez.</span>
          </h1>
          <p className="lead">
            Matériaux de construction, sanitaire et énergie solaire : un seul interlocuteur, du devis à la livraison sur votre chantier.
          </p>
          <div className="hero-actions">
            <Link to="/devis" className="btn btn-sun">Demander un devis gratuit <ArrowRight /></Link>
            <a href={`tel:${CONTACT.tel}`} className="btn btn-ghost">Appeler {CONTACT.phone}</a>
          </div>

          <nav className="hero-strip" aria-label="Nos métiers">
            {METIERS.map((m) => (
              <Link key={m.id} to={`/services#${m.id}`}>
                <div><b>{m.short}</b><small>{m.items[0]}…</small></div>
                <ArrowUpRight />
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((w, i) => <span key={i}>{w}</span>)}
        </div>
      </div>

      {/* INTRO */}
      <section className="section">
        <div className="wrap intro-grid">
          <Reveal className="intro-img">
            <img src="/images/team.jpg" alt="Conseiller SOKOJUST dans l'entrepôt de matériaux" />
            <div className="intro-badge"><b>15+</b><span>années à accompagner les bâtisseurs de Lomé</span></div>
          </Reveal>
          <Reveal delay={120}>
            <span className="eyebrow">Plus qu'un distributeur</span>
            <h2 className="display h2" style={{ marginTop: 14 }}>Un partenaire de <span className="hl">proximité</span></h2>
            <blockquote className="quote">
              « Nous travaillons ensemble pour essayer de vous faciliter la vie au quotidien. »
              <cite>— L'équipe SOKOJUST</cite>
            </blockquote>
            <div className="pillars">
              <div className="pillar"><Ear /><b>Proximité</b><p>Une équipe joignable et présente à Wetrivi Kondji.</p></div>
              <div className="pillar"><Lightbulb /><b>Conseil</b><p>Le bon produit au bon prix, expliqué simplement.</p></div>
              <div className="pillar"><Truck /><b>Service</b><p>Un accompagnement du devis à la livraison.</p></div>
              <div className="pillar"><ShieldCheck /><b>Qualité</b><p>Des marques fiables, choisies pour notre climat.</p></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MÉTIERS */}
      <section className="section bg-paper-2">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow">Nos métiers</span>
              <h2 className="display h2">Trois expertises, un seul interlocuteur</h2>
            </div>
            <Link to="/services" className="link-arrow">Tous nos services <ArrowRight /></Link>
          </Reveal>
          <div className="metiers">
            {METIERS.map((m, i) => (
              <Reveal key={m.id} delay={i * 100}>
                <Link to={`/services#${m.id}`} className="metier-card">
                  <img src={m.image} alt={m.alt} />
                  <span className="metier-num">{m.num}</span>
                  <div className="metier-body">
                    <h3 className="display h3">{m.short}</h3>
                    <p>{m.pitch}</p>
                    <span className="link-arrow">Découvrir <ArrowRight /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MÉTHODE */}
      <section className="section on-dark">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow">Notre façon de travailler</span>
              <h2 className="display h2">Simple, du premier appel à la <span className="hl-sun">livraison</span></h2>
            </div>
            <p>Pas de jargon, pas d'intermédiaires : vous parlez directement à ceux qui préparent votre commande.</p>
          </Reveal>
          <div className="steps">
            {ETAPES.map((e, i) => (
              <Reveal key={e.n} className="step" delay={i * 90}>
                <div className="step-n">{e.n}</div>
                <h3>{e.t}</h3>
                <p>{e.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SIMULATEUR */}
      <section className="section">
        <div className="wrap">
          <Reveal className="sim-teaser">
            <div className="sim-teaser-img"><img src="/images/solar.jpg" alt="Panneaux solaires sur un toit" /></div>
            <div className="sim-teaser-body on-dark">
              <span className="eyebrow">Nouveau · Outil gratuit</span>
              <h2 className="display h2">De combien de panneaux avez-vous besoin&nbsp;?</h2>
              <p>Listez vos appareils, notre simulateur estime en 1 minute la puissance, le stockage et l'onduleur adaptés. Ensuite, on affine ensemble.</p>
              <div><Link to="/simulateur" className="btn btn-sun"><Calculator /> Lancer le simulateur</Link></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* RÉALISATIONS */}
      <section className="section bg-paper-2">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow">Réalisations</span>
              <h2 className="display h2">Sur le terrain avec nos clients</h2>
            </div>
            <Link to="/realisations" className="link-arrow">Voir toutes les réalisations <ArrowRight /></Link>
          </Reveal>
          <div className="projects">
            {PROJETS.slice(0, 2).map((p, i) => (
              <Reveal key={p.id} delay={i * 100}>
                <button className="project" onClick={() => setProject(p)}>
                  <div className="project-img">
                    <img src={p.image} alt={p.alt} />
                    <span className="project-tag">{p.tag}</span>
                    <span className="project-open"><ArrowUpRight /></span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Faq />
      <CtaBand />
      <ProjectModal project={project} onClose={() => setProject(null)} />
    </>
  )
}
