import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Spell, SpellSlots } from '@/types';
import { MAX_SPELL_SLOTS } from '@/types';
import { STORAGE_KEYS } from './storageKeys';

interface SpellState {
  // Données
  allSpells: Spell[];
  
  // État courant
  preparedSpellIds: string[];
  spellSlots: SpellSlots;
  
  // Actions
  loadSpells: (spells: Spell[]) => void;
  prepareSpell: (spellId: string) => void;
  unprepareSpell: (spellId: string) => void;
  toggleSpellPrepared: (spellId: string) => void;
  markAsUsed: (spellId: string) => void;
  clearNonDomainPrepared: () => void;

  useSpellSlot: (level: 1 | 2 | 3) => boolean;
  restoreSpellSlot: (level: 1 | 2 | 3, maxSlots: SpellSlots) => void;
  resetDaily: (characterLevel: number) => void;
  prepareMultipleSpells: (spellIds: string[], maxAllowed: number) => void;
  
  // Sélecteurs
  getSpellById: (id: string) => Spell | undefined;
  getPreparedSpells: () => Spell[];
  getAvailableSpells: () => Spell[];
  getUsedSpells: () => Spell[];
  getSpellsByLevel: (level: number) => Spell[];
  getDomainSpells: () => Spell[];
  getNonDomainPreparedSpells: () => Spell[];
  canPrepareSpell: (spellId: string, maxNonDomain: number) => boolean;
  getSpellCountByLevel: () => Record<number, number>;
}

export const useSpellStore = create<SpellState>()(
  persist(
    (set, get) => ({
      allSpells: [],
      preparedSpellIds: [],

      spellSlots: { 1: 4, 2: 3, 3: 2 },
      
      loadSpells: (spells) => {
        set({ allSpells: spells });
      },
      
      prepareSpell: (spellId) => {
        const spell = get().allSpells.find(s => s.id === spellId);
        if (!spell) return;
        
        // Les sorts de domaine sont toujours préparés
        if (spell.isDomainSpell) return;
        
        set((state) => ({
          preparedSpellIds: [...state.preparedSpellIds, spellId],
        }));
      },
      
      unprepareSpell: (spellId) => {
        const spell = get().allSpells.find(s => s.id === spellId);
        if (!spell) return;
        
        // Les sorts de domaine ne peuvent pas être dépréparés
        if (spell.isDomainSpell) return;
        
        set((state) => ({
          preparedSpellIds: state.preparedSpellIds.filter(id => id !== spellId),

        }));
      },
      
      toggleSpellPrepared: (spellId) => {
        const { preparedSpellIds, unprepareSpell, prepareSpell } = get();
        if (preparedSpellIds.includes(spellId)) {
          unprepareSpell(spellId);
        } else {
          prepareSpell(spellId);
        }
      },
      
      markAsUsed: (spellId) => {
        const spell = get().allSpells.find(s => s.id === spellId);
        if (!spell) return;
        
        // Vérifie s'il reste des emplacements (pour les sorts de niveau > 0)
        const level = spell.level as 1 | 2 | 3;
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
        set((state) => ({
          preparedSpellIds: state.preparedSpellIds.filter(id => {
            const spell = state.allSpells.find(s => s.id === id);
            return spell?.isDomainSpell;
          }),
        }));
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
      
      resetDaily: (characterLevel) => {
        set({
          spellSlots: MAX_SPELL_SLOTS[characterLevel] || MAX_SPELL_SLOTS[5],
        });
      },
      
      prepareMultipleSpells: (spellIds, maxAllowed) => {
        // Garde les sorts de domaine
        const domainSpellIds = get().allSpells
          .filter(s => s.isDomainSpell)
          .map(s => s.id);
        
        // Filtre les sorts de domaine de la liste
        const nonDomainSpellIds = spellIds.filter(id => !domainSpellIds.includes(id));
        
        // Limite au maximum autorisé
        const limitedNonDomain = nonDomainSpellIds.slice(0, maxAllowed);
        
        set({
          preparedSpellIds: [...domainSpellIds, ...limitedNonDomain],
        });
      },
      
      // Sélecteurs
      getSpellById: (id) => {
        return get().allSpells.find(s => s.id === id);
      },
      
      getPreparedSpells: () => {
        const { allSpells, preparedSpellIds } = get();
        return allSpells.filter(s => preparedSpellIds.includes(s.id));
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
        return get().allSpells.filter(s => s.isDomainSpell);
      },
      
      getNonDomainPreparedSpells: () => {
        const { allSpells, preparedSpellIds } = get();
        return allSpells.filter(s => 
          preparedSpellIds.includes(s.id) && !s.isDomainSpell
        );
      },
      
      canPrepareSpell: (spellId, maxNonDomain) => {
        const spell = get().allSpells.find(s => s.id === spellId);
        if (!spell) return false;
        
        // Les sorts de domaine sont toujours préparables
        if (spell.isDomainSpell) return true;
        
        // Vérifie si déjà préparé
        if (get().preparedSpellIds.includes(spellId)) return true;
        
        // Compte les sorts non-domaine déjà préparés
        const nonDomainCount = get().getNonDomainPreparedSpells().length;
        return nonDomainCount < maxNonDomain;
      },
      
      getSpellCountByLevel: () => {
        const counts: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0 };
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
      }),
    }
  )
);
