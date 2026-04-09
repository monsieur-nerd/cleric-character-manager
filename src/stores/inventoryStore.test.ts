import { describe, it, expect, beforeEach } from 'vitest';
import { useInventoryStore } from './inventoryStore';
import type { EquipmentItem } from '@/types';

describe('inventoryStore', () => {
  const createTestItem = (overrides: Partial<EquipmentItem> = {}): EquipmentItem => ({
    id: 'test-item',
    name: 'Test Item',
    type: 'Arme',
    description: 'A test item',
    quantity: 1,
    unitPrice: 10,
    totalPrice: 10,
    unitWeight: 2,
    totalWeight: 2,
    isCarried: true,
    isEquipped: false,
    ...overrides,
  });

  beforeEach(() => {
    useInventoryStore.setState({ items: [], componentMapping: [] });
  });

  describe('attunement', () => {
    it('should attune an item', () => {
      const store = useInventoryStore.getState();
      const item = createTestItem({
        id: 'magic-item',
        attunement: { required: true, isAttuned: false },
      });
      useInventoryStore.setState({ items: [item] });
      
      const result = store.attuneItem('magic-item');
      
      expect(result.success).toBe(true);
      expect(store.getAttunedCount()).toBe(1);
    });

    it('should fail when max attuned items reached', () => {
      const store = useInventoryStore.getState();
      const items = [
        createTestItem({ id: 'item1', attunement: { required: true, isAttuned: true } }),
        createTestItem({ id: 'item2', attunement: { required: true, isAttuned: true } }),
        createTestItem({ id: 'item3', attunement: { required: true, isAttuned: true } }),
        createTestItem({ id: 'item4', attunement: { required: true, isAttuned: false } }),
      ];
      useInventoryStore.setState({ items });
      
      const result = store.attuneItem('item4');
      
      expect(result.success).toBe(false);
    });
  });

  describe('charges', () => {
    it('should use a charge', () => {
      const store = useInventoryStore.getState();
      const item = createTestItem({
        id: 'charged-item',
        charges: { current: 3, max: 5, recharge: 'dawn' },
      });
      useInventoryStore.setState({ items: [item] });
      
      const result = store.useCharge('charged-item', 1);
      
      expect(result.success).toBe(true);
      expect(store.getItemById('charged-item')?.charges?.current).toBe(2);
    });

    it('should fail to use charge when empty', () => {
      const store = useInventoryStore.getState();
      const item = createTestItem({
        id: 'empty-item',
        charges: { current: 0, max: 3, recharge: 'dawn' },
      });
      useInventoryStore.setState({ items: [item] });
      
      const result = store.useCharge('empty-item', 1);
      
      expect(result.success).toBe(false);
    });

    it('should recharge an item', () => {
      const store = useInventoryStore.getState();
      const item = createTestItem({
        id: 'low-item',
        charges: { current: 1, max: 5, recharge: 'long_rest' },
      });
      useInventoryStore.setState({ items: [item] });
      
      store.rechargeItem('low-item');
      
      expect(store.getItemById('low-item')?.charges?.current).toBe(5);
    });
  });

  describe('light sources', () => {
    it('should consume fuel', () => {
      const store = useInventoryStore.getState();
      const item = createTestItem({
        id: 'torch',
        lightSource: { 
          brightLightRadius: 6, 
          dimLightRadius: 12, 
          requiresHand: true,
          fuelDuration: 1,
          fuelRemaining: 1
        },
      });
      useInventoryStore.setState({ items: [item] });
      
      store.consumeFuel('torch', 0.5);
      
      expect(store.getItemById('torch')?.lightSource?.fuelRemaining).toBe(0.5);
    });

    it('should refill fuel', () => {
      const store = useInventoryStore.getState();
      const item = createTestItem({
        id: 'lantern',
        lightSource: { 
          brightLightRadius: 9, 
          dimLightRadius: 18, 
          requiresHand: true,
          fuelDuration: 6,
          fuelRemaining: 2
        },
      });
      useInventoryStore.setState({ items: [item] });
      
      store.refillFuel('lantern', 3);
      
      expect(store.getItemById('lantern')?.lightSource?.fuelRemaining).toBe(5);
    });
  });
});
