# Story 1.4: Correction persistance complète des données personnage

Status: done

## Story

As a **joueur de D&D**,  
I want **que toutes les données de mon personnage soient persistées entre les sessions**,  
so that **je puisse continuer mon aventure sans perdre mes sorts préparés, mon équipement, ou mes réglages**.

## Problème identifié

Lors du rafraîchissement de la page :
- Les sorts préparés disparaissent (hors sorts de domaine et mineurs)
- Le niveau du personnage revient à 5 (valeur par défaut)
- Le domaine revient à null
- Les emplacements de sorts sont réinitialisés

## Root Cause

Dans `spellStore.ts`, le `partialize` ne persistait que :
```typescript
partialize: (state) => ({
  preparedSpellIds: state.preparedSpellIds,
  spellSlots: state.spellSlots,
})
```

Or `currentDomainId` et `characterLevel` n'étaient PAS persistés, ce qui causait la perte du contexte nécessaire pour filtrer les sorts.

## Corrections appliquées

### 1. Ajout des champs manquants dans spellStore (AC #1)
```typescript
partialize: (state) => ({
  preparedSpellIds: state.preparedSpellIds,
  spellSlots: state.spellSlots,
  currentDomainId: state.currentDomainId,  // AJOUTÉ
  characterLevel: state.characterLevel,      // AJOUTÉ
}),
```

### 2. Création d'un module de synchronisation inter-stores (AC #2)
Fichier créé : `src/stores/storeSync.ts`
- `syncStoresAfterRestore()` : Synchronise les stores après chargement
- `areStoresSynced()` : Vérifie la cohérence
- `logStoreSyncStatus()` : Debug/logging

### 3. Intégration dans App.tsx (AC #2)
- Appel de `syncStoresAfterRestore()` au chargement initial
- Appel de `logStoreSyncStatus()` pour le debugging
- Import des fonctions de synchronisation

### 4. Amélioration de l'import/export (AC #3)
- Ajout de `syncStoresAfterRestore()` après l'import dans SaveLoadButton
- Garantie que les données importées sont synchronisées avant rechargement

## Vérification des stores

| Store | Persistance | Champs persistés | Statut |
|-------|-------------|------------------|--------|
| characterStore | ✅ Complete | Tout | OK |
| spellStore | ✅ Partialize | preparedSpellIds, spellSlots, currentDomainId, characterLevel | CORRIGÉ |
| inventoryStore | ✅ Partialize | items | OK |
| presetStore | ✅ Partialize | customPreset | OK |
| shoppingListStore | ✅ Partialize | shoppingItems, notifications, globalRestockConfig, multiclassConfig | OK |
| modalStore | ❌ Non persisté | État UI temporaire | OK (volontaire) |

## Tests effectués

- [x] Test 1: Préparer des sorts → refresh → vérifier conservation
- [x] Test 2: Changer niveau → refresh → vérifier persistance  
- [x] Test 3: Exporter → modifier → importer → vérifier restauration
- [x] Compilation TypeScript : 0 erreurs

## Dev Agent Record

### Agent Model Used
Kimi Code CLI

### Completion Notes
- Problème root cause identifié : spellStore.partialize incomplet
- Solution : Ajout currentDomainId et characterLevel au partialize
- Création module storeSync.ts pour synchronisation robuste
- Intégration dans App.tsx et SaveLoadButton
- Tous les stores audités et vérifiés

### File List
- `src/stores/spellStore.ts` (modifié - partialize corrigé)
- `src/stores/storeSync.ts` (nouveau - synchronisation inter-stores)
- `src/stores/index.ts` (modifié - exports ajoutés)
- `src/App.tsx` (modifié - appel sync au chargement)
- `src/components/layout/SaveLoadButton.tsx` (modifié - sync après import)

### Change Log
- 2026-04-10: Correction persistance spellStore (currentDomainId, characterLevel)
- 2026-04-10: Création module storeSync pour synchronisation robuste
- 2026-04-10: Intégration dans App.tsx et SaveLoadButton
