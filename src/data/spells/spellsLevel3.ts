/**
 * Sorts de prêtre - Niveau 3
 * Complément pour les sorts définis dans spellComponentMappings.ts
 */
import type { Spell } from "@/types";

export const clericLevel3Spells: Spell[] = [
  {
    "id": "animate-dead",
    "name": "Animation des morts",
    "nameEn": "Animate Dead",
    "level": 3,
    "levelDisplay": "Niveau 3",
    "school": "necromancy",
    "type": "Invocation",
    "isDomainSpell": false,
    "castingTime": "1 minute",
    "range": "3 mètres",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "une goutte de sang, un morceau de chair et une pincée d'ossements",
      "materialConsumed": true
    },
    "duration": {
      "type": "instantaneous"
    },
    "concentration": false,
    "ritual": false,
    "description": "Ce sort crée un mort-vivant serviteur. Choisissez un squelette ou un cadavre de taille M ou P. La cible devient un squelette ou un zombie sous votre contrôle. Vous pouvez contrôler jusqu'à 4 créatures avec ce sort. Toute créature supplémentaire vous fait perdre le contrôle d'une créature précédente.",
    "descriptionShort": "Anime un squelette ou zombie sous votre contrôle.",
    "higherLevels": "Lorsque vous lancez ce sort en utilisant un emplacement de sort de niveau 4 ou supérieur, vous animez ou réaffirmez le contrôle sur deux créatures supplémentaires pour chaque niveau au-delà de 3.",
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Anime mort-vivant"
  },
  {
    "id": "magic-circle",
    "name": "Cercle magique",
    "nameEn": "Magic Circle",
    "level": 3,
    "levelDisplay": "Niveau 3",
    "school": "abjuration",
    "type": "Protection",
    "isDomainSpell": false,
    "castingTime": "1 minute",
    "range": "3 mètres",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "de l'eau bénite* OU de la poudre d'argent (100 po)",
      "materialConsumed": true
    },
    "duration": {
      "type": "timed",
      "value": "1 heure"
    },
    "concentration": false,
    "ritual": false,
    "description": "Vous créez un cylindre de 3 mètres de rayon et 6 mètres de haut centrée sur un point au sol. Choisissez un ou plusieurs types de créatures : célestes, élémentaires, fées, fiélons ou morts-vivants. Le cercle affecte une créature du type choisi de plusieurs façons : elle ne peut pas pénétrer volontairement, désavantage sur les attaques contre les créatures à l'extérieur, et désavantage aux jets de caractéristique ou sauvegardes.",
    "descriptionShort": "Barrière contre un type de créatures (célestes, fiélons, morts-vivants, etc.)",
    "higherLevels": "Lorsque vous utilisez un emplacement de niveau 4 ou supérieur, la durée augmente de 1 heure par niveau au-delà de 3.",
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Protection cercle"
  },
  {
    "id": "clairvoyance",
    "name": "Clairvoyance",
    "nameEn": "Clairvoyance",
    "level": 3,
    "levelDisplay": "Niveau 3",
    "school": "divination",
    "type": "Divination / Espionnage",
    "isDomainSpell": false,
    "castingTime": "10 minutes",
    "range": "1,5 kilomètre",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "une focale d'une valeur d'au moins 100 po",
      "materialConsumed": false
    },
    "duration": {
      "type": "concentration",
      "value": "concentration, jusqu'à 10 minutes"
    },
    "concentration": true,
    "ritual": false,
    "description": "Vous créez un organe sensorriel invisible à un endroit familier ou en vue (1,5 km max). Vous pouvez choisir de voir ou d'entendre à travers cet organe. Vous devez choisir lors de l'incantation. Votre corps est considéré comme aveugle ou sourd pendant ce temps.",
    "descriptionShort": "Crée un point d'observation ou d'écoute à 1,5 km.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Observation à distance"
  },
  {
    "id": "speak-with-dead",
    "name": "Communication avec les morts",
    "nameEn": "Speak with Dead",
    "level": 3,
    "levelDisplay": "Niveau 3",
    "school": "necromancy",
    "type": "Divination / Investigation",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "3 mètres",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "de l'encens brûlant* - *anciennement: encens de communication",
      "materialConsumed": true
    },
    "duration": {
      "type": "timed",
      "value": "10 minutes"
    },
    "concentration": false,
    "ritual": false,
    "description": "Vous accordez le semblant de vie et d'intelligence à un cadavre pour poser cinq questions. Le corps doit avoir une bouche et ne doit pas être un mort-vivant. Le sort ne ramène pas l'âme, seulement l'esprit animé du corps qui ne connaît que ce que le corps savait. Les réponses sont généralement brèves et cryptiques.",
    "descriptionShort": "Permet de poser 5 questions à un cadavre.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Parle aux morts"
  },
  {
    "id": "sending",
    "name": "Communication à distance",
    "nameEn": "Sending",
    "level": 3,
    "levelDisplay": "Niveau 3",
    "school": "evocation",
    "type": "Divination / Communication",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "illimitée",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "un petit filament de cuivre",
      "materialConsumed": false
    },
    "duration": {
      "type": "timed",
      "value": "1 round"
    },
    "concentration": false,
    "ritual": false,
    "description": "Vous envoyez un message court de vingt-cinq mots ou moins à une créature avec laquelle vous êtes familier. La créature entend le message dans son esprit, reconnaît votre voix, et peut répondre immédiatement de la même manière. Le sort traverse obstacles mais ne traverse pas les plans.",
    "descriptionShort": "Envoie un message de 25 mots à une créature familière sur tout le plan.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Message à distance"
  },
  {
    "id": "spirit-guardians",
    "name": "Esprits gardiens",
    "nameEn": "Spirit Guardians",
    "level": 3,
    "levelDisplay": "Niveau 3",
    "school": "conjuration",
    "type": "Invocation / Protection",
    "isDomainSpell": true,
    "castingTime": "1 action",
    "range": "personnelle (rayon de 4,5 m)",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "un symbole sacré",
      "materialConsumed": false
    },
    "duration": {
      "type": "concentration",
      "value": "concentration, jusqu'à 10 minutes"
    },
    "concentration": true,
    "ritual": false,
    "description": "Des esprits surnaturels flottent autour de vous dans un rayon de 4,5 mètres. Choisissez leur apparence (anges, démons, esprits, etc.). Une créature hostile qui entre dans la zone ou y commence son tour doit réussir un jet de Sagesse ou subir 3d8 dégâts (radiants si bon, nécrotiques si mauvais, choix sinon). La créature voit sa vitesse réduite de moitié dans la zone.",
    "descriptionShort": "Des esprits infligent 3d8 dégâts aux ennemis dans un rayon de 4,5m.",
    "higherLevels": "Les dégâts augmentent de 1d8 par niveau d'emplacement au-delà de 3.",
    "incantation": null,
    "recommendation": "TRÈS RECOMMANDÉ",
    "source": "core",
    "summary": "3d8 dégâts zone"
  },
  {
    "id": "glyph-of-warding",
    "name": "Glyphe de protection",
    "nameEn": "Glyph of Warding",
    "level": 3,
    "levelDisplay": "Niveau 3",
    "school": "abjuration",
    "type": "Protection / Piège",
    "isDomainSpell": false,
    "castingTime": "1 heure",
    "range": "contact",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "de la poudre de diamant d'une valeur d'au moins 200 po",
      "materialConsumed": true
    },
    "duration": {
      "type": "timed",
      "value": "jusqu'à déclenchement ou dissipation"
    },
    "concentration": false,
    "ritual": false,
    "description": "Lorsque vous tracez ce glyphe, vous choisissez son déclencheur et l'effet qu'il produit : explosion (5d8 dégâts acides, froid, feu, foudre ou tonnerre), sort (niveau 3 ou moins stocké), ou élémentaires (1d4 élémentaires invoqués). Le glyphe se cache sur un objet ou une surface. Une fois déclenché, le sort se termine.",
    "descriptionShort": "Crée un piège magique qui inflige 5d8 dégâts ou lance un sort.",
    "higherLevels": "Pour chaque niveau au-delà de 3, les dégâts augmentent de 1d8 ou le niveau du sort stocké augmente de 1.",
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Piège magique"
  },
  {
    "id": "tongues",
    "name": "Langues",
    "nameEn": "Tongues",
    "level": 3,
    "levelDisplay": "Niveau 3",
    "school": "divination",
    "type": "Divination / Communication",
    "isDomainSpell": true,
    "castingTime": "1 action",
    "range": "contact",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": "une petite figurine de cire de zézai",
      "materialConsumed": false
    },
    "duration": {
      "type": "timed",
      "value": "1 heure"
    },
    "concentration": false,
    "ritual": false,
    "description": "La cible peut comprendre toutes les langues parlées qu'elle entend. De plus, quand la cible parle, toute créature qui connaît au moins une langue et qui peut l'entendre comprend ce qu'elle dit.",
    "descriptionShort": "La cible comprend et parle toutes les langues.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Comprend langues"
  },
  {
    "id": "water-walk",
    "name": "Marche sur l'eau",
    "nameEn": "Water Walk",
    "level": 3,
    "levelDisplay": "Niveau 3",
    "school": "transmutation",
    "type": "Utilitaire",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "9 mètres",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "un morceau de liège",
      "materialConsumed": false
    },
    "duration": {
      "type": "timed",
      "value": "1 heure"
    },
    "concentration": false,
    "ritual": true,
    "description": "Ce sort accorde la capacité de marcher sur tout liquide comme s'il s'agissait d'un sol solide. Dix créatures consentantes dans la portée peuvent marcher sur l'eau, l'acide, la lave, la boue ou la neige fondante sans tomber ni s'enfoncer. Si vous ciblez une créature immergée, elle remonte à la surface à 18 mètres par round.",
    "descriptionShort": "Permet à 10 créatures de marcher sur l'eau et autres liquides.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Marche sur eau"
  },
  {
    "id": "revivify",
    "name": "Retour à la vie",
    "nameEn": "Revivify",
    "level": 3,
    "levelDisplay": "Niveau 3",
    "school": "necromancy",
    "type": "Soins / Résurrection",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "contact",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "des diamants d'âme* (300 po) - *anciennement: diamants 300po",
      "materialConsumed": true
    },
    "duration": {
      "type": "instantaneous"
    },
    "concentration": false,
    "ritual": false,
    "description": "Vous touchez une créature morte depuis moins d'une minute. Elle revient à la vie avec 1 point de vie. Ce sort ne ramène pas les membres perdus et ne neutralise pas les poisons ou maladies. Ne fonctionne pas sur les morts-vivants.",
    "descriptionShort": "Ramène à la vie une créature morte depuis moins d'une minute avec 1 pv.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": "ESSENTIEL",
    "source": "core",
    "summary": "Ressuscite (1 min)"
  }
];
