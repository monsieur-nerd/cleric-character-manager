# 🛡️ Cleric Character Manager - Audit & Backlog BMAD

> **Date:** 2026-04-11  
> **Auditeur:** Expert Développeur Full-Stack / Tech Lead Senior  
> **Méthodologie:** BMAD (Build More Architect Dreams)

---

## 📊 PHASE 1: AUDIT & DIAGNOSTIC

### 1.1 Vue d'ensemble du projet

| Caractéristique | Valeur |
|-----------------|--------|
| **Stack** | React 18 + TypeScript + Vite + Tailwind CSS v4 |
| **State Management** | Zustand avec persistence |
| **Tests** | Vitest (51 tests passants) |
| **Linting** | ESLint (⚠️ NON CONFIGURÉ) |
| **UI Library** | Lucide React |
| **Routing** | React Router v6 |

### 1.2 Architecture actuelle

```
src/
├── components/          # 30+ composants (certains >500 lignes)
├── stores/             # 6 stores Zustand (fortement couplés)
├── pages/              # 5 pages (Dashboard.tsx >1000 lignes)
├── types/              # Types et constantes mélangés
├── data/               # Données statiques (sorts, équipements)
├── hooks/              # 8 hooks personnalisés
├── utils/              # Utilitaires avec tests
└── assets/             # Images et ressources
```

### 1.3 🔴 Problèmes Critiques Identifiés

| Sévérité | Problème | Fichier(s) | Impact |
|----------|----------|------------|--------|
| 🔴 **CRITIQUE** | ESLint non configuré | `eslint.config.js` | Pas de qualité de code garantie |
| 🔴 **CRITIQUE** | Composants trop grands | `Dashboard.tsx` (1000+ lignes) | Maintenabilité, testing difficile |
| 🟠 **HAUT** | Couplage fort entre stores | `characterStore.ts`, `spellStore.ts` | Risque de bugs de synchronisation |
| 🟠 **HAUT** | Types dans constants | `types/index.ts` (1000+ lignes) | Séparation des concerns |
| 🟡 **MOYEN** | Pas de lazy loading | `App.tsx` | Bundle size, performance initiale |
| 🟡 **MOYEN** | Pas de Error Boundary | - | Risque de crash total |
| 🟡 **MOYEN** | useEffect mal optimisés | `App.tsx`, `Dashboard.tsx` | Re-rendus inutiles |
| 🟢 **FAIBLE** | Imports absolus inconsistants | Tous les fichiers | Lisibilité |

### 1.4 📈 Dette Technique

```
Dette Technique Estimée: 12 points (sur échelle de 20)
├── Code duplication: 15%
├── Complexité cyclomatique moyenne: 8.5
├── Couverture de tests: 12% (uniquement utils)
└── Documentation: 25%
```

---

## 📝 PHASE 2: BACKLOG & SPRINTS

### Epic 1: Fondations Solides (Sprint 1)

#### Story 1.1: Configuration ESLint & Prettier
**Points:** 3 | **Priorité:** 🔴 Critique
```
En tant que développeur
Je veux que ESLint soit correctement configuré
Afin de garantir la qualité du code et éviter les erreurs

Critères d'acceptation:
- [ ] ESLint fonctionne avec `npm run lint`
- [ ] Configuration TypeScript + React + Hooks
- [ ] Règles de sécurité activées
- [ ] Prettier intégré
- [ ] Zero erreur sur le code existant
```

#### Story 1.2: Séparation Types/Constants
**Points:** 2 | **Priorité:** 🔴 Critique
```
En tant que développeur
Je veux séparer les types des constantes
Afin d'améliorer la maintenabilité

Critères d'acceptation:
- [ ] Créer `src/constants/` pour les données
- [ ] Migrer DEITIES, CLERIC_DOMAINS, BACKGROUNDS
- [ ] Garder uniquement les types dans `src/types/`
- [ ] Mettre à jour tous les imports
```

#### Story 1.3: Tests des Stores
**Points:** 5 | **Priorité:** 🟠 Haute
```
En tant que développeur
Je veux des tests unitaires pour les stores
Afin de garantir la stabilité de l'application

Critères d'acceptation:
- [ ] Tests pour characterStore (actions principales)
- [ ] Tests pour spellStore (préparation, emplacements)
- [ ] Tests pour inventoryStore
- [ ] Mock de localStorage pour les tests
- [ ] Couverture > 80% sur les stores
```

### Epic 2: Architecture Propre (Sprint 2)

#### Story 2.1: Refactoring CharacterStore
**Points:** 5 | **Priorité:** 🟠 Haute
```
En tant que développeur
Je veux un store personnage propre et testable
Afin de faciliter la maintenance

Critères d'acceptation:
- [ ] Séparer les calculs purs dans des fonctions utils
- [ ] Extraire les types du store
- [ ] Documenter chaque action
- [ ] Réduire la complexité cyclomatique (<10)
```

#### Story 2.2: Synchronisation Stores
**Points:** 3 | **Priorité:** 🟠 Haute
```
En tant qu'utilisateur
Je veux que les stores restent synchronisés
Afin d'éviter les incohérences de données

Critères d'acceptation:
- [ ] Créer un middleware de sync
- [ ] Utiliser les subscribers Zustand
- [ ] Supprimer les appels directs entre stores
- [ ] Tests de synchronisation
```

