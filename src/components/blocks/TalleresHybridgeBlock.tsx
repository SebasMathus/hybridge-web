import type { TalleresWorkshop } from '@/components/TalleresHybridgeSection'
import { TalleresHybridgeSection } from '@/components/TalleresHybridgeSection'

type Props = { block: any; locale: string }

export function TalleresHybridgeBlockComponent({ block }: Props) {
  const workshops: TalleresWorkshop[] = (block.workshops || []).map((w: any) => ({
    icon: String(w.icon || '').trim() || '•',
    label: String(w.label || ''),
  }))

  if (!workshops.length) return null

  return (
    <TalleresHybridgeSection
      heading={block.heading}
      subheading={block.subheading}
      descriptionBefore={block.descriptionBefore}
      accentWord1={block.accentWord1}
      descriptionMiddle={block.descriptionMiddle}
      accentWord2={block.accentWord2}
      descriptionAfter={block.descriptionAfter}
      workshops={workshops}
    />
  )
}
