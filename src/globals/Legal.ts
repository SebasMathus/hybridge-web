import type { GlobalConfig } from 'payload'
import { legalDefaults } from '@/lib/legalDefaults'

export const LegalGlobal: GlobalConfig = {
  slug: 'legal',
  label: 'Legal',
  admin: {
    group: 'Globals',
  },
  fields: [
    {
      name: 'avisoDePrivacidad',
      label: 'Aviso de privacidad',
      type: 'group',
      fields: [
        { name: 'title', label: 'Título', type: 'text', required: true, defaultValue: legalDefaults.avisoDePrivacidad.title },
        {
          name: 'markdown',
          label: 'Contenido (Markdown)',
          type: 'textarea',
          required: true,
          defaultValue: legalDefaults.avisoDePrivacidad.markdown,
          admin: {
            description: 'Usa H2 (##) para subtítulos. Este contenido se renderiza en la URL /es/aviso-de-privacidad.',
            rows: 18,
          },
        },
      ],
    },
    {
      name: 'termsAndConditions',
      label: 'Términos y condiciones',
      type: 'group',
      fields: [
        { name: 'title', label: 'Título', type: 'text', required: true, defaultValue: legalDefaults.termsAndConditions.title },
        {
          name: 'markdown',
          label: 'Contenido (Markdown)',
          type: 'textarea',
          required: true,
          defaultValue: legalDefaults.termsAndConditions.markdown,
          admin: {
            description: 'Este contenido se renderiza en la URL /es/terms-and-conditions.',
            rows: 12,
          },
        },
      ],
    },
    {
      name: 'rvoes',
      label: 'RVOEs',
      type: 'group',
      fields: [
        { name: 'title', label: 'Título', type: 'text', required: true, defaultValue: legalDefaults.rvoes.title },
        {
          name: 'markdown',
          label: 'Contenido (Markdown)',
          type: 'textarea',
          required: true,
          defaultValue: legalDefaults.rvoes.markdown,
          admin: {
            description: 'Este contenido se renderiza en la URL /es/reconocimientos-validez-oficial-hybridge.',
            rows: 14,
          },
        },
      ],
    },
  ],
}

