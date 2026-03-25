import type { FacultyProgram } from '@/collections/FacultyMembers'

export type FacultyMemberSeed = {
  slug: string
  name: string
  specialization: string
  linkedInUrl?: string
  avatarUrl?: string
  workplaceLogoUrl?: string
  formation?: string
  subjects?: { text: string }[]
  description?: string
  hobbies?: { text: string }[]
  programs: FacultyProgram[]
}

const DEFAULT_EXPERTISE = 'Especialidad por confirmar'
const DEFAULT_LOGO_URL = '/Logo_blanco.png'

const LINKEDIN_URL = 'https://www.linkedin.com/in/sebastian-mathus-273342149/'
const GENERIC_DESCRIPTION =
  'En Hybridge Education acompaño a los estudiantes con una guía práctica y seguimiento cercano para que avancen con confianza en su proceso de aprendizaje.'

const PREPA_SPECIALIZATIONS = [
  'Especialista Hybridge en Educación Digital',
  'Especialista Hybridge en Humanidades y Comunicación',
  'Especialista Hybridge en Estrategias de Aprendizaje',
  'Especialista Hybridge en Tutoría Académica',
  'Especialista Hybridge en Escritura y Pensamiento Crítico',
]

const SW_SPECIALIZATIONS = [
  'Especialista Hybridge en Desarrollo de Software',
  'Especialista Hybridge en Ingeniería de Software',
  'Especialista Hybridge en Estructuras de Datos',
  'Especialista Hybridge en Bases de Datos y Analítica',
  'Especialista Hybridge en Ciberseguridad (fundamentos)',
]

const PREPA_FORMATION_WITH_MASTER = [
  'Licenciatura en Educación • Maestría en Tecnología Educativa • Formación con Hybridge Education (Mentoría Académica)',
  'Licenciatura en Psicopedagogía • Maestría en Innovación Educativa • Formación con Hybridge Education (Acompañamiento y seguimiento)',
  'Licenciatura en Pedagogía • Maestría en Diseño Instruccional • Formación con Hybridge Education (Aprendizaje práctico)',
]

const PREPA_FORMATION_ONLY_BACHELOR = [
  'Licenciatura en Educación • Formación con Hybridge Education (Pedagogía Digital y acompañamiento)',
  'Licenciatura en Comunicación/Humanidades • Formación con Hybridge Education (Estrategias de aprendizaje y tutoría)',
  'Licenciatura en Ciencias Sociales • Formación con Hybridge Education (Pensamiento crítico y mejora continua)',
]

const SW_FORMATION_WITH_MASTER = [
  'Ingeniería en Software/Sistemas • Maestría en Ciencia de Datos • Formación con Hybridge Education (Analítica para aprendizaje)',
  'Ingeniería en Computación • Maestría en Ingeniería de Software • Formación con Hybridge Education (Calidad y patrones)',
  'Ingeniería en Ciencias de la Computación • Maestría en Seguridad • Formación con Hybridge Education (Ciberseguridad aplicada)',
]

const SW_FORMATION_ONLY_ENGINEERING = [
  'Ingeniería en Sistemas Computacionales • Formación con Hybridge Education (Arquitectura de plataformas)',
  'Ingeniería en Tecnologías de la Información • Formación con Hybridge Education (Desarrollo y pruebas)',
  'Ingeniería en Software • Formación con Hybridge Education (Buenas prácticas y entregables)',
]

const SW_FORMATION_ONLY_LIC = [
  'Licenciatura en Ciencias de la Computación • Formación con Hybridge Education (Fundamentos y proyectos)',
  'Licenciatura en Informática • Formación con Hybridge Education (Programación aplicada)',
  'Licenciatura en Matemáticas Aplicadas • Formación con Hybridge Education (Pensamiento lógico para software)',
]

const HOBBIES_POOL = [
  'Ajedrez ♟️',
  'Fotografía 📷',
  'Lectura 📚',
  'Ciclismo 🚴‍♂️',
  'Cocina 🍳',
  'Yoga 🧘‍♀️',
  'Música 🎸',
  'Programación creativa 💻',
  'Viajar ✈️',
  'Cine 🎬',
  'Artes visuales 🎨',
  'Senderismo 🌲',
  'Robótica 🤖',
  'Escritura ✍️',
  'Voluntariado 🤝',
]

function hashString(input: string) {
  let h = 0
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) | 0
  return Math.abs(h)
}

