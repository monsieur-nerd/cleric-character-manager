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
  | 'conjuration'; // Invocation

// Mapping des sorts par catégorie
export const SPELL_CATEGORIES: Record<string, SpellCategory> = {
  // Soins
  'mot-de-guérison': 'healing',
  'soins': 'healing',
  'prière-de-guérison': 'healing',
  'mot-de-guérison-de-groupe': 'healing',
  'retour-a-la-vie': 'healing',
  'restauration-partielle': 'healing',
  'guérison-de-masse': 'healing',
  'restauration-supérieure': 'healing',
  'rappel-a-la-vie': 'healing',
  'résurrection': 'healing',
  'résurrection-suprême': 'healing',
  'regénération': 'healing',
  
  // Protection
  'bouclier-de-la-foi': 'protection',
  'protection-contre-le-mal-et-le-bien': 'protection',
  'protection-contre-le-poison': 'protection',
  'protection-contre-une-énergie': 'protection',
  'protection-contre-la-mort': 'protection',
  'sanctuaire': 'protection',
  'cercle-magique': 'protection',
  'glyphe-de-protection': 'protection',
  'esprits-gardiens': 'protection',
  'aura-du-croisé': 'protection',
  'champ-antimagie': 'protection',
  'mot-de-rappel': 'protection',
  'symbole': 'protection',
  
  // Attaques
  'flamme-sacrée': 'attack',
  'éclair-guidé': 'attack',
  'blessure': 'attack',
  'injonction': 'attack',
  'fléau': 'attack',
  'arme-spirituelle': 'attack',
  'colère-divine': 'attack',
  'injonction-rapide': 'attack',
  'courroux-de-la-tempête': 'attack',
  'châtiment-divin': 'attack',
  'châtiment-divin-de-groupe': 'attack',
  'délivrance-des-malédictions': 'attack',
  'malédiction': 'attack',
  'injonction-suprême': 'attack',
  'mot-de-pouvoir-mortel': 'attack',
  
  // Buffs
  'assistance': 'buff',
  'résistance': 'buff',
  'faveur-divine': 'buff',
  'bénédiction': 'buff',
  'aide': 'buff',
  'amélioration-de-caractéristique': 'buff',
  'arme-magique': 'buff',
  'immobilisation-de-personne': 'buff',
  'lien-de-protection': 'buff',
  'lueur-despoir': 'buff',
  'héroïsme': 'buff',
  'immobilisation-de-monstre': 'buff',
  'liberté-de-mouvement': 'buff',
  'puissance-divine': 'buff',
  'champion-intermédiaire': 'buff',
  'immortalité': 'buff',
  
  // Détection
  'détection-de-la-magie': 'detection',
  'détection-du-mal-et-du-bien': 'detection',
  'détection-du-poison-et-des-maladies': 'detection',
  'augure': 'detection',
  'localisation-d-objet': 'detection',
  'clairvoyance': 'detection',
  'communion': 'detection',
  'télépathie': 'detection',
  'scrutation': 'detection',
  'vision-suprême': 'detection',
  'localisation-suprême': 'detection',
  
  // Contrôle
  'apaisement-des-émotions': 'control',
  'silence': 'control',
  'zone-de-vérité': 'control',
  'cécité-surdité': 'control',
  'dissipation-de-la-magie': 'control',
  'injonction-de-mass': 'control',
  'coercition-suprême': 'control',
  
  // Déplacement
  'marche-sur-l-eau': 'movement',
  'fusion-dans-la-pierre': 'movement',
  'marche-dans-les-airs': 'movement',
  'porte-dimensionnelle': 'movement',
  'téléportation': 'movement',
  'champ-de-force': 'movement',
  'déplacement-fluide': 'movement',
  
  // Nécromancie
  'animation-des-morts': 'necromancy',
  'préservation-des-morts': 'necromancy',
  'communication-avec-les-morts': 'necromancy',
  'animation-des-morts-suprême': 'necromancy',
  
  // Utilitaires
  'lumière': 'utility',
  'thaumaturgie': 'utility',
  'réparation': 'utility',
  'stabilisation': 'utility',
  'création-ou-destruction-d-eau': 'utility',
  'purification-de-nourriture-et-d-eau': 'utility',
  'flamme-éternelle': 'utility',
  'sens-des-pièges': 'utility',
  'création-de-nourriture-et-d-eau': 'utility',
  'lumière-du-jour': 'utility',
  'langues': 'utility',
  'renvoi': 'utility',
  'mystère-de-la-garde': 'utility',
  'quête': 'utility',
  'érudition-de-l-historien': 'utility',
  'communion-suprême': 'utility',
  'projection-astrale': 'utility',
  'changement-de-forme': 'utility',
  'souhait': 'utility',
};

