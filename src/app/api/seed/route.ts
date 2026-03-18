import { getPayloadClient } from '@/lib/payload'
import { NextResponse } from 'next/server'

const WA = 'https://wa.me/message/2JJMWGRX5DSDO1'
const WA_INSC = 'https://wa.me/+525592256413?text=¡Hola!%20Me%20gustaria%20inscribirme'
const WA_ASES = 'https://wa.me/+525592256413?text=¡Hola!%20Quiero%20hablar%20con%20un%20asesor'
const WA_CALL = 'https://wa.me/+525592256413?text=¡Hola!%20Quiero%20agendar%20una%20llamada'
const IMG = (p: string) => `https://hybridge.education/wp-content/uploads/${p}`

const logos = [
  { name: 'AWS', imageUrl: IMG('2025/02/aliado-aws.png') },
  { name: 'Google', imageUrl: IMG('2025/02/aliado-google.png') },
  { name: 'Okta', imageUrl: IMG('2025/02/aliado-okta.png') },
  { name: 'Auth0', imageUrl: IMG('2025/02/aliado-Auth0.png') },
  { name: 'AWS EdStart', imageUrl: IMG('2025/02/aliado-aws-edstart.png') },
  { name: 'Figma', imageUrl: IMG('2025/02/aliado-figma.png') },
  { name: 'Microsoft', imageUrl: IMG('2025/02/aliado-microsoft.png') },
  { name: 'YouTube', imageUrl: IMG('2025/02/aliado-youtube.png') },
  { name: 'Improving', imageUrl: IMG('2025/02/aliado-improving.png') },
  { name: 'GitHub', imageUrl: IMG('2025/02/aliado-github.png') },
  { name: 'Adobe', imageUrl: IMG('2025/02/aliado-adobe.png') },
  { name: 'Spotify', imageUrl: IMG('2025/02/aliado-spotify.png') },
]

/* Testimonios canal Hybridge Education. Universidad: Shorts. Prepa: videos normales. */
const universidadTestimonials = [
  { name: 'Samantha', videoUrl: 'https://youtube.com/shorts/rd3j88ydstk' },
  { name: 'Karen', videoUrl: 'https://youtube.com/shorts/3ZT_-429QFs' },
  { name: 'Bryan', videoUrl: 'https://youtube.com/shorts/4aCkuqkXnB0' },
  { name: 'Gonzalo', videoUrl: 'https://youtube.com/shorts/xHXkppbmecY' },
  { name: 'Jefte', videoUrl: 'https://youtube.com/shorts/nfors3u_3-A' },
]
const prepaTestimonials = [
  { name: 'Luis Jacobo', videoUrl: 'https://youtu.be/Xj5Ey_SsN3w' },
  { name: 'Kamila', videoUrl: 'https://youtu.be/0QOhNy1EB_I' },
  { name: 'Mariana', videoUrl: 'https://youtu.be/_f7MaLtBU8Y' },
  { name: 'Sofía', videoUrl: 'https://youtu.be/WB5cVovW8U8' },
  { name: 'Testimonio Prepa', videoUrl: 'https://youtu.be/T7SpnScfWkA' },
]

const prepaTestimonialsData = {
  slug: 'prepa',
  title: 'Testimonios Preparatoria',
  eyebrow: 'Testimonios Prepa',
  heading: 'Conoce Hybridge desde los ojos de nuestra comunidad',
  testimonials: prepaTestimonials,
}
const universidadTestimonialsData = {
  slug: 'universidad',
  title: 'Testimonios Universidad',
  eyebrow: 'Universidad en Línea — Testimonios',
  heading: 'Nuestros estudiantes te cuentan cómo ha sido su experiencia estudiando en Hybridge',
  testimonials: universidadTestimonials,
}

const logosBlock = { blockType: 'logosBar', heading: 'Confían en nosotros', logos }
const waBlock = { blockType: 'whatsappBar', text: 'Hablar con un asesor', url: WA, trackId: '' }
/* CTA fecha de inicio: bloque que consume la colección Fechas de inicio (prepa / universidad) */
const ctaFechaInicio = (fechaInicioId: string | number, trackPrefix: string) => ({
  blockType: 'ctaFechaInicio',
  fechaInicio: fechaInicioId,
  trackPrefix,
})

/* Plan de estudios: bloque que apunta a un documento de la colección Planes de estudio */
const curriculumPlanBlock = (planId: string | number): { blockType: 'curriculumPlan'; plan: string | number } => ({
  blockType: 'curriculumPlan',
  plan: planId,
})

