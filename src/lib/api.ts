// lib/api.ts
// Este archivo es la conexión entre Next.js y tu WordPress via GraphQL.

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export async function fetchAPI(query: string, variables?: Record<string, unknown>) {
  if (!API_URL) {
    throw new Error(
      "❌ Falta NEXT_PUBLIC_WORDPRESS_API_URL en tu archivo .env.local"
    );
  }

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // Actualiza la caché cada 60 segundos
  });

  const json = await res.json();

  if (json?.errors) {
    console.error("WPGraphQL Error:", json.errors);
    throw new Error("Error en la API de WPGraphQL");
  }

  return json.data;
}