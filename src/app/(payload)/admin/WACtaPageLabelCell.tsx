'use client'

import { waCtaPageLabel } from '@/lib/waCtaLabels'

type RowData = { pageKey?: string }

export function WACtaPageLabelCell({ rowData }: { rowData?: RowData }) {
  const key = rowData?.pageKey != null ? String(rowData.pageKey) : ''
  return <span>{waCtaPageLabel(key)}</span>
}
