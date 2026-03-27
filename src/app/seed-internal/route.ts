import { getPayloadClient } from '@/lib/payload'
import { NextResponse } from 'next/server'
import { FACULTY_MEMBERS_SEED } from '@/seedData/facultyMembers'
import {
  modeloEducativoBlock,
  benefitsHybridgeBlock,
  oportunidades2026Block,
  industryLeadersBlock,
  talleresHybridgeBlock,
  hybridgeAppBlock,
  perfilIngresoSoftwareSplitBlock,
  perfilIngresoIASplitBlock,
  perfilIngresoVideojuegosSplitBlock,
  perfilIngresoAdministracionInnovacionSplitBlock,
  perfilIngresoMercadotecniaSplitBlock,
} from '@/seedData/pageBlocksMarketing'
import {
  APRENDE_SOBRE_PROGRAMS_SEED,
  APRENDE_SOBRE_SKILLS_GLOBAL_SLUG,
} from '@/seedData/aprendeSobreSeed'
import { dropLegacyAprendeSobreBeforePayloadInit } from '@/lib/dropLegacyAprendeSobreTables'
import { loadBlogPostsSeedRows } from '@/seedData/blogPosts'
import { legalDefaults } from '@/lib/legalDefaults'
import { WA_CTA_HOME_URL, WA_CTA_PROGRAMS_URL, WA_CTA_ALLIANCE_LANDING_URL } from '@/lib/waCta'
import { ALLIANCE_LANDINGS, ALLIANCE_SLUGS, ALLIANCE_SLUGS_RETIRED } from '@/lib/allianceLandingConfig'
import { PREPA_ALLIANCE_PAGES, PREPA_ALLIANCE_SLUGS } from '@/lib/prepaAllianceConfig'

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

const logosBlock = { blockType: 'logosBar', heading: 'Nuestros estudiantes trabajan en:', logos }
const waBlock = { blockType: 'whatsappBar', text: 'Quiero más información', url: WA, trackId: '' }
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
      { line1: 'Ingeniería en', line2: 'Software', description: 'El mejor programa de ingeniería para las personas que aspiran a dominar el mundo de la tecnología.', imageUrl: IMG('2024/10/pexels-emirhan-albayrak-859465-20291643.jpg'), ctaLabel: 'Más información', ctaUrl: '/ingenieria-en-software', ctaTrackId: 'home-hero-software' },
      { line1: 'Ingeniería en', line2: 'Inteligencia Artificial', description: 'Lidera en el campo de la inteligencia artificial.', imageUrl: IMG('2024/10/j.jpg'), ctaLabel: 'Más información', ctaUrl: '/ingenieria-en-inteligencia-artificial', ctaTrackId: 'home-hero-ia' },
      { line1: 'Ingeniería en Tecnologías', line2: 'Inmersivas y Videojuegos', description: 'Construye mundos virtuales.', imageUrl: IMG('2024/10/j.jpg'), ctaLabel: 'Más información', ctaUrl: '/ingenieria-en-videojuegos', ctaTrackId: 'home-hero-vj' },
      { line1: 'Prepa en', line2: 'Línea', description: 'Haz la prepa en 2 años de la manera más disruptiva que te hayas imaginado con clases en vivo y desde la mejor plataforma educativa del país.', imageUrl: IMG('2024/10/pexels-emirhan-albayrak-859465-20291643.jpg'), ctaLabel: 'Más información', ctaUrl: '/preparatoria', ctaTrackId: 'home-hero-prepa' },
      { line1: 'Licenciatura en', line2: 'Mercadotecnia y Negocios Digitales', description: 'Lidera estrategias innovadoras de marketing digital para la Nueva Economía.', imageUrl: IMG('2024/11/SDFGB@2x.jpg'), ctaLabel: 'Más información', ctaUrl: '/licenciatura-en-mercadotecnia', ctaTrackId: 'home-hero-mkt' },
      { line1: 'Licenciatura en', line2: 'Administración e Innovación', description: 'Aprende a administrar negocios digitales e innovar con las nuevas tecnologías.', imageUrl: IMG('2024/11/sdc-1024x1024.png'), ctaLabel: 'Más información', ctaUrl: '/licenciatura-en-administracion-e-innovacion', ctaTrackId: 'home-hero-admin' },
    ],
  },
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
  hybridgeAppBlock(),
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
  { ...waBlock, trackId: 'home-wa-bar-bottom' },
]

