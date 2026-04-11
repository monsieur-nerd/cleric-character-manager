/**
 * Sorts de prêtre - Niveau 7
 * Complément pour les sorts définis dans spellComponentMappings.ts
 */
import type { Spell } from "@/types";

export const clericLevel7Spells: Spell[] = [
  {
    "id": "shapechange",
    "name": "Changement de forme",
    "nameEn": "Shapechange",
    "level": 7,
    "levelDisplay": "Niveau 7",
    "school": "transmutation",
    "type": "Transformation",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "personnelle",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "un bijou de jade d'une valeur d'au moins 1500 po",
      "materialConsumed": false
    },
    "duration": {
      "type": "concentration",
      "value": "concentration, jusqu'à 1 heure"
    },
    "concentration": true,
    "ritual": false,
    "description": "Vous assumez la forme d'une créature différente. Vous pouvez vous transformer en n'importe quelle créature avec un indice de dangerosité égal ou inférieur à votre niveau. Vous conservez votre personnalité et vos valeurs mentales, mais vous adoptez les caractéristiques physiques de la forme. Vous pouvez changer de forme à nouveau avec une action.",
    "descriptionShort": "Se transforme en n'importe quelle créature (ID ≤ niveau).",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Métamorphose"
  },
  {
    "id": "myconid-dance",
    "name": "Champignon virevoltant",
    "nameEn": "Myconid Dance",
    "level": 7,
    "levelDisplay": "Niveau 7",
    "school": "enchantment",
    "type": "Contrôle",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "27 mètres",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "des spores et de la terre",
      "materialConsumed": false
    },
    "duration": {
      "type": "concentration",
      "value": "concentration, jusqu'à 1 minute"
    },
    "concentration": true,
    "ritual": false,
    "description": "Des spores hallucinogènes s'échappent de vous dans une sphère de 6 mètres de rayon. Chaque créature hostile dans la zone doit réussir un jet de sauvegarde de Sagesse ou tomber en transe. Une créature en transe est incapacitée et sa vitesse tombe à 0. Elle peut refaire le jet à la fin de chacun de ses tours.",
    "descriptionShort": "Spores hallucinogènes paralysent dans une zone de 6m.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "extended",
    "summary": "Paralysie zone"
  },
  {
    "id": "control-weather",
    "name": "Contrôle du climat",
    "nameEn": "Control Weather",
    "level": 7,
    "levelDisplay": "Niveau 7",
    "school": "transmutation",
    "type": "Contrôle",
    "isDomainSpell": false,
    "castingTime": "10 minutes",
    "range": "personnelle (rayon de 8 km)",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "de l'encens de brume* et de l'eau bénite - *anciennement: de l'encens et de l'eau bénite",
      "materialConsumed": false
    },
    "duration": {
      "type": "concentration",
      "value": "concentration, jusqu'à 8 heures"
    },
    "concentration": true,
    "ritual": false,
    "description": "Vous prenez le contrôle du climat dans un rayon de 8 kilomètres. Vous pouvez changer les conditions météorologiques : température (de -40°C à 50°C), vent (calme à tempête), précipitations (clair à tempête de grêle). Le changement met 1d4×10 minutes à s'appliquer. Le temps redevient normal progressivement après la fin du sort.",
    "descriptionShort": "Contrôle la météo dans un rayon de 8 km.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Contrôle météo"
  },
  {
    "id": "profane-sigil",
    "name": "Dessin du profane",
    "nameEn": "Symbol",
    "level": 7,
    "levelDisplay": "Niveau 7",
    "school": "abjuration",
    "type": "Protection / Piège",
    "isDomainSpell": false,
    "castingTime": "1 minute",
    "range": "contact",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "de l'encens de sang de dragon* et de la poudre d'os d'une valeur totale d'au moins 500 po - *anciennement: de l'encens et de la poudre d'os",
      "materialConsumed": true
    },
    "duration": {
      "type": "timed",
      "value": "jusqu'à déclenchement ou dissipation"
    },
    "concentration": false,
    "ritual": false,
    "description": "Vous tracez un glyphe magique sur une surface, dans un livre, ou sur un objet. Vous choisissez un déclencheur et un effet parmi : Douleur (10d10 nécrotiques), Épouvante (panique), Discorde (attaque alliés), Assomme (inconscience 10min), Folie (confusion), Mort (10d10 nécrotiques, réduit à 0pv). Une inspection magique peut détecter le glyphe.",
    "descriptionShort": "Crée un symbole magique piégé avec divers effets (dégâts, peur, folie...).",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Symbole piégé"
  },
  {
    "id": "mass-heal-word",
    "name": "Mot de guérison suprême",
    "nameEn": "Mass Heal",
    "level": 7,
    "levelDisplay": "Niveau 7",
    "school": "evocation",
    "type": "Soins",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "18 mètres",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "de l'eau bénite",
      "materialConsumed": false
    },
    "duration": {
      "type": "instantaneous"
    },
    "concentration": false,
    "ritual": false,
    "description": "Un flot d'énergie curative émane de vous vers les créatures blessées autour de vous. Vous pouvez restaurer jusqu'à 700 points de vie, répartis entre autant de créatures que vous voulez dans la portée. Les créatures soignées par ce sort sont également guéries de toutes les maladies et de tout effet les rendant aveugles ou sourdes.",
    "descriptionShort": "Répartit 700 points de soin entre plusieurs créatures.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": "INDISPENSABLE",
    "source": "core",
    "summary": "Soigne 700 pv"
  },
  {
    "id": "gate",
    "name": "Portail",
    "nameEn": "Gate",
    "level": 7,
    "levelDisplay": "Niveau 7",
    "school": "conjuration",
    "type": "Invocation / Téléportation",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "18 mètres",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "une arche et des clés d'une valeur d'au moins 1000 po",
      "materialConsumed": false
    },
    "duration": {
      "type": "concentration",
      "value": "concentration, jusqu'à 1 minute"
    },
    "concentration": true,
    "ritual": false,
    "description": "Vous créez un portail circulaire reliant un point à 18 mètres à un autre plan d'existence. Le portail est un cercle de 3 à 6 mètres de diamètre orienté selon votre choix. Quiconque traverse le portail est instantanément transporté vers l'autre plan, apparaissant à 1,80 mètre du portail correspondant.",
    "descriptionShort": "Ouvre un portail vers un autre plan d'existence.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Portail planaire"
  },
  {
    "id": "regenerate",
    "name": "Régénération",
    "nameEn": "Regenerate",
    "level": 7,
    "levelDisplay": "Niveau 7",
    "school": "transmutation",
    "type": "Soins",
    "isDomainSpell": false,
    "castingTime": "1 minute",
    "range": "contact",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "de l'huile et de la poudre",
      "materialConsumed": false
    },
    "duration": {
      "type": "timed",
      "value": "1 heure"
    },
    "concentration": false,
    "ritual": false,
    "description": "Vous touchez une créature et stimulez ses capacités de guérison naturelle. La cible regagne 4d8 + 15 points de vie. Pendant la durée du sort, la cible récupère 1 point de vie au début de chacun de ses tours. Si la cible a des membres sectionnés, ceux-ci repoussent après 2 minutes.",
    "descriptionShort": "4d8+15 pv immédiatement, puis 1 pv/round. Regénère les membres.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Régénère membres"
  },
  {
    "id": "resurrection",
    "name": "Résurrection",
    "nameEn": "Resurrection",
    "level": 7,
    "levelDisplay": "Niveau 7",
    "school": "necromancy",
    "type": "Résurrection",
    "isDomainSpell": false,
    "castingTime": "1 heure",
    "range": "contact",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "un diamant d'une valeur d'au moins 1000 po",
      "materialConsumed": true
    },
    "duration": {
      "type": "instantaneous"
    },
    "concentration": false,
    "ritual": false,
    "description": "Vous touchez une créature décédée depuis moins d'un siècle. Si l'âme est libre et consentante, la cible revient à la vie avec tous ses points de vie. Ce sort ferme les blessures, restaure les organes et membres détruits, et guérit les maladies et poisons. La cible subit une pénalité de -4 aux jets d'attaque et de sauvegarde pendant 4 jours.",
    "descriptionShort": "Ramène à la vie une créature morte depuis moins de 100 ans, restaure les membres.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": "ESSENTIEL",
    "source": "core",
    "summary": "Résurrection (100 ans)"
  }
];
