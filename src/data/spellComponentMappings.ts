/**
 * Mapping complet des composants de sorts pour Prêtre niveaux 0-9
 * Inclut également les composants de Mage pour le multiclassage
 */
import type { SpellComponentMapping } from '@/types';

// ============================================
// SORTS DE PRÊTRE - NIVEAU 0 (Tours de magie)
// ============================================
export const clericLevel0Components: SpellComponentMapping[] = [
  {
    spellId: 'mending',
    spellName: 'Réparation',
    spellLevel: 0,
    classSource: 'cleric',
    itemId: 'deux-aimants',
    itemName: 'Deux aimants',
    quantity: 1,
    consumed: false,
    price: 1,
    priority: 'low',
  },
  {
    spellId: 'resistance',
    spellName: 'Résistance',
    spellLevel: 0,
    classSource: 'cleric',
    itemId: 'cape-miniature',
    itemName: 'Cape miniature',
    quantity: 1,
    consumed: false,
    price: 1,
    priority: 'low',
  },
];

// ============================================
// SORTS DE PRÊTRE - NIVEAU 1
// ============================================
export const clericLevel1Components: SpellComponentMapping[] = [
  {
    spellId: 'bless',
    spellName: 'Bénédiction',
    spellLevel: 1,
    classSource: 'cleric',
    itemId: 'eau-bénite',
    itemName: 'Eau bénite',
    quantity: 1,
    consumed: false,
    price: 5,
    priority: 'high',
  },
  {
    spellId: 'detect-poison',
    spellName: 'Détection du poison',
    spellLevel: 1,
    classSource: 'cleric',
    itemId: 'feuille-d-if',
    itemName: 'Feuille d\'if',
    quantity: 1,
    consumed: false,
    price: 1,
    priority: 'low',
  },
  {
    spellId: 'bane',
    spellName: 'Fléau',
    spellLevel: 1,
    classSource: 'cleric',
    itemId: 'goutte-de-sang',
    itemName: 'Goutte de sang',
    quantity: 1,
    consumed: false,
    price: 1,
    priority: 'low',
  },
  {
    spellId: 'sanctuary',
    spellName: 'Sanctuaire',
    spellLevel: 1,
    classSource: 'cleric',
    itemId: 'miroir-argent',
    itemName: 'Miroir en argent',
    quantity: 1,
    consumed: false,
    price: 25,
    priority: 'medium',
  },
];

// ============================================
// SORTS DE PRÊTRE - NIVEAU 2
// ============================================
export const clericLevel2Components: SpellComponentMapping[] = [
  {
    spellId: 'aid',
    spellName: 'Aide',
    spellLevel: 2,
    classSource: 'cleric',
    itemId: 'bout-vetement-blanc',
    itemName: 'Bout de vêtement blanc',
    quantity: 1,
    consumed: false,
    price: 1,
    priority: 'low',
  },
  {
    spellId: 'enhance-ability',
    spellName: 'Amélioration de caractéristique',
    spellLevel: 2,
    classSource: 'cleric',
    itemId: 'poil-plume-bete',
    itemName: 'Poil ou plume de bête',
    quantity: 1,
    consumed: false,
    price: 1,
    priority: 'low',
  },
  {
    spellId: 'augury',
    spellName: 'Augure',
    spellLevel: 2,
    classSource: 'cleric',
    itemId: 'batonnets-encrates',
    itemName: 'Bâtonnets encrassés',
    quantity: 1,
    consumed: false,
    price: 25,
    priority: 'low',
  },
  {
    spellId: 'hold-person',
    spellName: 'Immobilisation de personne',
    spellLevel: 2,
    classSource: 'cleric',
    itemId: 'fer-droit',
    itemName: 'Morceau de fer droit',
    quantity: 1,
    consumed: false,
    price: 1,
    priority: 'low',
  },
  {
    spellId: 'warding-bond',
    spellName: 'Lien de protection',
    spellLevel: 2,
    classSource: 'cleric',
    itemId: 'anneaux-platine',
    itemName: 'Anneaux de platine (paire)',
    quantity: 2,
    consumed: false,
    price: 100,
    priority: 'medium',
  },
  {
    spellId: 'locate-object',
    spellName: 'Localisation d\'objet',
    spellLevel: 2,
    classSource: 'cleric',
    itemId: 'brindille-sourcier',
    itemName: 'Brindille de sourcier',
    quantity: 1,
    consumed: false,
    price: 1,
    priority: 'low',
  },
  // Préservation des morts - Composants multiples : Sel ET pièces de cuivre
  {
    spellId: 'gentle-repose',
    spellName: 'Préservation des morts',
    spellLevel: 2,
    classSource: 'cleric',
    itemId: 'sel',
    itemName: 'Sel',
    quantity: 1,
    consumed: false,
    price: 0.5,
    priority: 'low',
  },
  {
    spellId: 'gentle-repose',
    spellName: 'Préservation des morts',
    spellLevel: 2,
    classSource: 'cleric',
    itemId: 'pieces-cuivre',
    itemName: 'Pièces de cuivre',
    quantity: 1,
    consumed: false,
    price: 0.5,
    priority: 'low',
  },
];

