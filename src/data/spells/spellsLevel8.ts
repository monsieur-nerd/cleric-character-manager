/**
 * Sorts de prêtre - Niveau 8
 * Complément pour les sorts définis dans spellComponentMappings.ts
 */
import type { Spell } from "@/types";

export const clericLevel8Spells: Spell[] = [
  {
    "id": "antipathy-sympathy",
    "name": "Antipathie/Sympathie",
    "nameEn": "Antipathy/Sympathy",
    "level": 8,
    "levelDisplay": "Niveau 8",
    "school": "enchantment",
    "type": "Contrôle",
    "isDomainSpell": false,
    "castingTime": "1 heure",
    "range": "18 mètres",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "du vinaigre et du miel",
      "materialConsumed": false
    },
    "duration": {
      "type": "timed",
      "value": "10 jours"
    },
    "concentration": false,
    "ritual": false,
    "description": "Cette attirance ou cette répulsion affecte les créatures que vous désignez. Vous pouvez rendre un lieu ou un objet attirant ou répugnant pour un type spécifique de créatures. Antipathie : les créatures doivent réussir un jet de Sagesse ou être obligées de s'éloigner. Sympathie : les créatures doivent réussir un jet de Sagesse ou être attirées et vouloir rester près.",
    "descriptionShort": "Rend un lieu attirant ou répugnant pour un type de créatures.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Attire/Repousse"
  },
  {
    "id": "forcecage",
    "name": "Champ de force",
    "nameEn": "Forcecage",
    "level": 8,
    "levelDisplay": "Niveau 8",
    "school": "evocation",
    "type": "Invocation / Confinement",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "30 mètres",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "de la poudre de diamant d'une valeur d'au moins 1500 po",
      "materialConsumed": true
    },
    "duration": {
      "type": "timed",
      "value": "1 heure"
    },
    "concentration": false,
    "ritual": false,
    "description": "Une prison immobile de force magique se forme sous la forme d'un cube de 6 mètres ou d'une cage de 6 mètres sur 6. Toute créature dans la zone est piégée. Les créatures piégées ne peuvent pas quitter la cage par des moyens non-magiques. Les sorts ne peuvent pas traverser la barrière dans les deux sens. La téléportation et les voyages planaires sont bloqués.",
    "descriptionShort": "Emprisonne les créatures dans une cage de force inébranlable.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Prison force"
  },
  {
    "id": "control-flames",
    "name": "Contrôle du feu",
    "nameEn": "Control Flames",
    "level": 8,
    "levelDisplay": "Niveau 8",
    "school": "transmutation",
    "type": "Contrôle",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "18 mètres",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "du sulfure et du phosphore",
      "materialConsumed": false
    },
    "duration": {
      "type": "concentration",
      "value": "concentration, jusqu'à 1 heure"
    },
    "concentration": true,
    "ritual": false,
    "description": "Vous contrôlez les flammes dans un cube de 9 mètres d'arête. Vous pouvez élargir les flammes, les réduire, les déplacer, les intensifier pour doubler leur rayon, ou créer des images dans les flammes. Vous pouvez également éteindre les flammes ou les faire produire de la fumée épaisse.",
    "descriptionShort": "Contrôle les flammes dans un cube de 9m.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Contrôle feu"
  },
  {
    "id": "detect-thoughts",
    "name": "Détection des pensées",
    "nameEn": "Detect Thoughts",
    "level": 8,
    "levelDisplay": "Niveau 8",
    "school": "divination",
    "type": "Divination",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "9 mètres",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "un bout de cuivre et un bout de zinc",
      "materialConsumed": false
    },
    "duration": {
      "type": "concentration",
      "value": "concentration, jusqu'à 1 minute"
    },
    "concentration": true,
    "ritual": false,
    "description": "Vous lisez les pensées superficielles d'une créature dans la portée. Vous connaissez initialement ses pensées superficielles, puis vous pouvez utiliser votre action pour plonger plus profondément. Si la cible échoue un jet de Sagesse, vous apprenez son état émotionnel, sa perception de la situation, et ce qui occupe son esprit.",
    "descriptionShort": "Lit les pensées d'une créature.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Lit pensées"
  },
  {
    "id": "maelstrom",
    "name": "Marteau du chaos",
    "nameEn": "Maelstrom",
    "level": 8,
    "levelDisplay": "Niveau 8",
    "school": "evocation",
    "type": "Attaque",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "36 mètres",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "du fer et un diamant",
      "materialConsumed": false
    },
    "duration": {
      "type": "concentration",
      "value": "concentration, jusqu'à 1 minute"
    },
    "concentration": true,
    "ritual": false,
    "description": "Un tourbillon de 9 mètres de rayon apparaît au point choisi. La zone est un terrain difficile. Les créatures dans la zone doivent réussir un jet de Force ou être tirées 3 mètres vers le centre et subir 6d6 dégâts contondants. Les créatures peuvent nager pour s'échapper avec un jet d'Athlétisme.",
    "descriptionShort": "Tourbillon inflige 6d6 dégâts et attire vers le centre.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "extended",
    "summary": "6d6 tourbillon"
  },
  {
    "id": "power-word-blind",
    "name": "Mot de pouvoir : Cécité",
    "nameEn": "Power Word Blind",
    "level": 8,
    "levelDisplay": "Niveau 8",
    "school": "enchantment",
    "type": "Contrôle",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "18 mètres",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": "du fiel",
      "materialConsumed": false
    },
    "duration": {
      "type": "timed",
      "value": "1 minute"
    },
    "concentration": false,
    "ritual": false,
    "description": "Vous prononcez un mot de pouvoir qui peut aveugler une créature. Si la cible a 50 points de vie ou moins, elle est aveuglée. Sinon, le sort n'a aucun effet. La cible peut refaire un jet de Constitution à la fin de chacun de ses tours pour mettre fin à l'effet.",
    "descriptionShort": "Aveugle une créature de 50 pv ou moins.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Aveugle (≤50 pv)"
  },
  {
    "id": "power-word-stun",
    "name": "Mot de pouvoir : Étourdissement",
    "nameEn": "Power Word Stun",
    "level": 8,
    "levelDisplay": "Niveau 8",
    "school": "enchantment",
    "type": "Contrôle",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "18 mètres",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": "de l'or",
      "materialConsumed": false
    },
    "duration": {
      "type": "instantaneous"
    },
    "concentration": false,
    "ritual": false,
    "description": "Vous prononcez un mot de pouvoir qui peut étourdir une créature. Si la cible a 150 points de vie ou moins, elle est étourdie. Sinon, le sort n'a aucun effet. La cible peut refaire un jet de Constitution à la fin de chacun de ses tours pour mettre fin à l'effet.",
    "descriptionShort": "Étourdit une créature de 150 pv ou moins.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Étourdi (≤150 pv)"
  },
  {
    "id": "power-word-kill",
    "name": "Mot de pouvoir : Mort",
    "nameEn": "Power Word Kill",
    "level": 8,
    "levelDisplay": "Niveau 8",
    "school": "enchantment",
    "type": "Attaque",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "18 mètres",
    "components": {
      "verbal": true,
      "somatic": false,
      "material": "de l'onyx",
      "materialConsumed": false
    },
    "duration": {
      "type": "instantaneous"
    },
    "concentration": false,
    "ritual": false,
    "description": "Vous prononcez un mot de pouvoir qui peut tuer une créature sur le champ. Si la cible a 100 points de vie ou moins, elle meurt. Sinon, elle subit 12d12 dégâts nécrotiques.",
    "descriptionShort": "Tue instantanément une créature de 100 pv ou moins.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Mort (≤100 pv)"
  },
  {
    "id": "true-resurrection",
    "name": "Résurrection suprême",
    "nameEn": "True Resurrection",
    "level": 8,
    "levelDisplay": "Niveau 8",
    "school": "necromancy",
    "type": "Résurrection",
    "isDomainSpell": false,
    "castingTime": "1 heure",
    "range": "contact",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "des diamants cosmiques* (25000 po) - *anciennement: diamants d'une valeur d'au moins 25000 po",
      "materialConsumed": true
    },
    "duration": {
      "type": "instantaneous"
    },
    "concentration": false,
    "ritual": false,
    "description": "Vous touchez une créature décédée depuis moins de 200 ans. Même si le corps a été détruit, le sort recrée un corps entièrement neuf. Si l'âme est libre et consentante, la cible revient à la vie avec tous ses points de vie. Tous les effets de niveau inférieur qui auraient pu être infligés sont dissipés.",
    "descriptionShort": "Ramène à la vie même sans corps, jusqu'à 200 ans.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": "ESSENTIEL",
    "source": "core",
    "summary": "Résurrection (200 ans)"
  }
];
