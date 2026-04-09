import { X, Sparkles, Clock } from 'lucide-react';
import type { ItemEffect, ItemEffectType } from '@/hooks/useItemEffects';

interface ActiveItemEffectsProps {
  effects: ItemEffect[];
  onRemoveEffect: (effectId: string) => void;
  onClearAll: () => void;
}

const EFFECT_LABELS: Record<ItemEffectType, string> = {
  skill_advantage: 'Avantage',
  skill_bonus: 'Bonus',
  saving_throw_bonus: 'Sauvegarde',
  movement: 'Déplacement',
  vision: 'Vision',
  resistance: 'Résistance',
  temporary_hp: 'PV temp.',
  healing: 'Soins',
  other: 'Effet',
};

const EFFECT_COLORS: Record<ItemEffectType, { bg: string; border: string; text: string }> = {
  skill_advantage: { bg: 'bg-forest/10', border: 'border-forest/30', text: 'text-forest' },
  skill_bonus: { bg: 'bg-steel-blue/10', border: 'border-steel-blue/30', text: 'text-steel-blue' },
  saving_throw_bonus: { bg: 'bg-divine-gold/10', border: 'border-divine-gold/30', text: 'text-divine-gold' },
  movement: { bg: 'bg-bronze/10', border: 'border-bronze/30', text: 'text-bronze' },
  vision: { bg: 'bg-royal-purple/10', border: 'border-royal-purple/30', text: 'text-royal-purple' },
  resistance: { bg: 'bg-blood-red/10', border: 'border-blood-red/30', text: 'text-blood-red' },
  temporary_hp: { bg: 'bg-forest/10', border: 'border-forest/30', text: 'text-forest' },
  healing: { bg: 'bg-forest/10', border: 'border-forest/30', text: 'text-forest' },
  other: { bg: 'bg-ink/10', border: 'border-ink/30', text: 'text-ink' },
};

export function ActiveItemEffects({ effects, onRemoveEffect, onClearAll }: ActiveItemEffectsProps) {
  if (effects.length === 0) return null;
  
  // Calcule le temps restant pour chaque effet
  const getRemainingTime = (effect: ItemEffect): string | null => {
    if (!effect.durationMinutes) return null;
    const elapsed = (Date.now() - effect.usedAt) / (1000 * 60);
    const remaining = effect.durationMinutes - elapsed;
    
    if (remaining <= 0) return 'Expiré';
    if (remaining < 1) return '< 1 min';
    if (remaining < 60) return `${Math.floor(remaining)} min`;
    return `${Math.floor(remaining / 60)} h`;
  };
  
  return (
    <div className="card bg-divine-gold/10 border-divine-gold/30 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display text-base text-ink flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-divine-gold" />
          Effets d'items actifs ({effects.length})
        </h3>
        <button
          onClick={onClearAll}
          className="text-xs text-ink-muted hover:text-blood-red transition-colors"
        >
          Tout effacer
        </button>
      </div>
      
      <div className="space-y-2">
        {effects.map((effect) => {
          const colors = EFFECT_COLORS[effect.type];
          const remaining = getRemainingTime(effect);
          
          return (
            <div
              key={effect.id}
              className={`${colors.bg} ${colors.border} border rounded-lg p-2 flex items-start justify-between gap-2`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs font-bold uppercase tracking-wide ${colors.text}`}>
                    {EFFECT_LABELS[effect.type]}
                  </span>
                  {effect.bonus !== undefined && effect.bonus > 0 && (
                    <span className="badge bg-forest text-white text-xs">
                      +{effect.bonus}
                    </span>
                  )}
                  {effect.skill && (
                    <span className="text-xs text-ink-muted">
                      {effect.skill}
                    </span>
                  )}
                </div>
                <p className="text-sm text-ink mt-1">{effect.description}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-ink-muted">
                  <span>via {effect.itemName}</span>
                  {remaining && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {remaining}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => onRemoveEffect(effect.id)}
                className="text-ink-muted hover:text-blood-red p-1"
                title="Supprimer l'effet"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
      
      <p className="text-xs text-ink-muted mt-3 italic">
        Ces effets sont pris en compte dans vos jets de dés et calculs de caractéristiques.
      </p>
    </div>
  );
}
