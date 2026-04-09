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
  {
    spellId: 'gentle-repose',
    spellName: 'Préservation des morts',
    spellLevel: 2,
    classSource: 'cleric',
    itemId: 'sel-cuivre',
    itemName: 'Sel et pièces de cuivre',
    quantity: 1,
    consumed: false,
    price: 1,
    priority: 'low',
  },
];

// ============================================
// SORTS DE PRÊTRE - NIVEAU 3
// ============================================
export const clericLevel3Components: SpellComponentMapping[] = [
  {
    spellId: 'animate-dead',
    spellName: 'Animation des morts',
    spellLevel: 3,
    classSource: 'cleric',
    itemId: 'composants-morbides',
    itemName: 'Sang, chair et ossements',
    quantity: 1,
    consumed: true,
    price: 5,
    priority: 'low',
  },
  {
    spellId: 'magic-circle',
    spellName: 'Cercle magique',
    spellLevel: 3,
    classSource: 'cleric',
    itemId: 'eau-bénite-ou-poudre-argent',
    itemName: 'Eau bénite ou poudre d\'argent',
    quantity: 1,
    consumed: true,
    price: 100,
    priority: 'high',
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
    itemName: 'Diamants (300 po)',
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
  {
    spellId: 'control-water',
    spellName: 'Contrôle de l\'eau',
    spellLevel: 4,
    classSource: 'cleric',
    itemId: 'eau-poussiere',
    itemName: 'Eau et poussière',
    quantity: 1,
    consumed: false,
    price: 1,
    priority: 'medium',
  },
  {
    spellId: 'divination',
    spellName: 'Divination',
    spellLevel: 4,
    classSource: 'cleric',
    itemId: 'encens-offrande',
    itemName: 'Encens et offrande',
    quantity: 1,
    consumed: true,
    price: 25,
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
  {
    spellId: 'giant-insect',
    spellName: 'Insecte géant',
    spellLevel: 4,
    classSource: 'cleric',
    itemId: 'miel-ailes',
    itemName: 'Miel et ailes d\'insecte',
    quantity: 1,
    consumed: false,
    price: 1,
    priority: 'low',
  },
  {
    spellId: 'hallucinatory-terrain',
    spellName: 'Terrain hallucinatoire',
    spellLevel: 4,
    classSource: 'cleric',
    itemId: 'pierre-brume',
    itemName: 'Pierre et brume',
    quantity: 1,
    consumed: false,
    price: 5,
    priority: 'medium',
  },
  {
    spellId: 'raise-dead',
    spellName: 'Rappel à la vie',
    spellLevel: 4,
    classSource: 'cleric',
    itemId: 'diamants-500po',
    itemName: 'Diamants (500 po)',
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
  {
    spellId: 'commune',
    spellName: 'Communion',
    spellLevel: 5,
    classSource: 'cleric',
    itemId: 'encens-offrande-communion',
    itemName: 'Encens et offrande',
    quantity: 1,
    consumed: true,
    price: 25,
    priority: 'high',
  },
  {
    spellId: 'dispel-evil-good',
    spellName: 'Dissipation du mal/bien',
    spellLevel: 5,
    classSource: 'cleric',
    itemId: 'eau-bénite-argent',
    itemName: 'Eau bénite et argent',
    quantity: 1,
    consumed: false,
    price: 10,
    priority: 'high',
  },
  {
    spellId: 'insect-plague',
    spellName: 'Fléau d\'insectes',
    spellLevel: 5,
    classSource: 'cleric',
    itemId: 'poivre-sable',
    itemName: 'Poivre et sable',
    quantity: 1,
    consumed: false,
    price: 1,
    priority: 'low',
  },
  {
    spellId: 'raise-dead-long',
    spellName: 'Rappel des morts',
    spellLevel: 5,
    classSource: 'cleric',
    itemId: 'diamants-1000po',
    itemName: 'Diamants (1000 po)',
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
  {
    spellId: 'scrying',
    spellName: 'Scrutation',
    spellLevel: 5,
    classSource: 'cleric',
    itemId: 'encens-miroir',
    itemName: 'Encens et miroir',
    quantity: 1,
    consumed: false,
    price: 1000,
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
  {
    spellId: 'forbiddance',
    spellName: 'Interdiction',
    spellLevel: 6,
    classSource: 'cleric',
    itemId: 'eau-bénite-herbes',
    itemName: 'Eau bénite et herbes',
    quantity: 1,
    consumed: true,
    price: 25,
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
  {
    spellId: 'modify-memory',
    spellName: 'Trou de mémoire',
    spellLevel: 6,
    classSource: 'cleric',
    itemId: 'encens-plume',
    itemName: 'Encens et plume',
    quantity: 1,
    consumed: false,
    price: 10,
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
  {
    spellId: 'myconid-dance',
    spellName: 'Champignon virevoltant',
    spellLevel: 7,
    classSource: 'cleric',
    itemId: 'spores-terre',
    itemName: 'Spores et terre',
    quantity: 1,
    consumed: false,
    price: 5,
    priority: 'low',
  },
  {
    spellId: 'control-weather',
    spellName: 'Contrôle du climat',
    spellLevel: 7,
    classSource: 'cleric',
    itemId: 'encens-eau',
    itemName: 'Encens et eau',
    quantity: 1,
    consumed: false,
    price: 10,
    priority: 'high',
  },
  {
    spellId: 'profane-sigil',
    spellName: 'Dessin du profane',
    spellLevel: 7,
    classSource: 'cleric',
    itemId: 'encens-poudre-os',
    itemName: 'Encens et poudre d\'os',
    quantity: 1,
    consumed: true,
    price: 500,
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
  {
    spellId: 'gate',
    spellName: 'Portail',
    spellLevel: 7,
    classSource: 'cleric',
    itemId: 'arche-cles',
    itemName: 'Arche et clés',
    quantity: 1,
    consumed: false,
    price: 1000,
    priority: 'high',
  },
  {
    spellId: 'regenerate',
    spellName: 'Régénération',
    spellLevel: 7,
    classSource: 'cleric',
    itemId: 'huile-poudre',
    itemName: 'Huile et poudre',
    quantity: 1,
    consumed: false,
    price: 25,
    priority: 'high',
  },
  {
    spellId: 'resurrection',
    spellName: 'Résurrection',
    spellLevel: 7,
    classSource: 'cleric',
    itemId: 'diamants-resurrection',
    itemName: 'Diamants (1000 po)',
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
  {
    spellId: 'antipathy-sympathy',
    spellName: 'Antipathie/Sympathie',
    spellLevel: 8,
    classSource: 'cleric',
    itemId: 'vinaigre-miel',
    itemName: 'Vinaigre et miel',
    quantity: 1,
    consumed: false,
    price: 5,
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
  {
    spellId: 'control-flames',
    spellName: 'Contrôle du feu',
    spellLevel: 8,
    classSource: 'cleric',
    itemId: 'sulfure-phosphore',
    itemName: 'Sulfure et phosphore',
    quantity: 1,
    consumed: false,
    price: 10,
    priority: 'medium',
  },
  {
    spellId: 'detect-thoughts',
    spellName: 'Détection des pensées',
    spellLevel: 8,
    classSource: 'cleric',
    itemId: 'cuivre-zinc',
    itemName: 'Cuivre et zinc',
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
    itemId: 'fer-diamant',
    itemName: 'Fer et diamant',
    quantity: 1,
    consumed: false,
    price: 500,
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
    itemName: 'Diamants (25000 po)',
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
  {
    spellId: 'gate-astral',
    spellName: 'Portail astral',
    spellLevel: 9,
    classSource: 'cleric',
    itemId: 'jaspe-perle',
    itemName: 'Jaspe et perle',
    quantity: 1,
    consumed: false,
    price: 1000,
    priority: 'high',
  },
  {
    spellId: 'foresight',
    spellName: 'Prémonition',
    spellLevel: 9,
    classSource: 'cleric',
    itemId: 'encens-herbes',
    itemName: 'Encens et herbes',
    quantity: 1,
    consumed: false,
    price: 50,
    priority: 'high',
  },
  {
    spellId: 'implosion',
    spellName: 'Déclaration divine',
    spellLevel: 9,
    classSource: 'cleric',
    itemId: 'encens-or',
    itemName: 'Encens et or',
    quantity: 1,
    consumed: true,
    price: 1000,
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
  {
    spellId: 'calm-emotions-mass',
    spellName: 'Apaisement',
    spellLevel: 9,
    classSource: 'cleric',
    itemId: 'encens-perle',
    itemName: 'Encens et perle',
    quantity: 1,
    consumed: false,
    price: 500,
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
    itemId: 'diamants-supreme',
    itemName: 'Diamants (25000 po)',
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
  {
    spellId: 'illusory-script',
    spellName: 'Écriture illusoire',
    spellLevel: 1,
    classSource: 'wizard',
    itemId: 'plume-encre',
    itemName: 'Plume et encre spéciale',
    quantity: 1,
    consumed: true,
    price: 10,
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
  {
    spellId: 'fireball',
    spellName: 'Boule de feu',
    spellLevel: 3,
    classSource: 'wizard',
    itemId: 'soufre-nitrate',
    itemName: 'Soufre et nitrate',
    quantity: 1,
    consumed: false,
    price: 5,
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

export default allSpellComponentMappings;
