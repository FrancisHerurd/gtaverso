// app/feed.xml/route.ts
import { fetchAPI } from '@/lib/api'

const SITE_URL = 'https://www.gtaverso.com'
const SITE_NAME = 'GTAVerso'
const SITE_DESCRIPTION = 'Noticias, guías y trucos de GTA 6, GTA 5, GTA 4, San Andreas, Vice City y toda la saga Grand Theft Auto'

type Post = {
  title: string
  slug: string
  excerpt: string
  content: string
  date: string
  author?: { node?: { name?: string } }
  featuredImage?: { node?: { sourceUrl?: string } }
  juegos?: { nodes?: Array<{ slug?: string; name?: string }> }
}

export const revalidate = 3600 // Revalidar cada hora

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim()
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

async function getRSSPosts(): Promise<Post[]> {
  const data = await fetchAPI(`
    query RSSPosts {
      posts(first: 50, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          title
          slug
          excerpt
          content
          date
          author { node { name } }
          featuredImage { node { sourceUrl } }
          juegos { nodes { slug name } }
        }
      }
    }
  `)

  return (data?.posts?.nodes || []) as Post[]
}

function generateRSSItem(post: Post): string {
  const gameSlug = post.juegos?.nodes?.[0]?.slug || 'gta-6'
  const gameName = post.juegos?.nodes?.[0]?.name || 'GTA'
  const postUrl = `${SITE_URL}/juegos/${gameSlug}/noticias/${post.slug}`
  const imageUrl = post.featuredImage?.node?.sourceUrl || ''
  const author = post.author?.node?.name || 'Equipo GTAVerso'
  const pubDate = new Date(post.date).toUTCString()
  
  // Descripción limpia (excerpt sin HTML)
  const description = escapeXml(stripHtml(post.excerpt || post.content).slice(0, 300))
  
  // Contenido completo con imagen si existe
  let contentHtml = post.content
  if (imageUrl) {
    contentHtml = `<img src="${imageUrl}" alt="${escapeXml(post.title)}" style="max-width:100%;height:auto;margin-bottom:1rem;" />${contentHtml}`
  }

  return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${description}</description>
      <content:encoded><![CDATA[${contentHtml}]]></content:encoded>
      <pubDate>${pubDate}</pubDate>
      <author>${escapeXml(author)}</author>
      <category>${escapeXml(gameName)}</category>
      ${imageUrl ? `<enclosure url="${imageUrl}" type="image/jpeg" />` : ''}
      ${imageUrl ? `<media:content url="${imageUrl}" medium="image" />` : ''}
    </item>`
}

export async function GET() {
  try {
    const posts = await getRSSPosts()
    const buildDate = new Date().toUTCString()
    const lastBuildDate = posts[0] ? new Date(posts[0].date).toUTCString() : buildDate

    const rssItems = posts.map(generateRSSItem).join('\n')

    const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>es</language>
    <copyright>Copyright ${new Date().getFullYear()} ${escapeXml(SITE_NAME)}</copyright>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <pubDate>${buildDate}</pubDate>
    <ttl>60</ttl>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_URL}/logo.png</url>
      <title>${escapeXml(SITE_NAME)}</title>
      <link>${SITE_URL}</link>
    </image>
    ${rssItems}
  </channel>
</rss>`

    return new Response(rssFeed, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    })
  } catch (error) {
    console.error('Error generando RSS feed:', error)
    return new Response('Error generando RSS feed', { status: 500 })
  }
}