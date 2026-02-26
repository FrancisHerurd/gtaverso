// app/juegos/[game]/noticias/page.tsx
import { Metadata } from 'next';
import NoticiasGameClient from './NoticiasGameClient';
import { fetchAPI } from '@/lib/api';

export const revalidate = 60;
export const dynamic = 'force-static';

const TITLES: Record<string, { label: string; color: string }> = {
  'gta-6': { label: 'GTA 6', color: '#FF00FF' },
  'gta-5': { label: 'GTA 5', color: '#569446' },
  'gta-4': { label: 'GTA 4', color: '#FBBF24' },
  'gta-san-andreas': { label: 'GTA San Andreas', color: '#FFA500' },
  'gta-vice-city': { label: 'GTA Vice City', color: '#00E5FF' },
  'gta-3': { label: 'GTA 3', color: '#E5E7EB' },
};

async function getNewsByGame(gameSlug: string) {
  const data = await fetchAPI(
    `
    query GetNewsByGame($gameSlug: String!) {
      posts(first: 12, where: { categoryName: $gameSlug, orderby: { field: DATE, order: DESC } }) {
        nodes {
          title
          slug
          excerpt
          date
          featuredImage { node { sourceUrl altText } }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `,
    { gameSlug }
  );

  return {
    posts: data?.posts?.nodes || [],
    pageInfo: data?.posts?.pageInfo || { hasNextPage: false, endCursor: null }
  };
}

export async function generateMetadata(
  { params }: { params: Promise<{ game: string }> }
): Promise<Metadata> {
  const { game } = await params;
  const meta = TITLES[game] ?? { label: game.toUpperCase(), color: '#00FF41' };
  return {
    title: `Noticias de ${meta.label} - GTAVerso`,
    description: `Últimas noticias y novedades de ${meta.label}.`,
    alternates: { canonical: `https://gtaverso.com/juegos/${game}/noticias` },
  };
}

export default async function GameNewsPage(
  { params }: { params: Promise<{ game: string }> }
) {
  const { game } = await params;
  const { posts, pageInfo } = await getNewsByGame(game);
  const meta = TITLES[game] ?? { label: game.toUpperCase().replace('-', ' '), color: '#00FF41' };

  return <NoticiasGameClient game={game} initialPosts={posts} initialPageInfo={pageInfo} meta={meta} />;
}