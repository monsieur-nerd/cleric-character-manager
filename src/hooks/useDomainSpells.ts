import { useMemo } from 'react';
import { useSpellStore } from '@/stores';
import { CLERIC_DOMAINS } from '@/types';
import type { Spell } from '@/types';

const getMaxDomainSpellLevel = (characterLevel: number): number => {
  if (characterLevel >= 9) return 5;
  if (characterLevel >= 7) return 4;
  if (characterLevel >= 5) return 3;
  if (characterLevel >= 3) return 2;
  return 1;
};

export function useDomainSpells(domainId: string | null | undefined, characterLevel: number) {
  const allSpells = useSpellStore((state) => state.allSpells);
  
  return useMemo(() => {
    if (!domainId) return [];
    
    const domain = CLERIC_DOMAINS.find(d => d.id === domainId);
    if (!domain) return [];
    
    const maxDomainLevel = getMaxDomainSpellLevel(characterLevel);
    const domainSpellIds = domain.spellIds;
    
    return allSpells.filter(spell => 
      domainSpellIds.includes(spell.id) && 
      spell.level <= maxDomainLevel
    );
  }, [allSpells, domainId, characterLevel]);
}

export function useDomainSpellIds(domainId: string | null | undefined): string[] {
  return useMemo(() => {
    if (!domainId) return [];
    const domain = CLERIC_DOMAINS.find(d => d.id === domainId);
    return domain?.spellIds || [];
  }, [domainId]);
}

export function useIsDomainSpell(spellId: string, domainId: string | null | undefined): boolean {
  const domainSpellIds = useDomainSpellIds(domainId);
  return useMemo(() => domainSpellIds.includes(spellId), [domainSpellIds, spellId]);
}

export function useAvailableSpells(characterLevel: number): Spell[] {
  const allSpells = useSpellStore((state) => state.allSpells);
  const maxSpellLevel = getMaxDomainSpellLevel(characterLevel);
  
  return useMemo(() => 
    allSpells.filter(spell => spell.level <= maxSpellLevel),
    [allSpells, maxSpellLevel]
  );
}
