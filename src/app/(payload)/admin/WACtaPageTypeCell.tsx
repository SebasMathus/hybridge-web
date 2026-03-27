'use client'

import { waCtaPageTipo } from '@/lib/waCtaLabels'

type RowData = { pageKey?: string }

export function WACtaPageTypeCell({ rowData }: { rowData?: RowData }) {
  const key = rowData?.pageKey != null ? String(rowData.pageKey) : ''
  return <span>{waCtaPageTipo(key)}</span>
}
