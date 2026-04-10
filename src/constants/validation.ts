export const CONSTRAINTS = {
  // Caractéristiques
  MIN_ABILITY_SCORE: 1,
  MAX_ABILITY_SCORE: 30,
  DEFAULT_ABILITY_SCORE: 10,
  
  // Niveau du personnage
  MIN_CHARACTER_LEVEL: 1,
  MAX_CHARACTER_LEVEL: 20,
  DEFAULT_CHARACTER_LEVEL: 5,
  
  // Fichiers
  MAX_FILE_SIZE_MB: 2,
  MAX_FILE_SIZE_BYTES: 2 * 1024 * 1024,
  
  // Sorts
  MAX_SPELL_LEVEL: 5,
  
  // Points de vie
  MIN_HP: 0,
} as const;

export const ABILITY_MODIFIERS = {
  // Calcul du modificateur: Math.floor((score - 10) / 2)
  MIN_MODIFIER: -5,  // Score 1
  MAX_MODIFIER: 10,  // Score 30
} as const;