/* Testimonios: bloque que apunta a un documento de la colección Testimonios (prepa o universidad) */
const testimonialsPlanBlock = (testimonialsId: string | number, backgroundColor: 'white' | 'cream' = 'cream') => ({
  blockType: 'testimonialsPlan',
  testimonials: testimonialsId,
  backgroundColor,
})

/* ════════ HOME ════════ */
const homeLayout = (universidadFechaId: string | number, universidadTestimonialsId: string | number) => [
  {
    blockType: 'heroCarousel',
    slides: [
      { line1: 'Ingeniería en', line2: 'Software', description: 'El mejor programa de ingeniería para las personas que aspiran a dominar el mundo de la tecnología.', imageUrl: IMG('2024/10/pexels-emirhan-albayrak-859465-20291643.jpg'), ctaLabel: 'Inscríbete ya', ctaUrl: '/ingenieria-en-software#form-ingenieria-software', ctaTrackId: 'home-hero-software' },
      { line1: 'Ingeniería en', line2: 'Inteligencia Artificial', description: 'Lidera en el campo de la inteligencia artificial.', imageUrl: IMG('2024/10/j.jpg'), ctaLabel: 'Inscríbete ya', ctaUrl: '/contacto-ingenieria-inteligencia-artificial/', ctaTrackId: 'home-hero-ia' },
      { line1: 'Licenciatura en', line2: 'Administración e Innovación', description: 'Aprende a administrar negocios digitales e innovar con las nuevas tecnologías.', imageUrl: IMG('2024/11/sdc-1024x1024.png'), ctaLabel: 'Inscríbete ya', ctaUrl: '/licenciatura-en-administracion-e-innovacion/', ctaTrackId: 'home-hero-admin' },
      { line1: 'Licenciatura en', line2: 'Mercadotecnia y Negocios Digitales', description: 'Lidera estrategias innovadoras de marketing digital para la Nueva Economía.', imageUrl: IMG('2024/11/SDFGB@2x.jpg'), ctaLabel: 'Inscríbete ya', ctaUrl: '/contacto-licenciatura-en-mercadotecnia/', ctaTrackId: 'home-hero-mkt' },
      { line1: 'Ingeniería en Tecnologías', line2: 'Inmersivas y Videojuegos', description: 'Construye mundos virtuales.', imageUrl: IMG('2024/10/j.jpg'), ctaLabel: 'Inscríbete ya', ctaUrl: '/contacto-ingenieria-videojuegos/', ctaTrackId: 'home-hero-vj' },
      { line1: 'PREPA', line2: 'EN LÍNEA', description: 'Haz la prepa en 2 años de la manera más disruptiva que te hayas imaginado con clases en vivo y desde la mejor plataforma educativa del país.', imageUrl: IMG('2024/10/pexels-emirhan-albayrak-859465-20291643.jpg'), ctaLabel: 'Inscríbete ya', ctaUrl: '/preparatoria#form-prepa', ctaTrackId: 'home-hero-prepa' },
    ],
  },
  logosBlock,
  { ...waBlock, trackId: 'home-wa-bar' },
  {
    blockType: 'splitContent', eyebrow: 'Sobre', heading: 'Hybridge Education',
    body: 'Somos una organización con el propósito de transformar el proceso más importante de todos: la educación.\nEntendemos el rumbo inevitable que está tomando el mundo y nos hemos propuesto crear la escuela y universidad del futuro, por medio de programas educativos virtuales, accesibles y con validez oficial.',
    imageUrl: IMG('2024/10/pexels-emirhan-albayrak-859465-20291643.jpg'), imagePosition: 'right', backgroundColor: 'white',
    buttons: [
      { label: 'Preparatoria', url: '/preparatoria', variant: 'primary', trackId: 'home-about-prepa' },
      { label: 'Universidad', url: '#universidad', variant: 'secondary', trackId: 'home-about-uni' },
    ],
  },
  testimonialsPlanBlock(universidadTestimonialsId),
  {
    blockType: 'programsGrid', heading: 'Conoce nuestros', highlightText: 'Programas',
    programs: [
      { type: 'Ingeniería', name: 'en Inteligencia Artificial', description: 'Formación avanzada y herramientas para liderar en IA, aprendizaje de máquina y software.', imageUrl: IMG('2024/10/j.jpg'), url: '/ingenieria-en-inteligencia-artificial/' },
      { type: 'Ingeniería', name: 'en Software', description: 'Formación avanzada en ingeniería, nuevas tecnologías y habilidades para transformar ideas en realidad.', imageUrl: IMG('2024/10/pexels-emirhan-albayrak-859465-20291643.jpg'), url: '/ingenieria-en-software/' },
      { type: 'Licenciatura', name: 'en Mercadotecnia y Negocios Digitales', description: 'Lidera estrategias comerciales y de crecimiento en la Nueva Economía.', imageUrl: IMG('2024/11/SDFGB@2x.jpg'), url: '/licenciatura-en-mercadotecnia/' },
      { type: 'Licenciatura', name: 'en Administración e Innovación', description: 'Administración, finanzas, liderazgo y tecnologías digitales.', imageUrl: IMG('2024/11/sdc-1024x1024.png'), url: '/licenciatura-en-administracion-e-innovacion/' },
      { type: 'Ingeniería en Tecnologías', name: 'Inmersivas y Videojuegos', description: 'Construye mundos virtuales.', imageUrl: IMG('2024/10/j.jpg'), url: '/ingenieria-en-videojuegos/' },
      { type: 'Hybridge', name: 'Preparatoria', description: 'Haz la prepa en 2 años de la manera más disruptiva.', imageUrl: IMG('2024/10/pexels-emirhan-albayrak-859465-20291643.jpg'), url: '/preparatoria/' },
    ],
  },
  ctaFechaInicio(universidadFechaId, 'home'),
  {
    blockType: 'splitContent', heading: '¿Qué nos mueve?',
    body: 'Vemos la educación tradicional siendo cuestionada y una generación que lo puede cambiar todo:',
    imageUrl: IMG('2024/11/SDFGB@2x.jpg'), imagePosition: 'right', backgroundColor: 'white',
    bulletPoints: [
      { text: 'Las escuelas no están enseñando lo que demanda el mercado laboral' },
      { text: 'Hay una escasez de talento especializado para la Nueva Economía' },
      { text: 'La gente joven busca ser productiva lo antes posible' },
      { text: 'La tecnología no se está utilizando al máximo para mejorar la enseñanza' },
    ],
    buttons: [
      { label: 'Preparatoria', url: '/preparatoria', variant: 'primary', trackId: 'home-mueve-prepa' },
      { label: 'Universidad', url: '#universidad', variant: 'secondary', trackId: 'home-mueve-uni' },
    ],
  },
  {
    blockType: 'pillarsGrid', heading: 'Los pilares de nuestra', highlightText: 'tecnología educativa', backgroundColor: 'cream',
    pillars: [
      { title: 'Colaboración', description: 'Aprende junto a tu comunidad', icon: '🤝' },
      { title: 'Inmersión', description: 'Experiencias que te sumergen', icon: '🌊' },
      { title: 'Interacción', description: 'Participa activamente', icon: '💬' },
      { title: 'Adaptación', description: 'A tu ritmo y estilo', icon: '🎚️' },
    ],
  },
]

