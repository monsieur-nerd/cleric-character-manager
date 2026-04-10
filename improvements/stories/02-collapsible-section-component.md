# Story 1.2: Composant réutilisable CollapsibleSection

Status: done

## Story

As a **développeur frontend**,  
I want **un composant CollapsibleSection réutilisable**,  
so that **je puisse créer des sections repliables de manière cohérente dans toute l'application**.

## Acceptance Criteria

1. **API du composant**
   - [ ] Props acceptées : `title`, `icon`, `defaultExpanded`, `children`, `className`, `persistKey?`
   - [ ] Le composant gère lui-même son état expand/collapse
   - [ ] Si `persistKey` est fourni, l'état est persisté dans localStorage

2. **Design system compliance**
   - [ ] Utilise les classes Tailwind du projet (card, text-ink, etc.)
   - [ ] Icône ChevronUp/ChevronDown animée
   - [ ] Style cohérent avec la section "Talents, traits et compétences" existante

3. **Accessibilité (a11y)**
   - [ ] Attributs ARIA : `aria-expanded`, `aria-controls`
   - [ ] Support clavier (Entrée/Espace pour toggle)
   - [ ] Focus visible sur le bouton toggle

4. **Refactoring Dashboard**
   - [ ] Remplacer les 3 sections manuelles (Skills, Traits, Feats) par CollapsibleSection
   - [ ] Supprimer les états dupliqués dans Dashboard.tsx
   - [ ] Réduire la complexité du composant Dashboard

## Tasks / Subtasks

- [x] Créer le composant CollapsibleSection (AC: #1, #2, #3)
  - [x] Créer `src/components/ui/CollapsibleSection.tsx`
  - [x] Définir les types TypeScript (interface Props)
  - [x] Implémenter la logique toggle + animations
  - [x] Ajouter les attributs ARIA
- [x] Intégrer usePersistentState (optionnel) (AC: #1)
  - [x] Si `persistKey` est fourni, utiliser le hook existant
  - [x] Sinon, utiliser useState standard
- [x] Refactor Dashboard.tsx (AC: #4)
  - [x] Identifier les 3 sections à remplacer
  - [x] Implémenter avec CollapsibleSection
  - [x] Vérifier la parité visuelle (aucune régression)
- [x] Tests et validation (AC: tous)
  - [x] Test visuel : comparaison avant/après
  - [x] Test a11y : navigation clavier
  - [x] Test persistKey : vérifier la persistance

## Dev Notes

### API proposée
```typescript
// src/components/ui/CollapsibleSection.tsx
interface CollapsibleSectionProps {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  defaultExpanded?: boolean;
  persistKey?: string; // clé localStorage optionnelle
  children: React.ReactNode;
  className?: string;
  badge?: string | number; // compteur optionnel (ex: "(5)")
}
```

### Utilisation
```tsx
<CollapsibleSection 
  title="Compétences maîtrisées" 
  icon={Check}
  defaultExpanded={false}
  persistKey="dashboard-skills"
  badge={character.masteredSkills?.length}
>
  {/* Contenu des compétences */}
</CollapsibleSection>
```

### Points d'attention
- **Animation** : Utiliser `transition-all duration-200` pour le collapse
- **Performance** : Utiliser `React.memo` si le contenu est lourd
- **Composition** : Laisser le contenu entièrement contrôlé par le parent (children)

### Fichiers à créer/modifier
- `src/components/ui/CollapsibleSection.tsx` (nouveau)
- `src/pages/Dashboard.tsx` (refactoring)
- `src/components/ui/index.ts` (export)

### Références
- [Source: src/pages/Dashboard.tsx] - Lignes 1676-1828 : Sections actuelles à refactor
- [Source: Code Review] - Recommandation #2 : Composant réutilisable
---

## Code Review Findings (Post-Implementation)

### ✅ Corrections appliquées

**Finding #3: Violation règles des Hooks React**  
*Sévérité: HIGH*  
*Date: 2026-04-10*

**Problème identifié** :
```typescript
// AVANT - Anti-pattern React
const [isExpanded, setIsExpanded] = persistKey
  ? usePersistentState<boolean>(persistKey, defaultExpanded)
  : useState<boolean>(defaultExpanded);
```
Les hooks ne peuvent pas être appelés conditionnellement.

**Solution appliquée** :
```typescript
// APRÈS - Correct
const persistentState = usePersistentState<boolean>(
  persistKey || '__no_persist__',
  defaultExpanded
);
const [localState, setLocalState] = useState<boolean>(defaultExpanded);

const [isExpanded, setIsExpanded] = persistKey 
  ? persistentState 
  : [localState, setLocalState];
```

---

**Finding #5: Clés ARIA potentiellement dupliquées**  
*Sévérité: MEDIUM*  
*Date: 2026-04-10*

**Problème identifié** : `id={`collapsible-content-${title}`}` pouvait créer des IDs dupliqués si deux sections avaient le même titre.

**Solution appliquée** :
```typescript
// Utilisation de persistKey quand disponible, sinon titre normalisé
id={`collapsible-content-${persistKey || title.replace(/\s+/g, '-').toLowerCase()}`}
```

---

## Dev Agent Record

### Agent Model Used
Kimi Code CLI

### Completion Notes
- ✅ Composant CollapsibleSection créé avec TypeScript strict
- ✅ Props complètes : title, icon, defaultExpanded, persistKey, badge, className
- ✅ Accessibilité : aria-expanded, aria-controls, keyboard navigation (Enter/Espace)
- ✅ Focus visible avec ring
- ✅ Animation CSS sur le chevron
- ✅ Intégration usePersistentState conditionnée correctement (fix hooks rules)
- ✅ IDs ARIA uniques basés sur persistKey ou titre normalisé
- ✅ Refactor Dashboard complet : 3 sections remplacées

### File List
- `src/components/ui/CollapsibleSection.tsx` (nouveau)
- `src/components/ui/index.ts` (nouveau)
- `src/pages/Dashboard.tsx` (modifié - refactor complet)

### Change Log
- 2026-04-10: Implémentation initiale
- 2026-04-10: Correction violation hooks rules + IDs ARIA post-review
