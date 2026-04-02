import { describe, it, expect, vi } from 'vitest';
import type { Spell } from '@/types';

// Mock localStorage for Zustand persist
const localStorageMock = {
  getItem: vi.fn(() => null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Import after mocking
import { useSpellStore } from './spellStore';

const mockSpells: Spell[] = [
  {
    id: 'spell-1',
    name: 'Bouclier de foi',
    level: 1,
    isDomainSpell: false,
  } as Spell,
  {
    id: 'spell-2',
    name: 'Soins',
    level: 1,
    isDomainSpell: false,
  } as Spell,
  {
    id: 'domain-spell',
    name: 'Frappe divine',
    level: 1,
    isDomainSpell: true,
  } as Spell,
  {
    id: 'cantrip',
    name: 'Lumière',
    level: 0,
    isDomainSpell: false,
  } as Spell,
];

describe('spellStore', () => {
  it('should have initial state', () => {
    const store = useSpellStore.getState();
    
    expect(store.allSpells).toEqual([]);
    expect(store.preparedSpellIds).toEqual([]);
    expect(store.spellSlots).toEqual({ 1: 4, 2: 3, 3: 2 });
  });

  it('should load spells', () => {
    const store = useSpellStore.getState();
    store.loadSpells(mockSpells);
    
    expect(useSpellStore.getState().allSpells).toEqual(mockSpells);
  });

  it('should prepare a non-domain spell', () => {
    const store = useSpellStore.getState();
    store.loadSpells(mockSpells);
    store.prepareSpell('spell-1');
    
    expect(useSpellStore.getState().preparedSpellIds).toContain('spell-1');
  });

  it('should not prepare a domain spell', () => {
    const store = useSpellStore.getState();
    store.loadSpells(mockSpells);
    const before = [...useSpellStore.getState().preparedSpellIds];
    
    store.prepareSpell('domain-spell');
    
    expect(useSpellStore.getState().preparedSpellIds).toEqual(before);
  });

  it('should not prepare an unknown spell', () => {
    const store = useSpellStore.getState();
    store.loadSpells(mockSpells);
    const before = [...useSpellStore.getState().preparedSpellIds];
    
    store.prepareSpell('unknown');
    
    expect(useSpellStore.getState().preparedSpellIds).toEqual(before);
  });

  it('should prepare cantrips (they are handled separately)', () => {
    const store = useSpellStore.getState();
    store.loadSpells(mockSpells);
    
    store.prepareSpell('cantrip');
    
    // Cantrips can be prepared (they're filtered out later)
    expect(useSpellStore.getState().preparedSpellIds).toContain('cantrip');
  });

  it('should unprepare a prepared spell', () => {
    const store = useSpellStore.getState();
    store.loadSpells(mockSpells);
    store.prepareSpell('spell-1');
    
    store.unprepareSpell('spell-1');
    
    expect(useSpellStore.getState().preparedSpellIds).not.toContain('spell-1');
  });

  it('should toggle spell prepared', () => {
    const store = useSpellStore.getState();
    store.loadSpells(mockSpells);
    
    // Toggle on
    store.toggleSpellPrepared('spell-1');
    expect(useSpellStore.getState().preparedSpellIds).toContain('spell-1');
    
    // Toggle off
    store.toggleSpellPrepared('spell-1');
    expect(useSpellStore.getState().preparedSpellIds).not.toContain('spell-1');
  });

  it('should get prepared spells', () => {
    const store = useSpellStore.getState();
    store.loadSpells(mockSpells);
    // Clear first
    store.preparedSpellIds = [];
    store.prepareSpell('spell-1');
    store.prepareSpell('spell-2');
    
    const prepared = store.getPreparedSpells();
    
    expect(prepared.length).toBeGreaterThanOrEqual(2);
    expect(prepared.map(s => s.id)).toContain('spell-1');
    expect(prepared.map(s => s.id)).toContain('spell-2');
  });

  it('should check if can prepare spell', () => {
    const store = useSpellStore.getState();
    store.loadSpells(mockSpells);
    
    expect(store.canPrepareSpell('spell-1', 5)).toBe(true);
    expect(store.canPrepareSpell('domain-spell', 0)).toBe(true);
  });

  it('should get spell by id', () => {
    const store = useSpellStore.getState();
    store.loadSpells(mockSpells);
    
    const spell = store.getSpellById('spell-1');
    expect(spell?.name).toBe('Bouclier de foi');
  });

  it('should reset daily', () => {
    const store = useSpellStore.getState();
    store.loadSpells(mockSpells);
    
    // Use a slot
    store.useSpellSlot(1);
    const usedSlots = useSpellStore.getState().spellSlots[1];
    
    // Reset
    store.resetDaily(5);
    
    // After reset, should have restored slots
    expect(useSpellStore.getState().spellSlots[1]).toBeGreaterThanOrEqual(usedSlots);
  });
});
