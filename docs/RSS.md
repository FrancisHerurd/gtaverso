# 📡 RSS Feed de GTAVerso

## URL del Feed

**Feed RSS principal:** [https://www.gtaverso.com/feed.xml](https://www.gtaverso.com/feed.xml)

## Características

- ✅ **Formato:** RSS 2.0 estándar
- ✅ **Contenido:** Últimas 50 noticias
- ✅ **Actualización:** ISR cada 1 hora (3600s)
- ✅ **Contenido completo:** Incluye HTML completo del post
- ✅ **Imágenes:** Featured image en cada item
- ✅ **Categorías:** Tag por juego (GTA 6, GTA 5, etc.)
- ✅ **Autor:** Nombre del autor de cada post
- ✅ **Metadatos:** Fechas de publicación precisas

## Namespaces soportados

- `content:encoded` - Contenido HTML completo
- `media:content` - Imágenes (Media RSS)
- `atom:link` - Autodiscovery
- `dc` - Dublin Core (metadatos)

## Lectores RSS compatibles

### Desktop
- [Feedly](https://feedly.com/) - Web/App
- [Inoreader](https://www.inoreader.com/) - Web/App
- [NewsBlur](https://newsblur.com/) - Web
- [The Old Reader](https://theoldreader.com/) - Web

### Móvil
- **iOS:** NetNewsWire, Reeder, Unread
- **Android:** Feedly, Inoreader, FeedMe

### Navegador
- Firefox: Add-ons de RSS
- Chrome: Extensiones como "RSS Feed Reader"

## Autodiscovery

Añade esto al `<head>` de tu layout principal para que los navegadores detecten el feed automáticamente:

```tsx
// app/layout.tsx
<link 
  rel="alternate" 
  type="application/rss+xml" 
  title="GTAVerso RSS Feed" 
  href="https://www.gtaverso.com/feed.xml" 
/>