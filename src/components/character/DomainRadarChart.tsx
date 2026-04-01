import type { DomainSpellProfile } from '@/types';

interface DomainRadarChartProps {
  profile: DomainSpellProfile;
  size?: number;
  className?: string;
}

const LABELS: Record<keyof DomainSpellProfile, string> = {
  healing: 'Soins',
  damage: 'Dégâts',
  control: 'Contrôle',
  buff: 'Buff',
  protection: 'Protection',
  utility: 'Utilitaire',
};

const COLORS: Record<keyof DomainSpellProfile, string> = {
  healing: '#ef4444',    // red-500
  damage: '#f97316',     // orange-500
  control: '#8b5cf6',    // violet-500
  buff: '#22c55e',       // green-500
  protection: '#3b82f6', // blue-500
  utility: '#eab308',    // yellow-500
};

export function DomainRadarChart({ profile, size = 200, className = '' }: DomainRadarChartProps) {
  const axes = Object.keys(profile) as (keyof DomainSpellProfile)[];
  const centerX = size / 2;
  const centerY = size / 2;
  const maxRadius = (size / 2) - 30; // Marge pour les labels
  const maxValue = 10;

  // Calculer les points du polygone
  const getPoint = (index: number, value: number) => {
    const angle = (index * 2 * Math.PI) / axes.length - Math.PI / 2;
    const radius = (value / maxValue) * maxRadius;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  // Points pour le profil
  const profilePoints = axes.map((axis, i) => getPoint(i, profile[axis]));
  const profilePath = profilePoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  // Cercles de grille (valeurs 2, 4, 6, 8, 10)
  const gridCircles = [2, 4, 6, 8, 10].map(value => ({
    value,
    radius: (value / maxValue) * maxRadius,
  }));

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="overflow-visible">
        {/* Cercles de grille */}
        {gridCircles.map(({ value, radius }) => (
          <g key={value}>
            <circle
              cx={centerX}
              cy={centerY}
              r={radius}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth={1}
              strokeDasharray={value === 10 ? undefined : "4,4"}
            />
            <text
              x={centerX + 4}
              y={centerY - radius - 2}
              className="text-[8px] fill-gray-400"
            >
              {value}
            </text>
          </g>
        ))}

        {/* Axes */}
        {axes.map((_, i) => {
          const end = getPoint(i, maxValue);
          return (
            <line
              key={i}
              x1={centerX}
              y1={centerY}
              x2={end.x}
              y2={end.y}
              stroke="#e5e7eb"
              strokeWidth={1}
            />
          );
        })}

        {/* Zone du profil */}
        <path
          d={profilePath}
          fill="rgba(251, 191, 36, 0.3)"
          stroke="#fbbf24"
          strokeWidth={2}
          className="transition-all duration-500"
        />

        {/* Points du profil */}
        {profilePoints.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={4}
            fill={COLORS[axes[i]]}
            stroke="white"
            strokeWidth={2}
            className="transition-all duration-500"
          />
        ))}

        {/* Labels */}
        {axes.map((axis, i) => {
          const pos = getPoint(i, maxValue + 2);
          return (
            <text
              key={axis}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[10px] font-medium fill-ink"
              style={{ fill: COLORS[axis] }}
            >
              {LABELS[axis]}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

// Composant pour comparer deux profils (domaine actuel vs un autre)
interface DomainRadarCompareProps {
  currentProfile: DomainSpellProfile;
  compareProfile: DomainSpellProfile;
  currentName: string;
  compareName: string;
  size?: number;
  className?: string;
}

export function DomainRadarCompare({
  currentProfile,
  compareProfile,
  currentName,
  compareName,
  size = 200,
  className = '',
}: DomainRadarCompareProps) {
  const axes = Object.keys(currentProfile) as (keyof DomainSpellProfile)[];
  const centerX = size / 2;
  const centerY = size / 2;
  const maxRadius = (size / 2) - 35;
  const maxValue = 10;

  const getPoint = (index: number, value: number) => {
    const angle = (index * 2 * Math.PI) / axes.length - Math.PI / 2;
    const radius = (value / maxValue) * maxRadius;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  const currentPoints = axes.map((axis, i) => getPoint(i, currentProfile[axis]));
  const comparePoints = axes.map((axis, i) => getPoint(i, compareProfile[axis]));

  const currentPath = currentPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
  const comparePath = comparePoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  const gridCircles = [2, 4, 6, 8, 10].map(value => ({
    value,
    radius: (value / maxValue) * maxRadius,
  }));

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="overflow-visible">
        {/* Grille */}
        {gridCircles.map(({ value, radius }) => (
          <circle
            key={value}
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={1}
            strokeDasharray={value === 10 ? undefined : "4,4"}
          />
        ))}

        {/* Axes */}
        {axes.map((_, i) => {
          const end = getPoint(i, maxValue);
          return (
            <line
              key={i}
              x1={centerX}
              y1={centerY}
              x2={end.x}
              y2={end.y}
              stroke="#e5e7eb"
              strokeWidth={1}
            />
          );
        })}

        {/* Profil à comparer (plus transparent, en arrière-plan) */}
        <path
          d={comparePath}
          fill="rgba(156, 163, 175, 0.2)"
          stroke="#9ca3af"
          strokeWidth={1.5}
          strokeDasharray="4,4"
        />

        {/* Profil actuel */}
        <path
          d={currentPath}
          fill="rgba(251, 191, 36, 0.3)"
          stroke="#fbbf24"
          strokeWidth={2}
        />

        {/* Labels */}
        {axes.map((axis, i) => {
          const pos = getPoint(i, maxValue + 2);
          return (
            <text
              key={axis}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[9px] font-medium"
              style={{ fill: COLORS[axis] }}
            >
              {LABELS[axis]}
            </text>
          );
        })}
      </svg>

      {/* Légende */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-3 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <span className="text-ink">{currentName}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-gray-400" />
          <span className="text-ink-muted">{compareName}</span>
        </div>
      </div>
    </div>
  );
}
