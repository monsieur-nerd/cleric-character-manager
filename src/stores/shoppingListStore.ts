import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  ShoppingListItem, 
  ShoppingPriority, 
  InventoryNotification,
  ComponentType,
  RelatedSpellInfo,
  MulticlassConfig,
  SpellComponentMapping,
} from '@/types';
import { STORAGE_KEYS } from './storageKeys';
import { useInventoryStore } from './inventoryStore';
import { 
  getComponentsForSpell, 
  getMissingComponents,
  allSpellComponentMappings,
} from '@/data/spellComponentMappings';

interface GlobalRestockConfig {
  defaultMinStock: number;
  defaultRestockAmount: number;
  autoRestockEnabled: boolean;
  lowStockThreshold: number;
}

interface ShoppingListState {
  shoppingItems: ShoppingListItem[];
  notifications: InventoryNotification[];
  globalRestockConfig: GlobalRestockConfig;
  multiclassConfig: MulticlassConfig | null;
}

interface ShoppingListActions {
  addToShoppingList: (item: Omit<ShoppingListItem, 'restockConfig'> & { restockConfig?: Partial<ShoppingListItem['restockConfig']> }) => void;
  removeFromShoppingList: (itemId: string) => void;
  updateShoppingItem: (itemId: string, updates: Partial<ShoppingListItem>) => void;
  setQuantityToBuy: (itemId: string, quantity: number) => void;
  purchaseItem: (itemId: string, quantity?: number) => {
    success: boolean;
    addedToInventory: boolean;
    message?: string;
  };
  addComponentForSpell: (spellId: string, spellName: string, itemId: string, itemName: string, consumed: boolean, priority?: ShoppingPriority, classSource?: 'cleric' | 'wizard', spellLevel?: number) => void;
  getComponentsForSpell: (spellId: string) => ShoppingListItem[];
  checkRestockNeeds: () => string[];
  autoRestock: () => void;
  handleSpellCast: (spellId: string) => {
    success: boolean;
    consumed: { itemId: string; quantity: number }[];
    missing: { itemId: string; required: number; has: number }[];
    needsRestock: string[];
  };
  detectComponentNeeds: (spellIds: string[], currentInventoryIds: string[]) => SpellComponentMapping[];
  onCharacterLevelUp: (classType: 'cleric' | 'wizard', newLevel: number, knownSpellIds: string[]) => {
    newSpells: string[];
    newComponents: SpellComponentMapping[];
  };
  addComponentsForNewSpells: (spellIds: string[], classSource: 'cleric' | 'wizard') => void;
  syncComponentsWithKnownSpells: (knownSpellIds: string[], classSource?: 'cleric' | 'wizard') => void;
  getItemsByClassSource: (classSource: 'cleric' | 'wizard' | 'all') => ShoppingListItem[];
  getCriticalComponents: () => ShoppingListItem[];
  setItemClassSource: (itemId: string, classSource: 'cleric' | 'wizard') => void;
  addNotification: (notification: Omit<InventoryNotification, 'id' | 'timestamp'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  updateGlobalRestockConfig: (config: Partial<GlobalRestockConfig>) => void;
  setMulticlassConfig: (config: MulticlassConfig | null) => void;
}

type ShoppingListStore = ShoppingListState & ShoppingListActions;

const getDefaultRestockConfig = (priority: ShoppingPriority, componentType?: ComponentType): ShoppingListItem['restockConfig'] => {
  const isConsumable = componentType === 'consumed_per_cast' || componentType === 'consumed_per_use';
  
  switch (priority) {
    case 'critical':
      return {
        enabled: isConsumable,
        minStock: 1,
        restockAmount: 2,
        autoAddToShoppingList: isConsumable,
      };
    case 'high':
      return {
        enabled: isConsumable,
        minStock: 2,
        restockAmount: 5,
        autoAddToShoppingList: isConsumable,
      };
    case 'medium':
      return {
        enabled: false,
        minStock: 1,
        restockAmount: 2,
        autoAddToShoppingList: false,
      };
    case 'low':
      return {
        enabled: false,
        minStock: 0,
        restockAmount: 3,
        autoAddToShoppingList: false,
      };
    case 'none':
    default:
      return {
        enabled: false,
        minStock: 0,
        restockAmount: 1,
        autoAddToShoppingList: false,
      };
  }
};

export const priorityColors: Record<ShoppingPriority, { bg: string; border: string; text: string; icon: string }> = {
  critical: { bg: 'bg-blood-red/10', border: 'border-blood-red/50', text: 'text-blood-red', icon: '🔴' },
  high: { bg: 'bg-orange-500/10', border: 'border-orange-500/50', text: 'text-orange-600', icon: '🟠' },
  medium: { bg: 'bg-divine-gold/10', border: 'border-divine-gold/50', text: 'text-divine-gold-dark', icon: '🟡' },
  low: { bg: 'bg-forest/10', border: 'border-forest/50', text: 'text-forest', icon: '🟢' },
  none: { bg: 'bg-ink-light/10', border: 'border-ink-light/30', text: 'text-ink-light', icon: '⚪' },
};

export const priorityLabels: Record<ShoppingPriority, string> = {
  critical: 'Critique',
  high: 'Haute',
  medium: 'Moyenne',
  low: 'Basse',
  none: 'Aucune',
};

export const componentTypeLabels: Record<ComponentType, string> = {
  consumed_per_cast: 'Consommé par lancer',
  consumed_per_use: 'Consommé par utilisation',
  reusable_focus: 'Focus réutilisable',
  permanent: 'Permanent',
};

const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const useShoppingListStore = create<ShoppingListStore>()(
  persist(
    (set, get) => ({
      shoppingItems: [],
      notifications: [],
      
      globalRestockConfig: {
        defaultMinStock: 1,
        defaultRestockAmount: 2,
        autoRestockEnabled: true,
        lowStockThreshold: 25,
      },
      
      multiclassConfig: null,
      
      addToShoppingList: (item) => {
        const { shoppingItems } = get();
        const existingItem = shoppingItems.find(i => i.itemId === item.itemId);
        
        if (existingItem) {
          set({
            shoppingItems: shoppingItems.map(i =>
              i.itemId === item.itemId
                ? { 
                    ...i, 
                    ...item,
                    restockConfig: item.restockConfig 
                      ? { ...i.restockConfig, ...item.restockConfig }
                      : i.restockConfig,
                    quantityToBuy: item.quantityToBuy || i.quantityToBuy,
                  }
                : i
            ),
          });
        } else {
          const restockConfig = item.restockConfig 
            ? { ...getDefaultRestockConfig(item.priority, item.componentType), ...item.restockConfig }
            : getDefaultRestockConfig(item.priority, item.componentType);
            
          const newItem: ShoppingListItem = {
            ...item,
            restockConfig,
            quantityToBuy: item.quantityToBuy || 1,
            autoAdded: item.autoAdded || false,
          };
          
          set({
            shoppingItems: [...shoppingItems, newItem],
          });
        }
      },
      
      removeFromShoppingList: (itemId) => {
        set((state) => ({
          shoppingItems: state.shoppingItems.filter(i => i.itemId !== itemId),
        }));
      },
      
      updateShoppingItem: (itemId, updates) => {
        set((state) => ({
          shoppingItems: state.shoppingItems.map(i =>
            i.itemId === itemId ? { ...i, ...updates } : i
          ),
        }));
      },
      
      setQuantityToBuy: (itemId, quantity) => {
        set((state) => ({
          shoppingItems: state.shoppingItems.map(i =>
            i.itemId === itemId ? { ...i, quantityToBuy: Math.max(0, quantity) } : i
          ),
        }));
      },
      
      purchaseItem: (itemId, quantity) => {
        const { shoppingItems, removeFromShoppingList, addNotification } = get();
        const item = shoppingItems.find(i => i.itemId === itemId);
        
        if (!item) {
          return { success: false, addedToInventory: false, message: 'Item non trouvé dans la liste' };
        }
        
        const qtyToPurchase = quantity ?? item.quantityToBuy;
        
        if (qtyToPurchase <= 0) {
          return { success: false, addedToInventory: false, message: 'Quantité invalide' };
        }
        
        const inventoryStore = useInventoryStore.getState();
        const existingInventoryItem = inventoryStore.getItemById(itemId);
        
        if (existingInventoryItem) {
          inventoryStore.updateQuantity(itemId, existingInventoryItem.quantity + qtyToPurchase);
        } else {
          const newItem = {
            id: itemId,
            name: itemId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
            type: item.category === 'component' ? 'Composante' : item.category === 'weapon' ? 'Arme' : item.category === 'armor' ? 'Armure' : item.category === 'consumable' ? 'Consommable' : 'Équipement aventure',
            description: item.notes || '',
            quantity: qtyToPurchase,
            unitPrice: 0,
            totalPrice: 0,
            unitWeight: null,
            totalWeight: 0,
            isCarried: true,
            isComponent: item.category === 'component',
            shoppingPriority: item.priority,
            componentType: item.componentType,
            relatedSpells: item.relatedSpells,
            classSource: item.classSource,
          };
          inventoryStore.addItem(newItem as Parameters<typeof inventoryStore.addItem>[0]);
        }
        
        set((state) => ({
          shoppingItems: state.shoppingItems.map(i =>
            i.itemId === itemId 
              ? { ...i, lastPurchased: new Date().toISOString() }
              : i
          ),
        }));
        
        const shouldRemove = item.componentType === 'reusable_focus' || 
                            item.componentType === 'permanent' ||
                            item.category !== 'component';
        
        if (shouldRemove) {
          removeFromShoppingList(itemId);
        } else {
          set((state) => ({
            shoppingItems: state.shoppingItems.map(i =>
              i.itemId === itemId ? { ...i, quantityToBuy: 0 } : i
            ),
          }));
        }
        
        addNotification({
          type: 'purchased',
          itemId,
          itemName: existingInventoryItem?.name || itemId,
          message: `${qtyToPurchase} × ${existingInventoryItem?.name || itemId} acheté(s)`,
          read: false,
        });
        
        return { 
          success: true, 
          addedToInventory: true,
          message: `${qtyToPurchase} × ${existingInventoryItem?.name || itemId} ajouté(s) à l'inventaire`
        };
      },
      
      addComponentForSpell: (spellId, spellName, itemId, _itemName, consumed, priority = 'medium', classSource = 'cleric', spellLevel) => {
        const { shoppingItems, addToShoppingList } = get();
        
        const existingItem = shoppingItems.find(i => i.itemId === itemId);
        const relatedSpell: RelatedSpellInfo & { classSource?: 'cleric' | 'wizard' } = { 
          spellId, 
          spellName, 
          consumed,
          classSource,
          spellLevel,
        };
        
        if (existingItem) {
          const hasSpell = existingItem.relatedSpells?.some(s => s.spellId === spellId);
          if (!hasSpell) {
            set((state) => ({
              shoppingItems: state.shoppingItems.map(i =>
                i.itemId === itemId
                  ? { 
                      ...i, 
                      relatedSpells: [...(i.relatedSpells || []), relatedSpell],
                      componentType: consumed ? 'consumed_per_cast' : 'reusable_focus',
                      classSource,
                    }
                  : i
              ),
            }));
          }
        } else {
          addToShoppingList({
            itemId,
            priority,
            category: 'component',
            componentType: consumed ? 'consumed_per_cast' : 'reusable_focus',
            relatedSpells: [relatedSpell],
            quantityIdeal: consumed ? 3 : 1,
            quantityToBuy: 0,
            notes: consumed 
              ? `Consommé pour ${spellName}` 
              : `Focus réutilisable pour ${spellName}`,
            autoAdded: false,
            classSource,
          });
        }
      },
      
      getComponentsForSpell: (spellId) => {
        return get().shoppingItems.filter(item =>
          item.relatedSpells?.some(spell => spell.spellId === spellId)
        );
      },
      
      checkRestockNeeds: () => {
        const { shoppingItems, addNotification } = get();
        const inventoryStore = useInventoryStore.getState();
        const itemsNeedingRestock: string[] = [];
        
        shoppingItems.forEach(item => {
          if (!item.restockConfig.enabled) return;
          
          const inventoryItem = inventoryStore.getItemById(item.itemId);
          const currentStock = inventoryItem?.quantity || 0;
          const threshold = item.restockConfig.minStock;
          
          if (currentStock <= threshold) {
            itemsNeedingRestock.push(item.itemId);
            
            const restockAmount = item.restockConfig.restockAmount;
            set((state) => ({
              shoppingItems: state.shoppingItems.map(i =>
                i.itemId === item.itemId
                  ? { ...i, quantityToBuy: Math.max(i.quantityToBuy, restockAmount), autoAdded: true }
                  : i
              ),
            }));
            
            if (item.restockConfig.autoAddToShoppingList) {
              addNotification({
                type: 'low_stock',
                itemId: item.itemId,
                itemName: inventoryItem?.name || item.itemId,
                message: `${inventoryItem?.name || item.itemId} est en stock bas (${currentStock} restant)`,
                read: false,
                actions: [
                  { label: 'Acheter', action: 'purchase', params: { itemId: item.itemId } },
                  { label: 'Ignorer', action: 'dismiss', params: { itemId: item.itemId } },
                ],
              });
            }
          }
        });
        
        return itemsNeedingRestock;
      },
      
      autoRestock: () => {
        const { globalRestockConfig } = get();
        if (!globalRestockConfig.autoRestockEnabled) return;
        
        get().checkRestockNeeds();
      },
      
      handleSpellCast: (spellId) => {
        const { shoppingItems, addNotification } = get();
        const inventoryStore = useInventoryStore.getState();
        const needsRestock: string[] = [];
        
        const components = shoppingItems.filter(item =>
          item.relatedSpells?.some(spell => spell.spellId === spellId && spell.consumed)
        );
        
        const consumed: { itemId: string; quantity: number }[] = [];
        const missing: { itemId: string; required: number; has: number }[] = [];
        
        for (const component of components) {
          const inventoryItem = inventoryStore.getItemById(component.itemId);
          const requiredQty = 1;
          
          const hasQty = inventoryItem?.quantity || 0;
          if (hasQty < requiredQty) {
            missing.push({
              itemId: component.itemId,
              required: requiredQty,
              has: hasQty,
            });
          }
        }
        
        if (missing.length > 0) {
          return { success: false, consumed: [], missing, needsRestock };
        }
        
        for (const component of components) {
          const inventoryItem = inventoryStore.getItemById(component.itemId);
          const spellInfo = component.relatedSpells?.find(s => s.spellId === spellId);
          
          if (spellInfo?.consumed && inventoryItem) {
            const newQty = Math.max(0, inventoryItem.quantity - 1);
            inventoryStore.updateQuantity(component.itemId, newQty);
            
            consumed.push({ itemId: component.itemId, quantity: 1 });
            
            addNotification({
              type: 'consumed',
              itemId: component.itemId,
              itemName: inventoryItem.name,
              message: `${inventoryItem.name} consommé pour ${spellInfo.spellName}`,
              read: false,
            });
            
            if (newQty <= component.restockConfig.minStock && component.restockConfig.enabled) {
              needsRestock.push(component.itemId);
              addNotification({
                type: 'component_needed',
                itemId: component.itemId,
                itemName: inventoryItem.name,
                message: `${inventoryItem.name} doit être réapprovisionné (${newQty} restant)`,
                read: false,
                actions: [
                  { label: 'Acheter maintenant', action: 'purchase', params: { itemId: component.itemId } },
                ],
              });
            }
          }
        }
        
        get().checkRestockNeeds();
        
        return { success: true, consumed, missing: [], needsRestock };
      },
      
      // Détection automatique des composants nécessaires
      detectComponentNeeds: (spellIds, currentInventoryIds) => {
        return getMissingComponents(spellIds, currentInventoryIds);
      },
      
      // Vérifie si un composant est satisfait par une alternative présente dans l'inventaire
      isComponentSatisfiedByAlternative: (component: SpellComponentMapping, inventoryItemIds: string[]): boolean => {
        if (!component.alternatives || component.alternatives.length === 0) {
          return inventoryItemIds.includes(component.itemId);
        }
        
        // Vérifie si le composant principal ou une alternative est présent
        const allOptionIds = [component.itemId, ...component.alternatives.map(alt => alt.itemId)];
        return allOptionIds.some(id => inventoryItemIds.includes(id));
      },
      
      // Gestion du level up
      onCharacterLevelUp: (classType, newLevel, knownSpellIds) => {
        const classComponents = allSpellComponentMappings.filter(
          c => c.classSource === classType && c.spellLevel <= newLevel
        );
        
        const newSpellIds = classComponents
          .map(c => c.spellId)
          .filter((spellId, index, self) => self.indexOf(spellId) === index)
          .filter(spellId => !knownSpellIds.includes(spellId));
        
        const newComponents: SpellComponentMapping[] = [];
        newSpellIds.forEach(spellId => {
          const components = getComponentsForSpell(spellId);
          newComponents.push(...components);
        });
        
        return { newSpells: newSpellIds, newComponents };
      },
      
      // Ajoute les composants pour de nouveaux sorts
      addComponentsForNewSpells: (spellIds, classSource) => {
        const { addComponentForSpell } = get();
        
        spellIds.forEach(spellId => {
          const components = getComponentsForSpell(spellId);
          components.forEach(comp => {
            addComponentForSpell(
              comp.spellId,
              comp.spellName,
              comp.itemId,
              comp.itemName,
              comp.consumed,
              comp.priority,
              classSource,
              comp.spellLevel
            );
          });
        });
      },
      
      // Synchronise les composants avec les sorts connus (utile après migration)
      syncComponentsWithKnownSpells: (knownSpellIds: string[], classSource: 'cleric' | 'wizard' = 'cleric') => {
        const { shoppingItems, addComponentsForNewSpells } = get();
        const validItemIds = new Set(allSpellComponentMappings.map(m => m.itemId));
        
        // Supprime les items obsolètes qui ne correspondent à aucun mapping valide
        const obsoleteItems = shoppingItems.filter(item => !validItemIds.has(item.itemId));
        obsoleteItems.forEach(item => {
          get().removeFromShoppingList(item.itemId);
        });
        
        // Ajoute les composants pour tous les sorts connus
        addComponentsForNewSpells(knownSpellIds, classSource);
        
        console.log(`[Sync] Composants synchronisés pour ${knownSpellIds.length} sorts connus`);
      },
      
      // Multiclassage - filtre par classe
      getItemsByClassSource: (classSource) => {
        const { shoppingItems } = get();
        if (classSource === 'all') return shoppingItems;
        return shoppingItems.filter(item => item.classSource === classSource);
      },
      
      // Récupère les composants critiques
      getCriticalComponents: () => {
        const { shoppingItems } = get();
        return shoppingItems.filter(item => 
          item.priority === 'critical' || 
          (item.componentType === 'consumed_per_cast' && item.restockConfig.enabled)
        );
      },
      
      // Définit la classe source d'un item
      setItemClassSource: (itemId, classSource) => {
        set((state) => ({
          shoppingItems: state.shoppingItems.map(i =>
            i.itemId === itemId ? { ...i, classSource } : i
          ),
        }));
      },
      
      addNotification: (notification) => {
        const newNotification: InventoryNotification = {
          ...notification,
          id: generateId(),
          timestamp: new Date().toISOString(),
        };
        
        set((state) => ({
          notifications: [newNotification, ...state.notifications].slice(0, 50),
        }));
      },
      
      markNotificationRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
          ),
        }));
      },
      
      clearNotifications: () => {
        set({ notifications: [] });
      },
      
      updateGlobalRestockConfig: (config) => {
        set((state) => ({
          globalRestockConfig: { ...state.globalRestockConfig, ...config },
        }));
      },
      
      // Configuration multiclassage
      setMulticlassConfig: (config) => {
        set({ multiclassConfig: config });
      },
    }),
    {
      name: STORAGE_KEYS.SHOPPING_LIST,
      version: 3,
      partialize: (state) => ({
        shoppingItems: state.shoppingItems,
        notifications: state.notifications,
        globalRestockConfig: state.globalRestockConfig,
        multiclassConfig: state.multiclassConfig,
      }),
      migrate: (persistedState: unknown, version: number) => {
        // Migration pour nettoyer les anciens items avec IDs combinés
        if (version < 3) {
          const state = persistedState as ShoppingListStore;
          const validItemIds = new Set(allSpellComponentMappings.map(m => m.itemId));
          
          // IDs combinés obsolètes à supprimer
          const obsoletePatterns = [
            'encens-offrande', 'encens-or', 'eau-argent', 'eau-herbes',
            'encens-eau', 'encens-poudre', 'jaspe-perle', 'encens-herbes',
            'encens-perle', 'encens-communion', 'offrande-communion',
            'eau-bénite-argent', 'eau-bénite-herbes', 'encens-poudre-os'
          ];
          
          const isObsoleteId = (itemId: string): boolean => {
            // Si l'ID n'existe pas dans les mappings valides
            if (!validItemIds.has(itemId)) return true;
            // Ou s'il correspond à un pattern obsolète
            return obsoletePatterns.some(pattern => itemId.includes(pattern));
          };
          
          // Filtrer les items obsolètes
          const cleanedItems = (state.shoppingItems || []).filter(
            item => !isObsoleteId(item.itemId)
          );
          
          console.log(`[Migration v3] Supprimé ${(state.shoppingItems || []).length - cleanedItems.length} items obsolètes`);
          
          return {
            ...state,
            shoppingItems: cleanedItems,
          };
        }
        return persistedState as ShoppingListStore;
      },
    }
  )
);

