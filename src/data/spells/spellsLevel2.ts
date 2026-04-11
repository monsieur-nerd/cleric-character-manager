/**
 * Sorts de prêtre - Niveau 2
 * Complément pour les sorts définis dans spellComponentMappings.ts
 */
import type { Spell } from "@/types";

export const clericLevel2Spells: Spell[] = [
  {
    "id": "aid",
    "name": "Aide",
    "nameEn": "Aid",
    "level": 2,
    "levelDisplay": "Niveau 2",
    "school": "abjuration",
    "type": "Buff",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "9 mètres",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "un bout de vêtement blanc",
      "materialConsumed": false
    },
    "duration": {
      "type": "timed",
      "value": "8 heures"
    },
    "concentration": false,
    "ritual": false,
    "description": "Votre sort confère à vos alliés de la robustesse et de la résolution. Choisissez jusqu'à trois créatures dans la portée. Les points de vie maximum et actuels de chaque cible augmentent de 5 pour la durée.",
    "descriptionShort": "Jusqu'à 3 créatures gagnent 5 pv max et actuels.",
    "higherLevels": "Lorsque vous lancez ce sort en utilisant un emplacement de sort de niveau 3 ou supérieur, les points de vie de la cible augmentent de 5 points supplémentaires pour chaque niveau d'emplacement au-delà du niveau 2.",
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "+5 pv max"
  },
  {
    "id": "enhance-ability",
    "name": "Amélioration de caractéristique",
    "nameEn": "Enhance Ability",
    "level": 2,
    "levelDisplay": "Niveau 2",
    "school": "transmutation",
    "type": "Buff",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "contact",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "un poil ou une plume d'une bête",
      "materialConsumed": false
    },
    "duration": {
      "type": "concentration",
      "value": "concentration, jusqu'à 1 heure"
    },
    "concentration": true,
    "ritual": false,
    "description": "Vous touchez une créature et la gratifiez d'une amélioration magique. Choisissez l'un des effets suivants : Force de l'ours (avantage sur les jets de Force), Endurance de l'ours (+2d6 pv temporaires), Grâce du félin (avantage sur les jets de Dextérité), Splendeur de l'aigle (avantage sur les jets de Charisme), Sagacité du renard (avantage sur les jets d'Intelligence), Sagesse du hibou (avantage sur les jets de Sagesse).",
    "descriptionShort": "Confère un avantage à un type de jet de caractéristique.",
    "higherLevels": "Lorsque vous utilisez un emplacement de sort de niveau 3 ou supérieur, vous pouvez cibler une créature supplémentaire pour chaque niveau au-delà de 2.",
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Avantage carac"
  },
  {
    "id": "augury",
    "name": "Augure",
    "nameEn": "Augury",
    "level": 2,
    "levelDisplay": "Niveau 2",
    "school": "divination",
    "type": "Divination",
    "isDomainSpell": true,
    "castingTime": "1 minute",
    "range": "personnelle",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "des bâtonnets encrassés spécialement inscrits valant au moins 25 po",
      "materialConsumed": false
    },
    "duration": {
      "type": "instantaneous"
    },
    "concentration": false,
    "ritual": true,
    "description": "En jetant des bâtonnets incrustés de gemmes ou des osselets de dragon, vous recevez un présage d'une entité surnaturelle. Le MD choisit parmi : Fortune (bon résultat probable), Péril (mauvais résultat probable), Péril et fortune (les deux possibles), ou Rien (pas de conséquences particulières). Si vous lancez ce sort plus d'une fois avant un repos long, il y a 25% de chances cumulatives de recevoir une réponse aléatoire.",
    "descriptionShort": "Révèle si une action future sera bonne, mauvaise, les deux, ou neutre.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Présime action"
  },
  {
    "id": "hold-person",
    "name": "Immobilisation de personne",
    "nameEn": "Hold Person",
    "level": 2,
    "levelDisplay": "Niveau 2",
    "school": "enchantment",
    "type": "Contrôle",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "18 mètres",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "un morceau de fer droit",
      "materialConsumed": false
    },
    "duration": {
      "type": "concentration",
      "value": "concentration, jusqu'à 1 minute"
    },
    "concentration": true,
    "ritual": false,
    "description": "Choisissez un humanoïde dans la portée. La cible doit réussir un jet de sauvegarde de Sagesse ou être paralysée pour la durée. À la fin de chacun de ses tours, la cible peut refaire le jet de sauvegarde. En cas de réussite, le sort se termine.",
    "descriptionShort": "Paralyse un humanoïde qui échoue son jet de Sagesse.",
    "higherLevels": "Lorsque vous utilisez un emplacement de sort de niveau 3 ou supérieur, vous pouvez cibler un humanoïde supplémentaire pour chaque niveau au-delà de 2.",
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Paralysie"
  },
  {
    "id": "warding-bond",
    "name": "Lien de protection",
    "nameEn": "Warding Bond",
    "level": 2,
    "levelDisplay": "Niveau 2",
    "school": "abjuration",
    "type": "Protection",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "contact",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "une paire d'anneaux de platine valant au moins 50 po chacun",
      "materialConsumed": false
    },
    "duration": {
      "type": "timed",
      "value": "1 heure"
    },
    "concentration": false,
    "ritual": false,
    "description": "Ce sort protège une créature consentante que vous touchez. La cible gagne un bonus de +1 à la CA et aux jets de sauvegarde. Chaque fois qu'elle subit des dégâts, vous subissez la même quantité de dégâts. Le sort se termine si vous tombez à 0 point de vie, si vous et la cible êtes séparés par plus de 18 mètres, ou si vous lancez de nouveau ce sort sur une autre cible.",
    "descriptionShort": "La cible gagne +1 CA et sauvegardes. Vous subissez ses dégâts.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "+1 CA, partage dégâts"
  },
  {
    "id": "locate-object",
    "name": "Localisation d'objet",
    "nameEn": "Locate Object",
    "level": 2,
    "levelDisplay": "Niveau 2",
    "school": "divination",
    "type": "Divination",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "personnelle",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "une brindille de sourcier",
      "materialConsumed": false
    },
    "duration": {
      "type": "concentration",
      "value": "concentration, jusqu'à 10 minutes"
    },
    "concentration": true,
    "ritual": false,
    "description": "Décrivez ou nommez un objet familier. Vous percevez la direction de l'objet tant qu'il est à 300 mètres ou moins de vous. Si l'objet est en mouvement, vous savez dans quelle direction il se déplace. Le sort peut localiser un objet spécifique que vous connaissez, ou le plus proche exemple d'un type d'objet.",
    "descriptionShort": "Détecte la direction d'un objet spécifique à 300m.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Localise objet"
  },
  {
    "id": "gentle-repose",
    "name": "Préservation des morts",
    "nameEn": "Gentle Repose",
    "level": 2,
    "levelDisplay": "Niveau 2",
    "school": "necromancy",
    "type": "Rituel",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "contact",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "une pincée de sel et une pièce de cuivre",
      "materialConsumed": false
    },
    "duration": {
      "type": "timed",
      "value": "10 jours"
    },
    "concentration": false,
    "ritual": true,
    "description": "Vous touchez une créature consentante ou un reste. Pour la durée, la cible est protégée contre la décomposition et ne peut devenir un mort-vivant. Le sort préserve également les membres perdus de la créature pour une éventuelle résurrection.",
    "descriptionShort": "Préserve un cadavre contre la décomposition et la création de mort-vivant.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Préserve corps"
  }
];
