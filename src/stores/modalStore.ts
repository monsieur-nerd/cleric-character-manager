import { create } from 'zustand';

interface ModalState {
  isCharacterEditorOpen: boolean;
  editorInitialTab: 'identity' | 'stats' | 'abilities' | 'skills';
  
  openCharacterEditor: (tab?: 'identity' | 'stats' | 'abilities' | 'skills') => void;
  closeCharacterEditor: () => void;
}

export const useModalStore = create<ModalState>()((set) => ({
  isCharacterEditorOpen: false,
  editorInitialTab: 'identity',
  
  openCharacterEditor: (tab = 'identity') => set({ 
    isCharacterEditorOpen: true, 
    editorInitialTab: tab 
  }),
  
  closeCharacterEditor: () => set({ isCharacterEditorOpen: false }),
}));