/* ════════ PREPARATORIA (mismo orden de componentes que Ingeniería en Software) ════════ */
const prepaSubjects = (names: string[]) => names.map(n => ({ name: n }))
const swSubjects = (names: string[]) => names.map(n => ({ name: n }))
/* Datos de los planes de estudio (colección planes-estudio) */
const prepaPlanData = {
  slug: 'prepa',
  title: 'Preparatoria',
  heading: 'Plan de estudios',
  subheading: 'Las materias que cursarás',
  description: 'Adquiere las habilidades para destacar en la era digital.',
  semesters: [
    { title: 'PRIMER CUATRIMESTRE', subjects: prepaSubjects(['CNEYT I: La materia y sus interacciones', 'Ciencias Sociales I', 'Cultura Digital I', 'Pensamiento matemático I', 'Lengua y Comunicación I', 'Inglés I', 'Humanidades I', 'Laboratorio de Investigación']) },
    { title: 'SEGUNDO CUATRIMESTRE', subjects: prepaSubjects(['CNEYT II: Conservación de la energía', 'Ciencias Sociales II', 'Cultura Digital II', 'Pensamiento matemático II', 'Lengua y Comunicación II', 'Inglés II', 'Humanidades II', 'Taller de ciencias I']) },
    { title: 'TERCER CUATRIMESTRE', subjects: prepaSubjects(['CNEYT III: Ecosistemas, interacciones, energía y dinámica', 'Pensamiento matemático III', 'Lengua y Comunicación III', 'Inglés III', 'Humanidades III', 'Taller de ciencias II']) },
    { title: 'CUARTO CUATRIMESTRE', subjects: prepaSubjects(['CNEYT IV: Reacciones Químicas', 'Ciencias Sociales III', 'Taller de Cultura Digital', 'Temas Selectos de Matemáticas I', 'Pensamiento Literario', 'Inglés IV', 'Espacio y sociedad', 'Conciencia Histórica I']) },
    { title: 'QUINTO CUATRIMESTRE', subjects: prepaSubjects(['CNEYT V: La energía en los procesos de la vida diaria', 'Fundamentos de Administración I', 'Psicología I', 'Análisis de fenómenos y procesos biológicos', 'Pensamiento Filosófico I', 'Conciencia Histórica II']) },
    { title: 'SEXTO CUATRIMESTRE', subjects: prepaSubjects(['CNEYT VI: Organismos, Estructuras y procesos', 'Fundamentos de Administración II', 'Temas Selectos de Matemáticas II', 'Psicología II', 'Temas Selectos de Biología II', 'Pensamiento Filosófico II', 'Conciencia Histórica III']) },
  ],
}
const swPlanData = {
  slug: 'ingenieria-software',
  title: 'Ingeniería en Software',
  heading: 'Plan de estudios',
  subheading: 'Las materias que cursarás',
  description: 'Adquiere las habilidades para destacar en la era digital.',
  semesters: [
    { title: 'PRIMER CUATRIMESTRE', subjects: swSubjects(['Introducción a la Ingeniería en Software', 'Análisis y Diseño de Algoritmos', 'Experiencia de Usuario', 'Matemáticas y Física para Ingeniería', 'Tecnología, Sociedad y Futuros Posibles I']) },
    { title: 'SEGUNDO CUATRIMESTRE', subjects: swSubjects(['Fundamentos de Redes Computacionales', 'Programación Orientada a Objetos', 'Bases de Datos', 'Probabilidad y Estadística', 'Desarrollo del Pensamiento Crítico']) },
    { title: 'TERCER CUATRIMESTRE', subjects: swSubjects(['Cloud Computing y Redes Virtuales', 'Programación Avanzada', 'Ciencia de Datos', 'Álgebra Lineal', 'Persona y Sociedad']) },
    { title: 'CUARTO CUATRIMESTRE', subjects: swSubjects(['Arquitectura y Patrones de Diseño', 'Fundamentos de Desarrollo Web', 'Inteligencia Artificial', 'Cálculo Diferencial', 'Mundo Contemporáneo y Futuros Posibles']) },
    { title: 'QUINTO CUATRIMESTRE', subjects: swSubjects(['Administración de Sistemas Operativos y Servidores', 'Desarrollo Web Front-end', 'Aprendizaje de Máquina', 'Cálculo Integral', 'Comunicación Oral y Escrita']) },
    { title: 'SEXTO CUATRIMESTRE', subjects: swSubjects(['Pruebas Unitarias y Funcionales de Software', 'Desarrollo Web Back-end', 'Sistemas de Aprendizaje Profundo', 'Prototipado de Sistemas y Aplicaciones', 'Ecuaciones Diferenciales']) },
    { title: 'SÉPTIMO CUATRIMESTRE', subjects: swSubjects(['Herramientas para DevOps', 'Desarrollo de Aplicaciones Móvil', 'Análisis y Procesamiento de Datos', 'Ciberseguridad y Hackeo Ético', 'Derecho en el Mundo Digital']) },
    { title: 'OCTAVO CUATRIMESTRE', subjects: swSubjects(['Aplicaciones de la Ingeniería de Software', 'Software de Código Abierto y Colaborativo', 'Lenguaje Natural', 'Finanzas y Negocios Digitales', 'Ética en el Mundo Digital']) },
    { title: 'NOVENO CUATRIMESTRE', subjects: swSubjects(['Diseño de Productos Digitales', 'Metodologías Ágiles', 'Emprendimiento e Innovación', 'Proyecto Terminal', 'Servicio Social']) },
  ],
}

