export const CONTACT = {
  phone: '+228 70 33 66 66',
  tel: '+22870336666',
  whatsapp: '22870336666',
  hours: 'Lun – Sam · 8h – 18h',
  address: ['Wetrivi Kondji', 'À côté de la pharmacie des étoiles', 'Lomé, Togo'],
  maps: 'https://www.google.com/maps/search/?api=1&query=Wetrivi+Kondji+Lom%C3%A9+Togo',
}

export const waLink = (text = '') =>
  `https://wa.me/${CONTACT.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`

export const METIERS = [
  {
    id: 'btp',
    num: '01',
    short: 'BTP & Gros œuvre',
    title: 'BTP & matériaux de construction',
    image: '/images/btp.jpg',
    alt: 'Sacs de ciment, acier, casque et outils de construction sur un chantier',
    pitch: 'Ciment, acier, agrégats et outillage — livrés au rythme réel de votre chantier.',
    lead: "Du terrassement à la finition, nous fournissons les matériaux qui tiennent votre chantier debout — avec la disponibilité et les conseils qui évitent les mauvaises surprises.",
    body: [
      "Nos ciments, aciers et agrégats viennent de fournisseurs éprouvés : un dosage ou une nuance d'acier mal choisis se paient des années plus tard. Nos équipes savent lire un plan, estimer un métré et vous dire honnêtement ce dont vous avez besoin.",
      "Maison familiale, immeuble locatif ou local commercial : nous adaptons quantités et livraisons à l'avancement du chantier, pour éviter le stockage inutile et les ruptures.",
    ],
    items: [
      'Ciment, chaux, sable, gravier et agrégats',
      "Acier à béton, fils d'attache, treillis soudés",
      'Briques, hourdis, carrelages et enduits',
      'Outillage professionnel et petit matériel',
      'Équipements de protection individuelle',
      'Estimation des quantités et suivi des livraisons',
    ],
  },
  {
    id: 'sanitaire',
    num: '02',
    short: 'Sanitaire & Plomberie',
    title: 'Sanitaire & plomberie',
    image: '/images/bathroom.jpg',
    alt: 'Showroom de salle de bain avec vasque, miroir et douche',
    pitch: 'Le visible et tout ce qui se cache dans les murs : céramique, robinetterie, réseau.',
    lead: "Une salle de bain réussie, c'est un bel équipement bien posé sur un réseau fiable. Nous fournissons les deux.",
    body: [
      "Nous privilégions les céramiques et robinetteries qui résistent au calcaire et à l'usage quotidien. Pour chaque projet, deux ou trois options à budgets différents, en expliquant ce qui change dans la durée.",
      "Tubes, raccords et vannes compatibles entre eux — le détail qui évite les fuites — et des conseils à vos plombiers sur les diamètres, les pentes et les protections.",
    ],
    items: [
      'Vasques, WC, baignoires, receveurs et cabines',
      'Robinetterie, mitigeurs, douchettes, accessoires',
      'Tubes PVC, PPR, cuivre et raccords',
      'Vannes, compteurs, pompes et réservoirs',
      "Chauffe-eau et production d'eau chaude",
      "Conseil d'implantation et compatibilité réseau",
    ],
  },
  {
    id: 'solaire',
    num: '03',
    short: 'Énergie solaire',
    title: 'Énergie solaire',
    image: '/images/solar.jpg',
    alt: "Panneaux solaires installés sur le toit d'une maison",
    pitch: 'Des installations dimensionnées sur vos usages réels, pas sur un catalogue.',
    lead: "Réduire la facture, sécuriser l'activité pendant les coupures : nous dimensionnons des installations qui répondent à vos usages réels.",
    body: [
      "Tout part de vos besoins : ce que vous alimentez, combien d'heures, et ce qui doit continuer en cas de coupure. Nous en déduisons la puissance des panneaux, le stockage et l'onduleur — foyer, boutique, atelier, forage ou éclairage.",
      "Du matériel dont nous connaissons le comportement sous notre climat, avec ses protections. Puis le suivi : extension, remplacement des batteries au bon moment.",
    ],
    items: [
      'Panneaux photovoltaïques monocristallins',
      'Onduleurs, régulateurs et convertisseurs',
      'Batteries lithium et plomb, câblage, protections',
      'Kits domestiques et systèmes de pompage',
      'Lampadaires et éclairage solaire autonome',
      'Étude de dimensionnement et mise en service',
    ],
  },
]

