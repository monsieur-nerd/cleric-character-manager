import { useState, useMemo } from 'react';
import { 
  ShoppingCart, 
  AlertCircle, 
  Flame, 
  Recycle, 
  ChevronDown, 
  ChevronRight, 
  Sparkles,
  Filter,
  Zap,
  BookOpen,
  FlameKindling,
  Info,
  Clock,
  Sparkle
} from 'lucide-react';
import { useShoppingListStore, useInventoryStore, useSpellStore, useChultStore, useCharacterStore, isResurrectionComponent } from '@/stores';
import { formatPrice } from '@/utils/formatters';
import type { ShoppingListItem, ShoppingPriority } from '@/types';
import { priorityLabels, priorityColors, componentTypeLabels } from '@/stores/shoppingListStore';
import { allSpellComponentMappings, getMaxSpellLevelForCharacter } from '@/data/spellComponentMappings';

// Prix des composants (depuis les mappings)
const knownPrices: Record<string, number> = {};
allSpellComponentMappings.forEach(m => {
  knownPrices[m.itemId] = m.price;
});

// Descriptions utilitaires des composants
const componentDescriptions: Record<string, string> = {};
allSpellComponentMappings.forEach(m => {
  const typeIcon = m.consumed ? '🔥 CONSOMMÉ' : '♻️ Réutilisable';
  componentDescriptions[m.itemId] = `${typeIcon} - ${m.itemName} pour ${m.spellName} (niveau ${m.spellLevel})`;
});

// Mapping spell IDs vers les noms de sorts
const spellNames: Record<string, string> = {};
allSpellComponentMappings.forEach(m => {
  spellNames[m.spellId] = m.spellName;
});

// Classes pour les badges de classe
const classSourceStyles = {
  cleric: 'bg-divine-gold/20 text-divine-gold-dark border-divine-gold/30',
  wizard: 'bg-arcane-purple/20 text-arcane-purple border-arcane-purple/30',
};

const classSourceLabels = {
  cleric: 'Prêtre',
  wizard: 'Mage',
};

interface SectionState {
  critical: boolean;
  high: boolean;
  medium: boolean;
  low: boolean;
  none: boolean;
}

type ClassFilter = 'all' | 'cleric' | 'wizard';
type ConsumableFilter = 'all' | 'consumed' | 'reusable';

