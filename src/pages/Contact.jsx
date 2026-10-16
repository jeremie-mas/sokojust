import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, MapPin, Phone, Navigation, ArrowRight } from 'lucide-react'
import { CONTACT, waLink } from '../data'
import { Faq, PageHero, WhatsAppIcon } from '../components/ui'

const SUJETS = ['Devis BTP & matériaux', 'Sanitaire & plomberie', 'Énergie solaire', 'Conseil technique', 'Autre demande']

export default function Contact() {
  const [f, setF] = useState({ nom: '', tel: '', sujet: '', message: '' })
  const [errors, setErrors] = useState({})
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }))

  const submit = (e) => {
    e.preventDefault()
    const err = {}
    if (!f.nom.trim()) err.nom = 'Votre nom est requis.'
    if (!f.sujet) err.sujet = 'Choisissez un sujet.'
    if (f.message.trim().length < 10) err.message = 'Votre message est trop court.'
    setErrors(err)
    if (Object.keys(err).length) return
    const text = `Bonjour SOKOJUST,\n${f.message}\n\n— ${f.nom}${f.tel ? ` (${f.tel})` : ''}\nSujet : ${f.sujet}`
    window.open(waLink(text), '_blank', 'noopener')
  }

  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Contact"
        title="Passez, appelez ou écrivez-nous"
        lead="Nous sommes là pour vous faciliter la vie au quotidien. Réponse rapide du lundi au samedi."
      />

      <section className="section">
        <div className="wrap contact-grid">
          <aside className="info-card">
            <div className="info-row">
              <span className="ico"><Phone /></span>
              <div><small>Téléphone</small><a href={`tel:${CONTACT.tel}`}><b>{CONTACT.phone}</b></a></div>
            </div>
            <div className="info-row">
              <span className="ico"><Clock /></span>
              <div><small>Horaires</small><b>{CONTACT.hours}</b><p>Fermé le dimanche</p></div>
            </div>
            <div className="info-row">
              <span className="ico"><MapPin /></span>
              <div><small>Adresse</small><b>{CONTACT.address[0]}</b><p>{CONTACT.address[1]}<br />{CONTACT.address[2]}</p></div>
            </div>
            <div style={{ display: 'grid', gap: 10 }}>
              <a className="btn btn-wa btn-block" href={waLink('Bonjour SOKOJUST !')} target="_blank" rel="noreferrer"><WhatsAppIcon /> WhatsApp</a>
              <a className="btn btn-ghost btn-block" href={CONTACT.maps} target="_blank" rel="noreferrer"><Navigation /> Itinéraire</a>
            </div>
          </aside>

          <form className="form-card" onSubmit={submit} noValidate>
            <h2 className="form-title">Envoyez-nous un message</h2>
            <p className="form-sub">
              Pour un chiffrage détaillé, utilisez plutôt notre <Link to="/devis" style={{ fontWeight: 700, borderBottom: '2px solid var(--sun)' }}>formulaire de devis</Link>.
            </p>
            <div className="fields">
              <div className="field">
                <label htmlFor="c-nom">Nom complet <i>*</i></label>
                <input id="c-nom" autoComplete="name" value={f.nom} onChange={(e) => set('nom', e.target.value)} />
                {errors.nom && <span className="err">{errors.nom}</span>}
              </div>
              <div className="field">
                <label htmlFor="c-tel">Téléphone</label>
                <input id="c-tel" type="tel" autoComplete="tel" value={f.tel} onChange={(e) => set('tel', e.target.value)} placeholder="+228 …" />
              </div>
              <div className="field full">
                <label htmlFor="c-sujet">Sujet <i>*</i></label>
                <select id="c-sujet" value={f.sujet} onChange={(e) => set('sujet', e.target.value)}>
                  <option value="">Choisissez un sujet</option>
                  {SUJETS.map((s) => <option key={s}>{s}</option>)}
                </select>
                {errors.sujet && <span className="err">{errors.sujet}</span>}
              </div>
              <div className="field full">
                <label htmlFor="c-msg">Message <i>*</i></label>
                <textarea id="c-msg" maxLength={1000} value={f.message} onChange={(e) => set('message', e.target.value)} />
                <span className="hint">{f.message.length}/1000</span>
                {errors.message && <span className="err">{errors.message}</span>}
              </div>
            </div>
            <div className="form-nav">
              <span />
              <button type="submit" className="btn btn-ink">Envoyer via WhatsApp <ArrowRight /></button>
            </div>
          </form>
        </div>
      </section>

      <div className="bg-paper-2"><Faq /></div>
    </>
  )
}
