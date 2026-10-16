import { useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, HardHat, Droplets, Sun, MessagesSquare, Phone } from 'lucide-react'
import { CONTACT, waLink } from '../data'
import { PageHero, WhatsAppIcon } from '../components/ui'

const METIER_CHOICES = [
  { id: 'btp', icon: HardHat, label: 'BTP & matériaux', sub: 'Ciment, acier, briques, outillage…' },
  { id: 'sanitaire', icon: Droplets, label: 'Sanitaire & plomberie', sub: 'Salle de bain, cuisine, réseau…' },
  { id: 'solaire', icon: Sun, label: 'Énergie solaire', sub: 'Panneaux, batteries, onduleurs…' },
  { id: 'conseil', icon: MessagesSquare, label: 'Conseil technique', sub: "Besoin d'un avis avant d'acheter" },
]
const TYPES = ['Construction neuve', 'Rénovation', 'Extension', 'Entretien / dépannage']
const DELAIS = ['Urgent', 'Sous 1 mois', '1 à 3 mois', 'Je me renseigne']
const STEPS = ['Métier', 'Projet', 'Coordonnées', 'Envoi']

export default function Devis() {
  const [params] = useSearchParams()
  const { state } = useLocation()
  const initial = METIER_CHOICES.some((m) => m.id === params.get('metier')) ? params.get('metier') : ''

  const [step, setStep] = useState(initial ? 1 : 0)
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState({})
  const [f, setF] = useState({
    metier: initial, type: '', delai: '', lieu: '',
    details: state?.details ?? '', nom: '', tel: '', email: '',
  })
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }))
  const metierLabel = METIER_CHOICES.find((m) => m.id === f.metier)?.label ?? '—'

  const validate = () => {
    const e = {}
    if (step === 0 && !f.metier) e.metier = 'Choisissez un métier.'
    if (step === 1 && f.details.trim().length < 10) e.details = 'Décrivez votre besoin en quelques mots (10 caractères min.).'
    if (step === 2) {
      if (!f.nom.trim()) e.nom = 'Votre nom est requis.'
      if (!/^[+\d][\d\s.-]{7,}$/.test(f.tel.trim())) e.tel = 'Numéro de téléphone invalide.'
      if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Adresse e-mail invalide.'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }
  const next = () => validate() && setStep((s) => s + 1)
  const prev = () => { setErrors({}); setStep((s) => s - 1) }

  const message = [
    'Bonjour SOKOJUST, je souhaite un devis.',
    `• Métier : ${metierLabel}`,
    f.type && `• Projet : ${f.type}`,
    f.delai && `• Délai : ${f.delai}`,
    f.lieu && `• Lieu : ${f.lieu}`,
    `• Détails : ${f.details}`,
    `• Nom : ${f.nom}`,
    `• Téléphone : ${f.tel}`,
    f.email && `• E-mail : ${f.email}`,
  ].filter(Boolean).join('\n')

  return (
    <>
      <PageHero
        crumb="Devis"
        eyebrow="Devis gratuit · sans engagement"
        title="Votre devis en 4 étapes"
        lead="Quelques questions, et votre demande nous parvient directement sur WhatsApp. Réponse rapide, du lundi au samedi."
      />

      <section className="section">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <div className="form-card">
            <div className="progress" aria-label={`Étape ${step + 1} sur ${STEPS.length}`}>
              {STEPS.map((s, i) => (
                <div key={s} className={`progress-step ${i < step ? 'done' : ''} ${i === step ? 'cur' : ''}`}>
                  <div className="progress-bar"><i /></div><span>{i + 1}. {s}</span>
                </div>
              ))}
            </div>

            {sent ? (
              <div className="success">
                <div className="ico"><Check /></div>
                <h2 className="form-title">Merci {f.nom.split(' ')[0]} !</h2>
                <p className="form-sub">Votre demande a été préparée dans WhatsApp. Pensez à appuyer sur « Envoyer ». Nous revenons vers vous très vite.</p>
                <a href={`tel:${CONTACT.tel}`} className="btn btn-ghost"><Phone /> Ou appelez-nous : {CONTACT.phone}</a>
              </div>
            ) : (
              <>
                {step === 0 && (
                  <>
                    <h2 className="form-title">Quel est votre besoin&nbsp;?</h2>
                    <p className="form-sub">Choisissez le métier concerné.</p>
                    <div className="choice-grid" role="radiogroup">
                      {METIER_CHOICES.map(({ id, icon: Icon, label, sub }) => (
                        <button key={id} role="radio" aria-checked={f.metier === id} className={`choice ${f.metier === id ? 'on' : ''}`} onClick={() => set('metier', id)}>
                          <Icon /><b>{label}</b><small>{sub}</small>
                        </button>
                      ))}
                    </div>
                    {errors.metier && <p className="field"><span className="err">{errors.metier}</span></p>}
                  </>
                )}

                {step === 1 && (
                  <>
                    <h2 className="form-title">Parlez-nous du projet</h2>
                    <p className="form-sub">{metierLabel} — plus c'est précis, plus le devis sera juste.</p>
                    <div className="fields">
                      <div className="field full">
                        <label>Type de projet</label>
                        <div className="pills">{TYPES.map((t) => <button key={t} type="button" className={`pill ${f.type === t ? 'on' : ''}`} onClick={() => set('type', t)}>{t}</button>)}</div>
                      </div>
                      <div className="field full">
                        <label>Délai</label>
                        <div className="pills">{DELAIS.map((t) => <button key={t} type="button" className={`pill ${f.delai === t ? 'on' : ''}`} onClick={() => set('delai', t)}>{t}</button>)}</div>
                      </div>
                      <div className="field full">
                        <label htmlFor="lieu">Quartier / lieu de livraison</label>
                        <input id="lieu" value={f.lieu} onChange={(e) => set('lieu', e.target.value)} placeholder="Ex. Agoè, Baguida, Adidogomé…" />
                      </div>
                      <div className="field full">
                        <label htmlFor="details">Votre besoin <i>*</i></label>
                        <textarea id="details" maxLength={1000} value={f.details} onChange={(e) => set('details', e.target.value)} placeholder="Ex. 80 sacs de ciment CPJ 45, 1 tonne d'acier HA10 pour une dalle de 120 m²…" />
                        <span className="hint">{f.details.length}/1000</span>
                        {errors.details && <span className="err">{errors.details}</span>}
                      </div>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h2 className="form-title">Comment vous joindre&nbsp;?</h2>
                    <p className="form-sub">Nous ne partageons jamais vos coordonnées.</p>
                    <div className="fields">
                      <div className="field full">
                        <label htmlFor="nom">Nom complet <i>*</i></label>
                        <input id="nom" autoComplete="name" value={f.nom} onChange={(e) => set('nom', e.target.value)} />
                        {errors.nom && <span className="err">{errors.nom}</span>}
                      </div>
                      <div className="field">
                        <label htmlFor="tel">Téléphone / WhatsApp <i>*</i></label>
                        <input id="tel" type="tel" autoComplete="tel" inputMode="tel" value={f.tel} onChange={(e) => set('tel', e.target.value)} placeholder="+228 …" />
                        {errors.tel && <span className="err">{errors.tel}</span>}
                      </div>
                      <div className="field">
                        <label htmlFor="email">E-mail</label>
                        <input id="email" type="email" autoComplete="email" value={f.email} onChange={(e) => set('email', e.target.value)} />
                        {errors.email && <span className="err">{errors.email}</span>}
                      </div>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <h2 className="form-title">Tout est bon&nbsp;?</h2>
                    <p className="form-sub">Vérifiez votre demande avant de l'envoyer.</p>
                    <div className="summary">
                      <div><span>Métier</span><b>{metierLabel}</b></div>
                      {f.type && <div><span>Projet</span><b>{f.type}</b></div>}
                      {f.delai && <div><span>Délai</span><b>{f.delai}</b></div>}
                      {f.lieu && <div><span>Lieu</span><b>{f.lieu}</b></div>}
                      <div><span>Contact</span><b>{f.nom} · {f.tel}</b></div>
                      <div style={{ display: 'block' }}><span>Détails</span><p style={{ margin: '6px 0 0', whiteSpace: 'pre-line' }}>{f.details}</p></div>
                    </div>
                  </>
                )}

                <div className="form-nav">
                  {step > 0 ? <button className="btn btn-ghost" onClick={prev}><ArrowLeft /> Retour</button> : <span />}
                  {step < 3 ? (
                    <button className="btn btn-ink" onClick={next}>Continuer <ArrowRight /></button>
                  ) : (
                    <a className="btn btn-wa" href={waLink(message)} target="_blank" rel="noreferrer" onClick={() => setSent(true)}>
                      <WhatsAppIcon /> Envoyer sur WhatsApp
                    </a>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
