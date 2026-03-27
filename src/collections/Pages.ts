import type { CollectionConfig } from 'payload'
import {
  HeroCarouselBlock, HeroBannerBlock, LogosBarBlock, WhatsAppBarBlock,
  VideoSectionBlock, SplitContentBlock, FeaturesGridBlock, CurriculumPlanBlock,
  TestimonialsPlanBlock, CTASectionBlock, PillarsGridBlock, ProgramsGridBlock,
  GraduadosPrepaBlock,
  OrgulloPrepaBlock,
  CtaFechaInicioBlock,
  FormBlock,
  BenefitsHybridgeBlock,
  ModeloEducativoBlock,
  Oportunidades2026Block,
  IndustryLeadersBlock,
  TalleresHybridgeBlock,
  HybridgeAppBlock,
} from '../blocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Página', plural: 'Páginas' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'pageType', 'slug', 'updatedAt', 'link'] },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    {
      name: 'pageType',
      label: 'Tipo de página',
      type: 'select',
      required: true,
      defaultValue: 'main',
      options: [
        { label: 'Principal', value: 'main' },
        { label: 'Landing de campaña', value: 'campaign' },
        { label: 'Landing de alianza', value: 'alliance' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'campaignBaseSlug',
      label: 'Slug base (campaña)',
      type: 'text',
      admin: {
        position: 'sidebar',
        condition: (_, siblingData) => siblingData?.pageType === 'campaign',
      },
    },
    {
      name: 'campaignChannel',
      label: 'Canal (campaña)',
      type: 'select',
      options: [
        { label: 'TikTok', value: 'tk' },
        { label: 'YouTube', value: 'yt' },
      ],
      admin: {
        position: 'sidebar',
        condition: (_, siblingData) => siblingData?.pageType === 'campaign',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar', description: 'URL path. Use "home" for homepage.' },
    },
    {
      name: 'link',
      label: 'Link',
      type: 'ui',
      admin: {
        components: {
          Cell: {
            path: '@/app/(payload)/admin/PageLinkCell',
            exportName: 'PageLinkCell',
          } as any,
        },
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      localized: true,
      blocks: [
        HeroCarouselBlock, HeroBannerBlock, LogosBarBlock, WhatsAppBarBlock,
        VideoSectionBlock, SplitContentBlock, FeaturesGridBlock, CurriculumPlanBlock,
        TestimonialsPlanBlock, CTASectionBlock, PillarsGridBlock, ProgramsGridBlock,
        GraduadosPrepaBlock,
        OrgulloPrepaBlock,
        CtaFechaInicioBlock,
        FormBlock,
        BenefitsHybridgeBlock,
        ModeloEducativoBlock,
        Oportunidades2026Block,
        IndustryLeadersBlock,
        TalleresHybridgeBlock,
        HybridgeAppBlock,
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
