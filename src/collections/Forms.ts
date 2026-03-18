import type { CollectionConfig } from 'payload'

export const Forms: CollectionConfig = {
  slug: 'forms',
  labels: { singular: 'Formulario', plural: 'Formularios' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    description: 'Formularios de inscripción. Usa el slug para anclas en la página (ej: prepa → #form-prepa).',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      admin: { description: 'Título que se muestra sobre el formulario (ej: Prepa Hybridge).' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Identificador único. Se usa para el ancla: #form-{slug}. Ej: prepa, ingenieria-software.',
      },
    },
    {
      name: 'showWhatsAppConsent',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Si está activo, se muestra el checkbox "Acepto que Hybridge me contacte por WhatsApp".' },
    },
    {
      name: 'successMessage',
      type: 'text',
      localized: true,
      defaultValue: 'Gracias. Nos pondremos en contacto contigo pronto.',
      admin: { description: 'Mensaje mostrado al enviar el formulario correctamente.' },
    },
  ],
}
