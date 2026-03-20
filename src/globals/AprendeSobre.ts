import type { GlobalConfig } from 'payload'

type AprendeSobreIconKey = 'javascript' | 'python' | 'googlecloud' | 'cloudflare' | 'figma' | 'react'

const skillIconOptions: Array<{ label: string; value: AprendeSobreIconKey }> = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Python', value: 'python' },
  { label: 'Google Cloud', value: 'googlecloud' },
  { label: 'Cloudflare', value: 'cloudflare' },
  { label: 'Figma', value: 'figma' },
  { label: 'React', value: 'react' },
]

export const AprendeSobreGlobal: GlobalConfig = {
  slug: 'aprendeSobre',
  label: 'Aprende sobre / Skills',
  fields: [
    {
      name: 'chips',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'skills',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'iconKey',
          type: 'select',
          required: true,
          options: skillIconOptions.map((o) => ({ label: o.label, value: o.value })),
        },
        {
          name: 'opacity',
          type: 'number',
          defaultValue: 0.5,
        },
        {
          name: 'size',
          type: 'number',
          defaultValue: 28,
        },
      ],
    },
  ],
}

