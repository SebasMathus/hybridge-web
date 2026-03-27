import type { CollectionConfig } from 'payload'
import { WA_CTA_PAGE_KEY_OPTIONS } from '@/lib/waCtaLabels'

export const WACtas: CollectionConfig = {
  slug: 'wa-cta',
  labels: { singular: 'WA CTA', plural: 'WA CTA' },
  admin: {
    useAsTitle: 'pageKey',
    defaultColumns: ['pageLabelDisplay', 'pageTypeDisplay', 'url', 'updatedAt'],
    description: 'URLs de WhatsApp por página. "global" se usa como fallback.',
  },
  fields: [
    {
      name: 'pageKey',
      label: 'Página',
      type: 'select',
      required: true,
      unique: true,
      options: [...WA_CTA_PAGE_KEY_OPTIONS],
    },
    {
      name: 'url',
      label: 'URL WhatsApp',
      type: 'text',
      required: true,
    },
    {
      name: 'pageLabelDisplay',
      label: 'Página',
      type: 'ui',
      admin: {
        components: {
          Cell: {
            path: '@/app/(payload)/admin/WACtaPageLabelCell',
            exportName: 'WACtaPageLabelCell',
          } as any,
        },
      },
    },
    {
      name: 'pageTypeDisplay',
      label: 'Tipo de página',
      type: 'ui',
      admin: {
        components: {
          Cell: {
            path: '@/app/(payload)/admin/WACtaPageTypeCell',
            exportName: 'WACtaPageTypeCell',
          } as any,
        },
      },
    },
  ],
}
