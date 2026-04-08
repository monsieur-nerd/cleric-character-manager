/**
 * Configuration du personnage : Imildar Souffle-Tempête
 * 
 * Ce fichier contient toutes les informations spécifiques au personnage.
 * Pour créer une version générique, il suffira de remplacer ce fichier
 * par une version avec des valeurs par défaut neutres.
 */

import type { Character, EquipmentItem, SpellPreset } from '@/types';

// ============================================
// IDENTITÉ
// ============================================
export const CHARACTER_IDENTITY = {
  name: 'Imildar Souffle-Tempête',
  class: 'cleric' as const,
  subclass: 'war' as const,
  level: 5,
  deity: 'torm', // ID du dieu vénéré
  domain: 'war', // ID du domaine
  
  // Description physique
  age: 28,
  height: '1,75m',
  description: 'Clerc de guerre de Torm, dévoué à la protection des innocents et à la lutte contre les forces du mal.',
  
  // Avatar (URL ou null)
  avatar: null as string | null,
};

// ============================================
// CARACTÉRISTIQUES
// ============================================
export const CHARACTER_ABILITIES = {
  strength: 14,      // Force
  dexterity: 10,     // Dextérité
  constitution: 10,  // Constitution
  intelligence: 8,   // Intelligence
  wisdom: 16,        // Sagesse (principale pour clerc)
  charisma: 13,      // Charisme
};

// ============================================
// COMPÉTENCES MAÎTRISÉES (IDs)
// ============================================
export const MASTERED_SKILLS = [
  'religion',      // Maîtrise de classe (clerc)
  'medecine',      // Maîtrise de classe (clerc)
  'athletisme',    // Choix libre
  'intimidation',  // Choix libre
];

// ============================================
// TALENTS (FEATS) - IDs
// ============================================
export const CHARACTER_FEATS: string[] = [
  // Exemples : 'war-caster', 'shield-master', 'sentinel'
  // À remplir selon les talents choisis
];

// ============================================
// PRÉRÉGLAGES DE SORTS
// ============================================
export const SPELL_PRESETS: SpellPreset[] = [
  {
    id: 'default',
    name: 'Préparation standard',
    icon: '⚔️',
    description: 'Sorts de base pour aventure quotidienne',
    spellIds: [
      // Tours de magie
      'sacre',
      'illumination',
      'guidance',
      'resistance',
      // Niveau 1
      'bless',           // Bénédiction
      'cure-wounds',     // Soins
      'shield-of-faith', // Bouclier de foi
      'divine-favor',    // Faveur divine
      // Niveau 2
      'spiritual-weapon', // Arme spirituelle
      'aid',              // Aide
      'lesser-restoration', // Restauration inférieure
      'hold-person',      // Immobiliser un humanoïde
      // Niveau 3
      'spiritual-guardians', // Gardiens spirituels
      'revivify',            // Réanimation
      'dispel-magic',        // Dissipation de la magie
    ],
    isDefault: true,
  },
  {
    id: 'combat',
    name: 'Mode Combat',
    icon: '⚔️',
    description: 'Optimisé pour les combats difficiles',
    spellIds: [
      'sacre',
      'guidance',
      'bless',
      'shield-of-faith',
      'divine-favor',
      'spiritual-weapon',
      'aid',
      'spiritual-guardians',
      'revivify',
    ],
  },
  {
    id: 'exploration',
    name: 'Exploration',
    icon: '🗺️',
    description: 'Pour explorer et survivre en milieu hostile',
    spellIds: [
      'illumination',
      'guidance',
      'resistance',
      'detect-magic',      // Détection de la magie
      'identify',          // Identification
      'prayer-of-healing', // Prière de soins
      'locate-object',     // Localiser un objet
      'speak-with-dead',   // Communication avec les morts
    ],
  },
  {
    id: 'undead',
    name: 'Anti-Morts-Vivants',
    icon: '💀',
    description: 'Spécialisé contre les morts-vivants',
    spellIds: [
      'sacre',
      'guidance',
      'protection-from-evil', // Protection contre le mal
      'detect-evil',          // Détection du mal
      'prayer-of-healing',
      'lesser-restoration',
      'dispel-magic',
      'revivify',
    ],
  },
];

