// types/index.ts
// Types principaux pour Torm Spell Manager
// 
// NOTE: Les constantes ont été déplacées vers src/constants/
// Importez-les depuis là pour les nouveaux fichiers.

// Ré-export pour compatibilité descendante
export { 
  DEITIES, 
  CLERIC_DOMAINS, 
  BACKGROUNDS, 
  MAX_SPELL_SLOTS,
  getMaxSpellLevelForCharacter,
  DOMAIN_SPELLS_BY_LEVEL 
} from '@/constants';

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

export type ShoppingPriority = 'critical' | 'high' | 'medium' | 'low' | 'none';

export type ComponentType = 'consumed_per_cast' | 'consumed_per_use' | 'reusable_focus' | 'permanent';

export interface RestockConfig {
  enabled: boolean;
  minStock: number;
  restockAmount: number;
  autoAddToShoppingList: boolean;
}

export interface RelatedSpellInfo {
  spellId: string;
  spellName: string;
  consumed: boolean;
  spellLevel?: number;
}

export interface ShoppingListItem {
  itemId: string;
  priority: ShoppingPriority;
  category: 'component' | 'consumable' | 'equipment' | 'weapon' | 'armor';
  componentType?: ComponentType;
  relatedSpells?: RelatedSpellInfo[];
  restockConfig: RestockConfig;
  quantityIdeal: number;
  quantityToBuy: number;
  notes?: string;
  autoAdded: boolean;
  lastPurchased?: string;
  classSource?: 'cleric' | 'wizard';
}

export interface InventoryNotification {
  id: string;
  type: 'low_stock' | 'out_of_stock' | 'restocked' | 'consumed' | 'purchased' | 'component_needed';
  itemId: string;
  itemName: string;
  message: string;
  timestamp: string;
  read: boolean;
  actions?: {
    label: string;
    action: string;
    params?: Record<string, unknown>;
  }[];
}

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
  isAtCamp?: boolean;
  
  // Pour composantes
  isComponent?: boolean;
  relatedSpells?: RelatedSpellInfo[] | string[];
  
  // Système d'achat et composants
  shoppingPriority?: ShoppingPriority;
  componentType?: ComponentType;
  classSource?: 'cleric' | 'wizard';
  
  // Pour le combat
  damage?: string;           // Ex: "1d8", "2d6"
  damageType?: string;       // Ex: "tranchants", "contondants", "perforants"
  weaponProperties?: string[]; // Ex: ["Finesse", "Légère", "À deux mains"]
  armorClass?: number;       // CA de base pour armures/boucliers
  armorType?: 'légère' | 'intermédiaire' | 'lourde' | 'bouclier';
  stealthDisadvantage?: boolean; // Désavantage en Discrétion
  strengthRequired?: number; // Force minimum requise
  
  // Slots d'équipement (pour gestion des conflits)
  slot?: EquipmentSlot;      // Slot où l'item peut être équipé
  equippedSlot?: string;     // Pour différencier main droite/gauche ou anneau gauche/droit
  
  // Harmonisation (US-041 à US-043)
  attunement?: Attunement;
  
  // Charges (US-044 à US-047)
  charges?: ItemCharges;
  
  // Lumière (US-012 à US-014)
  lightSource?: LightSource;
  
  // Vision (US-035 à US-037)
  visionEffect?: VisionEffect;
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

// Harmonisation (Attunement)
export interface Attunement {
  required: boolean;
  isAttuned: boolean;
  attunementTime?: 'short_rest' | 'long_rest';
  prerequisites?: {
    alignment?: string;
    class?: string;
    race?: string;
    spellcasting?: boolean;
  };
}

// Charges
export type RechargeType = 'dawn' | 'dusk' | 'short_rest' | 'long_rest' | 'weekly' | 'never';

export interface ItemCharges {
  current: number;
  max: number;
  recharge: RechargeType;
  destroyOnDepletion?: boolean; // pour baguettes
}

// Lumière
export interface LightSource {
  brightLightRadius: number;  // en mètres
  dimLightRadius: number;
  requiresHand: boolean;
  fuelDuration?: number;      // en heures (null = illimité)
  fuelRemaining?: number;     // temps restant
}

