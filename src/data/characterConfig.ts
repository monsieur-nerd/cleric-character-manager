/**
 * Configuration du personnage : Imildar Souffle-Tempête
 * 
 * Ce fichier contient toutes les informations spécifiques au personnage.
 * Pour créer une version générique, il suffira de remplacer ce fichier
 * par une version avec des valeurs par défaut neutres.
 */

import type { Character, EquipmentItem, SpellPreset, Background } from '@/types';
import { BACKGROUNDS } from '@/types';

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
  race: 'Humain',
  alignment: 'Neutre Bon',
  age: 20,
  height: '1,78m',
  weight: 78,
  description: 'Clerc de guerre de Torm, dévoué à la protection des innocents et à la lutte contre les forces du mal.',
  
  // Avatar (URL ou null) - préfixé pour GitHub Pages
  avatar: '/cleric-character-manager/images/clerc_de_Torm.png' as string | null,
  
  // Langues parlées
  languages: ['Commun', 'Illiskien', 'Drakonique', 'Elfe', 'Nain'] as string[],
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
// Note: Un clerc choisit 2 compétences parmi: Histoire, Perspicacité, Médecine, Persuasion, Religion
// Ici: Médecine, Perspicacité, Persuasion, Religion (4 compétences - origine historique ou autre bonus possible)
export const MASTERED_SKILLS = [
  'religion',      // INT - Connaissance des dieux, rites religieux
  'medicine',      // SAG - Stabiliser, diagnostiquer, soigner
  'insight',       // SAG - Détecter les mensonges, lire les intentions
  'persuasion',    // CHA - Négocier, convaincre, charmer
];

// ============================================
// TALENTS (FEATS) - IDs
// ============================================
export const CHARACTER_FEATS: string[] = [
  'deux-armes',  // Style de Combat : Combat à deux armes
];

// ============================================
// BACKGROUND
// ============================================
export const CHARACTER_BACKGROUND = BACKGROUNDS.find(b => b.id === 'acolyte') || BACKGROUNDS[0];

