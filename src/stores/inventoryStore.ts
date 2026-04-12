import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { EquipmentItem, EquipmentSlot, SpellComponentMapping } from '@/types';
import { STORAGE_KEYS } from './storageKeys';
import { getComponentsForSpell, allSpellComponentMappings } from '@/data/spellComponentMappings';

interface InventoryState {
  items: EquipmentItem[];
  componentMapping: SpellComponentMapping[];
  
  // Actions
  loadItems: (items: EquipmentItem[]) => void;
  loadComponentMapping: (mapping: SpellComponentMapping[]) => void;
  
  // Gestion des items
  addItem: (item: EquipmentItem) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  toggleEquipped: (itemId: string) => void;
  toggleCarried: (itemId: string) => void;
  equipItem: (itemId: string) => { success: boolean; message?: string; unequippedItems?: string[] };
  unequipItem: (itemId: string) => void;
  toggleTwoHanded: (itemId: string) => { success: boolean; message?: string };
  
  // Système "Au camp"
  toggleAtCamp: (itemId: string) => void;
  takeAllFromCamp: () => void;
  getCampItems: () => EquipmentItem[];
  
  // Sélecteurs
  getItemById: (id: string) => EquipmentItem | undefined;
  getItemsByType: (type: string) => EquipmentItem[];
  getComponents: () => EquipmentItem[];
  getComponentForSpell: (spellId: string) => { item: EquipmentItem; required: SpellComponentMapping } | null;
  hasComponentForSpell: (spellId: string) => boolean;
  getMissingComponents: () => { spellId: string; spellName: string; itemName: string; required: number; has: number }[];
  
  // Harmonisation (US-041 a US-043)
  attuneItem: (itemId: string) => { success: boolean; message?: string };
  unattuneItem: (itemId: string) => void;
  getAttunedItems: () => EquipmentItem[];
  getAttunedCount: () => number;
  canAttune: () => boolean;
  canAttuneItem: (item: EquipmentItem, characterAlignment?: string, characterClass?: string, characterRace?: string, hasSpellcasting?: boolean) => { canAttune: boolean; reason?: string };
  getAttunementStatus: (item: EquipmentItem) => 'active' | 'inactive' | 'not_required';
  
  // Charges (US-044 a US-047)
  useCharge: (itemId: string, amount?: number) => { success: boolean; message?: string };
  rechargeItem: (itemId: string) => { success: boolean; message?: string };
  rechargeAllItems: (restType: 'short' | 'long', isDawn?: boolean, isDusk?: boolean) => { recharged: string[] };
  
  // Lumiere (US-012 a US-014)
  consumeFuel: (itemId: string, hours: number) => void;
  refillFuel: (itemId: string, hours: number) => void;
  extinguishLightSource: (itemId: string) => void;
  getActiveLightSource: () => EquipmentItem | undefined;
  getActiveLightSources: () => EquipmentItem[];
  
  // Vision (US-035 a US-037)
  toggleVisionEffect: (itemId: string) => void;
  getActiveVisionEffects: () => EquipmentItem[];
  
  // Sélecteurs d'équipement
  getEquippedItems: () => EquipmentItem[];
  getEquippedItemBySlot: (slot: EquipmentSlot) => EquipmentItem | undefined;
  getEquippedArmor: () => EquipmentItem | undefined;
  getEquippedShield: () => EquipmentItem | undefined;
  getEquippedWeapons: () => EquipmentItem[];
  
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
        const { items: existingItems } = get();
        
        // Marque les composantes
        const componentKeywords = [
          'diamant', 'encens', 'symbole', 'filament', 'liege',
          'poudre', 'mercure', 'phosphore', 'plume', 'focal',
          'sang', 'chair', 'ossement'
        ];
        
        // Fusionne les nouveaux items avec les existants
        // Préserve les quantités existantes, ajoute les nouveaux items si pas présents
        const existingIds = new Set(existingItems.map(item => item.id));
        const newItems = items.filter(item => !existingIds.has(item.id));
        
