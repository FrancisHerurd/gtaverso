import Link from "next/link"
import Image from "next/image"
import { getAllPosts } from "@/lib/posts"

function Badge({ children }: { children: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold"
      style={{ background: "var(--gta-green)", color: "#061008" }}
    >
      {children}
    </span>
  )
}

export default async function Page() {
  const posts = await getAllPosts()
  const featured = posts.slice(0, 3)
  const latest = posts.slice(0, 6)

  const main = featured[0]
  const small = featured.slice(1)

  return (
    <div className="min-h-screen">
      {/* DESTACADOS */}
      <section className="relative">
        <div className="mx-auto max-w-[var(--container)] px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center gap-2">
            <span className="text-[var(--gta-green)]">🔥</span>
            <h2 className="text-2xl font-bold text-white">Destacados</h2>
          </div>

          {main && (
            <Link
              href={`/${main.slug}`}
              className="group relative mb-8 block overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              {/* Figma: 1216 x 384 */}
              <div className="relative h-[384px] w-full">
                <Image
                  src={main.cover || "/images/default-cover.jpg"}
                  alt={main.title}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1216px"
                  className="object-cover opacity-80 transition group-hover:opacity-100"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
              </div>

              {/* Badge overlay (arriba-izquierda) */}
              <div className="absolute left-6 top-6">
                <Badge>{main.category ?? "NOTICIAS"}</Badge>
              </div>

              <div className="absolute bottom-0 w-full p-6">
                <h3 className="text-3xl font-bold text-[var(--gta-green)]">
                  {main.title}
                </h3>
                <p className="mt-2 max-w-3xl text-sm text-white/70">
                  {main.description}
                </p>
                <div className="mt-3 text-sm font-semibold text-[var(--gta-green)]">
                  Leer más →
                </div>
              </div>
            </Link>
          )}

          {/* 2 cards pequeñas con badge overlay */}
          {small.length > 0 && (
            <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
              {small.map((p) => (
                <Link
                  key={p.slug}
                  href={`/${p.slug}`}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10"
                >
                  <div className="relative w-full">
                    {/* Figma: Card 596 x 192 (imagen 192px alto) */}
                    <div className="relative h-[192px] w-full">
                      <Image
                        src={p.cover || "/images/default-cover.jpg"}
                        alt={p.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 596px"
                        className="object-cover opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    </div>

                    {/* Badge overlay (arriba-izquierda) */}
                    <div className="absolute left-5 top-5">
                      <Badge>{p.category ?? "GUÍAS"}</Badge>
                    </div>
                  </div>

                  <div className="space-y-2 p-5">
                    <h4 className="text-lg font-bold text-white">{p.title}</h4>
                    <p className="text-sm text-white/70">{p.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ÚLTIMAS NOTICIAS (con imagen + badge overlay) */}
      <section className="relative">
        <div className="mx-auto max-w-[var(--container)] px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center gap-2">
            <span className="text-[var(--gta-green)]">📈</span>
            <h2 className="text-2xl font-bold text-white">Últimas Noticias</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latest.map((p) => (
              <Link
                key={p.slug}
                href={`/${p.slug}`}
                className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10"
              >
                <div className="relative">
                  {/* Imagen */}
                  <div className="relative h-[192px] w-full">
                    <Image
                      src={p.cover || "/images/default-cover.jpg"}
                      alt={p.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 400px"
                      className="object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  </div>

                  {/* Badge overlay (arriba-izquierda) */}
                  <div className="absolute left-5 top-5">
                    <Badge>{p.category ?? "NOTICIAS"}</Badge>
                  </div>
                </div>

                <div className="p-5">
                  <div className="text-xs text-white/50">{p.date}</div>
                  <h3 className="mt-2 text-lg font-bold text-white">{p.title}</h3>
                  <p className="mt-2 text-sm text-white/70">{p.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}