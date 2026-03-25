import { getPayloadClient } from '@/lib/payload'
import { blogDocToCard } from '@/lib/blogSerialize'
import type { Locale } from '@/lib/utils'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const lang = (searchParams.get('locale') === 'en' ? 'en' : 'es') as Locale
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1)
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '10', 10) || 10))
  const ct = searchParams.get('contentType')
  const where =
    ct === 'testimonio' || ct === 'comunidad' ? { contentType: { equals: ct } } : undefined

  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'blog-posts',
      locale: lang,
      sort: '-publishedAt',
      limit,
      page,
      depth: 0,
      ...(where ? { where } : {}),
    })

    const docs = res.docs.map((doc) => blogDocToCard(doc as Record<string, unknown>, lang))

    const totalDocs = typeof res.totalDocs === 'number' ? res.totalDocs : docs.length
    const currentPage = typeof res.page === 'number' ? res.page : page
    const pageSize = typeof res.limit === 'number' ? res.limit : limit
    const hasNextPage =
      typeof res.hasNextPage === 'boolean' ? res.hasNextPage : currentPage * pageSize < totalDocs

    return NextResponse.json({
      docs,
      totalDocs,
      page: currentPage,
      totalPages: typeof res.totalPages === 'number' ? res.totalPages : Math.ceil(totalDocs / pageSize) || 1,
      hasNextPage,
    })
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e)
    return NextResponse.json({ error: message, docs: [], totalDocs: 0, hasNextPage: false }, { status: 500 })
  }
}
