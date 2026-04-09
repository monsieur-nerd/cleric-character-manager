import { useState } from 'react';
import { Play, X, Sparkles, CheckCircle, Info } from 'lucide-react';
import { useInventoryStore } from '@/stores';
import type { EquipmentItem } from '@/types';
import { DEFAULT_ITEM_EFFECTS, type ItemEffect, type ItemEffectType } from '@/hooks/useItemEffects';

interface ItemUsePanelProps {
  item: EquipmentItem;
  onUseItem: (effect: Omit<ItemEffect, 'id' | 'usedAt' | 'itemId' | 'itemName'>) => void;
  onClose: () => void;
}

const EFFECT_COLORS: Record<ItemEffectType, { bg: string; text: string; icon: string }> = {
  skill_advantage: { bg: 'bg-forest/10', text: 'text-forest', icon: '🎯' },
  skill_bonus: { bg: 'bg-steel-blue/10', text: 'text-steel-blue', icon: '➕' },
  saving_throw_bonus: { bg: 'bg-divine-gold/10', text: 'text-divine-gold', icon: '🛡️' },
  movement: { bg: 'bg-bronze/10', text: 'text-bronze', icon: '⚡' },
  vision: { bg: 'bg-royal-purple/10', text: 'text-royal-purple', icon: '👁️' },
  resistance: { bg: 'bg-blood-red/10', text: 'text-blood-red', icon: '🔥' },
  temporary_hp: { bg: 'bg-forest/10', text: 'text-forest', icon: '❤️' },
  healing: { bg: 'bg-forest/10', text: 'text-forest', icon: '💚' },
  other: { bg: 'bg-ink/10', text: 'text-ink', icon: '✨' },
};

