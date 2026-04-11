# Story 002: Système "Au Camp"

## Objectif
Créer un onglet "Au camp" permettant de gérer les objets laissés au camp avec impact sur le poids total.

## Implémentation

### 1. Types (`src/types/index.ts`)
- Ajout de `isAtCamp?: boolean` à `EquipmentItem`

### 2. Store (`src/stores/inventoryStore.ts`)
- `toggleAtCamp(itemId)` : bascule un item entre inventaire et camp
- `takeAllFromCamp()` : reprend tous les objets du camp
- `getCampItems()` : sélecteur des objets au camp
- Modification de `getCarriedWeight()` pour exclure `isAtCamp`
- Version du store : 10

### 3. Composant (`src/components/inventory/CampItemsTab.tsx`)
- Liste des objets au camp par catégorie
- Bouton "Reprendre" (vert) sur chaque item
- Bouton "Reprendre tout" dans l'en-tête
- Design avec icône Tent et couleurs harmonieuses

### 4. InventoryPage (`src/pages/InventoryPage.tsx`)
- Nouvel onglet "Au camp" avec icône Tent
- Items au camp grisés (`opacity-60`)
- Badge "Au camp" avec icône MapPin
- Bouton "Laisser" (rouge) / "Reprendre" (vert) sur chaque carte

## Design System

| Élément | Couleur |
|---------|---------|
| Bouton "Laisser" | `text-blood-red border-blood-red/30` |
| Bouton "Reprendre" | `text-forest border-forest/30` |
| Badge "Au camp" | `bg-parchment-dark/50 text-ink-muted` |
| Item grisé | `opacity-60 bg-parchment-dark/20` |

## Résultat
- 4 onglets : Inventaire, Armement, Au camp, A acheter
- Gestion intuitive des objets au camp
- Impact immédiat sur le poids total porté
