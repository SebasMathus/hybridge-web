import type { Block } from 'payload'
import { HYBRIDGE_APP_STORE_URL, HYBRIDGE_PLAY_STORE_URL } from '@/components/HybridgeAppSection'

/* ────────────────────────────── HERO CAROUSEL ────────────────────────────── */
export const HeroCarouselBlock: Block = {
  slug: 'heroCarousel',
  labels: { singular: 'Hero Carrusel', plural: 'Hero Carruseles' },
  fields: [
    {
      name: 'slides',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'line1', type: 'text', required: true },
        { name: 'line2', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'imageUrl', type: 'text' },
        { name: 'ctaLabel', type: 'text', defaultValue: 'Más información' },
        { name: 'ctaUrl', type: 'text', required: true },
        { name: 'ctaTrackId', type: 'text' },
      ],
    },
  ],
}

/* ────────────────────────────── HERO BANNER ────────────────────────────── */
export const HeroBannerBlock: Block = {
  slug: 'heroBanner',
  labels: { singular: 'Hero Banner', plural: 'Hero Banners' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'subheading', type: 'textarea' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'imageUrl', type: 'text' },
    { name: 'ctaLabel', type: 'text', defaultValue: '¡Inscríbete ya!' },
    { name: 'ctaUrl', type: 'text', required: true },
    { name: 'ctaTrackId', type: 'text' },
  ],
}

/* ────────────────────────────── LOGOS BAR ────────────────────────────── */
export const LogosBarBlock: Block = {
  slug: 'logosBar',
  labels: { singular: 'Barra de Logos', plural: 'Barras de Logos' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Nuestros estudiantes trabajan en:' },
    {
      name: 'logos',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'imageUrl', type: 'text' },
      ],
    },
  ],
}

/* ────────────────────────────── WHATSAPP BAR ────────────────────────────── */
export const WhatsAppBarBlock: Block = {
  slug: 'whatsappBar',
  labels: { singular: 'Barra WhatsApp', plural: 'Barras WhatsApp' },
  fields: [
    { name: 'text', type: 'text', defaultValue: 'Quiero más información' },
    { name: 'url', type: 'text', required: true, defaultValue: 'https://wa.me/message/2JJMWGRX5DSDO1' },
    { name: 'trackId', type: 'text' },
  ],
}

/* ────────────────────────────── VIDEO SECTION ────────────────────────────── */
export const VideoSectionBlock: Block = {
  slug: 'videoSection',
  labels: { singular: 'Sección de Video', plural: 'Secciones de Video' },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'subheading', type: 'text' },
    { name: 'youtubeUrl', type: 'text', required: true },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'white',
      options: [
        { label: 'Blanco', value: 'white' },
        { label: 'Crema', value: 'cream' },
      ],
    },
  ],
}

/* ────────────────────────────── SPLIT CONTENT ────────────────────────────── */
export const SplitContentBlock: Block = {
  slug: 'splitContent',
  labels: { singular: 'Contenido Dividido', plural: 'Contenidos Divididos' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'body', type: 'textarea', required: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'imageUrl', type: 'text' },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'Derecha', value: 'right' },
        { label: 'Izquierda', value: 'left' },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'white',
      options: [
        { label: 'Blanco', value: 'white' },
        { label: 'Crema', value: 'cream' },
      ],
    },
    {
      name: 'buttons',
      type: 'array',
      maxRows: 3,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Primario (Amarillo)', value: 'primary' },
            { label: 'Secundario (Azul)', value: 'secondary' },
            { label: 'Outline', value: 'outline' },
          ],
        },
        { name: 'trackId', type: 'text' },
      ],
    },
    {
      name: 'bulletPoints',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
  ],
}

/* ────────────────────────────── FEATURES GRID ────────────────────────────── */
export const FeaturesGridBlock: Block = {
  slug: 'featuresGrid',
  labels: { singular: 'Grid de Features', plural: 'Grids de Features' },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'subheading', type: 'textarea' },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'white',
      options: [
        { label: 'Blanco', value: 'white' },
        { label: 'Crema', value: 'cream' },
      ],
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        { name: 'icon', type: 'upload', relationTo: 'media' },
        { name: 'iconUrl', type: 'text' },
        { name: 'iconText', type: 'text', admin: { description: 'Emoji o texto corto (ej. 💻). Se usa si no hay icon/iconUrl.' } },
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
  ],
}

