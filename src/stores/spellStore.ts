import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Spell, SpellSlots } from '@/types';
import { MAX_SPELL_SLOTS, CLERIC_DOMAINS } from '@/types';
import { STORAGE_KEYS } from './storageKeys';

interface SpellState {
  // Données
  allSpells: Spell[];
  
  // État courant
  preparedSpellIds: string[];
  spellSlots: SpellSlots;
  currentDomainId: string | null; // Domaine actuel du personnage
  characterLevel: number; // Niveau du personnage pour filtrer les sorts de domaine
  
  // Actions
  loadSpells: (spells: Spell[]) => void;
  setCurrentDomain: (domainId: string | null) => void; // Définit le domaine actuel
  setCharacterLevel: (level: number) => void; // Définit le niveau du personnage
  prepareSpell: (spellId: string) => void;
  unprepareSpell: (spellId: string) => void;
  toggleSpellPrepared: (spellId: string, maxNonDomain?: number) => void;
  markAsUsed: (spellId: string) => void;
  clearNonDomainPrepared: () => void;
  resetPreparedSpells: () => void;

  useSpellSlot: (level: 1 | 2 | 3 | 4 | 5) => boolean;
  restoreSpellSlot: (level: 1 | 2 | 3 | 4 | 5, maxSlots: SpellSlots) => void;
  resetDaily: (characterLevel: number, domainId?: string) => void;
  resetSpellSlotsOnly: (characterLevel: number) => void; // Repos long : reset emplacements seulement
  prepareMultipleSpells: (spellIds: string[], maxAllowed: number) => void;
  
  // Sélecteurs
  getSpellById: (id: string) => Spell | undefined;
  getPreparedSpells: (characterLevel?: number) => Spell[];
  getAvailableSpells: () => Spell[];
  getUsedSpells: () => Spell[];
  getSpellsByLevel: (level: number) => Spell[];
  getDomainSpells: () => Spell[];
  getNonDomainPreparedSpells: () => Spell[];
  canPrepareSpell: (spellId: string, maxNonDomain: number) => boolean;
  getSpellCountByLevel: () => Record<number, number>;
}

// Helper function to get domain spell IDs for a given domain
const getDomainSpellIds = (domainId: string | null): string[] => {
  if (!domainId) return [];
  const domain = CLERIC_DOMAINS.find(d => d.id === domainId);
  return domain?.spellIds || [];
};

// Helper function to get max domain spell level based on character level
// D&D 5e: Domain spells are granted at cleric levels 1, 3, 5, 7, 9
const getMaxDomainSpellLevel = (characterLevel: number): number => {
  if (characterLevel >= 9) return 5;
  if (characterLevel >= 7) return 4;
  if (characterLevel >= 5) return 3;
  if (characterLevel >= 3) return 2;
  return 1;
};

