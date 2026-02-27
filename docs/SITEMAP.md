# 🗺️ Sitemap XML de GTAVerso

## URL del Sitemap

**Sitemap principal:** [https://www.gtaverso.com/sitemap.xml](https://www.gtaverso.com/sitemap.xml)

## Contenido del Sitemap

El sitemap incluye automáticamente:

### Páginas estáticas
- ✅ Home (/)
- ✅ Noticias globales (/noticias)
- ✅ Buscador (/buscar)

### Páginas de juegos
- ✅ Hub de cada juego (/juegos/[game])
- ✅ Noticias por juego (/juegos/[game]/noticias)

### Posts dinámicos
- ✅ Todas las noticias de WordPress (/juegos/[game]/noticias/[slug])
- ✅ Hasta 1000 posts (configurable)

### Páginas legales
- ✅ Aviso Legal
- ✅ Política de Privacidad
- ✅ Política de Cookies
- ✅ Términos de Uso
- ✅ Contacto

## Prioridades

| Página | Priority | Change Frequency |
|--------|----------|------------------|
| Home | 1.0 | daily |
| Noticias | 0.9 | daily |
| Hub juegos | 0.8 | weekly |
| Noticias/juego | 0.7 | daily |
| Post individual | 0.6 | weekly |
| Buscador | 0.5 | weekly |
| Contacto | 0.4 | monthly |
| Legales | 0.3 | yearly |

## Actualización

- **Revalidación ISR:** Cada 1 hora (3600s)
- **Last Modified:** Fecha de modificación real del post desde WordPress

## Enviar a Google Search Console

1. Accede a [Google Search Console](https://search.google.com/search-console)
2. Añade tu propiedad: `gtaverso.com`
3. Ve a **Sitemaps**
4. Añade la URL: `https://www.gtaverso.com/sitemap.xml`
5. Haz clic en **Enviar**

## Testing local

```bash
# En desarrollo
http://localhost:3000/sitemap.xml

# Validar formato
https://www.xml-sitemaps.com/validate-xml-sitemap.html