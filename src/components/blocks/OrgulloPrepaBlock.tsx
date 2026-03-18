import { OrgulloPrepa } from '@/components/OrgulloPrepa'

type Props = { block: any; locale: string }

export const OrgulloPrepaBlock = ({ block }: Props) => {
  const items = Array.isArray(block?.items) ? block.items : undefined
  return (
    <OrgulloPrepa
      title={block?.title}
      highlight={block?.highlight}
      subtitle={block?.subtitle}
      items={items?.map((x: any) => ({ icon: x?.icon, text: x?.text })).filter((x: any) => x?.icon && x?.text)}
    />
  )
}

