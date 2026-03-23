import { HybridgeAppSection } from '@/components/HybridgeAppSection'

type Props = { block: any; locale: string }

export function HybridgeAppBlockComponent({ block, locale }: Props) {
  if (!block.body?.trim()) return null

  return (
    <HybridgeAppSection
      locale={locale}
      heading={block.heading}
      body={block.body}
      image={block.image}
      imageUrl={block.imageUrl}
      imagePosition={block.imagePosition === 'left' ? 'left' : 'right'}
      backgroundColor={block.backgroundColor === 'white' ? 'white' : 'cream'}
      stores={{
        storesLabel: block.storesLabel,
        appStoreUrl: block.appStoreUrl,
        playStoreUrl: block.playStoreUrl,
        appStoreBadgeUrl: block.appStoreBadgeUrl,
        playBadgeUrl: block.playBadgeUrl,
      }}
    />
  )
}
