# 🌴 Feature: Choix Optimal dans le Chult

## Résumé
Cette feature ajoute un nouveau préréglage intelligent "Choix optimal dans le Chult" adapté aux parties se déroulant dans le Chult où la résurrection est impossible.

## Fonctionnalités implémentées

### 1. Nouveau Préréglage (`kimi-optimal-chult`)
- **Basé sur** : Le préréglage "Choix Optimal" existant
- **Modification** : Le sort `Retour à la vie` est remplacé par `Esprits gardiens`
  - `Esprits gardiens` est un sort de niveau 3 qui crée une zone de dégâts et de contrôle, très utile dans la jungle du Chult
- **Icône** : 🌴 (palmier)
- **Couleur** : Vert jungle (`jungle-green`)

### 2. Case à cocher "Dans le Chult"
- **Emplacement** : Sur la carte du préréglage "Choix optimal dans le Chult"
- **Fonctionnement** : 
  - Lorsque cochée, active le mode Chult
  - Le mode est persistant (sauvegardé dans localStorage)
  - Affiche une info-bulle expliquant que les sorts de résurrection sont impossibles dans cette région

### 3. Filtrage des composants de résurrection
- **Composants filtrés** dans l'onglet "À acheter" quand le mode Chult est actif :
  - Diamants pour `Retour à la vie` (300 po)
  - Diamants pour `Rappel à la vie` (500 po)
  - Diamants pour `Rappel des morts` (1000 po)
  - Diamants pour `Résurrection` (1000 po)
  - Diamants pour `Résurrection suprême` (25000 po)
  - Diamants pour `Restauration suprême` (25000 po)

- **Indicateur visuel** : 
  - Badge "🌴 Chult" dans l'en-tête de la liste de courses
  - Texte "Mode Chult actif" dans le sous-titre
  - Couleur verte jungle pour l'en-tête

## Fichiers modifiés/créés

### Nouveaux fichiers
- `src/stores/chultStore.ts` : Store Zustand pour gérer l'état "Dans le Chult"

### Fichiers modifiés
1. `src/data/presets.ts` : Ajout du préréglage `kimi-optimal-chult`
2. `src/stores/storageKeys.ts` : Ajout de la clé `CHULT_MODE`
3. `src/stores/index.ts` : Export du `chultStore`
4. `src/pages/PreparationPage.tsx` : 
   - Ajout de l'icône et couleur pour le preset Chult
   - Composant `ChultPresetDetails` avec case à cocher
5. `src/components/inventory/ShoppingList.tsx` :
   - Filtrage des composants de résurrection
   - Indicateur visuel du mode Chult
6. `tailwind.config.js` : Ajout des couleurs `jungle-green`

## Utilisation

### Pour l'utilisateur
1. Aller sur la page "Préparation des sorts"
2. Déployer le préréglage "🌴 Choix Optimal dans le Chult"
3. Cocher la case "Dans le Chult" pour activer le mode
4. Les composants de résurrection disparaissent automatiquement de la liste de courses

### Pour les développeurs
```typescript
// Vérifier si on est en mode Chult
const isInChult = useChultStore((state) => state.isInChult);

// Activer/désactiver le mode Chult
const setInChult = useChultStore((state) => state.setInChult);
setInChult(true);

// Vérifier si un sort est de résurrection
import { isResurrectionSpell } from '@/stores';
isResurrectionSpell('retour-a-la-vie'); // true

// Vérifier si un composant est lié à la résurrection
import { isResurrectionComponent } from '@/stores';
isResurrectionComponent('diamants-300po'); // true
```

## Tests
- ✅ Build TypeScript sans erreur
- ✅ Tous les tests existants passent (51 tests)
- ✅ Pas de régression sur les fonctionnalités existantes

## Notes de conception
- Le sort `Esprits gardiens` a été choisi comme remplacement car :
  - C'est un sort de contrôle de zone très efficace dans les environnements confinés (jungle)
  - Il inflige des dégâts radiants (thématique clerc)
  - Il ne nécessite pas de composant coûteux
  - C'est un excellent sort de "contrôle de foule" quand on ne peut pas compter sur la résurrection
