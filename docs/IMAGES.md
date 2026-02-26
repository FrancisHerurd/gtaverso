# 🖼️ Configuración de imágenes en GTAVerso

## Dominios permitidos

Las imágenes de WordPress están configuradas en `next.config.ts`:

- `gtaverso.com`
- `www.gtaverso.com`

Si tu WordPress está en otro dominio (ej: staging), añádelo en `remotePatterns`.

## Formatos optimizados

Next.js convierte automáticamente las imágenes a:
1. **AVIF** (prioridad, mejor compresión)
2. **WebP** (fallback)
3. **Original** (si el navegador no soporta los anteriores)

## Tamaños responsivos

Se generan automáticamente versiones para:
- Mobile: 640px, 750px, 828px
- Tablet: 1080px, 1200px
- Desktop: 1920px, 2048px, 3840px (4K)

## Uso en componentes

### Con blur placeholder automático

```tsx
<Image
  src={imageUrl}
  alt={altText}
  fill
  className="object-cover"
  placeholder="blur"
  blurDataURL="data:image/svg+xml;base64,..." // Generar dinámicamente
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>