import { X, Flame, Recycle, GitBranch, ShoppingCart, AlertCircle, Check, Sparkle } from 'lucide-react';
import { useInventoryStore, useSpellStore } from '@/stores';
import { getComponentsForSpell, allSpellComponentMappings } from '@/data/spellComponentMappings';
import { useMemo } from 'react';
import { formatPrice } from '@/utils/formatters';

interface ComponentDetailModalProps {
  itemId: string;
  itemName: string;
  spellId: string;
  spellName: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ComponentDetailModal({
  itemId,
  itemName,
  spellId,
  spellName,
  isOpen,
  onClose,
}: ComponentDetailModalProps) {
  const inventoryItems = useInventoryStore((state) => state.items);
  const getSpellById = useSpellStore((state) => state.getSpellById);
  
  const componentData = useMemo(() => {
    // Récupérer tous les sorts qui utilisent ce composant
    const allMappings = allSpellComponentMappings.filter(m => m.itemId === itemId);
    const uniqueSpells = [...new Map(allMappings.map(m => [m.spellId, m])).values()];
    
    // Récupérer le mapping spécifique pour ce sort
    const currentMapping = allMappings.find(m => m.spellId === spellId);
    
    // Récupérer le stock actuel
    const inventoryItem = inventoryItems.find(i => i.id === itemId);
    const currentStock = inventoryItem?.quantity || 0;
    
    // Récupérer les alternatives
    const alternatives = currentMapping?.alternatives || [];
    
    return {
      currentMapping,
      uniqueSpells,
      currentStock,
      alternatives,
    };
  }, [itemId, spellId, inventoryItems]);

  if (!isOpen) return null;

  const { currentMapping, uniqueSpells, currentStock, alternatives } = componentData;
  const isComplete = currentMapping ? currentStock >= currentMapping.quantity : false;
  const isConsumed = currentMapping?.consumed || false;
  const price = currentMapping?.price || 0;
  
  // Déterminer les sorts accessibles (même niveau ou inférieur)
  const spellInfo = getSpellById(spellId);
  const spellLevel = spellInfo?.level || 0;

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-parchment-light w-full max-w-md max-h-[90vh] overflow-y-auto rounded-t-xl sm:rounded-xl shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-parchment-light border-b border-parchment-dark p-4 flex items-start justify-between gap-3 z-10">
          <div className="min-w-0">
            <h2 className="font-display text-lg sm:text-xl text-ink break-words leading-tight">
              {itemName}
            </h2>
            <p className="text-sm text-ink-muted">
              Composant pour {spellName}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-parchment-dark rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-ink" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Card style ShoppingList */}
          <div className={`p-4 rounded-lg border ${
            isComplete 
              ? 'bg-forest/5 border-forest/20' 
              : 'bg-parchment-light border-parchment-dark'
          }`}>
            {/* Header de l'item */}
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`font-display text-sm ${
                    isComplete ? 'text-ink-muted line-through' : 'text-ink'
                  }`}>
                    {itemName}
                  </span>
                  
                  {/* Badge niveau du sort */}
                  {spellLevel > 0 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-arcane-purple/10 text-arcane-purple border border-arcane-purple/20">
                      Sort niv. {spellLevel}
                    </span>
                  )}
                  
                  {/* Badge consommable/réutilisable */}
                  <span className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded ${
                    isConsumed
                      ? 'bg-blood-red/10 text-blood-red'
                      : 'bg-forest/10 text-forest'
                  }`}>
                    {isConsumed ? <Flame className="w-3 h-3" /> : <Recycle className="w-3 h-3" />}
                    {isConsumed ? 'Consommé' : 'Réutilisable'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <p className="text-xs text-ink-muted mb-3">
              {isConsumed 
                ? `🔥 CONSOMMÉ - ${itemName} pour ${spellName}`
                : `♻️ Réutilisable - ${itemName} pour ${spellName}`}
            </p>
            
            {/* Alternatives */}
            {alternatives.length > 0 && (
              <div className="mb-3 p-2 bg-arcane-purple/5 rounded border border-arcane-purple/10">
                <p className="text-xs text-ink-muted mb-1">
                  <GitBranch className="w-3 h-3 inline mr-1" />
                  Alternative{alternatives.length > 1 ? 's' : ''} disponible{alternatives.length > 1 ? 's' : ''} :
                </p>
                <div className="flex flex-wrap gap-1">
                  {alternatives.map(alt => {
                    const altItem = inventoryItems.find(i => i.id === alt.itemId);
                    const altStock = altItem?.quantity || 0;
                    const altOwned = altStock > 0;
                    return (
                      <span 
                        key={alt.itemId}
                        className={`text-[10px] px-2 py-0.5 rounded-full border ${
                          altOwned
                            ? 'bg-forest/10 text-forest border-forest/30'
                            : 'bg-parchment-dark/30 text-ink-muted border-parchment-dark'
                        }`}
                      >
                        {alt.itemName} {altOwned ? `(${altStock})` : `(0)`}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Footer: Stock et Prix */}
            <div className="flex items-center justify-between gap-2 pt-2 border-t border-parchment-dark/50">
              <div className="flex items-center gap-3 text-xs">
                {/* Stock actuel */}
                <span className={isComplete ? 'text-forest' : 'text-blood-red'}>
                  Stock: {currentStock}/{currentMapping?.quantity || 1}
                </span>
                
                {/* Prix */}
                {price > 0 && (
                  <span className="text-ink-light">
                    {formatPrice(price)}/u
                  </span>
                )}
              </div>
              
              {/* Statut */}
              <span className={`text-xs font-medium ${
                isComplete ? 'text-forest' : 'text-blood-red'
              }`}>
                {isComplete ? (
                  <span className="flex items-center gap-1">
                    <Check className="w-3 h-3" /> Disponible
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Manquant
                  </span>
                )}
              </span>
            </div>
          </div>
          
          {/* Autres sorts utilisant ce composant */}
          {uniqueSpells.length > 1 && (
            <div>
              <h3 className="font-display text-sm text-ink mb-2 flex items-center gap-2">
                <Sparkle className="w-4 h-4 text-divine-gold" />
                Aussi utilisé pour
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {uniqueSpells
                  .filter(s => s.spellId !== spellId)
                  .map(s => (
                    <span 
                      key={s.spellId}
                      className="text-xs px-2 py-1 rounded bg-parchment-dark/50 text-ink-light"
                    >
                      {s.spellName} (niv. {s.spellLevel})
                    </span>
                  ))}
              </div>
            </div>
          )}
          
          {/* Actions */}
          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full btn-secondary"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
