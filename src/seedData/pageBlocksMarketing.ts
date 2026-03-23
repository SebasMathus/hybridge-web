/**
 * Bloques de marketing reutilizables (Payload layout).
 * Una sola fuente de verdad para seeds (`seed`, `seed-internal`, `api/seed`).
 */
const wp = (path: string) => `https://hybridge.education/wp-content/uploads/${path}`

export function modeloEducativoBlock() {
  return {
    blockType: 'modeloEducativo' as const,
    sectionTitle: 'MODELO EDUCATIVO',
    subtitle: 'Educación en línea de calidad, aprende con:',
    pillars: [
      {
        icon: '📱',
        title: 'Material',
        subtitle: 'asíncrono',
        description: 'La mejor experiencia de aprendizaje en la plataforma de Hybridge',
        showLiveDot: false,
      },
      {
        icon: '💻',
        title: 'Clases',
        subtitle: 'en vivo',
        description: 'Sesiones en zoom impartidas por expertos de la industria',
        showLiveDot: true,
      },
      {
        icon: '👩‍🏫',
        title: 'Tutorías',
        subtitle: 'Personalizadas 1 a 1',
        description: 'Sesiones en zoom para resolver dudas',
        showLiveDot: false,
      },
    ],
  }
}

export function benefitsHybridgeBlock() {
  return { blockType: 'benefitsHybridge' as const }
}

export function oportunidades2026Block() {
  return {
    blockType: 'oportunidades2026' as const,
    eyebrow: 'MUCHO MÁS QUE SOLO ESTUDIAR',
    heading: 'OPORTUNIDADES 2026',
    items: [
      { icon: '👩‍💼', label: 'Prácticas profesionales e Internships' },
      { icon: '📁', label: 'Mentorías y talleres especializados' },
      { icon: '🎙️', label: 'Webinars y pláticas' },
      { icon: '🤝', label: 'Vinculación laboral' },
    ],
  }
}

export function industryLeadersBlock() {
  return {
    blockType: 'industryLeaders' as const,
    eyebrow: 'APRENDE DE LA MANO DE',
    heading: 'LÍDERES DE LA INDUSTRIA',
    body: 'Con nosotros colaboran expertos de empresas como Amazon, Nu, Cinépolis, Fintual, Scotiabank, Strata Analytics, Deloitte, Buk, Peñafiel, Bank of America, TikTok, Banamex y más. ¡Aprende de ellos!',
  }
}

export function talleresHybridgeBlock() {
  return {
    blockType: 'talleresHybridge' as const,
    heading: 'TALLERES HYBRIDGE',
    subheading: 'TU HUB DE APRENDIZAJE',
    descriptionBefore: 'Además de tus materias, accede a talleres gratuitos y ',
    accentWord1: 'exclusivos',
    descriptionMiddle: ' para la comunidad Hybridge. Adquiere ',
    accentWord2: 'certificaciones',
    descriptionAfter: ' mientras estudias tu carrera.',
    workshops: [
      { icon: '🧠', label: 'IA Y TECNOLOGÍA' },
      { icon: '📱', label: 'PRODUCTIVIDAD Y HERRAMIENTAS' },
      { icon: '📈', label: 'NEGOCIOS Y MARKETING' },
      { icon: '📁', label: 'DESARROLLO PROFESIONAL' },
    ],
  }
}

export function hybridgeAppBlock() {
  return {
    blockType: 'hybridgeApp' as const,
    heading: 'HYBRIDGE APP',
    body: [
      'Hybridge cuenta con un ecosistema digital diseñado para que puedas aprender desde cualquier lugar.',
      'Puedes estudiar desde tu computadora o directamente desde tu celular.',
      'Avanza en tus actividades, revisa tus clases y mantente conectado con tu carrera donde quiera que estés.',
      'En Hybridge, el aprendizaje se adapta a ti y a tus hábitos. Así se ve estudiar de forma innovadora y flexible.',
    ].join('\n\n'),
    imageUrl: wp('2024/11/SDFGB@2x.jpg'),
    imagePosition: 'right' as const,
    backgroundColor: 'cream' as const,
    storesLabel: 'Disponible para iOS y Android',
    appStoreUrl: 'https://hybridge.education/',
    playStoreUrl: 'https://hybridge.education/',
    appStoreBadgeUrl:
      'https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/es-mx?size=250x83',
    playBadgeUrl: 'https://play.google.com/intl/es-419/badges/static/images/badges/es-419_badge_web_generic.png',
  }
}

export function perfilIngresoSplitBlock() {
  return {
    blockType: 'splitContent' as const,
    eyebrow: '',
    heading: 'PERFIL DE INGRESO',
    body:
      'Dirigido a personas innovadoras con pasión por la tecnología, formación en ingeniería, nuevas tecnologías y habilidades del futuro.\n\nEl/la estudiante de Hybridge:',
    bulletPoints: [
      { text: 'Busca la forma más flexible y disruptiva de estudiar Ingeniería.' },
      { text: 'Es curioso/a y busca aprender de la manera más innovadora posible.' },
      { text: 'Entiende que las cosas han cambiado y que los retos del futuro demandan una educación diferente.' },
      { text: 'Está interesado/a en dominar el mundo de la tecnología.' },
      { text: 'Cuenta con certificado de bachillerato.' },
      { text: 'Cuenta con lo necesario para hacer un programa en línea.' },
    ],
    imageUrl: wp('2024/10/pexels-emirhan-albayrak-859465-20291643.jpg'),
    imagePosition: 'right' as const,
    backgroundColor: 'white' as const,
    buttons: [],
  }
}
