// src/components/NewsBadge.tsx

import { Tag } from 'lucide-react';

type BadgeType = 'oficial' | 'rumor' | 'actualizacion';

interface NewsBadgeProps {
  type: BadgeType;
  className?: string;
}

const BADGE_CONFIG: Record<BadgeType, {
  label: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  icon?: string;
}> = {
  oficial: {
    label: 'Oficial',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-400',
    borderColor: 'border-blue-500/30',
    icon: '✓',
  },
  rumor: {
    label: 'Rumor',
    bgColor: 'bg-yellow-500/10',
    textColor: 'text-yellow-400',
    borderColor: 'border-yellow-500/30',
    icon: '?',
  },
  actualizacion: {
    label: 'Actualización',
    bgColor: 'bg-green-500/10',
    textColor: 'text-green-400',
    borderColor: 'border-green-500/30',
    icon: '↻',
  },
};

export default function NewsBadge({ type, className = '' }: NewsBadgeProps) {
  const config = BADGE_CONFIG[type];

  if (!config) return null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide border ${config.bgColor} ${config.textColor} ${config.borderColor} ${className}`}
    >
      {config.icon && <span className="text-sm">{config.icon}</span>}
      {config.label}
    </span>
  );
}

// Componente para múltiples badges
interface NewsBadgesProps {
  tags?: Array<{ slug: string; name: string }>;
  className?: string;
}

export function NewsBadges({ tags, className = '' }: NewsBadgesProps) {
  if (!tags || tags.length === 0) return null;

  const validBadges = tags
    .map(tag => tag.slug.toLowerCase())
    .filter((slug): slug is BadgeType => 
      slug === 'oficial' || slug === 'rumor' || slug === 'actualizacion'
    );

  if (validBadges.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {validBadges.map(type => (
        <NewsBadge key={type} type={type} />
      ))}
    </div>
  );
}