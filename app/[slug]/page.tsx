import { notFound } from 'next/navigation'
import { getPostBySlug } from '@/lib/posts'

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  return (
    <article className="space-y-4">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-sm text-gray-500">{post.date}</p>
      <p className="text-gray-700">{post.description}</p>

      <pre className="whitespace-pre-wrap rounded-xl border bg-white p-5 text-sm">
        {post.content}
      </pre>
    </article>
  )
}