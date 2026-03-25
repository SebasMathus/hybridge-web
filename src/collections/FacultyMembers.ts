import type { CollectionConfig } from 'payload'

export type FacultyProgram =
  | 'preparatoria'
  | 'ingenieria-en-software'
  | 'ingenieria-en-inteligencia-artificial'
  | 'ingenieria-en-videojuegos'
  | 'licenciatura-en-administracion-e-innovacion'
  | 'licenciatura-en-mercadotecnia'

export const FacultyMembers: CollectionConfig = {
  slug: 'faculty-members',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      unique: true,
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'specialization',
      type: 'text',
      required: true,
      label: 'Especialidad',
    },
    {
      name: 'linkedInUrl',
      type: 'text',
      label: 'LinkedIn URL',
    },
    {
      name: 'avatarUrl',
      type: 'text',
      label: 'Foto (URL)',
    },
    {
      name: 'workplaceLogoUrl',
      type: 'text',
      label: 'Logo (URL)',
    },
    {
      name: 'formation',
      type: 'textarea',
      label: 'Formación',
    },
    {
      name: 'subjects',
      type: 'array',
      label: 'Materias que imparte',
      fields: [{ name: 'text', type: 'text', required: false }],
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción',
    },
    {
      name: 'hobbies',
      type: 'array',
      label: 'Hobbies',
      fields: [{ name: 'text', type: 'text', required: false }],
    },
    {
      name: 'programs',
      type: 'array',
      label: 'En qué páginas debe aparecer',
      required: true,
      fields: [
        {
          name: 'program',
          type: 'select',
          options: [
            { label: 'Preparatoria', value: 'preparatoria' },
            { label: 'Ingeniería en Software', value: 'ingenieria-en-software' },
            {
              label: 'Ingeniería en Inteligencia Artificial',
              value: 'ingenieria-en-inteligencia-artificial',
            },
            {
              label: 'Ing. en Videojuegos y Tecnologías Inmersivas',
              value: 'ingenieria-en-videojuegos',
            },
            {
              label: 'Lic. en Administración e Innovación',
              value: 'licenciatura-en-administracion-e-innovacion',
            },
            {
              label: 'Lic. en Mercadotecnia y Negocios Digitales',
              value: 'licenciatura-en-mercadotecnia',
            },
          ],
        },
      ],
    },
  ],
}

