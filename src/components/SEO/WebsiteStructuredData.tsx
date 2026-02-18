export function WebsiteStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "GTAVerso",
    "url": "https://gtaverso.com",
    "description": "Noticias, guías y leaks de GTA 6, GTA 5 Online y Red Dead Redemption",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://gtaverso.com/buscar?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "inLanguage": "es-ES"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}