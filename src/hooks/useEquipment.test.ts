import { describe, it, expect, beforeEach } from 'vitest';
import { useInventoryStore } from '@/stores';
import { useCharacterStore } from '@/stores';

describe('useEquipment', () => {
  beforeEach(() => {
    useInventoryStore.setState({ items: [], componentMapping: [] });
  });

  it('should work with empty items', () => {
    const store = useInventoryStore.getState();
    expect(store.getEquippedItems()).toEqual([]);
    expect(store.getEquippedArmor()).toBeUndefined();
    expect(store.getEquippedShield()).toBeUndefined();
  });

  it('should handle light sources', () => {
    const store = useInventoryStore.getState();
    store.loadItems([
      {
        id: 'torch',
        name: 'Torche',
        type: 'Eclairage',
        description: 'Une torche',
        quantity: 1,
        unitPrice: 0.01,
        totalPrice: 0.01,
        unitWeight: 0.5,
        totalWeight: 0.5,
        isCarried: true,
        isEquipped: true,
        lightSource: {
          brightLightRadius: 6,
          dimLightRadius: 12,
          requiresHand: true,
          fuelDuration: 1,
          fuelRemaining: 0.5,
        },
      },
    ]);
    
    const lightSources = store.getActiveLightSources();
    expect(lightSources.length).toBe(1);
    expect(lightSources[0].id).toBe('torch');
  });

  it('should handle vision effects', () => {
    const store = useInventoryStore.getState();
    store.loadItems([
      {
        id: 'goggles',
        name: 'Lunettes de vision nocturne',
        type: 'Equipement aventure',
        description: 'Des lunettes magiques',
        quantity: 1,
        unitPrice: 100,
        totalPrice: 100,
        unitWeight: 0.5,
        totalWeight: 0.5,
        isCarried: true,
        isEquipped: true,
        visionEffect: {
          darkvision: 18,
          isActive: true,
        },
      },
    ]);
    
    const visionEffects = store.getActiveVisionEffects();
    expect(visionEffects.length).toBe(1);
    expect(visionEffects[0].visionEffect?.darkvision).toBe(18);
  });
});
