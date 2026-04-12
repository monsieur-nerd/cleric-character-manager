// ============================================
// TALENTS (FEATS) D&D 5E
// ============================================

export interface Feat {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  prerequisite?: string;
  effect: string;
  isCombatFeat: boolean;
  isPassive: boolean;
  benefit: string[];
  source?: string;
  isCustom?: boolean; // Indique si c'est un talent personnalisé
}

// Talent personnalisé (créé par l'utilisateur)
export interface CustomFeat {
  id: string;
  name: string;
  description: string;
  effect: string;
  prerequisite?: string;
  isCombatFeat: boolean;
  isPassive: boolean;
  benefit: string[];
}

export const FEATS: Feat[] = [
  {
    id: 'alert',
    name: 'Alerte',
    nameEn: 'Alert',
    description: 'Vous êtes toujours aux aguets et difficile à surprendre.',
    effect: '+5 à l\'initiative, impossible de être surpris, les attaquants invisibles n\'ont pas d\'avantage.',
    isCombatFeat: true,
    isPassive: true,
    benefit: ['+5 bonus à l\'initiative', 'Impossible d\'être surpris', 'Pas d\'avantage aux attaques invisibles'],
  },
  {
    id: 'athlete',
    name: 'Athlète',
    nameEn: 'Athlete',
    description: 'Vous avez subi un entraînement physique poussé.',
    prerequisite: 'Aucun',
    effect: 'Augmentation de FOR ou DEX (+1), relevé sans coût, escalade plus rapide, saut amélioré.',
    isCombatFeat: false,
    isPassive: true,
    benefit: ['+1 FOR ou DEX (max 20)', 'Relever sans utiliser de déplacement', 'Escalade ne coûte pas de déplacement supplémentaire', 'Saut en hauteur avec élan = FOR'],
  },
  {
    id: 'war-caster',
    name: 'Lanceur de Guerre',
    nameEn: 'War Caster',
    description: 'Vous avez pratiqué le lancement de sorts au milieu du chaos du combat.',
    prerequisite: 'Capacité de lancer au moins un sort',
    effect: 'Avantage aux jets de sauvegarde de CON pour maintenir la concentration, gestes somatiques avec armes, attaque d\'opportunité avec sort.',
    isCombatFeat: true,
    isPassive: true,
    benefit: ['Avantage sur les JS de CON pour concentration', 'Peut faire les composantes somatiques avec une arme ou bouclier en main', 'Attaque d\'opportunité avec un sort ciblé'],
    source: 'Parfait pour les clercs de guerre',
  },
  {
    id: 'healer',
    name: 'Soigneur',
    nameEn: 'Healer',
    description: 'Vous êtes un médecin compétent, capable de soigner les blessures.',
    effect: 'Soigner avec une trousse de soins comme action, soigner supplémentaire (1d6+4+niveau), stabiliser avec bonus.',
    isCombatFeat: false,
    isPassive: false,
    benefit: ['Utiliser une trousse comme action (pas d\'action bonus)', 'Créature soignée récupère 1d6+4+PV supplémentaires', '+5 pour stabiliser une créature à 0 PV'],
  },
  {
    id: 'inspiring-leader',
    name: 'Chef Inspirant',
    nameEn: 'Inspiring Leader',
    description: 'Vous pouvez passer 10 minutes à inspirer tous vos compagnons.',
    prerequisite: 'Charisme 13+',
    effect: 'Après 10 minutes de parole, les alliés gagnent des PV temporaires (niveau + mod CHA).',
    isCombatFeat: false,
    isPassive: false,
    benefit: ['Alliés dans 9m gagnent des PV temporaires', 'PV temporaires = niveau + modificateur de CHA', 'Dure jusqu\'au repos court'],
  },
  {
    id: 'lucky',
    name: 'Chanceux',
    nameEn: 'Lucky',
    description: 'La chance vous sourit de manière surnaturelle.',
    effect: '3 points de chance par repos long. Relancer un dé d\'attaque, test de caractéristique, ou JS, ou faire relancer une attaque contre vous.',
    isCombatFeat: true,
    isPassive: false,
    benefit: ['3 points de chance par repos long', 'Relancer un dé d\'attaque, test ou JS avant le résultat', 'Forcer une créature à relancer une attaque contre vous'],
  },
  {
    id: 'magic-initiate',
    name: 'Initié à la Magie',
    nameEn: 'Magic Initiate',
    description: 'Vous avez appris quelques sorts d\'une autre tradition magique.',
    effect: 'Deux tours de magie et un sort de niveau 1 d\'une classe de lanceur. Le sort de niveau 1 est récupérable au repos long.',
    isCombatFeat: false,
    isPassive: true,
    benefit: ['Deux tours de magie d\'une classe', 'Un sort de niveau 1 d\'une classe', 'Caractéristique de lancement basée sur la classe choisie'],
  },
  {
    id: 'observant',
    name: 'Observateur',
    nameEn: 'Observant',
    description: 'Vous êtes rapide pour remarquer les détails.',
    effect: '+1 INT ou SAG (max 20), lire sur les lèvres, bonus de +5 à la Perception passive et Investigation passive.',
    isCombatFeat: false,
    isPassive: true,
    benefit: ['+1 INT ou SAG (max 20)', 'Peut lire sur les lèvres si la langue est connue', '+5 Perception passive', '+5 Investigation passive'],
  },
  {
    id: 'resilient',
    name: 'Résistant',
    nameEn: 'Resilient',
    description: 'Vous avez un talent pour vous reprendre rapidement des revers.',
    effect: '+1 à une caractéristique au choix (max 20), maîtrise des jets de sauvegarde de cette caractéristique.',
    isCombatFeat: true,
    isPassive: true,
    benefit: ['+1 à une caractéristique (max 20)', 'Maîtrise des jets de sauvegarde de cette caractéristique'],
  },
  {
    id: 'ritual-caster',
    name: 'Lanceur de Rituels',
    nameEn: 'Ritual Caster',
    description: 'Vous avez appris un certain nombre de sorts que vous pouvez lancer comme rituels.',
    prerequisite: 'Intelligence ou Sagesse 13+',
    effect: 'Livre de rituels avec 2 sorts de niveau 1, peut ajouter d\'autres sorts de même classe.',
    isCombatFeat: false,
    isPassive: true,
    benefit: ['Livre de rituels', '2 sorts de niveau 1 d\'une classe de lanceur', 'Peut ajouter des sorts de rituel trouvés'],
  },
  {
    id: 'sentinel',
    name: 'Sentinelle',
    nameEn: 'Sentinel',
    description: 'Vous avez maîtrisé les techniques pour profiter de chaque faille dans la défense de vos ennemis.',
    effect: 'L\'attaque d\'opportunité réduit la vitesse à 0, attaque d\'opportunité même après désengagement, attaque d\'opportunité si cible attaque autre.',
    isCombatFeat: true,
    isPassive: true,
    benefit: ['Attaque d\'opportunité réduit la vitesse à 0', 'Attaque d\'opportunité même après Désengagement', 'Attaque d\'opportunité si la cible attaque quelqu\'un d\'autre'],
  },
  {
    id: 'shield-master',
    name: 'Maître des Boucliers',
    nameEn: 'Shield Master',
    description: 'Vous utilisez les boucliers non seulement pour vous protéger, mais aussi de manière offensive.',
    prerequisite: 'Maîtrise des boucliers',
    effect: 'Bonus d\'action bonus pour pousser avec bouclier, bonus de bouclier aux JS de DEX, réaction pour annuler dégâts de zone.',
    isCombatFeat: true,
    isPassive: false,
    benefit: ['Action bonus pour pousser avec le bouclier', 'Bonus de bouclier aux JS de DEX contre effets de zone', 'Réaction pour prendre aucun dégât si JS de DEX réussi'],
  },
  {
    id: 'mobile',
    name: 'Mobile',
    nameEn: 'Mobile',
    description: 'Vous êtes exceptionnellement rapide et agile.',
    effect: 'Vitesse +3m, terrain difficile n\'affecte pas le dash, pas d\'attaque d\'opportunité contre cible que vous avez attaquée.',
    isCombatFeat: true,
    isPassive: true,
    benefit: ['+3m de vitesse', 'Terrain difficile ne ralentit pas le dash', 'Pas d\'attaque d\'opportunité de la cible attaquée ce tour'],
  },
  {
    id: 'tough',
    name: 'Robuste',
    nameEn: 'Tough',
    description: 'Votre santé est exceptionnelle.',
    effect: 'Points de vie maximum augmentés de 2 par niveau.',
    isCombatFeat: true,
    isPassive: true,
    benefit: ['+2 PV maximums par niveau', 'Rétroactif pour les niveaux passés'],
  },
  {
    id: 'sharpshooter',
    name: 'Tireur d\'Élite',
    nameEn: 'Sharpshooter',
    description: 'Vous maîtrisez les armes à distance.',
    effect: 'Pas de désavantage à longue portée, ignore le couvert, option pour -5 toucher +10 dégâts.',
    isCombatFeat: true,
    isPassive: true,
    benefit: ['Pas de désavantage à longue portée', 'Ignore le couvert léger et lourd', 'Attaque : -5 toucher, +10 dégâts (optionnel)'],
  },
  {
    id: 'great-weapon-master',
    name: 'Maître des Armes Lourdes',
    nameEn: 'Great Weapon Master',
    description: 'Vous maîtrisez les armes de corps à corps lourdes.',
    effect: 'Attaque bonus sur critique ou kill avec arme lourde, option pour -5 toucher +10 dégâts avec armes lourdes.',
    isCombatFeat: true,
    isPassive: true,
    benefit: ['Attaque bonus après critique ou élimination (arme lourde)', 'Attaque : -5 toucher, +10 dégâts avec arme lourde (optionnel)'],
  },
  {
    id: 'elemental-adept',
    name: 'Adepte Élémentaire',
    nameEn: 'Elemental Adept',
    description: 'Vos sorts ignorent la résistance à un type de dégâts élémentaire.',
    prerequisite: 'Capacité de lancer au moins un sort',
    effect: 'Ignore la résistance à un type de dégâts élémentaire, les 1 sur les dés de dégâts comptent comme des 2.',
    isCombatFeat: true,
    isPassive: true,
    benefit: ['Ignore la résistance à un type de dégâts (acide, froid, feu, foudre, tonnerre)', 'Les 1 sur les dés de dégâts comptent comme des 2'],
  },
  {
    id: 'spell-sniper',
    name: 'Tireur de Sorts',
    nameEn: 'Spell Sniper',
    description: 'Vous êtes particulièrement doué pour viser avec les sorts.',
    prerequisite: 'Capacité de lancer au moins un sort',
    effect: 'Portée doublée pour les sorts d\'attaque, les sorts d\'attaque ignorent le couvert, un tour de magie d\'attaque supplémentaire.',
    isCombatFeat: true,
    isPassive: true,
    benefit: ['Portée doublée pour les sorts d\'attaque', 'Sorts d\'attaque ignorent le couvert', 'Un tour de magie d\'attaque supplémentaire'],
  },
  {
    id: 'heavily-armored',
    name: 'Toujours en Armure',
    nameEn: 'Heavily Armored',
    description: 'Vous avez appris à vous déplacer en armure lourde.',
    prerequisite: 'Maîtrise des armures intermédiaires',
    effect: 'Maîtrise des armures lourdes, +1 Force (max 20).',
    isCombatFeat: true,
    isPassive: true,
    benefit: ['Maîtrise des armures lourdes', '+1 Force (max 20)'],
  },
  {
    id: 'heavy-armor-master',
    name: 'Maître des Armures Lourdes',
    nameEn: 'Heavy Armor Master',
    description: 'Vous pouvez utiliser votre armure pour dévier les coups.',
    prerequisite: 'Maîtrise des armures lourdes',
    effect: '+1 Force (max 20), réduction des dégâts contondants, perforants et tranchants de 3 en armure lourde.',
    isCombatFeat: true,
    isPassive: true,
    benefit: ['+1 Force (max 20)', '-3 dégâts contondants/perforants/tranchants en armure lourde'],
  },
  {
    id: 'keen-mind',
    name: 'Esprit Vif',
    nameEn: 'Keen Mind',
    description: 'Vous avez une mémoire exceptionnelle.',
    effect: '+1 Intelligence (max 20), vous savez toujours où est le nord, vous savez toujours l\'heure, vous vous souvenez de tout ce que vous avez vu/entendu depuis 1 mois.',
    isCombatFeat: false,
    isPassive: true,
    benefit: ['+1 Intelligence (max 20)', 'Toujours connaître le nord', 'Toujours connaître l\'heure', 'Mémoire parfaite du dernier mois'],
  },
  {
    id: 'style-combat',
    name: 'Style de Combat : Défense',
    nameEn: 'Fighting Style: Defense',
    description: 'Vous avez adopté un style de combat défensif.',
    effect: '+1 à la CA en portant une armure.',
    isCombatFeat: true,
    isPassive: true,
    benefit: ['+1 à la CA en portant une armure'],
    isCustom: true,
  },
  {
    id: 'deux-armes',
    name: 'Style de Combat : Combat à deux armes',
    nameEn: 'Fighting Style: Two-Weapon Fighting',
    description: 'Vous maîtrisez le combat avec deux armes.',
    effect: 'Ajoutez votre modificateur de caractéristique aux dégâts de la deuxième attaque.',
    isCombatFeat: true,
    isPassive: true,
    benefit: ['Modificateur de caractéristique aux dégâts de l\'arme secondaire'],
    isCustom: true,
  },
];

export const getFeatById = (id: string): Feat | undefined => FEATS.find(feat => feat.id === id);
export const getCombatFeats = (): Feat[] => FEATS.filter(feat => feat.isCombatFeat);
export const getPassiveFeats = (): Feat[] => FEATS.filter(feat => feat.isPassive);
