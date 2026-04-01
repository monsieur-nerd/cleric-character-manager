// types/index.ts
// Types principaux pour Torm Spell Manager

// ============================================
// SORTS
// ============================================

export interface Spell {
  id: string;
  name: string;
  nameEn: string;
  level: number;
  levelDisplay: string;
  school: SpellSchool;
  type: string;
  
  // Domaine
  isDomainSpell: boolean;
  domainSpellLevel?: number;
  
  // Incantation
  castingTime: string;
  range: string;
  components: SpellComponents;
  duration: SpellDuration;
  concentration: boolean;
  ritual: boolean;
  
  // Description
  description: string;
  descriptionShort: string;
  higherLevels: string | null;
  summary?: string;
  
  // Métadonnées
  recommendation: RecommendationLevel | null;
  incantation: string | null;
  source: 'core' | 'extended';
  
  // État runtime (non persistant)
  isPrepared?: boolean;
  isUsed?: boolean;
}

export type SpellSchool = 
  | 'abjuration' 
  | 'conjuration' 
  | 'divination' 
  | 'enchantment' 
  | 'evocation' 
  | 'illusion' 
  | 'necromancy' 
  | 'transmutation';

export interface SpellComponents {
  verbal: boolean;
  somatic: boolean;
  material: string | null;
  materialCost?: number;
  materialConsumed: boolean;
}

export interface SpellDuration {
  type: 'instantaneous' | 'concentration' | 'timed' | 'permanent';
  value?: string;
}

export type RecommendationLevel = string;

export type SpellType = 
  | 'Buff' 
  | 'Attaque' 
  | 'Défense' 
  | 'Soin' 
  | 'Détection' 
  | 'Invocation' 
  | 'Contrôle'
  | 'Charme' 
  | 'Affaiblissement' 
  | 'Déplacement'
  | 'Communication' 
  | 'Survie' 
  | 'Divination'
  | 'Nécromancie' 
  | 'Transmutation' 
  | string;

// ============================================
// ÉQUIPEMENT
// ============================================

export interface EquipmentItem {
  id: string;
  name: string;
  type: EquipmentType;
  description: string;
  
  // Quantités
  quantity: number;
  quantityIdeal?: number;
  
  // Économie
  unitPrice: number;
  totalPrice: number;
  
  // Poids
  unitWeight: number | null;
  totalWeight: number;
  
  // État
  isCarried: boolean;
  isEquipped?: boolean;
  
  // Pour composantes
  isComponent?: boolean;
  relatedSpells?: string[];
}

export type EquipmentType =
  | 'Composante'
  | 'Arme'
  | 'Armure'
  | 'Bouclier'
  | 'Consommable'
  | 'Équipement aventure'
  | 'Monture'
  | 'Correspondances'
  | 'Pièges'
  | 'Escalade'
  | string;

export interface ComponentRequirement {
  spellId: string;
  itemId: string;
  quantity: number;
  consumed: boolean;
}

// ============================================
// DIEUX ET DOMAINES
// ============================================

export interface Deity {
  id: string;
  name: string;
  nameEn: string;
  title: string;
  symbol: string;
  alignment: string;
  description: string;
}

export interface DomainSpellProfile {
  // Profil magique du domaine (0-10 pour chaque axe)
  healing: number;      // Soins et guérison
  damage: number;       // Dégâts directs
  control: number;      // Contrôle de foule (CC, debuffs)
  buff: number;         // Amélioration des alliés
  protection: number;   // Défense et protection
  utility: number;      // Utilitaire (déplacement, divination, etc.)
}

export interface ClericDomain {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  description: string;
  spellIds: string[]; // IDs des sorts de domaine
  abilities: {
    level1: DomainAbility;
    level2: DomainAbility;
    level6: DomainAbility;
    level8: DomainAbility;
    level17: DomainAbility;
  };
  spellProfile?: DomainSpellProfile; // Profil magique pour le diagramme radar (optionnel)
}

export interface DomainAbility {
  name: string;
  nameEn: string;
  description: string;
  uses?: number;
  shortRest?: boolean;
  longRest?: boolean;
}

// ============================================
// PERSONNAGE
// ============================================

export interface Character {
  // Identité
  name: string;
  class: 'cleric';
  subclass: 'war';
  avatar?: string | null; // URL de l'avatar/photo
  deity?: Deity; // Dieu vénéré
  domain?: ClericDomain; // Domaine du clerc
  
  // Niveau
  level: number;
  
