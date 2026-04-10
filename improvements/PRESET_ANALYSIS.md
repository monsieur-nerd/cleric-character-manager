# Analyse des Presets - Clerc de Guerre Niveau 5

## Configuration du personnage
- **Classe**: Clerc de Guerre (War Domain)
- **Niveau**: 5
- **Sagesse**: 16 (+3 modificateur)
- **Sorts préparables**: 5 (niveau) + 3 (SAG) = **8 sorts**
- **Sorts de domaine gratuits** (toujours préparés, ne comptent pas dans les 8):
  - N1: `faveur-divine`, `bouclier-de-la-foi`
  - N2: `arme-magique`, `arme-spirituelle`
  - N3: `aura-du-croisé`, `esprits-gardiens`

---

## Résumé par Preset

### 1. ⭐ Choix Optimal

**Objectif**: Sélection équilibrée et optimisée

| # | Sort | Niveau | Domaine? | Sélectionné? |
|---|------|--------|----------|--------------|
| 1 | retour-a-la-vie | N3 | Non | ✅ |
| 2 | lueur-despoir | N3 | Non | ✅ |
| 3 | dissipation-de-la-magie | N3 | Non | ✅ |
| 4 | aide | N2 | Non | ✅ |
| 5 | prière-de-guérison | N2 | Non | ✅ |
| 6 | arme-spirituelle | N2 | **OUI (war)** | ❌ Filtré |
| 7 | soins | N1 | Non | ✅ |
| 8 | bénédiction | N1 | Non | ✅ |
| 9 | éclair-guidé | N1 | Non | ✅ (8ème) |
| 10 | sanctuaire | N1 | Non | ❌ (9ème) |

**Verdict**: ✅ **CORRECT**
- 8 sorts sélectionnés: Retour à la vie, Lueur d'espoir, Dissipation, Aide, Prière de guérison, Soins, Bénédiction, Éclair guidé
- Arme spirituelle est filtré (sort de domaine)
- Sanctuaire est bien exclu (9ème position)

---

### 2. 🏥 Mode Survie

**Objectif**: Maximum de soins et protection

| # | Sort | Niveau | Domaine? | Sélectionné? |
|---|------|--------|----------|--------------|
| 1 | retour-a-la-vie | N3 | Non | ✅ |
| 2 | lueur-despoir | N3 | Non | ✅ |
| 3 | mot-de-guérison-de-groupe | N3 | Non | ✅ |
| 4 | aide | N2 | Non | ✅ |
| 5 | prière-de-guérison | N2 | Non | ✅ |
| 6 | lien-de-protection | N2 | Non | ✅ |
| 7 | protection-contre-le-poison | N2 | Non | ✅ |
| 8 | soins | N1 | Non | ❌ (8ème) |
| 9 | sanctuaire | N1 | Non | ❌ (9ème) |

**Verdict**: ✅ **CORRECT mais à optimiser**
- 8 sorts sélectionnés, tous niveau 2-3 (très bons)
- Mais `soins` (N1) est exclu alors que `protection-contre-le-poison` (N2) est inclus
- Pour un preset survie, Soins devrait être avant Protection contre le poison

**Recommandation**: Inverser l'ordre de `soins` et `protection-contre-le-poison`

---

### 3. ⚔️ Combat Agressif

**Objectif**: Dégâts, contrôle et buffs offensifs

| # | Sort | Niveau | Domaine? | Sélectionné? |
|---|------|--------|----------|--------------|
| 1 | retour-a-la-vie | N3 | Non | ✅ |
| 2 | lueur-despoir | N3 | Non | ✅ |
| 3 | dissipation-de-la-magie | N3 | Non | ✅ |
| 4 | arme-spirituelle | N2 | **OUI (war)** | ❌ Filtré |
| 5 | aide | N2 | Non | ✅ |
| 6 | prière-de-guérison | N2 | Non | ✅ |
| 7 | cécité-surdité | N2 | Non | ✅ |
| 8 | blessure | N1 | Non | ✅ |
| 9 | injonction | N1 | Non | ❌ (9ème) |
| 10 | bénédiction | N1 | Non | ❌ (10ème) |