const prepaLayout = (prepaFormId: string | number, prepaFechaId: string | number, prepaPlanId: string | number, prepaTestimonialsId: string | number) => [
  { blockType: 'heroBanner', heading: 'PREPA EN LÍNEA', subheading: 'Haz la prepa en 2 años de la manera más disruptiva que te hayas imaginado con clases en vivo y desde la mejor plataforma educativa del país.', imageUrl: IMG('2024/10/pexels-emirhan-albayrak-859465-20291643.jpg'), ctaLabel: 'Inscríbete ya', ctaUrl: '#form-prepa', ctaTrackId: 'prepa-hero-cta' },
  logosBlock,
  { ...waBlock, trackId: 'prepa-wa-bar' },
  {
    blockType: 'splitContent', eyebrow: 'Sobre Hybridge Prepa', heading: 'PREPARATORIA HYBRIDGE',
    body: 'Hemos creado la mejor preparatoria en línea con enfoque en Nuevas Tecnologías y Emprendimiento que puedes terminar en solo 2 años.\n\nEn Hybridge entendemos que todas las personas somos diferentes y tenemos intereses distintos; por eso hemos creado un modelo flexible y adaptable a cualquier necesidad.',
    imageUrl: IMG('2024/10/pexels-emirhan-albayrak-859465-20291643.jpg'), imagePosition: 'right', backgroundColor: 'white',
    buttons: [{ label: 'Inscríbete ya', url: '#form-prepa', variant: 'primary', trackId: 'prepa-about-cta' }],
  },
  {
    blockType: 'orgulloPrepa',
    title: 'ORGULLO',
    highlight: 'HYBRIDGE',
    subtitle: 'Elementos de la experiencia educativa en Hybridge que nos enorgullecen...',
    items: [
      { icon: '🏆', text: 'Nuestra tasa de retención es de 93%' },
      { icon: '✈️', text: 'Participación estudiantil en concursos internacionales' },
      { icon: '🥇', text: 'Menciones en medios y rankings internacionales' },
      { icon: '🧑‍💻', text: 'Contamos con nuestra propia tecnología' },
      { icon: '🤝', text: 'Nuestras alianzas educativas' },
    ],
  },
  {
    blockType: 'splitContent',
    eyebrow: 'Sobre Prepa Hybridge',
    heading: '¿QUÉ NOS MUEVE?',
    body: 'Vemos la educación tradicional siendo cuestionada y una generación que lo puede cambiar todo:',
    bulletPoints: [
      { text: 'Las escuelas no están enseñando lo que demanda el mercado laboral' },
      { text: 'Hay una escasez de talento especializado para la Nueva Economía' },
      { text: 'La gente joven busca ser productiva lo antes posible' },
      { text: 'La tecnología no se está utilizando al máximo para mejorar la enseñanza' },
    ],
    imageUrl: IMG('2024/10/pexels-emirhan-albayrak-859465-20291643.jpg'),
    imagePosition: 'left',
    backgroundColor: 'white',
    buttons: [{ label: 'Inscríbete ya', url: '#form-prepa', variant: 'primary', trackId: 'prepa-mueve-cta' }],
  },
  testimonialsPlanBlock(prepaTestimonialsId),
  {
    blockType: 'featuresGrid', heading: 'Haz tu prepa en sólo 2 años', subheading: 'Nuestra preparatoria cuenta con RVOE No. 2660', backgroundColor: 'white',
    features: [
      { iconText: '💻', label: 'Modalidad', value: 'En línea' },
      { iconText: '⏳', label: 'Duración', value: '2 años (6 cuatrimestres)' },
      { iconText: '🚀', label: 'Enfoque en', value: 'nuevas Tecnologías y Emprendimiento' },
      { iconText: '✅', label: 'Avalado por la SEP', value: 'Validez oficial' },
    ],
  },
  {
    blockType: 'splitContent', eyebrow: 'Hybridge', heading: 'Mucho más que solo una prepa',
    body: 'Nuestro modelo está diseñado para que nuestros estudiantes aprendan de su comunidad de la mano de un amplio grupo de líderes de la industria, expertas y emprendedores.',
    imageUrl: IMG('2024/11/sdc-1024x1024.png'), imagePosition: 'left', backgroundColor: 'cream',
    buttons: [{ label: 'Inscríbete ya', url: '#form-prepa', variant: 'primary', trackId: 'prepa-masque-cta' }],
  },
  ctaFechaInicio(prepaFechaId, 'prepa'),
  curriculumPlanBlock(prepaPlanId),
  /* Un solo video por página (prepa) */
  { blockType: 'videoSection', heading: 'CONOCE MÁS DE NUESTRA PREPA', subheading: 'Hybridge Preparatoria', youtubeUrl: 'https://youtu.be/ilt5S7VH7xk', backgroundColor: 'cream' },
  {
    blockType: 'graduadosPrepa',
    graduatedCount: 220,
    percent: 15,
    mexicoUniversities: [{ label: 'UNAM' }, { label: 'IPN' }, { label: 'UAM' }, { label: 'ITAM' }, { label: 'Tec' }],
    abroadUniversities: [{ label: 'McGill' }, { label: 'Princeton' }, { label: 'Lake Forest' }, { label: 'ESMUC' }, { label: 'Toronto' }],
  },
  { blockType: 'formBlock', form: prepaFormId },
]