export function ShoppingList() {
  const shoppingItems = useShoppingListStore((state) => state.shoppingItems);
  const purchaseItem = useShoppingListStore((state) => state.purchaseItem);
  const setQuantityToBuy = useShoppingListStore((state) => state.setQuantityToBuy);
  const addComponentForSpell = useShoppingListStore((state) => state.addComponentForSpell);
  const addComponentsForNewSpells = useShoppingListStore((state) => state.addComponentsForNewSpells);
  const getCriticalComponents = useShoppingListStore((state) => state.getCriticalComponents);
  
  const inventoryItems = useInventoryStore((state) => state.items);
  const updateQuantity = useInventoryStore((state) => state.updateQuantity);
  const getSpellById = useSpellStore((state) => state.getSpellById);
  const isInChult = useChultStore((state) => state.isInChult);
  const characterLevel = useCharacterStore((state) => state.character.level);
  
  const [expandedSections, setExpandedSections] = useState<SectionState>({
    critical: true,
    high: true,
    medium: false,
    low: false,
    none: false,
  });
  
  // Filtres
  const [classFilter, setClassFilter] = useState<ClassFilter>('all');
  const [consumableFilter, setConsumableFilter] = useState<ConsumableFilter>('all');

  // Niveau de sort maximum accessible par le personnage
  const maxAccessibleSpellLevel = useMemo(() => {
    return getMaxSpellLevelForCharacter(characterLevel);
  }, [characterLevel]);

  // Détermine si un composant est pour un niveau accessible maintenant
  const isComponentAccessibleNow = (item: ShoppingListItem): boolean => {
    // Vérifie si au moins un sort lié est accessible
    if (!item.relatedSpells || item.relatedSpells.length === 0) return true;
    
    return item.relatedSpells.some(spell => {
      const mapping = allSpellComponentMappings.find(m => 
        m.spellId === spell.spellId && m.itemId === item.itemId
      );
      if (!mapping) return true; // Si pas de mapping, on l'affiche par défaut
      return mapping.spellLevel <= maxAccessibleSpellLevel;
    });
  };

  // Items filtrés selon les critères ET accessibles maintenant
  const accessibleItems = useMemo(() => {
    return shoppingItems.filter(item => {
      // Filtre par niveau de sort accessible
      if (!isComponentAccessibleNow(item)) return false;
      
      // Filtre par classe
      if (classFilter !== 'all' && item.classSource && item.classSource !== classFilter) {
        return false;
      }
      
      // Filtre par type de composant
      if (consumableFilter !== 'all') {
        const isConsumed = item.componentType === 'consumed_per_cast' || item.componentType === 'consumed_per_use';
        if (consumableFilter === 'consumed' && !isConsumed) return false;
        if (consumableFilter === 'reusable' && isConsumed) return false;
      }
      
      // Mode Chult : filtrer les composants de résurrection
      if (isInChult && isResurrectionComponent(item.itemId)) {
        return false;
      }
      
      return true;
    });
  }, [shoppingItems, classFilter, consumableFilter, isInChult, maxAccessibleSpellLevel]);

  // Items pour niveaux futurs (non accessibles)
  const futureItems = useMemo(() => {
    return shoppingItems.filter(item => {
      // Ne garde que les items NON accessibles
      if (isComponentAccessibleNow(item)) return false;
      
      // Filtre par classe
      if (classFilter !== 'all' && item.classSource && item.classSource !== classFilter) {
        return false;
      }
      
      // Filtre par type de composant
      if (consumableFilter !== 'all') {
        const isConsumed = item.componentType === 'consumed_per_cast' || item.componentType === 'consumed_per_use';
        if (consumableFilter === 'consumed' && !isConsumed) return false;
        if (consumableFilter === 'reusable' && isConsumed) return false;
      }
      
      // Mode Chult : filtrer les composants de résurrection
      if (isInChult && isResurrectionComponent(item.itemId)) {
        return false;
      }
      
      return true;
    });
  }, [shoppingItems, classFilter, consumableFilter, isInChult, maxAccessibleSpellLevel]);

  // Regroupe les items accessibles par priorité
  const accessibleItemsByPriority = useMemo(() => {
    const grouped: Record<ShoppingPriority, ShoppingListItem[]> = {
      critical: [],
      high: [],
      medium: [],
      low: [],
      none: [],
    };
    
    accessibleItems.forEach(item => {
      grouped[item.priority].push(item);
    });
    
    return grouped;
  }, [accessibleItems]);

  // Regroupe les items futurs par priorité
  const futureItemsByPriority = useMemo(() => {
    const grouped: Record<ShoppingPriority, ShoppingListItem[]> = {
      critical: [],
      high: [],
      medium: [],
      low: [],
      none: [],
    };
    
    futureItems.forEach(item => {
      grouped[item.priority].push(item);
    });
    
    return grouped;
  }, [futureItems]);

  // Calcule le prix total à dépenser (uniquement pour les items accessibles)
  const totalCost = useMemo(() => {
    return accessibleItems.reduce((sum, item) => {
      const price = knownPrices[item.itemId] || 0;
      return sum + price * item.quantityToBuy;
    }, 0);
  }, [accessibleItems]);

  // Nombre total d'items à acheter (uniquement pour les items accessibles)
  const totalItemsToBuy = useMemo(() => {
    return accessibleItems.reduce((sum, item) => sum + item.quantityToBuy, 0);
  }, [accessibleItems]);

  // Nombre d'items manquants (stock < quantité idéale) - uniquement accessibles
  const totalMissing = useMemo(() => {
    return accessibleItems.filter(item => {
      const inventoryItem = inventoryItems.find(i => i.id === item.itemId);
      const currentStock = inventoryItem?.quantity || 0;
      return currentStock < item.quantityIdeal;
    }).length;
  }, [accessibleItems, inventoryItems]);

  // Stats pour les items futurs
  const futureTotalCost = useMemo(() => {
    return futureItems.reduce((sum, item) => {
      const price = knownPrices[item.itemId] || 0;
      return sum + price * item.quantityToBuy;
    }, 0);
  }, [futureItems]);

  const futureTotalItemsToBuy = useMemo(() => {
    return futureItems.reduce((sum, item) => sum + item.quantityToBuy, 0);
  }, [futureItems]);

  // Composants critiques à réapprovisionner
  const criticalItems = useMemo(() => {
    // Ne garde que les composants critiques accessibles
    const allCritical = getCriticalComponents();
    return allCritical.filter(item => isComponentAccessibleNow(item));
  }, [getCriticalComponents, shoppingItems, maxAccessibleSpellLevel]);

  const toggleSection = (priority: ShoppingPriority) => {
    setExpandedSections(prev => ({
      ...prev,
      [priority]: !prev[priority],
    }));
  };

  const handleQuantityChange = (itemId: string, quantity: number) => {
    setQuantityToBuy(itemId, Math.max(0, Math.min(20, quantity)));
  };

  const handlePurchase = (item: ShoppingListItem) => {
    if (item.quantityToBuy <= 0) return;
    
    const price = knownPrices[item.itemId] || 0;
    const inventoryItem = inventoryItems.find(i => i.id === item.itemId);
    
    if (inventoryItem) {
      updateQuantity(item.itemId, inventoryItem.quantity + item.quantityToBuy);
    } else {
      const newItem = {
        id: item.itemId,
        name: getItemDisplayName(item.itemId),
        type: getItemType(item.category),
        description: componentDescriptions[item.itemId] || item.notes || '',
        quantity: item.quantityToBuy,
        unitPrice: price,
        totalPrice: price * item.quantityToBuy,
        unitWeight: null,
        totalWeight: 0,
        isCarried: true,
        isComponent: item.category === 'component',
        shoppingPriority: item.priority,
        componentType: item.componentType,
        relatedSpells: item.relatedSpells,
        classSource: item.classSource,
      };
      
      useInventoryStore.getState().addItem(newItem);
    }
    
    setQuantityToBuy(item.itemId, 0);
    
    if (item.componentType === 'reusable_focus' || item.componentType === 'permanent') {
      useShoppingListStore.getState().removeFromShoppingList(item.itemId);
    }
  };

  const getItemDisplayName = (itemId: string): string => {
    const inventoryItem = inventoryItems.find(i => i.id === itemId);
    if (inventoryItem) return inventoryItem.name;
    
    const mapping = allSpellComponentMappings.find(m => m.itemId === itemId);
    if (mapping) return mapping.itemName;
    
    return itemId
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getItemType = (category: string): string => {
    switch (category) {
      case 'component': return 'Composante';
      case 'weapon': return 'Arme';
      case 'armor': return 'Armure';
      case 'consumable': return 'Consommable';
      case 'equipment':
      default: return 'Équipement aventure';
    }
  };

  const getItemPrice = (itemId: string): number => {
    const inventoryItem = inventoryItems.find(i => i.id === itemId);
    if (inventoryItem && inventoryItem.unitPrice > 0) {
      return inventoryItem.unitPrice;
    }
    return knownPrices[itemId] || 0;
  };

  const getCurrentStock = (itemId: string): number => {
    const inventoryItem = inventoryItems.find(i => i.id === itemId);
    return inventoryItem?.quantity || 0;
  };

  const getItemDescription = (item: ShoppingListItem): string => {
    if (componentDescriptions[item.itemId]) {
      return componentDescriptions[item.itemId];
    }
    if (item.notes) {
      return item.notes;
    }
    const inventoryItem = inventoryItems.find(i => i.id === item.itemId);
    return inventoryItem?.description || '';
  };

  const handleAddDefaultComponents = () => {
    // Ajoute tous les composants de prêtre niveaux 0-9
    const clericSpellIds = Array.from(new Set(
      allSpellComponentMappings
        .filter(m => m.classSource === 'cleric')
        .map(m => m.spellId)
    ));
    
    addComponentsForNewSpells(clericSpellIds, 'cleric');
  };

  const handleAddWizardComponents = () => {
    // Ajoute les composants de mage
    const wizardSpellIds = Array.from(new Set(
      allSpellComponentMappings
        .filter(m => m.classSource === 'wizard')
        .map(m => m.spellId)
    ));
    
    addComponentsForNewSpells(wizardSpellIds, 'wizard');
  };

  const priorityOrder: ShoppingPriority[] = ['critical', 'high', 'medium', 'low', 'none'];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className={`card ${isInChult ? 'bg-jungle-green/10 border-jungle-green/30' : 'bg-divine-gold/10 border-divine-gold/30'}`}>
        <div className="flex items-center gap-3">
          <ShoppingCart className={`w-6 h-6 ${isInChult ? 'text-jungle-green' : 'text-divine-gold'}`} />
          <div className="flex-1">
            <h3 className="font-display text-ink">Liste de courses</h3>
            <p className="text-xs text-ink-muted">
              {totalItemsToBuy > 0 
                ? `${totalItemsToBuy} unité${totalItemsToBuy > 1 ? 's' : ''} à acheter` 
                : 'Aucun achat en cours'} • {formatPrice(totalCost)} à dépenser
              {isInChult && ' • 🌴 Mode Chult actif'}
            </p>
          </div>
          {isInChult && (
            <span className="badge bg-jungle-green/20 text-jungle-green border-jungle-green">
              🌴 Chult
            </span>
          )}
          {totalMissing > 0 && !isInChult && (
            <span className="badge bg-blood-red/20 text-blood-red border-blood-red">
              {totalMissing} manquant
            </span>
          )}
        </div>
      </div>

      {/* Info niveau */}
      <div className="card bg-parchment-light border-parchment-dark">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-divine-gold" />
          <span className="text-sm text-ink">
            Niveau {characterLevel} • Sorts de niveau 1-{maxAccessibleSpellLevel} accessibles
          </span>
        </div>
      </div>

      {/* Alertes critiques */}
      {criticalItems.length > 0 && (
        <div className="card bg-blood-red/10 border-blood-red/30">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blood-red flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-display text-sm text-blood-red">
                Composants critiques à réapprovisionner
              </h4>
              <p className="text-xs text-ink-muted mt-1">
                {criticalItems.length} composant(s) critique(s) nécessitent un réapprovisionnement
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filtres */}
      {shoppingItems.length > 0 && (
        <div className="card bg-parchment-light border-parchment-dark">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-ink-muted" />
            <span className="text-sm font-medium text-ink">Filtres</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {/* Filtre par classe */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-ink-muted">Classe:</span>
              <div className="flex gap-1">
                <button
                  onClick={() => setClassFilter('all')}
                  className={`text-xs px-2 py-1 rounded border ${
                    classFilter === 'all'
                      ? 'bg-divine-gold text-white border-divine-gold'
                      : 'bg-white text-ink border-parchment-dark'
                  }`}
                >
                  Tous
                </button>
                <button
                  onClick={() => setClassFilter('cleric')}
                  className={`text-xs px-2 py-1 rounded border ${
                    classFilter === 'cleric'
                      ? 'bg-divine-gold text-white border-divine-gold'
                      : 'bg-white text-ink border-parchment-dark'
                  }`}
                >
                  Prêtre
                </button>
                <button
                  onClick={() => setClassFilter('wizard')}
                  className={`text-xs px-2 py-1 rounded border ${
                    classFilter === 'wizard'
                      ? 'bg-arcane-purple text-white border-arcane-purple'
                      : 'bg-white text-ink border-parchment-dark'
                  }`}
                >
                  Mage
                </button>
              </div>
            </div>
            
            {/* Filtre par type */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-ink-muted">Type:</span>
              <div className="flex gap-1">
                <button
                  onClick={() => setConsumableFilter('all')}
                  className={`text-xs px-2 py-1 rounded border ${
                    consumableFilter === 'all'
                      ? 'bg-divine-gold text-white border-divine-gold'
                      : 'bg-white text-ink border-parchment-dark'
                  }`}
                >
                  Tous
                </button>
                <button
                  onClick={() => setConsumableFilter('consumed')}
                  className={`text-xs px-2 py-1 rounded border ${
                    consumableFilter === 'consumed'
                      ? 'bg-blood-red text-white border-blood-red'
                      : 'bg-white text-ink border-parchment-dark'
                  }`}
                >
                  🔥 Consommés
                </button>
                <button
                  onClick={() => setConsumableFilter('reusable')}
                  className={`text-xs px-2 py-1 rounded border ${
                    consumableFilter === 'reusable'
                      ? 'bg-forest text-white border-forest'
                      : 'bg-white text-ink border-parchment-dark'
                  }`}
                >
                  ♻️ Réutilisables
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bouton d'initialisation des composants */}
      {shoppingItems.length === 0 && (
        <div className="card bg-parchment-light border-parchment-dark text-center">
          <p className="text-sm text-ink-muted mb-3">
            Aucun composant configuré. Initialisez la liste avec les composants du prêtre ou du mage.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={handleAddDefaultComponents}
              className="btn btn-primary inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Composants Prêtre (0-9)
            </button>
            <button
              onClick={handleAddWizardComponents}
              className="btn btn-secondary inline-flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Composants Mage
            </button>
          </div>
        </div>
      )}

      {/* Liste par priorité - Composants accessibles */}
      <div className="space-y-3">
        {priorityOrder.map(priority => {
          const sectionItems = accessibleItemsByPriority[priority];
          const missingCount = sectionItems.filter(item => {
            const stock = getCurrentStock(item.itemId);
            return stock < item.quantityIdeal;
          }).length;
          const itemsToBuyCount = sectionItems.filter(item => item.quantityToBuy > 0).length;
          
          if (sectionItems.length === 0) return null;
          
          const colors = priorityColors[priority];
          
          return (
            <div key={priority} className="border border-parchment-dark rounded-lg overflow-hidden">
              {/* Header de section */}
              <button
                onClick={() => toggleSection(priority)}
                className={`w-full px-3 py-2 flex items-center justify-between ${colors.bg} border-b ${colors.border}`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{colors.icon}</span>
                  <span className={`font-display text-sm ${colors.text}`}>
                    Priorité {priorityLabels[priority]}
                  </span>
                  {itemsToBuyCount > 0 && (
                    <span className="text-xs bg-white/70 px-1.5 py-0.5 rounded-full font-medium">
                      {itemsToBuyCount} à acheter
                    </span>
                  )}
                  {missingCount > 0 && itemsToBuyCount === 0 && (
                    <span className="text-xs bg-blood-red/10 text-blood-red px-1.5 py-0.5 rounded-full">
                      {missingCount} manquant
                    </span>
                  )}
                </div>
                <span className={`text-xs ${colors.text}`}>
                  {expandedSections[priority] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </span>
              </button>
              
              {/* Items */}
              {expandedSections[priority] && (
                <div className="p-2 space-y-2">
                  {sectionItems.map(item => {
                    const stock = getCurrentStock(item.itemId);
                    const isComplete = stock >= item.quantityIdeal;
                    const price = getItemPrice(item.itemId);
                    const itemCost = price * item.quantityToBuy;
                    const description = getItemDescription(item);
                    const isConsumed = item.componentType === 'consumed_per_cast' || item.componentType === 'consumed_per_use';
                    
                    return (
                      <div 
                        key={item.itemId}
                        className={`p-3 rounded-lg border ${
                          isComplete 
                            ? 'bg-forest/5 border-forest/20' 
                            : 'bg-parchment-light border-parchment-dark'
                        }`}
                      >
                        {/* Header de l'item */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`font-display text-sm ${isComplete ? 'text-ink-muted' : 'text-ink'}`}>
                                {getItemDisplayName(item.itemId)}
                              </span>
                              
                              {/* Badge consommable/réutilisable */}
                              {item.componentType && (
                                <span className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded ${
                                  isConsumed
                                    ? 'bg-blood-red/10 text-blood-red'
                                    : 'bg-forest/10 text-forest'
                                }`}>
                                  {isConsumed ? <Flame className="w-3 h-3" /> : <Recycle className="w-3 h-3" />}
                                  {isConsumed ? 'Consommé' : 'Réutilisable'}
                                </span>
                              )}
                              
                              {/* Badge classe source */}
                              {item.classSource && (
                                <span className={`text-[10px] px-1.5 py-0.5 rounded border ${classSourceStyles[item.classSource]}`}>
                                  {classSourceLabels[item.classSource]}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {/* Sélecteur de quantité */}
                          <select
                            value={item.quantityToBuy}
                            onChange={(e) => handleQuantityChange(item.itemId, parseInt(e.target.value))}
                            className="text-sm border border-parchment-dark rounded px-2 py-1 bg-white focus:border-divine-gold focus:ring-1 focus:ring-divine-gold"
                            disabled={isComplete && !isConsumed}
                          >
                            {Array.from({ length: 21 }, (_, i) => (
                              <option key={i} value={i}>{i}</option>
                            ))}
                          </select>
                        </div>
                        
                        {/* Description */}
                        {description && (
                          <p className="text-xs text-ink-muted line-clamp-2 mb-2">
                            {description}
                          </p>
                        )}
                        
                        {/* Sorts liés */}
                        {item.relatedSpells && item.relatedSpells.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-2">
                            {item.relatedSpells.map(spell => {
                              const spellInfo = getSpellById(spell.spellId);
                              const spellClass = (spell as { classSource?: 'cleric' | 'wizard' }).classSource || item.classSource;
                              return (
                                <span 
                                  key={spell.spellId}
                                  className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border ${
                                    spell.consumed 
                                      ? 'bg-blood-red/10 text-blood-red border-blood-red/20'
                                      : 'bg-forest/10 text-forest border-forest/20'
                                  }`}
                                  title={spell.consumed ? 'Composant consommé' : 'Composant réutilisable'}
                                >
                                  {spell.consumed ? <Flame className="w-3 h-3" /> : <Recycle className="w-3 h-3" />}
                                  {spell.spellName}
                                  {spellClass && (
                                    <span className="opacity-60">({classSourceLabels[spellClass]})</span>
                                  )}
                                </span>
                              );
                            })}
                          </div>
                        )}
                        
                        {/* Footer: Stock, Prix et Bouton Acheter */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-3 text-xs">
                            {/* Stock actuel */}
                            <span className={isComplete ? 'text-forest' : 'text-blood-red'}>
                              Stock: {stock}/{item.quantityIdeal}
                            </span>
                            
                            {/* Prix */}
                            {price > 0 && (
                              <span className="text-ink-light">
                                {formatPrice(price)}/u
                              </span>
                            )}
                            
                            {/* Prix total si quantité > 0 */}
                            {item.quantityToBuy > 0 && (
                              <span className="text-blood-red font-medium">
                                = {formatPrice(itemCost)}
                              </span>
                            )}
                          </div>
                          
                          {/* Bouton Acheter */}
                          <button
                            onClick={() => handlePurchase(item)}
                            disabled={item.quantityToBuy <= 0}
                            className={`btn btn-sm ${
                              item.quantityToBuy > 0 
                                ? 'btn-primary' 
                                : 'bg-parchment-dark text-ink-muted cursor-not-allowed'
                            }`}
                          >
                            {isComplete && !isConsumed
                              ? 'Possédé'
                              : 'Acheter'}
                          </button>
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
      {accessibleItems.length > 0 && (
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
              <span className="text-ink-muted">Items à acheter:</span>
              <div className="font-display text-divine-gold-dark">
                {totalItemsToBuy}
              </div>
            </div>
          </div>
          
          {/* Légende */}
          <div className="mt-3 pt-3 border-t border-parchment-dark/50">
            <div className="flex flex-wrap gap-3 text-xs text-ink-muted">
              <span className="inline-flex items-center gap-1">
                <Flame className="w-3 h-3 text-blood-red" />
                Consommé par lancer
              </span>
              <span className="inline-flex items-center gap-1">
                <Recycle className="w-3 h-3 text-forest" />
                Réutilisable
              </span>
              <span className="inline-flex items-center gap-1">
                <Zap className="w-3 h-3 text-divine-gold" />
                Prêtre
              </span>
              <span className="inline-flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-arcane-purple" />
                Mage
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Section Composants pour niveaux futurs */}
      {futureItems.length > 0 && (
        <div className="mt-6 pt-6 border-t-2 border-dashed border-parchment-dark">
          {/* Header de la section futur */}
          <div className="card bg-arcane-purple/10 border-arcane-purple/30">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-arcane-purple" />
              <div className="flex-1">
                <h3 className="font-display text-ink">Composants pour niveaux futurs</h3>
                <p className="text-xs text-ink-muted">
                  {futureTotalItemsToBuy > 0 
                    ? `${futureTotalItemsToBuy} unité${futureTotalItemsToBuy > 1 ? 's' : ''} à prévoir` 
                    : 'Aucun achat prévu'} • {formatPrice(futureTotalCost)} à prévoir
                </p>
              </div>
              <span className="badge bg-arcane-purple/20 text-arcane-purple border-arcane-purple">
                Niveaux {maxAccessibleSpellLevel + 1}-9
              </span>
            </div>
          </div>

          {/* Liste des composants futurs par priorité */}
          <div className="space-y-3 mt-4">
            {priorityOrder.map(priority => {
              const sectionItems = futureItemsByPriority[priority];
              const missingCount = sectionItems.filter(item => {
                const stock = getCurrentStock(item.itemId);
                return stock < item.quantityIdeal;
              }).length;
              const itemsToBuyCount = sectionItems.filter(item => item.quantityToBuy > 0).length;
              
              if (sectionItems.length === 0) return null;
              
              const colors = priorityColors[priority];
              
              return (
                <div key={`future-${priority}`} className="border border-parchment-dark rounded-lg overflow-hidden opacity-80">
                  {/* Header de section */}
                  <button
                    onClick={() => toggleSection(priority)}
                    className={`w-full px-3 py-2 flex items-center justify-between ${colors.bg} border-b ${colors.border}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{colors.icon}</span>
                      <span className={`font-display text-sm ${colors.text}`}>
                        Priorité {priorityLabels[priority]}
                      </span>
                      {itemsToBuyCount > 0 && (
                        <span className="text-xs bg-white/70 px-1.5 py-0.5 rounded-full font-medium">
                          {itemsToBuyCount} à prévoir
                        </span>
                      )}
                      {missingCount > 0 && itemsToBuyCount === 0 && (
                        <span className="text-xs bg-arcane-purple/10 text-arcane-purple px-1.5 py-0.5 rounded-full">
                          {missingCount} manquant
                        </span>
                      )}
                    </div>
                    <span className={`text-xs ${colors.text}`}>
                      {expandedSections[priority] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </span>
                  </button>
                  
                  {/* Items */}
                  {expandedSections[priority] && (
                    <div className="p-2 space-y-2">
                      {sectionItems.map(item => {
                        const stock = getCurrentStock(item.itemId);
                        const isComplete = stock >= item.quantityIdeal;
                        const price = getItemPrice(item.itemId);
                        const itemCost = price * item.quantityToBuy;
                        const description = getItemDescription(item);
                        const isConsumed = item.componentType === 'consumed_per_cast' || item.componentType === 'consumed_per_use';
                        
                        // Récupère le niveau du sort pour cet item
                        const spellLevel = item.relatedSpells?.[0] 
                          ? allSpellComponentMappings.find(m => m.spellId === item.relatedSpells![0].spellId)?.spellLevel 
                          : undefined;
                        
                        return (
                          <div 
                            key={item.itemId}
                            className={`p-3 rounded-lg border ${
                              isComplete 
                                ? 'bg-forest/5 border-forest/20' 
                                : 'bg-parchment-light border-parchment-dark'
                            }`}
                          >
                            {/* Header de l'item */}
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className={`font-display text-sm ${isComplete ? 'text-ink-muted' : 'text-ink'}`}>
                                    {getItemDisplayName(item.itemId)}
                                  </span>
                                  
                                  {/* Badge niveau du sort */}
                                  {spellLevel !== undefined && (
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-arcane-purple/10 text-arcane-purple border border-arcane-purple/20">
                                      Sort niv. {spellLevel}
                                    </span>
                                  )}
                                  
                                  {/* Badge consommable/réutilisable */}
                                  {item.componentType && (
                                    <span className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded ${
                                      isConsumed
                                        ? 'bg-blood-red/10 text-blood-red'
                                        : 'bg-forest/10 text-forest'
                                    }`}>
                                      {isConsumed ? <Flame className="w-3 h-3" /> : <Recycle className="w-3 h-3" />}
                                      {isConsumed ? 'Consommé' : 'Réutilisable'}
                                    </span>
                                  )}
                                  
                                  {/* Badge classe source */}
                                  {item.classSource && (
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${classSourceStyles[item.classSource]}`}>
                                      {classSourceLabels[item.classSource]}
                                    </span>
                                  )}
                                </div>
                              </div>
                              
                              {/* Sélecteur de quantité */}
                              <select
                                value={item.quantityToBuy}
                                onChange={(e) => handleQuantityChange(item.itemId, parseInt(e.target.value))}
                                className="text-sm border border-parchment-dark rounded px-2 py-1 bg-white focus:border-divine-gold focus:ring-1 focus:ring-divine-gold"
                                disabled={isComplete && !isConsumed}
                              >
                                {Array.from({ length: 21 }, (_, i) => (
                                  <option key={i} value={i}>{i}</option>
                                ))}
                              </select>
                            </div>
                            
                            {/* Description */}
                            {description && (
                              <p className="text-xs text-ink-muted line-clamp-2 mb-2">
                                {description}
                              </p>
                            )}
                            
                            {/* Sorts liés */}
                            {item.relatedSpells && item.relatedSpells.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mb-2">
                                {item.relatedSpells.map(spell => {
                                  const spellInfo = getSpellById(spell.spellId);
                                  const spellClass = (spell as { classSource?: 'cleric' | 'wizard' }).classSource || item.classSource;
                                  return (
                                    <span 
                                      key={spell.spellId}
                                      className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border ${
                                        spell.consumed 
                                          ? 'bg-blood-red/10 text-blood-red border-blood-red/20'
                                          : 'bg-forest/10 text-forest border-forest/20'
                                      }`}
                                      title={spell.consumed ? 'Composant consommé' : 'Composant réutilisable'}
                                    >
                                      {spell.consumed ? <Flame className="w-3 h-3" /> : <Recycle className="w-3 h-3" />}
                                      {spell.spellName}
                                      {spellClass && (
                                        <span className="opacity-60">({classSourceLabels[spellClass]})</span>
                                      )}
                                    </span>
                                  );
                                })}
                              </div>
                            )}
                            
                            {/* Footer: Stock, Prix et Bouton Acheter */}
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-3 text-xs">
                                {/* Stock actuel */}
                                <span className={isComplete ? 'text-forest' : 'text-blood-red'}>
                                  Stock: {stock}/{item.quantityIdeal}
                                </span>
                                
                                {/* Prix */}
                                {price > 0 && (
                                  <span className="text-ink-light">
                                    {formatPrice(price)}/u
                                  </span>
                                )}
                                
                                {/* Prix total si quantité > 0 */}
                                {item.quantityToBuy > 0 && (
                                  <span className="text-blood-red font-medium">
                                    = {formatPrice(itemCost)}
                                  </span>
                                )}
                              </div>
                              
                              {/* Bouton Acheter */}
                              <button
                                onClick={() => handlePurchase(item)}
                                disabled={item.quantityToBuy <= 0}
                                className={`btn btn-sm ${
                                  item.quantityToBuy > 0 
                                    ? 'btn-secondary' 
                                    : 'bg-parchment-dark text-ink-muted cursor-not-allowed'
                                }`}
                              >
                                {isComplete && !isConsumed
                                  ? 'Possédé'
                                  : 'Prévoir'}
                              </button>
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

          {/* Résumé section futur */}
          <div className="card bg-arcane-purple/5 border-arcane-purple/20 mt-4">
            <h4 className="font-display text-sm text-ink mb-2 flex items-center gap-2">
              <Sparkle className="w-4 h-4 text-arcane-purple" />
              Résumé composants futurs
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-ink-muted">Coût total à prévoir:</span>
                <div className="font-display text-arcane-purple">
                  {formatPrice(futureTotalCost)}
                </div>
              </div>
              <div>
                <span className="text-ink-muted">Items à prévoir:</span>
                <div className="font-display text-arcane-purple-dark">
                  {futureTotalItemsToBuy}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