function pickHobbies(seed: string) {
  const h = hashString(seed)
  const count = (h % 2) + 2 // 2 o 3
  const out: { text: string }[] = []
  const used = new Set<number>()

  for (let i = 0; out.length < count; i++) {
    const idx = (h + i * 7) % HOBBIES_POOL.length
    if (used.has(idx)) continue
    used.add(idx)
    out.push({ text: HOBBIES_POOL[idx] })
  }

  return out
}

const FACULTY_MEMBERS_BASE_SEED: FacultyMemberSeed[] = [
  // Nota: aquí conservamos `slug`, `name`, `avatarUrl` y `programs`.
  // Luego generamos especialidad/formación/descripción/hobbies dummy de forma determinista.
  // PREPARATORIA
  {
    slug: 'nora-smith',
    name: 'Nora Smith',
    specialization: 'Inglés',
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/02/Imagenhy-nora-smith-bk-24.jpg',
    workplaceLogoUrl: DEFAULT_LOGO_URL,
    formation: '',
    subjects: [],
    description: '',
    hobbies: [],
    programs: ['preparatoria'],
  },
  {
    slug: 'vania-banuelos',
    name: 'Vania Bañuelos',
    specialization: 'Humanidades',
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/02/hy-vania-banuelos-ft-24.png',
    workplaceLogoUrl: DEFAULT_LOGO_URL,
    formation: '',
    subjects: [],
    description: '',
    hobbies: [],
    programs: ['preparatoria'],
  },
  {
    slug: 'marcela-valadez',
    name: 'Marcela Valadez',
    specialization: 'Humanidades',
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/02/hy-marcela-villegas-ft-ft24.jpg',
    workplaceLogoUrl: DEFAULT_LOGO_URL,
    formation: '',
    subjects: [],
    description: '',
    hobbies: [],
    programs: ['preparatoria'],
  },
  {
    slug: 'david-llanes',
    name: 'David Llanes',
    specialization: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2023/08/Imagen-David.jpg',
    workplaceLogoUrl: DEFAULT_LOGO_URL,
    formation: '',
    subjects: [],
    description: '',
    hobbies: [],
    programs: ['preparatoria'],
  },
  {
    slug: 'ximena-pinacho',
    name: 'Ximena Pinacho',
    specialization: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2025/02/ximena_pinacho.png',
    workplaceLogoUrl: DEFAULT_LOGO_URL,
    formation: '',
    subjects: [],
    description: '',
    hobbies: [],
    programs: ['preparatoria'],
  },
  {
    slug: 'gabriel-arrechea',
    name: 'Gabriel Arrechea',
    specialization: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2023/09/Gabriel-Arrechea-hy.jpg',
    workplaceLogoUrl: DEFAULT_LOGO_URL,
    formation: '',
    subjects: [],
    description: '',
    hobbies: [],
    programs: ['preparatoria'],
  },
  {
    slug: 'gabriel-andrade',
    name: 'Gabriel Andrade',
    specialization: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2023/09/Gabriel-Andrade-hy.jpg',
    workplaceLogoUrl: DEFAULT_LOGO_URL,
    formation: '',
    subjects: [],
    description: '',
    hobbies: [],
    programs: ['preparatoria'],
  },
  {
    slug: 'diego-preza',
    name: 'Diego Preza',
    specialization: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/10/hy-diego-preza.png',
    workplaceLogoUrl: DEFAULT_LOGO_URL,
    formation: '',
    subjects: [],
    description: '',
    hobbies: [],
    programs: ['preparatoria'],
  },
  {
    slug: 'raul-baltazar',
    name: 'Raúl Baltazar',
    specialization: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/10/hy-raul-baltazar.png',
    workplaceLogoUrl: DEFAULT_LOGO_URL,
    formation: '',
    subjects: [],
    description: '',
    hobbies: [],
    programs: ['preparatoria'],
  },
  {
    slug: 'jesus-melgar',
    name: 'Jesús Melgar',
    specialization: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/10/hy-jesus-melgar.png',
    workplaceLogoUrl: DEFAULT_LOGO_URL,
    formation: '',
    subjects: [],
    description: '',
    hobbies: [],
    programs: ['preparatoria'],
  },
  {
    slug: 'jimena-fuentes',
    name: 'Jimena Fuentes',
    specialization: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/10/hy-jimena-fuentes.png',
    workplaceLogoUrl: DEFAULT_LOGO_URL,
    formation: '',
    subjects: [],
    description: '',
    hobbies: [],
    programs: ['preparatoria'],
  },
  {
    slug: 'sofia-ardura',
    name: 'Sofía Ardura',
    specialization: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/10/hy-sofia-ardura.png',
    workplaceLogoUrl: DEFAULT_LOGO_URL,
    formation: '',
    subjects: [],
    description: '',
    hobbies: [],
    programs: ['preparatoria'],
  },
  {
    slug: 'alvaro-toledo',
    name: 'Álvaro Toledo',
    specialization: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/09/Alvaro.jpg',
    workplaceLogoUrl: DEFAULT_LOGO_URL,
    formation: '',
    subjects: [],
    description: '',
    hobbies: [],
    programs: ['preparatoria'],
  },

  // INGENIERÍA EN SOFTWARE
  {
    slug: 'pedro-balbuena',
    name: 'Pedro Balbuena',
    specialization: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/02/hy-ing-pedro-ft-24.jpg',
    workplaceLogoUrl: DEFAULT_LOGO_URL,
    formation: '',
    subjects: [],
    description: '',
    hobbies: [],
    programs: [
      'ingenieria-en-software',
      'ingenieria-en-inteligencia-artificial',
      'ingenieria-en-videojuegos',
      'licenciatura-en-administracion-e-innovacion',
      'licenciatura-en-mercadotecnia',
    ],
  },
  {
    slug: 'sahori-solana',
    name: 'Sahori Solana',
    specialization: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/02/hy-ing-sahori-ft-24.jpg',
    workplaceLogoUrl: DEFAULT_LOGO_URL,
    formation: '',
    subjects: [],
    description: '',
    hobbies: [],
    programs: [
      'ingenieria-en-software',
      'ingenieria-en-inteligencia-artificial',
      'ingenieria-en-videojuegos',
      'licenciatura-en-administracion-e-innovacion',
      'licenciatura-en-mercadotecnia',
    ],
  },
  {
    slug: 'alberto-preciado',
    name: 'Alberto Preciado',
    specialization: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/02/hy-ing-alberto-ft-24.jpg',
    workplaceLogoUrl: DEFAULT_LOGO_URL,
    formation: '',
    subjects: [],
    description: '',
    hobbies: [],
    programs: [
      'ingenieria-en-software',
      'ingenieria-en-inteligencia-artificial',
      'ingenieria-en-videojuegos',
      'licenciatura-en-administracion-e-innovacion',
      'licenciatura-en-mercadotecnia',
    ],
  },
  {
    slug: 'sebastian-mathus',
    name: 'Sebastián Mathus',
    specialization: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/02/hy-ing-sebastian-mathus-ft-24.jpg',
    workplaceLogoUrl: DEFAULT_LOGO_URL,
    formation: '',
    subjects: [],
    description: '',
    hobbies: [],
    programs: [
      'ingenieria-en-software',
      'ingenieria-en-inteligencia-artificial',
      'ingenieria-en-videojuegos',
      'licenciatura-en-administracion-e-innovacion',
      'licenciatura-en-mercadotecnia',
    ],
  },
  {
    slug: 'martin-mathus',
    name: 'Martín Mathus',
    specialization: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/02/hy-ing-martin-mathus-ft-24.jpg',
    workplaceLogoUrl: DEFAULT_LOGO_URL,
    formation: '',
    subjects: [],
    description: '',
    hobbies: [],
    programs: [
      'ingenieria-en-software',
      'ingenieria-en-inteligencia-artificial',
      'ingenieria-en-videojuegos',
      'licenciatura-en-administracion-e-innovacion',
      'licenciatura-en-mercadotecnia',
    ],
  },
  {
    slug: 'fernanda-arriaga',
    name: 'Fernanda Arriaga',
    specialization: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/02/hy-ing-fernanda-ft-24.jpg',
    workplaceLogoUrl: DEFAULT_LOGO_URL,
    formation: '',
    subjects: [],
    description: '',
    hobbies: [],
    programs: [
      'ingenieria-en-software',
      'ingenieria-en-inteligencia-artificial',
      'ingenieria-en-videojuegos',
      'licenciatura-en-administracion-e-innovacion',
      'licenciatura-en-mercadotecnia',
    ],
  },
  {
    slug: 'daniela-anaya',
    name: 'Daniela Anaya',
    specialization: 'Tecnología',
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/02/hy-ing-daniela-ft-24.jpg',
    workplaceLogoUrl: DEFAULT_LOGO_URL,
    formation: '',
    subjects: [],
    description: '',
    hobbies: [],
    programs: [
      'ingenieria-en-software',
      'ingenieria-en-inteligencia-artificial',
      'ingenieria-en-videojuegos',
      'licenciatura-en-administracion-e-innovacion',
      'licenciatura-en-mercadotecnia',
    ],
  },
  {
    slug: 'jose-esteva',
    name: 'José Esteva',
    specialization: 'Software',
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/02/hy-ing-jose-ft-24.jpg',
    workplaceLogoUrl: DEFAULT_LOGO_URL,
    formation: '',
    subjects: [],
    description: '',
    hobbies: [],
    programs: [
      'ingenieria-en-software',
      'ingenieria-en-inteligencia-artificial',
      'ingenieria-en-videojuegos',
      'licenciatura-en-administracion-e-innovacion',
      'licenciatura-en-mercadotecnia',
    ],
  },
  {
    slug: 'gerardo-mathus',
    name: 'Gerardo Mathus',
    specialization: 'Software',
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/02/hy-ing-gerardo-mathus-ft-24.jpg',
    workplaceLogoUrl: DEFAULT_LOGO_URL,
    formation: '',
    subjects: [],
    description: '',
    hobbies: [],
    programs: [
      'ingenieria-en-software',
      'ingenieria-en-inteligencia-artificial',
      'ingenieria-en-videojuegos',
      'licenciatura-en-administracion-e-innovacion',
      'licenciatura-en-mercadotecnia',
    ],
  },
  {
    slug: 'ivan-martinez',
    name: 'Iván Martínez',
    specialization: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/02/hy-ivan-martinez-ft-24.jpg',
    workplaceLogoUrl: DEFAULT_LOGO_URL,
    formation: '',
    subjects: [],
    description: '',
    hobbies: [],
    programs: [
      'ingenieria-en-software',
      'ingenieria-en-inteligencia-artificial',
      'ingenieria-en-videojuegos',
      'licenciatura-en-administracion-e-innovacion',
      'licenciatura-en-mercadotecnia',
    ],
  },
  {
    slug: 'maria-fernanda-mariscal',
    name: 'María Fernanda Mariscal',
    specialization: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2023/08/Imagenmaria.jpg',
    workplaceLogoUrl: DEFAULT_LOGO_URL,
    formation: '',
    subjects: [],
    description: '',
    hobbies: [],
    programs: ['ingenieria-en-software'],
  },
  {
    slug: 'maria-ayala',
    name: 'María Ayala',
    specialization: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/02/hy-7-ft-24.jpg',
    workplaceLogoUrl: DEFAULT_LOGO_URL,
    formation: '',
    subjects: [],
    description: '',
    hobbies: [],
    programs: ['ingenieria-en-software'],
  },
]

