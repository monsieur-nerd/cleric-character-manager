/**
 * Sorts de prêtre - Niveau 9
 * Complément pour les sorts définis dans spellComponentMappings.ts
 */
import type { Spell } from "@/types";

export const clericLevel9Spells: Spell[] = [
  {
    "id": "mass-heal-word-9",
    "name": "Mot de guérison de masse",
    "nameEn": "Mass Heal",
    "level": 9,
    "levelDisplay": "Niveau 9",
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
    "description": "Un flot d'énergie curative positive émane de vous et restaure jusqu'à 700 points de vie que vous pouvez répartir librement entre les créatures dans la portée. Les créatures soignées sont également guéries de toutes les maladies et de tous les effets les rendant aveugles ou sourdes. Ce sort n'a pas d'effet sur les morts-vivants ni les constructions.",
    "descriptionShort": "Répartit 700 points de vie entre plusieurs créatures.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": "INDISPENSABLE",
    "source": "core",
    "summary": "700 pv répartis"
  },
  {
    "id": "gate-astral",
    "name": "Portail astral",
    "nameEn": "Astral Projection",
    "level": 9,
    "levelDisplay": "Niveau 9",
    "school": "necromancy",
    "type": "Téléportation",
    "isDomainSpell": false,
    "castingTime": "1 heure",
    "range": "3 mètres",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "un jaspe* et une perle* (1000 po) - *anciennement: un jaspe et une perle d'une valeur totale d'au moins 1000 po",
      "materialConsumed": false
    },
    "duration": {
      "type": "timed",
      "value": "jusqu'à révocation"
    },
    "concentration": false,
    "ritual": false,
    "description": "Vous et jusqu'à huit créatures consentantes projetez vos formes astrales dans le Plan Astral, laissant vos corps physiques derrière vous. Dans le Plan Astral, vous avez une vitesse de vol de 3 fois votre vitesse normale. Si vous entrez par un portail vers un autre plan, votre forme matérielle et vos possessions apparaissent.",
    "descriptionShort": "Projette jusqu'à 8 créatures dans le Plan Astral.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Projection astrale"
  },
  {
    "id": "foresight",
    "name": "Prémonition",
    "nameEn": "Foresight",
    "level": 9,
    "levelDisplay": "Niveau 9",
    "school": "divination",
    "type": "Divination / Buff",
    "isDomainSpell": false,
    "castingTime": "1 minute",
    "range": "contact",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "de l'encens des visions* et des herbes divinatoires* - *anciennement: de l'encens et des herbes",
      "materialConsumed": false
    },
    "duration": {
      "type": "timed",
      "value": "8 heures"
    },
    "concentration": false,
    "ritual": false,
    "description": "Vous touchez une créature consentante et lui conférez une capacité limitée à voir dans le futur immédiat. Pour la durée, la cible ne peut pas être surprise et a l'avantage aux jets d'attaque, de capacité et de sauvegarde. De plus, les autres créatures ont le désavantage aux jets d'attaque contre la cible.",
    "descriptionShort": "Avantage à tous les jets, désavantage aux attaques contre la cible.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Avantage total"
  },
  {
    "id": "implosion",
    "name": "Déclaration divine",
    "nameEn": "Implosion",
    "level": 9,
    "levelDisplay": "Niveau 9",
    "school": "evocation",
    "type": "Attaque",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "27 mètres",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "de l'encens de sang de dragon* et de l'or* (1000 po) - *anciennement: de l'encens et de l'or d'une valeur d'au moins 1000 po",
      "materialConsumed": true
    },
    "duration": {
      "type": "concentration",
      "value": "concentration, jusqu'à 1 minute"
    },
    "concentration": true,
    "ritual": false,
    "description": "Vous créez une pression destructive intense au centre d'une créature choisie. La cible doit réussir un jet de sauvegarde de Constitution ou subir 10d10 dégâts de force. Vous pouvez répéter cette attaque avec une action bonus à chacun de vos tours tant que vous vous concentrez.",
    "descriptionShort": "10d10 dégâts de force par round (CON pour annuler).",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "extended",
    "summary": "10d10 dégâts/round"
  },
  {
    "id": "myconid-swarm",
    "name": "Imprégnation de champignon",
    "nameEn": "Myconid Swarm",
    "level": 9,
    "levelDisplay": "Niveau 9",
    "school": "conjuration",
    "type": "Invocation",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "18 mètres",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "des spores magiques",
      "materialConsumed": false
    },
    "duration": {
      "type": "concentration",
      "value": "concentration, jusqu'à 10 minutes"
    },
    "concentration": true,
    "ritual": false,
    "description": "Vous invoquez une nuée de myconides dans un cube de 6 mètres. La nuée est un terrain difficile et inflige 4d8 dégâts de poison aux créatures qui commencent leur tour dans la zone ou y entrent. Les créatures peuvent utiliser une action pour attaquer la nuée (AC 15, 100 pv, immunisée à la plupart des états).",
    "descriptionShort": "Invoque une nuée de myconides infligeant 4d8 poison.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "extended",
    "summary": "Nuée myconides"
  },
  {
    "id": "calm-emotions-mass",
    "name": "Apaisement",
    "nameEn": "Mass Calm Emotions",
    "level": 9,
    "levelDisplay": "Niveau 9",
    "school": "enchantment",
    "type": "Contrôle",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "18 mètres",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "de l'encens et une perle d'une valeur d'au moins 500 po",
      "materialConsumed": false
    },
    "duration": {
      "type": "concentration",
      "value": "concentration, jusqu'à 1 minute"
    },
    "concentration": true,
    "ritual": false,
    "description": "Vous tentez de supprimer les effets forts des émotions sur un groupe de créatures. Chaque humanoïde dans une sphère de 6 mètres doit réussir un jet de sauvegarde de Charisme ou devenir indifférent aux créatures que vous désignez. Les créatures indifférentes ne peuvent pas attaquer. Le sort met également fin à l'effet charmé ou effrayé.",
    "descriptionShort": "Rend indifférentes les créatures dans une zone de 6m.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "extended",
    "summary": "Apaisement zone"
  },
  {
    "id": "aura-of-life",
    "name": "Aura de vie",
    "nameEn": "Aura of Life",
    "level": 9,
    "levelDisplay": "Niveau 9",
    "school": "abjuration",
    "type": "Protection",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "personnelle (rayon de 9m)",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "de la poudre de diamant d'une valeur d'au moins 2000 po",
      "materialConsumed": true
    },
    "duration": {
      "type": "concentration",
      "value": "concentration, jusqu'à 10 minutes"
    },
    "concentration": true,
    "ritual": false,
    "description": "Une aura de vie émane de vous dans un rayon de 9 mètres. Vous et les créatures non-hostiles dans l'aura avez la résistance aux dégâts nécrotiques et regagnez 1 point de vie au début de chacun de vos tours si vous avez 0 point de vie. Les morts-vivants dans l'aura ont le désavantage aux jets d'attaque.",
    "descriptionShort": "Aura de 9m : résistance nécrotique, régénération, désavantage aux morts-vivants.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "extended",
    "summary": "Aura protection"
  },
  {
    "id": "supreme-restoration",
    "name": "Restauration suprême",
    "nameEn": "Greater Restoration",
    "level": 9,
    "levelDisplay": "Niveau 9",
    "school": "abjuration",
    "type": "Soins",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "contact",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "des diamants cosmiques* (25000 po) - *anciennement: des diamants d'une valeur d'au moins 25000 po",
      "materialConsumed": true
    },
    "duration": {
      "type": "instantaneous"
    },
    "concentration": false,
    "ritual": false,
    "description": "Vous imprégnez une créature que vous touchez d'énergie positive pour annuler un effet nocif. Vous pouvez réduire le niveau d'épuisement de la cible d'un niveau, mettre fin à un effet de charme ou de pétrification, lever une malédiction, ou restaurer une caractéristique réduite. Vous pouvez également supprimer une réduction de points de vie maximum.",
    "descriptionShort": "Restaure caractéristiques, guérit charme, pétrification, malédictions.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": "INDISPENSABLE",
    "source": "core",
    "summary": "Restauration totale"
  },
  {
    "id": "storm-of-vengeance",
    "name": "Tempête de vengeance",
    "nameEn": "Storm of Vengeance",
    "level": 9,
    "levelDisplay": "Niveau 9",
    "school": "conjuration",
    "type": "Attaque",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": " Vue",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "un météore miniature",
      "materialConsumed": true
    },
    "duration": {
      "type": "concentration",
      "value": "concentration, jusqu'à 1 minute"
    },
    "concentration": true,
    "ritual": false,
    "description": "Une énorme tempête orageuse s'abat sur un point que vous pouvez voir. Chaque créature sous le nuage doit faire un jet de sauvegarde de Constitution ou être assourdie pendant 5d6 rounds. Chaque round, un effet différent se produit : foudre (2d6 dégâts), pluie acide (1d6 acide), grêlons (2d6 contondants), tempête de neige (vision réduite à 6m), orage (2d6 foudre + 2d6 tonnerre).",
    "descriptionShort": "Tempête massive avec effets variés chaque round.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Tempête massive"
  },
  {
    "id": "healing-wave",
    "name": "Vague de guérison",
    "nameEn": "Healing Wave",
    "level": 9,
    "levelDisplay": "Niveau 9",
    "school": "evocation",
    "type": "Soins",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "personnelle (rayon de 9m)",
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
    "description": "Une vague d'énergie curative positive se propage depuis vous dans un rayon de 9 mètres. Chaque créature consentante de votre choix dans la zone regagne 10d8 + 30 points de vie. De plus, le sort met fin aux maladies, poisons, cécité et surdité des créatures soignées.",
    "descriptionShort": "Soigne 10d8+30 pv dans un rayon de 9m.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": "ESSENTIEL",
    "source": "extended",
    "summary": "10d8+30 soins"
  }
];
