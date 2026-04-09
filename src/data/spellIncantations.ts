/**
 * Système d'incantations pour les sorts de prêtre
 * Chaque incantation dépend du dieu et du type de sort
 */

// Types de sorts pour catégoriser les incantations
export type SpellCategory = 
  | 'healing'      // Soins
  | 'protection'   // Protection/bouclier
  | 'attack'       // Attaque/dégâts
  | 'buff'         // Amélioration
  | 'detection'    // Détection/divination
  | 'control'      // Contrôle
  | 'movement'     // Déplacement
  | 'necromancy'   // Nécromancie
  | 'utility'      // Utilitaire
  | 'conjuration'  // Invocation
  | 'evocation'    // Évocation (dégâts élémentaires)
  | 'abjuration'   // Abjuration (protection)
  | 'transmutation'; // Transmutation (changement)

// Mapping COMPLET de tous les sorts (61 sorts de prêtre)
export const SPELL_CATEGORIES: Record<string, SpellCategory> = {
  // ============== NIVEAU 0 (Mineurs) ==============
  'assistance': 'buff',
  'flamme-sacrée': 'attack',
  'lumière': 'utility',
  'réparation': 'utility',
  'résistance': 'buff',
  'stabilisation': 'healing',
  'thaumaturgie': 'utility',
  
  // ============== NIVEAU 1 ==============
  'blessure': 'attack',
  'bouclier-de-la-foi': 'protection',
  'bénédiction': 'buff',
  'création-ou-destruction-d-eau': 'utility',
  'détection-de-la-magie': 'detection',
  'détection-du-mal-et-du-bien': 'detection',
  'détection-du-poison-et-des-maladies': 'detection',
  'faveur-divine': 'buff',
  'fléau': 'attack',
  'injonction': 'attack',
  'mot-de-guérison': 'healing',
  'protection-contre-le-mal-et-le-bien': 'protection',
  'purification-de-nourriture-et-d-eau': 'utility',
  'sanctuaire': 'protection',
  'soins': 'healing',
  'éclair-guidé': 'attack',
  
  // ============== NIVEAU 2 ==============
  'aide': 'buff',
  'amélioration-de-caractéristique': 'buff',
  'apaisement-des-émotions': 'control',
  'arme-magique': 'buff',
  'arme-spirituelle': 'attack',
  'augure': 'detection',
  'cécité-surdité': 'control',
  'flamme-éternelle': 'utility',
  'immobilisation-de-personne': 'control',
  'lien-de-protection': 'protection',
  'localisation-d-objet': 'detection',
  'prière-de-guérison': 'healing',
  'protection-contre-le-poison': 'protection',
  'préservation-des-morts': 'necromancy',
  'restauration-partielle': 'healing',
  'sens-des-pièges': 'detection',
  'silence': 'control',
  'zone-de-vérité': 'control',
  
  // ============== NIVEAU 3 ==============
  'animation-des-morts': 'necromancy',
  'aura-du-croisé': 'protection',
  'cercle-magique': 'protection',
  'clairvoyance': 'detection',
  'communication-avec-les-morts': 'necromancy',
  'communication-à-distance': 'utility',
  'création-de-nourriture-et-d-eau': 'utility',
  'dissipation-de-la-magie': 'abjuration',
  'délivrance-des-malédictions': 'abjuration',
  'esprits-gardiens': 'protection',
  'fusion-dans-la-pierre': 'movement',
  'glyphe-de-protection': 'protection',
  'langues': 'utility',
  'lumière-du-jour': 'utility',
  'malédiction': 'control',
  'marche-sur-l-eau': 'movement',
  'mot-de-guérison-de-groupe': 'healing',
  'protection-contre-une-énergie': 'protection',
  'retour-a-la-vie': 'healing',
  'lueur-despoir': 'buff',
};

