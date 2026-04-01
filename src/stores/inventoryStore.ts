import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { EquipmentItem, ComponentRequirement } from '@/types';
import { STORAGE_KEYS } from './storageKeys';

interface InventoryState {
  items: EquipmentItem[];
  componentMapping: ComponentRequirement[];
  
  // Actions
  loadItems: (items: EquipmentItem[]) => void;
  loadComponentMapping: (mapping: ComponentRequirement[]) => void;
  
  // Gestion des items
  addItem: (item: EquipmentItem) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  toggleEquipped: (itemId: string) => void;
  toggleCarried: (itemId: string) => void;
  
  // Sélecteurs
  getItemById: (id: string) => EquipmentItem | undefined;
  getItemsByType: (type: string) => EquipmentItem[];
  getComponents: () => EquipmentItem[];
  getComponentForSpell: (spellId: string) => { item: EquipmentItem; required: ComponentRequirement } | null;
  hasComponentForSpell: (spellId: string) => boolean;
  getMissingComponents: () => { spellId: string; spellName: string; itemName: string; required: number; has: number }[];
  
  // Totaux
  getTotalWeight: () => number;
  getTotalValue: () => number;
  getCarriedWeight: () => number;
}

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set, get) => ({
      items: [],
      componentMapping: [],
      
      loadItems: (items) => {
        // Marque les composantes
        const componentKeywords = [
          'diamant', 'encens', 'symbole', 'filament', 'liege',
          'poudre', 'mercure', 'phosphore', 'plume', 'focal',
          'sang', 'chair', 'ossement'
        ];
        
        const itemsWithComponentFlag = items.map(item => ({
          ...item,
          isComponent: componentKeywords.some(kw => 
            (item.name || '').toLowerCase().includes(kw.toLowerCase())
          ) || item.type === 'Composante',
        }));
        
        set({ items: itemsWithComponentFlag });
      },
      
      loadComponentMapping: (mapping) => {
        set({ componentMapping: mapping });
      },
      
      addItem: (item) => {
        set((state) => ({
          items: [...state.items, item],
        }));
      },
      
      updateQuantity: (itemId, quantity) => {
        set((state) => ({
          items: state.items.map(item => {
            if (item.id === itemId) {
              const newQuantity = Math.max(0, quantity);
              return {
                ...item,
                quantity: newQuantity,
                totalPrice: Number((item.unitPrice * newQuantity).toFixed(2)),
                totalWeight: item.unitWeight ? item.unitWeight * newQuantity : 0,
              };
            }
            return item;
          }),
        }));
      },
      
      toggleEquipped: (itemId) => {
        set((state) => ({
          items: state.items.map(item => 
            item.id === itemId ? { ...item, isEquipped: !item.isEquipped } : item
          ),
        }));
      },
      
      toggleCarried: (itemId) => {
        set((state) => ({
          items: state.items.map(item => 
            item.id === itemId ? { ...item, isCarried: !item.isCarried } : item
          ),
        }));
      },
      
      // Sélecteurs
      getItemById: (id) => {
        return get().items.find(item => item.id === id);
      },
      
      getItemsByType: (type) => {
        return get().items.filter(item => item.type === type);
      },
      
      getComponents: () => {
        return get().items.filter(item => item.isComponent);
      },
      
      getComponentForSpell: (spellId) => {
        const { componentMapping, items } = get();
        const mapping = componentMapping.find(m => m.spellId === spellId);
        
        if (!mapping) return null;
        
        const item = items.find(i => i.id === mapping.itemId);
        if (!item) return null;
        
        return { item, required: mapping };
      },
      
      hasComponentForSpell: (spellId) => {
        const result = get().getComponentForSpell(spellId);
        if (!result) return true; // Pas de composante requise
        
        return result.item.quantity >= result.required.quantity;
      },
      
      getMissingComponents: () => {
        const { componentMapping, items } = get();
        const missing: { spellId: string; spellName: string; itemName: string; required: number; has: number }[] = [];
        
        // Nécessite une référence aux sorts - on va retourner les IDs pour l'instant
        componentMapping.forEach(mapping => {
          const item = items.find(i => i.id === mapping.itemId);
          const hasQty = item ? item.quantity : 0;
          
          if (hasQty < mapping.quantity) {
            missing.push({
              spellId: mapping.spellId,
              spellName: mapping.spellId, // Sera remplacé par le vrai nom côté composant
              itemName: item?.name || mapping.itemId,
              required: mapping.quantity,
              has: hasQty,
            });
          }
        });
        
        return missing;
      },
      
      getTotalWeight: () => {
        return get().items.reduce((sum, item) => sum + (item.totalWeight || 0), 0);
      },
      
      getTotalValue: () => {
        return get().items.reduce((sum, item) => sum + item.totalPrice, 0);
      },
      
      getCarriedWeight: () => {
        return get().items
          .filter(item => item.isCarried)
          .reduce((sum, item) => sum + (item.totalWeight || 0), 0);
      },
    }),
    {
      name: STORAGE_KEYS.INVENTORY,
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
);