// ============================================
// SORTS DE PRÊTRE - NIVEAU 3
// ============================================
export const clericLevel3Components: SpellComponentMapping[] = [
  // Animation des morts - Composants multiples : Sang ET chair ET ossements
  {
    spellId: 'animate-dead',
    spellName: 'Animation des morts',
    spellLevel: 3,
    classSource: 'cleric',
    itemId: 'sang',
    itemName: 'Sang',
    quantity: 1,
    consumed: true,
    price: 1,
    priority: 'low',
  },
  {
    spellId: 'animate-dead',
    spellName: 'Animation des morts',
    spellLevel: 3,
    classSource: 'cleric',
    itemId: 'chair',
    itemName: 'Chair',
    quantity: 1,
    consumed: true,
    price: 2,
    priority: 'low',
  },
  {
    spellId: 'animate-dead',
    spellName: 'Animation des morts',
    spellLevel: 3,
    classSource: 'cleric',
    itemId: 'ossements',
    itemName: 'Ossements',
    quantity: 1,
    consumed: true,
    price: 2,
    priority: 'low',
  },
  // Cercle magique - Alternative : Eau bénite OU poudre d'argent
  {
    spellId: 'magic-circle',
    spellName: 'Cercle magique',
    spellLevel: 3,
    classSource: 'cleric',
    itemId: 'eau-bénite',
    itemName: 'Eau bénite',
    quantity: 1,
    consumed: true,
    price: 5,
    priority: 'high',
    alternativeGroupId: 'magic-circle-component',
    alternatives: [
      { itemId: 'poudre-argent', itemName: 'Poudre d\'argent', price: 100 },
    ],
  },
  {
    spellId: 'magic-circle',
    spellName: 'Cercle magique',
    spellLevel: 3,
    classSource: 'cleric',
    itemId: 'poudre-argent',
    itemName: 'Poudre d\'argent',
    quantity: 1,
    consumed: true,
    price: 100,
    priority: 'high',
    alternativeGroupId: 'magic-circle-component',
    alternatives: [
      { itemId: 'eau-bénite', itemName: 'Eau bénite', price: 5 },
    ],
  },
  {
    spellId: 'clairvoyance',
    spellName: 'Clairvoyance',
    spellLevel: 3,
    classSource: 'cleric',
    itemId: 'focale',
    itemName: 'Focale',
    quantity: 1,
    consumed: false,
    price: 100,
    priority: 'medium',
  },
  {
    spellId: 'speak-with-dead',
    spellName: 'Communication avec les morts',
    spellLevel: 3,
    classSource: 'cleric',
    itemId: 'encens-brulant',
    itemName: 'Encens brûlant',
    quantity: 1,
    consumed: true,
    price: 10,
    priority: 'medium',
  },
  {
    spellId: 'sending',
    spellName: 'Communication à distance',
    spellLevel: 3,
    classSource: 'cleric',
    itemId: 'filament-cuivre',
    itemName: 'Filament de cuivre',
    quantity: 1,
    consumed: false,
    price: 10,
    priority: 'medium',
  },
  {
    spellId: 'spirit-guardians',
    spellName: 'Esprits gardiens',
    spellLevel: 3,
    classSource: 'cleric',
    itemId: 'symbole-sacre',
    itemName: 'Symbole sacré',
    quantity: 1,
    consumed: false,
    price: 25,
    priority: 'high',
  },
  {
    spellId: 'glyph-of-warding',
    spellName: 'Glyphe de protection',
    spellLevel: 3,
    classSource: 'cleric',
    itemId: 'poudre-diamant-200po',
    itemName: 'Poudre de diamant (200 po)',
    quantity: 1,
    consumed: true,
    price: 200,
    priority: 'medium',
  },
  {
    spellId: 'tongues',
    spellName: 'Langues',
    spellLevel: 3,
    classSource: 'cleric',
    itemId: 'figurine-cire',
    itemName: 'Figurine de cire',
    quantity: 1,
    consumed: false,
    price: 5,
    priority: 'low',
  },
  {
    spellId: 'water-walk',
    spellName: 'Marche sur l\'eau',
    spellLevel: 3,
    classSource: 'cleric',
    itemId: 'liege',
    itemName: 'Liège',
    quantity: 1,
    consumed: false,
    price: 1,
    priority: 'low',
  },
  {
    spellId: 'revivify',
    spellName: 'Retour à la vie',
    spellLevel: 3,
    classSource: 'cleric',
    itemId: 'diamants-300po',
    itemName: 'Diamants d\'âme (300 po)',
    quantity: 1,
    consumed: true,
    price: 300,
    priority: 'critical',
  },
];

