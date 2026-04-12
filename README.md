# 🛡️ Cleric Character Manager

Assistant de gestion de sorts pour clerc de **Torm** (D&D 5e) - Domaine de la Guerre

🔗 **Démo en ligne** : [https://USERNAME.github.io/cleric-character-manager/](https://USERNAME.github.io/cleric-character-manager/)

![Version](https://img.shields.io/badge/version-1.0.0-gold)
![D&D](https://img.shields.io/badge/D&D-5e-red)
![React](https://img.shields.io/badge/React-18-blue)
![CI/CD](https://github.com/USERNAME/cleric-character-manager/workflows/CI/CD/badge.svg)
[![Tests](https://img.shields.io/badge/tests-85%20passing-brightgreen)]()

## ✨ Fonctionnalités

### 🔮 Gestion des sorts
- **61 sorts** complets (tours de magie + niveaux 1-3)
- Préparation quotidienne avec calcul automatique (**Sagesse + Niveau**)
- 5 sorts de domaine toujours préparés (Clerc de la Guerre)
- Suivi des emplacements de sorts utilisés

### ⚡ Préréglages intelligents
- **Combat Standard** ⚔️
- **vs Ennemis de Feu** 🔥
- **vs Morts-Vivants** 💀
- **Exploration** 🏔️
- **Survie/Défense** 🛡️

### ⚔️ Mode Combat
- Interface ultra-rapide pour les sessions
- Tracking des capacités (Clerc de guerre, Conduit divin)
- Gestion de la concentration

### 🎒 Inventaire
- 45 équipements avec gestion des quantités
- Vérification automatique des composantes
- Alertes si composantes manquantes

### 🧠 Score de Sagesse modifiable
- Adapte automatiquement le nombre de sorts préparables
- Mise à jour en temps réel

## 📱 Interface

### Dashboard Principal
Le dashboard présente une vue d'ensemble de votre personnage :

- **En-tête** : Avatar, nom, niveau, divinité (Torm ⚔️) et points de vie
- **Ressources** : Emplacements de sorts disponibles/utilisés
- **Talents, traits et compétences** : Sections repliables avec persistance
  - Cliquez sur chaque section pour déplier/replier
  - L'état est sauvegardé automatiquement entre les sessions
  - Les compteurs indiquent le nombre d'éléments dans chaque catégorie
- **Actions rapides** : Accès direct à l'édition des compétences et talents

### Navigation
L'application comporte 4 onglets principaux :
1. **🏠 Dashboard** : Vue d'ensemble du personnage
2. **📖 Préparation** : Choix des sorts du jour avec filtres
3. **⚔️ Combat** : Interface optimisée pour les sessions (sans distractions)
4. **🎒 Inventaire** : Gestion de l'équipement et objets

## 🚀 Guide rapide

1. **Ouvrez** l'application
2. **Modifiez** votre score de Sagesse en cliquant dessus
3. **Préparez vos sorts** dans l'onglet "Préparer les sorts"
4. **Consultez** vos compétences sur le Dashboard (sections dépliables)
5. **Utilisez le Mode Combat** pendant vos sessions de jeu

### 💡 Astuces
- Les sections du Dashboard se replient/déplient pour garder l'interface épurée
- Vos préférences d'affichage sont sauvegardées automatiquement
- Le Mode Combat affiche uniquement les informations essentielles

## 📱 Développement local

```bash
# Installation
npm install --legacy-peer-deps

# Développement
npm run dev

# Tests
npm test

# Lint
npm run lint

# Build de production
npm run build
```

## 🏗️ Architecture

### Stack technique
- **Frontend**: React 18 + TypeScript + Vite
- **State Management**: Zustand avec persistance
- **Styling**: Tailwind CSS v4
- **Tests**: Vitest
- **Linting**: ESLint + TypeScript

### Structure du projet
```
src/
├── components/          # Composants React
│   ├── dashboard/      # Composants spécifiques au Dashboard
│   ├── spells/         # Composants de sorts
│   └── ui/             # Composants UI réutilisables
├── stores/             # Stores Zustand
│   └── middleware/     # Middleware de synchronisation
├── utils/              # Fonctions utilitaires
│   └── character/      # Calculs de personnage
├── constants/          # Constantes et données statiques
└── types/              # Types TypeScript
```

### Qualité du code
- ✅ **ESLint** configuré avec règles React Hooks et TypeScript
- ✅ **85 tests** unitaires passants
- ✅ **Lazy loading** pour le code splitting
- ✅ **Architecture modulaire** avec séparation des concerns

## 📊 Données

Les sorts sont parsés depuis les fichiers Excel de D&D 5e :
- 7 tours de magie
- 16 sorts niveau 1
- 18 sorts niveau 2
- 20 sorts niveau 3

## 🎨 Design

Thème médiéval "parchemin divin" avec :
- Or divin (#D4AF37) - couleur principale
- Parchemin (#F5E6C8) - fond
- Typographie Cinzel Decorative

---

*Que Torm guide tes sorts !* ⭐⚔️
