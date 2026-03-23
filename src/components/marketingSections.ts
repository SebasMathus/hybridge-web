/**
 * Secciones de marketing reutilizables en cualquier página.
 *
 * - Uso directo: importa el componente `*Section` y pasa props (ver tipos exportados).
 * - Payload CMS: bloques registrados en `Pages` → `layout`; datos por defecto en `src/seedData/pageBlocksMarketing.ts`.
 *
 * Slugs de bloque (blockType):
 * - `modeloEducativo`, `oportunidades2026`, `industryLeaders`, `talleresHybridge`,
 *   `hybridgeApp`, `benefitsHybridge`
 * - Perfil de ingreso: bloque estándar `splitContent` (ver seed `perfilIngresoSplitBlock`).
 */

export {
  ModeloEducativoSection,
  DEFAULT_MODELO_EDUCATIVO_PILLARS,
  type ModeloEducativoPillar,
  type ModeloEducativoSectionProps,
} from './ModeloEducativoSection'

export {
  Oportunidades2026Section,
  DEFAULT_OPORTUNIDADES_ITEMS,
  type OportunidadItem,
  type Oportunidades2026SectionProps,
} from './Oportunidades2026Section'

export {
  IndustryLeadersSection,
  DEFAULT_INDUSTRY_LEADERS,
  type IndustryLeadersSectionProps,
} from './IndustryLeadersSection'

export {
  TalleresHybridgeSection,
  DEFAULT_TALLERES_WORKSHOPS,
  type TalleresWorkshop,
  type TalleresHybridgeSectionProps,
} from './TalleresHybridgeSection'

export {
  HybridgeAppSection,
  HybridgeAppStoreBadges,
  DEFAULT_HYBRIDGE_APP_IMAGE,
  type HybridgeAppSectionProps,
  type HybridgeAppStoreBadgesProps,
} from './HybridgeAppSection'

export { BenefitsHybridgeGrid } from './BenefitsHybridgeGrid'