**Verdict**: ⚠️ **PROBLÈME IDENTIFIÉ**
- Seulement 8 sorts sélectionnés (au lieu de 8 + sorts de domaine)
- `arme-spirituelle` est filtré (sort de domaine) → perte d'un slot
- `injonction` et `bénédiction` sont exclus
- Pour un preset combat, `bénédiction` devrait être prioritaire sur `blessure`

**Problème majeur**: Le commentaire dit "Buffs offensifs" mais `bénédiction` (avantage attaques) est exclu!

**Recommandation**: 
1. Remonter `bénédiction` avant `blessure`
2. Ajouter plus de sorts N2 pour compenser le filtrage d'arme-spirituelle

---

### 4. 🔥 vs Feu

**Objectif**: Résistance feu + contre-mesures

| # | Sort | Niveau | Domaine? | Sélectionné? |
|---|------|--------|----------|--------------|
| 1 | protection-contre-une-énergie | N3 | Non | ✅ |
| 2 | retour-a-la-vie | N3 | Non | ✅ |
| 3 | lueur-despoir | N3 | Non | ✅ |
| 4 | dissipation-de-la-magie | N3 | Non | ✅ |
| 5 | aide | N2 | Non | ✅ |
| 6 | prière-de-guérison | N2 | Non | ✅ |
| 7 | création-de-nourriture-et-d-eau | N3 | Non | ❌ (7ème, mais N3) |
| 8 | soins | N1 | Non | ✅ |
| 9 | protection-contre-le-poison | N2 | Non | ❌ (9ème) |

**Verdict**: ⚠️ **PROBLÈME**
- `création-de-nourriture-et-d-eau` (N3) occupe un slot précieux
- `protection-contre-le-poison` (N2) est exclu
- L'ordre devrait privilégier les sorts de niveau plus élevé

**Recommandation**: 
- Déplacer `création-de-nourriture-et-d-eau` après `protection-contre-le-poison`
- Ce sort est utile mais moins prioritaire que la protection contre poison

---

### 5. ❄️ vs Froid

| # | Sort | Niveau | Domaine? | Sélectionné? |
|---|------|--------|----------|--------------|
| 1 | protection-contre-une-énergie | N3 | Non | ✅ |
| 2 | retour-a-la-vie | N3 | Non | ✅ |
| 3 | lueur-despoir | N3 | Non | ✅ |
| 4 | dissipation-de-la-magie | N3 | Non | ✅ |
| 5 | aide | N2 | Non | ✅ |
| 6 | prière-de-guérison | N2 | Non | ✅ |
| 7 | résistance | N0 | Non | ❌ (tour de magie, pas compté) |
| 8 | soins | N1 | Non | ✅ |
| 9 | mot-de-guérison-de-groupe | N3 | Non | ❌ (9ème) |
| 10 | lien-de-protection | N2 | Non | ❌ (10ème) |

**Verdict**: ⚠️ **PROBLÈME**
- `mot-de-guérison-de-groupe` (N3) est exclu!
- Pourtant `soins` (N1) est inclus
- Pour du froid de zone, le heal de groupe est plus important

**Recommandation**: Inverser `soins` et `mot-de-guérison-de-groupe`

---

### 6. ⚡ vs Foudre

| # | Sort | Niveau | Domaine? | Sélectionné? |
|---|------|--------|----------|--------------|
| 1 | protection-contre-une-énergie | N3 | Non | ✅ |
| 2 | retour-a-la-vie | N3 | Non | ✅ |
| 3 | lueur-despoir | N3 | Non | ✅ |
| 4 | dissipation-de-la-magie | N3 | Non | ✅ |
| 5 | aide | N2 | Non | ✅ |
| 6 | prière-de-guérison | N2 | Non | ✅ |
| 7 | mot-de-guérison-de-groupe | N3 | Non | ✅ |
| 8 | soins | N1 | Non | ✅ |
| 9 | lien-de-protection | N2 | Non | ❌ (9ème) |
| 10 | sanctuaire | N1 | Non | ❌ (10ème) |

**Verdict**: ✅ **CORRECT**
- Bon équilibre avec 7 sorts N2+ et 1 sort N1
- `mot-de-guérison-de-groupe` est bien inclus (pertinent pour foudre de zone)

---

