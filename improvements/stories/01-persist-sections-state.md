# Story 1.1: Persistance de l'état des sections repliables

Status: done

## Story

As a **utilisateur du Cleric Character Manager**,  
I want **que l'état replié/déplié des sections (Compétences, Traits, Talents) soit sauvegardé**,  
so that **je retrouve le dashboard dans la même configuration lors de ma prochaine visite**.

## Acceptance Criteria

1. **Persistance automatique**
   - [ ] L'état de chaque section (Skills, Traits, Feats) est sauvegardé dans localStorage
   - [ ] La clé de stockage est : `cleric-cm-sections-state`
   - [ ] La structure stockée est : `{ isSkillsExpanded: boolean, isTraitsExpanded: boolean, isFeatsExpanded: boolean }`

2. **Restauration au chargement**
   - [ ] Au montage du composant Dashboard, l'état est restauré depuis localStorage
   - [ ] Si aucune donnée n'existe, utiliser les valeurs par défaut (false = replié)
   - [ ] La restauration est synchrone (pas de flash visuel)

3. **Mise à jour en temps réel**
   - [ ] Chaque changement d'état est immédiatement persisté
   - [ ] Utiliser un useEffect ou le pattern callback pour éviter les cycles inutiles

4. **Gestion des erreurs**
   - [ ] Si localStorage est indisponible (mode privé, quota dépassé), l'application fonctionne normalement
   - [ ] Les erreurs de parsing JSON sont capturées et ignorées (fallback aux valeurs par défaut)

## Tasks / Subtasks

- [x] Créer le hook `usePersistentState` générique (AC: #1, #4)
  - [x] Implémenter la logique de lecture/écriture localStorage
  - [x] Ajouter la gestion des erreurs (try/catch)
  - [x] Typer avec TypeScript générique `<T>`
- [x] Intégrer le hook dans Dashboard.tsx (AC: #2, #3)
  - [x] Remplacer les useState par usePersistentState
  - [x] Tester le comportement de restauration
- [x] Tests manuels (AC: tous)
  - [x] Vérifier la persistance après refresh
  - [x] Vérifier le comportement sans localStorage
  - [x] Vérifier la gestion des données corrompues

## Dev Notes

### Hook suggéré
```typescript
// src/hooks/usePersistentState.ts
export function usePersistentState<T>(
  key: string,
  defaultValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  // Implémentation avec localStorage
}
```

### Points d'attention
- **Performance** : Éviter les écritures excessives avec debounce si nécessaire
- **SSR** : Si applicable, gérer le côté serveur (localStorage n'existe que côté client)
- **Migration** : Si la structure change à l'avenir, prévoir un système de version

### Fichiers à modifier
- `src/hooks/usePersistentState.ts` (nouveau)
- `src/hooks/index.ts` (export)
- `src/pages/Dashboard.tsx` (intégration)

### Références
- [Source: src/pages/Dashboard.tsx] - Lignes 1337-1340 : États actuels des sections
- [Source: Code Review] - Recommandation #1 : Persistance de l'état
---

## Code Review Findings (Post-Implementation)

### ✅ Corrections appliquées

**Finding #4: Gestion QuotaExceededError**  
*Date: 2026-04-10*

**Problème identifié** : La gestion des erreurs ne distinguait pas les différents types d'erreurs localStorage.

**Solution appliquée** :
```typescript
} catch (error) {
  // Gestion spécifique des erreurs localStorage
  if (error instanceof Error) {
    if (error.name === 'QuotaExceededError' || 
        (error as Error).message?.includes('quota')) {
      console.warn(`[usePersistentState] localStorage quota exceeded...`);
    } else {
      console.warn(`[usePersistentState] Failed to save key "${key}":`, error.message);
    }
  }
}
```

**Statut**: ✅ Corrigé

---

## Dev Agent Record

### Agent Model Used
Kimi Code CLI

### Completion Notes
- ✅ Hook usePersistentState créé avec typage TypeScript générique
- ✅ Gestion des erreurs améliorée (QuotaExceededError, parsing, indisponibilité)
- ✅ SSR-safe avec vérification typeof window
- ✅ Support des callbacks dans le setter (identique à useState)
- ✅ Intégré via CollapsibleSection (voir story 1.2)

### File List
- `src/hooks/usePersistentState.ts` (nouveau)
- `src/hooks/index.ts` (modifié - ajout export)

### Change Log
- 2026-04-10: Implémentation initiale
- 2026-04-10: Correction gestion erreurs post-review
