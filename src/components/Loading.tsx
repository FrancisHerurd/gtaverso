interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
}

export default function Loading({ 
  size = "md", 
  text = "Cargando...", 
  fullScreen = false 
}: LoadingProps) {
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-10 w-10",
    lg: "h-16 w-16"
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      {/* Spinner con color verde GTA */}
      <svg 
        className={`animate-spin text-[var(--gta-green,#00FF41)] ${sizeClasses[size]}`} 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      {text && (
        <span className="text-sm font-medium text-gray-400 tracking-widest uppercase animate-pulse">
          {text}
        </span>
      )}
    </div>
  );

  // Si se pide a pantalla completa (ideal para transiciones de página)
  if (fullScreen) {
    return (
      <div 
        className="fixed inset-0 z-50 flex min-h-screen w-full items-center justify-center bg-gray-900/90 backdrop-blur-sm"
        role="status" 
        aria-label="Cargando página"
      >
        {content}
      </div>
    );
  }

  // Comportamiento por defecto (ideal para bloques o botones)
  return (
    <div className="flex w-full items-center justify-center p-8" role="status" aria-label="Cargando contenido">
      {content}
    </div>
  );
}