  // Caractéristiques
  wisdom: number;
  wisdomModifier: number;
  constitution: number;
  strength: number;
  dexterity: number;
  intelligence: number;
  charisma: number;
  
  // Points de vie
  maxHp: number;
  currentHp: number;
  
  // Calculés
  maxPreparedSpells: number;
  domainSpellCount: number;
  carryingCapacity: number; // Capacité d'emport en kg
  
  // Capacités spécifiques au domaine
  abilities: CharacterAbilities;
  
  // Compétences et Talents
  masteredSkills: string[]; // IDs des compétences maîtrisées
  customMasteredSkills: string[]; // IDs des compétences perso maîtrisées
  feats: string[]; // IDs des talents possédés
  customOwnedFeats: string[]; // IDs des talents perso possédés
  
  // État courant
  currentState: DailyState;
}

export interface CharacterAbilities {
  warCleric: {
    maxUses: number;
    currentUses: number;
  };
  channelDivinity: {
    maxUses: number;
    currentUses: number;
    shortRestRecovery: boolean;
  };
}

// Liste des dieux disponibles
export const DEITIES: Deity[] = [
  {
    id: 'torm',
    name: 'Torm',
    nameEn: 'Torm',
    title: 'Le Loyal',
    symbol: 'images/Ganteleta-acier-bleu.png',
    alignment: 'Loyal Bon',
    description: 'Dieu du devoir, de la loyauté et de la justice. Protecteur des vertueux.'
  },
  {
    id: 'tyr',
    name: 'Tyr',
    nameEn: 'Tyr',
    title: 'Le Borgne',
    symbol: '⚖️',
    alignment: 'Loyal Bon',
    description: 'Dieu de la justice et du sacrifice. Le plus ancien dieu de la justice.'
  },
  {
    id: 'ilmater',
    name: 'Ilmater',
    nameEn: 'Ilmater',
    title: 'Le Criquet',
    symbol: '🕊️',
    alignment: 'Loyal Bon',
    description: 'Dieu de l\'endurance, du martyre et de la persévérance.'
  },
  {
    id: 'lathander',
    name: 'Lathandre',
    nameEn: 'Lathander',
    title: 'L\'Aube',
    symbol: '🌅',
    alignment: 'Neutre Bon',
    description: 'Dieu de la naissance, du renouveau et de la créativité.'
  },
  {
    id: 'tempus',
    name: 'Tempus',
    nameEn: 'Tempus',
    title: 'Seigneur des Batailles',
    symbol: '⚔️',
    alignment: 'Chaotique Neutre',
    description: 'Dieu de la guerre et de la victoire. Il ne favorise aucun camp.'
  },
  {
    id: 'mystra',
    name: 'Mystra',
    nameEn: 'Mystra',
    title: 'Dame de la Magie',
    symbol: '✨',
    alignment: 'Neutre Bon',
    description: 'Déesse de la magie et des arcanes. Gardienne du Tissu magique.'
  },
  {
    id: 'chauntea',
    name: 'Chauntéa',
    nameEn: 'Chauntea',
    title: 'La Grande Mère',
    symbol: '🌾',
    alignment: 'Neutre Bon',
    description: 'Déesse de l\'agriculture et des récoltes.'
  },
  {
    id: 'selune',
    name: 'Séluné',
    nameEn: 'Selune',
    title: 'Notre Dame d\'Argent',
    symbol: '🌙',
    alignment: 'Chaotique Bon',
    description: 'Déesse de la lune, des étoiles et de la navigation.'
  },
];

