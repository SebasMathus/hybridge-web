'use client'

import type { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'
import { normalizeMarkdownNewlines } from '@/lib/resolveLocalized'
import { getYouTubeVideoId } from '@/lib/utils'

type Props = { markdown: string }

function textFromChildren(children: ReactNode): string {
  if (children == null) return ''
  if (typeof children === 'string' || typeof children === 'number') return String(children)
  if (Array.isArray(children)) return children.map(textFromChildren).join('')
  return ''
}

function YouTubeEmbed({ videoId }: { videoId: string }) {
  return (
    <span className="blog-yt-wrap">
      <iframe
        title="YouTube"
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
    </span>
  )
}

function makeComponents(): Components {
  return {
    a: ({ href, children }) => {
      const id = href ? getYouTubeVideoId(href) : ''
      const childText = textFromChildren(children)
      const isBareUrl = id && href && childText.replace(/\s/g, '') === href.replace(/\s/g, '')
      if (isBareUrl) {
        return <YouTubeEmbed videoId={id} />
      }
      return (
        <a
          href={href}
          target={href?.startsWith('http') ? '_blank' : undefined}
          rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      )
    },
    img: ({ src, alt }) =>
      src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="blog-prose-img" src={src} alt={alt ?? ''} loading="lazy" />
      ) : null,
  }
}

export function BlogArticleBody({ markdown }: Props) {
  const source = normalizeMarkdownNewlines(markdown)
  return (
    <div className="blog-prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={makeComponents()}>
        {source}
      </ReactMarkdown>
    </div>
  )
}
