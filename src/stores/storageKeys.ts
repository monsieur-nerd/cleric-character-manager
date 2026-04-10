// Clés de stockage local pour la persistance des données de jeu
// Tout nouveau store Zustand doit utiliser ce préfixe pour être
// automatiquement inclus dans les sauvegardes exportées/importées.
// 
// VERSION 2 : Forcer réinitialisation pour Imildar Souffle-Tempête (données corrompues)
export const STORAGE_PREFIX = 'cleric-' as const;
export const STORAGE_VERSION = 'v2' as const;

export const STORAGE_KEYS = {
  CHARACTER: `${STORAGE_PREFIX}character-store-${STORAGE_VERSION}`,
  SPELL: `${STORAGE_PREFIX}spell-store-${STORAGE_VERSION}`,
  INVENTORY: `${STORAGE_PREFIX}inventory-store-${STORAGE_VERSION}`,
  PRESET: `${STORAGE_PREFIX}preset-store-${STORAGE_VERSION}`,
  SHOPPING_LIST: `${STORAGE_PREFIX}shopping-list-store-${STORAGE_VERSION}`,
  CHULT_MODE: `${STORAGE_PREFIX}chult-mode-${STORAGE_VERSION}`,
} as const;

/**
 * Retourne toutes les clés localStorage correspondant aux données de l'application.
 * Cela permet d'inclure automatiquement les futurs stores sans modifier
 * la liste à la main.
 */
export const getAllStorageKeys = (): string[] => {
  if (typeof window === 'undefined') return Object.values(STORAGE_KEYS);
  return Object.keys(localStorage).filter((key) => 
    key.startsWith(STORAGE_PREFIX) && key.includes(STORAGE_VERSION)
  );
};
