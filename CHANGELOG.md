# Changelog

Tous les changements notables de ce projet seront documentés ici.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère à [Semantic Versioning](https://semver.org/lang/fr/).

## [Unreleased]

### Added
- Configuration ESLint complète avec règles React Hooks et TypeScript
- Middleware de synchronisation inter-stores
- Fonctions utilitaires de calcul déplacées dans `src/utils/character/calculations.ts`
- Tests unitaires pour les calculs de personnage (34 tests)
- Composant `SkillsPanel` extrait du Dashboard
- Lazy loading des pages avec React.lazy et Suspense
- CI/CD GitHub Actions pour lint, tests et déploiement
- Documentation de l'architecture dans le README

### Changed
- **Séparation Types/Constants** : Les constantes `DEITIES`, `CLERIC_DOMAINS`, `BACKGROUNDS` déplacées vers `src/constants/`
- **Optimisation du bundle** : Code splitting par route, bundle principal réduit de 72% (1,976 KB → 555 KB)
- Réduction de la complexité cyclomatique dans `characterStore`

### Fixed
- Warnings ESLint dans `App.tsx` (composants définis pendant le render)
- Risque de boucles infinies dans la vérification de migration

## [1.0.0] - 2024-XX-XX

### Added
- Gestion complète des sorts (61 sorts)
- Préréglages intelligents (Combat, Feu, Morts-vivants, Exploration, Survie)
- Mode Combat optimisé
- Inventaire avec 45 équipements
- Gestion du personnage (niveau, caractéristiques, PV)
- Synchronisation des stores
- Persistance des données avec localStorage
