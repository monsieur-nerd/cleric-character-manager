/**
 * Sorts de prêtre - Niveau 4
 * Complément pour les sorts définis dans spellComponentMappings.ts
 */
import type { Spell } from "@/types";

export const clericLevel4Spells: Spell[] = [
  {
    "id": "confusion",
    "name": "Confusion",
    "nameEn": "Confusion",
    "level": 4,
    "levelDisplay": "Niveau 4",
    "school": "enchantment",
    "type": "Contrôle",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "27 mètres",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "trois noix de coco",
      "materialConsumed": false
    },
    "duration": {
      "type": "concentration",
      "value": "concentration, jusqu'à 1 minute"
    },
    "concentration": true,
    "ritual": false,
    "description": "Ce sort assaille et dérègle l'esprit des créatures, générant des illusions et provoquant des actions incontrôlables. Chaque créature dans une sphère de 3 mètres centrée sur un point choisi doit réussir un jet de Sagesse ou devenir confuse. Une créature confuse doit lancer un d10 au début de chaque tour pour déterminer son comportement.",
    "descriptionShort": "Les créatures dans une zone de 3m deviennent confuses.",
    "higherLevels": "Lorsque vous utilisez un emplacement de niveau 5 ou supérieur, le rayon de la sphère augmente de 1,5 m par niveau au-delà de 4.",
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Confusion zone"
  },
  {
    "id": "control-water",
    "name": "Contrôle de l'eau",
    "nameEn": "Control Water",
    "level": 4,
    "levelDisplay": "Niveau 4",
    "school": "transmutation",
    "type": "Contrôle",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "90 mètres",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "une goutte d'eau et une pincée de poussière",
      "materialConsumed": false
    },
    "duration": {
      "type": "concentration",
      "value": "concentration, jusqu'à 10 minutes"
    },
    "concentration": true,
    "ritual": false,
    "description": "Vous contrôlez un volume d'eau que vous pouvez voir. Vous pouvez : créer une inondation (monter l'eau de 6m), partager les eaux (créer un passage), rediriger le courant, ou créer un tourbillon (emprisonne les créatures).",
    "descriptionShort": "Contrôle un volume d'eau : inondation, partage, tourbillon.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Contrôle eau"
  },
  {
    "id": "divination",
    "name": "Divination",
    "nameEn": "Divination",
    "level": 4,
    "levelDisplay": "Niveau 4",
    "school": "divination",
    "type": "Divination",
    "isDomainSpell": true,
    "castingTime": "1 action",
    "range": "personnelle",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "de l'encens* et une offrande* (25 po) - *anciennement: encens et offrande sacrificielle de Divination",
      "materialConsumed": true
    },
    "duration": {
      "type": "instantaneous"
    },
    "concentration": false,
    "ritual": true,
    "description": "Votre divinité vous fournit un présage concernant les résultats d'une action spécifique que vous envisagez de poser dans les 30 prochaines minutes. Le MD choisit parmi : Bon, Mauvais, Bon et Mauvais, ou Rien. Le sort ne tient pas compte des changements de circonstances qui pourraient modifier l'issue.",
    "descriptionShort": "Révèle si une action future sera bonne, mauvaise, les deux, ou neutre.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Présime action"
  },
  {
    "id": "freedom-of-movement",
    "name": "Liberté de mouvement",
    "nameEn": "Freedom of Movement",
    "level": 4,
    "levelDisplay": "Niveau 4",
    "school": "abjuration",
    "type": "Protection",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "contact",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "un bandeau de cuir tanné",
      "materialConsumed": false
    },
    "duration": {
      "type": "timed",
      "value": "1 heure"
    },
    "concentration": false,
    "ritual": false,
    "description": "Vous touchez une créature consentante. Pour la durée, les effets magiques ne peuvent pas réduire sa vitesse, la paralyser ou l'entraver. La cible peut aussi passer à travers le terrain difficile créé par des sorts ou la végétation épaisse sans être ralentie, et elle ne peut pas être attrapée par des plantes ou de la vigne magique.",
    "descriptionShort": "La cible ignore terrain difficile, ne peut être paralysée ou ralentie.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": "TRÈS RECOMMANDÉ",
    "source": "core",
    "summary": "Liberté mouvement"
  },
  {
    "id": "giant-insect",
    "name": "Insecte géant",
    "nameEn": "Giant Insect",
    "level": 4,
    "levelDisplay": "Niveau 4",
    "school": "transmutation",
    "type": "Invocation",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "9 mètres",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "un peu de miel et des ailes d'insecte",
      "materialConsumed": false
    },
    "duration": {
      "type": "concentration",
      "value": "concentration, jusqu'à 10 minutes"
    },
    "concentration": true,
    "ritual": false,
    "description": "Vous transformez jusqu'à dix mille-pattes, trois araignées, cinq guêpes ou un scorpion en versions géantes de leurs espèces. Les insectes obéissent à vos ordres verbaux. Un insecte géant a les statistiques d'un monstre approprié et reste dans un rayon de 36 mètres de vous.",
    "descriptionShort": "Transforme des insectes en versions géantes sous votre contrôle.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Insectes géants"
  },
  {
    "id": "hallucinatory-terrain",
    "name": "Terrain hallucinatoire",
    "nameEn": "Hallucinatory Terrain",
    "level": 4,
    "levelDisplay": "Niveau 4",
    "school": "illusion",
    "type": "Illusion",
    "isDomainSpell": false,
    "castingTime": "10 minutes",
    "range": "90 mètres",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "une pierre, une brindille et une trace de verdure",
      "materialConsumed": false
    },
    "duration": {
      "type": "timed",
      "value": "24 heures"
    },
    "concentration": false,
    "ritual": false,
    "description": "Vous rendez un terrain naturel dans un cube de 45 mètres d'arête différent en apparence, son et odeur. Des structures ouvertes peuvent être masquées, des terrains apparemment solides peuvent être rendus dangereux, etc. Une investigation attentive révèle l'illusion (jet d'Intelligence).",
    "descriptionShort": "Change l'apparence d'un terrain dans un cube de 45m.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Illusion terrain"
  },
  {
    "id": "raise-dead",
    "name": "Rappel à la vie",
    "nameEn": "Raise Dead",
    "level": 4,
    "levelDisplay": "Niveau 4",
    "school": "necromancy",
    "type": "Résurrection",
    "isDomainSpell": false,
    "castingTime": "1 heure",
    "range": "contact",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "un diamant d'une valeur d'au moins 500 po",
      "materialConsumed": true
    },
    "duration": {
      "type": "instantaneous"
    },
    "concentration": false,
    "ritual": false,
    "description": "Vous ramenez à la vie une créature décédée depuis moins de 10 jours. La cible revient avec 1 point de vie. Ce sort ferme les blessures mortelles et neutralise les poisons, mais ne régénère pas les membres perdus. La cible subit un malus de -4 aux jets d'attaque et de sauvegarde jusqu'à un repos long.",
    "descriptionShort": "Ramène à la vie une créature morte depuis moins de 10 jours.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": "ESSENTIEL",
    "source": "core",
    "summary": "Ressuscite (10 jours)"
  }
];
