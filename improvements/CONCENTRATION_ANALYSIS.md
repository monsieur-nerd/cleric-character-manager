# Analyse des Sorts avec Concentration

## Contexte
- **Constitution**: 10 (+0 aux jets de sauvegarde)
- **Problème**: Très risqué de maintenir la concentration (JS de CON à +0)
- **Objectif**: Minimiser les sorts avec concentration dans les presets

---

## Sorts avec Concentration par Niveau

### Niveau 1 (N1)

| Sort | Concentration | Durée | Priorité avec CON 10 |
|------|---------------|-------|---------------------|
| Bénédiction | ✅ Oui | 1 min | 🟡 Élevée - mais risquée |
| Bouclier de la foi | ✅ Oui | 10 min | 🟢 Acceptable - sort de domaine gratuit |
| Détection de la magie | ✅ Oui | 10 min | 🟢 Rituel, pas de slot |
| Détection du mal et du bien | ✅ Oui | 10 min | 🟡 Situationnel |
| Détection du poison et des maladies | ✅ Oui | 10 min | 🟢 Rituel, pas de slot |
| Faveur divine | ✅ Oui | 1 min | 🔴 Sort de domaine, concentration sur soi |
| Fléau | ✅ Oui | 1 min | 🟡 Malus ennemi, acceptable |
| Protection contre le mal et le bien | ✅ Oui | 10 min | 🟡 Situationnel |

### Niveau 2 (N2)

| Sort | Concentration | Durée | Priorité avec CON 10 |
|------|---------------|-------|---------------------|
| Amélioration de caractéristique | ✅ Oui | 1 heure | 🟡 Buff pré-combat, acceptable |
| Apaisement des émotions | ✅ Oui | 1 min | 🟢 Social, hors combat |
| Arme magique | ✅ Oui | 1 heure | 🔴 Sort de domaine, MAIS concentration! |
| Cécité/Surdité | ❌ Non | 1 min | 🟢 EXCELLENT - pas de concentration |
| Immobilisation de personne | ✅ Oui | 1 min | 🟡 Contrôle puissant, risqué |
| Lien de protection | ❌ Non | 1 heure | 🟢 EXCELLENT - pas de concentration |
| Prière de guérison | ❌ Non | Instantané | 🟢 EXCELLENT - heal instantané |
| Silence | ✅ Oui | 10 min | 🟡 Zone d'antimagie, très situationnel |
| Zone de vérité | ✅ Oui | 10 min | 🟢 Social, hors combat |

### Niveau 3 (N3)

| Sort | Concentration | Durée | Priorité avec CON 10 |
|------|---------------|-------|---------------------|
| Clairvoyance | ✅ Oui | 10 min | 🟢 Exploration, hors combat |
| Communication avec les morts | ✅ Oui | 10 min | 🟢 Rituel, pas de slot |
| Dissipation de la magie | ❌ Non | Instantané | 🟢 EXCELLENT - instantané |
| Lueur d'espoir | ✅ Oui | 1 min | 🟡 Heal + buff CA, risqué mais puissant |
| Protection contre une énergie | ✅ Oui | 1 heure | 🟡 Résistance, pré-combat possible |
| Respiration aquatique | ✅ Oui | 24 heures | 🟢 Hors combat |

### Tours de Magie (N0)

| Sort | Concentration | Durée | Priorité |
|------|---------------|-------|----------|
| Assistance | ✅ Oui | 1 min | 🟢 Tour de magie, pas de slot |
| Lumière | ❌ Non | 1 heure | 🟢 Pas de concentration |
| Résistance | ✅ Oui | 1 min | 🟢 Tour de magie, pas de slot |

---

## Sorts RECOMMANDÉS (sans concentration ou acceptable)

### 🟢 Excellents (sans concentration)

| Sort | Niveau | Pourquoi |
|------|--------|----------|
| **Prière de guérison** | N2 | Heal instantané, zone, pas de concentration |
| **Soins** | N1 | Heal instantané, contact |
| **Mot de guérison** | N1 | Heal action bonus, instantané |
| **Dissipation de la magie** | N3 | Contre-sort instantané |
| **Cécité/Surdité** | N2 | Handicap sans concentration |
| **Lien de protection** | N2 | Protection allié, 1 heure sans concentration |
| **Aide** | N2 | Buff PV max, 8 heures sans concentration |
| **Retour à la vie** | N3 | Résurrection, instantané |
| **Bénédiction** | N1 | Avantage attaques - ⚠️ avec concentration mais essentiel |

### 🟡 Acceptables (concentration mais faible risque)