export function ItemUsePanel({ item, onUseItem, onClose }: ItemUsePanelProps) {
  const [selectedEffect, setSelectedEffect] = useState<string | null>(null);
  const [customDuration, setCustomDuration] = useState('1 heure');
  const [showCustom, setShowCustom] = useState(false);
  
  const updateQuantity = useInventoryStore((state) => state.updateQuantity);
  
  // Cherche les effets prédéfinis pour cet item
  const defaultEffect = DEFAULT_ITEM_EFFECTS[item.id] || DEFAULT_ITEM_EFFECTS[Object.keys(DEFAULT_ITEM_EFFECTS).find(key => 
    item.name.toLowerCase().includes(key.toLowerCase()) || 
    item.description?.toLowerCase().includes(key.toLowerCase())
  ) || ''];
  
  const handleUse = () => {
    let effect: Omit<ItemEffect, 'id' | 'usedAt' | 'itemId' | 'itemName'>;
    
    if (selectedEffect === 'default' && defaultEffect) {
      effect = {
        type: defaultEffect.type || 'other',
        description: defaultEffect.description || item.description,
        skill: defaultEffect.skill,
        ability: defaultEffect.ability,
        bonus: defaultEffect.bonus,
        duration: customDuration,
        durationMinutes: parseDuration(customDuration),
      };
    } else if (selectedEffect === 'consumable' || item.quantity <= 1) {
      // Item consommable - on retire 1
      effect = {
        type: 'other',
        description: `Utilisation de ${item.name}`,
        duration: customDuration,
      };
      updateQuantity(item.id, item.quantity - 1);
    } else {
      // Utilisation sans consommation
      effect = {
        type: 'other',
        description: `Utilisation de ${item.name}`,
        duration: customDuration,
      };
    }
    
    onUseItem(effect);
    onClose();
  };
  
  const parseDuration = (duration: string): number | undefined => {
    const num = parseInt(duration);
    if (isNaN(num)) return undefined;
    
    if (duration.includes('heure') || duration.includes('h')) return num * 60;
    if (duration.includes('jour') || duration.includes('j')) return num * 60 * 24;
    if (duration.includes('minute') || duration.includes('min')) return num;
    return num;
  };
  
  const canConsume = item.quantity > 0;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-parchment rounded-lg shadow-xl max-w-md w-full p-4 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg text-ink flex items-center gap-2">
            <Play className="w-5 h-5 text-forest" />
            Utiliser {item.name}
          </h3>
          <button onClick={onClose} className="text-ink-muted hover:text-ink">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Description */}
        <p className="text-sm text-ink-light mb-4 bg-parchment-dark/30 p-3 rounded">
          {item.description || 'Aucune description'}
        </p>
        
        {/* Options d'utilisation */}
        <div className="space-y-3 mb-4">
          {defaultEffect && (
            <button
              onClick={() => setSelectedEffect('default')}
              className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                selectedEffect === 'default'
                  ? 'border-forest bg-forest/10'
                  : 'border-parchment-dark hover:border-forest/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">
                  {EFFECT_COLORS[defaultEffect.type || 'other'].icon}
                </span>
                <div className="flex-1">
                  <div className="font-medium text-ink flex items-center gap-2">
                    Effet spécial
                    {defaultEffect.bonus && (
                      <span className="badge bg-forest text-white text-xs">
                        +{defaultEffect.bonus}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-ink-light">{defaultEffect.description}</p>
                  {defaultEffect.skill && (
                    <span className="text-xs text-forest mt-1 inline-block">
                      Compétence: {defaultEffect.skill}
                    </span>
                  )}
                </div>
                {selectedEffect === 'default' && (
                  <CheckCircle className="w-5 h-5 text-forest flex-shrink-0" />
                )}
              </div>
            </button>
          )}
          
          {/* Option utilisation simple */}
          <button
            onClick={() => setSelectedEffect('simple')}
            className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
              selectedEffect === 'simple'
                ? 'border-steel-blue bg-steel-blue/10'
                : 'border-parchment-dark hover:border-steel-blue/50'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">✨</span>
              <div className="flex-1">
                <div className="font-medium text-ink">Utilisation simple</div>
                <p className="text-sm text-ink-light">
                  Marquer l'item comme utilisé sans effet mécanique particulier
                </p>
              </div>
              {selectedEffect === 'simple' && (
                <CheckCircle className="w-5 h-5 text-steel-blue flex-shrink-0" />
              )}
            </div>
          </button>
          
          {/* Option consommable */}
          {item.quantity > 1 && (
            <button
              onClick={() => setSelectedEffect('consumable')}
              className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                selectedEffect === 'consumable'
                  ? 'border-blood-red bg-blood-red/10'
                  : 'border-parchment-dark hover:border-blood-red/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔥</span>
                <div className="flex-1">
                  <div className="font-medium text-ink flex items-center gap-2">
                    Consommer l'item
                    <span className="badge bg-blood-red text-white text-xs">
                      -1 quantité
                    </span>
                  </div>
                  <p className="text-sm text-ink-light">
                    L'item est utilisé et retiré de l'inventaire
                  </p>
                </div>
                {selectedEffect === 'consumable' && (
                  <CheckCircle className="w-5 h-5 text-blood-red flex-shrink-0" />
                )}
              </div>
            </button>
          )}
        </div>
        
        {/* Durée */}
        <div className="mb-4">
          <label className="text-sm font-medium text-ink mb-1 block">
            Durée de l'effet
          </label>
          <select
            value={customDuration}
            onChange={(e) => setCustomDuration(e.target.value)}
            className="w-full input-field"
          >
            <option value="1 minute">1 minute (1 tour de combat)</option>
            <option value="10 minutes">10 minutes</option>
            <option value="1 heure">1 heure</option>
            <option value="8 heures">8 heures</option>
            <option value="24 heures">24 heures (jusqu'au prochain repos)</option>
            <option value="Illimitée">Illimitée (jusqu'à désactivation)</option>
          </select>
        </div>
        
        {/* Boutons */}
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 btn-secondary py-2"
          >
            Annuler
          </button>
          <button
            onClick={handleUse}
            disabled={!selectedEffect || !canConsume}
            className="flex-1 btn-primary py-2 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            Utiliser
          </button>
        </div>
      </div>
    </div>
  );
}
