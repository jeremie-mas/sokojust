import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { METIERS, PROJETS } from '../data'
import { CtaBand, PageHero, ProjectModal, Reveal } from '../components/ui'

const FILTERS = [{ id: 'all', label: 'Tout' }, ...METIERS.map((m) => ({ id: m.id, label: m.short }))]

export default function Realisations() {
  const [filter, setFilter] = useState('all')
  const [project, setProject] = useState(null)
  const list = filter === 'all' ? PROJETS : PROJETS.filter((p) => p.cat === filter)

  return (
    <>
      <PageHero
        crumb="Réalisations"
        eyebrow="Réalisations"
        title="Des chantiers, des solutions"
        lead="Quelques exemples de notre façon d'accompagner nos clients, du gros œuvre à l'énergie solaire."
        image="/images/project-villa.jpg"
      />

      <section className="section">
        <div className="wrap">
          <div className="filters" role="group" aria-label="Filtrer par métier">
            {FILTERS.map((f) => (
              <button key={f.id} className={`chip ${filter === f.id ? 'on' : ''}`} aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
                {f.label}
              </button>
            ))}
          </div>
          <div className="projects">
            {list.map((p, i) => (
              <Reveal key={p.id} delay={(i % 2) * 100}>
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
          <p style={{ marginTop: 48, color: 'var(--muted)', maxWidth: '60ch' }}>
            Vous avez réalisé un chantier avec SOKOJUST&nbsp;? Envoyez-nous vos photos : nous les publierons ici avec plaisir.
          </p>
        </div>
      </section>

      <CtaBand title="Votre chantier est le prochain ?" />
      <ProjectModal project={project} onClose={() => setProject(null)} />
    </>
  )
}
