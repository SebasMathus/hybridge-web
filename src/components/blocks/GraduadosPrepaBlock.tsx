import { GraduadosPrepa } from '@/components/GraduadosPrepa'

type Props = { block: any; locale: string }

export const GraduadosPrepaBlock = ({ block }: Props) => {
  return (
    <GraduadosPrepa
      graduatedCount={typeof block?.graduatedCount === 'number' ? block.graduatedCount : Number(block?.graduatedCount) || 220}
      percent={typeof block?.percent === 'number' ? block.percent : Number(block?.percent) || 15}
      mexicoUniversities={Array.isArray(block?.mexicoUniversities) ? block.mexicoUniversities.map((x: any) => x?.label).filter(Boolean) : undefined}
      abroadUniversities={Array.isArray(block?.abroadUniversities) ? block.abroadUniversities.map((x: any) => x?.label).filter(Boolean) : undefined}
    />
  )
}

