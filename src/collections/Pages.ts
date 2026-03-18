import type { CollectionConfig } from 'payload'
import {
  HeroCarouselBlock, HeroBannerBlock, LogosBarBlock, WhatsAppBarBlock,
  VideoSectionBlock, SplitContentBlock, FeaturesGridBlock, CurriculumPlanBlock,
  TestimonialsPlanBlock, CTASectionBlock, PillarsGridBlock, ProgramsGridBlock,
  CtaFechaInicioBlock,
  FormBlock,
} from '../blocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Página', plural: 'Páginas' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'slug', 'updatedAt'] },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar', description: 'URL path. Use "home" for homepage.' },
    },
    {
      name: 'layout',
      type: 'blocks',
      localized: true,
      blocks: [
        HeroCarouselBlock, HeroBannerBlock, LogosBarBlock, WhatsAppBarBlock,
        VideoSectionBlock, SplitContentBlock, FeaturesGridBlock, CurriculumPlanBlock,
        TestimonialsPlanBlock, CTASectionBlock, PillarsGridBlock, ProgramsGridBlock,
        CtaFechaInicioBlock,
        FormBlock,
      ],
    },
    {
      name: 'meta',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
      ],
    },
  ],
}