/* ════════ ING SOFTWARE ════════ */
const swLayout = (swFormId: string | number, universidadFechaId: string | number, swPlanId: string | number, universidadTestimonialsId: string | number) => [
  { blockType: 'heroBanner', heading: 'Ingeniería en Software', subheading: 'El mejor programa para las personas que aspiran a dominar el mundo de la tecnología.', imageUrl: IMG('2024/10/pexels-emirhan-albayrak-859465-20291643.jpg'), ctaLabel: 'Inscríbete ya', ctaUrl: '#form-ingenieria-software', ctaTrackId: 'sw-hero-cta' },
  logosBlock,
  { ...waBlock, trackId: 'sw-wa-bar' },
  {
    blockType: 'splitContent', eyebrow: 'Sobre nuestra', heading: 'Ingeniería en Software',
    body: 'El programa de Ingeniería en Software de Hybridge es un programa con validez oficial dirigido a personas innovadoras que aspiran a dominar el mundo de la tecnología.\nPor medio de un ecosistema virtual único, Hybridge ofrece una formación única en ingeniería, nuevas tecnologías y habilidades para la nueva economía.\nYa sea que busques construir nuevos productos, transformaciones digitales o estés pensando en iniciar un emprendimiento, este programa te dará todas las herramientas.',
    imageUrl: IMG('2024/10/pexels-emirhan-albayrak-859465-20291643.jpg'), imagePosition: 'right', backgroundColor: 'white',
    buttons: [{ label: 'Inscríbete ya', url: '#form-ingenieria-software', variant: 'primary', trackId: 'sw-about-cta' }],
  },
  testimonialsPlanBlock(universidadTestimonialsId),
  {
    blockType: 'featuresGrid', heading: 'Haz tu ingeniería en solo 3 años', subheading: 'RVOE No. 2833', backgroundColor: 'white',
    features: [
      { iconText: '💻', label: 'Modalidad', value: 'En línea' },
      { iconText: '⏳', label: 'Duración', value: '3 años (9 cuatrimestres)' },
      { iconText: '🚀', label: 'Enfoque en', value: 'nuevas Tecnologías y Emprendimiento' },
      { iconText: '✅', label: 'Avalado por la SEP', value: 'Validez oficial' },
    ],
  },
  {
    blockType: 'splitContent', eyebrow: 'Comunidad', heading: 'Hybridge',
    body: 'Hybridge es mucho más que solo un lugar para aprender tecnología. Al estar comprometidos con la construcción del futuro de la educación, entendemos la relevancia de reinventar las comunidades de aprendizaje.\nEn Hybridge serás parte de un ecosistema que conecta a estudiantes, académicos, innovadores, líderes de la industria, emprendedoras, empresas y fondos de inversión.',
    imageUrl: IMG('2024/11/sdc-1024x1024.png'), imagePosition: 'left', backgroundColor: 'cream',
    buttons: [{ label: 'Inscríbete ya', url: '#form-ingenieria-software', variant: 'primary', trackId: 'sw-comunidad-cta' }],
  },
  ctaFechaInicio(universidadFechaId, 'sw'),
  curriculumPlanBlock(swPlanId),
  /* Un solo video por página (ingeniería) */
  { blockType: 'videoSection', heading: 'CONOCE MÁS DE NUESTRA INGENIERÍA', youtubeUrl: 'https://youtu.be/-tSOJi573hw', backgroundColor: 'cream' },
  { blockType: 'formBlock', form: swFormId },
]