### 7. 🧪 vs Acide

| # | Sort | Niveau | Domaine? | Sélectionné? |
|---|------|--------|----------|--------------|
| 1 | protection-contre-une-énergie | N3 | Non | ✅ |
| 2 | retour-a-la-vie | N3 | Non | ✅ |
| 3 | lueur-despoir | N3 | Non | ✅ |
| 4 | dissipation-de-la-magie | N3 | Non | ✅ |
| 5 | aide | N2 | Non | ✅ |
| 6 | prière-de-guérison | N2 | Non | ✅ |
| 7 | restauration-partielle | N2 | Non | ✅ |
| 8 | soins | N1 | Non | ✅ |
| 9 | purification-de-nourriture-et-d-eau | N1 | Non | ❌ (9ème) |

**Verdict**: ✅ **CORRECT**
- `restauration-partielle` est bien inclus (pertinent pour acide persistant)
- Bon équilibre des sorts

---

### 8. 🔊 vs Tonnerre

| # | Sort | Niveau | Domaine? | Sélectionné? |
|---|------|--------|----------|--------------|
| 1 | protection-contre-une-énergie | N3 | Non | ✅ |
| 2 | retour-a-la-vie | N3 | Non | ✅ |
| 3 | lueur-despoir | N3 | Non | ✅ |
| 4 | dissipation-de-la-magie | N3 | Non | ✅ |
| 5 | aide | N2 | Non | ✅ |
| 6 | prière-de-guérison | N2 | Non | ✅ |
| 7 | silence | N2 | Non | ✅ |
| 8 | soins | N1 | Non | ✅ |
| 9 | mot-de-guérison-de-groupe | N3 | Non | ❌ (9ème) |

**Verdict**: ⚠️ **PROBLÈME**
- `mot-de-guérison-de-groupe` (N3) est exclu pour `soins` (N1)
- Pour le tonnerre (dégâts de zone), le heal de groupe est crucial

**Recommandation**: Inverser `soins` et `mot-de-guérison-de-groupe`

---

### 9. ☠️ vs Poison

| # | Sort | Niveau | Domaine? | Sélectionné? |
|---|------|--------|----------|--------------|
| 1 | protection-contre-le-poison | N2 | Non | ✅ |
| 2 | protection-contre-une-énergie | N3 | Non | ✅ |
| 3 | retour-a-la-vie | N3 | Non | ✅ |
| 4 | lueur-despoir | N3 | Non | ✅ |
| 5 | délivrance-des-malédictions | N3 | Non | ✅ |
| 6 | aide | N2 | Non | ✅ |
| 7 | prière-de-guérison | N2 | Non | ✅ |
| 8 | restauration-partielle | N2 | Non | ✅ |
| 9 | soins | N1 | Non | ❌ (9ème) |

**Verdict**: ✅ **CORRECT**
- Excellent équilibre
- `restauration-partielle` est bien inclus (guérit empoisonnement)
- `protection-contre-le-poison` est en première position (essentiel)

---

### 10. 🛡️ vs Multi-Éléments

| # | Sort | Niveau | Domaine? | Sélectionné? |
|---|------|--------|----------|--------------|
| 1 | protection-contre-une-énergie | N3 | Non | ✅ |
| 2 | dissipation-de-la-magie | N3 | Non | ✅ |
| 3 | retour-a-la-vie | N3 | Non | ✅ |
| 4 | lueur-despoir | N3 | Non | ✅ |
| 5 | prière-de-guérison | N2 | Non | ✅ |
| 6 | aide | N2 | Non | ✅ |
| 7 | soins | N1 | Non | ✅ |
| 8 | protection-contre-le-poison | N2 | Non | ✅ |
| 9 | résistance | N0 | Non | ❌ (tour de magie) |

**Verdict**: ✅ **CORRECT**
- Bonne diversité
- 7 sorts N2+ inclus

---

### 11. 💀 vs Morts-Vivants

