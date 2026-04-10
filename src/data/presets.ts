import type { SpellPreset } from '@/types';

/**
 * Préréglages de préparation de sorts
 * Chaque preset contient une liste de sorts ordonnée par priorité.
 * Les sorts les plus importants sont en premier.
 * Le système sélectionne automatiquement les N premiers selon le maxPrepared du personnage.
 * 
 * Exemple: Si le clerc peut préparer 8 sorts, il prend les 8 premiers de la liste.
 * S'il peut préparer 10 sorts (Sag 20, niveau 5 = 10), il prend les 10 premiers.
 */

// Version du preset pour forcer la mise à jour des caches
export const PRESET_VERSION = '2024-01-15-v4-con';

export const defaultPresets: SpellPreset[] = [
  {
    id: 'kimi-optimal',
    name: '⭐ Choix Optimal',
    icon: 'star',
    description: `Sélection équilibrée et optimisée : les sorts les plus puissants et polyvalents [${PRESET_VERSION}]`,
    // Ordre de priorité : sorts sans concentration d'abord (CON 10), puis utilitaires
    spellIds: [
      // N3 - Priorité maximale (instantanés ou pré-combat)
      'retour-a-la-vie',                    // Ramener un allié à la vie - instantané
      'dissipation-de-la-magie',            // Annuler sorts ennemis - instantané
      'lueur-despoir',                      // Heal zone + buff CA - concentration OK (loin combat)
      // N2 - Priorité haute (sans concentration pour CON 10)
      'prière-de-guérison',                 // Heal efficace - instantané
      'aide',                               // Buff PV max 8h - pas concentration
      'lien-de-protection',                 // Protection allié 1h - pas concentration
      'arme-spirituelle',                   // Dégâts bonus - SORT DE DOMAINE (gratuit)
      // N1 - Priorité moyenne
      'soins',                              // Heal fiable - instantané
      'éclair-guidé',                       // Dégâts + avantage - instantané
      'bénédiction',                        // Avantage attaques - concentration mais essentiel
      'sanctuaire',                         // Protection urgence 1 min - pas concentration
      // Sorts supplémentaires pour haute Sagesse
      'mot-de-guérison-de-groupe',          // Heal multi-cibles - instantané
      'cécité-surdité',                     // Handicap ennemi - pas concentration
      'protection-contre-une-énergie',      // Résistance 1h - concentration pré-combat
      'délivrance-des-malédictions',        // Retirer malédictions - instantané
    ],
    isDefault: true,
  },
  {
    id: 'survie',
    name: '🏥 Mode Survie',
    icon: 'heart',
    description: 'Maximum de soins et protection pour des combats difficiles (optimisé CON 10)',
    spellIds: [
      // N3 - Heals instantanés prioritaires
      'retour-a-la-vie',                    // Ultime recours - instantané
      'dissipation-de-la-magie',            // Annuler sorts ennemis - instantané
      'mot-de-guérison-de-groupe',          // Heal 6 cibles - instantané
      'lueur-despoir',                      // Heal massif - concentration acceptable
      // N2 - Protection sans concentration
      'prière-de-guérison',                 // Heal efficace - instantané
      'aide',                               // Buff PV max 8h - pas concentration
      'lien-de-protection',                 // Protection allié 1h - pas concentration
      'protection-contre-le-poison',        // Immun poison 1h - pas concentration
      // N1 - Heal instantané
      'soins',                              // Heal fiable - instantané
      'mot-de-guérison',                    // Heal action bonus - instantané
      'sanctuaire',                         // Protection 1 min - pas concentration
      // Extras
      'restauration-partielle',             // Guérir états - instantané
      'protection-contre-une-énergie',      // Résistance - concentration pré-combat
      'résistance',                         // Buff JS +1d4 (tour de magie)
    ],
    isDefault: true,
  },
  {
    id: 'combat-agressif',
    name: '⚔️ Combat Agressif',
    icon: 'sword',
    description: 'Dégâts, contrôle et buffs offensifs (optimisé CON 10 - minimise concentration)',
    spellIds: [
      // N3 - Sorts puissants instantanés
      'dissipation-de-la-magie',            // Annuler buffs ennemis - instantané
      'retour-a-la-vie',                    // Sécurité - instantané
      'lueur-despoir',                      // Zone dégâts + buff - concentration loin combat
      // N2 - Dégâts et contrôle sans concentration
      'prière-de-guérison',                 // Sustain - instantané
      'cécité-surdité',                     // Handicap ennemi - PAS CONCENTRATION
      'aide',                               // Buff PV 8h - pas concentration
      'arme-spirituelle',                   // Dégâts bonus - SORT DE DOMAINE (gratuit)
      // N1 - Dégâts instantanés prioritaires
      'éclair-guidé',                       // Dégâts + avantage - instantané
      'bénédiction',                        // Avantage attaques - concentration mais essentiel
      'blessure',                           // Dégâts nécrotiques - instantané
      'injonction',                         // Contrôle 1 round - pas concentration
      // Extras
      'fléau',                              // Malus ennemis - concentration
      'sanctuaire',                         // Protection urgence - pas concentration
    ],
    isDefault: true,
  },
  // ============================================
  // PRESETS ÉLÉMENTAIRES
  // ============================================
  
  {
    id: 'vs-fire',
    name: '🔥 vs Feu',
    icon: 'flame',
    description: 'Dragons de feu, démons, élémentaires de feu, sorts de feu (optimisé CON 10)',
    spellIds: [
      // N3 - Protection instantanée prioritaire
      'protection-contre-une-énergie',      // Résistance feu 1h - concentration OK (pré-combat)
      'dissipation-de-la-magie',            // Annuler souffle - instantané
      'retour-a-la-vie',                    // Au cas où - instantané
      'lueur-despoir',                      // Heal zone - concentration acceptable
      // N2 - Heal et protection sans concentration
      'prière-de-guérison',                 // Heal - instantané
      'aide',                               // Buff PV 8h - pas concentration
      'protection-contre-le-poison',        // Immun poison 1h - pas concentration
      'lien-de-protection',                 // Transfer dégâts 1h - pas concentration
      // N1 - Utilitaires
      'soins',                              // Heal rapide - instantané
      'marche-sur-l-eau',                   // Fuir - 1h pas concentration
      'lumière-du-jour',                    // Contre démons - 1h pas concentration
      'création-de-nourriture-et-d-eau',    // Eau pour éteindre - utilitaire
    ],
    isDefault: true,
  },
  {
    id: 'vs-cold',
    name: '❄️ vs Froid',
    icon: 'snowflake',
    description: 'Dragons de glace, élémentaires de glace, sorts de froid, toundra (optimisé CON 10)',
    spellIds: [
      // N3 - Protection et heal zone
      'protection-contre-une-énergie',      // Résistance froid 1h - concentration pré-combat
      'dissipation-de-la-magie',            // Annuler sorts glace - instantané
      'mot-de-guérison-de-groupe',          // Heal multi-cibles - instantané (IMPORTANT froid zone)
      'retour-a-la-vie',                    // Au cas où - instantané
      'lueur-despoir',                      // Heal zone - concentration acceptable
      // N2 - Protection sans concentration
      'prière-de-guérison',                 // Heal - instantané
      'aide',                               // Buff PV 8h - pas concentration
      'lien-de-protection',                 // Transfer dégâts 1h - pas concentration
      'protection-contre-le-poison',        // Immun poison 1h - pas concentration
      // N1
      'soins',                              // Heal rapide - instantané
      'marche-sur-l-eau',                   // Traverser glace/eau - 1h pas concentration
      'résistance',                         // +1d4 JS (tour de magie)
    ],
    isDefault: true,
  },
  {
    id: 'vs-lightning',
    name: '⚡ vs Foudre',
    icon: 'zap',
    description: 'Dragons bleus, tempêtes, élémentaires d\'air, sorts électriques (optimisé CON 10)',
    spellIds: [
      // N3 - Protection et heal prioritaires
      'protection-contre-une-énergie',      // Résistance foudre 1h - concentration pré-combat
      'dissipation-de-la-magie',            // Annuler foudre - instantané
      'mot-de-guérison-de-groupe',          // Heal zone - instantané (IMPORTANT foudre zone)
      'retour-a-la-vie',                    // Foudre = one-shot - instantané
      'lueur-despoir',                      // Heal zone - concentration acceptable
      // N2 - Protection sans concentration
      'prière-de-guérison',                 // Heal - instantané
      'aide',                               // Buff PV 8h - pas concentration
      'lien-de-protection',                 // Protéger carry 1h - pas concentration
      'sanctuaire',                         // Protection urgence 1 min - pas concentration
      // N1
      'soins',                              // Heal rapide - instantané
      'délivrance-des-malédictions',        // Guérir malédictions - instantané
    ],
    isDefault: true,
  },
  {
    id: 'vs-acid',
    name: '🧪 vs Acide',
    icon: 'droplet',
    description: 'Slimes, blobs noirs, dragons noirs, vers de pourriture, sorts d\'acide',
    spellIds: [
      'protection-contre-une-énergie',  // Résistance acide (ESSENTIEL)
      'retour-a-la-vie',                    // Au cas où
      'lueur-despoir',             // Heal zone + buff
      'dissipation-de-la-magie',        // Annuler sorts d\'acide
      'aide',                           // Buff PV
      'prière-de-guérison',             // Heal
      'restauration-partielle',         // Guérir dégâts d\'acide persistants
      'soins',                          // Heal rapide
      'purification-de-nourriture-et-d-eau', // Eau pour rincer
      'création-ou-destruction-d-eau',  // Nettoyer l\'acide
      'protection-contre-le-poison',    // Acide souvent = poison
      'délivrance-des-malédictions',    // Malédictions d\'ooze
    ],
    isDefault: true,
  },
  {
    id: 'vs-thunder',
    name: '🔊 vs Tonnerre',
    icon: 'cloud-lightning',
    description: 'Géants des tempêtes, élémentaires d\'air, sorts de tonnerre, vibrations',
    spellIds: [
      'protection-contre-une-énergie',  // Résistance tonnerre (ESSENTIEL)
      'retour-a-la-vie',                    // Au cas où
      'lueur-despoir',             // Heal zone + buff
      'dissipation-de-la-magie',        // Annuler tonnerre
      'aide',                           // Buff PV
      'prière-de-guérison',             // Heal
      'silence',                        // Contre sorts sonores
      'soins',                          // Heal rapide
      'mot-de-guérison-de-groupe',      // Tonnerre = zone
      'lien-de-protection',             // Protéger alliés
      'cécité-surdité',                 // Surdité contre dégâts sonores
      'sanctuaire',                     // Protection urgence
    ],
    isDefault: true,
  },
  {
    id: 'vs-poison',
    name: '☠️ vs Poison',
    icon: 'venom',
    description: 'Insectes géants, araignées, serpents, plantes carnivores, assassins',
    spellIds: [
      'protection-contre-le-poison',    // Immunité poison (ESSENTIEL)
      'protection-contre-une-énergie',  // Résistance poison (si optionnel)
      'retour-a-la-vie',                    // Au cas où
      'lueur-despoir',             // Heal zone + buff
      'délivrance-des-malédictions',    // Certains poisons maudissent
      'aide',                           // Buff PV
      'prière-de-guérison',             // Heal
      'restauration-partielle',         // Guérir empoisonnement
      'soins',                          // Heal rapide
      'mot-de-guérison-de-groupe',      // Multiple victimes empoisonnées
      'purification-de-nourriture-et-d-eau', // Nourriture empoisonnée
      'détection-du-poison-et-des-maladies', // Détecter poison
    ],
    isDefault: true,
  },
  {
    id: 'vs-elements',
    name: '🛡️ vs Multi-Éléments',
    icon: 'shield',
    description: 'Environnements variés, élémentaires multiples, sorts divers',
    spellIds: [
      'protection-contre-une-énergie',  // Choisir selon situation
      'dissipation-de-la-magie',        // Annuler tout sort élémentaire
      'retour-a-la-vie',                    // Au cas où
      'lueur-despoir',             // Heal zone + buff
      'prière-de-guérison',             // Heal
      'aide',                           // Buff PV
      'soins',                          // Heal rapide
      'protection-contre-le-poison',    // Souvent associé aux éléments
      'résistance',                     // +1d4 générique
      'restauration-partielle',         // Guérir états divers
      'sanctuaire',                     // Protection urgence
      'cercle-magique',                 // Protection zone
    ],
    isDefault: true,
  },
  {
    id: 'vs-undead',
    name: '💀 vs Morts-Vivants',
    icon: 'skull',
    description: 'Lumière, protection et soins contre nécromanciens et morts-vivants',
    spellIds: [
      'lumière-du-jour',                // Désavantage morts-vivants (ESSENTIEL)
      'retour-a-la-vie',                    // Contre la mort
      'lueur-despoir',             // Dégâts radiants + heal
      'dissipation-de-la-magie',        // Annuler nécromancie
      'mot-de-guérison-de-groupe',      // Heal multi-cibles
      'aide',                           // Buff
      'prière-de-guérison',             // Heal
      'soins',                          // Sustain
      'protection-contre-le-mal-et-le-bien', // Protection fiélon/céleste
      'détection-du-mal-et-du-bien',    // Détecter présence
      'sanctuaire',                     // Protection individuelle
      'immobilisation-de-personne',     // Paralysie (immunité morts-vivants?)
    ],
    isDefault: true,
  },
  {
    id: 'support',
    name: '🛡️ Support & Buffs',
    icon: 'shield',
    description: 'Maximiser les alliés : buffs, protection et avantages',
    spellIds: [
      'lueur-despoir',             // Buff CA toute l\'équipe
      'aide',                           // +5 PV max + avantage
      'amélioration-de-caractéristique', // +2 caractéristique
      'bénédiction',                    // Avantage attaques
      'lien-de-protection',             // Protéger le carry
      'protection-contre-le-poison',    // Immunité poison
      'prière-de-guérison',             // Heal
      'soins',                          // Heal rapide
      'assistance',                     // +1d4 à un jet (tour de magie)
      'résistance',                     // +1d4 sauvegarde (tour de magie)
      'arme-magique',                   // +1 arme
      'protection-contre-le-mal-et-le-bien', // Protection
    ],
    isDefault: true,
  },
  {
    id: 'exploration',
    name: '🧭 Exploration',
    icon: 'compass',
    description: 'Détection, déplacement et utilitaires pour l\'aventure',
    spellIds: [
      'communication-à-distance',       // Communication 500 miles
      'détection-de-la-magie',          // Détecter pièges magiques
      'augure',                         // Prédire danger (rituel)
      'marche-sur-l-eau',               // Traverser eau/lave
      'localisation-d-objet',           // Trouver objet
      'sens-des-pièges',                // Détecter pièges
      'aide',                           // Aider escalade/sauts
      'prière-de-guérison',             // Heal entre combats
      'détection-du-poison-et-des-maladies',
      'purification-de-nourriture-et-d-eau',
      'création-ou-destruction-d-eau',  // Créer eau
      'lumière',                        // Éclairage (tour de magie)
      'thaumaturgie',                   // Effets théâtraux (tour de magie)
    ],
    isDefault: true,
  },
  {
    id: 'anti-mage',
    name: '📜 Anti-Mage',
    icon: 'scroll',
    description: 'Contre les lanceurs de sorts et créatures magiques',
    spellIds: [
      'dissipation-de-la-magie',        // Annuler tout sort
      'cercle-magique',                 // Protection invocation
      'silence',                        // Zone d\'antimagie (ESSENTIEL)
      'délivrance-des-malédictions',    // Retirer malédictions
      'zone-de-vérité',                 // Interroger prisonnier
      'retour-a-la-vie',                    // Sécurité
      'lueur-despoir',             // Sustain combat
      'prière-de-guérison',             // Heal
      'protection-contre-une-énergie',  // Résistance sorts
      'détection-de-la-magie',          // Détecter lanceurs
      'protection-contre-le-mal-et-le-bien', // Protection invocations
      'immobilisation-de-personne',     // Empêcher incantation
    ],
    isDefault: true,
  },
  {
    id: 'social-investigation',
    name: '🕵️ Enquête Sociale',
    icon: 'users',
    description: 'Communication, persuasion et investigation pour résoudre des mystères en groupe',
    spellIds: [
      // N3 - Outils d'enquête avancés
      'communication-à-distance',       // Coordination à distance (ESSENTIEL)
      'clairvoyance',                   // Espionnage à distance
      'communication-avec-les-morts',   // Interroger les défunts
      'langues',                        // Communiquer avec tous
      // N2 - Interrogation et contrôle social
      'zone-de-vérité',                 // Forcer la vérité (ESSENTIEL)
      'apaisement-des-émotions',        // Désamorcer tensions
      'amélioration-de-caractéristique', // Buff Charisme
      'silence',                        // Discrétion
      'immobilisation-de-personne',     // Retenir suspect
      // N1 - Détection et base
      'détection-de-la-magie',          // Détecter illusions/magie
      'détection-du-mal-et-du-bien',    // Sentir intentions
      'injonction',                     // Commandement
      'bénédiction',                    // Aider alliés sociaux
      // Utilitaires
      'localisation-d-objet',           // Trouver indices
      'augure',                         // Prédire danger
    ],
    isDefault: true,
  },
];

