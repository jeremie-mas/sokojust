import { ETAPES, HISTOIRE, VALEURS } from '../data'
import { CtaBand, PageHero, Reveal } from '../components/ui'

export default function About() {
  return (
    <>
      <PageHero
        crumb="À propos"
        eyebrow="Qui nous sommes"
        title="Petite équipe, grands chantiers"
        lead="Une équipe basée à Lomé qui fournit et conseille celles et ceux qui construisent : maçons, plombiers, artisans, entrepreneurs et familles."
        image="/images/team.jpg"
      />

      <section className="section">
        <div className="wrap about-split">
          <Reveal><img src="/images/team.jpg" alt="Équipe SOKOJUST accueillant un client" /></Reveal>
          <Reveal delay={100}>
            <span className="eyebrow">Notre taille est un choix</span>
            <h2 className="display h2" style={{ margin: '14px 0 20px' }}>On se souvient de <span className="hl">votre chantier</span></h2>
            <p>Être une équipe réduite nous permet de connaître nos clients, de nous souvenir de leur chantier d'une visite à l'autre et de décider vite quand il faut dépanner une livraison ou trouver une alternative à un produit indisponible.</p>
            <blockquote className="quote">
              « Nous travaillons ensemble pour essayer de vous faciliter la vie au quotidien. »
              <cite>— La phrase qui résume chaque matin chez SOKOJUST</cite>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="section on-dark">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow">Notre histoire</span>
              <h2 className="display h2">Construite étape par étape</h2>
            </div>
            <p>Comme les chantiers qu'elle accompagne : en écoutant ce dont les clients avaient réellement besoin.</p>
          </Reveal>
          <div className="timeline">
            {HISTOIRE.map((h, i) => (
              <Reveal key={h.t} className="tl-item" delay={i * 100}>
                <small>{h.k}</small>
                <h3>{h.t}</h3>
                <p>{h.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow">Nos valeurs</span>
              <h2 className="display h2">Quatre principes simples</h2>
            </div>
            <p>Ils guident chaque conseil et chaque livraison.</p>
          </Reveal>
          <div className="values">
            {VALEURS.map((v, i) => (
              <Reveal key={v.t} className="value" delay={(i % 2) * 100}>
                <div className="value-n">0{i + 1}</div>
                <h3>{v.t}</h3>
                <p>{v.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm bg-paper-2">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow">Méthode</span>
              <h2 className="display h2">Comment on travaille</h2>
            </div>
          </Reveal>
          <div className="steps light">
            {ETAPES.map((e) => (
              <div key={e.n} className="step"><div className="step-n">{e.n}</div><h3>{e.t}</h3><p>{e.d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