| Sort | Niveau | Stratégie |
|------|--------|-----------|
| **Lueur d'espoir** | N3 | Lancer en début de combat, rester en arrière |
| **Protection contre une énergie** | N3 | Lancer avant combat (préparation) |
| **Amélioration de caractéristique** | N2 | Lancer avant combat (préparation) |
| **Zone de vérité** | N2 | Hors combat |
| **Clairvoyance** | N3 | Hors combat |

### 🔴 À ÉVITER (concentration + risque élevé)

| Sort | Niveau | Problème |
|------|--------|----------|
| **Immobilisation de personne** | N2 | Contrôle crucial, perte = mort |
| **Silence** | N2 | Zone mobile, exposition au danger |
| **Apaisement des émotions** | N2 | Situatonnel social |
| **Arme magique** | N2 | Sort de domaine, concentration! |
| **Faveur divine** | N1 | Sort de domaine, concentration! |

---

## Presets Recommandés avec CON 10

### 🥇 Choix Optimal (révisé pour CON 10)

```typescript
spellIds: [
  // N3 - Priorité maximale
  'retour-a-la-vie',                    // Instantané
  'dissipation-de-la-magie',            // Instantané
  'lueur-despoir',                      // Concentration mais loin du combat
  // N2 - Priorité haute (pas de concentration)
  'prière-de-guérison',                 // Heal instantané
  'aide',                               // 8 heures, pas conc
  'lien-de-protection',                 // Pas conc
  // N1 - Priorité moyenne
  'soins',                              // Heal instantané
  'bénédiction',                        // Concentration mais essentiel
  'éclair-guidé',                       // Dégâts instantanés
  'sanctuaire',                         // 1 min, pas conc
],
```

### 🥈 Mode Survie (révisé pour CON 10)

```typescript
spellIds: [
  'retour-a-la-vie',                    // N3, instantané
  'dissipation-de-la-magie',            // N3, instantané
  'lueur-despoir',                      // N3, concentration acceptable
  'prière-de-guérison',                 // N2, instantané
  'aide',                               // N2, pas conc
  'lien-de-protection',                 // N2, pas conc
  'soins',                              // N1, instantané
  'mot-de-guérison',                    // N1, instantané (action bonus)
  'protection-contre-le-poison',        // N2, pas conc
  'restauration-partielle',             // N2, instantané
],
```

### 🥉 Combat Agressif (révisé pour CON 10)

```typescript
spellIds: [
  'dissipation-de-la-magie',            // N3, instantané
  'retour-a-la-vie',                    // N3, instantané
  'lueur-despoir',                      // N3, concentration acceptable
  'prière-de-guérison',                 // N2, instantané
  'cécité-surdité',                     // N2, pas conc!
  'aide',                               // N2, pas conc
  'bénédiction',                        // N1, concentration mais essentiel
  'éclair-guidé',                       // N1, instantané
  'blessure',                           // N1, instantané
  'injonction',                         // N1, instantané (1 round)
],
```

---

## Stratégie de Jeu avec CON 10

### 1. Positionnement
- **Restez TOUJOURS en arrière** quand vous avez une concentration active
- Utilisez le bouclier et la couverture
- Ne soyez pas la cible principale

### 2. Choix de Concentration
- **1 seul sort de concentration à la fois**
- Privilégiez les sorts avec durée longue (1 heure+) lancés avant combat
- Évitez les sorts de concentration de niveau 2 en combat

### 3. Sorts de Domaine Problématiques
Les sorts de domaine War avec concentration:
- `faveur-divine` (N1) - concentration 1 min
- `arme-magique` (N2) - concentration 1 heure
- `bouclier-de-la-foi` (N1) - concentration 10 min

**Conseil**: Ces sorts sont gratuits mais risqués avec CON 10. Lancez-les juste avant le combat.

### 4. Relances de Concentration
Si vous prenez des dégâts:
- JS de Constitution DD 10 ou la moitié des dégâts (le plus élevé)
- Avec CON 10: 55% de réussite sur DD 10
- Préparez des sorts sans concentration en backup

---

## Résumé des Modifications Recommandées

### Remplacements dans les presets:

| Sort (avec conc) | Remplacé par | Raison |
|------------------|--------------|--------|
| Immobilisation de personne | Cécité/Surdité | Pas de concentration |
| Silence | Injonction | Instantané |
| Amélioration de caractéristique | Aide | 8 heures, pas conc |

### Ordre de priorité modifié:

1. **Sorts instantanés** (Soins, Prière de guérison, Dissipation)
2. **Sorts longue durée** (Aide, Lien de protection)
3. **Sorts avec concentration** lancés loin du combat (Lueur d'espoir)
4. **Sorts avec concentration** essentiels (Bénédiction)
5. **Éviter** les sorts de concentration en mêlée
