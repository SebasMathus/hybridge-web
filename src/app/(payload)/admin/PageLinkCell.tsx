'use client'

type RowData = {
  slug?: string
  pageType?: 'campaign' | 'main' | string
  campaignBaseSlug?: string
  campaignChannel?: 'tk' | 'yt' | string
}

function getHref(rowData: RowData): string {
  if (rowData?.pageType === 'campaign' && rowData?.campaignBaseSlug && rowData?.campaignChannel) {
    return `/es/${rowData.campaignBaseSlug}/${rowData.campaignChannel}`
  }
  const slug = rowData?.slug || ''
  if (!slug || slug === 'home') return '/es'
  return `/es/${slug}`
}

export function PageLinkCell({ rowData }: { rowData?: RowData }) {
  const href = getHref(rowData || {})

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title="Abrir página"
      aria-label="Abrir página"
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
        <path d="M3.9 12a5 5 0 0 1 5-5h3a1 1 0 1 1 0 2h-3a3 3 0 1 0 0 6h3a1 1 0 1 1 0 2h-3a5 5 0 0 1-5-5Zm6.1 1a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1Zm4-5a1 1 0 0 1 1-1h3a5 5 0 1 1 0 10h-3a1 1 0 1 1 0-2h3a3 3 0 1 0 0-6h-3a1 1 0 0 1-1-1Z" />
      </svg>
    </a>
  )
}