// Incantations génériques puissantes par catégorie (fallback)
const GENERIC_INCANTATIONS: Record<SpellCategory, string[]> = {
  healing: [
    'Par la grâce divine, que la vie reflue dans ce corps !',
    'Ô puissance céleste, accorde ta guérison !',
    'Que la lumière divine panse ces blessures !',
    'Par le pouvoir sacré, sois restauré !',
    'Viens à moi, énergie vitale, et sauve ce serviteur !',
  ],
  protection: [
    'Que le bouclier divin s\'élève pour me protéger !',
    'Par la foi inébranlable, qu\'aucun mal ne passe !',
    'Ô puissance protectrice, entoure-moi de ta grâce !',
    'Que la barrière sacrée repousse mes ennemis !',
    'Par le sang des martyrs, je suis inviolable !',
  ],
  attack: [
    'Que la colère divine s\'abatte sur toi !',
    'Par le feu du ciel, sois consumé !',
    'Ô foudre céleste, frappe cet impie !',
    'Que ma main devienne l\'instrument de ta chute !',
    'Ton heure a sonné, péris sous ma fureur sacrée !',
  ],
  buff: [
    'Que la bénédiction divine te fortifie !',
    'Par la grâce céleste, deviens plus grand !',
    'Ô puissance sacrée, coule dans tes veines !',
    'Que le courage divin t\'anime !',
    'Par la foi, tu deviens l\'instrument des dieux !',
  ],
  detection: [
    'Ô yeux divins, montre-moi ce qui est caché !',
    'Que le voile de l\'illusion se déchire !',
    'Par la clairvoyance céleste, je vois tout !',
    'Rien n\'échappe à la vigilance des dieux !',
    'Que la vérité éclate sous la lumière sacrée !',
  ],
  control: [
    'Par l\'autorité divine, tu m\'obéis !',
    'Que ta volonté s\'efface devant la mienne !',
    'Ô puissance céleste, brise cet esprit !',
    'Ton âme m\'appartient, exauce mon commandement !',
    'Par le pouvoir sacré, sois figé sur place !',
  ],
  movement: [
    'Que la voie divine se dégage devant moi !',
    'Par la grâce céleste, je defie les lois de la nature !',
    'Ô vents sacrés, porte-moi vers ma destination !',
    'Aucun obstacle ne resiste à la foi !',
    'Que la terre elle-même m\'ouvre son passage !',
  ],
  necromancy: [
    'Par le pouvoir sur la mort, lève-toi !',
    'Ô âmes errantes, je te convoque !',
    'Que la frontière des vivants et des morts s\'efface !',
    'Par le pacte ancien, tu me dois obéissance !',
    'Retourne d\'où tu viens, esprit, ou sers-moi !',
  ],
  utility: [
    'Par la providence divine, que cela soit !',
    'Ô miracle céleste, accomplis-toi !',
    'Que la volonté des dieux s\'accomplisse !',
    'Par la grâce sacrée, les obstacles disparaissent !',
    'Que la bénédiction divine transforme ce monde !',
  ],
  conjuration: [
    'Par l\'appel sacré, viens à moi !',
    'Ô créatures célestes, répondez à mon invocation !',
    'Que le voile entre les mondes s\'ouvre !',
    'Par le pouvoir divin, je te arrache à ton plan !',
    'Viens, serviteur des dieux, et obéis !',
  ],
  evocation: [
    'Que l\'énergie brute du cosmos s\'unleash !',
    'Par le pouvoir primordial, destructon !',
    'Ô éléments, obéissez à ma volonté !',
    'Que la fureur des cieux descende !',
    'Par la force brute de la création, sois frappé !',
  ],
  abjuration: [
    'Par le pouvoir de la négation, annule !',
    'Que la barrière d\'argent repousse la magie !',
    'Ô protection ultime, scelle les portes !',
    'Par la volonté divine, cesse !',
    'Que le sceau sacré brise cet enchantement !',
  ],
  transmutation: [
    'Par le pouvoir du changement, transforme !',
    'Ô flux de la réalité, modifie cette forme !',
    'Que la matière obéisse à ma volonté !',
    'Par l\'alchimie divine, change !',
    'Rien n\'est permanent, sauf la volonté des dieux !',
  ],
};