/* ────────────────────────────── CURRICULUM TABLE (inline, legacy) ────────────────────────────── */
export const CurriculumTableBlock: Block = {
  slug: 'curriculumTable',
  labels: { singular: 'Plan de Estudios (inline)', plural: 'Planes de Estudios (inline)' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Plan de estudios' },
    { name: 'subheading', type: 'text', defaultValue: '' },
    { name: 'description', type: 'text' },
    {
      name: 'semesters',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'subjects',
          type: 'array',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'icon', type: 'upload', relationTo: 'media' },
            { name: 'iconUrl', type: 'text' },
          ],
        },
      ],
    },
  ],
}

/* ────────────────────────────── PLAN DE ESTUDIOS (desde colección) ────────────────────────────── */
export const CurriculumPlanBlock: Block = {
  slug: 'curriculumPlan',
  labels: { singular: 'Plan de estudios', plural: 'Planes de estudios' },
  fields: [
    {
      name: 'plan',
      type: 'relationship',
      relationTo: 'planes-estudio',
      required: true,
      admin: { description: 'Selecciona el plan de estudios (Preparatoria, Ingeniería en Software, etc.). Se edita en Planes de estudio.' },
    },
  ],
}

/* ────────────────────────────── TESTIMONIALS ROW (inline, legacy) ────────────────────────────── */
export const TestimonialsRowBlock: Block = {
  slug: 'testimonialsRow',
  labels: { singular: 'Testimonios (inline)', plural: 'Testimonios (inline)' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'cream',
      options: [
        { label: 'Blanco', value: 'white' },
        { label: 'Crema', value: 'cream' },
      ],
    },
    {
      name: 'testimonials',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'imageUrl', type: 'text' },
        { name: 'videoUrl', type: 'text', required: true },
      ],
    },
  ],
}

/* ────────────────────────────── TESTIMONIOS (desde colección) ────────────────────────────── */
export const TestimonialsPlanBlock: Block = {
  slug: 'testimonialsPlan',
  labels: { singular: 'Testimonios', plural: 'Testimonios' },
  fields: [
    {
      name: 'testimonials',
      type: 'relationship',
      relationTo: 'testimonios',
      required: true,
      admin: { description: 'Selecciona el conjunto de testimonios (Preparatoria o Universidad). Se edita en Testimonios.' },
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'cream',
      options: [
        { label: 'Blanco', value: 'white' },
        { label: 'Crema', value: 'cream' },
      ],
    },
  ],
}

/* ────────────────────────────── CTA SECTION ────────────────────────────── */
export const CTASectionBlock: Block = {
  slug: 'ctaSection',
  labels: { singular: 'Sección CTA', plural: 'Secciones CTA' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'highlightText', type: 'text' },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'cream',
      options: [
        { label: 'Blanco', value: 'white' },
        { label: 'Crema', value: 'cream' },
      ],
    },
    {
      name: 'buttons',
      type: 'array',
      maxRows: 3,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Primario (Amarillo)', value: 'primary' },
            { label: 'Secundario (Azul)', value: 'secondary' },
            { label: 'Outline', value: 'outline' },
          ],
        },
        { name: 'trackId', type: 'text' },
      ],
    },
  ],
}

/* ────────────────────────────── PILLARS GRID ────────────────────────────── */
export const PillarsGridBlock: Block = {
  slug: 'pillarsGrid',
  labels: { singular: 'Grid de Pilares', plural: 'Grids de Pilares' },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'highlightText', type: 'text' },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'cream',
      options: [
        { label: 'Blanco', value: 'white' },
        { label: 'Crema', value: 'cream' },
      ],
    },
    {
      name: 'pillars',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'icon', type: 'text' },
      ],
    },
    {
      name: 'buttons',
      type: 'array',
      labels: { singular: 'Botón', plural: 'Botones' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Primario', value: 'primary' },
            { label: 'Secundario', value: 'secondary' },
            { label: 'Outline', value: 'outline' },
          ],
        },
        { name: 'trackId', type: 'text' },
      ],
    },
  ],
}

