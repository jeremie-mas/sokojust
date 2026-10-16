import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="section notfound">
      <div className="wrap">
        <div className="display">404</div>
        <h1 className="display h3" style={{ margin: '12px 0 16px' }}>Chantier introuvable</h1>
        <p className="lead" style={{ margin: '0 auto 28px' }}>Cette page n'existe pas (ou plus). Revenons sur des bases solides.</p>
        <Link to="/" className="btn btn-ink">Retour à l'accueil <ArrowRight /></Link>
      </div>
    </section>
  )
}
