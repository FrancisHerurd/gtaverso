// src/lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export const GAMES = [
  "gta-6",
  "gta-5",
  "gta-san-andreas",
  "gta-vice-city",
  "gta-3",
] as const;

export const TYPES = [
  "noticias",
  "guias",
  "analisis",
  "trucos",
] as const;

export type Game = (typeof GAMES)[number];
export type PostType = (typeof TYPES)[number];

export type Post = {
  slug: string;
  game: Game;
  type: PostType;
  title: string;
  date: string;
  description: string;
  cover: string;
  content: string;
};

function safeString(v: unknown, fallback: string): string {
  return typeof v === "string" && v.trim() ? v.trim() : fallback;
}

function isGame(value: string): value is Game {
  return (GAMES as readonly string[]).includes(value);
}

function isType(value: string): value is PostType {
  return (TYPES as readonly string[]).includes(value);
}

export async function getAllPosts(): Promise<Post[]> {
  if (!fs.existsSync(contentDir)) return [];

  const files = fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  const posts: Post[] = files.map((file) => {
    const slug = file.replace(/\.mdx?$/, "");
    const fullPath = path.join(contentDir, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(raw);

    const rawGame = safeString(data.game, "gta-6"); // fallback temporal
    const rawType = safeString(data.type, "noticias"); // fallback temporal

    const game = isGame(rawGame) ? rawGame : "gta-6";
    const type = isType(rawType) ? rawType : "noticias";

    return {
      slug,
      game,
      type,
      title: safeString(data.title, "Sin título"),
      date: safeString(data.date, new Date().toISOString().slice(0, 10)),
      description: safeString(data.description, "Sin descripción"),
      cover: safeString(data.cover, "images/default-cover.jpg"),
      content,
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

/* -----------------------------
   Helpers nuevos game/type
-------------------------------- */

export async function getPostsByGame(game: Game): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => p.game === game);
}

export async function getPostsByGameAndType(
  game: Game,
  type: PostType
): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => p.game === game && p.type === type);
}

export async function getPostByGameTypeSlug(
  game: Game,
  type: PostType,
  slug: string
): Promise<Post | null> {
  const posts = await getAllPosts();
  return (
    posts.find((p) => p.game === game && p.type === type && p.slug === slug) ??
    null
  );
}