// Templates par dieu - TOUS les dieux majeurs de Faerûn
export const INCANTATION_TEMPLATES: Record<string, Record<SpellCategory, string[]>> = {
  // ===== TORM - Dieu du devoir et de la loyauté =====
  'torm': {
    healing: [
      'Par la main guérisseuse de Torm, que la vie revienne !',
      'Torm, Loyal Gardien, accorde ta grâce restauratrice !',
      'Que la lumière de Torm efface la souffrance et panse les blessures !',
      'Par le devoir sacré, Torm commande : vis !',
      'Torm ne t\'abandonne pas, reçois sa miséricorde !',
    ],
    protection: [
      'Torm, bouclier des justes, protège ce serviteur !',
      'Par la foi inébranlable, qu\'aucun mal ne traverse !',
      'Que la loyauté de Torm forme un rempart impénétrable !',
      'Torm veille, Torm protège, Torm défend !',
      'Par le Gantelet d\'Acier, sois inviolable !',
    ],
    attack: [
      'Que la colère de Torm s\'abatte sur l\'impie !',
      'Par la justice éternelle, Torm te châtie !',
      'Que le marteau de Torm frappe sans pitié !',
      'Pour l\'honneur et le devoir, Torm guide mon bras !',
      'Torm juge, et sa sentence est sans appel !',
    ],
    buff: [
      'Torm renforce ceux qui servent la justice !',
      'Que la bénédiction du Loyal te fortifie !',
      'Par la grâce de Torm, deviens plus fort !',
      'Le devoir appelle, Torm répond !',
      'Par le serment sacré, reçois la puissance !',
    ],
    detection: [
      'Torm, révèle ce qui est caché aux yeux des justes !',
      'Que la vérité éclate sous la lumière de Torm !',
      'Par la clairvoyance divine, Torm montre le chemin !',
      'Aucun secret ne résiste à la vigilance de Torm !',
      'Par l\'oeil du Loyal, je vois ton âme !',
    ],
    control: [
      'Torm commande, et la créature obéit !',
      'Par l\'autorité du juste, sois apaisé !',
      'Que la volonté de Torm prime sur la tienne !',
      'Le Loyal a parlé, silence !',
      'Par le pouvoir du devoir, obéis !',
    ],
    movement: [
      'Torm débloque le chemin de son serviteur !',
      'Par la grâce divine, les obstacles disparaissent !',
      'Que la voie de Torm soit dégagée !',
      'Le devoir appelle ailleurs, Torm me transporte !',
      'Par la foi, je franchis les barrières !',
    ],
    necromancy: [
      'Torm commande aux défunts : obéissez !',
      'Par le pouvoir du juste, lève-toi et sers !',
      'Que la volonté de Torm domine même la mort !',
      'Le Loyal rappelle les âmes à la vie éternelle !',
      'Par le devoir qui transcende la mort, lève-toi !',
    ],
    utility: [
      'Torm pourvoit à ses serviteurs !',
      'Par la bénédiction du Loyal, que cela soit !',
      'Que la providence de Torm s\'accomplisse !',
      'Le devoir exige, Torm fournit !',
      'Par la grâce du Gantelet, miracle !',
    ],
    conjuration: [
      'Torm, envoie tes serviteurs célestes !',
      'Par l\'appel du juste, que les esprits répondent !',
      'Que la cohorte de Torm se manifeste !',
      'Le Loyal convoque, et les cieux obéissent !',
      'Par le devoir sacré, viens à moi !',
    ],
    evocation: [
      'Par la fureur de Torm, brûle !',
      'Que le feu du devoir consume !',
      'Torm déchaine sa puissance !',
    ],
    abjuration: [
      'Par la volonté de Torm, disparais !',
      'Torm annule ta magie !',
      'Que la protection du Loyal brise ton sort !',
    ],
    transmutation: [
      'Par la volonté de Torm, change !',
      'Que la forme obéisse au devoir !',
      'Torm transforme selon sa volonté !',
    ],
  },
  
  // ===== TYR - Dieu de la justice (Le Borgne) =====
  'tyr': {
    healing: [
      'Tyr, dont la justice guérit les blessures du monde, accorde ta grâce !',
      'Par le sacrifice du Borgne, que la vie soit rendue !',
      'Que la main de Tyr, qui a tout donné, te restaure !',
      'La justice exige que tu vives !',
    ],
    protection: [
      'Tyr, balance de la justice, protège l\'innocent !',
      'Par l\'oeil unique qui voit toute vérité, défends ce serviteur !',
      'Que le bouclier de la loi éternelle te garde !',
      'Aucun mal ne passera tant que Tyr veille !',
    ],
    attack: [
      'Tyr frappe, et son jugement est sans appel !',
      'Que la colère du juste s\'abatte sur le coupable !',
      'Par le marteau de la justice, sois châtié !',
      'Tyr a jugé, et tu es condamné !',
    ],
    buff: [
      'Tyr donne force à ceux qui défendent la loi !',
      'Que la résolution du Borgne t\'anime !',
      'Par la justice intègre, deviens plus fort !',
      'Le justicier te bénit !',
    ],
    detection: [
      'Tyr voit toute vérité, qu\'elle se révèle !',
      'Que l\'oeil unique perce les mensonges !',
      'Par la clairvoyance du justicier, montre-toi !',
      'Rien n\'échappe à la balance de Tyr !',
    ],
    control: [
      'Tyr commande, et le chaos s\'efface !',
      'Par l\'autorité de la loi, sois contraint !',
      'Que l\'ordre de Tyr prime !',
      'La sentence est prononcée, obéis !',
    ],
    movement: [
      'Tyr ouvre la voie à ceux qui servent la justice !',
      'Par le chemin du juste, avance sans entrave !',
      'Que la vérité te guide !',
    ],
    necromancy: [
      'Tyr, qui pèse les âmes, commande aux morts !',
      'Par la justice qui transcende la mort, lève-toi !',
      'Même la mort doit obéir à la loi !',
    ],
    utility: [
      'Tyr pourvoit à ceux qui maintiennent l\'ordre !',
      'Par la providence du justicier, soit !',
      'La justice exige, Tyr fournit !',
    ],
    conjuration: [
      'Tyr convoque les champions de la justice !',
      'Que les gardiens de la loi répondent à l\'appel !',
      'Par l\'autorité du tribunal céleste, viens !',
    ],
    evocation: [
      'Par la fureur de la justice, brûle !',
      'Tyr déchaine sa colère !',
    ],
    abjuration: [
      'Par la loi de Tyr, ta magie meurt !',
      'La justice annule le chaos !',
    ],
    transmutation: [
      'Par l\'ordre divin, transforme !',
      'Tyr réordonne la réalité !',
    ],
  },
  
  // ===== ILMATER - Dieu de l'endurance et du martyre =====
  'ilmater': {
    healing: [
      'Ilmater, Criquet sacré, prends sur toi cette douleur !',
      'Par la souffrance endurée, que la guérison vienne !',
      'Que le martyre d\'Ilmater te libère de la souffrance !',
      'Endurance éternelle, panse ces blessures !',
      'Ilmater souffre pour toi, sois guéri !',
    ],
    protection: [
      'Ilmater, qui endure tout, protège ce serviteur !',
      'Par la patience infinie, que les coups soient amortis !',
      'Que la résilience du Criquet soit ton bouclier !',
      'Je prendrai le coup pour toi, comme Ilmater !',
    ],
    attack: [
      'Ilmater endure, mais ses ennemis tombent !',
      'Que la persévérance triomphe du mal !',
      'Par la souffrance endurée, venge-nous !',
      'Ton mal retourne contre toi !',
    ],
    buff: [
      'Ilmater donne la force de persévérer !',
      'Que l\'endurance du Criquet te soutienne !',
      'Par la persévérance, deviens inébranlable !',
      'Endure, comme Ilmater endure !',
    ],
    detection: [
      'Ilmater, qui voit toute souffrance, révèle la vérité !',
      'Que la compassion éclaire ce qui est caché !',
      'Par l\'empathie divine, je perçois tout !',
    ],
    control: [
      'Ilmater apaise la souffrance et le conflit !',
      'Par la patience, que la rage s\'efface !',
      'Cesse de faire du mal, au nom de la compassion !',
    ],
    movement: [
      'Ilmater guide ses serviteurs par la voie de l\'endurance !',
      'Que la persévérance ouvre tous les chemins !',
      'Marche, même quand tu souffres !',
    ],
    necromancy: [
      'Ilmater, qui comprend la souffrance des morts, commande !',
      'Par la compassion pour les défunts, lève-toi !',
      'Même dans la mort, Ilmater veille !',
    ],
    utility: [
      'Ilmater pourvoit à ceux qui endurent !',
      'Que la providence du Criquet te soutienne !',
      'La patience est récompensée !',
    ],
    conjuration: [
      'Ilmater appelle ceux qui servent par la souffrance !',
      'Que les martyrs répondent à l\'appel !',
      'Par le sacrifice, viens !',
    ],
    evocation: [
      'Par la douleur sublimée, frappe !',
      'Ilmater canalise la souffrance en puissance !',
    ],
    abjuration: [
      'Par la résilience, annule !',
      'Ilmater absorbe la douleur magique !',
    ],
    transmutation: [
      'Par l\'endurance, transforme !',
      'Ilmater change la souffrance en force !',
    ],
  },
  
  // ===== LATHANDER - Dieu de l'aube et du renouveau =====
  'lathander': {
    healing: [
      'Lathander, rose du matin, que ton soleil guérisse !',
      'Par la lumière de l\'aube, que la vie renaisse !',
      'Que le renouveau éternel te restaure !',
      'L\'aube apporte la guérison !',
      'Recommence, comme le jour recommence !',
    ],
    protection: [
      'Lathander, lumière contre les ténèbres, protège !',
      'Par l\'aube naissante, que les ombres reculent !',
      'Que le soleil levant soit ton bouclier !',
      'Aucune nuit ne dure éternellement !',
    ],
    attack: [
      'Lathander brûle les ténèbres de ses rayons !',
      'Que l\'aube détruise les créatures de la nuit !',
      'Par le feu du soleil, sois consumé !',
      'Le jour se lève sur ta défaite !',
    ],
    buff: [
      'Lathander éveille la force en chaque créature !',
      'Que la lumière de l\'aube te fortifie !',
      'Par le renouveau du matin, deviens plus fort !',
      'Chaque aube est un nouveau départ !',
    ],
    detection: [
      'Lathander éclaire tous les secrets !',
      'Que la lumière révèle ce qui est caché !',
      'Par le rayon du soleil, je vois la vérité !',
    ],
    control: [
      'Lathander apaise comme le matin calme !',
      'Par la douceur de l\'aube, sois apaisé !',
      'Que la paix du matin te gagne !',
    ],
    movement: [
      'Lathander montre la voie vers la lumière !',
      'Que le soleil guide tes pas !',
      'Vers l\'aube, avance !',
    ],
    necromancy: [
      'Lathander, qui vainc la mort chaque aube, commande !',
      'Par le renouveau éternel, retourne à la vie !',
      'L\'aurore rappelle les âmes !',
    ],
    utility: [
      'Lathander pourvoit à ceux qui cherchent la lumière !',
      'Que l\'abondance du matin soit !',
      'Le nouveau jour apporte ses dons !',
    ],
    conjuration: [
      'Lathander appelle les créatures de la lumière !',
      'Que les serviteurs de l\'aube répondent !',
      'Par le premier rayon, viens !',
    ],
    evocation: [
      'Par le feu du soleil, brûle !',
      'Lathander lance ses rayons destructeurs !',
    ],
    abjuration: [
      'Par la lumière, dissipe !',
      'L\'aube chasse les ténèbres magiques !',
    ],
    transmutation: [
      'Par le renouveau, transforme !',
      'Lathander change comme le jour change !',
    ],
  },
  
  // ===== TEMPUS - Dieu de la guerre =====
  'tempus': {
    healing: [
      'Tempus ne laisse pas mourir ses guerriers !',
      'Par le sang versé, sois guéri et combats !',
      'Lève-toi, soldat, la bataille n\'est pas finie !',
      'Que la furie du combat te redonne des forces !',
    ],
    protection: [
      'Tempus, Seigneur des Batailles, protège son champion !',
      'Par le bouclier de la guerre, sois invincible !',
      'Aucune lame ne perce l\'armure de Tempus !',
      'Survivre, c\'est la volonté de Tempus !',
    ],
    attack: [
      'Pour la gloire de Tempus, meurs !',
      'Que la fureur de la bataille t\'emporte !',
      'Par le fer et le sang, Tempus te juge !',
      'La guerre t\'a marqué, péris !',
    ],
    buff: [
      'Tempus donne force aux braves !',
      'Que la rage du guerrier t\'envahisse !',
      'Par le cri de guerre, deviens légendaire !',
      'Le champ de bataille est ton terrain !',
    ],
    detection: [
      'Tempus voit tous les ennemis !',
      'Par l\'instinct du guerrier, repère !',
      'Aucun ennemi n\'échappe au Seigneur de Guerre !',
    ],
    control: [
      'Tempus commande, et tu obéis !',
      'Par l\'autorité militaire, halte !',
      'Sois paralysé par la peur du combat !',
    ],
    movement: [
      'Tempus mène la charge !',
      'Par la cavalerie céleste, avance !',
      'Aucun mur ne résiste à l\'assaut !',
    ],
    necromancy: [
      'Tempus rappelle ses soldats tombés !',
      'Par le devoir militaire, lève-tois !',
      'Même la mort ne libère pas du service !',
    ],
    utility: [
      'Tempus pourvoit ses armées !',
      'Par la logistique divine, soit !',
      'La guerre exige, Tempus fournit !',
    ],
    conjuration: [
      'Tempus appelle ses légions !',
      'Que les guerriers célestes rejoignent le combat !',
      'Par la trompette de guerre, viens !',
    ],
    evocation: [
      'Par l\'explosion divine, frappe !',
      'Tempus déchaine l\'artillerie céleste !',
    ],
    abjuration: [
      'Par la discipline, annule !',
      'Tempus rompt l\'ennemi !',
    ],
    transmutation: [
      'Par la forge de guerre, transforme !',
      'Que le fer devienne acier !',
    ],
  },
  
  // ===== MYSTRA - Déesse de la magie =====
  'mystra': {
    healing: [
      'Par le tissu de la magie, sois restauré !',
      'Mystra répare ce qui est brisé !',
      'Que la trame magique te reconstitue !',
    ],
    protection: [
      'Mystra tisse un bouclier arcanique !',
      'Par le Voile, sois protégé !',
      'Aucun sort ne perce la défense de Mystra !',
    ],
    attack: [
      'Par la Weave brute, destructon !',
      'Mystra déchaine la magie primordiale !',
      'Que l\'arcane pur te consume !',
    ],
    buff: [
      'Mystra amplifie ta puissance magique !',
      'Que le Voile te renforce !',
      'Par la connexion arcanique, transcende !',
    ],
    detection: [
      'Mystra voit tous les fils magiques !',
      'Par la perception arcanique, révèle !',
      'Aucune magie n\'échappe à la Dame du Mystère !',
    ],
    control: [
      'Mystra réordonne la volonté !',
      'Par les fils de la Weave, obéis !',
      'La magie suprême contrôle !',
    ],
    movement: [
      'Par les fils de la Weave, voyage !',
      'Mystra déplie l\'espace !',
      'Que la téléportation te porte !',
    ],
    necromancy: [
      'Mystra rappelle l\'âme du Voile !',
      'Par la nécromancie arcanique, lève-toi !',
      'La mort n\'est qu\'une forme de magie !',
    ],
    utility: [
      'Mystra façonne la réalité !',
      'Par la volonté arcanique, soit !',
      'La magie répond à l\'appel !',
    ],
    conjuration: [
      'Mystra appelle les créatures arcaniques !',
      'Par la conjuration suprême, viens !',
      'Que les serviteurs du Voile apparaissent !',
    ],
    evocation: [
      'Par l\'évocation pure, explos !',
      'Mystra canalise l\'énergie brute !',
    ],
    abjuration: [
      'Par l\'abjuration divine, dissiper !',
      'Mystra annule la magie inférieure !',
    ],
    transmutation: [
      'Par la transmutation arcanique, change !',
      'Mystra réécrit les lois de la matière !',
    ],
  },
  
  // ===== CHAUNTEA - Déesse de l'agriculture =====
  'chauntea': {
    healing: [
      'Chauntea, Mère des Récoltes, panse tes blessures !',
      'Par la sève de vie, sois guéri !',
      'Que la terre nourricière te restaure !',
    ],
    protection: [
      'Chauntea, enveloppe-moi de ta protection !',
      'Par l\'abondance de la terre, sois protégé !',
      'Aucun mal ne pénètre le jardin sacré !',
    ],
    attack: [
      'Chauntea frappe par la nature déchainée !',
      'Par les épines et les ronces, attaque !',
      'Que la fureur des saisons te consume !',
    ],
    buff: [
      'Chauntea te bénit de sa fertilité !',
      'Que la croissance te fortifie !',
      'Par le cycle de la vie, deviens plus fort !',
    ],
    detection: [
      'Chauntea sent tout ce qui vit !',
      'Par le réseau des racines, perçois !',
      'La terre révèle ses secrets !',
    ],
    control: [
      'Chauntea apaise les tempêtes !',
      'Par l\'harmonie de la nature, calme-toi !',
      'Le cycle commande, obéis !',
    ],
    movement: [
      'Par les racines du monde, voyage !',
      'Chauntea ouvre le chemin fertile !',
      'Que la terre te porte !',
    ],
    necromancy: [
      'Chauntea rappelle ce qui dormait dans la terre !',
      'Par le compost de la vie, lève-tois !',
      'La terre redonne ce qu\'elle a pris !',
    ],
    utility: [
      'Chauntea fait abonder les récoltes !',
      'Par la fertilité divine, multiplie !',
      'La terre pourvoit généreusement !',
    ],
    conjuration: [
      'Chauntea appelle les esprits de la nature !',
      'Que les gardiens des champs viennent !',
      'Par la semence sacrée, pousse !',
    ],
    evocation: [
      'Par l\'orage fertilisant, frappe !',
      'Chauntea déchaine les éléments nourriciers !',
    ],
    abjuration: [
      'Par la barrière des épines, repousse !',
      'Chauntea protège son jardin !',
    ],
    transmutation: [
      'Par la métamorphose naturelle, change !',
      'Chauntea façonne comme le potier l\'argile !',
    ],
  },
  
  // ===== SUNE - Déesse de la beauté et de l'amour =====
  'sune': {
    healing: [
      'Sune, beauté éternelle, restaure cette forme !',
      'Par l\'amour qui guérit, sois sauvé !',
      'Que la perfection te revienne !',
    ],
    protection: [
      'Sune, plus belle que le danger, protège !',
      'Par le bouclier de l\'amour, sois préservé !',
      'Aucun mal n\'ose toucher la beauté !',
    ],
    attack: [
      'Sune frappe par le rejet !',
      'Par la jalousie divine, sois détruit !',
      'Ton manque de grâce te condamne !',
    ],
    buff: [
      'Sune te couronne de beauté !',
      'Que l\'amour te rende splendide !',
      'Par le charme divin, rayonne !',
    ],
    detection: [
      'Sune voit la beauté cachée !',
      'Par le coeur amoureux, perçois !',
      'Aucun secret ne résiste à la passion !',
    ],
    control: [
      'Sune ensorcelle par l\'amour !',
      'Par le charme fatal, obéis !',
      'Tombe amoureux de ma volonté !',
    ],
    movement: [
      'Par le vol de l\'amour, élance-toi !',
      'Sune danse à travers l\'espace !',
      'Que la grâce te porte !',
    ],
    necromancy: [
      'Sune rappelle l\'amour éternel !',
      'Par la passion qui survit à la mort, lève-tois !',
      'L\'amour ne meurt jamais !',
    ],
    utility: [
      'Sune crée la beauté !',
      'Par l\'art divin, transforme !',
      'Que l\'élégance soit !',
    ],
    conjuration: [
      'Sune appelle ses courtisans célestes !',
      'Que les amours ailés viennent !',
      'Par la séduction divine, apparais !',
    ],
    evocation: [
      'Par l\'éclat aveuglant, frappe !',
      'Sune brûle par la passion !',
    ],
    abjuration: [
      'Par la laideur annulée, dissiper !',
      'Sune chasse les imperfections !',
    ],
    transmutation: [
      'Par la métamorphose beauté, transforme !',
      'Sune révèle la splendeur cachée !',
    ],
  },
  
  // ===== AZUTH - Dieu des mages =====
  'azuth': {
    healing: [
      'Azuth, Premier Mage, restaure l\'équilibre arcanique !',
      'Par la sagesse des grimoires, sois guéri !',
      'Que la connaissance te sauve !',
    ],
    protection: [
      'Azuth, Haut Mage, érige tes barrières !',
      'Par la théorie défensive, sois protégé !',
      'Aucun sort ne passe le examen d\'Azuth !',
    ],
    attack: [
      'Azuth juge ton ignorance !',
      'Par la magie savante, sois puni !',
      'Ton incompétence te condamne !',
    ],
    buff: [
      'Azuth partage son savoir !',
      'Que l\'érudition te fortifie !',
      'Par l\'étude profonde, transcende !',
    ],
    detection: [
      'Azuth lit tous les grimoires de l\'univers !',
      'Par la divination savante, révèle !',
      'Aucun secret arcanique ne m\'échappe !',
    ],
    control: [
      'Azuth réordonne par la logique !',
      'Par l\'autorité du Savant, obéis !',
      'La magie savante contrôle !',
    ],
    movement: [
      'Par la téléportation calculée, voyage !',
      'Azuth déplie l\'espace-temps !',
      'Que la géométrie magique te porte !',
    ],
    necromancy: [
      'Azuth relit les pages de la mort !',
      'Par la nécromancie savante, lève-tois !',
      'La mort n\'est qu\'une équation à résoudre !',
    ],
    utility: [
      'Azuth invente le sort parfait !',
      'Par la recherche divine, découvre !',
      'Le savoir est pouvoir !',
    ],
    conjuration: [
      'Azuth invoque les familiers arcaniques !',
      'Par la théorie de l\'invocation, viens !',
      'Que les créatures des grimoires apparaissent !',
    ],
    evocation: [
      'Par l\'évocation mathématique, explos !',
      'Azuth calcule l\'impact parfait !',
    ],
    abjuration: [
      'Par l\'abjuration théorique, annule !',
      'Azuth contredit ta magie !',
    ],
    transmutation: [
      'Par l\'alchimie savante, transforme !',
      'Azuth réécrit les propriétés !',
    ],
  },
};

