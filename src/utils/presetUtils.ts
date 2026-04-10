import type { Spell } from '@/types';

/**
 * Compte combien de sorts d'un preset seront réellement sélectionnés
 * en fonction du maxPrepared du personnage
 */
export function getPresetSelectionCount(
  presetSpellIds: string[],
  maxPrepared: number,
  allSpells: Spell[],
  domainSpellIds: string[]
): number {
  // Filtre les sorts de domaine ET les sorts mineurs (niveau 0)
  // Ces sorts ne comptent pas dans la limite de préparation
  const nonDomainNonCantripSpells = presetSpellIds.filter(id => {
    const spell = allSpells.find(s => s.id === id);
    return spell && !domainSpellIds.includes(id) && spell.level > 0;
  });
  
  // Retourne le minimum entre les sorts disponibles et la limite
  return Math.min(nonDomainNonCantripSpells.length, maxPrepared);
}

/**
 * Obtient la liste des sorts qui seront réellement sélectionnés
 */
export function getSelectedSpellNames(
  presetSpellIds: string[],
  maxPrepared: number,
  allSpells: Spell[],
  domainSpellIds: string[]
): string[] {
  const nonDomainNonCantripSpells = presetSpellIds
    .map(id => allSpells.find(s => s.id === id))
    .filter((s): s is Spell => !!s && !domainSpellIds.includes(s.id) && s.level > 0)
    .slice(0, maxPrepared);
  
  return nonDomainNonCantripSpells.map(s => s.name);
}

/**
 * Filtre les sorts d'un preset pour obtenir ceux qui seront effectivement sélectionnés
 */
export function getSelectedSpells(
  presetSpellIds: string[],
  maxPrepared: number,
  allSpells: Spell[],
  domainSpellIds: string[]
): Spell[] {
  return presetSpellIds
    .map(id => allSpells.find(s => s.id === id))
    .filter((s): s is Spell => 
      !!s && 
      !domainSpellIds.includes(s.id) && 
      s.level > 0
    )
    .slice(0, maxPrepared);
}

/**
 * Vérifie si un preset a assez de sorts pour remplir tous les slots
 */
export function isPresetComplete(
  presetSpellIds: string[],
  maxPrepared: number,
  allSpells: Spell[],
  domainSpellIds: string[]
): boolean {
  const count = getPresetSelectionCount(presetSpellIds, maxPrepared, allSpells, domainSpellIds);
  return count >= maxPrepared;
}

/**
 * Calcule le nombre de sorts libres restants dans un preset
 */
export function getRemainingSlots(
  presetSpellIds: string[],
  maxPrepared: number,
  allSpells: Spell[],
  domainSpellIds: string[]
): number {
  const count = getPresetSelectionCount(presetSpellIds, maxPrepared, allSpells, domainSpellIds);
  return Math.max(0, maxPrepared - count);
}
