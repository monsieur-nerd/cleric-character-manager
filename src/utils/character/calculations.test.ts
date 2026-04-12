import { describe, it, expect } from 'vitest';
import {
  calculateModifier,
  calculateMaxHp,
  calculateCarryingCapacity,
  getEncumbranceLevel,
  calculateMaxPreparedSpells,
  calculateProficiencyBonus,
  calculateWarClericMaxUses,
  calculateChannelDivinityMaxUses,
  calculateSaveBonus,
  applyDamage,
  applyHealing,
  isConscious,
  isStable,
} from './calculations';

describe('calculateModifier', () => {
  it('returns 0 for undefined', () => {
    expect(calculateModifier(undefined)).toBe(0);
  });

  it('returns 0 for NaN', () => {
    expect(calculateModifier(NaN)).toBe(0);
  });

  it('calculates correct modifiers', () => {
    expect(calculateModifier(1)).toBe(-5);
    expect(calculateModifier(10)).toBe(0);
    expect(calculateModifier(12)).toBe(1);
    expect(calculateModifier(16)).toBe(3);
    expect(calculateModifier(20)).toBe(5);
    expect(calculateModifier(30)).toBe(10);
  });
});

describe('calculateMaxHp', () => {
  it('calculates level 1 correctly', () => {
    // Level 1: 8 + conMod
    expect(calculateMaxHp(1, 10, false)).toBe(8); // conMod = 0
    expect(calculateMaxHp(1, 14, false)).toBe(10); // conMod = 2
  });

  it('calculates higher levels correctly', () => {
    // Level 5, con 14 (mod +2): 10 + 4*(5+2) = 10 + 28 = 38
    expect(calculateMaxHp(5, 14, false)).toBe(38);
  });

  it('applies Tough feat bonus', () => {
    // Level 5, con 14, tough: 38 + 5*2 = 48
    expect(calculateMaxHp(5, 14, true)).toBe(48);
  });

  it('handles very low constitution', () => {
    // Level 1, con 1 (mod -5): max(1, 8 - 5) = 3
    expect(calculateMaxHp(1, 1, false)).toBe(3);
    // Level 2, con 1: 3 + max(1, 5-5) = 4
    expect(calculateMaxHp(2, 1, false)).toBe(4);
  });
});

describe('calculateCarryingCapacity', () => {
  it('calculates correctly', () => {
    expect(calculateCarryingCapacity(10)).toBe(75);
    expect(calculateCarryingCapacity(16)).toBe(120);
    expect(calculateCarryingCapacity(20)).toBe(150);
  });
});

describe('getEncumbranceLevel', () => {
  it('returns light for weight under 7.5x strength', () => {
    expect(getEncumbranceLevel(70, 10)).toBe('light'); // 70 < 75
  });

  it('returns medium for weight between 7.5x and 15x', () => {
    expect(getEncumbranceLevel(100, 10)).toBe('medium'); // 100 between 75-150
  });

  it('returns heavy for weight between 15x and 22.5x', () => {
    expect(getEncumbranceLevel(160, 10)).toBe('heavy'); // 160 between 150-225
  });

  it('returns over for weight above 22.5x', () => {
    expect(getEncumbranceLevel(250, 10)).toBe('over'); // 250 > 225
  });
});

describe('calculateMaxPreparedSpells', () => {
  it('calculates correctly', () => {
    expect(calculateMaxPreparedSpells(3, 5)).toBe(8); // mod +3, level 5
    expect(calculateMaxPreparedSpells(1, 10)).toBe(11);
  });
});

