import { describe, it, expect } from 'vitest';
import { 
  SKILLS, 
  getSkillById, 
  getSkillsByAbility, 
  getSkillsByCategory,
  ABILITY_SCORES 
} from './skills';

describe('SKILLS data', () => {
  it('should have 18 skills total', () => {
    expect(SKILLS).toHaveLength(18);
  });

  it('should have unique IDs', () => {
    const ids = SKILLS.map(s => s.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('every skill should have required fields', () => {
    SKILLS.forEach(skill => {
      expect(skill.id).toBeDefined();
      expect(skill.name).toBeDefined();
      expect(skill.abilityScore).toBeDefined();
      expect(skill.summary).toBeDefined();
      expect(skill.description).toBeDefined();
    });
  });

  it('every skill should have a valid ability score', () => {
    const validAbilities = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
    SKILLS.forEach(skill => {
      expect(validAbilities).toContain(skill.abilityScore);
    });
  });

  it('every skill should have a valid category', () => {
    const validCategories = ['physical', 'mental', 'social'];
    SKILLS.forEach(skill => {
      expect(validCategories).toContain(skill.category);
    });
  });
});

describe('getSkillById', () => {
  it('should return skill by id', () => {
    const skill = getSkillById('perception');
    expect(skill).toBeDefined();
    expect(skill?.name).toBe('Perception');
  });

  it('should return undefined for unknown id', () => {
    const skill = getSkillById('unknown');
    expect(skill).toBeUndefined();
  });
});

describe('getSkillsByAbility', () => {
  it('should return all WIS skills', () => {
    const skills = getSkillsByAbility('WIS');
    expect(skills.every(s => s.abilityScore === 'WIS')).toBe(true);
    expect(skills.length).toBeGreaterThan(0);
  });

  it('should return all STR skills', () => {
    const skills = getSkillsByAbility('STR');
    expect(skills.every(s => s.abilityScore === 'STR')).toBe(true);
  });
});

describe('getSkillsByCategory', () => {
  it('should return physical skills', () => {
    const skills = getSkillsByCategory('physical');
    expect(skills.every(s => s.category === 'physical')).toBe(true);
  });

  it('should return mental skills', () => {
    const skills = getSkillsByCategory('mental');
    expect(skills.every(s => s.category === 'mental')).toBe(true);
  });

  it('should return social skills', () => {
    const skills = getSkillsByCategory('social');
    expect(skills.every(s => s.category === 'social')).toBe(true);
  });
});

describe('ABILITY_SCORES', () => {
  it('should have all 6 abilities', () => {
    expect(Object.keys(ABILITY_SCORES)).toHaveLength(6);
    expect(ABILITY_SCORES.STR).toBeDefined();
    expect(ABILITY_SCORES.DEX).toBeDefined();
    expect(ABILITY_SCORES.CON).toBeDefined();
    expect(ABILITY_SCORES.INT).toBeDefined();
    expect(ABILITY_SCORES.WIS).toBeDefined();
    expect(ABILITY_SCORES.CHA).toBeDefined();
  });
});