// Fonction pour obtenir une incantation - GARANTIE de retourner une valeur
export function getSpellIncantation(
  spellId: string, 
  deityId: string, 
  deityName: string,
  existingIncantation?: string | null
): string {
  // Si une incantation spécifique existe déjà, la retourner
  if (existingIncantation) {
    return existingIncantation;
  }
  
  // Obtenir la catégorie du sort
  const category = SPELL_CATEGORIES[spellId] || 'utility';
  
  // Chercher les templates pour ce dieu
  const deityTemplates = INCANTATION_TEMPLATES[deityId];
  
  if (deityTemplates && deityTemplates[category] && deityTemplates[category].length > 0) {
    const templates = deityTemplates[category];
    // Choisir pseudo-aléatoirement basé sur le spellId
    const index = spellId.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) % templates.length;
    return templates[index];
  }
  
  // Fallback sur les templates génériques
  const genericTemplates = GENERIC_INCANTATIONS[category];
  if (genericTemplates && genericTemplates.length > 0) {
    const index = spellId.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) % genericTemplates.length;
    let incantation = genericTemplates[index];
    // Remplacer le placeholder si présent
    return incantation.replace(/{deity}/g, deityName);
  }
  
  // Fallback ultime - ne devrait jamais arriver
  return `Par le pouvoir sacré de ${deityName}, que ce sort s'accomplisse !`;
}

// Fonction pour obtenir toutes les incantations possibles
export function getAllSpellIncantations(
  spellId: string, 
  deityId: string, 
  deityName: string
): string[] {
  const category = SPELL_CATEGORIES[spellId] || 'utility';
  
  // Templates spécifiques au dieu
  const deityTemplates = INCANTATION_TEMPLATES[deityId]?.[category] || [];
  
  // Templates génériques
  const genericTemplates = GENERIC_INCANTATIONS[category] || [];
  
  // Combiner et remplacer les placeholders
  const allTemplates = [...deityTemplates, ...genericTemplates];
  
  if (allTemplates.length === 0) {
    return [`Par le pouvoir sacré de ${deityName}, que ce sort s'accomplisse !`];
  }
  
  return [...new Set(allTemplates)].map(t => t.replace(/{deity}/g, deityName));
}
