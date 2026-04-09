/**
 * Hook pour la gestion de la consommation des composants de sorts
 * Gère la consommation lors des lancers de sorts et la détection des besoins
 */
import { useCallback } from 'react';
import { useShoppingListStore, useInventoryStore } from '@/stores';
import { getComponentsForSpell, getMissingComponents } from '@/data/spellComponentMappings';
import type { SpellComponentMapping } from '@/types';

export interface ConsumptionResult {
  success: boolean;
  consumed: { itemId: string; name: string; quantity: number }[];
  missing: { itemId: string; name: string; required: number; has: number }[];
  needsRestock: string[];
}

export interface NewSpellCheckResult {
  spellId: string;
  spellName: string;
  components: SpellComponentMapping[];
  owned: SpellComponentMapping[];
  missing: SpellComponentMapping[];
  totalCost: number;
}

export function useComponentConsumption() {
  const handleSpellCast = useShoppingListStore((state) => state.handleSpellCast);
  const addNotification = useShoppingListStore((state) => state.addNotification);
  const inventoryItems = useInventoryStore((state) => state.items);
  const getItemById = useInventoryStore((state) => state.getItemById);
  const addComponentsForNewSpells = useShoppingListStore((state) => state.addComponentsForNewSpells);

  /**
   * Consomme les composants pour un sort
   * @returns Résultat détaillé de la consommation
   */
  const consumeComponentsForSpell = useCallback((spellId: string): ConsumptionResult => {
    const result = handleSpellCast(spellId);
    
    // Enrichit le résultat avec les noms des items
    const consumed = result.consumed.map(c => {
      const item = getItemById(c.itemId);
      return {
        itemId: c.itemId,
        name: item?.name || c.itemId,
        quantity: c.quantity,
      };
    });
    
    const missing = result.missing.map(m => {
      const item = getItemById(m.itemId);
      return {
        itemId: m.itemId,
        name: item?.name || m.itemId,
        required: m.required,
        has: m.has,
      };
    });

    // Notification de succès/échec
    if (result.success) {
      if (consumed.length > 0) {
        addNotification({
          type: 'consumed',
          itemId: consumed[0].itemId,
          itemName: consumed[0].name,
          message: `Sort lancé ! ${consumed.map(c => c.name).join(', ')} consommé(s).`,
          read: false,
        });
      }
    } else {
      addNotification({
        type: 'out_of_stock',
        itemId: missing[0]?.itemId || '',
        itemName: missing[0]?.name || '',
        message: `Impossible de lancer le sort ! Composants manquants : ${missing.map(m => m.name).join(', ')}`,
        read: false,
      });
    }

    return {
      success: result.success,
      consumed,
      missing,
      needsRestock: result.needsRestock,
    };
  }, [handleSpellCast, getItemById, addNotification]);

  /**
   * Vérifie si les composants sont disponibles pour un sort (sans les consommer)
   */
  const checkComponentsForSpell = useCallback((spellId: string): {
    available: boolean;
    components: SpellComponentMapping[];
    missing: SpellComponentMapping[];
  } => {
    const components = getComponentsForSpell(spellId);
    const ownedItemIds = inventoryItems.map(i => i.id);
    
    const missing = components.filter(c => 
      c.consumed && !ownedItemIds.includes(c.itemId)
    );

    return {
      available: missing.length === 0,
      components,
      missing,
    };
  }, [inventoryItems]);

  /**
   * Vérifie les composants nécessaires pour de nouveaux sorts
   * Utilisé lors du level up ou de l'apprentissage de nouveaux sorts
   */
  const checkComponentsForNewSpells = useCallback((
    newSpellIds: string[],
    _classSource: 'cleric' | 'wizard'
  ): NewSpellCheckResult[] => {
    const ownedItemIds = inventoryItems.map(i => i.id);
    const results: NewSpellCheckResult[] = [];

    newSpellIds.forEach(spellId => {
      const components = getComponentsForSpell(spellId);
      if (components.length === 0) return;

      const owned = components.filter(c => ownedItemIds.includes(c.itemId));
      const missing = components.filter(c => !ownedItemIds.includes(c.itemId));
      const totalCost = missing.reduce((sum, c) => sum + c.price, 0);

      results.push({
        spellId,
        spellName: components[0].spellName,
        components,
        owned,
        missing,
        totalCost,
      });
    });

    return results;
  }, [inventoryItems]);

  /**
   * Détecte automatiquement les composants manquants pour une liste de sorts
   */
  const detectMissingComponents = useCallback((spellIds: string[]): SpellComponentMapping[] => {
    const ownedItemIds = inventoryItems.map(i => i.id);
    return getMissingComponents(spellIds, ownedItemIds);
  }, [inventoryItems]);

  /**
   * Ajoute automatiquement les composants manquants à la liste de courses
   */
  const autoAddMissingComponents = useCallback((spellIds: string[], classSource: 'cleric' | 'wizard') => {
    const missing = detectMissingComponents(spellIds);
    
    if (missing.length > 0) {
      // Groupe par sort
      const bySpell = new Map<string, SpellComponentMapping[]>();
      missing.forEach(comp => {
        const existing = bySpell.get(comp.spellId) || [];
        existing.push(comp);
        bySpell.set(comp.spellId, existing);
      });

      // Ajoute les composants
      addComponentsForNewSpells(spellIds, classSource);

      addNotification({
        type: 'component_needed',
        itemId: 'auto-detect',
        itemName: 'Composants détectés',
        message: `${missing.length} composant(s) manquant(s) ajouté(s) à la liste de courses`,
        read: false,
      });
    }

    return missing;
  }, [detectMissingComponents, addComponentsForNewSpells, addNotification]);

  /**
   * Calcule le coût total pour acheter tous les composants manquants
   */
  const calculateMissingComponentsCost = useCallback((spellIds: string[]): {
    total: number;
    byPriority: Record<string, number>;
  } => {
    const missing = detectMissingComponents(spellIds);
    const byPriority: Record<string, number> = {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      none: 0,
    };

    missing.forEach(comp => {
      byPriority[comp.priority] = (byPriority[comp.priority] || 0) + comp.price;
    });

    return {
      total: missing.reduce((sum, c) => sum + c.price, 0),
      byPriority,
    };
  }, [detectMissingComponents]);

  return {
    consumeComponentsForSpell,
    checkComponentsForSpell,
    checkComponentsForNewSpells,
    detectMissingComponents,
    autoAddMissingComponents,
    calculateMissingComponentsCost,
  };
}

export default useComponentConsumption;