export const PROJETS = [
  {
    id: 'villa',
    cat: 'btp',
    tag: 'BTP & Gros œuvre',
    title: 'Villa familiale R+1',
    image: '/images/project-villa.jpg',
    alt: 'Villa de deux niveaux en fin de chantier, façade en pierre et enduit clair',
    text: "Des fondations à la finition : ciment, acier et agrégats livrés au fil de l'avancement, pour libérer de la place autour de la construction.",
    points: ['Métré et estimation des quantités', 'Livraisons échelonnées', "Suivi jusqu'à la finition"],
  },
  {
    id: 'sdb',
    cat: 'sanitaire',
    tag: 'Sanitaire & Plomberie',
    title: "Rénovation de salles d'eau",
    image: '/images/project-bathroom.jpg',
    alt: 'Salle de bain rénovée avec vasque, WC suspendu et douche vitrée',
    text: "Logement occupé : choix des céramiques et robinetteries, réseau complet, coordination avec le plombier pour limiter les coupures d'eau.",
    points: ['Sélection esthétique et durable', 'Réseau complet compatible', 'Chantier en site occupé'],
  },
  {
    id: 'toiture',
    cat: 'solaire',
    tag: 'Énergie solaire',
    title: 'Installation solaire en toiture',
    image: '/images/project-solar.jpg',
    alt: 'Techniciens installant des panneaux solaires sur une toiture-terrasse',
    text: 'Photovoltaïque avec stockage pour sécuriser les usages essentiels pendant les coupures, dimensionné sur les consommations réelles.',
    points: ['Dimensionnement sur mesure', 'Stockage et protections', 'Mise en service accompagnée'],
  },
  {
    id: 'appro',
    cat: 'btp',
    tag: 'Logistique',
    title: 'Approvisionnement de chantier continu',
    image: '/images/project-warehouse.jpg',
    alt: "Chargement de sacs de ciment et de barres d'acier dans un camion",
    text: 'Chantier de plusieurs mois : stock réservé, camion chargé à la demande et un interlocuteur unique pour ajuster les commandes.',
    points: ['Stock réservé', 'Livraison à la demande', 'Un seul interlocuteur'],
  },
]

export const ETAPES = [
  { n: '01', t: 'On écoute', d: 'Un plan, une photo ou un simple appel suffit pour démarrer.' },
  { n: '02', t: 'On chiffre', d: 'Une estimation claire, avec des options à différents budgets.' },
  { n: '03', t: 'On livre', d: "Les livraisons suivent l'avancement du chantier, pas l'inverse." },
  { n: '04', t: 'On reste là', d: 'Le même interlocuteur après la vente, pour la suite du projet.' },
]

export const VALEURS = [
  { t: 'Proximité & écoute', d: "Nous connaissons nos clients par leur nom et leurs chantiers par leurs contraintes. On vous répond directement." },
  { t: 'Conseil honnête', d: "Le produit juste plutôt que le plus cher. Quand une solution ne convient pas, nous le disons." },
  { t: 'Service au quotidien', d: 'Estimation des quantités, livraison au bon moment, disponibilité au téléphone.' },
  { t: 'Qualité durable', d: 'Des matériaux qui tiennent sous notre climat et dans le temps — c’est vous qui vivez avec.' },
]

export const HISTOIRE = [
  { k: 'Les débuts', t: 'Un comptoir de quartier', d: "Un petit point de vente de matériaux à Wetrivi Kondji, pour servir les maçons et les familles du quartier mieux que les grandes surfaces." },
  { k: 'La croissance', t: 'Du gros œuvre au sanitaire', d: "À force de suivre les mêmes clients d'un bout à l'autre du chantier, l'offre s'élargit au sanitaire et à la plomberie." },
  { k: 'Le tournant', t: "L'arrivée du solaire", d: "Face aux coupures et au coût de l'énergie : panneaux, stockage et dimensionnement adaptés aux foyers et commerces." },
  { k: "Aujourd'hui", t: 'Un partenaire de projets', d: 'BTP, sanitaire, solaire — en restant une entreprise à taille humaine où le patron répond encore au téléphone.' },
]

export const FAQ = [
  { q: 'Livrez-vous sur les chantiers ?', a: "Oui. Nous organisons les livraisons à Lomé et alentours, échelonnées selon l'avancement de votre chantier pour éviter le stockage inutile." },
  { q: 'Comment obtenir un devis ?', a: "Remplissez le formulaire de devis, envoyez-nous un plan ou une photo sur WhatsApp, ou appelez-nous. Nous revenons vers vous rapidement avec une estimation claire." },
  { q: 'Pouvez-vous estimer les quantités à partir de mon plan ?', a: 'Oui, nos équipes savent lire un plan et faire un métré. Nous vous indiquons ce dont vous avez réellement besoin — ni plus, ni moins.' },
  { q: "Installez-vous les panneaux solaires ?", a: "Nous réalisons l'étude de dimensionnement, fournissons le matériel et ses protections, et accompagnons l'installation jusqu'à la mise en service." },
  { q: 'Travaillez-vous avec les artisans et entrepreneurs ?', a: 'Bien sûr : maçons, plombiers, électriciens et entreprises sont au cœur de notre clientèle, au même titre que les particuliers.' },
]

// Appareils courants pour le simulateur solaire (puissance en W, heures/jour par défaut)
export const APPAREILS = [
  { id: 'led', label: 'Ampoule LED', w: 10, h: 6, qty: 6 },
  { id: 'ventilo', label: 'Ventilateur', w: 60, h: 8, qty: 2 },
  { id: 'tv', label: 'Téléviseur', w: 100, h: 5, qty: 1 },
  { id: 'frigo', label: 'Réfrigérateur', w: 150, h: 10, qty: 1 },
  { id: 'congel', label: 'Congélateur', w: 200, h: 12, qty: 0 },
  { id: 'pc', label: 'Ordinateur portable', w: 65, h: 6, qty: 1 },
  { id: 'phone', label: 'Chargeur téléphone', w: 10, h: 3, qty: 3 },
  { id: 'pompe', label: 'Pompe à eau', w: 750, h: 1, qty: 0 },
  { id: 'clim', label: 'Climatiseur (1 CV)', w: 900, h: 4, qty: 0 },
]
