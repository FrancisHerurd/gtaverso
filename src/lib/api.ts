// src/lib/api.ts

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

// Validación estricta en tiempo de ejecución
if (!WORDPRESS_API_URL) {
  throw new Error(
    '❌ NEXT_PUBLIC_WORDPRESS_API_URL no está definida. ' +
    'Asegúrate de tener un archivo .env.local con esta variable.'
  );
}

export async function fetchAPI(
  query: string,
  variables?: Record<string, any>
): Promise<any> {
  // TypeScript assertion: en este punto sabemos que WORDPRESS_API_URL existe
  const apiUrl = WORDPRESS_API_URL as string;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok) {
      console.error('❌ Error en respuesta de WordPress:', response.status, response.statusText);
      return null;
    }

    const json = await response.json();

    if (json.errors) {
      console.error('❌ Errores en GraphQL:', json.errors);
      return null;
    }

    return json.data;
  } catch (error) {
    console.error('❌ Error conectando con WordPress:', error);
    return null;
  }
}