export const selectShoppingItemsByPriority = (state: ShoppingListStore) => {
  const grouped: Record<ShoppingPriority, ShoppingListItem[]> = {
    critical: [],
    high: [],
    medium: [],
    low: [],
    none: [],
  };
  
  state.shoppingItems.forEach(item => {
    grouped[item.priority].push(item);
  });
  
  return grouped;
};

export const selectConsumedComponents = (state: ShoppingListStore) => {
  return state.shoppingItems.filter(
    item => item.componentType === 'consumed_per_cast' || item.componentType === 'consumed_per_use'
  );
};

export const selectReusableComponents = (state: ShoppingListStore) => {
  return state.shoppingItems.filter(
    item => item.componentType === 'reusable_focus' || item.componentType === 'permanent'
  );
};

export const selectItemsForSpell = (spellId: string) => (state: ShoppingListStore) => {
  return state.shoppingItems.filter(item =>
    item.relatedSpells?.some(spell => spell.spellId === spellId)
  );
};

export const selectTotalCost = (state: ShoppingListStore) => {
  return state.shoppingItems.reduce((sum, _item) => {
    return sum;
  }, 0);
};

export const selectUnreadNotifications = (state: ShoppingListStore) => {
  return state.notifications.filter(n => !n.read);
};

export const selectItemsNeedingRestock = (state: ShoppingListStore) => {
  return state.shoppingItems.filter(item =>
    item.restockConfig.enabled && item.quantityToBuy > 0
  );
};