export const useSpellStore = create<SpellState>()(
  persist(
    (set, get) => ({
      allSpells: [],
      preparedSpellIds: [],
      currentDomainId: null,
      characterLevel: 5,
      spellSlots: { 1: 4, 2: 3, 3: 2, 4: 0, 5: 0 },
      
      loadSpells: (spells) => {
        set({ allSpells: spells });
      },

      setCurrentDomain: (domainId) => {
        set({ currentDomainId: domainId });
      },

      setCharacterLevel: (level) => {
        set({ characterLevel: level });
      },
      
      prepareSpell: (spellId) => {
        const { allSpells, currentDomainId } = get();
        const spell = allSpells.find(s => s.id === spellId);
        if (!spell) return;
        
        // Les sorts de domaine DU PERSONNAGE ACTUEL sont toujours préparés
        const domainSpellIds = getDomainSpellIds(currentDomainId);
        if (domainSpellIds.includes(spellId)) return;
        
        set((state) => ({
          preparedSpellIds: [...state.preparedSpellIds, spellId],
        }));
      },
      
      unprepareSpell: (spellId) => {
        const { allSpells, currentDomainId } = get();
        const spell = allSpells.find(s => s.id === spellId);
        if (!spell) return;
        
        // Les sorts de domaine DU PERSONNAGE ACTUEL ne peuvent pas être dépréparés
        const domainSpellIds = getDomainSpellIds(currentDomainId);
        if (domainSpellIds.includes(spellId)) return;
        
        set((state) => ({
          preparedSpellIds: state.preparedSpellIds.filter(id => id !== spellId),
        }));
      },
      
      toggleSpellPrepared: (spellId, maxNonDomain) => {
        const { preparedSpellIds, unprepareSpell, prepareSpell, canPrepareSpell } = get();
        if (preparedSpellIds.includes(spellId)) {
          unprepareSpell(spellId);
        } else {
          // Vérifie la limite si maxNonDomain est fourni
          if (maxNonDomain !== undefined && !canPrepareSpell(spellId, maxNonDomain)) {
            return; // Ne peut pas préparer (limite atteinte)
          }
          prepareSpell(spellId);
        }
      },
      
      markAsUsed: (spellId) => {
        const spell = get().allSpells.find(s => s.id === spellId);
        if (!spell) return;
        
        // Vérifie s'il reste des emplacements (pour les sorts de niveau > 0)
        const level = spell.level as 1 | 2 | 3 | 4 | 5;
        if (level > 0 && get().spellSlots[level] <= 0) {
          return;
        }
        
        // Décmente juste les emplacements, ne marque pas le sort comme "utilisé une seule fois"
        // En D&D 5e, on peut lancer le même sort plusieurs fois
        set((state) => {
          const newSpellSlots = level > 0 
            ? { ...state.spellSlots, [level]: Math.max(0, state.spellSlots[level] - 1) }
            : state.spellSlots;
          
          return {
            spellSlots: newSpellSlots,
          };
        });
      },

      clearNonDomainPrepared: () => {
        const { currentDomainId, characterLevel, allSpells } = get();
        const domainSpellIds = getDomainSpellIds(currentDomainId);
        const maxDomainLevel = getMaxDomainSpellLevel(characterLevel);
        
        // Filtrer les sorts de domaine selon le niveau du personnage
        const filteredDomainSpellIds = domainSpellIds.filter(id => {
          const spell = allSpells.find(s => s.id === id);
          return spell && spell.level <= maxDomainLevel;
        });
        
        set((state) => ({
          preparedSpellIds: state.preparedSpellIds.filter(id => 
            filteredDomainSpellIds.includes(id)
          ),
        }));
      },
      
      resetPreparedSpells: () => {
        const { currentDomainId, characterLevel, allSpells } = get();
        const domainSpellIds = getDomainSpellIds(currentDomainId);
        const maxDomainLevel = getMaxDomainSpellLevel(characterLevel);
        
        // Filtrer les sorts de domaine selon le niveau du personnage
        const filteredDomainSpellIds = domainSpellIds.filter(id => {
          const spell = allSpells.find(s => s.id === id);
          return spell && spell.level <= maxDomainLevel;
        });
        
        // Réinitialise complètement : garde seulement les sorts de domaine DU PERSONNAGE ACTUEL
        set({
          preparedSpellIds: filteredDomainSpellIds,
        });
      },
      
      useSpellSlot: (level) => {
        const { spellSlots } = get();
        if (spellSlots[level] <= 0) return false;
        
        set((state) => ({
          spellSlots: { ...state.spellSlots, [level]: state.spellSlots[level] - 1 },
        }));
        return true;
      },
      
      restoreSpellSlot: (level, maxSlots) => {
        set((state) => ({
          spellSlots: {
            ...state.spellSlots,
            [level]: Math.min(maxSlots[level], state.spellSlots[level] + 1),
          },
        }));
      },
      
      resetDaily: (characterLevel, domainId) => {
        // Réinitialise completement : emplacements + sorts (garde seulement domaine)
        const effectiveDomainId = domainId || get().currentDomainId;
        const domainSpellIds = getDomainSpellIds(effectiveDomainId);
        const maxDomainLevel = getMaxDomainSpellLevel(characterLevel);
        const { allSpells } = get();
        
        // Filtrer les sorts de domaine selon le niveau du personnage
        const filteredDomainSpellIds = domainSpellIds.filter(id => {
          const spell = allSpells.find(s => s.id === id);
          return spell && spell.level <= maxDomainLevel;
        });
        
        set({
          spellSlots: MAX_SPELL_SLOTS[characterLevel] || MAX_SPELL_SLOTS[5],
          preparedSpellIds: filteredDomainSpellIds,
          currentDomainId: effectiveDomainId,
        });
      },

      resetSpellSlotsOnly: (characterLevel) => {
        // Repos long : réinitialise uniquement les emplacements, garde les sorts préparés
        set({
          spellSlots: MAX_SPELL_SLOTS[characterLevel] || MAX_SPELL_SLOTS[5],
        });
      },
      
      prepareMultipleSpells: (spellIds, maxAllowed) => {
        const { currentDomainId } = get();
        const domainSpellIds = getDomainSpellIds(currentDomainId);
        
        // Filtre les sorts de domaine ET les sorts mineurs (niveau 0) de la liste
        // Les sorts mineurs ne comptent pas dans la limite de préparation
        const nonDomainNonCantripSpellIds = spellIds.filter(id => {
          const spell = get().allSpells.find(s => s.id === id);
          return !domainSpellIds.includes(id) && spell && spell.level > 0;
        });
        
        // Limite au maximum autorisé
        const limitedNonDomain = nonDomainNonCantripSpellIds.slice(0, maxAllowed);
        
        set({
          preparedSpellIds: [...domainSpellIds, ...limitedNonDomain],
        });
      },
      
      // Sélecteurs
      getSpellById: (id) => {
        return get().allSpells.find(s => s.id === id);
      },
      
      getPreparedSpells: (characterLevelOverride?: number) => {
        const { allSpells, preparedSpellIds, currentDomainId, characterLevel } = get();
        // Utilise le niveau passé en paramètre, sinon celui du store
        const effectiveLevel = characterLevelOverride ?? characterLevel;
        const domainSpellIds = getDomainSpellIds(currentDomainId);
        const maxDomainLevel = getMaxDomainSpellLevel(effectiveLevel);
        
        // Retourne:
        // - Les sorts préparés manuellement (filtrés par niveau max accessible)
        // - Les tours de magie (niveau 0)
        // - Les sorts de domaine DU PERSONNAGE ACTUEL, filtrés par niveau accessible
        return allSpells.filter(s => {
          if (s.level === 0) return true; // Tours de magie toujours disponibles
          // Sorts préparés : uniquement ceux du niveau accessible
          if (preparedSpellIds.includes(s.id) && s.level <= maxDomainLevel) return true;
          // Sorts de domaine : uniquement ceux du niveau accessible
          if (domainSpellIds.includes(s.id) && s.level <= maxDomainLevel) return true;
          return false;
        });
      },
      
      getAvailableSpells: () => {
        // Tous les sorts sont disponibles tant qu'on a des emplacements
        return get().allSpells;
      },
      
      getUsedSpells: () => {
        // Plus utilisé - on peut lancer le même sort plusieurs fois
        return [];
      },
      
      getSpellsByLevel: (level) => {
        return get().allSpells.filter(s => s.level === level);
      },
      
      getDomainSpells: () => {
        const { allSpells, currentDomainId, characterLevel } = get();
        const domainSpellIds = getDomainSpellIds(currentDomainId);
        const maxDomainLevel = getMaxDomainSpellLevel(characterLevel);
        
        // Retourne seulement les sorts du domaine actuel du personnage,
        // filtrés par niveau accessible selon le niveau du personnage
        return allSpells.filter(s => 
          domainSpellIds.includes(s.id) && s.level <= maxDomainLevel
        );
      },
      
      getNonDomainPreparedSpells: () => {
        const { allSpells, preparedSpellIds, currentDomainId } = get();
        const domainSpellIds = getDomainSpellIds(currentDomainId);
        
        return allSpells.filter(s => 
          preparedSpellIds.includes(s.id) && 
          !domainSpellIds.includes(s.id) && 
          s.level > 0
        );
      },
      
      canPrepareSpell: (spellId, maxNonDomain) => {
        const { allSpells, preparedSpellIds, currentDomainId } = get();
        const spell = allSpells.find(s => s.id === spellId);
        if (!spell) return false;
        
        const domainSpellIds = getDomainSpellIds(currentDomainId);
        
        // Les sorts de domaine DU PERSONNAGE ACTUEL sont toujours préparables
        if (domainSpellIds.includes(spellId)) return true;
        
        // Les tours de magie (niveau 0) sont toujours disponibles
        if (spell.level === 0) return true;
        
        // Vérifie si déjà préparé
        if (preparedSpellIds.includes(spellId)) return true;
        
        // Compte les sorts non-domaine déjà préparés (niveau > 0 uniquement)
        const nonDomainCount = get().getNonDomainPreparedSpells().length;
        return nonDomainCount < maxNonDomain;
      },
      
      getSpellCountByLevel: () => {
        const counts: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        get().allSpells.forEach(spell => {
          counts[spell.level] = (counts[spell.level] || 0) + 1;
        });
        return counts;
      },
    }),
    {
      name: STORAGE_KEYS.SPELL,
      partialize: (state) => ({
        preparedSpellIds: state.preparedSpellIds,
        spellSlots: state.spellSlots,
        currentDomainId: state.currentDomainId,
        // Note: characterLevel n'est PAS persisté pour éviter les problèmes de synchronisation
        // avec le niveau du personnage. Il utilise sa valeur par défaut ou est passé en paramètre.
      }),
    }
  )
);
