// Tipos de datos para artículos
export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'noticias' | 'guias' | 'analisis' | 'trucos';
  author: string;
  publishedAt: string;
  updatedAt: string;
  imageUrl: string;
  imageAlt: string;
  tags: string[];
  featured: boolean;
  readTime: number;
}

// Datos mock de artículos (preparado para migrar a base de datos)
export const articles: Article[] = [
  {
    id: '1',
    title: 'GTA 6: Todo lo que sabemos sobre el lanzamiento en 2026',
    slug: 'gta-6-todo-lo-que-sabemos-lanzamiento-2026',
    excerpt: 'Recopilamos toda la información oficial y rumores verificados sobre GTA 6, incluyendo fecha de lanzamiento, mapas, personajes y nuevas mecánicas de juego.',
    content: `
      <h2>El regreso a Vice City</h2>
      <p>Después de años de espera, Rockstar Games ha confirmado oficialmente que GTA 6 nos llevará de vuelta a Vice City, pero con un mapa completamente reimaginado que incluirá zonas rurales y pantanosas inspiradas en Florida.</p>
      
      <h3>Protagonistas duales</h3>
      <p>Por primera vez en la saga moderna, tendremos dos protagonistas jugables desde el inicio: Lucia y Jason, en una historia inspirada en Bonnie y Clyde que promete revolucionar la narrativa de la serie.</p>
      
      <h3>Nuevas mecánicas de juego</h3>
      <p>Se han filtrado múltiples mecánicas innovadoras:</p>
      <ul>
        <li>Sistema dinámico de clima y desastres naturales (huracanes)</li>
        <li>Economía mejorada con criptomonedas y lavado de dinero</li>
        <li>Mayor interacción con NPCs y diálogos ramificados</li>
        <li>Sistema de construcción de imperio criminal más profundo</li>
      </ul>
      
      <h3>Fecha de lanzamiento</h3>
      <p>Rockstar ha confirmado que GTA 6 llegará en 2026 para PlayStation 5 y Xbox Series X/S. La versión de PC se espera para 2027.</p>
      
      <h3>Requisitos esperados</h3>
      <p>Aunque no hay confirmación oficial, se especula que GTA 6 requerirá hardware de última generación con al menos 16GB de RAM y GPUs equivalentes a RTX 3070 o superiores.</p>
    `,
    category: 'noticias',
    author: 'Carlos Martínez',
    publishedAt: '2026-02-10T10:00:00Z',
    updatedAt: '2026-02-14T15:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1688377051459-aebb99b42bff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwY2l0eSUyMGN5YmVycHVua3xlbnwxfHx8fDE3NzEwOTI5MDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    imageAlt: 'Vista nocturna de Vice City inspirada en GTA 6',
    tags: ['GTA 6', 'Rockstar', 'Vice City', 'Lanzamiento 2026'],
    featured: true,
    readTime: 8
  },
  {
    id: '2',
    title: 'Guía completa: Cómo ganar $1 millón por hora en GTA Online',
    slug: 'guia-como-ganar-millon-por-hora-gta-online',
    excerpt: 'Descubre los mejores métodos actualizados para 2026 que te permitirán maximizar tus ganancias en GTA Online y conseguir el millón de dólares por hora.',
    content: `
      <h2>Métodos más rentables en 2026</h2>
      <p>Con las últimas actualizaciones de GTA Online, hemos identificado los métodos más eficientes para generar ingresos masivos.</p>
      
      <h3>1. Golpe del Pacífico (Nuevo DLC)</h3>
      <p>El golpe más reciente puede generar hasta $2.5 millones en 2 horas con un equipo coordinado. Requisitos mínimos y pasos:</p>
      <ul>
        <li>Facilidad de alto nivel desbloqueada</li>
        <li>Equipo de 4 jugadores experimentados</li>
        <li>Inversión inicial: $50,000</li>
        <li>Ganancia promedio: $2.5M en 2 horas</li>
      </ul>
      
      <h3>2. Negocios AFK optimizados</h3>
      <p>Combina múltiples negocios pasivos:</p>
      <ul>
        <li>Búnker: $700K cada 12 horas</li>
        <li>Club nocturno: $500K cada 24 horas</li>
        <li>Hangar de contrabando: $400K cada 10 horas</li>
      </ul>
      
      <h3>3. Contratos VIP de Agencia</h3>
      <p>Los contratos de seguridad pueden generar $300K en 30 minutos jugando solo. El mejor método para jugadores sin equipo.</p>
      
      <h3>Consejos Pro</h3>
      <ul>
        <li>Aprovecha las semanas de bonificación x2</li>
        <li>Invierte en el Kosatka para el Golpe de Cayo Perico</li>
        <li>Nunca compres vehículos al precio completo</li>
        <li>Únete a una crew activa para bonus adicionales</li>
      </ul>
    `,
    category: 'guias',
    author: 'Laura Sánchez',
    publishedAt: '2026-02-12T14:30:00Z',
    updatedAt: '2026-02-12T14:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1760310032090-7b01ab565575?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBjYXIlMjBzdHJlZXQlMjByYWNpbmd8ZW58MXx8fHwxNzcxMDkyOTAzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    imageAlt: 'Coche deportivo en las calles de Los Santos',
    tags: ['GTA Online', 'Guía', 'Dinero', 'Tips'],
    featured: true,
    readTime: 12
  },
  {
    id: '3',
    title: 'Top 10 vehículos más rápidos de GTA Online en 2026',
    slug: 'top-10-vehiculos-mas-rapidos-gta-online-2026',
    excerpt: 'Análisis detallado de los coches y motos más veloces del juego después de la última actualización, incluyendo estadísticas reales y precios.',
    content: `
      <h2>Los reyes de la velocidad</h2>
      <p>Tras meses de pruebas exhaustivas, hemos compilado la lista definitiva de los vehículos más rápidos en GTA Online para 2026.</p>
      
      <h3>1. Ocelot Virtue (Nuevo)</h3>
      <p>Velocidad máxima: 168.5 mph | Precio: $2,950,000</p>
      <p>El nuevo hypercar eléctrico de Ocelot domina tanto en aceleración como en velocidad punta. Perfecto para carreras en circuito.</p>
      
      <h3>2. Pfister 811</h3>
      <p>Velocidad máxima: 162.7 mph | Precio: $1,135,000</p>
      <p>Sigue siendo una opción sólida con excelente relación calidad-precio.</p>
      
      <h3>3. Grotti Itali RSX</h3>
      <p>Velocidad máxima: 160.2 mph | Precio: $3,465,000</p>
      <p>Mejor tracción en curvas de toda la lista, ideal para carreras técnicas.</p>
      
      <h3>Mención especial: Motos</h3>
      <p>La Hakuchou Drag sigue siendo la moto más rápida con 158.4 mph por solo $976,000.</p>
      
      <h3>Recomendaciones finales</h3>
      <ul>
        <li>Para carreras: Ocelot Virtue</li>
        <li>Para presupuestos limitados: Pfister 811</li>
        <li>Para stunts: Grotti Itali RSX</li>
        <li>Para dos ruedas: Hakuchou Drag</li>
      </ul>
    `,
    category: 'analisis',
    author: 'Miguel Torres',
    publishedAt: '2026-02-13T09:15:00Z',
    updatedAt: '2026-02-13T09:15:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1613739519297-e7947a931ba4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndGElMjB2aWRlbyUyMGdhbWUlMjBjaXR5JTIwbmlnaHR8ZW58MXx8fHwxNzcxMDkyOTAzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    imageAlt: 'Supercoches en las calles nocturnas de GTA',
    tags: ['GTA Online', 'Vehículos', 'Ranking', 'Análisis'],
    featured: true,
    readTime: 10
  },
  {
    id: '4',
    title: 'Trucos secretos: Easter Eggs que no conocías en GTA V',
    slug: 'trucos-secretos-easter-eggs-gta-v',
    excerpt: 'Descubre los easter eggs más ocultos y referencias secretas que Rockstar escondió en GTA V y que la mayoría de jugadores nunca han encontrado.',
    content: `
      <h2>Secretos bien guardados</h2>
      <p>Después de más de 10 años desde su lanzamiento, GTA V sigue sorprendiéndonos con secretos que permanecen ocultos.</p>
      
      <h3>1. El misterio del Monte Chiliad</h3>
      <p>El mural alienígena en el Monte Chiliad continúa siendo uno de los mayores enigmas. Nuevas teorías en 2026 sugieren una conexión con GTA 6.</p>
      
      <h3>2. Bigfoot jugable</h3>
      <p>Pocos saben que puedes jugar como Bigfoot en una misión secreta de "Peyote" durante condiciones climáticas específicas los martes lluviosos.</p>
      
      <h3>3. Referencias a juegos antiguos</h3>
      <ul>
        <li>Poster de Tommy Vercetti en apartamento de Michael</li>
        <li>Menciones a Claude en programas de radio</li>
        <li>Estatua de CJ en Grove Street</li>
      </ul>
      
      <h3>4. Mensajes ocultos en código morse</h3>
      <p>Las luces del faro de Paleto Bay transmiten mensajes en morse que revelan coordenadas de tesoros submarinos.</p>
      
      <h3>5. La habitación secreta de Lester</h3>
      <p>Usando un glitch específico, puedes acceder a una habitación no terminada en la casa de Lester con assets de desarrollo.</p>
    `,
    category: 'trucos',
    author: 'Ana Jiménez',
    publishedAt: '2026-02-11T16:45:00Z',
    updatedAt: '2026-02-11T16:45:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1695074185991-136f993ad998?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb250cm9sbGVyJTIwc2V0dXB8ZW58MXx8fHwxNzcwOTg1OTEwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    imageAlt: 'Setup gaming para jugar GTA',
    tags: ['GTA V', 'Easter Eggs', 'Secretos', 'Trucos'],
    featured: false,
    readTime: 6
  },
  {
    id: '5',
    title: 'Nueva actualización: Atracos en helicóptero llegan a GTA Online',
    slug: 'nueva-actualizacion-atracos-helicoptero-gta-online',
    excerpt: 'El DLC más esperado del año ya está disponible. Descubre cómo acceder a las nuevas misiones de atracos aéreos y qué recompensas puedes obtener.',
    content: `
      <h2>Asalto desde los cielos</h2>
      <p>Rockstar lanza la actualización "Operación Tormenta" que introduce misiones completamente nuevas con helicópteros personalizables.</p>
      
      <h3>Requisitos para empezar</h3>
      <ul>
        <li>Nivel mínimo: 50</li>
        <li>Hangar propio</li>
        <li>$1,500,000 para equipamiento inicial</li>
      </ul>
      
      <h3>Nuevos helicópteros</h3>
      <p>La actualización incluye 5 nuevos helicópteros militares totalmente personalizables con armamento pesado y capacidad para 6 jugadores.</p>
      
      <h3>Misiones principales</h3>
      <ol>
        <li>Asalto al Banco Central: $1.8M de recompensa</li>
        <li>Rescate en Torre Maze: $1.2M</li>
        <li>Intercepción de convoy: $900K</li>
      </ol>
      
      <h3>Recompensas exclusivas</h3>
      <p>Completa todas las misiones en dificultad élite para desbloquear el legendario Hunter de combate con pintura dorada.</p>
    `,
    category: 'noticias',
    author: 'Carlos Martínez',
    publishedAt: '2026-02-14T08:00:00Z',
    updatedAt: '2026-02-14T08:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1544204887-54d4723924d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWxpY29wdGVyJTIwZmx5aW5nJTIwY2l0eXxlbnwxfHx8fDE3NzEwOTI5MDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    imageAlt: 'Helicóptero volando sobre la ciudad',
    tags: ['GTA Online', 'Actualización', 'DLC', 'Helicópteros'],
    featured: false,
    readTime: 7
  },
  {
    id: '6',
    title: 'Comparativa: GTA Online vs Red Dead Online en 2026',
    slug: 'comparativa-gta-online-vs-red-dead-online-2026',
    excerpt: 'Analizamos ambos juegos online de Rockstar para determinar cuál ofrece mejor experiencia, contenido y valor en 2026.',
    content: `
      <h2>Dos mundos, una compañía</h2>
      <p>Rockstar mantiene activos ambos títulos online, pero ¿cuál merece más tu tiempo en 2026?</p>
      
      <h3>Contenido activo</h3>
      <p><strong>GTA Online:</strong> Recibe actualizaciones mensuales con nuevo contenido</p>
      <p><strong>RDO:</strong> Actualizaciones trimestrales más pequeñas</p>
      
      <h3>Base de jugadores</h3>
      <p>GTA Online mantiene 10x más jugadores activos diariamente, lo que facilita encontrar partidas.</p>
      
      <h3>Monetización</h3>
      <p>Ambos tienen microtransacciones, pero GTA Online ofrece más formas de ganar dinero sin pagar.</p>
      
      <h3>Veredicto</h3>
      <p>GTA Online sigue siendo el rey indiscutible para contenido abundante y comunidad activa. RDO es perfecto para quienes buscan ritmo más pausado y ambientación única.</p>
    `,
    category: 'analisis',
    author: 'Miguel Torres',
    publishedAt: '2026-02-09T11:20:00Z',
    updatedAt: '2026-02-09T11:20:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1750810908078-a4729905bf4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGNpdHklMjBza3lsaW5lJTIwbmlnaHR8ZW58MXx8fHwxNzcxMDkyOTAzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    imageAlt: 'Skyline urbano nocturno',
    tags: ['GTA Online', 'Red Dead Online', 'Comparativa', 'Rockstar'],
    featured: false,
    readTime: 9
  }
];

// Función helper para obtener artículos por categoría
export function getArticlesByCategory(category: Article['category']): Article[] {
  return articles.filter(article => article.category === category);
}

// Función helper para obtener artículos destacados
export function getFeaturedArticles(): Article[] {
  return articles.filter(article => article.featured);
}

// Función helper para obtener artículo por slug
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(article => article.slug === slug);
}

// Función helper para buscar artículos
export function searchArticles(query: string): Article[] {
  const lowerQuery = query.toLowerCase();
  return articles.filter(article =>
    article.title.toLowerCase().includes(lowerQuery) ||
    article.excerpt.toLowerCase().includes(lowerQuery) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

// Categorías disponibles
export const categories = [
  { id: 'noticias', name: 'Noticias', slug: 'noticias' },
  { id: 'guias', name: 'Guías', slug: 'guias' },
  { id: 'analisis', name: 'Análisis', slug: 'analisis' },
  { id: 'trucos', name: 'Trucos', slug: 'trucos' }
] as const;