// Liste des domaines disponibles
export const CLERIC_DOMAINS: ClericDomain[] = [
  {
    id: 'war',
    name: 'Domaine de la Guerre',
    nameEn: 'War Domain',
    icon: '⚔️',
    description: 'Clercs de guerre qui bénissent les armes et mènent les batailles.',
    spellIds: ['divine-favor', 'shield-of-faith', 'magic-weapon', 'spiritual-weapon'],
    abilities: {
      level1: { name: 'Clerc de guerre', nameEn: 'War Priest', description: 'Attaque bonus avec arme', uses: 3, shortRest: false, longRest: true },
      level2: { name: 'Conduit divin : Guided Strike', nameEn: 'Guided Strike', description: '+10 à un jet d\'attaque', uses: 2, shortRest: false, longRest: true },
      level6: { name: 'Conduit divin : War God\'s Blessing', nameEn: 'War God\'s Blessing', description: 'Reroll dégâts ou attaque pour un allié', uses: 2, shortRest: false, longRest: true },
      level8: { name: 'Frappe divine', nameEn: 'Divine Strike', description: '+1d8 dégâts radiants sur une attaque', uses: 0 },
      level17: { name: 'Avatar de bataille', nameEn: 'Avatar of Battle', description: 'Résistance aux dégâts contondants/perforants/tranchants', uses: 0 }
    },
    spellProfile: { healing: 3, damage: 7, control: 4, buff: 8, protection: 7, utility: 3 }
  },
  {
    id: 'life',
    name: 'Domaine de la Vie',
    nameEn: 'Life Domain',
    icon: '❤️',
    description: 'Guérisseurs et protecteurs qui préservent la vie et combattent les morts-vivants.',
    spellIds: ['bless', 'cure-wounds', 'lesser-restoration', 'spiritual-weapon'],
    abilities: {
      level1: { name: 'Disciple de la vie', nameEn: 'Disciple of Life', description: '+2 + niveau du sort aux soins', uses: 0 },
      level2: { name: 'Conduit divin : Préservation de la vie', nameEn: 'Preserve Life', description: 'Soigne 5×niveau PV répartis', uses: 1, shortRest: false, longRest: true },
      level6: { name: 'Bénie par la vie', nameEn: 'Blessed Healer', description: 'Soigne 3 + niveau du sort quand vous soignez', uses: 0 },
      level8: { name: 'Frappe divine', nameEn: 'Divine Strike', description: '+1d8 dégâts radiants', uses: 0 },
      level17: { name: 'Suprême guérison', nameEn: 'Supreme Healing', description: 'Les sorts de soin maximisent les dés', uses: 0 }
    },
    spellProfile: { healing: 10, damage: 4, control: 3, buff: 7, protection: 6, utility: 4 }
  },
  {
    id: 'light',
    name: 'Domaine de la Lumière',
    nameEn: 'Light Domain',
    icon: '☀️',
    description: 'Porteurs de lumière qui dissipent les ténèbres et brûlent les ennemis.',
    spellIds: ['burning-hands', 'faerie-fire', 'flaming-sphere', 'scorching-ray'],
    abilities: {
      level1: { name: 'Flamboiement', nameEn: 'Warding Flare', description: 'Réaction pour désavantage sur attaque', uses: 3, shortRest: false, longRest: true },
      level2: { name: 'Conduit divin : Flamboiement radiance', nameEn: 'Radiance of the Dawn', description: 'Dégâts radiants 2d10 + niveau', uses: 1, shortRest: false, longRest: true },
      level6: { name: 'Flamboiement amélioré', nameEn: 'Improved Flare', description: 'Flamboiement aussi pour alliés', uses: 0 },
      level8: { name: 'Potentiel de divin', nameEn: 'Potent Spellcasting', description: '+mod Sagesse aux dégâts de sort', uses: 0 },
      level17: { name: 'Couronne de lumière', nameEn: 'Corona of Light', description: 'Lumière vive + désavantage aux attaques contre vous', uses: 1, shortRest: false, longRest: true }
    },
    spellProfile: { healing: 3, damage: 9, control: 6, buff: 4, protection: 5, utility: 5 }
  },
  {
    id: 'nature',
    name: 'Domaine de la Nature',
    nameEn: 'Nature Domain',
    icon: '🌿',
    description: 'Gardiens de la nature qui maîtrisent les éléments et communiquent avec les bêtes.',
    spellIds: ['animal-friendship', 'speak-with-animals', 'barkskin', 'spike-growth'],
    abilities: {
      level1: { name: 'Acolyte de la nature', nameEn: 'Acolyte of Nature', description: 'Maîtrise d\'une compétence de nature', uses: 0 },
      level2: { name: 'Conduit divin : Charme animal/plante', nameEn: 'Charm Animals and Plants', description: 'Charme créatures dans 9m', uses: 1, shortRest: false, longRest: true },
      level6: { name: 'Dampen Elements', nameEn: 'Dampen Elements', description: 'Réaction pour résistance aux dégâts élémentaires', uses: 0 },
      level8: { name: 'Frappe divine', nameEn: 'Divine Strike', description: '+1d8 dégâts de froid/feu/foudre', uses: 0 },
      level17: { name: 'Maître de la nature', nameEn: 'Master of Nature', description: 'Commande les animaux et plantes charmés', uses: 0 }
    },
    spellProfile: { healing: 5, damage: 6, control: 7, buff: 6, protection: 6, utility: 8 }
  },
  {
    id: 'tempest',
    name: 'Domaine de la Tempête',
    nameEn: 'Tempest Domain',
    icon: '⛈️',
    description: 'Maîtres des tempêtes qui invoquent la foudre et contrôlent les vents.',
    spellIds: ['fog-cloud', 'thunderwave', 'gust-of-wind', 'shatter'],
    abilities: {
      level1: { name: 'Frappe de la tempête', nameEn: 'Wrath of the Storm', description: 'Réaction : dégâts de foudre ou tonnerre 2d8', uses: 3, shortRest: false, longRest: true },
      level2: { name: 'Conduit divin : Destructive Wrath', nameEn: 'Destructive Wrath', description: 'Dés de dégâts maximaux (foudre/tonnerre)', uses: 1, shortRest: false, longRest: true },
      level6: { name: 'Frappe tonitruante', nameEn: 'Thunderbolt Strike', description: 'Pousse la cible de 3m avec la foudre', uses: 0 },
      level8: { name: 'Frappe divine', nameEn: 'Divine Strike', description: '+1d8 dégâts de tonnerre', uses: 0 },
      level17: { name: 'Vol', nameEn: 'Stormborn', description: 'Vol (12m) en plein air', uses: 0 }
    },
    spellProfile: { healing: 3, damage: 10, control: 6, buff: 3, protection: 5, utility: 5 }
  },
  {
    id: 'trickery',
    name: 'Domaine de la Tromperie',
    nameEn: 'Trickery Domain',
    icon: '🎭',
    description: 'Filous et mystificateurs qui servent les dieux de la ruse.',
    spellIds: ['charm-person', 'disguise-self', 'mirror-image', 'pass-without-trace'],
    abilities: {
      level1: { name: 'Bénédiction du filou', nameEn: 'Blessing of the Trickster', description: 'Avantage en Discrétion pour un allié', uses: 0 },
      level2: { name: 'Conduit divin : Invocation du double', nameEn: 'Invoke Duplicity', description: 'Crée un illusion de vous', uses: 1, shortRest: false, longRest: true },
      level6: { name: 'Déplacement insaisissable', nameEn: 'Cloak of Shadows', description: 'Devenir invisible en lumière faible', uses: 0 },
      level8: { name: 'Frappe divine', nameEn: 'Divine Strike', description: '+1d8 dégâts de poison', uses: 0 },
      level17: { name: 'Improved Duplicity', nameEn: 'Improved Duplicity', description: 'Jusqu\'à 4 doubles', uses: 0 }
    },
    spellProfile: { healing: 4, damage: 5, control: 7, buff: 6, protection: 4, utility: 9 }
  },
  {
    id: 'knowledge',
    name: 'Domaine de la Connaissance',
    nameEn: 'Knowledge Domain',
    icon: '📚',
    description: 'Érudits et savants qui cherchent la vérité cachée.',
    spellIds: ['command', 'identify', 'augury', 'suggestion'],
    abilities: {
      level1: { name: 'Béni du savoir', nameEn: 'Blessings of Knowledge', description: '2 langues + maîtrise compétences', uses: 0 },
      level2: { name: 'Conduit divin : Connaissance des âges', nameEn: 'Knowledge of the Ages', description: 'Maîtrise d\'une compétence pendant 10 min', uses: 1, shortRest: false, longRest: true },
      level6: { name: 'Lire les pensées', nameEn: 'Read Thoughts', description: 'Lecture des pensées', uses: 0 },
      level8: { name: 'Potentiel de divin', nameEn: 'Potent Spellcasting', description: '+mod Sagesse aux dégâts de sort', uses: 0 },
      level17: { name: 'Vision de l\'invisible', nameEn: 'Visions of the Past', description: 'Vision du passé d\'un objet', uses: 1, shortRest: false, longRest: true }
    },
    spellProfile: { healing: 4, damage: 5, control: 6, buff: 5, protection: 4, utility: 10 }
  },
  {
    id: 'forge',
    name: 'Domaine de la Forge',
    nameEn: 'Forge Domain',
    icon: '🔨',
    description: 'Artisans divins qui bénissent les créations et maîtrisent le feu.',
    spellIds: ['searing-smite', 'identify', 'heat-metal', 'magic-weapon'],
    abilities: {
      level1: { name: 'Bénédiction du forgeron', nameEn: 'Blessing of the Forge', description: '+1 armure ou arme non-magique', uses: 1, shortRest: false, longRest: true },
      level2: { name: 'Conduit divin : Artisan de la Flamme', nameEn: 'Artisan\'s Blessing', description: 'Crée un objet métallique simple', uses: 1, shortRest: false, longRest: true },
      level6: { name: 'Âme de la forge', nameEn: 'Soul of the Forge', description: 'Résistance aux dégâts de feu', uses: 0 },
      level8: { name: 'Frappe divine', nameEn: 'Divine Strike', description: '+1d8 dégâts de feu', uses: 0 },
      level17: { name: 'Maître forgeron', nameEn: 'Saint of Forge and Fire', description: 'Immunité au feu + résistance aux armes non-magiques', uses: 0 }
    },
    spellProfile: { healing: 3, damage: 7, control: 4, buff: 8, protection: 7, utility: 6 }
  },
  {
    id: 'grave',
    name: 'Domaine du Tombeau',
    nameEn: 'Grave Domain',
    icon: '⚰️',
    description: 'Gardiens des frontières entre vie et mort.',
    spellIds: ['bane', 'false-life', 'gentle-repose', 'ray-of-enfeeblement'],
    abilities: {
      level1: { name: 'Sentinelle du cercueil', nameEn: 'Circle of Mortality', description: 'Soins max à 0 PV, rayon de lumière', uses: 0 },
      level2: { name: 'Conduit divin : Sentinelle des âmes', nameEn: 'Path to the Grave', description: 'Prochaine attaque = vulnérabilité', uses: 1, shortRest: false, longRest: true },
      level6: { name: 'Sentinelles aux portes', nameEn: 'Sentinel at Death\'s Door', description: 'Avantage JS contre mort + max dégâts instantanée', uses: 0 },
      level8: { name: 'Potentiel de divin', nameEn: 'Potent Spellcasting', description: '+mod Sagesse aux dégâts de sort', uses: 0 },
      level17: { name: 'Garde-tombe', nameEn: 'Keeper of Souls', description: 'Récupère PV quand une créature meurt à 18m', uses: 0 }
    },
    spellProfile: { healing: 7, damage: 6, control: 8, buff: 4, protection: 7, utility: 5 }
  },
];

