import type { ComponentType } from 'react'
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
import { FormBlockComponent } from './FormBlock'
import { CtaFechaInicioBlockComponent } from './CtaFechaInicioBlock'
import { GraduadosPrepaBlock } from './GraduadosPrepaBlock'
import { OrgulloPrepaBlock } from './OrgulloPrepaBlock'
import { BenefitsHybridgeBlockComponent } from './BenefitsHybridgeBlock'
import { ModeloEducativoBlockComponent } from './ModeloEducativoBlock'
import { Oportunidades2026BlockComponent } from './Oportunidades2026Block'
import { IndustryLeadersBlockComponent } from './IndustryLeadersBlock'
import { TalleresHybridgeBlockComponent } from './TalleresHybridgeBlock'
import { HybridgeAppBlockComponent } from './HybridgeAppBlock'

const blockMap: Record<string, ComponentType<any>> = {
  heroCarousel: HeroCarouselBlock,
  heroBanner: HeroBannerBlock,
  logosBar: LogosBarBlock,
  whatsappBar: WhatsAppBarBlock,
  videoSection: VideoSectionBlock,
  splitContent: SplitContentBlock,
  featuresGrid: FeaturesGridBlock,
  curriculumTable: CurriculumTableBlock,
  curriculumPlan: ({ block, locale }: { block: any; locale: Locale }) => {
    if (!block?.plan) return null
    return <CurriculumTableBlock block={block.plan} locale={locale} />
  },
  testimonialsRow: TestimonialsRowBlock,
  testimonialsPlan: ({ block, locale }: { block: any; locale: Locale }) => {
    if (!block?.testimonials || typeof block.testimonials !== 'object') return null
    const doc = block.testimonials
    return (
      <TestimonialsRowBlock
        block={{
          eyebrow: doc.eyebrow,
          heading: doc.heading,
          backgroundColor: block.backgroundColor ?? 'cream',
          testimonials: doc.testimonials ?? [],
        }}
        locale={locale}
      />
    )
  },
  ctaSection: CTASectionBlock,
  ctaFechaInicio: CtaFechaInicioBlockComponent,
  graduadosPrepa: GraduadosPrepaBlock,
  orgulloPrepa: OrgulloPrepaBlock,
  pillarsGrid: PillarsGridBlock,
  programsGrid: ProgramsGridBlock,
  formBlock: FormBlockComponent,
  benefitsHybridge: BenefitsHybridgeBlockComponent,
  modeloEducativo: ModeloEducativoBlockComponent,
  oportunidades2026: Oportunidades2026BlockComponent,
  industryLeaders: IndustryLeadersBlockComponent,
  talleresHybridge: TalleresHybridgeBlockComponent,
  hybridgeApp: HybridgeAppBlockComponent,
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
