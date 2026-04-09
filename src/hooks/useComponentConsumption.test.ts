import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useComponentConsumption } from './useComponentConsumption';
import { useShoppingListStore } from '@/stores/shoppingListStore';
import { useInventoryStore } from '@/stores/inventoryStore';

// Mocks
vi.mock('@/stores/shoppingListStore', () => ({
  useShoppingListStore: {
    getState: vi.fn(() => ({
      handleSpellCast: vi.fn(() => ({ success: true, consumed: [], missing: [], needsRestock: [] })),
      addNotification: vi.fn(),
      addComponentsForNewSpells: vi.fn(),
    })),
  },
}));

vi.mock('@/stores/inventoryStore', () => ({
  useInventoryStore: {
    getState: vi.fn(() => ({
      items: [],
      getItemById: vi.fn(() => null),
    })),
  },
}));

describe('useComponentConsumption', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('consumeComponentsForSpell', () => {
    it('should return success when components are available', () => {
      const mockHandleSpellCast = vi.fn(() => ({ 
        success: true, 
        consumed: [{ itemId: 'diamants-300po', quantity: 1 }], 
        missing: [], 
        needsRestock: [] 
      }));
      
      const mockGetItemById = vi.fn((id: string) => ({ 
        id, 
        name: 'Diamants (300 po)', 
        quantity: 5 
      }));

      vi.mocked(useShoppingListStore.getState).mockReturnValue({
        handleSpellCast: mockHandleSpellCast,
        addNotification: vi.fn(),
        addComponentsForNewSpells: vi.fn(),
      } as unknown as ReturnType<typeof useShoppingListStore.getState>);

      vi.mocked(useInventoryStore.getState).mockReturnValue({
        items: [],
        getItemById: mockGetItemById,
      } as unknown as ReturnType<typeof useInventoryStore.getState>);

      const { result } = renderHook(() => useComponentConsumption());

      let consumptionResult;
      act(() => {
        consumptionResult = result.current.consumeComponentsForSpell('revivify');
      });

      expect(consumptionResult?.success).toBe(true);
      expect(consumptionResult?.consumed).toHaveLength(1);
      expect(consumptionResult?.consumed[0].name).toBe('Diamants (300 po)');
    });

    it('should return missing components when not available', () => {
      const mockHandleSpellCast = vi.fn(() => ({ 
        success: false, 
        consumed: [], 
        missing: [{ itemId: 'diamants-300po', required: 1, has: 0 }], 
        needsRestock: [] 
      }));
      
      const mockGetItemById = vi.fn((id: string) => ({ 
        id, 
        name: 'Diamants (300 po)', 
        quantity: 0 
      }));

      vi.mocked(useShoppingListStore.getState).mockReturnValue({
        handleSpellCast: mockHandleSpellCast,
        addNotification: vi.fn(),
        addComponentsForNewSpells: vi.fn(),
      } as unknown as ReturnType<typeof useShoppingListStore.getState>);

      vi.mocked(useInventoryStore.getState).mockReturnValue({
        items: [],
        getItemById: mockGetItemById,
      } as unknown as ReturnType<typeof useInventoryStore.getState>);

      const { result } = renderHook(() => useComponentConsumption());

      let consumptionResult;
      act(() => {
        consumptionResult = result.current.consumeComponentsForSpell('revivify');
      });

      expect(consumptionResult?.success).toBe(false);
      expect(consumptionResult?.missing).toHaveLength(1);
      expect(consumptionResult?.missing[0].required).toBe(1);
    });
  });

  describe('checkComponentsForSpell', () => {
    it('should return available true when all consumed components are owned', () => {
      vi.mocked(useInventoryStore.getState).mockReturnValue({
        items: [{ id: 'diamants-300po', name: 'Diamants', quantity: 5 }],
        getItemById: vi.fn((id: string) => ({ id, name: 'Diamants', quantity: 5 })),
      } as unknown as ReturnType<typeof useInventoryStore.getState>);

      const { result } = renderHook(() => useComponentConsumption());

      let checkResult;
      act(() => {
        checkResult = result.current.checkComponentsForSpell('revivify');
      });

      expect(checkResult?.available).toBe(true);
      expect(checkResult?.missing).toHaveLength(0);
    });

    it('should return available false when consumed components are missing', () => {
      vi.mocked(useInventoryStore.getState).mockReturnValue({
        items: [],
        getItemById: vi.fn(() => null),
      } as unknown as ReturnType<typeof useInventoryStore.getState>);

      const { result } = renderHook(() => useComponentConsumption());

      let checkResult;
      act(() => {
        checkResult = result.current.checkComponentsForSpell('revivify');
      });

      expect(checkResult?.available).toBe(false);
      expect(checkResult?.missing.length).toBeGreaterThan(0);
    });
  });

  describe('checkComponentsForNewSpells', () => {
    it('should return detailed results for new spells', () => {
      vi.mocked(useInventoryStore.getState).mockReturnValue({
        items: [],
        getItemById: vi.fn(() => null),
      } as unknown as ReturnType<typeof useInventoryStore.getState>);

      const { result } = renderHook(() => useComponentConsumption());

      let checkResults;
      act(() => {
        checkResults = result.current.checkComponentsForNewSpells(['revivify'], 'cleric');
      });

      expect(checkResults).toBeDefined();
      expect(checkResults?.length).toBeGreaterThan(0);
      
      const revivifyResult = checkResults?.find(r => r.spellId === 'revivify');
      expect(revivifyResult).toBeDefined();
      expect(revivifyResult?.missing.length).toBeGreaterThan(0);
      expect(revivifyResult?.totalCost).toBeGreaterThan(0);
    });

    it('should categorize owned vs missing components', () => {
      vi.mocked(useInventoryStore.getState).mockReturnValue({
        items: [{ id: 'diamants-300po', name: 'Diamants', quantity: 1 }],
        getItemById: vi.fn((id: string) => 
          id === 'diamants-300po' 
            ? { id, name: 'Diamants', quantity: 1 }
            : null
        ),
      } as unknown as ReturnType<typeof useInventoryStore.getState>);

      const { result } = renderHook(() => useComponentConsumption());

      let checkResults;
      act(() => {
        checkResults = result.current.checkComponentsForNewSpells(['revivify'], 'cleric');
      });

      const revivifyResult = checkResults?.find(r => r.spellId === 'revivify');
      if (revivifyResult && revivifyResult.components.length > 1) {
        // Si plusieurs composants, certains peuvent être possédés et d'autres non
        expect(revivifyResult.owned.length + revivifyResult.missing.length).toBe(revivifyResult.components.length);
      }
    });
  });

  describe('detectMissingComponents', () => {
    it('should detect all missing components for given spells', () => {
      vi.mocked(useInventoryStore.getState).mockReturnValue({
        items: [],
        getItemById: vi.fn(() => null),
      } as unknown as ReturnType<typeof useInventoryStore.getState>);

      const { result } = renderHook(() => useComponentConsumption());

      let missing;
      act(() => {
        missing = result.current.detectMissingComponents(['revivify', 'esprits-gardiens']);
      });

      expect(missing).toBeDefined();
      expect(missing.length).toBeGreaterThan(0);
    });

    it('should not return owned components', () => {
      vi.mocked(useInventoryStore.getState).mockReturnValue({
        items: [{ id: 'diamants-300po', name: 'Diamants', quantity: 1 }],
        getItemById: vi.fn((id: string) => 
          id === 'diamants-300po' 
            ? { id, name: 'Diamants', quantity: 1 }
            : null
        ),
      } as unknown as ReturnType<typeof useInventoryStore.getState>);

      const { result } = renderHook(() => useComponentConsumption());

      let missing;
      act(() => {
        missing = result.current.detectMissingComponents(['revivify']);
      });

      const hasDiamants = missing?.some(m => m.itemId === 'diamants-300po');
      expect(hasDiamants).toBe(false);
    });
  });

  describe('calculateMissingComponentsCost', () => {
    it('should calculate total cost of missing components', () => {
      vi.mocked(useInventoryStore.getState).mockReturnValue({
        items: [],
        getItemById: vi.fn(() => null),
      } as unknown as ReturnType<typeof useInventoryStore.getState>);

      const { result } = renderHook(() => useComponentConsumption());

      let cost;
      act(() => {
        cost = result.current.calculateMissingComponentsCost(['revivify']);
      });

      expect(cost).toBeDefined();
      expect(cost?.total).toBeGreaterThan(0);
      expect(cost?.byPriority).toBeDefined();
    });

    it('should categorize costs by priority', () => {
      vi.mocked(useInventoryStore.getState).mockReturnValue({
        items: [],
        getItemById: vi.fn(() => null),
      } as unknown as ReturnType<typeof useInventoryStore.getState>);

      const { result } = renderHook(() => useComponentConsumption());

      let cost;
      act(() => {
        cost = result.current.calculateMissingComponentsCost(['revivify']);
      });

      expect(cost?.byPriority.critical).toBeGreaterThanOrEqual(0);
      expect(cost?.byPriority.high).toBeGreaterThanOrEqual(0);
      expect(cost?.byPriority.medium).toBeGreaterThanOrEqual(0);
      expect(cost?.byPriority.low).toBeGreaterThanOrEqual(0);
    });
  });

  describe('autoAddMissingComponents', () => {
    it('should add missing components to shopping list', () => {
      const mockAddComponents = vi.fn();
      const mockAddNotification = vi.fn();

      vi.mocked(useShoppingListStore.getState).mockReturnValue({
        handleSpellCast: vi.fn(),
        addNotification: mockAddNotification,
        addComponentsForNewSpells: mockAddComponents,
      } as unknown as ReturnType<typeof useShoppingListStore.getState>);

      vi.mocked(useInventoryStore.getState).mockReturnValue({
        items: [],
        getItemById: vi.fn(() => null),
      } as unknown as ReturnType<typeof useInventoryStore.getState>);

      const { result } = renderHook(() => useComponentConsumption());

      act(() => {
        result.current.autoAddMissingComponents(['revivify'], 'cleric');
      });

      expect(mockAddComponents).toHaveBeenCalled();
      expect(mockAddNotification).toHaveBeenCalled();
    });

    it('should not add notification when no missing components', () => {
      const mockAddComponents = vi.fn();
      const mockAddNotification = vi.fn();

      vi.mocked(useShoppingListStore.getState).mockReturnValue({
        handleSpellCast: vi.fn(),
        addNotification: mockAddNotification,
        addComponentsForNewSpells: mockAddComponents,
      } as unknown as ReturnType<typeof useShoppingListStore.getState>);

      // Simule que tous les composants sont possédés
      vi.mocked(useInventoryStore.getState).mockReturnValue({
        items: [
          { id: 'diamants-300po', name: 'Diamants', quantity: 5 },
          { id: 'diamants-500po', name: 'Diamants 500', quantity: 5 },
          { id: 'diamants-1000po', name: 'Diamants 1000', quantity: 5 },
          { id: 'diamants-25000po', name: 'Diamants 25000', quantity: 5 },
          { id: 'eau-bénite', name: 'Eau bénite', quantity: 5 },
          { id: 'encens', name: 'Encens', quantity: 5 },
          { id: 'poudre-de-diamant', name: 'Poudre', quantity: 5 },
          { id: 'poudre-diamant-200po', name: 'Poudre 200', quantity: 5 },
          { id: 'poudre-diamant-1000po', name: 'Poudre 1000', quantity: 5 },
          { id: 'poudre-diamant-1500po', name: 'Poudre 1500', quantity: 5 },
          { id: 'poudre-diamant-2000po', name: 'Poudre 2000', quantity: 5 },
          { id: 'poudre-diamant-25000po', name: 'Poudre 25000', quantity: 5 },
          { id: 'poudre-perle', name: 'Poudre perle', quantity: 5 },
          { id: 'symbole-sacre', name: 'Symbole', quantity: 5 },
          { id: 'filament-cuivre', name: 'Filament', quantity: 5 },
          { id: 'liege', name: 'Liège', quantity: 5 },
          { id: 'batonnets-encrates', name: 'Bâtonnets', quantity: 5 },
          { id: 'composants-morbides', name: 'Morbides', quantity: 5 },
          { id: 'focale', name: 'Focale', quantity: 5 },
          { id: 'eau-bénite-ou-poudre-argent', name: 'Eau/Argent', quantity: 5 },
          { id: 'figurine-cire', name: 'Figurine', quantity: 5 },
          { id: 'encens-brulant', name: 'Encens brûlant', quantity: 5 },
          { id: 'deux-aimants', name: 'Aimants', quantity: 5 },
          { id: 'cape-miniature', name: 'Cape', quantity: 5 },
          { id: 'feuille-d-if', name: 'Feuille', quantity: 5 },
          { id: 'miroir-argent', name: 'Miroir', quantity: 5 },
          { id: 'bout-vetement-blanc', name: 'Vêtement', quantity: 5 },
          { id: 'poil-plume-bete', name: 'Poil/Plume', quantity: 5 },
          { id: 'fer-droit', name: 'Fer', quantity: 5 },
          { id: 'anneaux-platine', name: 'Anneaux', quantity: 5 },
          { id: 'brindille-sourcier', name: 'Brindille', quantity: 5 },
          { id: 'sel-cuivre', name: 'Sel/Cuivre', quantity: 5 },
        ],
        getItemById: vi.fn((id: string) => ({ id, name: id, quantity: 5 })),
      } as unknown as ReturnType<typeof useInventoryStore.getState>);

      const { result } = renderHook(() => useComponentConsumption());

      act(() => {
        result.current.autoAddMissingComponents(['revivify'], 'cleric');
      });

      // Si pas de composants manquants, pas de notification
      expect(mockAddNotification).not.toHaveBeenCalled();
    });
  });
});