// ============================================
// SORTS DE PRÊTRE - NIVEAU 4
// ============================================
export const clericLevel4Components: SpellComponentMapping[] = [
  {
    spellId: 'confusion',
    spellName: 'Confusion',
    spellLevel: 4,
    classSource: 'cleric',
    itemId: 'noix-coco',
    itemName: 'Noix de coco',
    quantity: 1,
    consumed: false,
    price: 1,
    priority: 'low',
  },
  // Contrôle de l'eau - Composants multiples : Eau ET poussière
  {
    spellId: 'control-water',
    spellName: 'Contrôle de l\'eau',
    spellLevel: 4,
    classSource: 'cleric',
    itemId: 'eau',
    itemName: 'Eau',
    quantity: 1,
    consumed: false,
    price: 0.5,
    priority: 'medium',
  },
  {
    spellId: 'control-water',
    spellName: 'Contrôle de l\'eau',
    spellLevel: 4,
    classSource: 'cleric',
    itemId: 'poussiere',
    itemName: 'Poussière',
    quantity: 1,
    consumed: false,
    price: 0.5,
    priority: 'medium',
  },
  // Divination - Composants multiples : Encens ET offrande
  {
    spellId: 'divination',
    spellName: 'Divination',
    spellLevel: 4,
    classSource: 'cleric',
    itemId: 'encens',
    itemName: 'Encens',
    quantity: 1,
    consumed: true,
    price: 10,
    priority: 'high',
  },
  {
    spellId: 'divination',
    spellName: 'Divination',
    spellLevel: 4,
    classSource: 'cleric',
    itemId: 'offrande',
    itemName: 'Offrande',
    quantity: 1,
    consumed: true,
    price: 15,
    priority: 'high',
  },
  {
    spellId: 'freedom-of-movement',
    spellName: 'Liberté de mouvement',
    spellLevel: 4,
    classSource: 'cleric',
    itemId: 'cuir-tanne',
    itemName: 'Cuir tanné',
    quantity: 1,
    consumed: false,
    price: 5,
    priority: 'high',
  },
  // Insecte géant - Composants multiples : Miel ET ailes d'insecte
  {
    spellId: 'giant-insect',
    spellName: 'Insecte géant',
    spellLevel: 4,
    classSource: 'cleric',
    itemId: 'miel',
    itemName: 'Miel',
    quantity: 1,
    consumed: false,
    price: 0.5,
    priority: 'low',
  },
  {
    spellId: 'giant-insect',
    spellName: 'Insecte géant',
    spellLevel: 4,
    classSource: 'cleric',
    itemId: 'ailes-insecte',
    itemName: 'Ailes d\'insecte',
    quantity: 1,
    consumed: false,
    price: 0.5,
    priority: 'low',
  },
  // Terrain hallucinatoire - Composants multiples : Pierre ET brume
  {
    spellId: 'hallucinatory-terrain',
    spellName: 'Terrain hallucinatoire',
    spellLevel: 4,
    classSource: 'cleric',
    itemId: 'pierre',
    itemName: 'Pierre',
    quantity: 1,
    consumed: false,
    price: 2,
    priority: 'medium',
  },
  {
    spellId: 'hallucinatory-terrain',
    spellName: 'Terrain hallucinatoire',
    spellLevel: 4,
    classSource: 'cleric',
    itemId: 'brume',
    itemName: 'Brume',
    quantity: 1,
    consumed: false,
    price: 3,
    priority: 'medium',
  },
  {
    spellId: 'raise-dead',
    spellName: 'Rappel à la vie',
    spellLevel: 4,
    classSource: 'cleric',
    itemId: 'diamants-500po',
    itemName: 'Diamants de lumière (500 po)',
    quantity: 1,
    consumed: true,
    price: 500,
    priority: 'critical',
  },
];

// ============================================
// SORTS DE PRÊTRE - NIVEAU 5
// ============================================
export const clericLevel5Components: SpellComponentMapping[] = [
  {
    spellId: 'break-enchantment',
    spellName: 'Briser les enchantements',
    spellLevel: 5,
    classSource: 'cleric',
    itemId: 'poudre-perle',
    itemName: 'Poudre de perle',
    quantity: 1,
    consumed: true,
    price: 100,
    priority: 'high',
  },
  {
    spellId: 'flame-strike',
    spellName: 'Colonne de flamme',
    spellLevel: 5,
    classSource: 'cleric',
    itemId: 'poudre-soufre',
    itemName: 'Poudre de soufre',
    quantity: 1,
    consumed: false,
    price: 5,
    priority: 'medium',
  },
  // Communion - Composants multiples : Encens ET offrande
  {
    spellId: 'commune',
    spellName: 'Communion',
    spellLevel: 5,
    classSource: 'cleric',
    itemId: 'encens',
    itemName: 'Encens',
    quantity: 1,
    consumed: true,
    price: 10,
    priority: 'high',
  },
  {
    spellId: 'commune',
    spellName: 'Communion',
    spellLevel: 5,
    classSource: 'cleric',
    itemId: 'offrande',
    itemName: 'Offrande',
    quantity: 1,
    consumed: true,
    price: 15,
    priority: 'high',
  },
  // Dissipation du mal/bien - Composants multiples : Eau bénite ET argent
  {
    spellId: 'dispel-evil-good',
    spellName: 'Dissipation du mal/bien',
    spellLevel: 5,
    classSource: 'cleric',
    itemId: 'eau-bénite',
    itemName: 'Eau bénite',
    quantity: 1,
    consumed: false,
    price: 5,
    priority: 'high',
  },
  {
    spellId: 'dispel-evil-good',
    spellName: 'Dissipation du mal/bien',
    spellLevel: 5,
    classSource: 'cleric',
    itemId: 'argent',
    itemName: 'Argent',
    quantity: 1,
    consumed: false,
    price: 5,
    priority: 'high',
  },
  // Fléau d'insectes - Composants multiples : Poivre ET sable
  {
    spellId: 'insect-plague',
    spellName: 'Fléau d\'insectes',
    spellLevel: 5,
    classSource: 'cleric',
    itemId: 'poivre',
    itemName: 'Poivre',
    quantity: 1,
    consumed: false,
    price: 0.5,
    priority: 'low',
  },
  {
    spellId: 'insect-plague',
    spellName: 'Fléau d\'insectes',
    spellLevel: 5,
    classSource: 'cleric',
    itemId: 'sable',
    itemName: 'Sable',
    quantity: 1,
    consumed: false,
    price: 0.5,
    priority: 'low',
  },
  {
    spellId: 'raise-dead-long',
    spellName: 'Rappel des morts',
    spellLevel: 5,
    classSource: 'cleric',
    itemId: 'diamants-1000po',
    itemName: 'Diamants d\'infini (1000 po)',
    quantity: 1,
    consumed: true,
    price: 1000,
    priority: 'critical',
  },
  {
    spellId: 'geas',
    spellName: 'Quête',
    spellLevel: 5,
    classSource: 'cleric',
    itemId: 'platine',
    itemName: 'Platine',
    quantity: 1,
    consumed: false,
    price: 500,
    priority: 'medium',
  },
  // Scrutation - Composants multiples : Encens ET miroir
  {
    spellId: 'scrying',
    spellName: 'Scrutation',
    spellLevel: 5,
    classSource: 'cleric',
    itemId: 'encens',
    itemName: 'Encens',
    quantity: 1,
    consumed: true,
    price: 10,
    priority: 'medium',
  },
  {
    spellId: 'scrying',
    spellName: 'Scrutation',
    spellLevel: 5,
    classSource: 'cleric',
    itemId: 'miroir',
    itemName: 'Miroir',
    quantity: 1,
    consumed: false,
    price: 800,
    priority: 'medium',
  },
];

