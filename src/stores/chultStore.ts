import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS } from './storageKeys';

// Liste des sorts de résurrection (interdits dans le Chult)
export const RESURRECTION_SPELL_IDS = [
  'retour-a-la-vie',      // Revivify
  'rappel-a-la-vie',      // Raise Dead
  'rappel-des-morts',     // Raise Dead (variante)
  'resurrection',         // Resurrection
  'resurrection-supreme', // True Resurrection
  'restauration-supreme', // Supreme Restoration
] as const;

// IDs des composants liés à la résurrection (à filtrer)
export const RESURRECTION_COMPONENT_IDS = [
  'diamants-pour-reanimation',
  'diamants-300po',
  'diamants-500po',
  'diamants-1000po',
  'diamants-resurrection',
  'diamants-25000po',
  'diamants-supreme',
];

interface ChultState {
  // Mode Chult activé
  isInChult: boolean;
  
  // Actions
  setInChult: (value: boolean) => void;
  toggleInChult: () => void;
}

export const useChultStore = create<ChultState>()(
  persist(
    (set) => ({
      isInChult: false,
      
      setInChult: (value) => {
        set({ isInChult: value });
      },
      
      toggleInChult: () => {
        set((state) => ({ isInChult: !state.isInChult }));
      },
    }),
    {
      name: STORAGE_KEYS.CHULT_MODE,
    }
  )
);

// Helper pour vérifier si un sort est un sort de résurrection
export const isResurrectionSpell = (spellId: string): boolean => {
  return RESURRECTION_SPELL_IDS.includes(spellId as typeof RESURRECTION_SPELL_IDS[number]);
};

// Helper pour vérifier si un composant est lié à la résurrection
export const isResurrectionComponent = (itemId: string): boolean => {
  return RESURRECTION_COMPONENT_IDS.some(id => itemId.includes(id));
};
