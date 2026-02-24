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
  
  if (json.errors) {
    // 🔥 Forzamos que se imprima enorme y claro en la terminal
    console.log("====================================");
    console.log("❌ ERROR DEVUELTO POR WORDPRESS:");
    console.log(JSON.stringify(json.errors, null, 2));
    console.log("====================================");
    throw new Error("WPGraphQL devolvió un error (mira arriba en la terminal)");
  }

  return json.data;
}