/* ────────────────────────────── GRADUADOS PREPA ────────────────────────────── */
export const GraduadosPrepaBlock: Block = {
  slug: 'graduadosPrepa',
  labels: { singular: 'Graduados Prepa', plural: 'Graduados Prepa' },
  fields: [
    {
      name: 'graduatedCount',
      type: 'number',
      defaultValue: 220,
      admin: { description: 'Ej: 220 (se muestra como +220).' },
    },
    {
      name: 'percent',
      type: 'number',
      defaultValue: 15,
      admin: { description: 'Ej: 15 (se muestra como 15%).' },
    },
    {
      name: 'mexicoUniversities',
      type: 'array',
      labels: { singular: 'Universidad (México)', plural: 'Universidades (México)' },
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    {
      name: 'abroadUniversities',
      type: 'array',
      labels: { singular: 'Universidad (Extranjero)', plural: 'Universidades (Extranjero)' },
      fields: [{ name: 'label', type: 'text', required: true }],
    },
  ],
}

/* ────────────────────────────── ORGULLO PREPA ────────────────────────────── */
export const OrgulloPrepaBlock: Block = {
  slug: 'orgulloPrepa',
  labels: { singular: 'Orgullo Prepa', plural: 'Orgullo Prepa' },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'ORGULLO' },
    { name: 'highlight', type: 'text', defaultValue: 'HYBRIDGE' },
    { name: 'subtitle', type: 'text', defaultValue: 'Elementos de la experiencia educativa en Hybridge que nos enorgullecen...' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'icon', type: 'text', required: true, admin: { description: 'Emoji (ej. 🏆)' } },
        { name: 'text', type: 'text', required: true },
      ],
    },
  ],
}

/* ────────────────────────────── CTA FECHA DE INICIO ────────────────────────────── */
export const CtaFechaInicioBlock: Block = {
  slug: 'ctaFechaInicio',
  labels: { singular: 'CTA Fecha de inicio', plural: 'CTAs Fecha de inicio' },
  fields: [
    {
      name: 'fechaInicio',
      type: 'relationship',
      relationTo: 'fechas-inicio',
      required: true,
      admin: { description: 'Selecciona la fecha a mostrar (Preparatoria o Universidad). Se edita en Fechas de inicio.' },
    },
    {
      name: 'trackPrefix',
      type: 'text',
      admin: { description: 'Prefijo para track IDs de los botones (ej. home, prepa, sw). Opcional.' },
    },
  ],
}

/* ────────────────────────────── FORM (INSCRIPCIÓN) ────────────────────────────── */
export const FormBlock: Block = {
  slug: 'formBlock',
  labels: { singular: 'Formulario de inscripción', plural: 'Formularios de inscripción' },
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      admin: { description: 'Selecciona el formulario a mostrar (Prepa o Ingeniería en Software). Los botones CTA usarán #form-{slug} para llevar aquí.' },
    },
  ],
}