// ============================================
// ÉQUIPEMENT DE DÉPART
// ============================================
export const STARTING_EQUIPMENT: Partial<EquipmentItem>[] = [
  // Armes
  {
    id: 'morgenstern',
    name: 'Morgenstern',
    type: 'Arme',
    description: 'Arme de corps à corps contondante. Une tête de clous sur une manche en bois.',
    quantity: 1,
    unitPrice: 10,
    totalPrice: 10,
    unitWeight: 2,
    totalWeight: 2,
    isCarried: true,
    isEquipped: true,
    damage: '1d8',
    damageType: 'contondants',
    weaponProperties: [],
  },
  {
    id: 'dague',
    name: 'Dague',
    type: 'Arme',
    description: 'Arme légère et polyvalente.',
    quantity: 1,
    unitPrice: 2,
    totalPrice: 2,
    unitWeight: 0.5,
    totalWeight: 0.5,
    isCarried: true,
    isEquipped: false,
    damage: '1d4',
    damageType: 'perforants',
    weaponProperties: ['Finesse', 'Légère', 'Lancer (6/18)'],
  },
  // Armure
  {
    id: 'cuir-cloute',
    name: 'Armure de cuir clouté',
    type: 'Armure',
    description: 'Armure légère en cuir renforcé de clous métalliques.',
    quantity: 1,
    unitPrice: 45,
    totalPrice: 45,
    unitWeight: 6.5,
    totalWeight: 6.5,
    isCarried: true,
    isEquipped: true,
    armorClass: 12,
    armorType: 'légère',
  },
  // Bouclier
  {
    id: 'bouclier-bois',
    name: 'Bouclier en bois',
    type: 'Bouclier',
    description: 'Bouclier rond en bois renforcé de fer.',
    quantity: 1,
    unitPrice: 10,
    totalPrice: 10,
    unitWeight: 3,
    totalWeight: 3,
    isCarried: true,
    isEquipped: true,
    armorClass: 2,
    armorType: 'bouclier',
  },
  // Équipement d'aventure
  {
    id: 'sac-dos',
    name: 'Sac à dos',
    type: 'Sacs / Étuis',
    description: '',
    quantity: 1,
    unitPrice: 2,
    totalPrice: 2,
    unitWeight: 2.5,
    totalWeight: 2.5,
    isCarried: true,
  },
  {
    id: 'sac-couchage',
    name: 'Sac de couchage',
    type: 'Équipement aventure',
    description: '',
    quantity: 1,
    unitPrice: 1,
    totalPrice: 1,
    unitWeight: 3.5,
    totalWeight: 3.5,
    isCarried: true,
  },
  {
    id: 'gamelle',
    name: 'Gamelle',
    type: 'Récipients',
    description: '',
    quantity: 1,
    unitPrice: 0.2,
    totalPrice: 0.2,
    unitWeight: 0.5,
    totalWeight: 0.5,
    isCarried: true,
  },
  {
    id: 'corde-chanvre',
    name: 'Corde en chanvre (15m)',
    type: 'Escalade',
    description: '',
    quantity: 1,
    unitPrice: 1,
    totalPrice: 1,
    unitWeight: 5,
    totalWeight: 5,
    isCarried: true,
  },
  {
    id: 'rations-5',
    name: 'Rations (5 jours)',
    type: 'Consommable',
    description: '',
    quantity: 5,
    unitPrice: 0.5,
    totalPrice: 2.5,
    unitWeight: 1,
    totalWeight: 5,
    isCarried: true,
  },
  {
    id: 'gourde',
    name: 'Gourde',
    type: 'Récipients',
    description: '',
    quantity: 1,
    unitPrice: 0.2,
    totalPrice: 0.2,
    unitWeight: 2.5,
    totalWeight: 2.5,
    isCarried: true,
  },
  {
    id: 'torches-10',
    name: 'Torches (10)',
    type: 'Éclairage',
    description: '',
    quantity: 10,
    unitPrice: 0.01,
    totalPrice: 0.1,
    unitWeight: 0.5,
    totalWeight: 5,
    isCarried: true,
  },
  {
    id: 'briquet-a-silex',
    name: 'Briquet à silex',
    type: 'Éclairage',
    description: '',
    quantity: 1,
    unitPrice: 0.5,
    totalPrice: 0.5,
    unitWeight: 0.5,
    totalWeight: 0.5,
    isCarried: true,
  },
  // Composantes de sorts importantes
  {
    id: 'diamant-revigorer',
    name: 'Diamant (pour Revigorer)',
    type: 'Composante',
    description: 'Diamant d\'une valeur de 300 po nécessaire pour le sort Revigorer',
    quantity: 2,
    unitPrice: 300,
    totalPrice: 600,
    unitWeight: 0,
    totalWeight: 0,
    isCarried: true,
    isComponent: true,
    relatedSpells: ['revivify'],
  },
  {
    id: 'encens',
    name: 'Encens',
    type: 'Composante',
    description: 'Pour les sorts de divination',
    quantity: 5,
    unitPrice: 0.5,
    totalPrice: 2.5,
    unitWeight: 0,
    totalWeight: 0,
    isCarried: true,
    isComponent: true,
  },
];

// ============================================
// ÉTAT INITIAL JOURNALIER
// ============================================
export const INITIAL_DAILY_STATE = {
  preparedSpellIds: [] as string[], // Sera rempli par le préréglage par défaut
  currentHp: null as number | null, // null = utiliser maxHp
  tempHp: 0,
  activeConcentration: null as string | null,
  usedAbilities: {
    warCleric: 0,
    channelDivinity: 0,
  },
  usedSpellSlots: {
    1: 0,
    2: 0,
    3: 0,
  } as Record<number, number>,
};

// ============================================
// FONCTION POUR CRÉER LE PERSONNAGE COMPLET
// ============================================
export function createInitialCharacter(): Partial<Character> {
  return {
    name: CHARACTER_IDENTITY.name,
    class: CHARACTER_IDENTITY.class,
    subclass: CHARACTER_IDENTITY.subclass,
    level: CHARACTER_IDENTITY.level,
    avatar: CHARACTER_IDENTITY.avatar,
    
    // Caractéristiques
    strength: CHARACTER_ABILITIES.strength,
    dexterity: CHARACTER_ABILITIES.dexterity,
    constitution: CHARACTER_ABILITIES.constitution,
    intelligence: CHARACTER_ABILITIES.intelligence,
    wisdom: CHARACTER_ABILITIES.wisdom,
    charisma: CHARACTER_ABILITIES.charisma,
    wisdomModifier: Math.floor((CHARACTER_ABILITIES.wisdom - 10) / 2),
    
    // Compétences et talents
    masteredSkills: MASTERED_SKILLS,
    feats: CHARACTER_FEATS,
    
    // Métadonnées
    description: CHARACTER_IDENTITY.description,
    age: CHARACTER_IDENTITY.age,
    height: CHARACTER_IDENTITY.height,
  };
}
