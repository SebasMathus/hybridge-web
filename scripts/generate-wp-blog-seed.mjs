#!/usr/bin/env node
/**
 * Regenera src/seedData/blogPosts/wpSeed.generated.json desde WordPress.
 * Uso: curl -sS 'https://hybridge.education/wp-json/wp/v2/posts?per_page=100&_embed=1' -o tmp-wp-all.json && node scripts/generate-wp-blog-seed.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import TurndownService from 'turndown'
import { decode } from 'entities'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const input = path.join(root, 'tmp-wp-all.json')
const out = path.join(root, 'src/seedData/blogPosts/wpSeed.generated.json')

const raw = JSON.parse(fs.readFileSync(input, 'utf8'))
const turndown = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-' })

function preprocessHtml(html) {
  let h = html
  h = h.replace(/<iframe[^>]+src=['"]([^'"]+)['"][^>]*><\/iframe>/gi, (match, src) => {
    const m = src.match(/\/embed\/([a-zA-Z0-9_-]{11})/)
    if (m) return `<p>https://www.youtube.com/watch?v=${m[1]}</p>`
    const m2 = src.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/)
    if (m2) return `<p>https://www.youtube.com/watch?v=${m2[1]}</p>`
    return ''
  })
  return h
}

function stripHtml(s) {
  return decode(s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
}

function metaFromExcerpt(ex) {
  let t = stripHtml(ex)
  if (t.length > 165) t = t.slice(0, 162) + '…'
  return t || stripHtml(ex)
}

function featuredUrl(post) {
  const emb = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
  if (emb) return emb
  if (post.jetpack_featured_media_url) return post.jetpack_featured_media_url
  return ''
}

function classify(post) {
  const slug = post.slug.toLowerCase()
  const title = stripHtml(post.title.rendered).toLowerCase()
  const termNames = []
  for (const g of post._embedded?.['wp:term'] || [])
    for (const t of g) termNames.push((t.name || '').toLowerCase())
  if (termNames.some((n) => n.includes('testimonio'))) return 'testimonio'
  if (/testimonio|testiminio/.test(slug)) return 'testimonio'
  if (/experiencia-de-|la-experiencia-de-/.test(slug)) return 'testimonio'
  if (/la historia de\b/.test(title) && /hybridge/.test(title)) return 'testimonio'
  if (/^la experiencia de .+ estudiando/.test(title)) return 'testimonio'
  if (/¿por qué un ingeniero/.test(title) && /estudiar/.test(title)) return 'testimonio'
  if (/estudiante de\b/.test(title) && /hybridge/.test(title)) return 'testimonio'
  if (/^estudiar la prepa en línea:/i.test(title) && /experiencia de/i.test(title)) return 'testimonio'
  if (/^estudiar ingeniería en inteligencia artificial en línea:/i.test(title) && /historia de/i.test(title))
    return 'testimonio'
  return 'comunidad'
}

const rows = raw.map((post) => {
  const md = turndown.turndown(preprocessHtml(post.content.rendered))
  const titlePlain = stripHtml(post.title.rendered)
  return {
    slug: post.slug,
    titleEs: titlePlain,
    titleEn: titlePlain,
    publishedAt: new Date(post.date).toISOString(),
    authorName: 'Hybridge',
    contentType: classify(post),
    featuredImageUrl: featuredUrl(post),
    metaDescriptionEs: metaFromExcerpt(post.excerpt.rendered),
    metaDescriptionEn: metaFromExcerpt(post.excerpt.rendered),
    bodyMarkdownEs: md,
    bodyMarkdownEn: md,
  }
})
rows.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
fs.mkdirSync(path.dirname(out), { recursive: true })
fs.writeFileSync(out, JSON.stringify(rows))
console.log('Wrote', rows.length, 'posts →', out, 'bytes', fs.statSync(out).size)