/* ────────────────────────────── PROGRAMS GRID ────────────────────────────── */
export const ProgramsGridBlock: Block = {
  slug: 'programsGrid',
  labels: { singular: 'Grid de Programas', plural: 'Grids de Programas' },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'highlightText', type: 'text' },
    {
      name: 'programs',
      type: 'array',
      fields: [
        { name: 'type', type: 'text', required: true },
        { name: 'name', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'imageUrl', type: 'text' },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
}

/* ────────────────────────────── BENEFICIOS HYBRIDGE (grid oscuro) ────────────────────────────── */
export const BenefitsHybridgeBlock: Block = {
  slug: 'benefitsHybridge',
  labels: {
    singular: 'Beneficios Hybridge (grid aliados)',
    plural: 'Beneficios Hybridge (grid aliados)',
  },
  fields: [],
}

/* ────────────────────────────── MODELO EDUCATIVO ────────────────────────────── */
export const ModeloEducativoBlock: Block = {
  slug: 'modeloEducativo',
  labels: { singular: 'Modelo educativo', plural: 'Modelo educativo' },
  fields: [
    { name: 'sectionTitle', type: 'text', required: true, defaultValue: 'MODELO EDUCATIVO' },
    { name: 'subtitle', type: 'textarea', defaultValue: 'Educación en línea de calidad, aprende con:' },
    {
      name: 'pillars',
      type: 'array',
      minRows: 1,
      maxRows: 5,
      labels: { singular: 'Pilar', plural: 'Pilares' },
      fields: [
        { name: 'icon', type: 'text', required: true, admin: { description: 'Emoji o símbolo' } },
        { name: 'title', type: 'text', required: true },
        { name: 'subtitle', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'showLiveDot', type: 'checkbox', defaultValue: false, admin: { description: 'Punto verde “en vivo” junto al título (ej. Clases).' } },
      ],
    },
  ],
}

/* ────────────────────────────── OPORTUNIDADES (grid 2×2) ────────────────────────────── */
export const Oportunidades2026Block: Block = {
  slug: 'oportunidades2026',
  labels: { singular: 'Oportunidades (grid)', plural: 'Oportunidades (grid)' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'MUCHO MÁS QUE SOLO ESTUDIAR' },
    { name: 'heading', type: 'text', required: true, defaultValue: 'OPORTUNIDADES 2026' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      fields: [
        { name: 'icon', type: 'text', required: true, admin: { description: 'Emoji' } },
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
}

/* ────────────────────────────── LÍDERES DE LA INDUSTRIA ────────────────────────────── */
export const IndustryLeadersBlock: Block = {
  slug: 'industryLeaders',
  labels: { singular: 'Líderes de la industria', plural: 'Líderes de la industria' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'APRENDE DE LA MANO DE' },
    { name: 'heading', type: 'text', required: true, defaultValue: 'LÍDERES DE LA INDUSTRIA' },
    { name: 'body', type: 'textarea', required: true },
  ],
}

/* ────────────────────────────── TALLERES HYBRIDGE ────────────────────────────── */
export const TalleresHybridgeBlock: Block = {
  slug: 'talleresHybridge',
  labels: { singular: 'Talleres Hybridge', plural: 'Talleres Hybridge' },
  fields: [
    { name: 'heading', type: 'text', required: true, defaultValue: 'TALLERES HYBRIDGE' },
    { name: 'subheading', type: 'text', defaultValue: 'TU HUB DE APRENDIZAJE' },
    { name: 'descriptionBefore', type: 'text', defaultValue: 'Además de tus materias, accede a talleres gratuitos y ' },
    { name: 'accentWord1', type: 'text', defaultValue: 'exclusivos' },
    { name: 'descriptionMiddle', type: 'text', defaultValue: ' para la comunidad Hybridge. Adquiere ' },
    { name: 'accentWord2', type: 'text', defaultValue: 'certificaciones' },
    { name: 'descriptionAfter', type: 'text', defaultValue: ' mientras estudias tu carrera.' },
    {
      name: 'workshops',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      labels: { singular: 'Taller', plural: 'Talleres' },
      fields: [
        { name: 'icon', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
}

/* ────────────────────────────── HYBRIDGE APP ────────────────────────────── */
export const HybridgeAppBlock: Block = {
  slug: 'hybridgeApp',
  labels: { singular: 'Hybridge App', plural: 'Hybridge App' },
  fields: [
    { name: 'heading', type: 'text', required: true, defaultValue: 'HYBRIDGE APP' },
    { name: 'body', type: 'textarea', required: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'imageUrl', type: 'text' },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'Derecha', value: 'right' },
        { label: 'Izquierda', value: 'left' },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'cream',
      options: [
        { label: 'Blanco', value: 'white' },
        { label: 'Crema', value: 'cream' },
      ],
    },
    { name: 'storesLabel', type: 'text', defaultValue: 'Disponible para iOS y Android' },
    { name: 'appStoreUrl', type: 'text', defaultValue: HYBRIDGE_APP_STORE_URL },
    { name: 'playStoreUrl', type: 'text', defaultValue: HYBRIDGE_PLAY_STORE_URL },
    {
      name: 'appStoreBadgeUrl',
      type: 'text',
      defaultValue:
        'https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/es-mx?size=250x83',
    },
    {
      name: 'playBadgeUrl',
      type: 'text',
      defaultValue: 'https://play.google.com/intl/es-419/badges/static/images/badges/es-419_badge_web_generic.png',
    },
  ],
}
