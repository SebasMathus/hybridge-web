import { IndustryLeadersSection } from '@/components/IndustryLeadersSection'

type Props = { block: any; locale: string }

export function IndustryLeadersBlockComponent({ block }: Props) {
  if (!block.body?.trim()) return null

  return (
    <IndustryLeadersSection
      eyebrow={block.eyebrow || ''}
      heading={block.heading || ''}
      body={block.body}
    />
  )
}
