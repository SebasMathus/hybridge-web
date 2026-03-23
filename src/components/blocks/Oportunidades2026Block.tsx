import type { OportunidadItem } from '@/components/Oportunidades2026Section'
import { Oportunidades2026Section } from '@/components/Oportunidades2026Section'

type Props = { block: any; locale: string }

export function Oportunidades2026BlockComponent({ block }: Props) {
  const items: OportunidadItem[] = (block.items || []).map((it: any) => ({
    icon: String(it.icon || '').trim() || '•',
    label: String(it.label || ''),
  }))

  if (!items.length) return null

  return (
    <Oportunidades2026Section
      eyebrow={block.eyebrow?.trim() ? block.eyebrow : undefined}
      heading={block.heading || 'OPORTUNIDADES'}
      items={items}
    />
  )
}
