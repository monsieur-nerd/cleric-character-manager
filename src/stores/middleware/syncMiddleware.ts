/**
 * Middleware de synchronisation inter-stores
 * 
 * Garantit la cohérence entre characterStore et spellStore
 * en utilisant le pattern subscriber de Zustand.
 */

import type { StoreApi } from 'zustand';

// Types pour les stores synchronisables
interface SyncableCharacterStore {
  character: {
    level: number;
    domain?: { id: string } | null;
  };
}

interface SyncableSpellStore {
  characterLevel: number;
  currentDomainId: string | null;
  setCharacterLevel: (level: number) => void;
  setCurrentDomain: (domainId: string | null) => void;
}

// Références aux stores pour la synchronisation
let characterStoreRef: StoreApi<SyncableCharacterStore> | null = null;
let spellStoreRef: StoreApi<SyncableSpellStore> | null = null;

// Flag pour éviter les boucles de synchronisation
let isSyncing = false;

/**
 * Enregistre les références des stores pour la synchronisation
 */
export function registerStores(
  characterStore: StoreApi<SyncableCharacterStore>,
  spellStore: StoreApi<SyncableSpellStore>
): void {
  characterStoreRef = characterStore;
  spellStoreRef = spellStore;

  // Configure les subscribers pour la synchronisation bidirectionnelle
  setupSyncListeners();
}

/**
 * Configure les listeners de synchronisation
 */
function setupSyncListeners(): (() => void) | undefined {
  if (!characterStoreRef || !spellStoreRef) return undefined;

  // Synchronise characterStore -> spellStore
  const unsubscribeCharacter = characterStoreRef.subscribe((state) => {
    if (isSyncing) return;
    
    const spellState = spellStoreRef?.getState();
    if (!spellState) return;

    const charLevel = state.character.level;
    const charDomain = state.character.domain?.id ?? null;

    // Vérifie si une synchronisation est nécessaire
    const needsLevelSync = charLevel !== spellState.characterLevel;
    const needsDomainSync = charDomain !== spellState.currentDomainId;

    if (!needsLevelSync && !needsDomainSync) return;

    isSyncing = true;

    try {
      if (needsLevelSync) {
        if (import.meta.env.DEV) {
          console.log(`[SyncMiddleware] Level: ${spellState.characterLevel} -> ${charLevel}`);
        }
        spellState.setCharacterLevel(charLevel);
      }

      if (needsDomainSync) {
        if (import.meta.env.DEV) {
          console.log(`[SyncMiddleware] Domain: ${spellState.currentDomainId} -> ${charDomain}`);
        }
        spellState.setCurrentDomain(charDomain);
      }
    } finally {
      // Reset le flag après le prochain tick pour permettre d'autres updates
      setTimeout(() => { isSyncing = false; }, 0);
    }
  });

  return unsubscribeCharacter;
}

/**
 * Force la synchronisation manuelle des stores
 * À utiliser après restauration de données ou import
 */
export function forceSyncStores(): void {
  if (!characterStoreRef || !spellStoreRef) {
    console.warn('[SyncMiddleware] Stores not registered');
    return;
  }

  const charState = characterStoreRef.getState();
  const spellState = spellStoreRef.getState();

  const charLevel = charState.character.level;
  const charDomain = charState.character.domain?.id ?? null;

  if (charLevel !== spellState.characterLevel) {
    spellState.setCharacterLevel(charLevel);
  }

  if (charDomain !== spellState.currentDomainId) {
    spellState.setCurrentDomain(charDomain);
  }
}

/**
 * Vérifie si les stores sont synchronisés
 */
export function areStoresInSync(): boolean {
  if (!characterStoreRef || !spellStoreRef) return false;

  const charState = characterStoreRef.getState();
  const spellState = spellStoreRef.getState();

  return (
    charState.character.level === spellState.characterLevel &&
    (charState.character.domain?.id ?? null) === spellState.currentDomainId
  );
}
