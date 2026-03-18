import type { CollectionConfig } from 'payload'

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  labels: { singular: 'Envío', plural: 'Envíos de formulario' },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'form', 'firstName', 'createdAt'],
    description: 'Registro de envíos de formularios de inscripción.',
  },
  fields: [
    { name: 'form', type: 'relationship', relationTo: 'forms', required: true },
    { name: 'firstName', type: 'text', required: true },
    { name: 'lastName', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'age', type: 'number', required: true },
    { name: 'state', type: 'text', required: true },
    { name: 'howDidYouHear', type: 'text', required: true },
    { name: 'message', type: 'textarea', required: true },
    { name: 'privacyAccepted', type: 'checkbox', required: true },
    { name: 'whatsappConsent', type: 'checkbox' },
  ],
}
