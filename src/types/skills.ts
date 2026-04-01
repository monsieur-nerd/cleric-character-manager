// ============================================
// COMPÉTENCES D&D 5E
// ============================================

export type AbilityScore = 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA';

export interface Skill {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  abilityScore: AbilityScore;
  abilityScoreName: string;
  category: 'physical' | 'mental' | 'social';
  examples: string[];
  summary: string; // Résumé succinct pour l'affichage en carte
  isCustom?: boolean; // Indique si c'est une compétence personnalisée
}

// Compétence personnalisée (créée par l'utilisateur)
export interface CustomSkill {
  id: string;
  name: string;
  description: string;
  abilityScore: AbilityScore;
  category: 'physical' | 'mental' | 'social';
  summary: string;
}

export const ABILITY_SCORES: Record<AbilityScore, { name: string; fullName: string }> = {
  STR: { name: 'FOR', fullName: 'Force' },
  DEX: { name: 'DEX', fullName: 'Dextérité' },
  CON: { name: 'CON', fullName: 'Constitution' },
  INT: { name: 'INT', fullName: 'Intelligence' },
  WIS: { name: 'SAG', fullName: 'Sagesse' },
  CHA: { name: 'CHA', fullName: 'Charisme' },
};

export const SKILLS: Skill[] = [
  {
    id: 'acrobatics',
    name: 'Acrobaties',
    nameEn: 'Acrobatics',
    description: 'Tests pour maintenir l\'équilibre, effectuer des cabrioles, sauter par-dessus un obstacle, ou se faufiler dans des espaces étroits.',
    abilityScore: 'DEX',
    abilityScoreName: 'Dextérité',
    category: 'physical',
    examples: ['Tenir en équilibre sur une corde', 'Se faufiler entre des barreaux', 'Atterrir correctement après un saut'],
    summary: 'Équilibre, cabrioles, sauts',
  },
  {
    id: 'athletics',
    name: 'Athlétisme',
    nameEn: 'Athletics',
    description: 'Tests d\'escalade, de natation, de saut en hauteur ou en longueur, et de lutte.',
    abilityScore: 'STR',
    abilityScoreName: 'Force',
    category: 'physical',
    examples: ['Grimper à une falaise', 'Nager contre un courant', 'Sauter par-dessus un précipice', 'Lutte'],
    summary: 'Escalade, natation, lutte',
  },
  {
    id: 'sleight-of-hand',
    name: 'Escamotage',
    nameEn: 'Sleight of Hand',
    description: 'Tests pour voler à la tire, déguiser un objet, crocheter une serrure, ou effectuer des tours de passe-passe.',
    abilityScore: 'DEX',
    abilityScoreName: 'Dextérité',
    category: 'physical',
    examples: ['Voler une bourse', 'Crocheter une serrure', 'Cacher une arme', 'Lancer une pièce truquée'],
    summary: 'Vol à la tire, crochetage',
  },
  {
    id: 'stealth',
    name: 'Discrétion',
    nameEn: 'Stealth',
    description: 'Tests pour se cacher, se déplacer furtivement, ou passer inaperçu.',
    abilityScore: 'DEX',
    abilityScoreName: 'Dextérité',
    category: 'physical',
    examples: ['Se cacher dans l\'ombre', 'Suivre quelqu\'un discrètement', 'S\'infiltrer dans un camp'],
    summary: 'Se cacher, furtivité',
  },
  {
    id: 'arcana',
    name: 'Arcanes',
    nameEn: 'Arcana',
    description: 'Connaissance des sorts, objets magiques, symboles ésotériques, et traditions magiques.',
    abilityScore: 'INT',
    abilityScoreName: 'Intelligence',
    category: 'mental',
    examples: ['Identifier un sort', 'Reconnaître un symbole magique', 'Connaître les faiblesses d\'un golem'],
    summary: 'Magie, sorts, enchantements',
  },
  {
    id: 'history',
    name: 'Histoire',
    nameEn: 'History',
    description: 'Connaissance des événements historiques, légendes, royaumes antiques, et guerres passées.',
    abilityScore: 'INT',
    abilityScoreName: 'Intelligence',
    category: 'mental',
    examples: ['Identifier une ruine ancienne', 'Connaître une dynastie royale', 'Se souvenir d\'un traité'],
    summary: 'Événements historiques, légendes',
  },
  {
    id: 'investigation',
    name: 'Investigation',
    nameEn: 'Investigation',
    description: 'Recherche d\'indices, analyse de détails, déduction logique, et découverte de secrets.',
    abilityScore: 'INT',
    abilityScoreName: 'Intelligence',
    category: 'mental',
    examples: ['Trouver un objet caché', 'Analyser des empreintes', 'Déduire le coupable'],
    summary: 'Recherche, déduction, indices',
  },
  {
    id: 'nature',
    name: 'Nature',
    nameEn: 'Nature',
    description: 'Connaissance du terrain, des plantes, des animaux, du climat, et des cycles naturels.',
    abilityScore: 'INT',
    abilityScoreName: 'Intelligence',
    category: 'mental',
    examples: ['Identifier une plante toxique', 'Prévoir la météo', 'Repérer une piste animale'],
    summary: 'Flore, faune, terrains',
  },
  {
    id: 'religion',
    name: 'Religion',
    nameEn: 'Religion',
    description: 'Connaissance des dieux, rites religieux, symboles sacrés, et pratiques cultuelles.',
    abilityScore: 'INT',
    abilityScoreName: 'Intelligence',
    category: 'mental',
    examples: ['Identifier un symbole divin', 'Connaître un rituel', 'Reconnaître un serviteur divin'],
    summary: 'Dieux, rites, symboles sacrés',
  },
  {
    id: 'animal-handling',
    name: 'Dressage',
    nameEn: 'Animal Handling',
    description: 'Calmer, dresser, ou comprendre le comportement des animaux.',
    abilityScore: 'WIS',
    abilityScoreName: 'Sagesse',
    category: 'mental',
    examples: ['Calmer un cheval effrayé', 'Dresser un chien', 'Intimider un animal'],
    summary: 'Animaux, dressage, intuition',
  },
  {
    id: 'insight',
    name: 'Perspicacité',
    nameEn: 'Insight',
    description: 'Déterminer les véritables intentions d\'une créature, détecter les mensonges, ou lire les émotions.',
    abilityScore: 'WIS',
    abilityScoreName: 'Sagesse',
    category: 'mental',
    examples: ['Détecter un mensonge', 'Évaluer la sincérité', 'Percevoir les motivations cachées'],
    summary: 'Détection mensonges, intentions',
  },
  {
    id: 'medicine',
    name: 'Médecine',
    nameEn: 'Medicine',
    description: 'Stabiliser un mourant, diagnostiquer une maladie, ou soigner les blessures.',
    abilityScore: 'WIS',
    abilityScoreName: 'Sagesse',
    category: 'mental',
    examples: ['Stabiliser un allié', 'Identifier une maladie', 'Soigner un empoisonnement'],
    summary: 'Soins, diagnostic, stabilisation',
  },
  {
    id: 'perception',
    name: 'Perception',
    nameEn: 'Perception',
    description: 'Repérer des détails, entendre des bruits, détecter des odeurs, ou remarquer des présences.',
    abilityScore: 'WIS',
    abilityScoreName: 'Sagesse',
    category: 'mental',
    examples: ['Entendre une conversation lointaine', 'Repérer une embuscade', 'Trouver une porte secrète'],
    summary: 'Détection, observation, sens',
  },
  {
    id: 'survival',
    name: 'Survie',
    nameEn: 'Survival',
    description: 'Suivre des traces, chasser, trouver de la nourriture, s\'orienter, ou éviter les dangers naturels.',
    abilityScore: 'WIS',
    abilityScoreName: 'Sagesse',
    category: 'mental',
    examples: ['Suivre des traces', 'Trouver de l\'eau potable', 'Allumer un feu', 'S\'orienter'],
    summary: 'Pistage, orientation, survie',
  },
  {
    id: 'deception',
    name: 'Tromperie',
    nameEn: 'Deception',
    description: 'Mentir de manière convaincante, dissimuler des émotions, ou faire le clown.',
    abilityScore: 'CHA',
    abilityScoreName: 'Charisme',
    category: 'social',
    examples: ['Mentir à un garde', 'Cacher ses intentions', 'Se faire passer pour quelqu\'un d\'autre'],
    summary: 'Mensonge, dissimulation',
  },
  {
    id: 'intimidation',
    name: 'Intimidation',
    nameEn: 'Intimidation',
    description: 'Influencer quelqu\'un par la menace, l\'hostilité, ou la présence imposante.',
    abilityScore: 'CHA',
    abilityScoreName: 'Charisme',
    category: 'social',
    examples: ['Forcer des informations', 'Fuir un combat', 'Obtenir de la coopération'],
    summary: 'Menace, influence par la peur',
  },
  {
    id: 'performance',
    name: 'Représentation',
    nameEn: 'Performance',
    description: 'Chanter, jouer d\'un instrument, raconter des histoires, ou divertir un public.',
    abilityScore: 'CHA',
    abilityScoreName: 'Charisme',
    category: 'social',
    examples: ['Jouer d\'un instrument', 'Chanter', 'Réciter un poème', 'Spectacle de rue'],
    summary: 'Musique, art, divertissement',
  },
  {
    id: 'persuasion',
    name: 'Persuasion',
    nameEn: 'Persuasion',
    description: 'Influencer quelqu\'un par la tact, la finesse, ou des arguments convaincants.',
    abilityScore: 'CHA',
    abilityScoreName: 'Charisme',
    category: 'social',
    examples: ['Négocier un prix', 'Rallier des alliés', 'Convaincre un noble'],
    summary: 'Négociation, charme, arguments',
  },
];

export const getSkillById = (id: string): Skill | undefined => SKILLS.find(skill => skill.id === id);
export const getSkillsByAbility = (ability: AbilityScore): Skill[] => SKILLS.filter(skill => skill.abilityScore === ability);
export const getSkillsByCategory = (category: Skill['category']): Skill[] => SKILLS.filter(skill => skill.category === category);