// ============================================
// TRAITS DE BACKGROUND (ACOLYTE DE TORM)
// ============================================
export const BACKGROUND_TRAITS = [
  {
    id: 'ceremonie',
    name: 'Cérémonie',
    description: "En tant qu'acolyte de Torm, vous pouvez demander des soins gratuits et un abri dans n'importe quel temple de Torm ou de divinités alliées.",
    effect: 'Soins gratuits et hébergement dans les temples de Torm et alliés.',
    type: 'background' as const,
  },
  {
    id: 'abris-divin',
    name: 'Abris du Divin',
    description: 'Les fidèles de Torm vous reconnaissent comme un servant de la foi et vous offrent leur aide. Les prêtres de divinités alliées vous considèrent comme un allié.',
    effect: 'Reconnu par les fidèles de Torm, accès aux ressources ecclésiastiques.',
    type: 'background' as const,
  },
  {
    id: 'maitrise-armes-courantes',
    name: 'Maîtrise des armes courantes',
    description: "En tant que clerc de guerre, vous êtes formé à l'utilisation de toutes les armes courantes.",
    effect: 'Maîtrise de toutes les armes courantes (masses, épées courtes, arcs, etc.).',
    type: 'class' as const,
  },
  {
    id: 'style-combat',
    name: 'Style de Combat : Défense',
    description: 'Vous avez adopté un style de combat défensif qui vous confère un bonus de +1 à la CA tant que vous portez une armure.',
    effect: '+1 à la CA en portant une armure (pas un bouclier requis).',
    type: 'class' as const,
  },
  {
    id: 'deux-armes',
    name: 'Style de Combat : Combat à deux armes',
    description: 'Lorsque vous combattez avec deux armes, vous ajoutez votre modificateur de caractéristique aux dégâts de la deuxième attaque.',
    effect: 'Modificateur de caractéristique aux dégâts de l\'arme secondaire.',
    type: 'class' as const,
  },
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
      'flamme-sacrée',
      'lumière',
      'assistance',
      'résistance',
      // Niveau 1
      'bénédiction',
      'soins',
      'bouclier-de-la-foi',
      'faveur-divine',
      // Niveau 2
      'arme-spirituelle',
      'aide',
      'restauration-partielle',
      'immobilisation-de-personne',
      // Niveau 3
      'esprits-gardiens',
      'retour-à-la-vie',
      'dissipation-de-la-magie',
    ],
    isDefault: true,
  },
  {
    id: 'combat',
    name: 'Mode combat',
    icon: '⚔️',
    description: 'Optimisé pour les combats difficiles',
    spellIds: [
      'flamme-sacrée',
      'assistance',
      'bénédiction',
      'bouclier-de-la-foi',
      'faveur-divine',
      'arme-spirituelle',
      'aide',
      'esprits-gardiens',
      'retour-à-la-vie',
    ],
  },
  {
    id: 'exploration',
    name: 'Exploration',
    icon: '🗺️',
    description: 'Pour explorer et survivre en milieu hostile',
    spellIds: [
      'lumière',
      'assistance',
      'résistance',
      'détection-de-la-magie',
      'identification',
      'prière-de-guérison',
      'localisation-d-objet',
      'communication-avec-les-morts',
    ],
  },
  {
    id: 'undead',
    name: 'Anti-Morts-Vivants',
    icon: '💀',
    description: 'Spécialisé contre les morts-vivants',
    spellIds: [
      'flamme-sacrée',
      'assistance',
      'protection-contre-le-mal-et-le-bien',
      'détection-du-mal-et-du-bien',
      'prière-de-guérison',
      'restauration-partielle',
      'dissipation-de-la-magie',
      'retour-à-la-vie',
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
    relatedSpells: ['retour-à-la-vie'],
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
  // Nouveaux équipements
  {
    id: 'demi-plate',
    name: 'Armure de demi-plate',
    type: 'Armure',
    description: 'Armure intermédiaire composée de plaques de métal couvrant le torse. Désavantage aux tests de Discrétion.',
    quantity: 1,
    unitPrice: 750,
    totalPrice: 750,
    unitWeight: 20,
    totalWeight: 20,
    isCarried: false,
    isEquipped: false,
    armorClass: 15,
    armorType: 'intermédiaire',
    stealthDisadvantage: true,
    strengthRequired: 13,
  },
  {
    id: 'focalisateur-arcanique',
    name: 'Focalisateur arcanique',
    type: 'Composante',
    description: 'Un bâton, une baguette, un bâtonnet ou un autre objet similaire conçu pour canaliser la puissance des sorts de clerc. Peut être utilisé comme focalisateur pour les sorts nécessitant une composante matérielle.',
    quantity: 1,
    unitPrice: 5,
    totalPrice: 5,
    unitWeight: 0.5,
    totalWeight: 0.5,
    isCarried: true,
    isComponent: true,
  },
  {
    id: 'symbole-sacre',
    name: 'Symbole sacré',
    type: 'Composante',
    description: 'Représentation du pouvoir divin de Torm. Permet de repousser les morts-vivants (Action : chaque mort-vivant dans 9m doit réussir un JS de Sagesse ou fuir). Peut être utilisé comme focalisateur pour les sorts.',
    quantity: 1,
    unitPrice: 5,
    totalPrice: 5,
    unitWeight: 0.5,
    totalWeight: 0.5,
    isCarried: true,
    isComponent: true,
  },
  {
    id: 'livre-priere',
    name: 'Livre de prière',
    type: 'Équipement aventure',
    description: 'Recueil de prières et de textes sacrés de Torm contenant les rituels et enseignements de la foi.',
    quantity: 1,
    unitPrice: 5,
    totalPrice: 5,
    unitWeight: 1,
    totalWeight: 1,
    isCarried: true,
  },
  {
    id: 'batons-encens',
    name: 'Bâtons d\'encens',
    type: 'Composante',
    description: 'Bâtons d\'encens parfumés utilisés pour les rituels religieux et certains sorts de divination.',
    quantity: 5,
    unitPrice: 0.2,
    totalPrice: 1,
    unitWeight: 0.1,
    totalWeight: 0.5,
    isCarried: true,
    isComponent: true,
  },
  {
    id: 'vetements-ceremonie',
    name: 'Vêtements de cérémonie',
    type: 'Équipement aventure',
    description: 'Tenue religieuse formelle incluant des habits de qualité ornés du symbole de Torm.',
    quantity: 1,
    unitPrice: 10,
    totalPrice: 10,
    unitWeight: 2,
    totalWeight: 2,
    isCarried: true,
  },
  {
    id: 'paquetage-ecclesiaste',
    name: 'Paquetage d\'ecclésiaste',
    type: 'Équipement aventure',
    description: 'Contient : sac à dos, couverture, 10 bougies, 10 rations, outre, boîte à amadou, pot de graisse.',
    quantity: 1,
    unitPrice: 12,
    totalPrice: 12,
    unitWeight: 12,
    totalWeight: 12,
    isCarried: false,
  },
  {
    id: 'bougies',
    name: 'Bougies',
    type: 'Éclairage',
    description: 'Bougies de cire qui éclairent dans un rayon de 1,5m pendant 1 heure.',
    quantity: 10,
    unitPrice: 0.01,
    totalPrice: 0.1,
    unitWeight: 0,
    totalWeight: 0,
    isCarried: true,
  },
  {
    id: 'tronc-offrandes',
    name: 'Tronc à offrandes',
    type: 'Équipement aventure',
    description: 'Petit coffre en bois verrouillable destiné à collecter les dons pour le temple de Torm.',
    quantity: 1,
    unitPrice: 5,
    totalPrice: 5,
    unitWeight: 2,
    totalWeight: 2,
    isCarried: true,
  },
  {
    id: 'blocs-encens',
    name: 'Blocs d\'encens',
    type: 'Composante',
    description: 'Blocs d\'encens de qualité supérieure pour les cérémonies importantes.',
    quantity: 2,
    unitPrice: 2,
    totalPrice: 4,
    unitWeight: 0.5,
    totalWeight: 1,
    isCarried: true,
    isComponent: true,
  },
  {
    id: 'encensoir',
    name: 'Encensoir',
    type: 'Équipement aventure',
    description: 'Réceptacle métallique suspendu utilisé pour brûler de l\'encens lors des cérémonies religieuses.',
    quantity: 1,
    unitPrice: 10,
    totalPrice: 10,
    unitWeight: 1,
    totalWeight: 1,
    isCarried: true,
  },
  {
    id: 'rations',
    name: 'Rations (2 jours)',
    type: 'Consommable',
    description: 'Nourriture séchée et provisions pour survivre en voyage.',
    quantity: 2,
    unitPrice: 0.5,
    totalPrice: 1,
    unitWeight: 1,
    totalWeight: 2,
    isCarried: true,
  },
  {
    id: 'outre',
    name: 'Outre',
    type: 'Récipients',
    description: 'Contenant en cuir pouvant contenir jusqu\'à 4 litres d\'eau ou de vin.',
    quantity: 1,
    unitPrice: 0.2,
    totalPrice: 0.2,
    unitWeight: 2.5,
    totalWeight: 2.5,
    isCarried: true,
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
    4: 0,
    5: 0,
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
    background: CHARACTER_BACKGROUND,
    
    // Métadonnées
    description: CHARACTER_IDENTITY.description,
    race: CHARACTER_IDENTITY.race,
    alignment: CHARACTER_IDENTITY.alignment,
    age: CHARACTER_IDENTITY.age,
    height: CHARACTER_IDENTITY.height,
    weight: CHARACTER_IDENTITY.weight,
  };
}