export async function GET() {
  try {
    const payload = await getPayloadClient()

    // Ensure Fechas de inicio exist (prepa, universidad)
    let prepaFechaId: string | number
    let universidadFechaId: string | number
    try {
      const prepaFechaRes = await payload.find({ collection: 'fechas-inicio', where: { slug: { equals: 'prepa' } }, limit: 1 })
      if (prepaFechaRes.docs.length) {
        prepaFechaId = prepaFechaRes.docs[0].id
      } else {
        const created = await payload.create({
          collection: 'fechas-inicio',
          data: { slug: 'prepa', label: 'Preparatoria', dateText: '13 de abril 2026' },
        })
        prepaFechaId = created.id
      }
      const universidadFechaRes = await payload.find({ collection: 'fechas-inicio', where: { slug: { equals: 'universidad' } }, limit: 1 })
      if (universidadFechaRes.docs.length) {
        universidadFechaId = universidadFechaRes.docs[0].id
      } else {
        const created = await payload.create({
          collection: 'fechas-inicio',
          data: { slug: 'universidad', label: 'Universidad', dateText: '6 de abril 2026' },
        })
        universidadFechaId = created.id
      }
    } catch (fechasError: any) {
      console.error('Fechas-inicio error:', fechasError)
      return NextResponse.json({
        success: false,
        error: fechasError?.message || 'Error en Fechas de inicio',
        hint: 'Si la tabla no existe: reinicia el servidor (npm run dev), abre http://localhost:3000/admin para que Payload cree las tablas, luego ejecuta de nuevo /api/seed',
      }, { status: 500 })
    }

    // Ensure forms exist (prepa, ingenieria-software)
    let prepaFormId: string | number
    let swFormId: string | number
    const prepaFormRes = await payload.find({ collection: 'forms', where: { slug: { equals: 'prepa' } }, limit: 1 })
    if (prepaFormRes.docs.length) {
      prepaFormId = prepaFormRes.docs[0].id
    } else {
      const created = await payload.create({
        collection: 'forms',
        data: {
          title: 'Prepa Hybridge',
          slug: 'prepa',
          showWhatsAppConsent: true,
          successMessage: 'Gracias. Nos pondremos en contacto contigo pronto.',
        },
      })
      prepaFormId = created.id
    }
    const swFormRes = await payload.find({ collection: 'forms', where: { slug: { equals: 'ingenieria-software' } }, limit: 1 })
    if (swFormRes.docs.length) {
      swFormId = swFormRes.docs[0].id
    } else {
      const created = await payload.create({
        collection: 'forms',
        data: {
          title: 'Ingeniería en Software',
          slug: 'ingenieria-software',
          showWhatsAppConsent: true,
          successMessage: 'Gracias. Nos pondremos en contacto contigo pronto.',
        },
      })
      swFormId = created.id
    }

    // Ensure Planes de estudio exist (prepa, ingenieria-software)
    let prepaPlanId: string | number
    let swPlanId: string | number
    const prepaPlanRes = await payload.find({ collection: 'planes-estudio', where: { slug: { equals: 'prepa' } }, limit: 1 })
    if (prepaPlanRes.docs.length) {
      prepaPlanId = prepaPlanRes.docs[0].id
    } else {
      const created = await payload.create({
        collection: 'planes-estudio',
        data: prepaPlanData as any,
      })
      prepaPlanId = created.id
    }
    const swPlanRes = await payload.find({ collection: 'planes-estudio', where: { slug: { equals: 'ingenieria-software' } }, limit: 1 })
    if (swPlanRes.docs.length) {
      swPlanId = swPlanRes.docs[0].id
    } else {
      const created = await payload.create({
        collection: 'planes-estudio',
        data: swPlanData as any,
      })
      swPlanId = created.id
    }

    // Ensure Testimonios exist (prepa, universidad). Si la tabla no existe (push: false), devolver mensaje claro.
    let prepaTestimonialsId: string | number
    let universidadTestimonialsId: string | number
    try {
      const prepaTestimonialsRes = await payload.find({ collection: 'testimonios', where: { slug: { equals: 'prepa' } }, limit: 1 })
      if (prepaTestimonialsRes.docs.length) {
        prepaTestimonialsId = prepaTestimonialsRes.docs[0].id
        await payload.update({
          collection: 'testimonios',
          id: prepaTestimonialsId,
          data: prepaTestimonialsData as any,
        })
      } else {
        const created = await payload.create({
          collection: 'testimonios',
          data: prepaTestimonialsData as any,
        })
        prepaTestimonialsId = created.id
      }
      const universidadTestimonialsRes = await payload.find({ collection: 'testimonios', where: { slug: { equals: 'universidad' } }, limit: 1 })
      if (universidadTestimonialsRes.docs.length) {
        universidadTestimonialsId = universidadTestimonialsRes.docs[0].id
        await payload.update({
          collection: 'testimonios',
          id: universidadTestimonialsId,
          data: universidadTestimonialsData as any,
        })
      } else {
        const created = await payload.create({
          collection: 'testimonios',
          data: universidadTestimonialsData as any,
        })
        universidadTestimonialsId = created.id
      }
    } catch (testimoniosErr: any) {
      const msg = testimoniosErr?.message || ''
      const causeMsg = (testimoniosErr?.cause as Error)?.message || ''
      const tableMissing = (msg.includes('testimonios') || causeMsg.includes('testimonios')) && (msg.includes('does not exist') || causeMsg.includes('does not exist') || msg.includes('Failed query'))
      if (tableMissing) {
        const p = payload as { db?: { pool?: { query: (sql: string) => Promise<unknown> } }; pool?: { query: (sql: string) => Promise<unknown> } }
        const pool = p?.db?.pool ?? p?.pool
        if (pool?.query) {
          try {
            await pool.query(`
              CREATE TABLE IF NOT EXISTS "testimonios" (
                "id" serial PRIMARY KEY,
                "slug" varchar UNIQUE NOT NULL,
                "title" varchar NOT NULL,
                "eyebrow" varchar,
                "heading" varchar NOT NULL,
                "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
                "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
              )
            `)
            await pool.query(`ALTER TABLE "testimonios" DROP COLUMN IF EXISTS "testimonials"`)
            await pool.query(`
              CREATE TABLE IF NOT EXISTS "testimonios_testimonials" (
                "id" serial PRIMARY KEY,
                "_order" integer NOT NULL DEFAULT 0,
                "name" varchar,
                "image_id" integer,
                "image_url" varchar,
                "video_url" varchar,
                "_parent_id" integer NOT NULL REFERENCES "testimonios"("id") ON DELETE CASCADE
              )
            `)
            await pool.query(`
              ALTER TABLE "payload_locked_documents_rels"
              ADD COLUMN IF NOT EXISTS "testimonios_id" integer
            `)
            // Re-run the testimonios block after creating the tables
            const prepaTestimonialsRes = await payload.find({ collection: 'testimonios', where: { slug: { equals: 'prepa' } }, limit: 1 })
            if (prepaTestimonialsRes.docs.length) {
              prepaTestimonialsId = prepaTestimonialsRes.docs[0].id
              await payload.update({ collection: 'testimonios', id: prepaTestimonialsId, data: prepaTestimonialsData as any })
            } else {
              const created = await payload.create({ collection: 'testimonios', data: prepaTestimonialsData as any })
              prepaTestimonialsId = created.id
            }
            const universidadTestimonialsRes = await payload.find({ collection: 'testimonios', where: { slug: { equals: 'universidad' } }, limit: 1 })
            if (universidadTestimonialsRes.docs.length) {
              universidadTestimonialsId = universidadTestimonialsRes.docs[0].id
              await payload.update({ collection: 'testimonios', id: universidadTestimonialsId, data: universidadTestimonialsData as any })
            } else {
              const created = await payload.create({ collection: 'testimonios', data: universidadTestimonialsData as any })
              universidadTestimonialsId = created.id
            }
          } catch (createErr: any) {
            return NextResponse.json({
              success: false,
              error: 'La tabla "testimonios" no existe y no se pudo crear automáticamente.',
              hint: 'Quita push: false en payload.config.ts, reinicia el servidor, abre /admin para que se creen las tablas, vuelve a poner push: false y ejecuta el seed.',
              detail: createErr?.message,
            }, { status: 503 })
          }
        } else {
          return NextResponse.json({
            success: false,
            error: 'La tabla "testimonios" no existe en la base de datos.',
            hint: 'Quita push: false en payload.config.ts, reinicia el servidor, abre http://localhost:3000/admin, vuelve a poner push: false y ejecuta el seed.',
          }, { status: 503 })
        }
      } else {
        throw testimoniosErr
      }
    }

    // Delete existing pages with these slugs
    for (const slug of ['home', 'preparatoria', 'ingenieria-en-software']) {
      const existing = await payload.find({ collection: 'pages', where: { slug: { equals: slug } }, limit: 1 })
      for (const doc of existing.docs) {
        await payload.delete({ collection: 'pages', id: doc.id })
      }
    }

    await payload.create({ collection: 'pages', data: { title: 'Inicio', slug: 'home', layout: homeLayout(universidadFechaId, universidadTestimonialsId) as any, meta: { title: 'Hybridge Education - La mejor escuela en línea', description: 'Preparatoria y universidad en línea con validez oficial.' } } })
    await payload.create({ collection: 'pages', data: { title: 'Preparatoria', slug: 'preparatoria', layout: prepaLayout(prepaFormId, prepaFechaId, prepaPlanId, prepaTestimonialsId) as any, meta: { title: 'Preparatoria en Línea - Hybridge', description: 'Haz la prepa en 2 años de la manera más disruptiva.' } } })
    await payload.create({ collection: 'pages', data: { title: 'Ingeniería en Software', slug: 'ingenieria-en-software', layout: swLayout(swFormId, universidadFechaId, swPlanId, universidadTestimonialsId) as any, meta: { title: 'Ingeniería en Software - Hybridge', description: 'El mejor programa de ingeniería para dominar la tecnología.' } } })

    return NextResponse.json({ success: true, message: 'Seeded: home, preparatoria, ingenieria-en-software + forms + fechas-inicio + planes-estudio + testimonios' })
  } catch (error: any) {
    console.error('Seed error:', error)
    const message = error?.message || String(error)
    const stack = process.env.NODE_ENV === 'development' ? error?.stack : undefined
    return NextResponse.json({ success: false, error: message, ...(stack && { stack }) }, { status: 500 })
  }
}
