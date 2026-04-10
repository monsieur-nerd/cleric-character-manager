import type { Spell } from '@/types';

/**
 * Filtre les sorts par niveau
 */
export function filterSpellsByLevel(spells: Spell[], level: number): Spell[] {
  return spells.filter(spell => spell.level === level);
}

/**
 * Filtre les sorts par niveau maximum
 */
export function filterSpellsByMaxLevel(spells: Spell[], maxLevel: number): Spell[] {
  return spells.filter(spell => spell.level <= maxLevel);
}

/**
 * Filtre les sorts de domaine
 */
export function filterDomainSpells(spells: Spell[], domainSpellIds: string[]): Spell[] {
  return spells.filter(spell => domainSpellIds.includes(spell.id));
}

/**
 * Exclut les sorts de domaine
 */
export function excludeDomainSpells(spells: Spell[], domainSpellIds: string[]): Spell[] {
  return spells.filter(spell => !domainSpellIds.includes(spell.id));
}

/**
 * Filtre les tours de magie (niveau 0)
 */
export function filterCantrips(spells: Spell[]): Spell[] {
  return spells.filter(spell => spell.level === 0);
}

/**
 * Exclut les tours de magie
 */
export function excludeCantrips(spells: Spell[]): Spell[] {
  return spells.filter(spell => spell.level > 0);
}

/**
 * Filtre les sorts qui nécessitent une concentration
 */
export function filterConcentrationSpells(spells: Spell[]): Spell[] {
  return spells.filter(spell => spell.concentration);
}

/**
 * Filtre les sorts par école de magie
 */
export function filterSpellsBySchool(spells: Spell[], school: string): Spell[] {
  return spells.filter(spell => spell.school === school);
}

/**
 * Trie les sorts par niveau puis par nom
 */
export function sortSpellsByLevelAndName(spells: Spell[]): Spell[] {
  return [...spells].sort((a, b) => {
    if (a.level !== b.level) {
      return a.level - b.level;
    }
    return a.name.localeCompare(b.name);
  });
}

/**
 * Groupe les sorts par niveau
 */
export function groupSpellsByLevel(spells: Spell[]): Record<number, Spell[]> {
  return spells.reduce((groups, spell) => {
    const level = spell.level;
    if (!groups[level]) {
      groups[level] = [];
    }
    groups[level].push(spell);
    return groups;
  }, {} as Record<number, Spell[]>);
}

/**
 * Recherche des sorts par nom (insensible à la casse)
 */
export function searchSpellsByName(spells: Spell[], query: string): Spell[] {
  const normalizedQuery = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return spells.filter(spell => 
    spell.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(normalizedQuery)
  );
}
