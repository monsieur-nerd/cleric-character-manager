import { useMemo, useState } from 'react';
import { Flame, Recycle, GitBranch, AlertCircle, Check } from 'lucide-react';
import { getComponentsForSpell } from '@/data/spellComponentMappings';
import { useInventoryStore } from '@/stores';
import { ComponentDetailModal } from './ComponentDetailModal';

interface SpellComponentBadgesProps {
  spellId: string;
  showStock?: boolean;
  size?: 'sm' | 'md';
}

export function SpellComponentBadges({ 
  spellId, 
  showStock = true,
  size = 'sm' 
}: SpellComponentBadgesProps) {
  const [selectedComponent, setSelectedComponent] = useState<{
    itemId: string;
    itemName: string;
    spellId: string;
    spellName: string;
  } | null>(null);
  
  const inventoryItems = useInventoryStore((state) => state.items);
  
  const componentGroups = useMemo(() => {
    const mappings = getComponentsForSpell(spellId);
    if (mappings.length === 0) return null;

    // Regroupe par groupe d'alternatives
    const groups = new Map<string | undefined, typeof mappings>();
    mappings.forEach(m => {
      const groupId = m.alternativeGroupId;
      if (!groups.has(groupId)) {
        groups.set(groupId, []);
      }
      groups.get(groupId)!.push(m);
    });

    return Array.from(groups.entries()).map(([groupId, groupMappings]) => ({
      isAlternative: groupId !== undefined,
      groupId,
      components: groupMappings.map(m => {
        const item = inventoryItems.find(i => i.id === m.itemId);
        const hasQty = item ? item.quantity : 0;
        const isLow = hasQty > 0 && hasQty < m.quantity;
        const isEmpty = hasQty === 0;
        
        return {
          ...m,
          currentQty: hasQty,
          isAvailable: hasQty >= m.quantity,
          isLow,
          isEmpty,
        };
      }),
    }));
  }, [spellId, inventoryItems]);

  if (!componentGroups) return null;

  const sizeClasses = size === 'sm' 
    ? 'text-[9px] px-1.5 py-0.5' 
    : 'text-xs px-2 py-1';

  return (
    <>
      <div className="flex flex-wrap gap-1">
        {componentGroups.map((group, groupIndex) => (
          <div key={group.groupId || `req-${groupIndex}`} className="flex flex-wrap gap-1">
            {/* Indicateur d'alternative */}
            {group.isAlternative && (
              <span 
                className={`inline-flex items-center gap-1 ${sizeClasses} rounded bg-arcane-purple/10 text-arcane-purple border border-arcane-purple/20 cursor-help`}
                title="Alternative : une seule option nécessaire"
              >
                <GitBranch className="w-3 h-3" />
                OU
              </span>
            )}
            
            {/* Composants du groupe */}
            {group.components.map((comp) => {
              // Déterminer le style du badge selon la disponibilité
              let badgeClass = 'bg-parchment-dark/50 text-ink-muted border-parchment-dark';
              let statusIcon = null;
              
              if (comp.isAvailable) {
                badgeClass = 'bg-forest/10 text-forest border-forest/30';
                statusIcon = <Check className="w-3 h-3" />;
              } else if (comp.isLow) {
                badgeClass = 'bg-bronze/10 text-bronze border-bronze/30';
                statusIcon = <AlertCircle className="w-3 h-3" />;
              } else if (comp.isEmpty) {
                badgeClass = 'bg-blood-red/10 text-blood-red border-blood-red/30';
                statusIcon = <AlertCircle className="w-3 h-3" />;
              }
              
              return (
                <button
                  key={comp.itemId}
                  onClick={() => setSelectedComponent({
                    itemId: comp.itemId,
                    itemName: comp.itemName,
                    spellId,
                    spellName: comp.spellName,
                  })}
                  className={`inline-flex items-center gap-1 ${sizeClasses} rounded border cursor-pointer hover:opacity-80 transition-opacity ${badgeClass}`}
                  title={`${comp.itemName}${showStock ? ` (${comp.currentQty}/${comp.quantity})` : ''} - Cliquez pour voir les détails`}
                >
                  {statusIcon}
                  {comp.consumed ? (
                    <Flame className="w-3 h-3" />
                  ) : (
                    <Recycle className="w-3 h-3" />
                  )}
                  <span className="truncate max-w-[80px]">{comp.itemName}</span>
                  {showStock && (
                    <span className="opacity-75">({comp.currentQty})</span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      
      {/* Modal de détail du composant */}
      {selectedComponent && (
        <ComponentDetailModal
          itemId={selectedComponent.itemId}
          itemName={selectedComponent.itemName}
          spellId={selectedComponent.spellId}
          spellName={selectedComponent.spellName}
          isOpen={true}
          onClose={() => setSelectedComponent(null)}
        />
      )}
    </>
  );
}
