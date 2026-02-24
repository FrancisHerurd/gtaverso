import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { fetchAPI } from '@/lib/api'

// ─── Tipos ───────────────────────────────────────────────────────────────────
type PageProps = { params: Promise<{ game: string; slug: string }> }

type GuiaNode = {
  title?: string
  slug?: string
  content?: string
  date?: string
  modified?: string
  featuredImage?: { node?: { sourceUrl?: string; altText?: string } }
  juegos?: { nodes?: Array<{ slug?: string; name?: string }> }
  seo?: { title?: string; metaDesc?: string; canonical?: string }
}

// ─── Query ───────────────────────────────────────────────────────────────────
async function getGuiaBySlug(slug: string): Promise<GuiaNode | null> {
  const data = await fetchAPI(`
    query GuiaBySlug($slug: String!) {
      guias(first: 1, where: { name: $slug }) {
        nodes {
          title
          slug
          content
          date
          modified
          featuredImage { node { sourceUrl altText } }
          juegos { nodes { slug name } }
          seo { title metaDesc canonical }
        }
      }
    }
  `, { slug })
  return data?.guias?.nodes?.[0] ?? null
}

// ─── Metadata dinámica (Yoast SEO) ───────────────────────────────────────────
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { game, slug } = await params
  const guia = await getGuiaBySlug(slug)
  if (!guia?.slug) return { title: 'Guía no encontrada · GTAVerso' }

  const canonical = `https://www.gtaverso.com/juegos/${game}/guias/${guia.slug}`
  const title = guia.seo?.title ?? `${guia.title} · GTAVerso`
  const description = guia.seo?.metaDesc ?? `Guía de ${guia.title} en GTAVerso.`
  const ogImage = guia.featuredImage?.node?.sourceUrl

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
      ...(ogImage && { images: [{ url: ogImage }] }),
    },
  }
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default async function GuiaDetailPage({ params }: PageProps) {
  const { game, slug } = await params
  const guia = await getGuiaBySlug(slug)

  if (!guia?.slug) notFound()

  // Silo SEO: 404 si la guía no pertenece al juego del path
  const juegoSlugs = (guia.juegos?.nodes ?? [])
    .map(j => j?.slug)
    .filter(Boolean) as string[]
  if (juegoSlugs.length > 0 && !juegoSlugs.includes(game)) notFound()

  const img = guia.featuredImage?.node?.sourceUrl
  const alt = guia.featuredImage?.node?.altText ?? guia.title ?? 'Imagen de portada'
  const formattedDate = guia.date
    ? new Date(guia.date).toLocaleDateString('es-ES', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : null

  // JSON-LD Article
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guia.title,
    description: guia.seo?.metaDesc ?? '',
    datePublished: guia.date,
    dateModified: guia.modified ?? guia.date,
    image: img,
    author: { '@type': 'Organization', name: 'GTAVerso' },
    publisher: {
      '@type': 'Organization',
      name: 'GTAVerso',
      logo: { '@type': 'ImageObject', url: 'https://www.gtaverso.com/images/logo.svg' },
    },
  }

  return (
    <article className="min-h-screen bg-[#050508] pt-24 pb-20 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb + volver */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/60">
          <ol className="flex flex-wrap items-center gap-1">
            <li><Link href="/juegos" className="hover:text-[#00FF41] transition">Juegos</Link></li>
            <li><span className="px-1">/</span></li>
            <li><Link href={`/juegos/${game}`} className="hover:text-[#00FF41] transition capitalize">{game.replace(/-/g, ' ')}</Link></li>
            <li><span className="px-1">/</span></li>
            <li><Link href={`/juegos/${game}/guias`} className="hover:text-[#00FF41] transition">Guías</Link></li>
            <li><span className="px-1">/</span></li>
            <li className="text-white/90 line-clamp-1">{guia.title}</li>
          </ol>
        </nav>

        <Link
          href={`/juegos/${game}/guias`}
          className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-[#00FF41] transition mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a Guías
        </Link>

        {/* Hero image */}
        {img && (
          <div className="relative mb-8 h-64 w-full overflow-hidden rounded-2xl sm:h-80">
            <Image src={img} alt={alt} fill className="object-cover" priority />
          </div>
        )}

        {/* Cabecera */}
        <header className="mb-8">
          {formattedDate && (
            <time className="text-xs text-white/50 uppercase tracking-widest">
              {formattedDate}
            </time>
          )}
          <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">
            {guia.title}
          </h1>
        </header>

        {/* Contenido HTML de WordPress */}
        {guia.content ? (
          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:text-white prose-headings:font-bold
              prose-a:text-[#00FF41] hover:prose-a:text-[#00FF41]/80
              prose-img:rounded-xl prose-img:w-full
              prose-strong:text-white"
            dangerouslySetInnerHTML={{ __html: guia.content }}
          />
        ) : (
          <p className="text-white/50">Esta guía aún no tiene contenido.</p>
        )}
      </div>
    </article>
  )
}