// ============================================
// SORTS DE PRÊTRE - NIVEAU 6
// ============================================
export const clericLevel6Components: SpellComponentMapping[] = [
  {
    spellId: 'blade-barrier',
    spellName: 'Barrière de lames',
    spellLevel: 6,
    classSource: 'cleric',
    itemId: 'couteaux-argent',
    itemName: 'Couteaux d\'argent',
    quantity: 1,
    consumed: false,
    price: 50,
    priority: 'medium',
  },
  {
    spellId: 'anti-magic-field',
    spellName: 'Champ antimagie',
    spellLevel: 6,
    classSource: 'cleric',
    itemId: 'fer-froid',
    itemName: 'Fer froid',
    quantity: 1,
    consumed: false,
    price: 5,
    priority: 'high',
  },
  {
    spellId: 'harm',
    spellName: 'Châtiment',
    spellLevel: 6,
    classSource: 'cleric',
    itemId: 'poudre-diamant-1000po',
    itemName: 'Poudre de diamant (1000 po)',
    quantity: 1,
    consumed: true,
    price: 1000,
    priority: 'critical',
  },
  {
    spellId: 'shadow-walk',
    spellName: 'Vision de l\'ombre',
    spellLevel: 6,
    classSource: 'cleric',
    itemId: 'encens-rare',
    itemName: 'Encens rare',
    quantity: 1,
    consumed: false,
    price: 200,
    priority: 'medium',
  },
  {
    spellId: 'heal',
    spellName: 'Guérison',
    spellLevel: 6,
    classSource: 'cleric',
    itemId: 'poudre-diamant-100po',
    itemName: 'Poudre de diamant (100 po)',
    quantity: 1,
    consumed: false,
    price: 100,
    priority: 'high',
  },
  // Interdiction - Composants multiples : Eau bénite ET herbes
  {
    spellId: 'forbiddance',
    spellName: 'Interdiction',
    spellLevel: 6,
    classSource: 'cleric',
    itemId: 'eau-bénite',
    itemName: 'Eau bénite',
    quantity: 1,
    consumed: true,
    price: 5,
    priority: 'high',
  },
  {
    spellId: 'forbiddance',
    spellName: 'Interdiction',
    spellLevel: 6,
    classSource: 'cleric',
    itemId: 'herbes',
    itemName: 'Herbes',
    quantity: 1,
    consumed: true,
    price: 20,
    priority: 'high',
  },
  {
    spellId: 'word-of-recall',
    spellName: 'Mot de rappel',
    spellLevel: 6,
    classSource: 'cleric',
    itemId: 'bijou',
    itemName: 'Bijou',
    quantity: 1,
    consumed: false,
    price: 500,
    priority: 'high',
  },
  // Trou de mémoire - Composants multiples : Encens ET plume
  {
    spellId: 'modify-memory',
    spellName: 'Trou de mémoire',
    spellLevel: 6,
    classSource: 'cleric',
    itemId: 'encens',
    itemName: 'Encens',
    quantity: 1,
    consumed: true,
    price: 10,
    priority: 'low',
  },
  {
    spellId: 'modify-memory',
    spellName: 'Trou de mémoire',
    spellLevel: 6,
    classSource: 'cleric',
    itemId: 'plume',
    itemName: 'Plume',
    quantity: 1,
    consumed: false,
    price: 1,
    priority: 'low',
  },
];

