import type { Block } from 'payload'

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
        { name: 'ctaLabel', type: 'text', defaultValue: 'Inscríbete ya' },
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
    { name: 'ctaLabel', type: 'text', defaultValue: 'Inscríbete ya' },
    { name: 'ctaUrl', type: 'text', required: true },
    { name: 'ctaTrackId', type: 'text' },
  ],
}

/* ────────────────────────────── LOGOS BAR ────────────────────────────── */
export const LogosBarBlock: Block = {
  slug: 'logosBar',
  labels: { singular: 'Barra de Logos', plural: 'Barras de Logos' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Confían en nosotros' },
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
    { name: 'text', type: 'text', defaultValue: 'Hablar con un asesor' },
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
    { name: 'subheading', type: 'text', defaultValue: 'Las materias que cursarás' },
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
