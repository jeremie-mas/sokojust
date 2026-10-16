import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus, Sun, BatteryCharging, Cpu, Zap, ArrowRight } from 'lucide-react'
import { APPAREILS, waLink } from '../data'
import { PageHero, WhatsAppIcon } from '../components/ui'

// Hypothèses de dimensionnement (Lomé)
const SUN_HOURS = 4.5        // heures d'ensoleillement équivalent plein soleil / jour
const LOSSES = 1.3           // pertes câbles, onduleur, température, poussière
const PANEL_WC = 450         // panneau monocristallin standard
const DOD = 0.9              // profondeur de décharge batterie lithium
const INVERTERS = [1000, 1500, 2000, 3000, 3500, 5000, 8000, 10000]
const AUTONOMY = [
  { id: 0.5, label: 'Nuit seulement' },
  { id: 1, label: '1 jour' },
  { id: 2, label: '2 jours' },
]

const fmt = (n, d = 1) => n.toLocaleString('fr-FR', { maximumFractionDigits: d })

export default function Simulateur() {
  const [rows, setRows] = useState(APPAREILS.map((a) => ({ ...a })))
  const [autonomy, setAutonomy] = useState(0.5)

  const update = (id, patch) => setRows((r) => r.map((x) => (x.id === id ? { ...x, ...patch } : x)))

  const res = useMemo(() => {
    const wh = rows.reduce((s, a) => s + a.w * a.h * a.qty, 0)
    const peak = rows.reduce((s, a) => s + a.w * a.qty, 0)
    const pvWc = (wh * LOSSES) / SUN_HOURS
    const panels = wh ? Math.ceil(pvWc / PANEL_WC) : 0
    const batteryKwh = (wh * autonomy) / DOD / 1000
    const inverter = peak ? INVERTERS.find((v) => v >= peak * 1.25) ?? Math.ceil((peak * 1.25) / 1000) * 1000 : 0
    return { wh, peak, panels, pvKwc: (panels * PANEL_WC) / 1000, batteryKwh, inverter }
  }, [rows, autonomy])

  const summary = rows.filter((a) => a.qty > 0).map((a) => `- ${a.qty} × ${a.label} (${a.w} W, ${a.h} h/j)`).join('\n')
  const message = `Bonjour SOKOJUST, voici ma simulation solaire :\n${summary}\n\nConsommation : ${fmt(res.wh / 1000, 2)} kWh/jour\nEstimation : ${res.panels} panneaux (${fmt(res.pvKwc)} kWc), batterie ${fmt(res.batteryKwh)} kWh, onduleur ${fmt(res.inverter / 1000)} kVA.\nPouvez-vous me faire un devis ?`

  return (
    <>
      <PageHero
        crumb="Simulateur solaire"
        eyebrow="Outil gratuit"
        title="Simulez votre installation solaire"
        lead="Indiquez vos appareils et leur durée d'utilisation : on estime la puissance de panneaux, le stockage et l'onduleur. Une première base avant notre étude sur mesure."
        image="/images/project-solar.jpg"
      />

      <section className="section">
        <div className="wrap sim-grid">
          <div className="appliances">
            <div className="app-head"><span>Appareil</span><span>Quantité</span><span>Heures / jour</span><span style={{ textAlign: 'right' }}>Énergie</span></div>
            {rows.map((a) => (
              <div key={a.id} className={`app-row ${a.qty ? '' : 'off'}`}>
                <div><b>{a.label}</b><small>{a.w} W</small></div>
                <div className="stepper">
                  <button aria-label={`Retirer ${a.label}`} onClick={() => update(a.id, { qty: Math.max(0, a.qty - 1) })}><Minus /></button>
                  <output aria-live="polite">{a.qty}</output>
                  <button aria-label={`Ajouter ${a.label}`} onClick={() => update(a.id, { qty: Math.min(30, a.qty + 1) })}><Plus /></button>
                </div>
                <div>
                  <input type="range" min="0" max="24" step="0.5" value={a.h} aria-label={`Heures d'utilisation ${a.label}`} onChange={(e) => update(a.id, { h: Number(e.target.value) })} />
                  <span className="hrs">{fmt(a.h)} h</span>
                </div>
                <div className="app-energy">{fmt((a.w * a.h * a.qty) / 1000, 2)} kWh</div>
              </div>
            ))}
          </div>

          <aside className="results on-dark" aria-live="polite">
            <h3>Votre consommation</h3>
            <div className="big-num">{fmt(res.wh / 1000, 2)}<small>kWh/jour</small></div>

            <h3 style={{ marginTop: 28 }}>Autonomie souhaitée sur batterie</h3>
            <div className="toggle-row">
              {AUTONOMY.map((o) => (
                <button key={o.id} className={autonomy === o.id ? 'on' : ''} onClick={() => setAutonomy(o.id)}>{o.label}</button>
              ))}
            </div>

            <div className="res-list">
              <div><span><Sun /> Panneaux {PANEL_WC} Wc</span><b>{res.panels} <small style={{ fontSize: '0.8rem', fontWeight: 500 }}>({fmt(res.pvKwc)} kWc)</small></b></div>
              <div><span><BatteryCharging /> Stockage lithium</span><b>{fmt(res.batteryKwh)} kWh</b></div>
              <div><span><Cpu /> Onduleur</span><b>{fmt(res.inverter / 1000)} kVA</b></div>
              <div><span><Zap /> Puissance simultanée max.</span><b>{fmt(res.peak, 0)} W</b></div>
            </div>

            <div style={{ display: 'grid', gap: 10 }}>
              <a className="btn btn-wa btn-block" href={waLink(message)} target="_blank" rel="noreferrer"><WhatsAppIcon /> Envoyer ma simulation</a>
              <Link className="btn btn-sun btn-block" to="/devis?metier=solaire" state={{ details: message }}>Demander un devis <ArrowRight /></Link>
            </div>
            <p className="disclaimer">
              Estimation indicative : {SUN_HOURS} h d'ensoleillement utile par jour, {Math.round((LOSSES - 1) * 100)} % de pertes, batteries lithium déchargées à {DOD * 100} %. Les moteurs (pompe, clim, frigo) ont un pic au démarrage : nous le vérifions lors de l'étude.
            </p>
          </aside>
        </div>
      </section>
    </>
  )
}