/* ════════ PREPARATORIA (sin bloque modelo educativo; solo en Ingeniería en Software) ════════ */
const prepaSubjects = (names: string[]) => names.map(n => ({ name: n }))
const swSubjects = (names: string[]) => names.map(n => ({ name: n }))
/* Datos de los planes de estudio (colección planes-estudio) */
const prepaPlanData = {
  slug: 'prepa',
  title: 'Preparatoria',
  heading: 'Plan de estudios',
  subheading: '',
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
  subheading: '',
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
const iaPlanData = {
  slug: 'ingenieria-inteligencia-artificial',
  title: 'Ingeniería en Inteligencia Artificial',
  heading: 'Plan de estudios',
  subheading: '',
  description: 'Adquiere las habilidades para destacar en la era digital.',
  semesters: [
    { title: 'PRIMER CUATRIMESTRE', subjects: swSubjects(['Introducción a la Ingeniería en Inteligencia Artificial', 'Experiencia de Usuario', 'Tecnología, Sociedad y Futuros Posibles I', 'Análisis y Diseño de Algoritmos', 'Matemáticas para Ingeniería']) },
    { title: 'SEGUNDO CUATRIMESTRE', subjects: swSubjects(['Fundamentos de Redes Computacionales', 'Probabilidad y Estadística', 'Tecnología, Sociedad y Futuros Posibles II', 'Programación Orientada a Objetos', 'Bases de Datos']) },
    { title: 'TERCER CUATRIMESTRE', subjects: swSubjects(['Cloud Computing y Redes Virtuales', 'Ciencia de Datos', 'Programación Avanzada', 'Álgebra Lineal', 'Persona y Sociedad']) },
    { title: 'CUARTO CUATRIMESTRE', subjects: swSubjects(['Arquitectura y Patrones de Diseño', 'Inteligencia Artificial', 'Fundamentos de Desarrollo Web', 'Cálculo Diferencial', 'Mundo Contemporáneo']) },
    { title: 'QUINTO CUATRIMESTRE', subjects: swSubjects(['Administración de Sistemas Operativos y Servidores', 'Aprendizaje de Máquina', 'Desarrollo Web Back-end', 'Cálculo Integral', 'Comunicación Oral y Escrita']) },
    { title: 'SEXTO CUATRIMESTRE', subjects: swSubjects(['Pruebas Unitarias y Funcionales de Software', 'Sistemas de Aprendizaje Profundo', 'Análisis y Procesamiento de Datos', 'Código Abierto para Inteligencia Artificial', 'Ecuaciones Diferenciales']) },
    { title: 'SÉPTIMO CUATRIMESTRE', subjects: swSubjects(['Herramientas para DevOps', 'Lenguaje Natural', 'Minería de Datos', 'Estadística Bayesiana', 'Derecho en el Mundo Digital']) },
    { title: 'OCTAVO CUATRIMESTRE', subjects: swSubjects(['Arquitectura de Producto', 'Business Intelligence', 'Metodologías y Marcos de Trabajo Ágiles', 'Ética en el Mundo Digital', 'Plan de Vida y Carrera']) },
    { title: 'NOVENO CUATRIMESTRE', subjects: swSubjects(['Seminario']) },
  ],
}
/* Plan alineado con hybridge.education (RVOE 2962); ortografía unificada en español. */
const vjPlanData = {
  slug: 'ingenieria-videojuegos-tecnologias-inmersivas',
  title: 'Ingeniería en Videojuegos y Tecnologías Inmersivas',
  heading: 'Plan de estudios',
  subheading: '',
  description: 'Adquiere las habilidades para destacar en la era digital.',
  semesters: [
    { title: 'PRIMER CUATRIMESTRE', subjects: swSubjects(['Introducción a la Ingeniería en Videojuegos y Tecnologías Inmersivas', 'Experiencia de Usuario', 'Tecnología, Sociedad y Futuros Posibles I', 'Análisis y Diseño de Algoritmos', 'Matemáticas para Ingeniería']) },
    { title: 'SEGUNDO CUATRIMESTRE', subjects: swSubjects(['Fundamentos de Desarrollo de Videojuegos', 'Probabilidad y Estadística', 'Tecnología, Sociedad y Futuros Posibles II', 'Programación Orientada a Objetos', 'Bases de Datos']) },
    { title: 'TERCER CUATRIMESTRE', subjects: swSubjects(['Cloud Computing y Redes Virtuales', 'Efectos Visuales', 'Programación Avanzada', 'Álgebra Lineal', 'Persona y Sociedad']) },
    { title: 'CUARTO CUATRIMESTRE', subjects: swSubjects(['Arquitectura y Patrones de Diseño', 'Diseño de Personajes y Escenarios', 'Fundamentos de Desarrollo Web', 'Cálculo Diferencial', 'Mundo Contemporáneo']) },
    { title: 'QUINTO CUATRIMESTRE', subjects: swSubjects(['Animación en 3D', 'Producción Audiovisual', 'Storytelling', 'Cálculo Integral', 'Comunicación Oral y Escrita']) },
    { title: 'SEXTO CUATRIMESTRE', subjects: swSubjects(['Desarrollo y Comercialización de Videojuegos', 'Gamificación', 'Pruebas Unitarias y Funcionales de Software', 'Optativa', 'Ecuaciones Diferenciales']) },
    { title: 'SÉPTIMO CUATRIMESTRE', subjects: swSubjects(['Realidad Aumentada', 'Computación Gráfica', 'Herramientas para DevOps', 'Optativa', 'Derecho en el Mundo Digital']) },
    { title: 'OCTAVO CUATRIMESTRE', subjects: swSubjects(['Realidad Virtual', 'Optativa', 'Metodologías y Marcos de Trabajo Ágiles', 'Ética en el Mundo Digital', 'Plan de Vida y Carrera']) },
    { title: 'NOVENO CUATRIMESTRE', subjects: swSubjects(['Seminario']) },
  ],
}
/* Plan oficial Lic. Administración e Innovación (RVOE 2961). */
const ladmPlanData = {
  slug: 'licenciatura-administracion-innovacion',
  title: 'Licenciatura en Administración e Innovación',
  heading: 'Plan de estudios',
  subheading: '',
  description: 'Formación en administración, negocios digitales e innovación para la Nueva Economía.',
  semesters: [
    { title: 'PRIMER CUATRIMESTRE', subjects: swSubjects(['Fundamentos de Administración', 'Experiencia de Usuario', 'Tecnología, Sociedad y Futuros Posibles I', 'Taller de Comprensión Lectora', 'Manejo de Datos e Informática']) },
    { title: 'SEGUNDO CUATRIMESTRE', subjects: swSubjects(['Fundamentos de Marketing', 'Comunicación Oral y Escrita', 'Tecnología, Sociedad y Futuros Posibles II', 'Innovación y Creación de Valor', 'Pensamiento Matemático']) },
    { title: 'TERCER CUATRIMESTRE', subjects: swSubjects(['Marketing Digital', 'Diseño de Productos Digitales', 'Persona y Sociedad', 'Contabilidad Financiera', 'Probabilidad y Estadística']) },
    { title: 'CUARTO CUATRIMESTRE', subjects: swSubjects(['Comportamiento Organizacional', 'Economía', 'Mundo Contemporáneo', 'Administración Financiera', 'Algoritmos']) },
    { title: 'QUINTO CUATRIMESTRE', subjects: swSubjects(['Finanzas y Negocios Digitales', 'Estrategia de Negocios', 'Recursos Humanos', 'Derecho Laboral', 'Metodologías y Marcos de Trabajo Ágiles']) },
    { title: 'SEXTO CUATRIMESTRE', subjects: swSubjects(['Emprendimiento', 'Liderazgo', 'Sustentabilidad', 'Derecho en el Mundo Digital', 'Business Intelligence']) },
    { title: 'SÉPTIMO CUATRIMESTRE', subjects: swSubjects(['Casos de Negocios I', 'Ética en el Mundo Digital', 'Optativa', 'Optativa', 'Optativa']) },
    { title: 'OCTAVO CUATRIMESTRE', subjects: swSubjects(['Casos de Negocios II', 'Plan de Vida y Carrera', 'Optativa', 'Optativa', 'Optativa']) },
    { title: 'NOVENO CUATRIMESTRE', subjects: swSubjects(['Seminario']) },
  ],
}
/* Plan Lic. Mercadotecnia (RVOE 3055), alineado con hybridge.education. */
const mercPlanData = {
  slug: 'licenciatura-mercadotecnia-negocios-digitales',
  title: 'Licenciatura en Mercadotecnia y Negocios Digitales',
  heading: 'Plan de estudios',
  subheading: '',
  description: 'Formación en marketing digital, negocios y crecimiento para la Nueva Economía.',
  semesters: [
    { title: 'PRIMER CUATRIMESTRE', subjects: swSubjects(['Fundamentos de Mercadotecnia', 'Experiencia de Usuario', 'Tecnología, Sociedad y Futuros Posibles I', 'Taller de Comprensión Lectora', 'Manejo de Datos e Informática']) },
    { title: 'SEGUNDO CUATRIMESTRE', subjects: swSubjects(['Marketing Digital', 'Comunicación Oral y Escrita', 'Tecnología, Sociedad y Futuros Posibles II', 'Innovación y Creación de Valor', 'Pensamiento Matemático']) },
    { title: 'TERCER CUATRIMESTRE', subjects: swSubjects(['Comportamiento del Consumidor', 'Diseño de Productos Digitales', 'Persona y Sociedad', 'Contabilidad Financiera', 'Probabilidad y Estadística']) },
    { title: 'CUARTO CUATRIMESTRE', subjects: swSubjects(['Optimización y Analítica Web', 'Gestión de Contenidos Digitales', 'Mundo Contemporáneo', 'Administración Financiera', 'Economía']) },
    { title: 'QUINTO CUATRIMESTRE', subjects: swSubjects(['Finanzas y Negocios Digitales', 'Estrategia de Negocios', 'Herramientas para Gestión de Clientes y Ventas', 'Derecho Laboral', 'Metodologías y Marcos de Trabajo Ágiles']) },
    { title: 'SEXTO CUATRIMESTRE', subjects: swSubjects(['Emprendimiento', 'Liderazgo', 'Sustentabilidad', 'Derecho en el Mundo Digital', 'Business Intelligence']) },
    { title: 'SÉPTIMO CUATRIMESTRE', subjects: swSubjects(['Casos de Negocios I', 'Ética en el Mundo Digital', 'Optativa', 'Optativa', 'Optativa']) },
    { title: 'OCTAVO CUATRIMESTRE', subjects: swSubjects(['Casos de Negocios II', 'Plan de Vida y Carrera', 'Optativa', 'Optativa', 'Optativa']) },
    { title: 'NOVENO CUATRIMESTRE', subjects: swSubjects(['Seminario']) },
  ],
}

const prepaLayout = (prepaFormId: string | number, prepaFechaId: string | number, prepaPlanId: string | number, prepaTestimonialsId: string | number) => [
  { blockType: 'heroBanner', heading: 'Prepa en Línea', subheading: 'Haz la prepa en 2 años de la manera más disruptiva que te hayas imaginado con clases en vivo y desde la mejor plataforma educativa del país.', imageUrl: IMG('2024/10/pexels-emirhan-albayrak-859465-20291643.jpg'), ctaLabel: '¡Inscríbete ya!', ctaUrl: '#form-prepa', ctaTrackId: 'prepa-hero-cta' },
  { ...waBlock, trackId: 'prepa-wa-bar' },
  {
    blockType: 'splitContent', eyebrow: 'Sobre Hybridge Prepa', heading: 'PREPARATORIA HYBRIDGE',
    body: 'Hemos creado la mejor preparatoria en línea con enfoque en Nuevas Tecnologías y Emprendimiento que puedes terminar en solo 2 años.\n\nEn Hybridge entendemos que todas las personas somos diferentes y tenemos intereses distintos; por eso hemos creado un modelo flexible y adaptable a cualquier necesidad.',
    imageUrl: IMG('2024/10/pexels-emirhan-albayrak-859465-20291643.jpg'), imagePosition: 'right', backgroundColor: 'white',
    buttons: [{ label: '¡Inscríbete ya!', url: '#form-prepa', variant: 'primary', trackId: 'prepa-about-cta' }],
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
    buttons: [{ label: '¡Inscríbete ya!', url: '#form-prepa', variant: 'primary', trackId: 'prepa-mueve-cta' }],
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
    blockType: 'splitContent', eyebrow: 'ACOMPAÑAMIENTO', heading: 'MENTORES QUE DAN SEGUIMIENTO',
    body: ' ',
    bulletPoints: [
      { text: 'Nuestro equipo de mentores está disponible para resolver cualquier duda que te surja.' },
      { text: 'Sabemos que cada estudiante es único y por lo tanto cada uno tiene su forma particular de aprender. Por eso, parte de nuestra oferta educativa incluye sesiones para resolver dudas en las cuales puedes obtener asesoría directa sobre temas específicos.' },
    ],
    imageUrl: IMG('2024/11/sdc-1024x1024.png'), imagePosition: 'left', backgroundColor: 'cream',
    buttons: [{ label: '¡Inscríbete ya!', url: '#form-prepa', variant: 'primary', trackId: 'prepa-masque-cta' }],
  },
  {
    blockType: 'splitContent',
    eyebrow: 'COMUNIDAD',
    heading: 'EL ESPIRITU HYBRIDGE',
    body: 'En Hybridge, valoramos profundamente la creación de una comunidad inclusiva, donde cada miembro es esencial y cada voz cuenta. Nos esforzamos por cultivar un ambiente donde todos los estudiantes se sientan acogidos, respetados y parte integral de nuestro colectivo educativo.\n\nCreemos firmemente en la inclusión educativa, y nos comprometemos a ofrecer un espacio donde la diversidad es celebrada y donde cada estudiante encuentra su lugar.',
    imageUrl: IMG('2024/11/SDFGB@2x.jpg'),
    imagePosition: 'right',
    backgroundColor: 'white',
    buttons: [{ label: '¡Inscríbete ya!', url: '#form-prepa', variant: 'primary', trackId: 'prepa-comunidad-cta' }],
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
  benefitsHybridgeBlock(),
  { ...waBlock, trackId: 'prepa-wa-bar-bottom' },
]

/* ════════ ING SOFTWARE ════════ */
const swLayout = (swFormId: string | number, universidadFechaId: string | number, swPlanId: string | number, universidadTestimonialsId: string | number) => [
  { blockType: 'heroBanner', heading: 'Ingeniería en Software', subheading: 'El mejor programa para las personas que aspiran a dominar el mundo de la tecnología.', imageUrl: IMG('2024/10/pexels-emirhan-albayrak-859465-20291643.jpg'), ctaLabel: '¡Inscríbete ya!', ctaUrl: '#form-ingenieria-software', ctaTrackId: 'sw-hero-cta' },
  { ...waBlock, trackId: 'sw-wa-bar' },
  modeloEducativoBlock(),
  {
    blockType: 'splitContent', eyebrow: 'Sobre nuestra', heading: 'Ingeniería en Software',
    body: 'Hybridge ofrece una formación completa en ingeniería, nuevas tecnologías y habilidades para la nueva economía.\n\nNuestro programa de Ingeniería en Software cuenta con Reconocimiento de Validez Oficial de Estudios (RVOE), lo cual significa que al graduarte obtendrás tu título oficial de Educación Superior.',
    imageUrl: IMG('2024/10/pexels-emirhan-albayrak-859465-20291643.jpg'), imagePosition: 'right', backgroundColor: 'white',
    buttons: [{ label: '¡Inscríbete ya!', url: '#form-ingenieria-software', variant: 'primary', trackId: 'sw-about-cta' }],
  },
  testimonialsPlanBlock(universidadTestimonialsId),
  oportunidades2026Block(),
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
    buttons: [{ label: '¡Inscríbete ya!', url: '#form-ingenieria-software', variant: 'primary', trackId: 'sw-comunidad-cta' }],
  },
  hybridgeAppBlock(),
  ctaFechaInicio(universidadFechaId, 'sw'),
  talleresHybridgeBlock(),
  curriculumPlanBlock(swPlanId),
  /* Un solo video por página (ingeniería) */
  { blockType: 'videoSection', heading: 'CONOCE MÁS DE NUESTRA INGENIERÍA', youtubeUrl: 'https://youtu.be/-tSOJi573hw', backgroundColor: 'cream' },
  industryLeadersBlock(),
  { blockType: 'formBlock', form: swFormId },
  benefitsHybridgeBlock(),
  perfilIngresoSoftwareSplitBlock(),
  { ...waBlock, trackId: 'sw-wa-bar-bottom' },
]
const iaLayout = (iaFormId: string | number, universidadFechaId: string | number, iaPlanId: string | number, universidadTestimonialsId: string | number) => [
  { blockType: 'heroBanner', heading: 'Ingeniería en\nInteligencia Artificial', subheading: 'Lidera en el campo de la inteligencia artificial', imageUrl: IMG('2024/10/j.jpg'), ctaLabel: '¡Inscríbete ya!', ctaUrl: '#form-ingenieria-inteligencia-artificial', ctaTrackId: 'ia-hero-cta' },
  { ...waBlock, trackId: 'ia-wa-bar' },
  modeloEducativoBlock(),
  {
    blockType: 'splitContent', eyebrow: 'Sobre nuestra', heading: 'Ingeniería en Inteligencia Artificial',
    body: 'Hybridge ofrece una formación completa en ingeniería, nuevas tecnologías y habilidades para la nueva economía.\n\nNuestro programa de Ingeniería en Inteligencia Artificial cuenta con Reconocimiento de Validez Oficial de Estudios (RVOE), lo cual significa que al graduarte obtendrás tu título oficial de Educación Superior.',
    imageUrl: IMG('2024/10/j.jpg'), imagePosition: 'right', backgroundColor: 'white',
    buttons: [{ label: '¡Inscríbete ya!', url: '#form-ingenieria-inteligencia-artificial', variant: 'primary', trackId: 'ia-about-cta' }],
  },
  testimonialsPlanBlock(universidadTestimonialsId),
  oportunidades2026Block(),
  {
    blockType: 'featuresGrid', heading: 'Haz tu ingeniería en solo 3 años', subheading: 'RVOE No. 2960', backgroundColor: 'white',
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
    buttons: [{ label: '¡Inscríbete ya!', url: '#form-ingenieria-inteligencia-artificial', variant: 'primary', trackId: 'ia-comunidad-cta' }],
  },
  hybridgeAppBlock(),
  ctaFechaInicio(universidadFechaId, 'ia'),
  talleresHybridgeBlock(),
  curriculumPlanBlock(iaPlanId),
  { blockType: 'videoSection', heading: 'CONOCE MÁS SOBRE NUESTRA INGENIERÍA', youtubeUrl: 'https://www.youtube.com/watch?v=prfszaQ8GLc', backgroundColor: 'cream' },
  industryLeadersBlock(),
  { blockType: 'formBlock', form: iaFormId },
  benefitsHybridgeBlock(),
  perfilIngresoIASplitBlock(),
  { ...waBlock, trackId: 'ia-wa-bar-bottom' },
]
const vjLayout = (vjFormId: string | number, universidadFechaId: string | number, vjPlanId: string | number, universidadTestimonialsId: string | number) => [
  {
    blockType: 'heroBanner',
    heading: 'Ingeniería en\nVideojuegos y Tecnologías Inmersivas',
    subheading: 'Construye mundos virtuales',
    imageUrl: IMG('2024/10/j.jpg'),
    ctaLabel: '¡Inscríbete ya!',
    ctaUrl: '#form-ingenieria-videojuegos',
    ctaTrackId: 'vj-hero-cta',
  },
  { ...waBlock, trackId: 'vj-wa-bar' },
  modeloEducativoBlock(),
  {
    blockType: 'splitContent',
    eyebrow: 'Sobre nuestra',
    heading: 'Ingeniería en Videojuegos',
    body: 'Hybridge ofrece una formación completa en ingeniería, nuevas tecnologías y habilidades para la nueva economía.\n\nNuestro programa de Ingeniería en Videojuegos y Tecnologías Inmersivas cuenta con Reconocimiento de Validez Oficial de Estudios (RVOE), lo cual significa que al graduarte obtendrás tu título oficial de Educación Superior.',
    imageUrl: IMG('2024/10/j.jpg'),
    imagePosition: 'right',
    backgroundColor: 'white',
    buttons: [{ label: '¡Inscríbete ya!', url: '#form-ingenieria-videojuegos', variant: 'primary', trackId: 'vj-about-cta' }],
  },
  testimonialsPlanBlock(universidadTestimonialsId),
  oportunidades2026Block(),
  {
    blockType: 'featuresGrid',
    heading: 'Haz tu ingeniería en solo 3 años',
    subheading: 'RVOE No. 2962',
    backgroundColor: 'white',
    features: [
      { iconText: '💻', label: 'Modalidad', value: 'En línea' },
      { iconText: '⏳', label: 'Duración', value: '3 años (9 cuatrimestres)' },
      { iconText: '🚀', label: 'Enfoque en', value: 'nuevas Tecnologías y Emprendimiento' },
      { iconText: '✅', label: 'Avalado por la SEP', value: 'Validez oficial' },
    ],
  },
  {
    blockType: 'splitContent',
    eyebrow: 'Comunidad',
    heading: 'Hybridge',
    body: 'Hybridge es mucho más que solo un lugar para aprender tecnología. Al estar comprometidos con la construcción del futuro de la educación, entendemos la relevancia de reinventar las comunidades de aprendizaje.\nEn Hybridge serás parte de un ecosistema que conecta a estudiantes, académicos, innovadores, líderes de la industria, emprendedoras, empresas y fondos de inversión.',
    imageUrl: IMG('2024/11/sdc-1024x1024.png'),
    imagePosition: 'left',
    backgroundColor: 'cream',
    buttons: [{ label: '¡Inscríbete ya!', url: '#form-ingenieria-videojuegos', variant: 'primary', trackId: 'vj-comunidad-cta' }],
  },
  hybridgeAppBlock(),
  ctaFechaInicio(universidadFechaId, 'vj'),
  talleresHybridgeBlock(),
  curriculumPlanBlock(vjPlanId),
  { blockType: 'videoSection', heading: 'CONOCE MÁS SOBRE NUESTRA INGENIERÍA', youtubeUrl: 'https://youtu.be/CyIuRcXmcoU', backgroundColor: 'cream' },
  industryLeadersBlock(),
  { blockType: 'formBlock', form: vjFormId },
  benefitsHybridgeBlock(),
  perfilIngresoVideojuegosSplitBlock(),
  { ...waBlock, trackId: 'vj-wa-bar-bottom' },
]

const LADM_ABOUT_BODY =
  'El programa de Licenciatura en Administración e Innovación es un programa con validez oficial dirigido a personas que buscan desarrollar habilidades para crear valor en la Nueva Economía. Este programa ofrece una formación única en administración, finanzas, emprendimiento, liderazgo y mercadotecnia, combinando estos conocimientos con un sólido entendimiento de los negocios digitales y las nuevas tecnologías.\n\nYa sea que busques trabajar en la industria tecnológica, emprender un negocio o participar en la transformación digital de cualquier industria, este programa te prepara para liderar y gestionar equipos en el dinámico ecosistema digital, promoviendo la innovación y la adaptabilidad en la era de la información.'

const ladmLayout = (
  ladmFormId: string | number,
  universidadFechaId: string | number,
  ladmPlanId: string | number,
  universidadTestimonialsId: string | number,
) => [
  {
    blockType: 'heroBanner',
    heading: 'Licenciatura en\nAdministración e Innovación',
    subheading: 'Aprende a administrar negocios digitales e innovar con las nuevas tecnologías',
    imageUrl: IMG('2024/11/sdc-1024x1024.png'),
    ctaLabel: '¡Inscríbete ya!',
    ctaUrl: '#form-licenciatura-administracion-innovacion',
    ctaTrackId: 'ladm-hero-cta',
  },
  { ...waBlock, trackId: 'ladm-wa-bar' },
  modeloEducativoBlock(),
  {
    blockType: 'splitContent',
    eyebrow: 'Sobre nuestra',
    heading: 'Licenciatura en Administración e Innovación',
    body: LADM_ABOUT_BODY,
    imageUrl: IMG('2024/11/sdc-1024x1024.png'),
    imagePosition: 'right',
    backgroundColor: 'white',
    buttons: [{ label: '¡Inscríbete ya!', url: '#form-licenciatura-administracion-innovacion', variant: 'primary', trackId: 'ladm-about-cta' }],
  },
  testimonialsPlanBlock(universidadTestimonialsId),
  oportunidades2026Block(),
  {
    blockType: 'featuresGrid',
    heading: 'Haz tu licenciatura en sólo 3 años',
    subheading: 'RVOE No. 2961',
    backgroundColor: 'white',
    features: [
      { iconText: '💻', label: 'Modalidad', value: 'En línea' },
      { iconText: '⏳', label: 'Duración', value: '3 años (9 cuatrimestres)' },
      { iconText: '🚀', label: 'Enfoque en', value: 'Administración, innovación y negocios digitales' },
      { iconText: '✅', label: 'Avalado por la SEP', value: 'Validez oficial' },
    ],
  },
  {
    blockType: 'splitContent',
    eyebrow: 'Comunidad',
    heading: 'Hybridge',
    body: 'Hybridge es mucho más que solo un lugar para aprender tecnología. Al estar comprometidos con la construcción del futuro de la educación, entendemos la relevancia de reinventar las comunidades de aprendizaje.\nEn Hybridge serás parte de un ecosistema que conecta a estudiantes, académicos, innovadores, líderes de la industria, emprendedoras, empresas y fondos de inversión.',
    imageUrl: IMG('2024/11/sdc-1024x1024.png'),
    imagePosition: 'left',
    backgroundColor: 'cream',
    buttons: [{ label: '¡Inscríbete ya!', url: '#form-licenciatura-administracion-innovacion', variant: 'primary', trackId: 'ladm-comunidad-cta' }],
  },
  hybridgeAppBlock(),
  ctaFechaInicio(universidadFechaId, 'ladm'),
  talleresHybridgeBlock(),
  curriculumPlanBlock(ladmPlanId),
  {
    blockType: 'videoSection',
    heading: 'CONOCE MÁS SOBRE NUESTRA LICENCIATURA',
    youtubeUrl: 'https://youtu.be/U8I6olwnXCE',
    backgroundColor: 'cream',
  },
  industryLeadersBlock(),
  { blockType: 'formBlock', form: ladmFormId },
  benefitsHybridgeBlock(),
  perfilIngresoAdministracionInnovacionSplitBlock(),
  { ...waBlock, trackId: 'ladm-wa-bar-bottom' },
]

const MERCADOTECNIA_ABOUT_BODY =
  'El programa de Licenciatura en Mercadotecnia y Negocios Digitales es un programa con validez oficial dirigido a personas que buscan liderar estrategias comerciales y de crecimiento en la Nueva Economía. Este programa ofrece una formación innovadora en marketing digital, inteligencia de mercado, liderazgo y emprendimiento, combinando estos conocimientos con un sólido entendimiento de los negocios digitales y las nuevas tecnologías.\n\nYa sea que busques dirigir estrategias de marketing digital, posicionar marcas en entornos virtuales, o emprender un negocio, este programa te prepara para dominar los ecosistemas digitales para impulsar el crecimiento comercial e innovación en un mundo cada vez más conectado'

/* Misma secuencia que Ingeniería en Software; textos y plan propios de Mercadotecnia. */
const mercLayout = (
  mercFormId: string | number,
  universidadFechaId: string | number,
  mercPlanId: string | number,
  universidadTestimonialsId: string | number,
) => [
  {
    blockType: 'heroBanner',
    heading: 'Licenciatura en\nMercadotecnia y Negocios Digitales',
    subheading: 'Lidera estrategias innovadoras de marketing digital para la Nueva Economía',
    imageUrl: IMG('2024/10/pexels-emirhan-albayrak-859465-20291643.jpg'),
    ctaLabel: '¡Inscríbete ya!',
    ctaUrl: '#form-licenciatura-mercadotecnia-negocios-digitales',
    ctaTrackId: 'merc-hero-cta',
  },
  { ...waBlock, trackId: 'merc-wa-bar' },
  modeloEducativoBlock(),
  {
    blockType: 'splitContent',
    eyebrow: 'Sobre nuestra',
    heading: 'Licenciatura en Mercadotecnia y Negocios Digitales',
    body: MERCADOTECNIA_ABOUT_BODY,
    imageUrl: IMG('2024/10/pexels-emirhan-albayrak-859465-20291643.jpg'),
    imagePosition: 'right',
    backgroundColor: 'white',
    buttons: [{ label: '¡Inscríbete ya!', url: '#form-licenciatura-mercadotecnia-negocios-digitales', variant: 'primary', trackId: 'merc-about-cta' }],
  },
  testimonialsPlanBlock(universidadTestimonialsId),
  oportunidades2026Block(),
  {
    blockType: 'featuresGrid',
    heading: 'Haz tu licenciatura en sólo 3 años',
    subheading: 'RVOE No. 3055',
    backgroundColor: 'white',
    features: [
      { iconText: '💻', label: 'Modalidad', value: 'En línea' },
      { iconText: '⏳', label: 'Duración', value: '3 años (9 cuatrimestres)' },
      { iconText: '🚀', label: 'Enfoque en', value: 'nuevas Tecnologías y Emprendimiento' },
      { iconText: '✅', label: 'Avalado por la SEP', value: 'Validez oficial' },
    ],
  },
  {
    blockType: 'splitContent',
    eyebrow: 'Comunidad',
    heading: 'Hybridge',
    body: 'Hybridge es mucho más que solo un lugar para aprender tecnología. Al estar comprometidos con la construcción del futuro de la educación, entendemos la relevancia de reinventar las comunidades de aprendizaje.\nEn Hybridge serás parte de un ecosistema que conecta a estudiantes, académicos, innovadores, líderes de la industria, emprendedoras, empresas y fondos de inversión.',
    imageUrl: IMG('2024/11/sdc-1024x1024.png'),
    imagePosition: 'left',
    backgroundColor: 'cream',
    buttons: [{ label: '¡Inscríbete ya!', url: '#form-licenciatura-mercadotecnia-negocios-digitales', variant: 'primary', trackId: 'merc-comunidad-cta' }],
  },
  hybridgeAppBlock(),
  ctaFechaInicio(universidadFechaId, 'merc'),
  talleresHybridgeBlock(),
  curriculumPlanBlock(mercPlanId),
  { blockType: 'videoSection', heading: 'CONOCE MÁS SOBRE NUESTRA LICENCIATURA', youtubeUrl: 'https://youtu.be/8T5tlcb4jJo', backgroundColor: 'cream' },
  industryLeadersBlock(),
  { blockType: 'formBlock', form: mercFormId },
  benefitsHybridgeBlock(),
  perfilIngresoMercadotecniaSplitBlock(),
  { ...waBlock, trackId: 'merc-wa-bar-bottom' },
]

/* ════════ EXPERIENCIA HYBRIDGE (marketing / Hub) ════════ */
const experienciaHybridgeLayout = () => [
  {
    blockType: 'videoSection',
    heading: 'CONOCE NUESTRO HUB',
    subheading: 'Experiencia Hybridge',
    youtubeUrl: 'https://www.youtube.com/watch?v=rwVpq7ibMbk',
    backgroundColor: 'cream',
  },
  { ...waBlock, trackId: 'exp-wa-bar-top' },
  {
    blockType: 'splitContent',
    eyebrow: 'CONOCE NUESTRO HUB',
    heading: 'Llevamos estudiar en línea al siguiente nivel',
    body: 'Estudia prepa y universidad en línea dentro de un ecosistema digital propio: clases en vivo con expertos, contenido disponible siempre y una experiencia que se adapta a ti.',
    imageUrl: IMG('2024/11/sdc-1024x1024.png'),
    imagePosition: 'right',
    backgroundColor: 'white',
  },
  {
    blockType: 'pillarsGrid',
    backgroundColor: 'cream',
    pillars: [
      {
        title: 'Hybridge Meet',
        description:
          'Conéctate a clases en vivo con expertos de la industria. Participa, pregunta y aprende en tiempo real en sesiones dinámicas que combinan lo mejor de la educación presencial con la flexibilidad digital.',
        icon: '💻',
      },
      {
        title: 'Hybridge App',
        description:
          'Tu experiencia de estudio en la palma de tu mano. Accede a tus clases, actividades y contenidos desde cualquier lugar, en cualquier momento. Estudiar en línea ahora se adapta completamente a tu ritmo y estilo de vida.',
        icon: '📱',
      },
      {
        title: 'Hybridge Cloud',
        description:
          'Nunca pierdes una clase. Todas tus sesiones en vivo se almacenan automáticamente para que puedas repetirlas, repasarlas o estudiarlas cuando quieras, desde donde quieras.',
        icon: '☁️',
      },
    ],
  },
  hybridgeAppBlock(),
  {
    blockType: 'splitContent',
    eyebrow: 'Todo en un',
    heading: 'solo lugar',
    body: 'Nuestro Hub reúne todo lo que necesitas para estudiar en línea: clases en vivo, contenidos, asesorías y evaluaciones dentro de una sola plataforma.\n\nUna experiencia continua, simple y poderosa para estudiar prepa en línea o universidad en línea sin fricciones.',
    imageUrl: IMG('2024/11/SDFGB@2x.jpg'),
    imagePosition: 'left',
    backgroundColor: 'white',
    buttons: [{ label: 'Habla con un asesor', url: WA_ASES, variant: 'primary', trackId: 'exp-todo-asesor' }],
  },
  {
    blockType: 'splitContent',
    eyebrow: 'Integraciones',
    heading: 'únicas',
    body: 'Sabemos que usar mil herramientas separadas rompe el aprendizaje. Por eso, el Hub reúne todo: video, calendario, chat, contenidos y evaluaciones. Más interacción, inmersión y colaboración en un solo flujo.',
    imageUrl: IMG('2024/10/pexels-emirhan-albayrak-859465-20291643.jpg'),
    imagePosition: 'left',
    backgroundColor: 'cream',
    buttons: [{ label: 'Habla con un asesor', url: WA_ASES, variant: 'primary', trackId: 'exp-integraciones-asesor' }],
  },
  {
    blockType: 'splitContent',
    eyebrow: 'Los pilares de nuestra experiencia',
    heading: 'Colaboración, interacción, inmersión y adaptación',
    body: 'Así vivimos la experiencia en Hybridge:',
    imageUrl: IMG('2024/11/sdc-1024x1024.png'),
    imagePosition: 'right',
    backgroundColor: 'white',
    bulletPoints: [
      { text: 'Colaboración: trabajas con tu grupo y profes en tiempo real.' },
      { text: 'Interacción: actividades y contenidos que te piden participar.' },
      { text: 'Inmersión: media, proyectos y retos con sentido.' },
      { text: 'Adaptación: el Hub se ajusta a tu ritmo y objetivos.' },
    ],
  },
  { ...waBlock, trackId: 'exp-wa-bar-bottom' },
]

export async function GET() {
  try {
    await dropLegacyAprendeSobreBeforePayloadInit(process.env.DATABASE_URL || '')
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
        hint: 'Si la tabla no existe: reinicia el servidor (npm run dev), abre http://localhost:3000/admin para que Payload cree las tablas, luego ejecuta de nuevo /seed',
      }, { status: 500 })
    }

    // Ensure forms exist (prepa, ingeniería×3, licenciaturas, alianzas)
    let prepaFormId: string | number
    let swFormId: string | number
    let iaFormId: string | number
    let vjFormId: string | number
    let ladmFormId: string | number
    let mercFormId: string | number
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
    const iaFormRes = await payload.find({ collection: 'forms', where: { slug: { equals: 'ingenieria-inteligencia-artificial' } }, limit: 1 })
    if (iaFormRes.docs.length) {
      iaFormId = iaFormRes.docs[0].id
    } else {
      const created = await payload.create({
        collection: 'forms',
        data: {
          title: 'Ingeniería en Inteligencia Artificial',
          slug: 'ingenieria-inteligencia-artificial',
          showWhatsAppConsent: true,
          successMessage: 'Gracias. Nos pondremos en contacto contigo pronto.',
        },
      })
      iaFormId = created.id
    }
    const vjFormRes = await payload.find({ collection: 'forms', where: { slug: { equals: 'ingenieria-videojuegos' } }, limit: 1 })
    if (vjFormRes.docs.length) {
      vjFormId = vjFormRes.docs[0].id
    } else {
      const created = await payload.create({
        collection: 'forms',
        data: {
          title: 'Ingeniería en Videojuegos y Tecnologías Inmersivas',
          slug: 'ingenieria-videojuegos',
          showWhatsAppConsent: true,
          successMessage: 'Gracias. Nos pondremos en contacto contigo pronto.',
        },
      })
      vjFormId = created.id
    }
    const ladmFormRes = await payload.find({
      collection: 'forms',
      where: { slug: { equals: 'licenciatura-administracion-innovacion' } },
      limit: 1,
    })
    if (ladmFormRes.docs.length) {
      ladmFormId = ladmFormRes.docs[0].id
    } else {
      const created = await payload.create({
        collection: 'forms',
        data: {
          title: 'Licenciatura en Administración e Innovación',
          slug: 'licenciatura-administracion-innovacion',
          showWhatsAppConsent: true,
          successMessage: 'Gracias. Nos pondremos en contacto contigo pronto.',
        },
      })
      ladmFormId = created.id
    }
    const mercFormRes = await payload.find({
      collection: 'forms',
      where: { slug: { equals: 'licenciatura-mercadotecnia-negocios-digitales' } },
      limit: 1,
    })
    if (mercFormRes.docs.length) {
      mercFormId = mercFormRes.docs[0].id
    } else {
      const created = await payload.create({
        collection: 'forms',
        data: {
          title: 'Licenciatura en Mercadotecnia y Negocios Digitales',
          slug: 'licenciatura-mercadotecnia-negocios-digitales',
          showWhatsAppConsent: true,
          successMessage: 'Gracias. Nos pondremos en contacto contigo pronto.',
        },
      })
      mercFormId = created.id
    }

    const alianzaFormRes = await payload.find({ collection: 'forms', where: { slug: { equals: 'todos-por-programas' } }, limit: 1 })
    if (alianzaFormRes.docs.length) {
      // ya existe
    } else {
      const created = await payload.create({
        collection: 'forms',
        data: {
          title: 'Todos por programas',
          slug: 'todos-por-programas',
          showWhatsAppConsent: true,
          successMessage: 'Gracias. Nos pondremos en contacto contigo pronto.',
        },
      })
      void created.id
    }
    try {
      const legacyDemo = await payload.find({
        collection: 'forms',
        where: { slug: { equals: 'experiencia-hybridge-demo' } },
        limit: 100,
      })
      for (const doc of legacyDemo.docs) {
        try {
          const subs = await payload.find({
            collection: 'form-submissions',
            where: { form: { equals: doc.id } },
            limit: 500,
          })
          for (const sub of subs.docs) {
            try {
              await payload.delete({ collection: 'form-submissions', id: sub.id })
            } catch {
              /* idempotente */
            }
          }
          await payload.delete({ collection: 'forms', id: doc.id })
        } catch {
          /* idempotente */
        }
      }
    } catch {
      /* colección forms ausente */
    }

    // Ensure Planes de estudio exist (prepa, ingenierías, videojuegos, licenciaturas)
    let prepaPlanId: string | number
    let swPlanId: string | number
    let iaPlanId: string | number
    let vjPlanId: string | number
    let ladmPlanId: string | number
    let mercPlanId: string | number
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
    const iaPlanRes = await payload.find({ collection: 'planes-estudio', where: { slug: { equals: 'ingenieria-inteligencia-artificial' } }, limit: 1 })
    if (iaPlanRes.docs.length) {
      iaPlanId = iaPlanRes.docs[0].id
      await payload.update({ collection: 'planes-estudio', id: iaPlanId, data: iaPlanData as any })
    } else {
      const created = await payload.create({
        collection: 'planes-estudio',
        data: iaPlanData as any,
      })
      iaPlanId = created.id
    }
    const vjPlanRes = await payload.find({
      collection: 'planes-estudio',
      where: { slug: { equals: 'ingenieria-videojuegos-tecnologias-inmersivas' } },
      limit: 1,
    })
    if (vjPlanRes.docs.length) {
      vjPlanId = vjPlanRes.docs[0].id
      await payload.update({ collection: 'planes-estudio', id: vjPlanId, data: vjPlanData as any })
    } else {
      const created = await payload.create({
        collection: 'planes-estudio',
        data: vjPlanData as any,
      })
      vjPlanId = created.id
    }
    const ladmPlanRes = await payload.find({
      collection: 'planes-estudio',
      where: { slug: { equals: 'licenciatura-administracion-innovacion' } },
      limit: 1,
    })
    if (ladmPlanRes.docs.length) {
      ladmPlanId = ladmPlanRes.docs[0].id
      await payload.update({ collection: 'planes-estudio', id: ladmPlanId, data: ladmPlanData as any })
    } else {
      const created = await payload.create({
        collection: 'planes-estudio',
        data: ladmPlanData as any,
      })
      ladmPlanId = created.id
    }
    const mercPlanRes = await payload.find({
      collection: 'planes-estudio',
      where: { slug: { equals: 'licenciatura-mercadotecnia-negocios-digitales' } },
      limit: 1,
    })
    if (mercPlanRes.docs.length) {
      mercPlanId = mercPlanRes.docs[0].id
      await payload.update({ collection: 'planes-estudio', id: mercPlanId, data: mercPlanData as any })
    } else {
      const created = await payload.create({
        collection: 'planes-estudio',
        data: mercPlanData as any,
      })
      mercPlanId = created.id
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
              hint: 'Quita push: false en payload.config.ts, reinicia el servidor, abre /admin para que se creen las tablas, vuelve a poner push: false y ejecuta GET /seed.',
              detail: createErr?.message,
            }, { status: 503 })
          }
        } else {
          return NextResponse.json({
            success: false,
            error: 'La tabla "testimonios" no existe en la base de datos.',
            hint: 'Quita push: false en payload.config.ts, reinicia el servidor, abre http://localhost:3000/admin, vuelve a poner push: false y ejecuta GET /seed.',
          }, { status: 503 })
        }
      } else {
        throw testimoniosErr
      }
    }

    // Ensure faculty members exist (all teachers + program assignments)
    for (const member of FACULTY_MEMBERS_SEED) {
      const existingRes = await payload.find({
        collection: 'faculty-members',
        where: { slug: { equals: member.slug } },
        limit: 1,
      })

      const programs = member.programs.map((p) => ({ program: p }))
      const data = {
        ...member,
        programs,
      } as any

      if (existingRes.docs.length) {
        await payload.update({
          collection: 'faculty-members',
          id: existingRes.docs[0].id,
          data,
        })
      } else {
        await payload.create({
          collection: 'faculty-members',
          data,
        })
      }
    }

    const allowedFacultySlugs = new Set(FACULTY_MEMBERS_SEED.map((m) => m.slug))
    try {
      const strayFaculty = await payload.find({ collection: 'faculty-members', limit: 1000, depth: 0 })
      for (const doc of strayFaculty.docs) {
        const s = doc.slug != null ? String(doc.slug) : ''
        if (s && !allowedFacultySlugs.has(s)) {
          try {
            await payload.delete({ collection: 'faculty-members', id: doc.id })
          } catch {
            /* idempotente: ya eliminado */
          }
        }
      }
    } catch (_) {
      /* colección ausente o error de esquema: no bloquear el seed */
    }

    // Delete existing pages with these slugs
    for (const slug of [
      'home',
      ...ALLIANCE_SLUGS,
      ...ALLIANCE_SLUGS_RETIRED,
      ...PREPA_ALLIANCE_SLUGS,
      'preparatoria',
      'ingenieria-en-software',
      'ingenieria-en-inteligencia-artificial',
      'ingenieria-en-videojuegos',
      'licenciatura-en-administracion-e-innovacion',
      'licenciatura-en-administracion-e-innovacion-tk',
      'licenciatura-en-administracion-e-innovacion-yt',
      'licenciatura-en-mercadotecnia',
      'experiencia-hybridge',
    ]) {
      const existing = await payload.find({ collection: 'pages', where: { slug: { equals: slug } }, limit: 100 })
      for (const doc of existing.docs) {
        try {
          await payload.delete({ collection: 'pages', id: doc.id })
        } catch {
          /* idempotente: borradores/versiones o ya eliminado */
        }
      }
    }

    await payload.create({ collection: 'pages', data: { title: 'Inicio', slug: 'home', layout: homeLayout(universidadFechaId, universidadTestimonialsId) as any, meta: { title: 'Hybridge Education - La mejor escuela en línea', description: 'Preparatoria y universidad en línea con validez oficial.' } } })
    for (const a of ALLIANCE_LANDINGS) {
      await payload.create({
        collection: 'pages',
        data: {
          title: a.title,
          pageType: 'alliance',
          slug: a.slug,
          layout: homeLayout(universidadFechaId, universidadTestimonialsId) as any,
          meta: {
            title: `${a.title} - Hybridge`,
            description: `Landing de alianza ${a.slug}.`,
          },
        },
      })
    }
    for (const p of PREPA_ALLIANCE_PAGES) {
      await payload.create({
        collection: 'pages',
        data: {
          title: p.title,
          pageType: 'main',
          slug: p.slug,
          layout: prepaLayout(prepaFormId, prepaFechaId, prepaPlanId, prepaTestimonialsId) as any,
          meta: {
            title: `${p.title} - Hybridge`,
            description: 'Preparatoria en línea — alianza Hybridge.',
          },
        },
      })
    }
    await payload.create({ collection: 'pages', data: { title: 'Preparatoria', slug: 'preparatoria', layout: prepaLayout(prepaFormId, prepaFechaId, prepaPlanId, prepaTestimonialsId) as any, meta: { title: 'Preparatoria en Línea - Hybridge', description: 'Haz la prepa en 2 años de la manera más disruptiva.' } } })
    await payload.create({ collection: 'pages', data: { title: 'Ingeniería en Software', slug: 'ingenieria-en-software', layout: swLayout(swFormId, universidadFechaId, swPlanId, universidadTestimonialsId) as any, meta: { title: 'Ingeniería en Software - Hybridge', description: 'El mejor programa de ingeniería para dominar la tecnología.' } } })
    await payload.create({ collection: 'pages', data: { title: 'Ingeniería en Inteligencia Artificial', slug: 'ingenieria-en-inteligencia-artificial', layout: iaLayout(iaFormId, universidadFechaId, iaPlanId, universidadTestimonialsId) as any, meta: { title: 'Ingeniería en Inteligencia Artificial - Hybridge', description: 'Lidera en el campo de la inteligencia artificial.' } } })
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Ingeniería en Videojuegos y Tecnologías Inmersivas',
        slug: 'ingenieria-en-videojuegos',
        layout: vjLayout(vjFormId, universidadFechaId, vjPlanId, universidadTestimonialsId) as any,
        meta: {
          title: 'Ingeniería en Videojuegos y Tecnologías Inmersivas - Hybridge',
          description: 'Construye mundos virtuales.',
        },
      },
    })
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Licenciatura en Administración e Innovación',
        slug: 'licenciatura-en-administracion-e-innovacion',
        layout: ladmLayout(ladmFormId, universidadFechaId, ladmPlanId, universidadTestimonialsId) as any,
        meta: {
          title: 'Licenciatura en Administración e Innovación - Hybridge',
          description: 'Aprende a administrar negocios digitales e innovar con las nuevas tecnologías.',
        },
      },
    })
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Licenciatura en Mercadotecnia y Negocios Digitales',
        slug: 'licenciatura-en-mercadotecnia',
        layout: mercLayout(mercFormId, universidadFechaId, mercPlanId, universidadTestimonialsId) as any,
        meta: {
          title: 'Licenciatura en Mercadotecnia y Negocios Digitales - Hybridge',
          description: 'Lidera estrategias innovadoras de marketing digital para la Nueva Economía.',
        },
      },
    })
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Experiencia Hybridge',
        slug: 'experiencia-hybridge',
        layout: experienciaHybridgeLayout() as any,
        meta: {
          title: 'Experiencia Hybridge - Hybridge',
          description:
            'Haz la prepa o la universidad en línea con la experiencia más conectada y flexible: Hybridge Meet, Calendario, Cloud y un solo Hub.',
        },
      },
    })

    try {
      await payload.updateGlobal({ slug: 'footer', data: { tagline: 'La mejor escuela en línea para tecnologías digitales.' } as any })
      await payload.updateGlobal({ slug: 'footer', locale: 'en', data: { tagline: 'The best online school for digital technologies.' } as any })
    } catch (_) {
      // Footer global may not exist yet; schema default will apply on first create
    }

    try {
      await payload.updateGlobal({
        slug: 'studentsWorkWith',
        locale: 'es',
        data: {
          heading: 'Nuestros estudiantes trabajan en:',
          logos: logos.map((l: any) => ({ name: l.name, imageUrl: l.imageUrl })),
        } as any,
      })
      await payload.updateGlobal({
        slug: 'studentsWorkWith',
        locale: 'en',
        data: {
          heading: 'Nuestros estudiantes trabajan en:',
          logos: logos.map((l: any) => ({ name: l.name, imageUrl: l.imageUrl })),
        } as any,
      })
    } catch (_) {}

    try {
      const existing = await payload.find({ collection: 'wa-cta', limit: 100, depth: 0 })
      for (const doc of existing.docs) {
        await payload.delete({ collection: 'wa-cta', id: doc.id })
      }
      const programPageKeys = [
        'preparatoria',
        'ingenieria-en-software',
        'ingenieria-en-inteligencia-artificial',
        'ingenieria-en-videojuegos',
        'licenciatura-en-administracion-e-innovacion',
        'licenciatura-en-mercadotecnia',
        'experiencia-hybridge',
      ]
      await payload.create({ collection: 'wa-cta', data: { pageKey: 'global', url: WA_CTA_HOME_URL } as any })
      await payload.create({ collection: 'wa-cta', data: { pageKey: 'home', url: WA_CTA_HOME_URL } as any })
      for (const pageKey of programPageKeys) {
        await payload.create({ collection: 'wa-cta', data: { pageKey, url: WA_CTA_PROGRAMS_URL } as any })
      }
      for (const a of ALLIANCE_LANDINGS) {
        await payload.create({
          collection: 'wa-cta',
          data: { pageKey: a.slug, url: WA_CTA_ALLIANCE_LANDING_URL } as any,
        })
      }
      for (const p of PREPA_ALLIANCE_PAGES) {
        await payload.create({
          collection: 'wa-cta',
          data: { pageKey: p.slug, url: WA_CTA_PROGRAMS_URL } as any,
        })
      }
    } catch (_) {
      // best-effort
    }

    try {
      await payload.updateGlobal({
        slug: 'legal',
        locale: 'es',
        data: {
          avisoDePrivacidad: {
            title: legalDefaults.avisoDePrivacidad.title,
            markdown: legalDefaults.avisoDePrivacidad.markdown,
          },
          termsAndConditions: {
            title: legalDefaults.termsAndConditions.title,
            markdown: legalDefaults.termsAndConditions.markdown,
          },
          rvoes: {
            title: legalDefaults.rvoes.title,
            markdown: legalDefaults.rvoes.markdown,
          },
          terminosYCondicionesAlianzas: {
            title: legalDefaults.terminosYCondicionesAlianzas.title,
            markdown: legalDefaults.terminosYCondicionesAlianzas.markdown,
          },
        } as any,
      })
    } catch (_) {
      // best-effort
    }

    try {
      await payload.updateGlobal({
        slug: APRENDE_SOBRE_SKILLS_GLOBAL_SLUG,
        data: APRENDE_SOBRE_PROGRAMS_SEED as any,
      })
    } catch (err) {
      console.error('Seed aprendeSobreSkills error:', err)
    }

    try {
      const blogRows = loadBlogPostsSeedRows()
      const allowedBlogSlugs = new Set(blogRows.map((r) => r.slug))
      const allBlog = await payload.find({ collection: 'blog-posts', limit: 500, depth: 0 })
      for (const doc of allBlog.docs) {
        const s = doc.slug != null ? String(doc.slug) : ''
        if (s && !allowedBlogSlugs.has(s)) {
          try {
            await payload.delete({ collection: 'blog-posts', id: doc.id })
          } catch {
            /* idempotente */
          }
        }
      }
      for (const row of blogRows) {
        const existing = await payload.find({ collection: 'blog-posts', where: { slug: { equals: row.slug } }, limit: 1 })
        const data = {
          slug: row.slug,
          title: { es: row.titleEs, en: row.titleEn },
          publishedAt: row.publishedAt,
          authorName: { es: row.authorName, en: row.authorName },
          contentType: row.contentType,
          featured: row.featured,
          featuredImageUrl: row.featuredImageUrl,
          metaDescription: { es: row.metaDescriptionEs, en: row.metaDescriptionEn },
          bodyMarkdown: { es: row.bodyMarkdownEs, en: row.bodyMarkdownEn },
        }
        if (existing.docs.length) {
          await payload.update({ collection: 'blog-posts', id: existing.docs[0].id, data: data as any })
        } else {
          await payload.create({ collection: 'blog-posts', data: data as any })
        }
      }
    } catch (blogErr) {
      console.error('Seed blog-posts error:', blogErr)
    }

    return NextResponse.json({
      success: true,
      message:
        'Seeded: home, preparatoria, ingenierías, ingenieria-en-videojuegos, licenciaturas (administración, mercadotecnia), experiencia-hybridge, blog (47 entradas WP) + forms + fechas-inicio + planes-estudio + testimonios',
    })
  } catch (error: any) {
    console.error('Seed error:', error)
    const message = error?.message || String(error)
    const stack = process.env.NODE_ENV === 'development' ? error?.stack : undefined
    return NextResponse.json({ success: false, error: message, ...(stack && { stack }) }, { status: 500 })
  }
}
