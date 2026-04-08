import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SpellPreset } from '@/types';
import { STORAGE_KEYS } from './storageKeys';

interface CustomPresetState {
  // Le preset custom de l'utilisateur
  customPreset: SpellPreset | null;
  
  // Mode édition
  isEditingCustom: boolean;
  
  // Actions
  setCustomPreset: (preset: SpellPreset) => void;
  updateCustomPresetSpells: (spellIds: string[]) => void;
  updateCustomPresetDetails: (name: string, description: string) => void;
  toggleEditMode: () => void;
  setEditMode: (editing: boolean) => void;
  resetCustomPreset: () => void;
  addSpellToCustom: (spellId: string) => void;
  removeSpellFromCustom: (spellId: string) => void;
  moveSpellInCustom: (fromIndex: number, toIndex: number) => void;
}

const DEFAULT_CUSTOM_PRESET: SpellPreset = {
  id: 'custom-user',
  name: '✏️ Mon Préréglage',
  icon: 'edit',
  description: 'Votre préréglage personnalisé - modifiez-le librement',
  spellIds: [],
  isDefault: false,
};

export const usePresetStore = create<CustomPresetState>()(
  persist(
    (set, get) => ({
      customPreset: { ...DEFAULT_CUSTOM_PRESET },
      isEditingCustom: false,
      
      setCustomPreset: (preset) => {
        set({ customPreset: preset });
      },
      
      updateCustomPresetSpells: (spellIds) => {
        const current = get().customPreset;
        if (current) {
          set({
            customPreset: { ...current, spellIds },
          });
        }
      },
      
      updateCustomPresetDetails: (name, description) => {
        const current = get().customPreset;
        if (current) {
          set({
            customPreset: { ...current, name, description },
          });
        }
      },
      
      toggleEditMode: () => {
        set((state) => ({ isEditingCustom: !state.isEditingCustom }));
      },
      
      setEditMode: (editing) => {
        set({ isEditingCustom: editing });
      },
      
      resetCustomPreset: () => {
        set({ customPreset: { ...DEFAULT_CUSTOM_PRESET } });
      },
      
      addSpellToCustom: (spellId) => {
        const current = get().customPreset;
        if (current && !current.spellIds.includes(spellId)) {
          set({
            customPreset: {
              ...current,
              spellIds: [...current.spellIds, spellId],
            },
          });
        }
      },
      
      removeSpellFromCustom: (spellId) => {
        const current = get().customPreset;
        if (current) {
          set({
            customPreset: {
              ...current,
              spellIds: current.spellIds.filter((id) => id !== spellId),
            },
          });
        }
      },
      
      moveSpellInCustom: (fromIndex, toIndex) => {
        const current = get().customPreset;
        if (current && fromIndex !== toIndex) {
          const newSpellIds = [...current.spellIds];
          const [moved] = newSpellIds.splice(fromIndex, 1);
          newSpellIds.splice(toIndex, 0, moved);
          set({
            customPreset: {
              ...current,
              spellIds: newSpellIds,
            },
          });
        }
      },
    }),
    {
      name: STORAGE_KEYS.PRESET,
      partialize: (state) => ({
        customPreset: state.customPreset,
      }),
    }
  )
);