        const itemsWithComponentFlag = [...existingItems, ...newItems].map(item => ({
          ...item,
          isComponent: componentKeywords.some(kw => 
            (item.name || '').toLowerCase().includes(kw.toLowerCase())
          ) || item.type === 'Composante',
        }));
        
        set({ items: itemsWithComponentFlag });
      },
      
      loadComponentMapping: (mapping: SpellComponentMapping[]) => {
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
      
      // US-010: Gestion d'équipement avec conflits
      equipItem: (itemId) => {
        const state = get();
        const itemToEquip = state.getItemById(itemId);
        
        if (!itemToEquip) {
          return { success: false, message: 'Item non trouvé' };
        }
        
        if (itemToEquip.quantity <= 0) {
          return { success: false, message: 'Item non disponible' };
        }
        
        let slot = itemToEquip.slot || getDefaultSlotForItem(itemToEquip);
        const unequippedItems: string[] = [];
        
        // Gestion spéciale pour les armes : permet le dual-wielding
        if (slot === 'main_hand' && itemToEquip.type === 'Arme') {
          const equippedMainHand = state.items.find(i => 
            i.isEquipped && (i.slot || getDefaultSlotForItem(i)) === 'main_hand'
          );
          const equippedOffHand = state.items.find(i => 
            i.isEquipped && (i.slot || getDefaultSlotForItem(i)) === 'off_hand'
          );
          
          // Si main_hand occupée et off_hand libre (pas de bouclier), on met l'arme en off_hand
          if (equippedMainHand && !equippedOffHand) {
            slot = 'off_hand';
          }
        }
        
        // Gestion pour les boucliers : si une arme est en off_hand, la retirer
        if (slot === 'off_hand' && itemToEquip.type === 'Bouclier') {
          const equippedOffHandWeapon = state.items.find(i => 
            i.isEquipped && 
            i.type === 'Arme' && 
            (i.slot || getDefaultSlotForItem(i)) === 'off_hand'
          );
          
          if (equippedOffHandWeapon) {
            unequippedItems.push(equippedOffHandWeapon.name);
          }
        }
        
        set((state) => {
          const newItems = state.items.map((item) => {
            if (item.id === itemId) {
              // Assigne le slot déterminé (main_hand ou off_hand)
              return { ...item, isEquipped: true, slot };
            }
            
            if (item.isEquipped && slot) {
              const itemSlot = item.slot || getDefaultSlotForItem(item);
              
              // Déséquipe l'item du même slot (sauf pour les anneaux qui ont 2 slots)
              if (itemSlot === slot && slot !== 'ring') {
                unequippedItems.push(item.name);
                return { ...item, isEquipped: false };
              }
              
              // Si on équipe un bouclier, déséquipe l'arme en off_hand
              if (slot === 'off_hand' && itemToEquip.type === 'Bouclier' && 
                  item.type === 'Arme' && itemSlot === 'off_hand') {
                return { ...item, isEquipped: false };
              }
            }
            
            return item;
          });
          
          return { items: newItems };
        });
        
        const slotLabel = slot === 'off_hand' ? ' (main gauche)' : '';
        const message = unequippedItems.length > 0
          ? `${itemToEquip.name}${slotLabel} équipé(e), ${unequippedItems.join(', ')} retiré(s)`
          : `${itemToEquip.name}${slotLabel} équipé(e)`;
        
        return { success: true, message, unequippedItems };
      },
      
      unequipItem: (itemId) => {
        set((state) => ({
          items: state.items.map(item => {
            if (item.id === itemId) {
              // Réinitialise le slot à sa valeur par défaut si c'était une arme
              // pour éviter que l'arme reste marquée comme off_hand
              const defaultSlot = getDefaultSlotForItem(item);
              return { 
                ...item, 
                isEquipped: false,
                equippedTwoHanded: false,
                slot: defaultSlot || item.slot
              };
            }
            return item;
          }),
        }));
      },
      
      // Bascule entre combat à une main et à deux mains (pour armes polyvalentes)
      toggleTwoHanded: (itemId) => {
        const item = get().getItemById(itemId);
        if (!item) return { success: false, message: 'Arme non trouvée' };
        if (item.type !== 'Arme') return { success: false, message: 'Pas une arme' };
        if (!item.weaponProperties?.includes('Polyvalent')) {
          return { success: false, message: 'Cette arme n\'est pas polyvalente' };
        }
        if (!item.versatileDamage) {
          return { success: false, message: 'Dégâts polyvalents non définis' };
        }
        
        const newTwoHanded = !item.equippedTwoHanded;
        
        set((state) => ({
          items: state.items.map(i => {
            if (i.id === itemId) {
              return { ...i, equippedTwoHanded: newTwoHanded };
            }
            // Si on passe à deux mains, déséquipe l'arme en off_hand
            if (newTwoHanded && i.isEquipped && i.type === 'Arme') {
              const itemSlot = i.slot || getDefaultSlotForItem(i);
              if (itemSlot === 'off_hand') {
                return { ...i, isEquipped: false };
              }
            }
            return i;
          }),
        }));
        
        const mode = newTwoHanded ? 'à deux mains' : 'à une main';
        return { success: true, message: `${item.name} équipée ${mode} (${newTwoHanded ? item.versatileDamage : item.damage})` };
      },
      
      // Harmonisation (US-041 à US-043)
      attuneItem: (itemId) => {
        const item = get().getItemById(itemId);
        if (!item) return { success: false, message: 'Item non trouvé' };
        if (!item.attunement?.required) return { success: false, message: "Pas d'harmonisation requise" };
        if (item.attunement.isAttuned) return { success: false, message: 'Déjà harmonisé' };
        if (get().getAttunedCount() >= 3) return { success: false, message: 'Max 3 objets harmonisés' };
        
        set((state) => ({
          items: state.items.map(i =>
            i.id === itemId ? { ...i, attunement: { ...i.attunement!, isAttuned: true } } : i
          ),
        }));
        return { success: true, message: `${item.name} harmonisé` };
      },
      
      unattuneItem: (itemId) => {
        set((state) => ({
          items: state.items.map(i =>
            i.id === itemId && i.attunement ? { ...i, attunement: { ...i.attunement, isAttuned: false } } : i
          ),
        }));
      },
      
      getAttunedItems: () => get().items.filter(item => item.attunement?.required && item.attunement.isAttuned),
      getAttunedCount: () => get().items.filter(item => item.attunement?.required && item.attunement.isAttuned).length,
      canAttune: () => get().getAttunedCount() < 3,
      
      canAttuneItem: (item: EquipmentItem, characterAlignment?: string, characterClass?: string, characterRace?: string, hasSpellcasting?: boolean) => {
        if (!item.attunement?.required) {
          return { canAttune: true };
        }
        
        const prereqs = item.attunement.prerequisites;
        if (!prereqs) {
          return { canAttune: true };
        }
        
        if (prereqs.alignment && characterAlignment) {
          if (!characterAlignment.toLowerCase().includes(prereqs.alignment.toLowerCase())) {
            return { 
              canAttune: false, 
              reason: `Alignement requis : ${prereqs.alignment}` 
            };
          }
        }
        
        if (prereqs.class && characterClass) {
          if (characterClass.toLowerCase() !== prereqs.class.toLowerCase()) {
            return { 
              canAttune: false, 
              reason: `Classe requise : ${prereqs.class}` 
            };
          }
        }
        
        if (prereqs.race && characterRace) {
          if (characterRace.toLowerCase() !== prereqs.race.toLowerCase()) {
            return { 
              canAttune: false, 
              reason: `Race requise : ${prereqs.race}` 
            };
          }
        }
        
        if (prereqs.spellcasting && !hasSpellcasting) {
          return { 
            canAttune: false, 
            reason: 'Capacite de lancer des sorts requise' 
          };
        }
        
        return { canAttune: true };
      },
      
      getAttunementStatus: (item: EquipmentItem) => {
        if (!item.attunement?.required) {
          return 'not_required';
        }
        return item.attunement.isAttuned ? 'active' : 'inactive';
      },
      
      // Charges (US-044 à US-047)
      useCharge: (itemId, amount = 1) => {
        const item = get().getItemById(itemId);
        if (!item?.charges) return { success: false, message: 'Sans charges' };
        if (item.charges.current < amount) return { success: false, message: 'Charges insuffisantes' };
        
        const newCharges = item.charges.current - amount;
        set((state) => ({
          items: state.items.map(i => i.id === itemId ? { ...i, charges: { ...i.charges!, current: newCharges } } : i),
        }));
        
        if (newCharges === 0 && item.charges.destroyOnDepletion) {
          const roll = Math.floor(Math.random() * 20) + 1;
          if (roll === 1) {
            set((state) => ({ items: state.items.filter(i => i.id !== itemId) }));
            return { success: true, message: `${item.name} utilisé et DÉTRUIT !` };
          }
        }
        return { success: true };
      },
      
      rechargeItem: (itemId) => {
        const item = get().getItemById(itemId);
        if (!item?.charges) return { success: false, message: 'Item sans charges' };
        set((state) => ({
          items: state.items.map(i => i.id === itemId ? { ...i, charges: { ...i.charges!, current: i.charges!.max } } : i),
        }));
        return { success: true, message: `${item.name} recharge` };
      },
      
      rechargeAllItems: (restType, isDawn = false, isDusk = false) => {
        const recharged: string[] = [];
        set((state) => ({
          items: state.items.map(item => {
            if (!item.charges || item.charges.current >= item.charges.max) return item;
            
            let shouldRecharge = false;
            
            switch (item.charges.recharge) {
              case 'short_rest':
                shouldRecharge = restType === 'short' || restType === 'long';
                break;
              case 'long_rest':
                shouldRecharge = restType === 'long';
                break;
              case 'dawn':
                shouldRecharge = isDawn;
                break;
              case 'dusk':
                shouldRecharge = isDusk;
                break;
            }
            
            if (shouldRecharge) {
              recharged.push(item.name);
              return { ...item, charges: { ...item.charges, current: item.charges.max } };
            }
            
            return item;
          }),
        }));
        return { recharged };
      },
      
      // Lumiere (US-012 a US-014)
      consumeFuel: (itemId, hours) => {
        const item = get().getItemById(itemId);
        if (!item?.lightSource?.fuelRemaining) return;
        const newFuel = Math.max(0, item.lightSource.fuelRemaining - hours);
        set((state) => ({
          items: state.items.map(i => i.id === itemId ? { ...i, lightSource: { ...i.lightSource!, fuelRemaining: newFuel } } : i),
        }));
        if (newFuel === 0) get().toggleEquipped(itemId);
      },
      
      refillFuel: (itemId, hours) => {
        const item = get().getItemById(itemId);
        if (!item?.lightSource?.fuelRemaining) return;
        const maxFuel = item.lightSource.fuelDuration ?? item.lightSource.fuelRemaining;
        const newFuel = Math.min(maxFuel, item.lightSource.fuelRemaining + hours);
        set((state) => ({
          items: state.items.map(i => i.id === itemId ? { ...i, lightSource: { ...i.lightSource!, fuelRemaining: newFuel } } : i),
        }));
      },
      
      extinguishLightSource: (itemId) => get().toggleEquipped(itemId),
      getActiveLightSource: () => get().items.find(item => item.isEquipped && item.lightSource && (item.lightSource.fuelRemaining ?? 1) > 0),
      getActiveLightSources: () => get().items.filter(item => item.isEquipped && item.lightSource && (item.lightSource.fuelRemaining ?? 1) > 0),
      
      // Vision (US-035 a US-037)
      toggleVisionEffect: (itemId) => {
        set((state) => ({
          items: state.items.map(item => {
            if (item.id !== itemId || !item.visionEffect) return item;
            return {
              ...item,
              visionEffect: {
                ...item.visionEffect,
                isActive: !item.visionEffect.isActive,
              },
            };
          }),
        }));
      },
      
      getActiveVisionEffects: () => get().items.filter(item => item.isEquipped && item.visionEffect?.isActive),
      
      // Sélecteurs d'équipement
      getEquippedItems: () => get().items.filter(item => item.isEquipped),
      getEquippedItemBySlot: (slot) => get().items.find(item => item.isEquipped && (item.slot || getDefaultSlotForItem(item)) === slot),
      getEquippedArmor: () => get().items.find(item => item.isEquipped && item.type === 'Armure'),
      getEquippedShield: () => get().items.find(item => item.isEquipped && item.type === 'Bouclier'),
      getEquippedWeapons: () => get().items.filter(item => item.isEquipped && item.type === 'Arme'),
      
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
        
        // Récupère tous les composants pour ce sort (y compris les alternatives)
        const mappings = componentMapping.filter(m => m.spellId === spellId);
        
        if (mappings.length === 0) return null;
        
        // Regroupe les composants par groupe d'alternatives
        const groups = new Map<string | undefined, SpellComponentMapping[]>();
        mappings.forEach(m => {
          const groupId = m.alternativeGroupId;
          if (!groups.has(groupId)) {
            groups.set(groupId, []);
          }
          groups.get(groupId)!.push(m);
        });
        
        // Pour chaque groupe, trouve le premier composant disponible
        for (const [groupId, groupMappings] of groups) {
          if (groupId === undefined) {
            // Composant requis (pas d'alternative) - prend le premier
            const mapping = groupMappings[0];
            const item = items.find(i => i.id === mapping.itemId);
            if (item && item.quantity >= mapping.quantity) {
              return { item, required: mapping };
            }
          } else {
            // Groupe d'alternatives - retourne le premier disponible
            for (const mapping of groupMappings) {
              const item = items.find(i => i.id === mapping.itemId);
              if (item && item.quantity >= mapping.quantity) {
                return { item, required: mapping };
              }
            }
            // Aucune alternative disponible, retourne la première pour l'affichage
            const firstMapping = groupMappings[0];
            const firstItem = items.find(i => i.id === firstMapping.itemId);
            if (firstItem) {
              return { item: firstItem, required: firstMapping };
            }
          }
        }
        
        // Aucun composant trouvé, retourne le premier mapping avec un item null
        const firstMapping = mappings[0];
        const item = items.find(i => i.id === firstMapping.itemId);
        if (item) {
          return { item, required: firstMapping };
        }
        
        return null;
      },
      
      hasComponentForSpell: (spellId) => {
        const { componentMapping, items } = get();
        
        // Récupère tous les composants pour ce sort
        const mappings = componentMapping.filter(m => m.spellId === spellId);
        
        if (mappings.length === 0) return true; // Pas de composante requise
        
        // Regroupe les composants par groupe d'alternatives
        const groups = new Map<string | undefined, SpellComponentMapping[]>();
        mappings.forEach(m => {
          const groupId = m.alternativeGroupId;
          if (!groups.has(groupId)) {
            groups.set(groupId, []);
          }
          groups.get(groupId)!.push(m);
        });
        
        // Vérifie chaque groupe
        for (const [groupId, groupMappings] of groups) {
          if (groupId === undefined) {
            // Composant requis (pas d'alternative)
            const mapping = groupMappings[0];
            const item = items.find(i => i.id === mapping.itemId);
            if (!item || item.quantity < mapping.quantity) {
              return false;
            }
          } else {
            // Groupe d'alternatives - au moins une doit être disponible
            const hasAlternative = groupMappings.some(mapping => {
              const item = items.find(i => i.id === mapping.itemId);
              return item && item.quantity >= mapping.quantity;
            });
            if (!hasAlternative) {
              return false;
            }
          }
        }
        
        return true;
      },
      
      getMissingComponents: () => {
        const { componentMapping, items } = get();
        const missing: { spellId: string; spellName: string; itemName: string; required: number; has: number }[] = [];
        
        // Regroupe les composants par sort et par groupe d'alternatives
        const spellGroups = new Map<string, Map<string | undefined, SpellComponentMapping[]>>();
        
        componentMapping.forEach(mapping => {
          if (!spellGroups.has(mapping.spellId)) {
            spellGroups.set(mapping.spellId, new Map());
          }
          const spellGroup = spellGroups.get(mapping.spellId)!;
          const groupId = mapping.alternativeGroupId;
          
          if (!spellGroup.has(groupId)) {
            spellGroup.set(groupId, []);
          }
          spellGroup.get(groupId)!.push(mapping);
        });
        
        // Vérifie chaque groupe pour chaque sort
        for (const [spellId, groups] of spellGroups) {
          for (const [groupId, groupMappings] of groups) {
            if (groupId === undefined) {
              // Composant requis (pas d'alternative)
              const mapping = groupMappings[0];
              const item = items.find(i => i.id === mapping.itemId);
              const hasQty = item ? item.quantity : 0;
              
              if (hasQty < mapping.quantity) {
                missing.push({
                  spellId: mapping.spellId,
                  spellName: mapping.spellName,
                  itemName: item?.name || mapping.itemName,
                  required: mapping.quantity,
                  has: hasQty,
                });
              }
            } else {
              // Groupe d'alternatives - vérifie si au moins une est disponible
              const hasAlternative = groupMappings.some(mapping => {
                const item = items.find(i => i.id === mapping.itemId);
                return item && item.quantity >= mapping.quantity;
              });
              
              // Si aucune alternative n'est disponible, ajoute toutes les alternatives comme manquantes
              if (!hasAlternative) {
                groupMappings.forEach(mapping => {
                  const item = items.find(i => i.id === mapping.itemId);
                  const hasQty = item ? item.quantity : 0;
                  
                  missing.push({
                    spellId: mapping.spellId,
                    spellName: mapping.spellName,
                    itemName: item?.name || mapping.itemName,
                    required: mapping.quantity,
                    has: hasQty,
                  });
                });
              }
            }
          }
        }
        
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
          .filter(item => item.isCarried && item.type !== 'Monture' && !item.isAtCamp)
          .reduce((sum, item) => sum + (item.totalWeight || 0), 0);
      },
      
      toggleAtCamp: (itemId: string) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, isAtCamp: !item.isAtCamp } : item
          ),
        }));
      },
      
      takeAllFromCamp: () => {
        set((state) => ({
          items: state.items.map((item) =>
            item.isAtCamp ? { ...item, isAtCamp: false } : item
          ),
        }));
      },
      
      getCampItems: () => {
        return get().items.filter((item) => item.isAtCamp);
      },
    }),
    {
      name: STORAGE_KEYS.INVENTORY,
      version: 10, // Ajout système "Au camp"
      migrate: (persistedState: unknown, version) => {
        // Force reset - on recharge tout depuis les données sources
        return { items: [] } as unknown as InventoryState;
      },
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
);

// Fonction utilitaire pour déterminer le slot par défaut d'un item
function getDefaultSlotForItem(item: EquipmentItem): EquipmentSlot | undefined {
  switch (item.type) {
    case 'Armure':
      return 'body';
    case 'Bouclier':
      return 'off_hand';
    case 'Arme':
      return 'main_hand';
    default:
      return undefined;
  }
}
