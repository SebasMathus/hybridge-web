import { getPayloadClient } from '@/lib/payload'
import type { Locale } from '@/lib/utils'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ locale: string }> }

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  const lang = (locale === 'en' ? 'en' : 'es') as Locale

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } },
      locale: lang,
      limit: 1,
    })
    const page = result.docs[0]
    if (!page) return <div className="container-hb section-pad">Visita /api/seed para crear las paginas, luego recarga.</div>
    return <RenderBlocks blocks={page.layout || []} locale={lang} />
  } catch (e) {
    return <div className="container-hb section-pad">Ejecuta npm run dev, ve a /admin para crear tu usuario, luego visita /api/seed</div>
  }
}
