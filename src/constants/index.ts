// src/constants/index.ts
// Constantes et données statiques de l'application

// ============================================
// DIEUX ET DOMAINES
// ============================================

import type { Deity, ClericDomain, Background } from '@/types';

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

export const CLERIC_DOMAINS: ClericDomain[] = [
  {
    id: 'war',
    name: 'Domaine de la Guerre',
    nameEn: 'War Domain',
    icon: '⚔️',
    description: 'Clercs de guerre qui bénissent les armes et mènent les batailles.',
    spellIds: ['faveur-divine', 'bouclier-de-la-foi', 'arme-magique', 'arme-spirituelle', 'aura-du-croisé', 'esprits-gardiens', 'liberte-de-mouvement', 'peau-de-pierre', 'colonne-de-flammes', 'immobiliser-monstre'],
    abilities: {
      level1: { name: 'Clerc de guerre', nameEn: 'War Priest', description: 'Attaque bonus avec arme', uses: 3, shortRest: false, longRest: true },
      level2: { name: 'Conduit divin : Frappe guidée', nameEn: 'Guided Strike', description: '+10 à un jet d\'attaque', uses: 2, shortRest: false, longRest: true },
      level6: { name: 'Conduit divin : Bénédiction du dieu de la guerre', nameEn: 'War God\'s Blessing', description: 'Relancer dégâts ou attaque pour un allié', uses: 2, shortRest: false, longRest: true },
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
    spellIds: ['bénédiction', 'soins', 'restauration-partielle', 'arme-spirituelle', 'marche-sur-l-eau', 'mot-de-guérison-de-groupe', 'aura-de-vie', 'protection-contre-la-mort', 'restauration-suprême', 'soins-de-groupe'],
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
    spellIds: ['mains-brûlantes', 'lueurs-féeriques', 'sphère-de-feu', 'rayon-ardent', 'lumière-du-jour', 'boule-de-feu', 'œil-du-mage', 'mur-de-feu', 'colonne-de-flammes', 'scrutation'],
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
    spellIds: ['amitié-avec-les-animaux', 'communication-avec-les-animaux', 'peau-d-écorce', 'croissance-d-épines', 'invocation-d-animaux', 'croissance-végétale', 'maîtrise-des-eaux', 'insecte-géant', 'communion-avec-la-nature', 'invocation-d-élémentaire'],
    abilities: {
      level1: { name: 'Acolyte de la nature', nameEn: 'Acolyte of Nature', description: 'Maîtrise d\'une compétence de nature', uses: 0 },
      level2: { name: 'Conduit divin : Charme animal/plante', nameEn: 'Charm Animals and Plants', description: 'Charme créatures dans 9m', uses: 1, shortRest: false, longRest: true },
      level6: { name: 'Atténuation des éléments', nameEn: 'Dampen Elements', description: 'Réaction pour résistance aux dégâts élémentaires', uses: 0 },
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
    spellIds: ['nuage-de-brouillard', 'onde-de-tonnerre', 'rafale-de-vent', 'fracassement', 'foudre', 'appel-de-la-foudre', 'contrôle-de-l-eau', 'tempête-de-glace', 'invocation-d-élémentaire-destructeur', 'contrôle-des-vents'],
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
    spellIds: ['charme-personne', 'déguisement', 'invisibilité', 'passage-sans-trace', 'motif-hypnotique', 'antidétection', 'confusion', 'porte-dimensionnelle', 'domination-de-personne', 'modification-de-mémoire'],
    abilities: {
      level1: { name: 'Bénédiction du filou', nameEn: 'Blessing of the Trickster', description: 'Avantage en Discrétion pour un allié', uses: 0 },
      level2: { name: 'Conduit divin : Invocation du double', nameEn: 'Invoke Duplicity', description: 'Crée un illusion de vous', uses: 1, shortRest: false, longRest: true },
      level6: { name: 'Déplacement insaisissable', nameEn: 'Cloak of Shadows', description: 'Devenir invisible en lumière faible', uses: 0 },
      level8: { name: 'Frappe divine', nameEn: 'Divine Strike', description: '+1d8 dégâts de poison', uses: 0 },
      level17: { name: 'Duplicité améliorée', nameEn: 'Improved Duplicity', description: 'Jusqu\'à 4 doubles', uses: 0 }
    },
    spellProfile: { healing: 4, damage: 5, control: 7, buff: 6, protection: 4, utility: 9 }
  },
  {
    id: 'knowledge',
    name: 'Domaine de la Connaissance',
    nameEn: 'Knowledge Domain',
    icon: '📚',
    description: 'Érudits et savants qui cherchent la vérité cachée.',
    spellIds: ['injonction', 'identification', 'augure', 'suggestion', 'langues', 'envoi-de-message', 'divination', 'vol', 'légende', 'quête'],
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
    spellIds: ['châtiment-brûlant', 'identification', 'chaleur-métallique', 'arme-magique', 'élémentaire-de-feu', 'protection-contre-une-énergie', 'fabrication', 'mur-de-pierre', 'animation-des-objets', 'mur-de-force'],
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
    spellIds: ['fléau', 'fausse-vie', 'repose-en-paix', 'rayon-d-affaiblissement', 'animation-des-morts', 'vampire', 'flétrissement', 'invisibilité-suprême', 'antipathie-sympathie', 'nuage-mortel'],
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

// ============================================
// BACKGROUNDS
// ============================================

export const BACKGROUNDS: Background[] = [
  {
    id: 'acolyte',
    name: 'Acolyte',
    nameEn: 'Acolyte',
    description: 'Vous avez passé votre vie au service d\'un temple, apprenant les rites sacrés et fournissant assistance aux prêtres.',
    skillProficiencies: ['insight', 'religion'],
    languages: 2,
    equipment: ['Vêtements de cérémonie', 'Symbole sacré', 'Encens (5 sticks)', 'Paquetage de prêtre'],
    feature: {
      name: 'Refuge des fidèles',
      description: 'Vous et vos compagnons pouvez obtenir soins et abri gratuits dans les temples de votre foi.'
    }
  },
  {
    id: 'charlatan',
    name: 'Charlatan',
    nameEn: 'Charlatan',
    description: 'Vous avez toujours su comment obtenir ce que vous voulez en trompant les autres avec des mensonges convaincants.',
    skillProficiencies: ['deception', 'sleight-of-hand'],
    toolProficiencies: ['Kit de déguisement', 'Kit de faux'],
    equipment: ['Tenue de qualité', 'Kit de déguisement', 'Outils de tromperie'],
    feature: {
      name: 'Fausse identité',
      description: 'Vous avez créé une fausse identité avec papiers, relations et vêtements associés.'
    }
  },
  {
    id: 'criminal',
    name: 'Criminel',
    nameEn: 'Criminal',
    description: 'Vous avez une histoire avec le crime, que ce soit comme voleur, cambrioleur ou autre hors-la-loi.',
    skillProficiencies: ['deception', 'stealth'],
    toolProficiencies: ['Un jeu de votre choix', 'Outils de voleur'],
    equipment: [' Pied-de-biche', 'Tenue sombre', 'Sac à dos avec échelle de corde'],
    feature: {
      name: 'Contact criminel',
      description: 'Vous avez un contact fiable dans les réseaux criminels qui peut vous fournir des informations.'
    }
  },
  {
    id: 'entertainer',
    name: 'Saltimbanque',
    nameEn: 'Entertainer',
    description: 'Vous avez brillé devant une audience, divertissant par la musique, la danse, le chant ou l\'humour.',
    skillProficiencies: ['acrobatics', 'performance'],
    toolProficiencies: ['Kit de déguisement', 'Un instrument de musique'],
    equipment: ['Instrument de musique', 'Cadeau d\'un admirateur', 'Costume'],
    feature: {
      name: 'Accès à toutes les scènes',
      description: 'Vous pouvez toujours trouver un endroit pour vous produire et recevoir nourriture et logement modestes.'
    }
  },
  {
    id: 'folk-hero',
    name: 'Héros du peuple',
    nameEn: 'Folk Hero',
    description: 'Vous venez d\'une humble origine mais un événement vous a propulsé comme héros du peuple.',
    skillProficiencies: ['animal-handling', 'survival'],
    toolProficiencies: ['Outils d\'artisan (un type)'],
    equipment: ['Outils d\'artisan', 'Pelle', 'Pot en fer', 'Vêtements communs'],
    feature: {
      name: 'Hospitalité rustique',
      description: 'Vous pouvez trouver un abri caché chez les paysans et les gens du commun qui vous considèrent comme l\'un des leurs.'
    }
  },
  {
    id: 'guild-artisan',
    name: 'Artisan de guilde',
    nameEn: 'Guild Artisan',
    description: 'Vous êtes membre d\'une guilde d\'artisans, maîtrisant un métier spécifique et bénéficiant de la protection de la guilde.',
    skillProficiencies: ['insight', 'persuasion'],
    toolProficiencies: ['Outils d\'artisan (un type)'],
    languages: 1,
    equipment: ['Outils d\'artisan', 'Lettre de présentation', 'Tenue de voyage'],
    feature: {
      name: 'Membre de guilde',
      description: 'Votre guilde peut vous fournir logement et assistance, ainsi que des contacts professionnels.'
    }
  },
  {
    id: 'hermit',
    name: 'Ermite',
    nameEn: 'Hermit',
    description: 'Vous avez vécu en isolement, que ce soit pour une quête spirituelle ou pour échapper au monde.',
    skillProficiencies: ['medicine', 'religion'],
    toolProficiencies: ['Kit d\'herboriste'],
    languages: 1,
    equipment: ['Couverture d\'hiver', 'Paquetage d\'exploration', 'Journal de retraite'],
    feature: {
      name: 'Découverte',
      description: 'Vous avez fait une découverte unique pendant votre isolement qui peut changer le monde.'
    }
  },
  {
    id: 'noble',
    name: 'Noble',
    nameEn: 'Noble',
    description: 'Vous avez grandi dans la richesse et le privilège, entouré de luxe et de pouvoir.',
    skillProficiencies: ['history', 'persuasion'],
    toolProficiencies: ['Jeu d\'échecs draconiques'],
    languages: 1,
    equipment: ['Vêtements de qualité', 'Sceau', 'Parchemin de généalogie'],
    feature: {
      name: 'Privilège de naissance',
      description: 'Vous êtes accueilli dans la haute société et les gens supposent que vous avez le droit d\'être où vous êtes.'
    }
  },
  {
    id: 'outlander',
    name: 'Exilé',
    nameEn: 'Outlander',
    description: 'Vous avez grandi dans la nature sauvage, loin des villes et de la civilisation.',
    skillProficiencies: ['athletics', 'survival'],
    toolProficiencies: ['Un instrument de musique'],
    languages: 1,
    equipment: ['Bâton', 'Piège à mâchoires', 'Trophée d\'un animal tué'],
    feature: {
      name: 'Voyageur',
      description: 'Vous pouvez vous souvenir de cartes et de terrains, trouver nourriture et eau pour 5 personnes.'
    }
  },
  {
    id: 'sage',
    name: 'Sage',
    nameEn: 'Sage',
    description: 'Vous avez passé des années à étudier, accumulant des connaissances dans les bibliothèques et scriptoriums.',
    skillProficiencies: ['arcana', 'history'],
    languages: 2,
    equipment: ['Encre noire', 'Plume', 'Lettre d\'un collègue mort', 'Vêtements communs'],
    feature: {
      name: 'Chercheur',
      description: 'Vous savez où trouver l\'information écrite la plus obscure, même si cela prend du temps.'
    }
  },
  {
    id: 'sailor',
    name: 'Marin',
    nameEn: 'Sailor',
    description: 'Vous avez navigué sur les mers, enduré tempêtes et mutineries, et parcouru les ports du monde.',
    skillProficiencies: ['athletics', 'perception'],
    toolProficiencies: ['Outils de navigateur', 'Véhicules (aquatiques)'],
    equipment: ['Gourde', 'Corde en soie (15m)', 'Boussole'],
    feature: {
      name: 'Aller en mer',
      description: 'Vous pouvez obtenir un passage gratuit sur un navire pour vous et vos compagnons.'
    }
  },
  {
    id: 'soldier',
    name: 'Soldat',
    nameEn: 'Soldier',
    description: 'Vous avez servi dans une armée, appris les bases du combat et vécu la vie militaire.',
    skillProficiencies: ['athletics', 'intimidation'],
    toolProficiencies: ['Jeu d\'échecs draconiques', 'Véhicules (terrestres)'],
    equipment: ['Insigne de grade', 'Trophée de guerre', 'Vêtements communs'],
    feature: {
      name: 'Grade militaire',
      description: 'Vos anciens camarades de combat vous reconnaissent et vous pouvez accéder à leurs installations.'
    }
  },
  {
    id: 'urchin',
    name: 'Gamin des rues',
    nameEn: 'Urchin',
    description: 'Vous avez grandi seul dans les rues, apprenant à survivre par vos propres moyens.',
    skillProficiencies: ['sleight-of-hand', 'stealth'],
    toolProficiencies: ['Kit de déguisement', 'Outils de voleur'],
    equipment: ['Couteau', 'Carte de la ville', 'Petit animal'],
    feature: {
      name: 'Secrets de la ville',
      description: 'Vous connaissez les passages secrets de la ville et pouvez voyager deux fois plus vite en ville.'
    }
  }
];

// ============================================
// SORTS - MAX SPELL SLOTS
// ============================================

import type { SpellSlots } from '@/types';

export const MAX_SPELL_SLOTS: Record<number, SpellSlots> = {
  1: { 1: 2, 2: 0, 3: 0, 4: 0, 5: 0 },
  2: { 1: 3, 2: 0, 3: 0, 4: 0, 5: 0 },
  3: { 1: 4, 2: 2, 3: 0, 4: 0, 5: 0 },
  4: { 1: 4, 2: 3, 3: 0, 4: 0, 5: 0 },
  5: { 1: 4, 2: 3, 3: 2, 4: 0, 5: 0 },
  6: { 1: 4, 2: 3, 3: 3, 4: 0, 5: 0 },
  7: { 1: 4, 2: 3, 3: 3, 4: 1, 5: 0 },
  8: { 1: 4, 2: 3, 3: 3, 4: 2, 5: 0 },
  9: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
  10: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
  11: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
  12: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
  13: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
  14: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
  15: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
  16: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
  17: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
  18: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
  19: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3 },
  20: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3 },
};

/**
 * Retourne le niveau de sort maximum accessible pour un clerc selon son niveau
 * En D&D 5e : niveau 1-2 → 1, 3-4 → 2, 5-6 → 3, 7-8 → 4, 9+ → 5
 */
export const getMaxSpellLevelForCharacter = (characterLevel: number): number => {
  if (characterLevel >= 9) return 5;
  if (characterLevel >= 7) return 4;
  if (characterLevel >= 5) return 3;
  if (characterLevel >= 3) return 2;
  return 1;
};

// Sorts de domaine par niveau de clerc (D&D 2014)
export const DOMAIN_SPELLS_BY_LEVEL: Record<number, string[]> = {
  1: [], // Pas de sorts de domaine au niveau 1
  2: [],
  3: ['faveur-divine', 'bouclier-de-la-foi', 'arme-magique', 'arme-spirituelle'], // Guerre niveau 3
  4: ['faveur-divine', 'bouclier-de-la-foi', 'arme-magique', 'arme-spirituelle'],
  5: ['faveur-divine', 'bouclier-de-la-foi', 'arme-magique', 'arme-spirituelle', 'aura-du-croisé', 'esprits-gardiens'], // Guerre niveau 5
  6: ['faveur-divine', 'bouclier-de-la-foi', 'arme-magique', 'arme-spirituelle', 'aura-du-croisé', 'esprits-gardiens'],
  7: ['faveur-divine', 'bouclier-de-la-foi', 'arme-magique', 'arme-spirituelle', 'aura-du-croisé', 'esprits-gardiens', 'liberte-de-mouvement', 'peau-de-pierre'], // Guerre niveau 7
  8: ['faveur-divine', 'bouclier-de-la-foi', 'arme-magique', 'arme-spirituelle', 'aura-du-croisé', 'esprits-gardiens', 'liberte-de-mouvement', 'peau-de-pierre'],
  9: ['faveur-divine', 'bouclier-de-la-foi', 'arme-magique', 'arme-spirituelle', 'aura-du-croisé', 'esprits-gardiens', 'liberte-de-mouvement', 'peau-de-pierre', 'colonne-de-flammes', 'immobiliser-monstre'], // Guerre niveau 9
  10: ['faveur-divine', 'bouclier-de-la-foi', 'arme-magique', 'arme-spirituelle', 'aura-du-croisé', 'esprits-gardiens', 'liberte-de-mouvement', 'peau-de-pierre', 'colonne-de-flammes', 'immobiliser-monstre'],
};
