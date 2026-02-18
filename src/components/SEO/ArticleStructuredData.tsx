interface ArticleStructuredDataProps {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  url: string;
}

export function ArticleStructuredData({
  title,
  description,
  image,
  datePublished,
  dateModified = datePublished,
  author = 'GTAVerso',
  url
}: ArticleStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle", // Mejor para noticias GTA
    "headline": title,
    "description": description,
    "image": [image],
    "datePublished": datePublished,
    "dateModified": dateModified,
    "author": {
      "@type": "Organization",
      "name": "GTAVerso"
    },
    "publisher": {
      "@type": "Organization",
      "name": "GTAVerso",
      "logo": {
        "@type": "ImageObject",
        "url": "https://gtaverso.com/images/logo-gtaverso.png" // Cambia por tu logo
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}