// ============================================
// SORTS DE PRÊTRE - NIVEAU 7
// ============================================
export const clericLevel7Components: SpellComponentMapping[] = [
  {
    spellId: 'shapechange',
    spellName: 'Changement de forme',
    spellLevel: 7,
    classSource: 'cleric',
    itemId: 'jade',
    itemName: 'Jade',
    quantity: 1,
    consumed: false,
    price: 1500,
    priority: 'medium',
  },
  // Champignon virevoltant - Composants multiples : Spores ET terre
  {
    spellId: 'myconid-dance',
    spellName: 'Champignon virevoltant',
    spellLevel: 7,
    classSource: 'cleric',
    itemId: 'spores',
    itemName: 'Spores',
    quantity: 1,
    consumed: false,
    price: 2,
    priority: 'low',
  },
  {
    spellId: 'myconid-dance',
    spellName: 'Champignon virevoltant',
    spellLevel: 7,
    classSource: 'cleric',
    itemId: 'terre',
    itemName: 'Terre',
    quantity: 1,
    consumed: false,
    price: 3,
    priority: 'low',
  },
  // Contrôle du climat - Composants multiples : Encens ET eau
  {
    spellId: 'control-weather',
    spellName: 'Contrôle du climat',
    spellLevel: 7,
    classSource: 'cleric',
    itemId: 'encens-de-brume',
    itemName: 'Encens de brume',
    quantity: 1,
    consumed: false,
    price: 5,
    priority: 'high',
  },
  {
    spellId: 'control-weather',
    spellName: 'Contrôle du climat',
    spellLevel: 7,
    classSource: 'cleric',
    itemId: 'eau-pure',
    itemName: 'Eau pure',
    quantity: 1,
    consumed: false,
    price: 5,
    priority: 'high',
  },
  // Dessin du profane - Composants multiples : Encens ET poudre d'os
  {
    spellId: 'profane-sigil',
    spellName: 'Dessin du profane',
    spellLevel: 7,
    classSource: 'cleric',
    itemId: 'encens-de-sang-dragon',
    itemName: 'Encens de sang de dragon',
    quantity: 1,
    consumed: true,
    price: 50,
    priority: 'high',
  },
  {
    spellId: 'profane-sigil',
    spellName: 'Dessin du profane',
    spellLevel: 7,
    classSource: 'cleric',
    itemId: 'poudre-d-os',
    itemName: 'Poudre d\'os',
    quantity: 1,
    consumed: true,
    price: 450,
    priority: 'high',
  },
  {
    spellId: 'mass-heal-word',
    spellName: 'Mot de guérison suprême',
    spellLevel: 7,
    classSource: 'cleric',
    itemId: 'eau-bénite-7',
    itemName: 'Eau bénite',
    quantity: 1,
    consumed: false,
    price: 5,
    priority: 'high',
  },
  // Portail - Composants multiples : Arche ET clés
  {
    spellId: 'gate',
    spellName: 'Portail',
    spellLevel: 7,
    classSource: 'cleric',
    itemId: 'arche',
    itemName: 'Arche',
    quantity: 1,
    consumed: false,
    price: 500,
    priority: 'high',
  },
  {
    spellId: 'gate',
    spellName: 'Portail',
    spellLevel: 7,
    classSource: 'cleric',
    itemId: 'cles',
    itemName: 'Clés',
    quantity: 1,
    consumed: false,
    price: 500,
    priority: 'high',
  },
  // Régénération - Composants multiples : Huile ET poudre
  {
    spellId: 'regenerate',
    spellName: 'Régénération',
    spellLevel: 7,
    classSource: 'cleric',
    itemId: 'huile',
    itemName: 'Huile',
    quantity: 1,
    consumed: false,
    price: 10,
    priority: 'high',
  },
  {
    spellId: 'regenerate',
    spellName: 'Régénération',
    spellLevel: 7,
    classSource: 'cleric',
    itemId: 'poudre',
    itemName: 'Poudre',
    quantity: 1,
    consumed: false,
    price: 15,
    priority: 'high',
  },
  {
    spellId: 'resurrection',
    spellName: 'Résurrection',
    spellLevel: 7,
    classSource: 'cleric',
    itemId: 'diamants-1000po',
    itemName: 'Diamants d\'infini (1000 po)',
    quantity: 1,
    consumed: true,
    price: 1000,
    priority: 'critical',
  },
];