export interface DailyState {
  date: string;
  preparedSpellIds: string[];
  usedSpellSlots: SpellSlots;
  usedAbilities: {
    warCleric: number;
    channelDivinity: number;
  };
  activeConcentration: string | null;
  tempHp: number;
}

export interface SpellSlots {
  1: number;
  2: number;
  3: number;
}

export const MAX_SPELL_SLOTS: Record<number, SpellSlots> = {
  1: { 1: 2, 2: 0, 3: 0 },
  2: { 1: 3, 2: 0, 3: 0 },
  3: { 1: 4, 2: 2, 3: 0 },
  4: { 1: 4, 2: 3, 3: 0 },
  5: { 1: 4, 2: 3, 3: 2 },
  6: { 1: 4, 2: 3, 3: 3 },
  7: { 1: 4, 2: 3, 3: 3 },
  8: { 1: 4, 2: 3, 3: 3 },
  9: { 1: 4, 2: 3, 3: 3 },
  10: { 1: 4, 2: 3, 3: 3 },
  11: { 1: 4, 2: 3, 3: 3 },
  12: { 1: 4, 2: 3, 3: 3 },
  13: { 1: 4, 2: 3, 3: 3 },
  14: { 1: 4, 2: 3, 3: 3 },
  15: { 1: 4, 2: 3, 3: 3 },
  16: { 1: 4, 2: 3, 3: 3 },
  17: { 1: 4, 2: 3, 3: 3 },
  18: { 1: 4, 2: 3, 3: 3 },
  19: { 1: 4, 2: 3, 3: 3 },
  20: { 1: 4, 2: 3, 3: 3 },
};

// ============================================
// PRÉRÉGLAGES
// ============================================

export interface SpellPreset {
  id: string;
  name: string;
  icon: string;
  description: string;
  spellIds: string[];
  isDefault?: boolean;
}

// ============================================
// FILTRES
// ============================================

export interface SpellFilters {
  search: string;
  levels: number[];
  types: string[];
  schools: SpellSchool[];
  components: ('verbal' | 'somatic' | 'material')[];
  castingTime: string[];
  onlyConcentration: boolean | null;
  onlyRitual: boolean | null;
  onlyDomain: boolean | null;
}

// ============================================
// UI
// ============================================

export type TabId = 'dashboard' | 'spells' | 'combat' | 'inventory' | 'settings';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  duration?: number;
}