// Templates d'incantations par catégorie et par type de dieu
export const INCANTATION_TEMPLATES: Record<string, Record<SpellCategory, string[]>> = {
  // Torm - Dieu du devoir et de la loyauté
  'torm': {
    healing: [
      'Par la main guérisseuse de Torm, que la vie revienne !',
      'Torm, accorde ta grâce restauratrice à cette âme !',
      'Que la lumière de Torm efface la souffrance et panse les blessures !',
      'Par le devoir sacré, Torm commande : vis !',
    ],
    protection: [
      'Torm, bouclier des justes, protège ce serviteur !',
      'Par la foi inébranlable, qu aucun mal ne traverse !',
      'Que la loyauté de Torm forme un rempart impénétrable !',
      'Torm veille, Torm protège, Torm défend !',
    ],
    attack: [
      'Que la colère de Torm s abatte sur l impie !',
      'Par la justice éternelle, Torm te châtie !',
      'Que le marteau de Torm frappe sans pitié !',
      'Pour l honneur et le devoir, Torm guide mon bras !',
    ],
    buff: [
      'Torm renforce ceux qui servent la justice !',
      'Que la bénédiction du Loyal te fortifie !',
      'Par la grâce de Torm, deviens plus fort !',
      'Le devoir appelle, Torm répond !',
    ],
    detection: [
      'Torm, révèle ce qui est caché aux yeux des justes !',
      'Que la vérité éclate sous la lumière de Torm !',
      'Par la clairvoyance divine, Torm montre le chemin !',
      'Aucun secret ne résiste à la vigilance de Torm !',
    ],
    control: [
      'Torm commande, et la créature obéit !',
      'Par l autorité du juste, sois apaisé !',
      'Que la volonté de Torm prime sur la tienne !',
      'Le Loyal a parlé, silence !',
    ],
    movement: [
      'Torm débloque le chemin de son serviteur !',
      'Par la grâce divine, les obstacles disparaissent !',
      'Que la voie de Torm soit dégagée !',
      'Le devoir appelle ailleurs, Torm me transporte !',
    ],
    necromancy: [
      'Torm commande aux défunts : obéissez !',
      'Par le pouvoir du juste, lève-toi et sers !',
      'Que la volonté de Torm domine même la mort !',
      'Le Loyal rappelle les âmes à la vie éternelle !',
    ],
    utility: [
      'Torm pourvoit à ses serviteurs !',
      'Par la bénédiction du Loyal, que cela soit !',
      'Que la providence de Torm s accomplisse !',
      'Le devoir exige, Torm fournit !',
    ],
    conjuration: [
      'Torm, envoie tes serviteurs célestes !',
      'Par l appel du juste, que les esprits répondent !',
      'Que la cohorte de Torm se manifeste !',
      'Le Loyal convoque, et les cieux obéissent !',
    ],
  },
  
  // Tyr - Dieu de la justice
  'tyr': {
    healing: [
      'Tyr, dont la justice guérit les blessures du monde, accorde ta grâce !',
      'Par le sacrifice du Borgne, que la vie soit rendue !',
      'Que la main de Tyr, qui a tout donné, te restaure !',
    ],
    protection: [
      'Tyr, balance de la justice, protège l innocent !',
      'Par l œil unique qui voit toute vérité, défends ce serviteur !',
      'Que le bouclier de la loi éternelle te garde !',
    ],
    attack: [
      'Tyr frappe, et son jugement est sans appel !',
      'Que la colère du juste s abatte sur le coupable !',
      'Par le marteau de la justice, sois châtié !',
    ],
    buff: [
      'Tyr donne force à ceux qui défendent la loi !',
      'Que la résolution du Borgne t anime !',
      'Par la justice intègre, deviens plus fort !',
    ],
    detection: [
      'Tyr voit toute vérité, qu elle se révèle !',
      'Que l œil unique perce les mensonges !',
      'Par la clairvoyance du justicier, montre-toi !',
    ],
    control: [
      'Tyr commande, et le chaos s efface !',
      'Par l autorité de la loi, sois contraint !',
      'Que l ordre de Tyr prime !',
    ],
    movement: [
      'Tyr ouvre la voie à ceux qui servent la justice !',
      'Par le chemin du juste, avance sans entrave !',
    ],
    necromancy: [
      'Tyr, qui pèse les âmes, commande aux morts !',
      'Par la justice qui transcende la mort, lève-toi !',
    ],
    utility: [
      'Tyr pourvoit à ceux qui maintiennent l ordre !',
      'Par la providence du justicier, soit !',
    ],
    conjuration: [
      'Tyr convoque les champions de la justice !',
      'Que les gardiens de la loi répondent à l appel !',
    ],
  },
  
  // Ilmater - Dieu de l endurance
  'ilmater': {
    healing: [
      'Ilmater, Criquet sacré, prends sur toi cette douleur !',
      'Par la souffrance endurée, que la guérison vienne !',
      'Que le martyre d Ilmater te libère de la souffrance !',
      'Endurance éternelle, panse ces blessures !',
    ],
    protection: [
      'Ilmater, qui endure tout, protège ce serviteur !',
      'Par la patience infinie, que les coups soient amortis !',
      'Que la résilience du Criquet soit ton bouclier !',
    ],
    attack: [
      'Ilmater endure, mais ses ennemis tombent !',
      'Que la persévérance triomphe du mal !',
      'Par la souffrance endurée, venge-nous !',
    ],
    buff: [
      'Ilmater donne la force de persévérer !',
      'Que l endurance du Criquet te soutienne !',
      'Par la persévérance, deviens inébranlable !',
    ],
    detection: [
      'Ilmater, qui voit toute souffrance, révèle la vérité !',
      'Que la compassion éclaire ce qui est caché !',
    ],
    control: [
      'Ilmater apaise la souffrance et le conflit !',
      'Par la patience, que la rage s efface !',
    ],
    movement: [
      'Ilmater guide ses serviteurs par la voie de l endurance !',
      'Que la persévérance ouvre tous les chemins !',
    ],
    necromancy: [
      'Ilmater, qui comprend la souffrance des morts, commande !',
      'Par la compassion pour les défunts, lève-toi !',
    ],
    utility: [
      'Ilmater pourvoit à ceux qui endurent !',
      'Que la providence du Criquet te soutienne !',
    ],
    conjuration: [
      'Ilmater appelle ceux qui servent par la souffrance !',
      'Que les martyrs répondent à l appel !',
    ],
  },
  
  // Lathander - Dieu de l aube
  'lathander': {
    healing: [
      'Lathander, rose du matin, que ton soleil guérisse !',
      'Par la lumière de l aube, que la vie renaisse !',
      'Que le renouveau éternel te restaure !',
    ],
    protection: [
      'Lathander, lumière contre les ténèbres, protège !',
      'Par l aube naissante, que les ombres reculent !',
      'Que le soleil levant soit ton bouclier !',
    ],
    attack: [
      'Lathander brûle les ténèbres de ses rayons !',
      'Que l aube détruise les créatures de la nuit !',
      'Par le feu du soleil, sois consumé !',
    ],
    buff: [
      'Lathander éveille la force en chaque créature !',
      'Que la lumière de l aube te fortifie !',
      'Par le renouveau du matin, deviens plus fort !',
    ],
    detection: [
      'Lathander éclaire tous les secrets !',
      'Que la lumière révèle ce qui est caché !',
    ],
    control: [
      'Lathander apaise comme le matin calme !',
      'Par la douceur de l aube, sois apaisé !',
    ],
    movement: [
      'Lathander montre la voie vers la lumière !',
      'Que le soleil guide tes pas !',
    ],
    necromancy: [
      'Lathander, qui vainc la mort chaque aube, commande !',
      'Par le renouveau éternel, retourne à la vie !',
    ],
    utility: [
      'Lathander pourvoit à ceux qui cherchent la lumière !',
      'Que l abondance du matin soit !',
    ],
    conjuration: [
      'Lathander appelle les créatures de la lumière !',
      'Que les serviteurs de l aube répondent !',
    ],
  },
  
  // Template générique
  'generic': {
    healing: [
      'Par la grâce de {deity}, que la guérison soit !',
      '{deity}, accorde ta bénédiction restauratrice !',
      'Que la vie revienne par le pouvoir de {deity} !',
      'Par {deity}, sois guéri et fortifié !',
    ],
    protection: [
      '{deity}, protège ce serviteur de ton choix !',
      'Par la foi en {deity}, qu aucun mal ne touche !',
      'Que {deity} forme un bouclier divin !',
      'Par {deity}, sois préservé !',
    ],
    attack: [
      'Que la colère de {deity} s abatte !',
      'Par le pouvoir de {deity}, sois frappé !',
      '{deity} te châtie pour tes péchés !',
      'Que {deity} guide ma main contre toi !',
    ],
    buff: [
      '{deity} fortifie son serviteur !',
      'Que la bénédiction de {deity} te renforce !',
      'Par {deity}, deviens plus puissant !',
      'Que {deity} te comble de sa grâce !',
    ],
    detection: [
      '{deity}, révèle ce qui est caché !',
      'Que la vision de {deity} soit la mienne !',
      'Par {deity}, que la vérité apparaisse !',
      'Que rien n échappe à {deity} !',
    ],
    control: [
      'Par l autorité de {deity}, obéis !',
      '{deity} commande, et tu écoutes !',
      'Que la volonté de {deity} prime !',
      'Par {deity}, sois contraint !',
    ],
    movement: [
      '{deity} ouvre la voie !',
      'Par {deity}, que les obstacles disparaissent !',
      'Que {deity} te transporte !',
      'Par la grâce de {deity}, avance !',
    ],
    necromancy: [
      'Par {deity}, qui domine la mort, lève-toi !',
      '{deity} commande aux défunts !',
      'Que {deity} rappelle l âme !',
      'Par le pouvoir de {deity} sur la mort !',
    ],
    utility: [
      'Par {deity}, que cela soit !',
      '{deity} pourvoit à ses serviteurs !',
      'Que la providence de {deity} s accomplisse !',
      'Par la grâce de {deity}, soit accompli !',
    ],
    conjuration: [
      '{deity} convoque ses serviteurs !',
      'Par l appel de {deity}, réponds !',
      'Que {deity} envoie ses champions !',
      'Par {deity}, que les esprits viennent !',
    ],
  },
};

// Fonction pour obtenir une incantation
export function getSpellIncantation(
  spellId: string, 
  deityId: string, 
  deityName: string,
  existingIncantation?: string | null
): string | null {
  // Si une incantation spécifique existe, la retourner
  if (existingIncantation) {
    return existingIncantation;
  }
  
  // Obtenir la catégorie
  const category = SPELL_CATEGORIES[spellId];
  if (!category) {
    return null;
  }
  
  // Chercher les templates pour ce dieu
  const deityTemplates = INCANTATION_TEMPLATES[deityId] || INCANTATION_TEMPLATES['generic'];
  const templates = deityTemplates[category];
  
  if (!templates || templates.length === 0) {
    return null;
  }
  
  // Choisir pseudo-aléatoirement
  const index = spellId.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) % templates.length;
  let incantation = templates[index];
  
  // Remplacer le placeholder
  incantation = incantation.replace(/{deity}/g, deityName);
  
  return incantation;
}
