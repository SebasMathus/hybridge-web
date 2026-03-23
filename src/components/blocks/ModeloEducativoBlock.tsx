import type { ModeloEducativoPillar } from '@/components/ModeloEducativoSection'
import { ModeloEducativoSection } from '@/components/ModeloEducativoSection'

type Props = { block: any; locale: string }

export function ModeloEducativoBlockComponent({ block }: Props) {
  const pillars: ModeloEducativoPillar[] = (block.pillars || []).map((p: any) => ({
    icon: String(p.icon || '').trim() || '•',
    title: String(p.title || ''),
    subtitle: String(p.subtitle || ''),
    description: String(p.description || ''),
    showLiveDot: Boolean(p.showLiveDot),
  }))

  if (!pillars.length) return null

  return (
    <ModeloEducativoSection
      sectionTitle={block.sectionTitle || 'MODELO EDUCATIVO'}
      subtitle={block.subtitle || ''}
      pillars={pillars}
    />
  )
}
