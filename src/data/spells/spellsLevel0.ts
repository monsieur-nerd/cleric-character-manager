/**
 * Sorts de prêtre - Niveau 0 (Tours de magie)
 * Complément pour les sorts définis dans spellComponentMappings.ts
 */
import type { Spell } from "@/types";

export const clericLevel0Spells: Spell[] = [
  {
    "id": "mending",
    "name": "Réparation",
    "nameEn": "Mending",
    "level": 0,
    "levelDisplay": "Mineur",
    "school": "transmutation",
    "type": "Utilitaire",
    "isDomainSpell": false,
    "castingTime": "1 minute",
    "range": "contact",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "deux aimants",
      "materialConsumed": false
    },
    "duration": {
      "type": "instantaneous"
    },
    "concentration": false,
    "ritual": false,
    "description": "Ce sort répare un objet fragile (cassé, déchiré, etc.) touché. Il peut réparer un trou d'un maximum d'1 pied carré. Le sort laisse aucune trace de l'ancienne cassure.",
    "descriptionShort": "Répare un objet fragile cassé ou déchiré.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "Répare objet"
  },
  {
    "id": "resistance",
    "name": "Résistance",
    "nameEn": "Resistance",
    "level": 0,
    "levelDisplay": "Mineur",
    "school": "abjuration",
    "type": "Protection",
    "isDomainSpell": false,
    "castingTime": "1 action",
    "range": "contact",
    "components": {
      "verbal": true,
      "somatic": true,
      "material": "une cape miniature",
      "materialConsumed": false
    },
    "duration": {
      "type": "concentration",
      "value": "concentration, jusqu'à 1 minute"
    },
    "concentration": true,
    "ritual": false,
    "description": "Vous touchez une créature consentante. Une fois avant la fin du sort, la cible peut lancer un d4 et ajouter le nombre obtenu à un jet de sauvegarde de son choix. Elle peut lancer le dé avant ou après avoir effectué le jet de sauvegarde. Le sort prend alors fin.",
    "descriptionShort": "La cible ajoute 1d4 à un jet de sauvegarde.",
    "higherLevels": null,
    "incantation": null,
    "recommendation": null,
    "source": "core",
    "summary": "+1d4 sauvegarde"
  }
];
