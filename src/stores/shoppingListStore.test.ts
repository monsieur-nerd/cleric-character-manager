import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useShoppingListStore } from './shoppingListStore';
import { useInventoryStore } from './inventoryStore';
import type { SpellComponentMapping } from '@/types';

// Mock de l'inventaire
vi.mock('./inventoryStore', () => ({
  useInventoryStore: {
    getState: vi.fn(() => ({
      items: [],
      getItemById: vi.fn(() => null),
      updateQuantity: vi.fn(),
      addItem: vi.fn(),
    })),
  },
}));

describe('shoppingListStore', () => {
  beforeEach(() => {
    // Reset le store avant chaque test
    const store = useShoppingListStore.getState();
    store.shoppingItems = [];
    store.notifications = [];
    store.multiclassConfig = null;
  });

  describe('addToShoppingList', () => {
    it('should add a new item to the shopping list', () => {
      const store = useShoppingListStore.getState();
      
      store.addToShoppingList({
        itemId: 'test-item',
        priority: 'medium',
        category: 'component',
        quantityIdeal: 3,
        quantityToBuy: 1,
        autoAdded: false,
      });

      expect(store.shoppingItems).toHaveLength(1);
      expect(store.shoppingItems[0].itemId).toBe('test-item');
      expect(store.shoppingItems[0].priority).toBe('medium');
    });

    it('should update existing item instead of duplicating', () => {
      const store = useShoppingListStore.getState();
      
      store.addToShoppingList({
        itemId: 'test-item',
        priority: 'medium',
        category: 'component',
        quantityIdeal: 3,
        quantityToBuy: 1,
        autoAdded: false,
      });

      store.addToShoppingList({
        itemId: 'test-item',
        priority: 'high',
        category: 'component',
        quantityIdeal: 5,
        quantityToBuy: 2,
        autoAdded: false,
      });

      expect(store.shoppingItems).toHaveLength(1);
      expect(store.shoppingItems[0].priority).toBe('high');
      expect(store.shoppingItems[0].quantityIdeal).toBe(5);
    });
  });

  describe('removeFromShoppingList', () => {
    it('should remove an item from the shopping list', () => {
      const store = useShoppingListStore.getState();
      
      store.addToShoppingList({
        itemId: 'test-item',
        priority: 'medium',
        category: 'component',
        quantityIdeal: 3,
        quantityToBuy: 1,
        autoAdded: false,
      });

      store.removeFromShoppingList('test-item');

      expect(store.shoppingItems).toHaveLength(0);
    });
  });

  describe('addComponentForSpell', () => {
    it('should add a reusable focus component for a spell', () => {
      const store = useShoppingListStore.getState();
      
      store.addComponentForSpell(
        'bless',
        'Bénédiction',
        'eau-bénite',
        'Eau bénite',
        false,
        'high',
        'cleric'
      );

      expect(store.shoppingItems).toHaveLength(1);
      expect(store.shoppingItems[0].itemId).toBe('eau-bénite');
      expect(store.shoppingItems[0].componentType).toBe('reusable_focus');
      expect(store.shoppingItems[0].classSource).toBe('cleric');
    });

    it('should add a consumed component for a spell', () => {
      const store = useShoppingListStore.getState();
      
      store.addComponentForSpell(
        'revivify',
        'Retour à la vie',
        'diamants-300po',
        'Diamants (300 po)',
        true,
        'critical',
        'cleric'
      );

      expect(store.shoppingItems).toHaveLength(1);
      expect(store.shoppingItems[0].itemId).toBe('diamants-300po');
      expect(store.shoppingItems[0].componentType).toBe('consumed_per_cast');
      expect(store.shoppingItems[0].quantityIdeal).toBe(3); // Les consommables ont quantityIdeal = 3
    });

    it('should add multiple spells to same component', () => {
      const store = useShoppingListStore.getState();
      
      store.addComponentForSpell(
        'revivify',
        'Retour à la vie',
        'diamants-300po',
        'Diamants (300 po)',
        true,
        'critical',
        'cleric'
      );

      store.addComponentForSpell(
        'raise-dead',
        'Rappel à la vie',
        'diamants-300po',
        'Diamants (300 po)',
        true,
        'critical',
        'cleric'
      );

      expect(store.shoppingItems).toHaveLength(1);
      expect(store.shoppingItems[0].relatedSpells).toHaveLength(2);
    });
  });

  describe('purchaseItem - reusable components', () => {
    it('should remove reusable component from list after purchase', () => {
      const store = useShoppingListStore.getState();
      
      store.addToShoppingList({
        itemId: 'symbole-sacre',
        priority: 'high',
        category: 'component',
        componentType: 'reusable_focus',
        quantityIdeal: 1,
        quantityToBuy: 1,
        autoAdded: false,
      });

      const result = store.purchaseItem('symbole-sacre', 1);

      expect(result.success).toBe(true);
      // Les composants réutilisables sont retirés de la liste après achat
      expect(store.shoppingItems).toHaveLength(0);
    });
  });

  describe('purchaseItem - consumed components', () => {
    it('should keep consumed component in list after purchase', () => {
      const store = useShoppingListStore.getState();
      
      store.addToShoppingList({
        itemId: 'diamants-300po',
        priority: 'critical',
        category: 'component',
        componentType: 'consumed_per_cast',
        quantityIdeal: 3,
        quantityToBuy: 2,
        autoAdded: false,
      });

      const result = store.purchaseItem('diamants-300po', 2);

      expect(result.success).toBe(true);
      // Les composants consommables restent dans la liste
      expect(store.shoppingItems).toHaveLength(1);
      expect(store.shoppingItems[0].quantityToBuy).toBe(0); // Quantité réinitialisée
    });
  });

  describe('detectComponentNeeds', () => {
    it('should detect missing components for spells', () => {
      const store = useShoppingListStore.getState();
      
      const spellIds = ['revivify', 'esprits-gardiens'];
      const ownedItemIds: string[] = []; // Aucun composant possédé

      const missing = store.detectComponentNeeds(spellIds, ownedItemIds);

      // Devrait détecter les composants manquants
      expect(missing.length).toBeGreaterThan(0);
      // Vérifie que les composants critiques sont détectés
      const hasRevivifyComponent = missing.some(m => m.spellId === 'revivify');
      expect(hasRevivifyComponent).toBe(true);
    });

    it('should not return owned components', () => {
      const store = useShoppingListStore.getState();
      
      const spellIds = ['revivify', 'esprits-gardiens'];
      const ownedItemIds = ['diamants-300po']; // Possède déjà les diamants

      const missing = store.detectComponentNeeds(spellIds, ownedItemIds);

      // Ne devrait pas inclure les diamants
      const hasDiamants = missing.some(m => m.itemId === 'diamants-300po');
      expect(hasDiamants).toBe(false);
    });
  });

  describe('onCharacterLevelUp', () => {
    it('should detect new spells when cleric levels up', () => {
      const store = useShoppingListStore.getState();
      
      const knownSpellIds: string[] = [];
      const result = store.onCharacterLevelUp('cleric', 3, knownSpellIds);

      // Devrait détecter les sorts de niveau 1-3
      expect(result.newSpells.length).toBeGreaterThan(0);
      expect(result.newComponents.length).toBeGreaterThan(0);
    });

    it('should not return already known spells', () => {
      const store = useShoppingListStore.getState();
      
      const knownSpellIds = ['revivify'];
      const result = store.onCharacterLevelUp('cleric', 3, knownSpellIds);

      // Ne devrait pas inclure revivify
      const hasRevivify = result.newSpells.includes('revivify');
      expect(hasRevivify).toBe(false);
    });
  });

  describe('addComponentsForNewSpells', () => {
    it('should add components for new cleric spells', () => {
      const store = useShoppingListStore.getState();
      
      const newSpellIds = ['revivify'];
      store.addComponentsForNewSpells(newSpellIds, 'cleric');

      // Devrait ajouter le composant pour Retour à la vie
      const hasDiamants = store.shoppingItems.some(i => i.itemId === 'diamants-300po');
      expect(hasDiamants).toBe(true);
      
      // Vérifie la classe source
      const diamantsItem = store.shoppingItems.find(i => i.itemId === 'diamants-300po');
      expect(diamantsItem?.classSource).toBe('cleric');
    });

    it('should add components for wizard spells separately', () => {
      const store = useShoppingListStore.getState();
      
      const newSpellIds = ['identify'];
      store.addComponentsForNewSpells(newSpellIds, 'wizard');

      // Devrait ajouter le composant pour Identification
      const hasPearl = store.shoppingItems.some(i => i.itemId === 'perle-100po');
      expect(hasPearl).toBe(true);
      
      // Vérifie la classe source
      const pearlItem = store.shoppingItems.find(i => i.itemId === 'perle-100po');
      expect(pearlItem?.classSource).toBe('wizard');
    });
  });

  describe('getItemsByClassSource', () => {
    it('should filter items by cleric class', () => {
      const store = useShoppingListStore.getState();
      
      store.addToShoppingList({
        itemId: 'eau-bénite',
        priority: 'high',
        category: 'component',
        classSource: 'cleric',
        quantityIdeal: 1,
        quantityToBuy: 0,
        autoAdded: false,
      });

      store.addToShoppingList({
        itemId: 'perle-100po',
        priority: 'high',
        category: 'component',
        classSource: 'wizard',
        quantityIdeal: 1,
        quantityToBuy: 0,
        autoAdded: false,
      });

      const clericItems = store.getItemsByClassSource('cleric');
      expect(clericItems).toHaveLength(1);
      expect(clericItems[0].itemId).toBe('eau-bénite');
    });

    it('should return all items when filter is all', () => {
      const store = useShoppingListStore.getState();
      
      store.addToShoppingList({
        itemId: 'eau-bénite',
        priority: 'high',
        category: 'component',
        classSource: 'cleric',
        quantityIdeal: 1,
        quantityToBuy: 0,
        autoAdded: false,
      });

      store.addToShoppingList({
        itemId: 'perle-100po',
        priority: 'high',
        category: 'component',
        classSource: 'wizard',
        quantityIdeal: 1,
        quantityToBuy: 0,
        autoAdded: false,
      });

      const allItems = store.getItemsByClassSource('all');
      expect(allItems).toHaveLength(2);
    });
  });

  describe('getCriticalComponents', () => {
    it('should return consumed components with enabled restock', () => {
      const store = useShoppingListStore.getState();
      
      store.addToShoppingList({
        itemId: 'diamants-300po',
        priority: 'critical',
        category: 'component',
        componentType: 'consumed_per_cast',
        quantityIdeal: 3,
        quantityToBuy: 0,
        autoAdded: false,
        restockConfig: {
          enabled: true,
          minStock: 1,
          restockAmount: 2,
          autoAddToShoppingList: true,
        },
      });

      const criticalItems = store.getCriticalComponents();
      expect(criticalItems.length).toBeGreaterThan(0);
    });
  });

  describe('multiclass configuration', () => {
    it('should set multiclass config', () => {
      const store = useShoppingListStore.getState();
      
      const config = {
        classes: [
          { id: 'cleric' as const, name: 'Clerc', level: 5, spellcastingAbility: 'wisdom' as const },
          { id: 'wizard' as const, name: 'Mage', level: 3, spellcastingAbility: 'intelligence' as const },
        ],
        primaryClass: 'cleric' as const,
        totalLevel: 8,
        combinedSpellSlots: { 1: 4, 2: 3, 3: 3, 4: 2 },
        spellsByClass: {
          cleric: ['bless', 'cure-wounds'],
          wizard: ['magic-missile', 'shield'],
        },
      };

      store.setMulticlassConfig(config);
      
      expect(store.multiclassConfig).not.toBeNull();
      expect(store.multiclassConfig?.totalLevel).toBe(8);
      expect(store.multiclassConfig?.spellsByClass.cleric).toHaveLength(2);
      expect(store.multiclassConfig?.spellsByClass.wizard).toHaveLength(2);
    });

    it('should clear multiclass config', () => {
      const store = useShoppingListStore.getState();
      
      store.setMulticlassConfig(null);
      
      expect(store.multiclassConfig).toBeNull();
    });
  });

  describe('handleSpellCast', () => {
    it('should return needsRestock array after consumption', () => {
      const store = useShoppingListStore.getState();
      
      // Mock inventory avec assez de stock
      vi.mocked(useInventoryStore.getState).mockReturnValue({
        items: [{ id: 'diamants-300po', name: 'Diamants', quantity: 5 }],
        getItemById: (id: string) => ({ id, name: 'Diamants', quantity: 5 }),
        updateQuantity: vi.fn(),
        addItem: vi.fn(),
      } as unknown as ReturnType<typeof useInventoryStore.getState>);

      store.addToShoppingList({
        itemId: 'diamants-300po',
        priority: 'critical',
        category: 'component',
        componentType: 'consumed_per_cast',
        quantityIdeal: 3,
        quantityToBuy: 0,
        autoAdded: false,
        relatedSpells: [{ spellId: 'revivify', spellName: 'Retour à la vie', consumed: true }],
        restockConfig: {
          enabled: true,
          minStock: 1,
          restockAmount: 2,
          autoAddToShoppingList: true,
        },
      });

      const result = store.handleSpellCast('revivify');

      expect(result.needsRestock).toBeDefined();
      expect(Array.isArray(result.needsRestock)).toBe(true);
    });
  });
});
