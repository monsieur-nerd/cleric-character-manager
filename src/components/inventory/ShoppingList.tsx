import { useState, useMemo } from 'react';
import { ShoppingCart, Check, Plus, AlertCircle, Package, Sparkles } from 'lucide-react';
import { useInventoryStore } from '@/stores';
import { shoppingListItems, priorityCategories, getShoppingListByPriority } from '@/data';
import { formatPrice } from '@/utils/formatters';
import type { EquipmentItem } from '@/types';

export function ShoppingList() {
  const items = useInventoryStore((state) => state.items);
  const addItem = useInventoryStore((state) => state.addItem);
  const updateQuantity = useInventoryStore((state) => state.updateQuantity);
  
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    critical: true,
    high: true,
    components: false,
    equipment: false,
  });
  
  // Fusionne la liste de courses avec l'inventaire actuel
  const mergedItems = useMemo(() => {
    return shoppingListItems.map(shopItem => {
      const existingItem = items.find(i => i.id === shopItem.id);
      return {
        ...shopItem,
        quantity: existingItem?.quantity || 0,
        totalPrice: Number(((existingItem?.quantity || 0) * (shopItem.unitPrice || 0)).toFixed(2)),
        totalWeight: (existingItem?.quantity || 0) * (shopItem.unitWeight || 0),
      } as EquipmentItem & { quantityIdeal?: number };
    });
  }, [items]);
  
  // Regroupe par priorité
  const itemsByPriority = useMemo(() => {
    const grouped = getShoppingListByPriority();
    return {
      critical: mergedItems.filter(i => grouped.critical.some(g => g.id === i.id)),
      high: mergedItems.filter(i => grouped.high.some(g => g.id === i.id)),
      components: mergedItems.filter(i => grouped.components.some(g => g.id === i.id)),
      equipment: mergedItems.filter(i => grouped.equipment.some(g => g.id === i.id)),
    };
  }, [mergedItems]);
  
  // Calculs
  const totalCost = mergedItems.reduce((sum, item) => {
    const needed = (item.quantityIdeal || 0) - item.quantity;
    return sum + (needed > 0 ? needed * item.unitPrice : 0);
  }, 0);
  
  const totalMissing = mergedItems.filter(i => i.quantity < (i.quantityIdeal || 0)).length;
  const totalComplete = mergedItems.filter(i => i.quantity >= (i.quantityIdeal || 0)).length;
  
  // Actions
  const handleAddToInventory = (item: EquipmentItem & { quantityIdeal?: number }) => {
    const existingItem = items.find(i => i.id === item.id);
    if (existingItem) {
      // Augmente jusqu'à la quantité idéale
      const targetQty = Math.max(item.quantityIdeal || 1, existingItem.quantity + 1);
      updateQuantity(item.id, targetQty);
    } else {
      // Ajoute avec quantité 1
      addItem({
        ...item,
        quantity: 1,
        totalPrice: Number(item.unitPrice.toFixed(2)),
        totalWeight: item.unitWeight || 0,
      });
    }
  };
  
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  
  const getPriorityColor = (section: string) => {
    switch (section) {
      case 'critical': return 'text-blood-red border-blood-red/30 bg-blood-red/5';
      case 'high': return 'text-bronze border-bronze/30 bg-bronze/5';
      case 'components': return 'text-royal-purple border-royal-purple/30 bg-royal-purple/5';
      default: return 'text-forest border-forest/30 bg-forest/5';
    }
  };
  
  const getPriorityIcon = (section: string) => {
    switch (section) {
      case 'critical': return <AlertCircle className="w-4 h-4" />;
      case 'high': return <Sparkles className="w-4 h-4" />;
      case 'components': return <Sparkles className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="card bg-divine-gold/10 border-divine-gold/30">
        <div className="flex items-center gap-3">
          <ShoppingCart className="w-6 h-6 text-divine-gold" />
          <div className="flex-1">
            <h3 className="font-display text-ink">Liste de courses</h3>
            <p className="text-xs text-ink-muted">
              {totalComplete}/{mergedItems.length} items acquis • 
              {' '}{formatPrice(totalCost)} restant à dépenser
            </p>
          </div>
          {totalMissing > 0 && (
            <span className="badge bg-blood-red/20 text-blood-red border-blood-red">
              {totalMissing} manquant
            </span>
          )}
        </div>
      </div>
      
      {/* Liste par priorité */}
      <div className="space-y-3">
        {priorityCategories.map(category => {
          const sectionItems = itemsByPriority[category.id as keyof typeof itemsByPriority] || [];
          const missingCount = sectionItems.filter(i => i.quantity < (i.quantityIdeal || 0)).length;
          
          if (sectionItems.length === 0) return null;
          
          return (
            <div key={category.id} className="border border-parchment-dark rounded-lg overflow-hidden">
              {/* Header de section */}
              <button
                onClick={() => toggleSection(category.id)}
                className={`w-full px-3 py-2 flex items-center justify-between ${getPriorityColor(category.id)}`}
              >
                <div className="flex items-center gap-2">
                  {getPriorityIcon(category.id)}
                  <span className="font-display text-sm">{category.label}</span>
                  {missingCount > 0 && (
                    <span className="text-xs bg-white/50 px-1.5 py-0.5 rounded-full">
                      {missingCount}
                    </span>
                  )}
                </div>
                <span className="text-xs">
                  {expandedSections[category.id] ? '▼' : '▶'}
                </span>
              </button>
              
              {/* Items */}
              {expandedSections[category.id] && (
                <div className="p-2 space-y-2">
                  {sectionItems.map(item => {
                    const isComplete = item.quantity >= (item.quantityIdeal || 0);
                    const needed = (item.quantityIdeal || 0) - item.quantity;
                    
                    return (
                      <div 
                        key={item.id}
                        className={`p-2 rounded border ${
                          isComplete 
                            ? 'bg-forest/5 border-forest/20' 
                            : 'bg-parchment-light border-parchment-dark'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {/* Checkbox d'acquisition */}
                          <button
                            onClick={() => handleAddToInventory(item)}
                            className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${
                              isComplete
                                ? 'bg-forest border-forest text-white'
                                : 'border-parchment-dark hover:border-divine-gold'
                            }`}
                            title={isComplete ? 'Déjà acquis' : 'Ajouter à l\'inventaire'}
                          >
                            {isComplete && <Check className="w-3 h-3" />}
                          </button>
                          
                          {/* Contenu */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className={`font-display text-sm ${isComplete ? 'text-ink-muted line-through' : 'text-ink'}`}>
                                {item.name}
                              </span>
                              {item.isComponent && (
                                <span className="badge badge-type text-[10px]">Comp.</span>
                              )}
                            </div>
                            
                            <p className="text-xs text-ink-muted line-clamp-2 mt-0.5">
                              {item.description}
                            </p>
                            
                            {/* Quantité et prix */}
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs">
                              <span className={isComplete ? 'text-forest' : 'text-blood-red'}>
                                {item.quantity}/{item.quantityIdeal} unité{item.quantityIdeal! > 1 ? 's' : ''}
                              </span>
                              <span className="text-ink-light">
                                {formatPrice(item.unitPrice)}/u
                              </span>
                              {!isComplete && needed > 0 && (
                                <span className="text-blood-red">
                                  +{needed} = {formatPrice(needed * item.unitPrice)}
                                </span>
                              )}
                            </div>
                            
                            {/* Sorts liés */}
                            {item.relatedSpells && item.relatedSpells.length > 0 && (
                              <div className="flex gap-1 mt-1.5 flex-wrap">
                                {item.relatedSpells.map(spellId => (
                                  <span 
                                    key={spellId}
                                    className="text-[10px] bg-royal-purple/10 text-royal-purple px-1.5 py-0.5 rounded"
                                  >
                                    {spellId.replace(/-/g, ' ')}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          {/* Bouton + */}
                          {!isComplete && (
                            <button
                              onClick={() => handleAddToInventory(item)}
                              className="w-7 h-7 rounded bg-divine-gold/20 hover:bg-divine-gold/40 flex items-center justify-center flex-shrink-0"
                              title="Ajouter une unité"
                            >
                              <Plus className="w-4 h-4 text-divine-gold-dark" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Résumé */}
      <div className="card bg-parchment-dark/30">
        <h4 className="font-display text-sm text-ink mb-2">Résumé</h4>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-ink-muted">Coût total:</span>
            <div className="font-display text-blood-red">
              {formatPrice(totalCost)}
            </div>
          </div>
          <div>
            <span className="text-ink-muted">Items acquis:</span>
            <div className="font-display text-forest">
              {totalComplete}/{mergedItems.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