// ============================================
// SORTS DE PRÊTRE - NIVEAU 8
// ============================================
export const clericLevel8Components: SpellComponentMapping[] = [
  // Antipathie/Sympathie - Composants multiples : Vinaigre ET miel
  {
    spellId: 'antipathy-sympathy',
    spellName: 'Antipathie/Sympathie',
    spellLevel: 8,
    classSource: 'cleric',
    itemId: 'vinaigre',
    itemName: 'Vinaigre',
    quantity: 1,
    consumed: false,
    price: 2,
    priority: 'medium',
  },
  {
    spellId: 'antipathy-sympathy',
    spellName: 'Antipathie/Sympathie',
    spellLevel: 8,
    classSource: 'cleric',
    itemId: 'miel',
    itemName: 'Miel',
    quantity: 1,
    consumed: false,
    price: 3,
    priority: 'medium',
  },
  {
    spellId: 'forcecage',
    spellName: 'Champ de force',
    spellLevel: 8,
    classSource: 'cleric',
    itemId: 'poudre-diamant-1500po',
    itemName: 'Poudre de diamant (1500 po)',
    quantity: 1,
    consumed: true,
    price: 1500,
    priority: 'high',
  },
  // Contrôle du feu - Composants multiples : Sulfure ET phosphore
  {
    spellId: 'control-flames',
    spellName: 'Contrôle du feu',
    spellLevel: 8,
    classSource: 'cleric',
    itemId: 'sulfure',
    itemName: 'Sulfure',
    quantity: 1,
    consumed: false,
    price: 5,
    priority: 'medium',
  },
  {
    spellId: 'control-flames',
    spellName: 'Contrôle du feu',
    spellLevel: 8,
    classSource: 'cleric',
    itemId: 'phosphore',
    itemName: 'Phosphore',
    quantity: 1,
    consumed: false,
    price: 5,
    priority: 'medium',
  },
  // Détection des pensées - Composants multiples : Cuivre ET zinc
  {
    spellId: 'detect-thoughts',
    spellName: 'Détection des pensées',
    spellLevel: 8,
    classSource: 'cleric',
    itemId: 'cuivre',
    itemName: 'Cuivre',
    quantity: 1,
    consumed: false,
    price: 2,
    priority: 'medium',
  },
  {
    spellId: 'detect-thoughts',
    spellName: 'Détection des pensées',
    spellLevel: 8,
    classSource: 'cleric',
    itemId: 'zinc',
    itemName: 'Zinc',
    quantity: 1,
    consumed: false,
    price: 3,
    priority: 'medium',
  },
  // Marteau du chaos - Composants multiples : Fer ET diamant
  {
    spellId: 'maelstrom',
    spellName: 'Marteau du chaos',
    spellLevel: 8,
    classSource: 'cleric',
    itemId: 'fer',
    itemName: 'Fer',
    quantity: 1,
    consumed: false,
    price: 5,
    priority: 'medium',
  },
  {
    spellId: 'maelstrom',
    spellName: 'Marteau du chaos',
    spellLevel: 8,
    classSource: 'cleric',
    itemId: 'diamant',
    itemName: 'Diamant',
    quantity: 1,
    consumed: false,
    price: 495,
    priority: 'medium',
  },
  {
    spellId: 'power-word-blind',
    spellName: 'Mot de pouvoir : Cécité',
    spellLevel: 8,
    classSource: 'cleric',
    itemId: 'fiel',
    itemName: 'Fiel',
    quantity: 1,
    consumed: false,
    price: 1,
    priority: 'low',
  },
  {
    spellId: 'power-word-stun',
    spellName: 'Mot de pouvoir : Étourdissement',
    spellLevel: 8,
    classSource: 'cleric',
    itemId: 'or',
    itemName: 'Or',
    quantity: 1,
    consumed: false,
    price: 50,
    priority: 'low',
  },
  {
    spellId: 'power-word-kill',
    spellName: 'Mot de pouvoir : Mort',
    spellLevel: 8,
    classSource: 'cleric',
    itemId: 'onyx',
    itemName: 'Onyx',
    quantity: 1,
    consumed: false,
    price: 500,
    priority: 'high',
  },
  {
    spellId: 'true-resurrection',
    spellName: 'Résurrection suprême',
    spellLevel: 8,
    classSource: 'cleric',
    itemId: 'diamants-25000po',
    itemName: 'Diamants cosmiques (25000 po)',
    quantity: 1,
    consumed: true,
    price: 25000,
    priority: 'critical',
  },
];

