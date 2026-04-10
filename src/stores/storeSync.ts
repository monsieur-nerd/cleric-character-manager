/**
 * Synchronisation inter-stores
 * 
 * Ce module garantit que les stores Zustand restent cohérents entre eux,
 * notamment au chargement de l'application et après une restauration
 * de données (import ou rechargement de page).
 */

import { useCharacterStore } from './characterStore';
import { useSpellStore } from './spellStore';

/**
 * Synchronise les stores après chargement/restauration des données.
 * Cette fonction doit être appelée :
 * - Au montage de l'application (App.tsx)
 * - Après un import de sauvegarde
 */
export function syncStoresAfterRestore(): void {
  const characterState = useCharacterStore.getState();
  const spellState = useSpellStore.getState();

  // Récupère les valeurs du characterStore
  const characterLevel = characterState.character.level;
  const characterDomain = characterState.character.domain?.id || null;

  // Récupère les valeurs du spellStore
  const spellLevel = spellState.characterLevel;
  const spellDomain = spellState.currentDomainId;

  console.log('[StoreSync] Synchronisation des stores...');
  console.log('[StoreSync] CharacterStore:', { level: characterLevel, domain: characterDomain });
  console.log('[StoreSync] SpellStore:', { level: spellLevel, domain: spellDomain });

  // Si les valeurs divergent, on synchronise
  if (characterLevel !== spellLevel) {
    console.log(`[StoreSync] Synchronisation du niveau: ${spellLevel} -> ${characterLevel}`);
    spellState.setCharacterLevel(characterLevel);
  }

  if (characterDomain !== spellDomain) {
    console.log(`[StoreSync] Synchronisation du domaine: ${spellDomain} -> ${characterDomain}`);
    spellState.setCurrentDomain(characterDomain);
  }
}

/**
 * Vérifie si les stores sont synchronisés.
 * Utile pour le débogage.
 */
export function areStoresSynced(): boolean {
  const characterState = useCharacterStore.getState();
  const spellState = useSpellStore.getState();

  return (
    characterState.character.level === spellState.characterLevel &&
    characterState.character.domain?.id === spellState.currentDomainId
  );
}

/**
 * Affiche l'état de synchronisation des stores dans la console.
 */
export function logStoreSyncStatus(): void {
  const characterState = useCharacterStore.getState();
  const spellState = useSpellStore.getState();

  console.group('🔍 Store Sync Status');
  console.log('CharacterStore:');
  console.log('  - Level:', characterState.character.level);
  console.log('  - Domain:', characterState.character.domain?.id);
  console.log('SpellStore:');
  console.log('  - Level:', spellState.characterLevel);
  console.log('  - Domain:', spellState.currentDomainId);
  console.log('Synchronized:', areStoresSynced() ? '✅' : '❌');
  console.groupEnd();
}
