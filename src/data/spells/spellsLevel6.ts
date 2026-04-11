/**
 * Sorts de prêtre - Niveau 6
 * Complément pour les sorts définis dans spellComponentMappings.ts
 */
import type { Spell } from "@/types";

export const clericLevel6Spells: Spell[] = [
  {
    "id": "blade-barrier",
    "name": "Barrière de lames",
    "nameEn": "Blade Barrier",
    "level": 6,
    "levelDisplay": "Niveau 6",
    "school": "evocation",
    "type": "Invocation / Protection",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "27 mètres",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "un couteau d'argent",
      "materialConsumed": false
    },
    "duration": {
      "type": "concentration",
      "value": "concentration, jusqu'à 10 minutes"
    },
    "concentration": true,
    "ritual": false,
    "description": "Vous créez un mur vertical de lames d'énergie magique tourbillonnantes. Le mur peut avoir une longueur maximale de 30 mètres, une hauteur maximale de 6 mètres et une épaisseur de 1,5 mètre. Une créature dans la zone ou qui traverse le mur doit réussir un jet de Dextérité ou subir 6d10 dégâts tranchants.",
    "descriptionShort": "Mur de lames inflige 6d10 dégâts tranchants.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "6d10 dégâts mur"
  },
  {
    "id": "anti-magic-field",
    "name": "Champ antimagie",
    "nameEn": "Antimagic Field",
    "level": 6,
    "levelDisplay": "Niveau 6",
    "school": "abjuration",
    "type": "Protection",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "personnelle (rayon de 3m)",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "une pincée de fer froid",
      "materialConsumed": false
    },
    "duration": {
      "type": "concentration",
      "value": "concentration, jusqu'à 1 heure"
    },
    "concentration": true,
    "ritual": false,
    "description": "Une sphère de 3 mètres de rayon autour de vous supprime la magie. Dans la zone, les sorts ne peuvent pas être lancés, les effets magiques sont supprimés, les objets magiques deviennent ordinaires, les créatures invoquées disparaissent, et les formes altérées reprennent leur forme normale. Les effets de sorts déjà actifs sont suspendus dans la zone.",
    "descriptionShort": "Supprime toute magie dans une sphère de 3m.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Zone antimagie"
  },
  {
    "id": "harm",
    "name": "Châtiment",
    "nameEn": "Harm",
    "level": 6,
    "levelDisplay": "Niveau 6",
    "school": "necromancy",
    "type": "Attaque",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "18 mètres",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "de la poudre de diamant d'une valeur d'au moins 1000 po",
      "materialConsumed": true
    },
    "duration": {
      "type": "instantaneous"
    },
    "concentration": false,
    "ritual": false,
    "description": "Vous assaillez une créature d'énergie nécrotique. La cible doit faire un jet de sauvegarde de Constitution. Elle subit 14d6 dégâts nécrotiques en cas d'échec, ou la moitié en cas de réussite. Les points de vie maximum de la cible sont réduits du même montant que les dégâts subis pendant 1 heure. Ce sort ne peut pas réduire les pv max en dessous de 1.",
    "descriptionShort": "14d6 dégâts nécrotiques, réduit les pv max (CON pour demi).",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "14d6 nécro + réduction"
  },
  {
    "id": "shadow-walk",
    "name": "Vision de l'ombre",
    "nameEn": "True Seeing",
    "level": 6,
    "levelDisplay": "Niveau 6",
    "school": "divination",
    "type": "Divination",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "contact",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "de l'encens rare",
      "materialConsumed": false
    },
    "duration": {
      "type": "timed",
      "value": "1 heure"
    },
    "concentration": false,
    "ritual": false,
    "description": "La cible voit les choses comme elles sont réellement. Pour la durée, la cible perçoit la présence d'objets et de créatures magiques, voit les créatures et objets invisibles, voit à travers les illusions, perçoit la forme originale des métamorphes, et voit les portes vers d'autres plans à 3 mètres.",
    "descriptionShort": "La cible voit l'invisible, perçoit la magie, traverse les illusions.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Vision véritable"
  },
  {
    "id": "heal",
    "name": "Guérison",
    "nameEn": "Heal",
    "level": 6,
    "levelDisplay": "Niveau 6",
    "school": "evocation",
    "type": "Soins",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "18 mètres",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "de la poudre de diamant d'une valeur d'au moins 100 po",
      "materialConsumed": false
    },
    "duration": {
      "type": "instantaneous"
    },
    "concentration": false,
    "ritual": false,
    "description": "Choisissez une créature dans la portée. Un regain de pouvoir positif la traverse, lui redonnant 70 points de vie. Ce sort met également fin à l'aveuglement, la surdité et toutes les maladies dont souffre la cible. Ce sort n'a aucun effet sur les morts-vivants ou les constructions.",
    "descriptionShort": "70 pv restaurés, guérit aveuglement, surdité et maladies.",
    "higherLevels": "Pour chaque niveau d'emplacement au-delà de 6, le soin augmente de 10 points.",
    "incantation": null,
    "recommendation": "INDISPENSABLE",
    "source": "core",
    "summary": "Soigne 70 pv"
  },
  {
    "id": "forbiddance",
    "name": "Interdiction",
    "nameEn": "Forbiddance",
    "level": 6,
    "levelDisplay": "Niveau 6",
    "school": "abjuration",
    "type": "Protection",
    "isDomainSpell": false,
    "castingTime": "10 minutes",
    "range": "contact",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "de l'eau bénite* et des herbes* - *anciennement: de l'eau bénite et des herbes rares",
      "materialConsumed": true
    },
    "duration": {
      "type": "timed",
      "value": "1 jour"
    },
    "concentration": false,
    "ritual": false,
    "description": "Vous créez une zone protégée dans un cube de 36 mètres maximum. Les créatures du type spécifié (célestes, élémentaires, fées, fiélons ou morts-vivants) subissent 5d10 dégâts radiants ou nécrotiques (votre choix) en entrant ou en commençant leur tour. De plus, les téléportations et voyages planaires sont bloqués dans la zone.",
    "descriptionShort": "Zone protégée inflige 5d10 dégâts aux types choisis. Bloque téléportation.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "5d10 dégâts zone"
  },
  {
    "id": "word-of-recall",
    "name": "Mot de rappel",
    "nameEn": "Word of Recall",
    "level": 6,
    "levelDisplay": "Niveau 6",
    "school": "conjuration",
    "type": "Téléportation",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "1,5 mètre",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": "un bijou",
      "materialConsumed": false
    },
    "duration": {
      "type": "instantaneous"
    },
    "concentration": false,
    "ritual": false,
    "description": "Vous et jusqu'à cinq créatures consentantes dans un rayon de 1,5 mètre êtes instantanément transportés vers un sanctuaire précédemment désigné. Vous devez avoir visité cet endroit et l'avoir désigné comme sanctuaire par un sort spécial. Le sort échoue si vous essayez de voyager entre les plans.",
    "descriptionShort": "Téléporte vers un sanctuaire prédésigné.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Téléportation sanctuaire"
  },
  {
    "id": "modify-memory",
    "name": "Trou de mémoire",
    "nameEn": "Modify Memory",
    "level": 6,
    "levelDisplay": "Niveau 6",
    "school": "enchantment",
    "type": "Contrôle",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "9 mètres",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "de l'encens et une plume",
      "materialConsumed": false
    },
    "duration": {
      "type": "concentration",
      "value": "concentration, jusqu'à 1 minute"
    },
    "concentration": true,
    "ritual": false,
    "description": "Vous tentez de remodeler les souvenirs d'une cible. Elle doit réussir un jet de sauvegarde de Sagesse ou être charmée. Tant qu'elle est charmée, vous pouvez modifier ses souvenirs des dernières 24 heures. Vous pouvez supprimer, créer ou modifier des souvenirs. La cible réalise que ses souvenirs ont été altérés si le sort se termine avant que vous n'ayez terminé.",
    "descriptionShort": "Modifie les souvenirs des dernières 24 heures.",
    "higherLevels": "Avec un emplacement de niveau 7, vous pouvez modifier les souvenirs des 7 derniers jours.",
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Modifie souvenirs"
  }
];