// ============================================
// SORTS DE PRÊTRE - NIVEAU 9
// ============================================
export const clericLevel9Components: SpellComponentMapping[] = [
  {
    spellId: 'mass-heal-word-9',
    spellName: 'Mot de guérison de masse',
    spellLevel: 9,
    classSource: 'cleric',
    itemId: 'eau-bénite-9',
    itemName: 'Eau bénite',
    quantity: 1,
    consumed: false,
    price: 10,
    priority: 'high',
  },
  // Portail astral - Composants multiples : Jaspe ET perle
  {
    spellId: 'gate-astral',
    spellName: 'Portail astral',
    spellLevel: 9,
    classSource: 'cleric',
    itemId: 'jaspe',
    itemName: 'Jaspe',
    quantity: 1,
    consumed: false,
    price: 500,
    priority: 'high',
  },
  {
    spellId: 'gate-astral',
    spellName: 'Portail astral',
    spellLevel: 9,
    classSource: 'cleric',
    itemId: 'perle',
    itemName: 'Perle',
    quantity: 1,
    consumed: false,
    price: 500,
    priority: 'high',
  },
  // Prémonition - Composants multiples : Encens ET herbes
  {
    spellId: 'foresight',
    spellName: 'Prémonition',
    spellLevel: 9,
    classSource: 'cleric',
    itemId: 'encens-des-visions',
    itemName: 'Encens des visions',
    quantity: 1,
    consumed: false,
    price: 25,
    priority: 'high',
  },
  {
    spellId: 'foresight',
    spellName: 'Prémonition',
    spellLevel: 9,
    classSource: 'cleric',
    itemId: 'herbes-divinatoires',
    itemName: 'Herbes divinatoires',
    quantity: 1,
    consumed: false,
    price: 25,
    priority: 'high',
  },
  // Déclaration divine - Composants multiples : Encens ET or
  {
    spellId: 'implosion',
    spellName: 'Déclaration divine',
    spellLevel: 9,
    classSource: 'cleric',
    itemId: 'encens-de-sang-dragon',
    itemName: 'Encens de sang de dragon',
    quantity: 1,
    consumed: true,
    price: 50,
    priority: 'critical',
  },
  {
    spellId: 'implosion',
    spellName: 'Déclaration divine',
    spellLevel: 9,
    classSource: 'cleric',
    itemId: 'or',
    itemName: 'Or',
    quantity: 1,
    consumed: true,
    price: 950,
    priority: 'critical',
  },
  {
    spellId: 'myconid-swarm',
    spellName: 'Imprégnation de champignon',
    spellLevel: 9,
    classSource: 'cleric',
    itemId: 'spores-magiques',
    itemName: 'Spores magiques',
    quantity: 1,
    consumed: false,
    price: 10,
    priority: 'low',
  },
  // Apaisement - Composants multiples : Encens ET perle
  {
    spellId: 'calm-emotions-mass',
    spellName: 'Apaisement',
    spellLevel: 9,
    classSource: 'cleric',
    itemId: 'encens-de-serenite',
    itemName: 'Encens de sérénité',
    quantity: 1,
    consumed: false,
    price: 50,
    priority: 'high',
  },
  {
    spellId: 'calm-emotions-mass',
    spellName: 'Apaisement',
    spellLevel: 9,
    classSource: 'cleric',
    itemId: 'perle-d-harmonie',
    itemName: 'Perle d\'harmonie',
    quantity: 1,
    consumed: false,
    price: 450,
    priority: 'high',
  },
  {
    spellId: 'aura-of-life',
    spellName: 'Aura de vie',
    spellLevel: 9,
    classSource: 'cleric',
    itemId: 'poudre-diamant-2000po',
    itemName: 'Poudre de diamant (2000 po)',
    quantity: 1,
    consumed: true,
    price: 2000,
    priority: 'high',
  },
  {
    spellId: 'supreme-restoration',
    spellName: 'Restauration suprême',
    spellLevel: 9,
    classSource: 'cleric',
    itemId: 'diamants-cosmiques',
    itemName: 'Diamants cosmiques (25000 po)',
    quantity: 1,
    consumed: true,
    price: 25000,
    priority: 'critical',
  },
  {
    spellId: 'storm-of-vengeance',
    spellName: 'Tempête de vengeance',
    spellLevel: 9,
    classSource: 'cleric',
    itemId: 'meteore-miniature',
    itemName: 'Météore miniature',
    quantity: 1,
    consumed: true,
    price: 500,
    priority: 'high',
  },
  {
    spellId: 'healing-wave',
    spellName: 'Vague de guérison',
    spellLevel: 9,
    classSource: 'cleric',
    itemId: 'eau-bénite-vague',
    itemName: 'Eau bénite',
    quantity: 1,
    consumed: false,
    price: 5,
    priority: 'high',
  },
];

// ============================================
// COMPOSANTS MAGE (pour multiclassage)
// ============================================
export const wizardComponents: SpellComponentMapping[] = [
  // Niveau 1
  {
    spellId: 'identify',
    spellName: 'Identification',
    spellLevel: 1,
    classSource: 'wizard',
    itemId: 'perle-100po',
    itemName: 'Perle (100 po)',
    quantity: 1,
    consumed: true,
    price: 100,
    priority: 'high',
  },
  // Écriture illusoire - Composants multiples : Plume ET encre spéciale
  {
    spellId: 'illusory-script',
    spellName: 'Écriture illusoire',
    spellLevel: 1,
    classSource: 'wizard',
    itemId: 'plume',
    itemName: 'Plume',
    quantity: 1,
    consumed: true,
    price: 1,
    priority: 'low',
  },
  {
    spellId: 'illusory-script',
    spellName: 'Écriture illusoire',
    spellLevel: 1,
    classSource: 'wizard',
    itemId: 'encre-speciale',
    itemName: 'Encre spéciale',
    quantity: 1,
    consumed: true,
    price: 9,
    priority: 'low',
  },
  // Niveau 2
  {
    spellId: 'magic-weapon',
    spellName: 'Arme magique',
    spellLevel: 2,
    classSource: 'wizard',
    itemId: 'poudre-or',
    itemName: 'Poudre d\'or',
    quantity: 1,
    consumed: false,
    price: 25,
    priority: 'medium',
  },
  {
    spellId: 'arcane-lock',
    spellName: 'Verrou magique',
    spellLevel: 2,
    classSource: 'wizard',
    itemId: 'or-verrou',
    itemName: 'Or en poudre',
    quantity: 1,
    consumed: true,
    price: 25,
    priority: 'medium',
  },
  // Niveau 3
  // Boule de feu - Composants multiples : Soufre ET nitrate
  {
    spellId: 'fireball',
    spellName: 'Boule de feu',
    spellLevel: 3,
    classSource: 'wizard',
    itemId: 'soufre',
    itemName: 'Soufre',
    quantity: 1,
    consumed: false,
    price: 2,
    priority: 'medium',
  },
  {
    spellId: 'fireball',
    spellName: 'Boule de feu',
    spellLevel: 3,
    classSource: 'wizard',
    itemId: 'nitrate',
    itemName: 'Nitrate',
    quantity: 1,
    consumed: false,
    price: 3,
    priority: 'medium',
  },
  {
    spellId: 'clairvoyance-wizard',
    spellName: 'Clairvoyance',
    spellLevel: 3,
    classSource: 'wizard',
    itemId: 'focale-mage',
    itemName: 'Focale',
    quantity: 1,
    consumed: false,
    price: 100,
    priority: 'medium',
  },
  // Niveau 5
  {
    spellId: 'teleportation-circle',
    spellName: 'Cercle de téléportation',
    spellLevel: 5,
    classSource: 'wizard',
    itemId: 'baton-fer',
    itemName: 'Bâton de fer',
    quantity: 1,
    consumed: false,
    price: 250,
    priority: 'high',
  },
  // Niveau 7
  {
    spellId: 'forcecage-wizard',
    spellName: 'Cage de force',
    spellLevel: 7,
    classSource: 'wizard',
    itemId: 'poudre-rubis',
    itemName: 'Poudre de rubis',
    quantity: 1,
    consumed: true,
    price: 1500,
    priority: 'high',
  },
  {
    spellId: 'simulacrum',
    spellName: 'Simulacre',
    spellLevel: 7,
    classSource: 'wizard',
    itemId: 'poudre-simulacre',
    itemName: 'Poudre de diamant',
    quantity: 1,
    consumed: true,
    price: 1500,
    priority: 'high',
  },
  // Niveau 9
  {
    spellId: 'imprisonment',
    spellName: 'Emprisonnement',
    spellLevel: 9,
    classSource: 'wizard',
    itemId: 'poudre-diamant-25000po',
    itemName: 'Poudre de diamant (25000 po)',
    quantity: 1,
    consumed: true,
    price: 25000,
    priority: 'critical',
  },
  {
    spellId: 'wish',
    spellName: 'Souhait',
    spellLevel: 9,
    classSource: 'wizard',
    itemId: 'souhait-focus',
    itemName: 'Focus de souhait',
    quantity: 1,
    consumed: false,
    price: 0,
    priority: 'high',
  },
];