// Seeds dummy para evaluar el UI:
// - linkedInUrl a tu URL (todas)
// - especialidad/formación con variación (con maestría y sin maestría)
// - descripción genérica
// - hobbies aleatorios (2-3) con emoji
export const FACULTY_MEMBERS_SEED: FacultyMemberSeed[] = FACULTY_MEMBERS_BASE_SEED.map((m) => {
  const seed = `${m.slug}|${m.name}`
  const h = hashString(seed)
  const isPrepa = Array.isArray(m.programs) ? m.programs.includes('preparatoria') : false

  const specialization = isPrepa
    ? PREPA_SPECIALIZATIONS[h % PREPA_SPECIALIZATIONS.length]
    : SW_SPECIALIZATIONS[h % SW_SPECIALIZATIONS.length]

  const formation = isPrepa
    ? h % 3 === 0
      ? PREPA_FORMATION_WITH_MASTER[h % PREPA_FORMATION_WITH_MASTER.length]
      : PREPA_FORMATION_ONLY_BACHELOR[h % PREPA_FORMATION_ONLY_BACHELOR.length]
    : h % 4 === 0
      ? SW_FORMATION_WITH_MASTER[h % SW_FORMATION_WITH_MASTER.length]
      : h % 2 === 0
        ? SW_FORMATION_ONLY_ENGINEERING[h % SW_FORMATION_ONLY_ENGINEERING.length]
        : SW_FORMATION_ONLY_LIC[h % SW_FORMATION_ONLY_LIC.length]

  return {
    ...m,
    linkedInUrl: LINKEDIN_URL,
    specialization,
    formation,
    description: GENERIC_DESCRIPTION,
    hobbies: pickHobbies(seed),
  }
})

