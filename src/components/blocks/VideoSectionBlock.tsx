type Props = { block: any; locale: string }

function getYouTubeId(url: string): string {
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : ''
}

export const VideoSectionBlock = ({ block }: Props) => {
  const videoId = getYouTubeId(block.youtubeUrl || '')
  if (!videoId) return null
  const bg = block.backgroundColor === 'cream' ? 'var(--color-hb-bg-alt)' : 'var(--color-hb-bg)'

  return (
    <section className="section-pad" style={{ background: bg }}>
      <div className="container-hb">
        {(block.heading || block.subheading) && (
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            {block.heading && <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 900, color: 'var(--color-hb-text)', marginBottom: '8px' }}>{block.heading}</h2>}
            {block.subheading && <p style={{ color: 'var(--color-hb-text)', fontSize: '1.05rem', fontWeight: 500 }}>{block.subheading}</p>}
          </div>
        )}
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: '12px', overflow: 'hidden' }}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}