// ============================================
// TOUS LES COMPOSANTS
// ============================================
export const allSpellComponentMappings: SpellComponentMapping[] = [
  ...clericLevel0Components,
  ...clericLevel1Components,
  ...clericLevel2Components,
  ...clericLevel3Components,
  ...clericLevel4Components,
  ...clericLevel5Components,
  ...clericLevel6Components,
  ...clericLevel7Components,
  ...clericLevel8Components,
  ...clericLevel9Components,
  ...wizardComponents,
];

// ============================================
// UTILITAIRES
// ============================================

/**
 * Récupère les composants pour un sort spécifique
 */
export function getComponentsForSpell(spellId: string): SpellComponentMapping[] {
  return allSpellComponentMappings.filter(c => c.spellId === spellId);
}

/**
 * Récupère les composants consommables pour un sort spécifique
 */
export function getConsumedComponentsForSpell(spellId: string): SpellComponentMapping[] {
  return allSpellComponentMappings.filter(c => c.spellId === spellId && c.consumed);
}

/**
 * Récupère tous les composants pour une classe donnée
 */
export function getComponentsForClass(classSource: 'cleric' | 'wizard'): SpellComponentMapping[] {
  return allSpellComponentMappings.filter(c => c.classSource === classSource);
}

/**
 * Récupère les composants critiques (consommables niveaux 3+)
 */
export function getCriticalComponents(): SpellComponentMapping[] {
  return allSpellComponentMappings.filter(
    c => c.consumed && c.spellLevel >= 3
  );
}

/**
 * Calcule le coût total des composants pour une liste de sorts
 */
export function calculateComponentsCost(spellIds: string[]): {
  total: number;
  consumed: number;
  reusable: number;
  bySpell: Record<string, number>;
} {
  const bySpell: Record<string, number> = {};
  let consumed = 0;
  let reusable = 0;

  spellIds.forEach(spellId => {
    const components = getComponentsForSpell(spellId);
    const spellCost = components.reduce((sum, c) => sum + c.price, 0);
    bySpell[spellId] = spellCost;

    components.forEach(c => {
      if (c.consumed) {
        consumed += c.price;
      } else {
        reusable += c.price;
      }
    });
  });

  return {
    total: consumed + reusable,
    consumed,
    reusable,
    bySpell,
  };
}

/**
 * Récupère les composants manquants pour une liste de sorts
 * en fonction de l'inventaire actuel
 */
export function getMissingComponents(
  spellIds: string[],
  ownedItemIds: string[]
): SpellComponentMapping[] {
  const needed = new Map<string, SpellComponentMapping>();

  spellIds.forEach(spellId => {
    const components = getComponentsForSpell(spellId);
    components.forEach(comp => {
      if (!ownedItemIds.includes(comp.itemId) && !needed.has(comp.itemId)) {
        needed.set(comp.itemId, comp);
      }
    });
  });

  return Array.from(needed.values());
}

/**
 * Regroupe les composants par priorité
 */
export function groupComponentsByPriority(
  components: SpellComponentMapping[]
): Record<string, SpellComponentMapping[]> {
  const grouped: Record<string, SpellComponentMapping[]> = {
    critical: [],
    high: [],
    medium: [],
    low: [],
    none: [],
  };

  components.forEach(c => {
    grouped[c.priority].push(c);
  });

  return grouped;
}

/**
 * Retourne le niveau de sort maximum accessible pour un clerc selon son niveau
 * En D&D 5e : niveau 1-2 → 1, 3-4 → 2, 5-6 → 3, 7-8 → 4, 9+ → 5
 */
export function getMaxSpellLevelForCharacter(characterLevel: number): number {
  if (characterLevel >= 9) return 5;
  if (characterLevel >= 7) return 4;
  if (characterLevel >= 5) return 3;
  if (characterLevel >= 3) return 2;
  return 1;
}

export default allSpellComponentMappings;
