/**
 * Sorts de prêtre - Niveau 1
 * Complément pour les sorts définis dans spellComponentMappings.ts
 */
import type { Spell } from "@/types";

export const clericLevel1Spells: Spell[] = [
  {
    "id": "bless",
    "name": "Bénédiction",
    "nameEn": "Bless",
    "level": 1,
    "levelDisplay": "Niveau 1",
    "school": "enchantment",
    "type": "Buff",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "9 mètres",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "de l'eau bénite",
      "materialConsumed": false
    },
    "duration": {
      "type": "concentration",
      "value": "concentration, jusqu'à 1 minute"
    },
    "concentration": true,
    "ritual": false,
    "description": "Vous bénissez jusqu'à trois créatures de votre choix dans la portée du sort. Chaque fois qu'une cible effectue un jet d'attaque ou de sauvegarde avant la fin du sort, la cible peut lancer un d4 et ajouter le résultat au jet d'attaque ou de sauvegarde.",
    "descriptionShort": "Jusqu'à 3 créatures ajoutent 1d4 à leurs attaques et sauvegardes.",
    "higherLevels": "Lorsque vous lancez ce sort en utilisant un emplacement de sort de niveau 2 ou supérieur, vous pouvez cibler une créature supplémentaire pour chaque niveau d'emplacement au-delà du niveau 1.",
    "incantation": null,
    "recommendation": "TRÈS RECOMMANDÉ",
    "source": "core",
    "summary": "+1d4 attaque/sauv"
  },
  {
    "id": "detect-poison",
    "name": "Détection du poison",
    "nameEn": "Detect Poison and Disease",
    "level": 1,
    "levelDisplay": "Niveau 1",
    "school": "divination",
    "type": "Détection",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "personnelle",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "une feuille d'if",
      "materialConsumed": false
    },
    "duration": {
      "type": "concentration",
      "value": "concentration, jusqu'à 10 minutes"
    },
    "concentration": true,
    "ritual": true,
    "description": "Pour la durée du sort, vous pouvez percevoir la présence et l'emplacement du poison, des créatures empoisonnées et des maladies dans un rayon de 9 mètres autour de vous. Vous pouvez également identifier le type de poison ou de maladie.",
    "descriptionShort": "Détecte poison, créatures empoisonnées et maladies à 9m.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Détecte poison"
  },
  {
    "id": "bane",
    "name": "Fléau",
    "nameEn": "Bane",
    "level": 1,
    "levelDisplay": "Niveau 1",
    "school": "enchantment",
    "type": "Malus",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "9 mètres",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "une goutte de sang",
      "materialConsumed": false
    },
    "duration": {
      "type": "concentration",
      "value": "concentration, jusqu'à 1 minute"
    },
    "concentration": true,
    "ritual": false,
    "description": "Jusqu'à trois créatures de votre choix dans la portée du sort doivent chacune réussir un jet de sauvegarde de Charisme. En cas d'échec, la cible doit soustraire 1d4 du résultat de chaque jet d'attaque ou de sauvegarde avant la fin du sort.",
    "descriptionShort": "Jusqu'à 3 créatures soustraient 1d4 à leurs attaques et sauvegardes.",
    "higherLevels": "Lorsque vous lancez ce sort en utilisant un emplacement de sort de niveau 2 ou supérieur, vous pouvez cibler une créature supplémentaire pour chaque niveau d'emplacement au-delà du niveau 1.",
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "-1d4 attaque/sauv"
  },
  {
    "id": "sanctuary",
    "name": "Sanctuaire",
    "nameEn": "Sanctuary",
    "level": 1,
    "levelDisplay": "Niveau 1",
    "school": "abjuration",
    "type": "Protection",
    "isDomainSpell": false,
    "castingTime": "1 action bonus",
    "range": "9 mètres",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "un miroir en argent",
      "materialConsumed": false
    },
    "duration": {
      "type": "timed",
      "value": "1 minute"
    },
    "concentration": false,
    "ritual": false,
    "description": "Vous protégez une créature dans la portée. Toute créature qui cible la créature protégée avec une attaque ou un sort nuisible doit d'abord réussir un jet de sauvegarde de Sagesse. En cas d'échec, la créature doit choisir une nouvelle cible ou perdre son attaque ou son sort. Le sort se termine si la créature protégée attaque ou lance un sort.",
    "descriptionShort": "La cible ne peut être attaquée sauf si l'attaquant réussit un jet de Sagesse.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Protection cible"
  }
];