// Vision
export interface VisionEffect {
  darkvision?: number;        // portée en mètres
  truesight?: number;
  blindsight?: number;
  special?: string;
  isActive?: boolean;         // état actif/inactif de l'effet
}

// Slots d'équipement pour la gestion des conflits
export type EquipmentSlot = 
  | 'head'           // casque, bandeau
  | 'eyes'           // lunettes, lentilles
  | 'neck'           // amulette
  | 'shoulders'      // cape
  | 'body'           // armure
  | 'hands'          // gants, gantelets
  | 'ring'           // anneaux (max 2)
  | 'waist'          // ceinture
  | 'feet'           // bottes
  | 'main_hand'      // arme principale
  | 'off_hand'       // bouclier, arme secondaire
  | 'light_source'   // torche, lanterne
  | 'focus'          // focus arcanique
  | 'clothes'        // vêtements sous l'armure
  | 'back'           // sac à dos
  | 'waist_back';    // sacs sans fond, etc.

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
// BACKGROUNDS
// ============================================

export interface Background {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  skillProficiencies: string[]; // IDs des compétences maîtrisées
  toolProficiencies?: string[];
  languages?: number; // Nombre de langues supplémentaires
  equipment: string[];
  feature: {
    name: string;
    description: string;
  };
}

// ============================================
// PERSONNAGE
// ============================================

export interface Character {
  // Identité
  name: string;
  class: 'cleric' | 'multiclass';
  subclass: 'war' | string;
  avatar?: string | null; // URL de l'avatar/photo
  deity?: Deity; // Dieu vénéré
  domain?: ClericDomain; // Domaine du clerc
  background?: Background; // Background du personnage
  
  // Niveau et multiclassage
  level: number;
  multiclassConfig?: MulticlassConfig;
  knownSpellIds: string[]; // Tous les sorts connus (préparables)
  
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
  
  // Description et détails physiques
  description?: string;
  race?: string; // Race du personnage
  alignment?: string; // Alignement personnel
  age?: number;
  height?: string;
  weight?: number; // Poids en kg
  languages?: string[]; // Langues parlées
  
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
  4: number;
  5: number;
  6?: number;
  7?: number;
  8?: number;
  9?: number;
}

// ============================================
// MULTICLASSAGE
// ============================================

export type CharacterClassType = 'cleric' | 'wizard' | 'multiclass';

export interface CharacterClass {
  id: CharacterClassType;
  name: string;
  level: number;
  spellcastingAbility: 'wisdom' | 'intelligence';
}

export interface MulticlassConfig {
  classes: CharacterClass[];
  primaryClass: 'cleric' | 'wizard';
  totalLevel: number;
  combinedSpellSlots: SpellSlots;
  spellsByClass: {
    cleric: string[];
    wizard: string[];
  };
}

// ============================================
// SHOPPING LIST ENRICHIE
// ============================================

export interface ClassRelatedSpellInfo {
  spellId: string;
  spellName: string;
  consumed: boolean;
  classSource: 'cleric' | 'wizard';
}

export interface EnrichedShoppingListItem {
  itemId: string;
  priority: ShoppingPriority;
  category: 'component' | 'consumable' | 'equipment' | 'weapon' | 'armor';
  componentType?: ComponentType;
  relatedSpells?: ClassRelatedSpellInfo[];
  restockConfig: RestockConfig;
  quantityIdeal: number;
  quantityToBuy: number;
  notes?: string;
  autoAdded: boolean;
  lastPurchased?: string;
  classSource?: 'cleric' | 'wizard';
}

// Alternative de composant (pour les cas "Eau bénite OU poudre d'argent")
export interface ComponentAlternative {
  itemId: string;
  itemName: string;
  price: number;
}

// Mapping complet des composants par sort
export interface SpellComponentMapping {
  spellId: string;
  spellName: string;
  spellLevel: number;
  classSource: 'cleric' | 'wizard';
  itemId: string;
  itemName: string;
  quantity: number;
  consumed: boolean;
  price: number;
  priority: ShoppingPriority;
  // Pour les composants alternatifs (ex: "Eau bénite OU poudre d'argent")
  alternatives?: ComponentAlternative[];
  // Identifie un groupe de composants alternatifs pour ce sort
  alternativeGroupId?: string;
}

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
