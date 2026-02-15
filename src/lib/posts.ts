import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'content')

export type Post = {
  slug: string
  title: string
  date: string
  description: string
  cover: string
  category: string
  content: string
}

function safeString(v: unknown, fallback: string) {
  return typeof v === 'string' && v.trim() ? v.trim() : fallback
}

export async function getAllPosts(): Promise<Post[]> {
  if (!fs.existsSync(contentDir)) return []

  const files = fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx?$/, '')
    const fullPath = path.join(contentDir, file)
    const raw = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(raw)

    return {
      slug,
      title: safeString(data.title, 'Sin título'),
      date: safeString(data.date, new Date().toISOString().slice(0, 10)),
      description: safeString(data.description, 'Sin descripción'),
      cover: safeString(data.cover, '/images/default-cover.jpg'),
      category: safeString(data.category, 'NOTICIAS'),
      content,
    }
  })

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const mdx = path.join(contentDir, `${slug}.mdx`)
  const md = path.join(contentDir, `${slug}.md`)

  const filePath = fs.existsSync(mdx) ? mdx : fs.existsSync(md) ? md : null
  if (!filePath) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)

  return {
    slug,
    title: safeString(data.title, 'Sin título'),
    date: safeString(data.date, new Date().toISOString().slice(0, 10)),
    description: safeString(data.description, 'Sin descripción'),
    cover: safeString(data.cover, '/images/default-cover.jpg'),
    category: safeString(data.category, 'NOTICIAS'),
    content,
  }
}