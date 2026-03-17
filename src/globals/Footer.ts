import type { GlobalConfig } from 'payload'

export const FooterGlobal: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  fields: [
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'tagline', type: 'text', localized: true, defaultValue: 'Empieza a aprender de nuestros expertos y mejora tus habilidades' },
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'phone', type: 'text', defaultValue: '(55) 2887 5759' },
        { name: 'email', type: 'text', defaultValue: 'sebastian@hybridge.education' },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        { name: 'platform', type: 'select', options: ['whatsapp', 'instagram', 'tiktok', 'facebook', 'twitter'] },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'columns',
      type: 'array',
      localized: true,
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
          ],
        },
      ],
    },
    { name: 'copyright', type: 'text', defaultValue: '\u00A9 Copyright 2026 by Hybridge' },
  ],
}