| # | Sort | Niveau | Domaine? | Sélectionné? |
|---|------|--------|----------|--------------|
| 1 | lumière-du-jour | N3 | Non | ✅ |
| 2 | retour-a-la-vie | N3 | Non | ✅ |
| 3 | lueur-despoir | N3 | Non | ✅ |
| 4 | dissipation-de-la-magie | N3 | Non | ✅ |
| 5 | mot-de-guérison-de-groupe | N3 | Non | ✅ |
| 6 | aide | N2 | Non | ✅ |
| 7 | prière-de-guérison | N2 | Non | ✅ |
| 8 | soins | N1 | Non | ✅ |
| 9 | protection-contre-le-mal-et-le-bien | N1 | Non | ❌ (9ème) |

**Verdict**: ⚠️ **PROBLÈME MINEUR**
- `protection-contre-le-mal-et-le-bien` est exclu
- C'est un sort très thématique contre les morts-vivants
- Devrait être avant `soins`

**Recommandation**: Inverser `soins` et `protection-contre-le-mal-et-le-bien`

---

### 12. 🛡️ Support & Buffs

| # | Sort | Niveau | Domaine? | Sélectionné? |
|---|------|--------|----------|--------------|
| 1 | lueur-despoir | N3 | Non | ✅ |
| 2 | aide | N2 | Non | ✅ |
| 3 | amélioration-de-caractéristique | N2 | Non | ✅ |
| 4 | bénédiction | N1 | Non | ✅ |
| 5 | lien-de-protection | N2 | Non | ✅ |
| 6 | protection-contre-le-poison | N2 | Non | ✅ |
| 7 | prière-de-guérison | N2 | Non | ✅ |
| 8 | soins | N1 | Non | ✅ |
| 9 | assistance | N0 | Non | ❌ (tour de magie) |

**Verdict**: ✅ **CORRECT**
- Excellent pour le support
- 6 sorts N2+ sur 8

---

### 13. 🧭 Exploration

| # | Sort | Niveau | Domaine? | Sélectionné? |
|---|------|--------|----------|--------------|
| 1 | communication-à-distance | N3 | Non | ✅ |
| 2 | détection-de-la-magie | N1 | Non | ✅ |
| 3 | augure | N2 | Non | ✅ |
| 4 | marche-sur-l-eau | N3 | Non | ✅ |
| 5 | localisation-d-objet | N2 | Non | ✅ |
| 6 | sens-des-pièges | N2 | Non | ✅ |
| 7 | aide | N2 | Non | ✅ |
| 8 | prière-de-guérison | N2 | Non | ✅ |
| 9 | détection-du-poison-et-des-maladies | N1 | Non | ❌ (9ème) |

**Verdict**: ✅ **CORRECT**
- Très bon preset d'exploration
- `détection-de-la-magie` (N1) est un peu tôt mais acceptable

---

### 14. 📜 Anti-Mage

| # | Sort | Niveau | Domaine? | Sélectionné? |
|---|------|--------|----------|--------------|
| 1 | dissipation-de-la-magie | N3 | Non | ✅ |
| 2 | cercle-magique | N3 | Non | ✅ |
| 3 | silence | N2 | Non | ✅ |
| 4 | délivrance-des-malédictions | N3 | Non | ✅ |
| 5 | zone-de-vérité | N2 | Non | ✅ |
| 6 | retour-a-la-vie | N3 | Non | ✅ |
| 7 | lueur-despoir | N3 | Non | ✅ |
| 8 | prière-de-guérison | N2 | Non | ✅ |
| 9 | protection-contre-une-énergie | N3 | Non | ❌ (9ème) |

**Verdict**: ✅ **CORRECT - Excellente sélection**
- Tous les sorts anti-mage essentiels sont inclus
- `silence` et `dissipation` sont bien positionnés

---

### 15. 🕵️ Enquête Sociale

| # | Sort | Niveau | Domaine? | Sélectionné? |
|---|------|--------|----------|--------------|
| 1 | communication-à-distance | N3 | Non | ✅ |
| 2 | clairvoyance | N3 | Non | ✅ |
| 3 | communication-avec-les-morts | N3 | Non | ✅ |
| 4 | langues | N3 | Non | ✅ |
| 5 | zone-de-vérité | N2 | Non | ✅ |
| 6 | apaisement-des-émotions | N2 | Non | ✅ |
| 7 | amélioration-de-caractéristique | N2 | Non | ✅ |
| 8 | silence | N2 | Non | ✅ |
| 9 | immobilisation-de-personne | N2 | Non | ❌ (9ème) |