// Helper pour obtenir un préréglage par ID
export const getPresetById = (id: string): SpellPreset | undefined => {
  return defaultPresets.find(p => p.id === id);
};

// Helper pour obtenir tous les préréglages par défaut
export const getDefaultPresets = (): SpellPreset[] => {
  return defaultPresets.filter(p => p.isDefault);
};

// Helper pour obtenir les sorts recommandés par Kimi avec explications
export const getKimiRecommendedSpells = (): { id: string; reason: string; priority: number }[] => {
  return [
    { id: 'retour-a-la-vie', reason: 'Ramener un allié à 1PV - game changer', priority: 1 },
    { id: 'lueur-despoir', reason: 'Heal de zone + buff CA pour tous', priority: 2 },
    { id: 'dissipation-de-la-magie', reason: 'Annuler n\'importe quel sort ennemi', priority: 3 },
    { id: 'aide', reason: '+5 PV max et avantage aux jets de sauvegarde', priority: 4 },
    { id: 'prière-de-guérison', reason: 'Meilleur ratio heal/action (2d8+4)', priority: 5 },
    { id: 'lien-de-protection', reason: 'Protéger le carry en prenant ses dégâts', priority: 6 },
    { id: 'arme-spirituelle', reason: 'Dégâts bonus + contrôle zone', priority: 7 },
    { id: 'soins', reason: 'Heal fiable et rapide (1d8+4)', priority: 8 },
    { id: 'bénédiction', reason: 'Avantage aux attaques pour 3 alliés', priority: 9 },
    { id: 'sanctuaire', reason: 'Protection d\'urgence contre les attaques', priority: 10 },
    { id: 'mot-de-guérison-de-groupe', reason: 'Heal 3 cibles à 18m (3d8+3)', priority: 11 },
    { id: 'protection-contre-une-énergie', reason: 'Résistance à feu/froid/élec/acide/tonnerre', priority: 12 },
  ];
};

