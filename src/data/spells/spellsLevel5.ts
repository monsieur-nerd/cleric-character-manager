/**
 * Sorts de prêtre - Niveau 5
 * Complément pour les sorts définis dans spellComponentMappings.ts
 */
import type { Spell } from "@/types";

export const clericLevel5Spells: Spell[] = [
  {
    "id": "break-enchantment",
    "name": "Briser les enchantements",
    "nameEn": "Dispel Evil and Good",
    "level": 5,
    "levelDisplay": "Niveau 5",
    "school": "abjuration",
    "type": "Protection",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "personnelle",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "de la poudre de perle",
      "materialConsumed": true
    },
    "duration": {
      "type": "concentration",
      "value": "concentration, jusqu'à 1 minute"
    },
    "concentration": true,
    "ritual": false,
    "description": "Une énergie scintillante vous enveloppe, vous protégeant contre les créatures célestes, élémentaires, fées, fiélons et morts-vivants. Vous avez l'avantage aux jets de sauvegarde contre les capacités de ces créatures. Vous pouvez également tenter de renvoyer ces créatures sur leur plan d'origine avec une action et un jet de Sagesse en opposition.",
    "descriptionShort": "Protection contre célestes, fiélons, morts-vivants. Peut les renvoyer.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Protection/Renvoi"
  },
  {
    "id": "flame-strike",
    "name": "Colonne de flamme",
    "nameEn": "Flame Strike",
    "level": 5,
    "levelDisplay": "Niveau 5",
    "school": "evocation",
    "type": "Attaque",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "18 mètres",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "de la poudre de soufre",
      "materialConsumed": false
    },
    "duration": {
      "type": "instantaneous"
    },
    "concentration": false,
    "ritual": false,
    "description": "Un pilier vertical de feu divin s'abat du ciel dans un rayon de 3 mètres et d'une hauteur de 12 mètres. Chaque créature dans la zone doit effectuer un jet de sauvegarde de Dextérité. Celles qui échouent subissent 4d6 dégâts de feu et 4d6 dégâts radiants, celles qui réussissent la moitié.",
    "descriptionShort": "Colonne de feu : 4d6 feu + 4d6 radiants (DEX pour demi).",
    "higherLevels": "Les dégâts de chaque type augmentent de 1d6 par niveau au-delà de 5.",
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "4d6 feu + 4d6 rad"
  },
  {
    "id": "commune",
    "name": "Communion",
    "nameEn": "Commune",
    "level": 5,
    "levelDisplay": "Niveau 5",
    "school": "divination",
    "type": "Divination",
    "isDomainSpell": false,
    "castingTime": "1 minute",
    "range": "personnelle",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "de l'encens* et une offrande* (25 po) - *anciennement: de l'encens et une offrande sacrificielle d'une valeur d'au moins 25 po",
      "materialConsumed": true
    },
    "duration": {
      "type": "instantaneous"
    },
    "concentration": false,
    "ritual": true,
    "description": "Vous contactez votre divinité ou un serviteur divin et posez jusqu'à trois questions qui peuvent être répondues par oui ou non. Vous devez poser vos questions avant la fin du sort. Vous recevez une réponse correcte pour chaque question. Des réponses ambiguës sont possibles. Si vous lancez ce sort plus d'une fois entre deux repos longs, il y a 25% de chances cumulées que le sort échoue sans consommer l'emplacement.",
    "descriptionShort": "Pose 3 questions à votre divinité (réponses oui/non).",
    "higherLevels": null,
    "incantation": null,
    "recommendation": "TRÈS RECOMMANDÉ",
    "source": "core",
    "summary": "3 questions divines"
  },
  {
    "id": "dispel-evil-good",
    "name": "Dissipation du mal/bien",
    "nameEn": "Dispel Evil and Good",
    "level": 5,
    "levelDisplay": "Niveau 5",
    "school": "abjuration",
    "type": "Protection",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "personnelle",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "de l'eau bénite et de l'argent",
      "materialConsumed": false
    },
    "duration": {
      "type": "concentration",
      "value": "concentration, jusqu'à 1 minute"
    },
    "concentration": true,
    "ritual": false,
    "description": "Une énergie scintillante vous enveloppe. Vous avez l'avantage aux jets de sauvegarde contre les attaques et capacités des aberrations, célestes, élémentaires, fées, fiélons et morts-vivants. Vous pouvez utiliser une action pour faire un test de Sagesse en opposition avec une telle créature : si vous réussissez, elle est renvoyée sur son plan natal (si ce n'est pas le plan actuel).",
    "descriptionShort": "Avantage contre créatures extra-planaires. Peut les renvoyer.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Protection/Renvoi"
  },
  {
    "id": "insect-plague",
    "name": "Fléau d'insectes",
    "nameEn": "Insect Plague",
    "level": 5,
    "levelDisplay": "Niveau 5",
    "school": "conjuration",
    "type": "Invocation / Contrôle",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "90 mètres",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "un peu de poivre et une poignée de sable",
      "materialConsumed": false
    },
    "duration": {
      "type": "concentration",
      "value": "concentration, jusqu'à 10 minutes"
    },
    "concentration": true,
    "ritual": false,
    "description": "Des nuées d'insectes hargneux envahissent un cube de 6 mètres d'arête à un point choisi. La zone est fortement obscurcie. Chaque créature dans la zone doit effectuer un jet de sauvegarde de Constitution ou subir 4d10 dégâts perforants, ou la moitié en cas de réussite.",
    "descriptionShort": "Nuée d'insectes inflige 4d10 dégâts (CON pour demi).",
    "higherLevels": "Les dégâts augmentent de 1d10 par niveau au-delà de 5.",
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "4d10 dégâts zone"
  },
  {
    "id": "raise-dead-long",
    "name": "Rappel des morts",
    "nameEn": "Raise Dead",
    "level": 5,
    "levelDisplay": "Niveau 5",
    "school": "necromancy",
    "type": "Résurrection",
    "isDomainSpell": false,
    "castingTime": "1 heure",
    "range": "contact",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "des diamants d'infini* (1000 po) - *anciennement: des diamants d'une valeur d'au moins 1000 po",
      "materialConsumed": true
    },
    "duration": {
      "type": "instantaneous"
    },
    "concentration": false,
    "ritual": false,
    "description": "Vous ramenez à la vie une créature décédée depuis moins de 10 jours qui n'est pas un mort-vivant. Si l'âme est libre et consentante, la cible revient à la vie avec 1 point de vie. Ce sort ferme les blessures, neutralise les poisons et les maladies, mais ne restaure pas les membres perdus. La cible subit une pénalité de -4 à tous les jets d'attaque et de sauvegarde jusqu'à ce qu'elle termine un repos long.",
    "descriptionShort": "Ramène à la vie une créature morte depuis moins de 10 jours.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": "ESSENTIEL",
    "source": "core",
    "summary": "Résurrection"
  },
  {
    "id": "geas",
    "name": "Quête",
    "nameEn": "Geas",
    "level": 5,
    "levelDisplay": "Niveau 5",
    "school": "enchantment",
    "type": "Contrôle",
    "isDomainSpell": false,
    "castingTime": "1 minute",
    "range": "18 mètres",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": "du platine",
      "materialConsumed": false
    },
    "duration": {
      "type": "timed",
      "value": "30 jours"
    },
    "concentration": false,
    "ritual": false,
    "description": "Vous donnez une mission ou une quête à une créature. Si la cible refuse d'obéir, elle subit 5d10 dégâts psychiques chaque jour où elle désobéit. Vous pouvez spécifier des conditions pour accomplir la quête. Le sort se termine si vous utilisez une action pour le révoquer, si la quête est accomplie, ou si la cible est tuée.",
    "descriptionShort": "Impose une quête. Désobéir cause 5d10 dégâts psychiques/jour.",
    "higherLevels": "Avec un emplacement de niveau 7 ou 8, la durée est de 1 an. Avec un emplacement de niveau 9, permanent jusqu'à accomplissement.",
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Impose quête"
  },
  {
    "id": "scrying",
    "name": "Scrutation",
    "nameEn": "Scrying",
    "level": 5,
    "levelDisplay": "Niveau 5",
    "school": "divination",
    "type": "Divination / Espionnage",
    "isDomainSpell": true,
    "castingTime": "10 minutes",
    "range": "personnelle",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "un miroir ou un récipient d'eau d'une valeur d'au moins 1000 po",
      "materialConsumed": false
    },
    "duration": {
      "type": "concentration",
      "value": "concentration, jusqu'à 10 minutes"
    },
    "concentration": true,
    "ritual": false,
    "description": "Vous voyez et entendez une créature particulière sur le même plan d'existence que vous. La cible doit réussir un jet de sauvegarde de Sagesse ou vous percevez un fantôme de l'environnement immédiat de la cible. Un jet de sauvegarde est effectué avec un malus selon votre connaissance de la cible (-10 si vous avez un objet personnel, -5 si vous la connaissez bien, -2 si vous l'avez rencontrée, +0 si vous en avez seulement entendu parler, +5 si vous ne la connaissez pas).",
    "descriptionShort": "Observe une créature connue à distance sur le même plan.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Observation lointaine"
  }
];
