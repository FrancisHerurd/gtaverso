# 🎯 SEO y Metadatos Open Graph - GTAVerso

## Configuración actual

### Open Graph (Facebook, LinkedIn, Discord)
- ✅ Títulos dinámicos por página
- ✅ Descripciones optimizadas (155 caracteres)
- ✅ Imágenes 1200x630px
- ✅ URLs canónicas
- ✅ Locale: es_ES
- ✅ Type: website / article

### Twitter Cards
- ✅ Summary Large Image
- ✅ Handle: @GTA_Verso
- ✅ Títulos y descripciones específicas

### Structured Data (JSON-LD)
- ✅ **NewsArticle** en posts
- ✅ **BreadcrumbList** en navegación
- ✅ **WebSite** con SearchAction
- ✅ **Organization** del publisher

## Uso de la utilidad SEO

### Página estática

```tsx
import { generateSEO } from '@/lib/seo'

export const metadata = generateSEO({
  title: 'Noticias de GTA 6',
  description: 'Últimas noticias sobre GTA 6...',
  url: '/juegos/gta-6/noticias',
})