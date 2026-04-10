import { useMemo } from 'react';
import type { Spell, SpellPreset } from '@/types';

interface PresetSelectionResult {
  count: number;
  names: string[];
  validSpells: Spell[];
}

export function usePresetSelection(
  presetSpellIds: string[],
  maxPrepared: number,
  allSpells: Spell[],
  domainSpellIds: string[]
): PresetSelectionResult {
  return useMemo(() => {
    // Filtre les sorts de domaine et les tours de magie
    const validSpells = presetSpellIds
      .map(id => allSpells.find(s => s.id === id))
      .filter((s): s is Spell => 
        !!s && 
        !domainSpellIds.includes(s.id) && 
        s.level > 0
      );
    
    const limitedSpells = validSpells.slice(0, maxPrepared);
    
    return {
      count: limitedSpells.length,
      names: limitedSpells.map(s => s.name),
      validSpells: limitedSpells,
    };
  }, [presetSpellIds, maxPrepared, allSpells, domainSpellIds]);
}

export function calculateSelectionCount(
  presetSpellIds: string[],
  maxPrepared: number,
  allSpells: Spell[],
  domainSpellIds: string[]
): number {
  const nonDomainNonCantripSpells = presetSpellIds.filter(id => {
    const spell = allSpells.find(s => s.id === id);
    return spell && !domainSpellIds.includes(id) && spell.level > 0;
  });
  
  return Math.min(nonDomainNonCantripSpells.length, maxPrepared);
}

export function getSelectedSpellNames(
  presetSpellIds: string[],
  maxPrepared: number,
  allSpells: Spell[],
  domainSpellIds: string[]
): string[] {
  const nonDomainNonCantripSpells = presetSpellIds
    .map(id => allSpells.find(s => s.id === id))
    .filter((s): s is Spell => 
      !!s && 
      !domainSpellIds.includes(s.id) && 
      s.level > 0
    )
    .slice(0, maxPrepared);
  
  return nonDomainNonCantripSpells.map(s => s.name);
}
