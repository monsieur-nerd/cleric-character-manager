import { useMemo } from 'react';
import { useCharacterStore } from '@/stores';
import { getSpellIncantation } from '@/data/spellIncantations';
import type { Spell } from '@/types';

/**
 * Hook pour obtenir l'incantation d'un sort selon le dieu du personnage
 * Ne retourne une incantation que si le sort a une composante verbale
 */
export function useSpellIncantation(spell: Spell | null | undefined): string | null {
  const character = useCharacterStore((state) => state.character);
  
  return useMemo(() => {
    if (!spell) return null;
    
    // Vérifier si le sort a une composante verbale
    // Si pas de composante verbale, pas d'incantation
    if (!spell.components?.verbal) {
      return null;
    }
    
    // Récupérer la divinité du personnage
    const deity = character.deity;
    
    // Si une incantation spécifique existe déjà dans le sort, l'utiliser
    // en remplaçant {deity} par le nom du dieu actuel
    if (spell.incantation) {
      return spell.incantation.replace(/{deity}/g, deity?.name || 'divinité');
    }
    
    // Sinon, générer une incantation selon le dieu
    if (!deity) {
      return null;
    }
    
    return getSpellIncantation(
      spell.id,
      deity.id,
      deity.name,
      spell.incantation
    );
  }, [spell, character.deity]);
}

/**
 * Hook pour vérifier si un sort peut avoir une incantation
 * (a une composante verbale)
 */
export function useCanHaveIncantation(spell: Spell | null | undefined): boolean {
  if (!spell) return false;
  return spell.components?.verbal === true;
}
