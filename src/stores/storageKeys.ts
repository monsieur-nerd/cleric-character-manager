// Clés de stockage local pour la persistance des données de jeu
// Tout nouveau store Zustand doit utiliser ce préfixe pour être
// automatiquement inclus dans les sauvegardes exportées/importées.
export const STORAGE_PREFIX = 'cleric-' as const;

export const STORAGE_KEYS = {
  CHARACTER: `${STORAGE_PREFIX}character-store`,
  SPELL: `${STORAGE_PREFIX}spell-store`,
  INVENTORY: `${STORAGE_PREFIX}inventory-store`,
  PRESET: `${STORAGE_PREFIX}preset-store`,
} as const;

/**
 * Retourne toutes les clés localStorage correspondant aux données de l'application.
 * Cela permet d'inclure automatiquement les futurs stores sans modifier
 * la liste à la main.
 */
export const getAllStorageKeys = (): string[] => {
  if (typeof window === 'undefined') return Object.values(STORAGE_KEYS);
  return Object.keys(localStorage).filter((key) => key.startsWith(STORAGE_PREFIX));
};
