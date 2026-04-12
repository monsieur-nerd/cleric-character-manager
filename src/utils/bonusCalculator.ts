/**
 * Service de calcul des bonus pour le Cleric Character Manager
 * 
 * Ce fichier centralise tous les calculs de bonus provenant de :
 * - Talents (Feats)
 * - Capacités de classe
 * - Capacités de domaine
 */

import type { Character, EquipmentItem } from '@/types';

// ============================================
// TYPES
// ============================================

export interface BonusBreakdown {
  base: number;
  bonuses: {
    source: string;
    value: number;
    description: string;
  }[];
  total: number;
}

// ============================================
// HELPERS
// ============================================

function hasFeat(character: Character, featId: string): boolean {
  return character.feats?.includes(featId) ?? false;
}

function hasDomainAbility(character: Character, domainId: string, minLevel: number): boolean {
  return character.domain?.id === domainId && character.level >= minLevel;
}

function getAbilityModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

// ============================================
// CALCULS DE SOINS (HEALING)
// ============================================

/**
 * Vérifie si le personnage a le domaine de la vie (Disciple de la vie)
 */
export function isDiscipleOfLifeDomain(domainId: string | undefined): boolean {
  return domainId === 'life';
}

/**
 * Interface pour le résultat simplifié de calcul de soin
 */
export interface SimpleHealingBonusResult {
  totalBonus: number;
  breakdown: string[];
}

/**
 * Calcule le bonus aux soins de manière simplifiée (pour affichage dans les modals)
 * @param spellLevel Niveau du sort
 * @param characterLevel Niveau du personnage (pas utilisé pour Disciple de la vie)
 * @param isDiscipleOfLifeDomain Si le personnage a le domaine de la vie
 * @param isBlessedHealer Si le personnage a la capacité Bénie par la vie (niveau 6)
 */
export function calculateHealingBonusSimple(
  spellLevel: number,
  characterLevel: number,
  isDiscipleOfLifeDomain: boolean,
  isBlessedHealer: boolean
): SimpleHealingBonusResult {
  const result: SimpleHealingBonusResult = { totalBonus: 0, breakdown: [] };
  
  if (isDiscipleOfLifeDomain && spellLevel > 0) {
    const bonus = 2 + spellLevel;
    result.totalBonus += bonus;
    result.breakdown.push(`Disciple de la vie: +${bonus}`);
  }
  
  if (isBlessedHealer) {
    const bonus = 3 + spellLevel;
    result.totalBonus += bonus;
    result.breakdown.push(`Bénie par la vie: +${bonus}`);
  }
  
  return result;
}

/**
 * Calcule le bonus aux soins d'un sort
 * Prend en compte :
 * - Modificateur de Sagesse (base)
 * - Disciple de la vie (Domaine Vie niveau 1) : +2 + niveau du sort
 */
export function calculateHealingBonus(
  character: Character,
  spellLevel: number
): BonusBreakdown {
  const base = getAbilityModifier(character.wisdom);
  const bonuses: BonusBreakdown['bonuses'] = [];

  // Disciple de la vie (Domaine Vie niveau 1)
  if (hasDomainAbility(character, 'life', 1)) {
    const lifeBonus = 2 + spellLevel;
    bonuses.push({
      source: 'Disciple de la vie',
      value: lifeBonus,
      description: `+2 + niveau du sort (${spellLevel})`
    });
  }

  const total = base + bonuses.reduce((sum, b) => sum + b.value, 0);

  return {
    base,
    bonuses,
    total
  };
}

/**
 * Calcule les soins reçus par le lanceur quand il soigne (Blessed Healer)
 * Domaine de la Vie niveau 6
 */
export function calculateBlessedHealerHealing(
  character: Character,
  spellLevel: number
): number {
  if (!hasDomainAbility(character, 'life', 6)) {
    return 0;
  }
  return 3 + spellLevel;
}

/**
 * Vérifie si les dés de soin doivent être maximisés (Suprême guérison)
 * Domaine de la Vie niveau 17
 */
export function isHealingMaximized(character: Character): boolean {
  return hasDomainAbility(character, 'life', 17);
}

/**
 * Vérifie si les soins sont maximisés pour une cible à 0 PV
 * Sentinelle du cercueil (Domaine Tombeau niveau 1)
 */
export function isHealingMaximizedForZeroHp(
  character: Character,
  targetCurrentHp: number
): boolean {
  if (!hasDomainAbility(character, 'grave', 1)) {
    return false;
  }
  return targetCurrentHp === 0;
}

// ============================================
// CALCULS DE DÉGÂTS (DAMAGE)
// ============================================

/**
 * Calcule le bonus aux dégâts d'une arme
 * Prend en compte :
 * - Frappe divine (niveau 8) : +1d8
 * - Bénédiction du forgeron (niveau 1) : +1
 */
export function calculateWeaponDamageBonus(
  character: Character,
  isOffHand: boolean = false
): { bonus: number; extraDice?: string; sources: string[] } {
  let bonus = 0;
  let extraDice: string | undefined;
  const sources: string[] = [];

  // Frappe divine (niveau 8) - tous les domaines de combat
  const domainsWithDivineStrike = ['war', 'life', 'nature', 'tempest', 'trickery', 'forge'];
  for (const domain of domainsWithDivineStrike) {
    if (hasDomainAbility(character, domain, 8)) {
      extraDice = '1d8';
      sources.push('Frappe divine');
      break;
    }
  }

  // Bénédiction du forgeron (+1 arme)
  if (hasDomainAbility(character, 'forge', 1)) {
    bonus += 1;
    sources.push('Bénédiction du forgeron (+1)');
  }

  return { bonus, extraDice, sources };
}