/**
 * Calcule le nombre maximum de sorts préparables
 * Sagesse mod + niveau du clerc
 */
export const getMaxPreparedSpells = (wisdomScore: number, level: number): number => {
  const modifier = Math.floor((wisdomScore - 10) / 2);
  return Math.max(1, modifier + level);
};

/**
 * Génère un preset personnalisé selon les stats du personnage
 */
export const generateOptimalPreset = (
  maxPrepared: number,
  _situation: 'balanced' | 'combat' | 'survival' | 'exploration' = 'balanced'
): string[] => {
  const recommended = getKimiRecommendedSpells();
  
  // Trie par priorité
  const sorted = recommended.sort((a, b) => a.priority - b.priority);
  
  // Prend les N premiers selon maxPrepared
  return sorted.slice(0, maxPrepared).map(s => s.id);
};

// ============================================
// PRÉRÉGLAGES SPÉCIFIQUES AU DOMAINE
// ============================================

export const domainPresets: Record<string, SpellPreset[]> = {
  // Domaine de la Guerre - Focus sur les buffs offensifs et le combat
  // NOTE: Les sorts de domaine (faveur-divine, bouclier-de-la-foi, arme-magique, 
  // arme-spirituelle, aura-du-croisé) sont gratuits et toujours préparés
  war: [
    {
      id: 'war-tactician',
      name: '⚔️ Tacticien de Guerre',
      icon: 'sword',
      description: 'Buffs d\'armes et avantage pour dominer le champ de bataille (optimisé CON 10)',
      spellIds: [
        // Sorts NON-DOMAINE prioritaires (les sorts de domaine sont gratuits)
        'dissipation-de-la-magie',        // Annuler buffs - instantané
        'aide',                           // Buff PV 8h - pas concentration
        'éclair-guidé',                   // Dégâts + avantage - instantané
        'bénédiction',                    // Avantage attaques - concentration essentiel
        'cécité-surdité',                 // Handicap - pas concentration
        'injonction',                     // Contrôle - pas concentration
        'sanctuaire',                     // Protection - pas concentration
        // Sorts de domaine (gratuits, toujours préparés)
        'faveur-divine',                  // +2d4 dégâts - SORT DOMAINE
        'bouclier-de-la-foi',             // +2 CA - SORT DOMAINE
        'arme-magique',                   // Arme +1 - SORT DOMAINE
        'arme-spirituelle',               // Dégâts bonus - SORT DOMAINE
        'aura-du-croisé',                 // Zone dégâts - SORT DOMAINE
      ],
    },
    {
      id: 'war-divine-striker',
      name: '🔨 Frappe Divine',
      icon: 'hammer',
      description: 'Maximiser les dégâts en mêlée (optimisé CON 10 - minimise concentration)',
      spellIds: [
        // Sorts NON-DOMAINE prioritaires
        'dissipation-de-la-magie',        // Contre protections - instantané
        'éclair-guidé',                   // Dégâts + setup - instantané
        'cécité-surdité',                 // Handicap - PAS CONCENTRATION
        'aide',                           // Sustain 8h - pas concentration
        'lien-de-protection',             // Protection 1h - pas concentration
        'blessure',                       // Dégâts contact - instantané
        'bénédiction',                    // Avantage - concentration essentiel
        // Sorts de domaine (gratuits)
        'arme-spirituelle',               // Dégâts bonus - SORT DOMAINE
        'faveur-divine',                  // Dégâts radiants - SORT DOMAINE
        'aura-du-croisé',                 // Zone dégâts - SORT DOMAINE
        'arme-magique',                   // Bonus arme - SORT DOMAINE
      ],
    },
  ],

  // Domaine de la Vie - Focus sur les soins maximisés
  life: [
    {
      id: 'life-divine-healer',
      name: '✨ Guérisseur Divin',
      icon: 'heart',
      description: 'Soins maximisés pour maintenir l\'équipe debout',
      spellIds: [
        'lueur-despoir',             // Avantage JS CON + soins max
        'retour-a-la-vie',                    // Ressusciter
        'mot-de-guérison-de-groupe',      // Heal 6 cibles
        'prière-de-guérison',             // Heal zone efficace
        'aide',                           // +5 PV max
        'soins',                          // Heal fiable
        'mot-de-guérison',                // Heal action bonus
        'restauration-partielle',         // Guérir états
        'protection-contre-le-poison',    // Immun poison
        'délivrance-des-malédictions',    // Nettoyer malédictions
        'lien-de-protection',             // Répartir dégâts
        'sanctuaire',                     // Protection urgence
      ],
    },
    {
      id: 'life-restoration',
      name: '🏥 Restauration Totale',
      icon: 'sparkles',
      description: 'Guérison complète des maladies, poisons et états',
      spellIds: [
        'restauration-partielle',         // Guérir aveuglé/assourdi/paralysé/empoisonné
        'protection-contre-le-poison',    // Immun poison
        'délivrance-des-malédictions',    // Supprimer malédictions
        'retour-a-la-vie',                    // Ressusciter
        'prière-de-guérison',             // Heal groupe
        'lueur-despoir',             // Buff soins
        'soins',                          // Heal rapide
        'mot-de-guérison-de-groupe',      // Heal multi
        'préservation-des-morts',         // Préparer résurrection
        'détection-du-poison-et-des-maladies', // Anticiper
        'purification-de-nourriture-et-d-eau', // Prévention
      ],
    },
  ],

  // Domaine de la Lumière - Focus sur les dégâts radiants et lumière
  light: [
    {
      id: 'light-radiant-damage',
      name: '☀️ Porteur de Lumière',
      icon: 'sun',
      description: 'Dégâts radiants massifs et lumière contre les ténèbres',
      spellIds: [
        'flamme-sacrée',                  // Tour de magie radiants
        'lumière-du-jour',                // Lumière vive 18m
        'aura-du-croisé',                 // Zone +1d4 radiants
        'éclair-guidé',                   // 4d6 radiants + avantage
        'lueur-despoir',             // Buff + soins
        'faveur-divine',                  // Dégâts radiants bonus
        'détection-du-mal-et-du-bien',    // Détecter menaces
        'protection-contre-le-mal-et-le-bien', // Protection
        'dissipation-de-la-magie',        // Dissiper ténèbres magiques
        'lumière',                        // Tour de magie lumière
        'flamme-éternelle',               // Lumière permanente
      ],
    },
    {
      id: 'light-destroy-undead',
      name: '💀 Chasseur de Morts-Vivants',
      icon: 'skull',
      description: 'Spécialisé contre les morts-vivants avec lumière radiante',
      spellIds: [
        'lumière-du-jour',                // Désavantage morts-vivants
        'esprits-gardiens',               // Zone dégâts radiants
        'aura-du-croisé',                 // Dégâts radiants alliés
        'éclair-guidé',                   // Dégâts radiants
        'retour-a-la-vie',                    // Contre la mort
        'détection-du-mal-et-du-bien',    // Détecter morts-vivants
        'protection-contre-le-mal-et-le-bien', // Protection
        'dissipation-de-la-magie',        // Annuler nécromancie
        'préservation-des-morts',         // Empêcher animation
        'animation-des-morts',            // Si on veut contrôler
      ],
    },
  ],

  // Domaine de la Nature - Focus sur éléments et utilitaires
  nature: [
    {
      id: 'nature-elemental-control',
      name: '🌿 Gardien Élémentaire',
      icon: 'leaf',
      description: 'Contrôle des éléments et protection naturelle',
      spellIds: [
        'protection-contre-une-énergie',  // Résistance élémentaire
        'marche-sur-l-eau',               // Traverser eau
        'création-ou-destruction-d-eau',  // Contrôle eau
        'création-de-nourriture-et-d-eau', // Subsistance
        'purification-de-nourriture-et-d-eau', // Purifier
        'protection-contre-le-poison',    // Immun poison nature
        'aide',                           // Buff survie
        'prière-de-guérison',             // Heal naturel
        'détection-du-poison-et-des-maladies', // Sens naturel
        'détection-de-la-magie',          // Sens magique
      ],
    },
    {
      id: 'nature-explorer',
      name: '🧭 Explorateur Sauvage',
      icon: 'compass',
      description: 'Sorts utilitaires pour survivre en nature',
      spellIds: [
        'marche-sur-l-eau',               // Traverser rivières
        'communication-à-distance',       // Communication groupe
        'augure',                         // Prédire dangers
        'localisation-d-objet',           // Trouver ressources
        'création-de-nourriture-et-d-eau', // Ravitaillement
        'purification-de-nourriture-et-d-eau', // Eau potable
        'détection-du-poison-et-des-maladies', // Baies/plantes
        'sens-des-pièges',                // Pièges naturels
        'détection-de-la-magie',          // Plantes magiques
        'aide',                           // Escalade/sauts
        'réparation',                     // Équipement
      ],
    },
  ],

  // Domaine de la Tempête - Focus foudre et tonnerre
  tempest: [
    {
      id: 'tempest-storm-master',
      name: '⛈️ Maître des Tempêtes',
      icon: 'cloud-lightning',
      description: 'Foudre, tonnerre et vents dévastateurs',
      spellIds: [
        'protection-contre-une-énergie',  // Résistance foudre
        'protection-contre-une-énergie',  // Résistance tonnerre (deuxième choix)
        'silence',                        // Contre sorts sonores
        'cécité-surdité',                 // Surdité contre tonnerre
        'dissipation-de-la-magie',        // Annuler sorts tempête
        'esprits-gardiens',               // Zone de dégâts
        'retour-a-la-vie',                    // Foudre = one-shot
        'lueur-despoir',             // Heal zone
        'prière-de-guérison',             // Heal
        'lien-de-protection',             // Protéger alliés
        'mot-de-guérison-de-groupe',      // Heal foudre de zone
      ],
    },
    {
      id: 'tempest-fury',
      name: '⚡ Furie Orageuse',
      icon: 'zap',
      description: 'Résistance et riposte aux dégâts électriques',
      spellIds: [
        'protection-contre-une-énergie',  // Foudre résistance
        'protection-contre-le-poison',    // Bonus défensif
        'dissipation-de-la-magie',        // Contrer magie
        'retour-a-la-vie',                    // Sécurité
        'lueur-despoir',             // Sustain
        'esprits-gardiens',               // Zone contrôle
        'cécité-surdité',                 // Handicap ennemis
        'silence',                        // Désactiver sorts
        'arme-spirituelle',               // Dégâts bonus
        'aide',                           // Buff combat
      ],
    },
  ],

  // Domaine de la Tromperie - Focus illusions et discrétion
  trickery: [
    {
      id: 'trickery-shadow',
      name: '🎭 Maître des Ombres',
      icon: 'mask',
      description: 'Illusions, discrétion et manipulation',
      spellIds: [
        'silence',                        // Pas de bruit
        'injonction',                     // Contrôle comportement
        'immobilisation-de-personne',     // Paralysie = fuite
        'cécité-surdité',                 // Handicap poursuivants
        'détection-du-mal-et-du-bien',    // Détecter pièges vivants
        'apaisement-des-émotions',        // Détourner attention
        'zone-de-vérité',                 // Interrogatoire
        'détection-de-la-magie',          // Détecter pièges magiques
        'localisation-d-objet',           // Trouver cibles
        'clairvoyance',                   // Espionnage
        'fusion-dans-la-pierre',          // Cachette ultime
      ],
    },
    {
      id: 'trickery-deceiver',
      name: '👤 Illusionniste',
      icon: 'ghost',
      description: 'Tromperie, charme et contrôle social',
      spellIds: [
        'injonction',                     // Commandement
        'apaisement-des-émotions',        // Calmer tensions
        'zone-de-vérité',                 // Forcer vérité
        'immobilisation-de-personne',     // Retenir
        'silence',                        // Secret
        'détection-du-mal-et-du-bien',    // Lire intentions
        'détection-de-la-magie',          // Détecter illusions
        'augure',                         // Prédire tromperie
        'langues',                        // Déception multilingue
      ],
    },
  ],

  // Domaine de la Connaissance - Focus divination et information
  knowledge: [
    {
      id: 'knowledge-seeker',
      name: '📚 Chercheur de Vérité',
      icon: 'book',
      description: 'Divination maximale pour révéler tous les secrets',
      spellIds: [
        'clairvoyance',                   // Vision à distance
        'augure',                         // Présage
        'localisation-d-objet',           // Trouver objets
        'détection-de-la-magie',          // Magie détectée
        'détection-du-mal-et-du-bien',    // Alignements
        'détection-du-poison-et-des-maladies', // Dangers cachés
        'sens-des-pièges',                // Pièges
        'communication-avec-les-morts',   // Information morts
        'communication-à-distance',       // Coordination
        'langues',                        // Compréhension
        'zone-de-vérité',                 // Interrogatoire
        'dissipation-de-la-magie',        // Dissiper illusions
      ],
    },
    {
      id: 'knowledge-strategist',
      name: '🧠 Stratège Érudit',
      icon: 'brain',
      description: 'Information et buffs tactiques pour l\'équipe',
      spellIds: [
        'augure',                         // Prédire combat
        'clairvoyance',                   // Reconnaissance
        'détection-de-la-magie',          // Identifier menaces
        'bénédiction',                    // Avantage tactique
        'aide',                           // Buff équipe
        'assistance',                     // Aider jets clés
        'communication-à-distance',       // Coordination
        'localisation-d-objet',           // Trouver avantage
        'amélioration-de-caractéristique', // Buff spécifique
        'dissipation-de-la-magie',        // Contre tactiques magiques
      ],
    },
  ],

  // Domaine de la Forge - Focus feu et artisanat
  forge: [
    {
      id: 'forge-master',
      name: '🔨 Maître Forgeron',
      icon: 'hammer',
      description: 'Feu, métal et amélioration d\'équipement',
      spellIds: [
        'arme-magique',                   // Améliorer arme
        'protection-contre-une-énergie',  // Résistance feu
        'chaleur-du-métal',               // Si disponible
        'flamme-éternelle',               // Feu permanent
        'création-ou-destruction-d-eau',  // Tremper/refroidir
        'réparation',                     // Réparer équipement
        'aide',                           // Buff artisanat
        'protection-contre-le-poison',    // Fumées
        'dissipation-de-la-magie',        // Contre magie
      ],
    },
    {
      id: 'forge-fire-warrior',
      name: '🔥 Guerrier de Feu',
      icon: 'flame',
      description: 'Combat embrasé avec résistance et dégâts de feu',
      spellIds: [
        'protection-contre-une-énergie',  // Immun feu
        'arme-magique',                   // Arme enflammée
        'faveur-divine',                  // Dégâts bonus
        'aura-du-croisé',                 // Zone de feu divin
        'arme-spirituelle',               // Arme spectrale de feu
        'éclair-guidé',                   // Frappe radiante
        'bénédiction',                    // Avantage
        'aide',                           // Sustain
        'dissipation-de-la-magie',        // Contre eau
      ],
    },
  ],

  // Domaine du Tombeau - Focus entre-deux mondes
  grave: [
    {
      id: 'grave-keeper',
      name: '⚰️ Gardien du Seuil',
      icon: 'coffin',
      description: 'Protection contre la mort et contrôle des frontières',
      spellIds: [
        'sentinelle-du-cercueil',         // Si sort spécifique
        'retour-a-la-vie',                    // Empêcher mort
        'préservation-des-morts',         // Préserver corps
        'lumière-du-jour',                // Contre morts-vivants
        'dissipation-de-la-magie',        // Annuler nécromancie
        'protection-contre-le-mal-et-le-bien', // Protection
        'délivrance-des-malédictions',    // Malédictions mort
        'détection-du-mal-et-du-bien',    // Détecter présences
        'communication-avec-les-morts',   // Parler défunts
        'lueur-despoir',             // Heal critique
        'prière-de-guérison',             // Heal groupe
        'soins',                          // Heal urgence
      ],
    },
    {
      id: 'grave-death-watcher',
      name: '💀 Veilleur des Âmes',
      icon: 'skull',
      description: 'Anticiper et contrer la magie de mort',
      spellIds: [
        'préservation-des-morts',         // Bloquer animation
        'retour-a-la-vie',                    // Ramener à la vie
        'lumière-du-jour',                // Repousser morts-vivants
        'dissipation-de-la-magie',        // Dissiper nécromancie
        'protection-contre-le-mal-et-le-bien', // Barrière
        'détection-du-mal-et-du-bien',    // Identifier
        'esprits-gardiens',               // Esprits protecteurs
        'délivrance-des-malédictions',    // Malédictions nécromantiques
        'restauration-partielle',         // Guérir états
        'animation-des-morts',            // Si besoin contrôle
      ],
    },
  ],
};

// Helper pour obtenir les préréglages d'un domaine spécifique
export const getDomainPresets = (domainId: string): SpellPreset[] => {
  return domainPresets[domainId] || [];
};

// Helper pour obtenir tous les préréglages (défauts + domaine)
export const getAllPresetsForCharacter = (domainId?: string): SpellPreset[] => {
  const domainSpecific = domainId ? getDomainPresets(domainId) : [];
  return [...defaultPresets, ...domainSpecific];
};
