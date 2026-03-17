import type { Locale } from '@/lib/utils'
import { HeroCarouselBlock } from './HeroCarouselBlock'
import { HeroBannerBlock } from './HeroBannerBlock'
import { LogosBarBlock } from './LogosBarBlock'
import { WhatsAppBarBlock } from './WhatsAppBarBlock'
import { VideoSectionBlock } from './VideoSectionBlock'
import { SplitContentBlock } from './SplitContentBlock'
import { FeaturesGridBlock } from './FeaturesGridBlock'
import { CurriculumTableBlock } from './CurriculumTableBlock'
import { TestimonialsRowBlock } from './TestimonialsRowBlock'
import { CTASectionBlock } from './CTASectionBlock'
import { PillarsGridBlock } from './PillarsGridBlock'
import { ProgramsGridBlock } from './ProgramsGridBlock'

const blockMap: Record<string, React.ComponentType<any>> = {
  heroCarousel: HeroCarouselBlock,
  heroBanner: HeroBannerBlock,
  logosBar: LogosBarBlock,
  whatsappBar: WhatsAppBarBlock,
  videoSection: VideoSectionBlock,
  splitContent: SplitContentBlock,
  featuresGrid: FeaturesGridBlock,
  curriculumTable: CurriculumTableBlock,
  testimonialsRow: TestimonialsRowBlock,
  ctaSection: CTASectionBlock,
  pillarsGrid: PillarsGridBlock,
  programsGrid: ProgramsGridBlock,
}

type Props = {
  blocks: any[]
  locale: Locale
}

export const RenderBlocks = ({ blocks, locale }: Props) => {
  if (!blocks?.length) return null
  return (
    <>
      {blocks.map((block, i) => {
        const Component = blockMap[block.blockType]
        if (!Component) return null
        return <Component key={block.id || i} block={block} locale={locale} />
      })}
    </>
  )
}
