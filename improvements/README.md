# 📋 Améliorations de développement futur

Ce dossier contient les stories d'amélioration identifiées lors des code reviews et sessions de refactoring.

## 🎯 Contexte

Ces améliorations ont été identifiées lors de la **code review de Dashboard.tsx** (simplification de l'UI et nettoyage du mode condensé).

## 📚 Stories disponibles

| # | Story | Priorité | Complexité | Description |
|---|-------|----------|------------|-------------|
| 1.1 | [Persistance de l'état](./stories/01-persist-sections-state.md) | Medium | Low | Sauvegarder l'état repliable des sections dans localStorage |
| 1.2 | [Composant CollapsibleSection](./stories/02-collapsible-section-component.md) | High | Medium | Créer un composant réutilisable pour les sections repliables |
| 1.3 | [Documentation README](./stories/03-update-readme-dashboard.md) | Low | Low | Mettre à jour la documentation utilisateur |

## 🏗️ Architecture des améliorations

```
improvements/
├── README.md                           # Ce fichier
└── stories/
    ├── 01-persist-sections-state.md    # Story : Persistance localStorage
    ├── 02-collapsible-section-component.md  # Story : Composant réutilisable
    └── 03-update-readme-dashboard.md   # Story : Documentation
```

## 🚀 Comment implémenter

### Méthode 1 : Dev Story individuelle
```bash
# Pour chaque story, utiliser le workflow bmad-dev-story adapté
# Lire la story et implémenter selon les acceptance criteria
```

### Méthode 2 : Batch (recommandé pour les stories liées)
Les stories 1.1 et 1.2 sont liées. Il est recommandé de :
1. D'abord implémenter la story 1.2 (composant) avec support persistKey
2. Puis refactorer Dashboard avec le nouveau composant
3. Enfin, la story 1.3 peut être faite indépendamment

## ✅ Critères de succès global

- [ ] L'état des sections est persistant entre les sessions
- [ ] Le composant CollapsibleSection est utilisé partout (DRY)
- [ ] Le README aide les nouveaux utilisateurs
- [ ] TypeScript : 0 erreurs
- [ ] Pas de régression visuelle

## 📝 Notes de la code review source

**Date** : 2026-04-10  
**Fichier reviewé** : `src/pages/Dashboard.tsx`  
**Changement** : Simplification UI, suppression du mode condensé/déployé

### Résumé des changements
- Suppression de ~100 lignes de code
- Simplification de l'UX (plus de mode condensé)
- Sections repliées par défaut
- Nettoyage des états dupliqués

### Recommandations formulées
1. **Persistance** : Les préférences utilisateur méritent d'être sauvegardées
2. **Composant réutilisable** : Le pattern "section repliable" peut être généralisé
3. **Documentation** : Les changements UX doivent être reflétés dans la doc

---

*Généré via la méthodologie BMAD - Build More Architect Dreams*