describe('calculateProficiencyBonus', () => {
  it('returns +2 for levels 1-4', () => {
    expect(calculateProficiencyBonus(1)).toBe(2);
    expect(calculateProficiencyBonus(4)).toBe(2);
  });

  it('returns +3 for levels 5-8', () => {
    expect(calculateProficiencyBonus(5)).toBe(3);
    expect(calculateProficiencyBonus(8)).toBe(3);
  });

  it('returns +4 for levels 9-12', () => {
    expect(calculateProficiencyBonus(9)).toBe(4);
    expect(calculateProficiencyBonus(12)).toBe(4);
  });

  it('returns +5 for levels 13-16', () => {
    expect(calculateProficiencyBonus(13)).toBe(5);
    expect(calculateProficiencyBonus(16)).toBe(5);
  });

  it('returns +6 for levels 17-20', () => {
    expect(calculateProficiencyBonus(17)).toBe(6);
    expect(calculateProficiencyBonus(20)).toBe(6);
  });

  it('handles invalid levels', () => {
    expect(calculateProficiencyBonus(0)).toBe(2);
    expect(calculateProficiencyBonus(-1)).toBe(2);
    expect(calculateProficiencyBonus(NaN)).toBe(2);
  });
});

describe('calculateWarClericMaxUses', () => {
  it('returns at least 1', () => {
    expect(calculateWarClericMaxUses(-1)).toBe(1);
    expect(calculateWarClericMaxUses(0)).toBe(1);
  });

  it('returns modifier when positive', () => {
    expect(calculateWarClericMaxUses(1)).toBe(1);
    expect(calculateWarClericMaxUses(3)).toBe(3);
    expect(calculateWarClericMaxUses(5)).toBe(5);
  });
});

describe('calculateChannelDivinityMaxUses', () => {
  it('returns 1 for levels 1-5', () => {
    expect(calculateChannelDivinityMaxUses(1)).toBe(1);
    expect(calculateChannelDivinityMaxUses(5)).toBe(1);
  });

  it('returns 2 for levels 6-17', () => {
    expect(calculateChannelDivinityMaxUses(6)).toBe(2);
    expect(calculateChannelDivinityMaxUses(17)).toBe(2);
  });

  it('returns 3 for levels 18+', () => {
    expect(calculateChannelDivinityMaxUses(18)).toBe(3);
    expect(calculateChannelDivinityMaxUses(20)).toBe(3);
  });
});

describe('calculateSaveBonus', () => {
  it('calculates non-proficient save', () => {
    const result = calculateSaveBonus(14, false, 3);
    expect(result.total).toBe(2); // mod +2
    expect(result.modifier).toBe(2);
    expect(result.proficiency).toBe(0);
    expect(result.isProficient).toBe(false);
  });

  it('calculates proficient save', () => {
    const result = calculateSaveBonus(14, true, 3);
    expect(result.total).toBe(5); // mod +2 + prof +3
    expect(result.modifier).toBe(2);
    expect(result.proficiency).toBe(3);
    expect(result.isProficient).toBe(true);
  });
});

describe('applyDamage', () => {
  it('applies damage to temp HP first', () => {
    const result = applyDamage(5, 20, 10);
    expect(result.newTempHp).toBe(5);
    expect(result.newHp).toBe(20);
  });

  it('applies remaining damage to HP', () => {
    const result = applyDamage(15, 20, 10);
    expect(result.newTempHp).toBe(0);
    expect(result.newHp).toBe(15); // 20 - (15-10)
  });

  it('does not reduce HP below 0', () => {
    const result = applyDamage(100, 20, 5);
    expect(result.newHp).toBe(0);
    expect(result.newTempHp).toBe(0);
  });
});

describe('applyHealing', () => {
  it('heals normally when below max', () => {
    expect(applyHealing(5, 10, 20)).toBe(15);
  });

  it('does not exceed max HP', () => {
    expect(applyHealing(15, 10, 20)).toBe(20);
    expect(applyHealing(100, 10, 20)).toBe(20);
  });
});

describe('isConscious', () => {
  it('returns true when HP > 0', () => {
    expect(isConscious(1)).toBe(true);
    expect(isConscious(20)).toBe(true);
  });

  it('returns false when HP <= 0', () => {
    expect(isConscious(0)).toBe(false);
    expect(isConscious(-5)).toBe(false);
  });
});

describe('isStable', () => {
  it('returns true only when HP is exactly 0', () => {
    expect(isStable(0)).toBe(true);
    expect(isStable(1)).toBe(false);
    expect(isStable(-1)).toBe(false);
  });
});