/**
 * Calcule le bonus aux dégâts de sort
 * Prend en compte :
 * - Potentiel de divin (+mod Sagesse) - Lumière/Connaissance/Tombeau niveau 8
 */
export function calculateSpellDamageBonus(
  character: Character,
  spellId: string
): number {
  // Vérifier si c'est un sort de dégâts
  const domainsWithPotentSpellcasting = ['light', 'knowledge', 'grave'];
  for (const domain of domainsWithPotentSpellcasting) {
    if (hasDomainAbility(character, domain, 8)) {
      return getAbilityModifier(character.wisdom);
    }
  }
  return 0;
}

/**
 * Vérifie si les dés de dégâts doivent être maximisés
 * Destructive Wrath (Domaine Tempête niveau 2) pour foudre/tonnerre
 */
export function areDamageDiceMaximized(
  character: Character,
  damageType: string
): boolean {
  if (!hasDomainAbility(character, 'tempest', 2)) {
    return false;
  }
  return damageType === 'foudre' || damageType === 'tonnerre';
}

// ============================================
// CALCULS DE CA (ARMOR CLASS)
// ============================================

export interface ACBonus {
  value: number;
  source: string;
  condition?: string;
}

/**
 * Calcule tous les bonus à la CA
 */
export function calculateACBonuses(
  character: Character,
  hasArmor: boolean,
  hasShield: boolean
): ACBonus[] {
  const bonuses: ACBonus[] = [];

  // Style de Combat : Défense (+1 si armure)
  if (hasFeat(character, 'style-combat') && hasArmor) {
    bonuses.push({
      value: 1,
      source: 'Style de Combat : Défense',
      condition: 'Porte une armure'
    });
  }

  // Bénédiction du forgeron (+1 armure)
  if (hasDomainAbility(character, 'forge', 1) && hasArmor) {
    bonuses.push({
      value: 1,
      source: 'Bénédiction du forgeron',
      condition: 'Armure bénie +1'
    });
  }

  return bonuses;
}

// ============================================
// CALCULS DE POINTS DE VIE (HIT POINTS)
// ============================================

/**
 * Calcule le bonus aux PV maximums
 * Robuste : +2 PV/niveau
 */
export function calculateMaxHpBonus(character: Character): number {
  if (!hasFeat(character, 'tough')) {
    return 0;
  }
  return 2 * character.level;
}

// ============================================
// CAPACITÉS SPÉCIALES (SPECIAL ABILITIES)
// ============================================

export interface SpecialAbility {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  uses: number;
  remainingUses: number;
  shortRest: boolean;
  longRest: boolean;
  isAvailable: boolean;
}

/**
 * Liste toutes les capacités spéciales disponibles pour le personnage
 */
export function getAvailableAbilities(character: Character): SpecialAbility[] {
  const abilities: SpecialAbility[] = [];

  // Conduit divin
  if (character.level >= 2) {
    const uses = character.level >= 6 ? 2 : 1;
    abilities.push({
      id: 'channel-divinity',
      name: 'Conduit divin',
      nameEn: 'Channel Divinity',
      description: 'Capacité spéciale selon le domaine',
      uses,
      remainingUses: uses, // À lier avec le state global
      shortRest: false,
      longRest: true,
      isAvailable: true
    });
  }

  // Capacités de domaine
  if (character.domain) {
    const domainAbilities = getDomainAbilities(character);
    abilities.push(...domainAbilities);
  }

  return abilities;
}

function getDomainAbilities(character: Character): SpecialAbility[] {
  const abilities: SpecialAbility[] = [];
  const domain = character.domain;

  if (!domain) return abilities;

  // Parcourir toutes les capacités de domaine définies
  const abilityLevels = [1, 2, 6, 8, 17] as const;
  
  for (const level of abilityLevels) {
    if (character.level >= level && domain.abilities?.[`level${level}` as const]) {
      const ability = domain.abilities[`level${level}` as const];
      abilities.push({
        id: `${domain.id}-level${level}`,
        name: ability.name,
        nameEn: ability.nameEn,
        description: ability.description,
        uses: ability.uses ?? 0,
        remainingUses: ability.uses ?? 0,
        shortRest: ability.shortRest ?? false,
        longRest: ability.longRest ?? false,
        isAvailable: character.level >= level
      });
    }
  }

  return abilities;
}

// ============================================
// RÉSUMÉ DES BONUS ACTIFS
// ============================================

export interface ActiveBonusesSummary {
  ac: ACBonus[];
  damage: { source: string; value: string }[];
  healing: { source: string; value: string }[];
  hp: { source: string; value: number }[];
}

/**
 * Génère un résumé de tous les bonus actifs pour le personnage
 * Utile pour l'affichage dans l'interface
 */
export function getActiveBonusesSummary(character: Character): ActiveBonusesSummary {
  const summary: ActiveBonusesSummary = {
    ac: [],
    damage: [],
    healing: [],
    hp: []
  };

  // CA
  if (hasFeat(character, 'style-combat')) {
    summary.ac.push({ value: 1, source: 'Style de Combat : Défense', condition: 'Avec armure' });
  }

  // Dégâts
  const weaponBonus = calculateWeaponDamageBonus(character);
  if (weaponBonus.extraDice) {
    summary.damage.push({ source: weaponBonus.sources[0] || 'Frappe divine', value: `+${weaponBonus.extraDice}` });
  }

  // Soins
  if (hasDomainAbility(character, 'life', 1)) {
    summary.healing.push({ source: 'Disciple de la vie', value: '+2 + niveau du sort' });
  }

  // PV
  const hpBonus = calculateMaxHpBonus(character);
  if (hpBonus > 0) {
    summary.hp.push({ source: 'Robuste', value: hpBonus });
  }

  return summary;
}