### Epic 3: Composants Modulaires (Sprint 3)

#### Story 3.1: Décomposition Dashboard
**Points:** 8 | **Priorité:** 🔴 Critique
```
En tant que développeur
Je veux un Dashboard décomposé en composants
Afin d'améliorer la maintenabilité et les tests

Critères d'acceptation:
- [ ] Extraire SkillsTab (composant séparé)
- [ ] Extraire CharacterSheetMobileNav
- [ ] Extraire SkillDetail et SkillCard
- [ ] Extraire SkillFilter
- [ ] Dashboard.tsx < 200 lignes
- [ ] Props typées pour chaque composant
```

#### Story 3.2: Composants UI Réutilisables
**Points:** 3 | **Priorité:** 🟡 Moyenne
```
En tant que développeur
Je veux une bibliothèque de composants UI
Afin d'unifier l'interface

Critères d'acceptation:
- [ ] Composant Button (primary, secondary, danger)
- [ ] Composant Card
- [ ] Composant Modal
- [ ] Composant Input
- [ ] Storybook ou documentation
```

### Epic 4: Performance & UX (Sprint 4)

#### Story 4.1: Lazy Loading
**Points:** 3 | **Priorité:** 🟡 Moyenne
```
En tant qu'utilisateur
Je veux un chargement rapide de l'application
Afin d'avoir une meilleure expérience

Critères d'acceptation:
- [ ] React.lazy pour les pages
- [ ] Suspense avec fallback
- [ ] Code splitting par route
- [ ] Réduction du bundle initial de 30%
```

#### Story 4.2: Error Boundary
**Points:** 2 | **Priorité:** 🟡 Moyenne
```
En tant qu'utilisateur
Je veux une page d'erreur gracieuse
Afin de ne pas perdre mes données en cas de crash

Critères d'acceptation:
- [ ] Error Boundary global
- [ ] Fallback UI designé
- [ ] Bouton de récupération
- [ ] Log des erreurs
```

#### Story 4.3: Memoization
**Points:** 3 | **Priorité:** 🟡 Moyenne
```
En tant qu'utilisateur
Je veux une interface fluide
Afin d'avoir une meilleure expérience

Critères d'acceptation:
- [ ] React.memo sur les composants lourds
- [ ] useMemo pour les calculs coûteux
- [ ] useCallback pour les handlers
- [ ] React DevTools Profiler validé
```

### Epic 5: Documentation & Finalisation (Sprint 5)

#### Story 5.1: Documentation Technique
**Points:** 2 | **Priorité:** 🟢 Faible
```
En tant que développeur
Je veux une documentation complète
Afin de faciliter la maintenance

Critères d'acceptation:
- [ ] README à jour
- [ ] Documentation des stores
- [ ] Documentation des composants principaux
- [ ] Guide de contribution
```

#### Story 5.2: CI/CD GitHub Actions
**Points:** 3 | **Priorité:** 🟡 Moyenne
```
En tant que développeur
Je veux une CI/CD automatisée
Afin de garantir la qualité avant déploiement

Critères d'acceptation:
- [ ] Workflow GitHub Actions
- [ ] Lint + Tests + Build
- [ ] Déploiement auto sur GitHub Pages
- [ ] Badges dans README
```

---

## 🚀 PLANNING DES SPRINTS

### Sprint 1: Fondations (Semaine 1)
**Objectif:** Rendre le projet viable pour le développement
- Story 1.1: ESLint (3 pts)
- Story 1.2: Types/Constants (2 pts)
- Story 1.3: Tests Stores (5 pts)
**Total: 10 points**

### Sprint 2: Architecture (Semaine 2)
**Objectif:** Nettoyer l'architecture des stores
- Story 2.1: Refactoring CharacterStore (5 pts)
- Story 2.2: Synchronisation Stores (3 pts)
**Total: 8 points**

### Sprint 3: Composants (Semaine 3)
**Objectif:** Modulariser les composants
- Story 3.1: Décomposition Dashboard (8 pts)
- Story 3.2: Composants UI (3 pts)
**Total: 11 points**

### Sprint 4: Performance (Semaine 4)
**Objectif:** Optimiser les performances
- Story 4.1: Lazy Loading (3 pts)
- Story 4.2: Error Boundary (2 pts)
- Story 4.3: Memoization (3 pts)
**Total: 8 points**

### Sprint 5: Finalisation (Semaine 5)
**Objectif:** Documentation et CI/CD
- Story 5.1: Documentation (2 pts)
- Story 5.2: CI/CD (3 pts)
**Total: 5 points**

**VELOCITÉ TOTALE: 42 points sur 5 semaines**

---

## 📋 DÉFINITION OF DONE

Pour chaque Story:
- [ ] Code écrit selon les standards ESLint
- [ ] Tests unitaires passants
- [ ] Pas de régression (tests existants)
- [ ] Code review (auto-review avec checklist)
- [ ] Documentation mise à jour si nécessaire

---

## 🎯 MÉTRIQUES DE SUCCÈS

| Métrique | Actuel | Cible |
|----------|--------|-------|
| Couverture tests | 12% | > 70% |
| Complexité moyenne | 8.5 | < 5 |
| Bundle size | ~500KB | < 350KB |
| Lighthouse Performance | ? | > 90 |
| ESLint errors | N/A | 0 |

---

*Document généré selon la méthodologie BMAD - Phase Analyse & Planification*
