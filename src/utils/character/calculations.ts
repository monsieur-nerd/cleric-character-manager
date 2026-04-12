/**
 * Calculs purs pour le personnage
 * 
 * Ces fonctions sont pures (pas d'effets de bord) et testables unitairement.
 * Elles peuvent être utilisées hors des stores si nécessaire.
 */

/**
 * Calcule le modificateur de caractéristique selon les règles D&D 5e
 * @param score - Score de caractéristique (1-30)
 * @returns Modificateur (-5 à +10)
 */
export function calculateModifier(score: number | undefined): number {
  if (score === undefined || isNaN(score)) return 0;
  return Math.floor((score - 10) / 2);
}

/**
 * Calcule les points de vie maximums
 * @param level - Niveau du personnage
 * @param constitution - Score de Constitution
 * @param hasToughFeat - Possède le talent Robuste
 * @returns PV maximums
 */
export function calculateMaxHp(
  level: number, 
  constitution: number, 
  hasToughFeat: boolean
): number {
  const conMod = calculateModifier(constitution);
  // Niveau 1: 8 + mod Con, minimum 1
  const level1Hp = Math.max(1, 8 + conMod);
  // Niveaux suivants: moyenne (5) + mod Con, minimum 1 par niveau
  const otherLevelsHp = (level - 1) * Math.max(1, 5 + conMod);
  const baseHp = level1Hp + otherLevelsHp;
  // Bonus du talent Robuste : +2 PV par niveau
  const toughBonus = hasToughFeat ? level * 2 : 0;
  return baseHp + toughBonus;
}

/**
 * Calcule la capacité d'emport (charge légère)
 * En D&D 5e : Force × 7.5 kg = charge légère
 * @param strength - Score de Force
 * @returns Capacité en kg
 */
export function calculateCarryingCapacity(strength: number): number {
  return strength * 7.5;
}

/**
 * Détermine le niveau d'encrassement
 * @param currentWeight - Poids actuel transporté
 * @param strength - Score de Force
 * @returns Niveau d'encrassement
 */
export function getEncumbranceLevel(
  currentWeight: number,
  strength: number
): 'light' | 'medium' | 'heavy' | 'over' {
  const lightLimit = strength * 7.5;
  const mediumLimit = strength * 15;
  const heavyLimit = strength * 22.5;

  if (currentWeight <= lightLimit) return 'light';
  if (currentWeight <= mediumLimit) return 'medium';
  if (currentWeight <= heavyLimit) return 'heavy';
  return 'over';
}

/**
 * Calcule le nombre maximum de sorts préparables
 * @param wisdomModifier - Modificateur de Sagesse
 * @param level - Niveau du personnage
 * @returns Nombre de sorts préparables
 */
export function calculateMaxPreparedSpells(
  wisdomModifier: number,
  level: number
): number {
  return wisdomModifier + level;
}

/**
 * Calcule le bonus de maîtrise selon le niveau
 * @param level - Niveau du personnage
 * @returns Bonus de maîtrise (+2 à +6)
 */
export function calculateProficiencyBonus(level: number): number {
  if (level === undefined || isNaN(level) || level < 1) return 2;
  return Math.floor((level - 1) / 4) + 2;
}

/**
 * Calcule les utilisations maximum de Clerc de Guerre
 * @param wisdomModifier - Modificateur de Sagesse
 * @returns Nombre d'utilisations (minimum 1)
 */
export function calculateWarClericMaxUses(wisdomModifier: number): number {
  return Math.max(1, wisdomModifier);
}

/**
 * Calcule les utilisations maximum de Conduit Divin
 * @param level - Niveau du personnage
 * @returns Nombre d'utilisations (1, 2 ou 3)
 */
export function calculateChannelDivinityMaxUses(level: number): number {
  if (level >= 18) return 3;
  if (level >= 6) return 2;
  return 1;
}

/**
 * Calcule le bonus total pour un jet de sauvegarde
 * @param abilityScore - Score de caractéristique
 * @param isProficient - Maîtrise du jet
 * @param proficiencyBonus - Bonus de maîtrise
 * @returns Détails du calcul
 */
export function calculateSaveBonus(
  abilityScore: number,
  isProficient: boolean,
  proficiencyBonus: number
): {
  total: number;
  modifier: number;
  proficiency: number;
  isProficient: boolean;
} {
  const modifier = calculateModifier(abilityScore);
  const profBonus = isProficient ? proficiencyBonus : 0;

  return {
    total: modifier + profBonus,
    modifier,
    proficiency: profBonus,
    isProficient,
  };
}

/**
 * Calcule les dégâts après application des PV temporaires
 * @param damage - Dégâts bruts
 * @param currentHp - PV actuels
 * @param tempHp - PV temporaires
 * @returns Nouveaux PV et PV temporaires
 */
export function applyDamage(
  damage: number,
  currentHp: number,
  tempHp: number
): { newHp: number; newTempHp: number; damageTaken: number } {
  let remainingDamage = damage;

  // Les dégâts retirent d'abord les PV temporaires
  const newTempHp = Math.max(0, tempHp - remainingDamage);
  remainingDamage = Math.max(0, remainingDamage - tempHp);

  // Puis les PV normaux
  const newHp = Math.max(0, currentHp - remainingDamage);

  return {
    newHp,
    newTempHp,
    damageTaken: damage,
  };
}

/**
 * Calcule les PV après soin
 * @param healAmount - Montant des soins
 * @param currentHp - PV actuels
 * @param maxHp - PV maximums
 * @returns Nouveaux PV
 */
export function applyHealing(
  healAmount: number,
  currentHp: number,
  maxHp: number
): number {
  return Math.min(maxHp, currentHp + healAmount);
}

/**
 * Vérifie si le personnage est conscient
 * @param currentHp - PV actuels
 * @returns true si conscient (PV > 0)
 */
export function isConscious(currentHp: number): boolean {
  return currentHp > 0;
}

/**
 * Vérifie si le personnage est stable (0 PV mais pas mort)
 * @param currentHp - PV actuels
 * @returns true si stable
 */
export function isStable(currentHp: number): boolean {
  return currentHp === 0;
}
