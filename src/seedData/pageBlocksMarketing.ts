/**
 * Bloques de marketing reutilizables (Payload layout).
 * Una sola fuente de verdad para seeds (`seed`, `seed-internal`, `api/seed`).
 */
import { HYBRIDGE_APP_STORE_URL, HYBRIDGE_PLAY_STORE_URL } from '@/components/HybridgeAppSection'

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
    appStoreUrl: HYBRIDGE_APP_STORE_URL,
    playStoreUrl: HYBRIDGE_PLAY_STORE_URL,
    appStoreBadgeUrl:
      'https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/es-mx?size=250x83',
    playBadgeUrl: 'https://play.google.com/intl/es-419/badges/static/images/badges/es-419_badge_web_generic.png',
  }
}

const perfilIngresoBase = (body: string, bulletPoints: { text: string }[], formAnchor: string) => ({
  blockType: 'splitContent' as const,
  eyebrow: '',
  heading: 'PERFIL DE INGRESO',
  body,
  bulletPoints,
  imageUrl: wp('2024/10/pexels-emirhan-albayrak-859465-20291643.jpg'),
  imagePosition: 'right' as const,
  backgroundColor: 'white' as const,
  buttons: [
    {
      label: '¡Inscríbete ya!',
      url: formAnchor,
      variant: 'primary' as const,
      trackId: `perfil-ingreso-${formAnchor.replace(/^#form-/, '')}`,
    },
  ],
})

/** Ingeniería en Software — alineado con hybridge.education/ingenieria-en-software */
export function perfilIngresoSoftwareSplitBlock() {
  return perfilIngresoBase(
    'Dirigido a personas innovadoras que aspiran a dominar el mundo de la tecnología y la transformación digital.\n\nEl/la estudiante de Hybridge:',
    [
      { text: 'Busca la forma más flexible y disruptiva de estudiar Ingeniería.' },
      { text: 'Es curioso/a y busca aprender de la manera más innovadora posible.' },
      { text: 'Entiende que las cosas han cambiado y que los retos del futuro demandan una educación diferente.' },
      { text: 'Está interesado/a en dominar el mundo de la tecnología.' },
      { text: 'Cuenta con certificado de bachillerato.' },
      { text: 'Cuenta con lo necesario para hacer un programa en línea.' },
    ],
    '#form-ingenieria-software',
  )
}

/** Ingeniería en Inteligencia Artificial — hybridge.education/ingenieria-en-inteligencia-artificial */
export function perfilIngresoIASplitBlock() {
  return perfilIngresoBase(
    'Dirigido a personas innovadoras que aspiran a liderar en inteligencia artificial, aprendizaje automático y aplicaciones de software.\n\nEl/la estudiante de Hybridge:',
    [
      { text: 'Busca la forma más flexible y disruptiva de estudiar Ingeniería.' },
      { text: 'Es curioso/a y busca aprender de la manera más innovadora posible.' },
      { text: 'Está interesado/a en liderar en el incipiente campo de la inteligencia artificial.' },
      { text: 'Busca trabajar en el sector tecnológico.' },
      { text: 'Entiende que las cosas han cambiado y que los retos del futuro demandan una educación diferente.' },
      { text: 'Cuenta con certificado de bachillerato.' },
      { text: 'Cuenta con lo necesario para hacer un programa en línea.' },
    ],
    '#form-ingenieria-inteligencia-artificial',
  )
}

/** Ingeniería en Videojuegos / Inmersivas — hybridge.education/ingenieria-en-videojuegos */
export function perfilIngresoVideojuegosSplitBlock() {
  return perfilIngresoBase(
    'Dirigido a personas creativas y apasionadas por el diseño de experiencias digitales, videojuegos y tecnologías inmersivas.\n\nEl/la estudiante de Hybridge:',
    [
      { text: 'Busca la forma más flexible y disruptiva de estudiar Ingeniería.' },
      { text: 'Es curioso/a y busca aprender de la manera más innovadora posible.' },
      { text: 'Le apasiona el desarrollo de experiencias inmersivas y videojuegos.' },
      { text: 'Entiende que el futuro se construye con nuevas narrativas y tecnologías emergentes.' },
      { text: 'Busca trabajar en el sector tecnológico.' },
      { text: 'Entiende que las cosas han cambiado y que los retos del futuro demandan una educación diferente.' },
      { text: 'Cuenta con certificado de bachillerato.' },
      { text: 'Cuenta con lo necesario para hacer un programa en línea.' },
    ],
    '#form-ingenieria-videojuegos',
  )
}

/** Licenciatura en Administración e Innovación — hybridge.education/licenciatura-en-administracion-e-innovacion */
export function perfilIngresoAdministracionInnovacionSplitBlock() {
  return perfilIngresoBase(
    'Dirigido a personas que buscan crear valor en la Nueva Economía mediante administración, negocios digitales e innovación.\n\nEl/la estudiante de Hybridge:',
    [
      { text: 'Busca la forma más flexible y disruptiva de estudiar una Licenciatura.' },
      { text: 'Es curioso/a y busca aprender de la manera más innovadora posible.' },
      { text: 'Está interesado/a en los nuevos modelos de negocio.' },
      { text: 'Entiende que las cosas han cambiado y que los retos del futuro demandan una educación diferente.' },
      { text: 'Cuenta con certificado de bachillerato.' },
      { text: 'Cuenta con lo necesario para hacer un programa en línea.' },
    ],
    '#form-licenciatura-administracion-innovacion',
  )
}

/** Licenciatura en Mercadotecnia y Negocios Digitales — hybridge.education/licenciatura-en-mercadotecnia */
export function perfilIngresoMercadotecniaSplitBlock() {
  return perfilIngresoBase(
    'Dirigido a personas que buscan liderar estrategias comerciales y de crecimiento en la Nueva Economía.\n\nEl/la estudiante de Hybridge:',
    [
      { text: 'Busca la forma más flexible y disruptiva de estudiar Licenciatura.' },
      { text: 'Está interesado/a en las estrategias comerciales de crecimiento y de posicionamiento de mercado por medio de canales digitales.' },
      { text: 'Es curioso/a y busca aprender de la manera más innovadora posible.' },
      { text: 'Está interesado/a en los nuevos modelos de negocio.' },
      { text: 'Entiende que las cosas han cambiado y que los retos del futuro demandan una educación diferente.' },
      { text: 'Cuenta con certificado de bachillerato.' },
      { text: 'Cuenta con lo necesario para hacer un programa en línea.' },
    ],
    '#form-licenciatura-mercadotecnia-negocios-digitales',
  )
}

/** @deprecated Usa la variante por programa (p. ej. `perfilIngresoSoftwareSplitBlock`). */
export function perfilIngresoSplitBlock() {
  return perfilIngresoSoftwareSplitBlock()
}
