import { describe, it, expect, beforeEach } from 'vitest';
import { useCharacterStore } from './characterStore';

describe('characterStore', () => {
  beforeEach(() => {
    // Reset to default state by reinitializing the store
    const store = useCharacterStore.getState();
    // Access the persisted state reset
    store.longRest?.();
  });

  describe('calculateModifier', () => {
    it('should calculate modifier correctly', () => {
      const store = useCharacterStore.getState();
      
      expect(store.getModifier(10)).toBe(0);
      expect(store.getModifier(12)).toBe(1);
      expect(store.getModifier(8)).toBe(-1);
      expect(store.getModifier(16)).toBe(3);
      expect(store.getModifier(20)).toBe(5);
    });

    it('should handle undefined', () => {
      const store = useCharacterStore.getState();
      expect(store.getModifier(undefined)).toBe(0);
    });
  });

  describe('getProficiencyBonus', () => {
    it('should return correct proficiency bonus for level 1', () => {
      const store = useCharacterStore.getState();
      store.setLevel(1);
      expect(store.getProficiencyBonus()).toBe(2);
    });

    it('should return correct proficiency bonus for level 5', () => {
      const store = useCharacterStore.getState();
      store.setLevel(5);
      expect(store.getProficiencyBonus()).toBe(3);
    });

    it('should return correct proficiency bonus for level 17', () => {
      const store = useCharacterStore.getState();
      store.setLevel(17);
      expect(store.getProficiencyBonus()).toBe(6);
    });
  });

  describe('getMaxPreparedSpells', () => {
    it('should calculate max prepared spells correctly', () => {
      const store = useCharacterStore.getState();
      store.setWisdom(16); // +3 modifier
      store.setLevel(5);
      
      expect(store.getMaxPreparedSpells()).toBe(8); // 5 + 3
    });
  });

  describe('takeDamage and heal', () => {
    it('should reduce HP when taking damage', () => {
      const store = useCharacterStore.getState();
      const initialHp = store.character.currentHp;
      
      store.takeDamage(10);
      
      expect(store.character.currentHp).toBe(initialHp - 10);
    });

    it('should not go below 0 when taking damage', () => {
      const store = useCharacterStore.getState();
      const maxHp = store.character.maxHp;
      
      store.takeDamage(maxHp + 100);
      
      expect(store.character.currentHp).toBe(0);
    });

    it('should increase HP when healing', () => {
      const store = useCharacterStore.getState();
      store.takeDamage(20);
      const currentHp = store.character.currentHp;
      
      store.heal(10);
      
      expect(store.character.currentHp).toBe(currentHp + 10);
    });

    it('should not exceed max HP when healing', () => {
      const store = useCharacterStore.getState();
      const maxHp = store.character.maxHp;
      
      store.heal(1000);
      
      expect(store.character.currentHp).toBe(maxHp);
    });
  });

  describe('useWarCleric', () => {
    it('should consume war cleric use', () => {
      const store = useCharacterStore.getState();
      const initialUses = store.character.abilities.warCleric.currentUses;
      
      store.useWarCleric();
      
      expect(store.character.abilities.warCleric.currentUses).toBe(initialUses - 1);
    });

    it('should not consume if no uses left', () => {
      const store = useCharacterStore.getState();
      // Use all charges
      while (store.character.abilities.warCleric.currentUses > 0) {
        store.useWarCleric();
      }
      
      const result = store.useWarCleric();
      
      expect(result).toBe(false);
      expect(store.character.abilities.warCleric.currentUses).toBe(0);
    });
  });

  describe('useChannelDivinity', () => {
    it('should consume channel divinity use', () => {
      const store = useCharacterStore.getState();
      const initialUses = store.character.abilities.channelDivinity.currentUses;
      
      store.useChannelDivinity();
      
      expect(store.character.abilities.channelDivinity.currentUses).toBe(initialUses - 1);
    });
  });

  describe('toggleSkill', () => {
    it('should add skill if not mastered', () => {
      const store = useCharacterStore.getState();
      store.toggleSkill('perception');
      
      expect(store.character.masteredSkills).toContain('perception');
    });

    it('should remove skill if already mastered', () => {
      const store = useCharacterStore.getState();
      store.toggleSkill('perception');
      store.toggleSkill('perception');
      
      expect(store.character.masteredSkills).not.toContain('perception');
    });
  });

  describe('getCarryingCapacity', () => {
    it('should calculate carrying capacity based on strength', () => {
      const store = useCharacterStore.getState();
      store.setStrength(14);
      
      expect(store.getCarryingCapacity()).toBe(105); // 14 * 7.5
    });
  });

  describe('getEncumbranceLevel', () => {
    it('should return light for weight under capacity', () => {
      const store = useCharacterStore.getState();
      store.setStrength(10);
      
      expect(store.getEncumbranceLevel(50)).toBe('light'); // under 75
    });

    it('should return medium for weight over 1x capacity', () => {
      const store = useCharacterStore.getState();
      store.setStrength(10);
      
      expect(store.getEncumbranceLevel(100)).toBe('medium'); // over 75, under 150
    });

    it('should return heavy for weight over 2x capacity', () => {
      const store = useCharacterStore.getState();
      store.setStrength(10);
      
      expect(store.getEncumbranceLevel(180)).toBe('heavy'); // over 150, under 225
    });

    it('should return over for weight over 3x capacity', () => {
      const store = useCharacterStore.getState();
      store.setStrength(10);
      
      expect(store.getEncumbranceLevel(250)).toBe('over'); // over 225
    });
  });

  describe('longRest', () => {
    it('should restore HP to max', () => {
      const store = useCharacterStore.getState();
      store.takeDamage(20);
      
      store.longRest();
      
      expect(store.character.currentHp).toBe(store.character.maxHp);
    });

    it('should restore war cleric uses', () => {
      const store = useCharacterStore.getState();
      store.useWarCleric();
      const maxUses = store.character.abilities.warCleric.maxUses;
      
      store.longRest();
      
      expect(store.character.abilities.warCleric.currentUses).toBe(maxUses);
    });

    it('should restore channel divinity uses', () => {
      const store = useCharacterStore.getState();
      store.useChannelDivinity();
      const maxUses = store.character.abilities.channelDivinity.maxUses;
      
      store.longRest();
      
      expect(store.character.abilities.channelDivinity.currentUses).toBe(maxUses);
    });
  });

  describe('shortRest', () => {
    it('should restore channel divinity uses', () => {
      const store = useCharacterStore.getState();
      store.useChannelDivinity();
      const maxUses = store.character.abilities.channelDivinity.maxUses;
      
      store.shortRest();
      
      expect(store.character.abilities.channelDivinity.currentUses).toBe(maxUses);
    });
  });
});