**Verdict**: ✅ **CORRECT**
- Très bon preset social
- `zone-de-vérité` est bien positionné

---

## Domain-Specific Presets (War)

### ⚔️ Tacticien de Guerre

| # | Sort | Niveau | Domaine? | Sélectionné? |
|---|------|--------|----------|--------------|
| 1 | faveur-divine | N1 | **OUI** | ❌ Filtré |
| 2 | bouclier-de-la-foi | N1 | **OUI** | ❌ Filtré |
| 3 | arme-magique | N2 | **OUI** | ❌ Filtré |
| 4 | arme-spirituelle | N2 | **OUI** | ❌ Filtré |
| 5 | aura-du-croisé | N3 | **OUI** | ❌ Filtré |
| 6 | bénédiction | N1 | Non | ✅ |
| 7 | aide | N2 | Non | ✅ |
| 8 | éclair-guidé | N1 | Non | ✅ |
| 9 | dissipation-de-la-magie | N3 | Non | ❌ (9ème) |

**Verdict**: 🔴 **PROBLÈME MAJEUR**
- **5 sorts sur 12 sont des sorts de domaine!**
- Seulement 3 sorts sont réellement sélectionnés sur 8 possibles
- `dissipation-de-la-magie` (N3) est exclu!

**Recommandation**: Réorganiser complètement ce preset
```
['dissipation-de-la-magie', 'éclair-guidé', 'cécité-surdité', 'bénédiction', 
 'aide', 'injonction', 'sanctuaire', 'faveur-divine', ...]
```

---

### 🔨 Frappe Divine

| # | Sort | Niveau | Domaine? | Sélectionné? |
|---|------|--------|----------|--------------|
| 1 | arme-spirituelle | N2 | **OUI** | ❌ Filtré |
| 2 | faveur-divine | N1 | **OUI** | ❌ Filtré |
| 3 | aura-du-croisé | N3 | **OUI** | ❌ Filtré |
| 4 | arme-magique | N2 | **OUI** | ❌ Filtré |
| 5 | éclair-guidé | N1 | Non | ✅ |
| 6 | blessure | N1 | Non | ✅ |
| 7 | bénédiction | N1 | Non | ✅ |
| 8 | aide | N2 | Non | ✅ |
| 9 | lien-de-protection | N2 | Non | ❌ (9ème) |

**Verdict**: 🔴 **PROBLÈME MAJEUR**
- **4 sorts sur 10 sont des sorts de domaine!**
- Seulement 4 sorts sont sélectionnés
- Ce preset est censé être pour les dégâts en mêlée mais il manque des sorts offensifs

---

## Résumé des Problèmes

### 🔴 Problèmes critiques

1. **war-tactician**: 5 sorts de domaine, seulement 3 sorts sélectionnés
2. **war-divine-striker**: 4 sorts de domaine, seulement 4 sorts sélectionnés
3. **combat-agressif**: `bénédiction` exclu alors que c'est un buff offensif essentiel

### ⚠️ Problèmes mineurs

1. **survie**: `soins` devrait être avant `protection-contre-le-poison`
2. **vs-froid**: `mot-de-guérison-de-groupe` exclu
3. **vs-tonnerre**: `mot-de-guérison-de-groupe` exclu
4. **vs-undead**: `protection-contre-le-mal-et-le-bien` devrait être avant `soins`

### ✅ Presets optimaux

- **Choix Optimal**, **vs-foudre**, **vs-acide**, **vs-poison**, **vs-multi-elements**
- **Support & Buffs**, **Exploration**, **Anti-Mage**, **Enquête Sociale**

---

## Recommandations Globales

### Pour les presets de domaine War:
- Retirer TOUS les sorts de domaine de la liste (faveur-divine, bouclier-de-la-foi, arme-magique, arme-spirituelle, aura-du-croisé)
- Ces sorts sont déjà automatiquement préparés

### Pour les presets avec dégâts de zone (froid, tonnerre, foudre):
- Prioriser `mot-de-guérison-de-groupe` sur `soins`

### Pour les presets combat:
- Toujours inclure `bénédiction` dans les 8 premiers sorts
