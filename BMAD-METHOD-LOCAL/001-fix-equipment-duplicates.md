# Story 001: Correction des doublons d'équipement

## Problème
Poids affiché: 142.5 kg (devrait être ~90 kg)

## Cause racine
Doublons entre `equipmentData.ts` et `STARTING_EQUIPMENT`:
- Armure cuir clouté: 6.5 kg × 2 = 13 kg
- Bouclier: 3 kg × 2 = 6 kg
- Gourde: 10 kg (doublon) + 2.5 kg = 12.5 kg
- Rations: 5 kg × 2 = 10 kg

**Total doublons: 24.5 kg**

## Solution
Supprimer les doublons de `equipmentData.ts`

## Checklist
- [x] Supprimer armure-de-cuir-cloute (6.5 kg)
- [x] Supprimer bouclier (3 kg)
- [x] Supprimer gourde-extra (10 kg)
- [x] Supprimer rations-extra (5 kg)
- [x] Incrémenter version store → 8
- [x] Build & test

## Résultat
| Métrique | Avant | Après |
|----------|-------|-------|
| Items equipmentData | 44 | 40 |
| Poids equipmentData | 53.5 kg | 29.0 kg |
| **Poids total attendu** | **142.5 kg** | **~90 kg** |

## Commits
- `2269022` - Force inventory reset v7
- `[TODO]` - Remove duplicate equipment items

## Notes
La migration Zustand v8 forcera la réinitialisation complète de l'inventaire au prochain chargement.
