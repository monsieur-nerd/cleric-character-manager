# Analyse des Talents, Traits et Capacités de Prêtre

## Document d'analyse BMAD - Cleric Character Manager

---

## 1. TALENTS GÉNÉRAUX (Feats)

### Implémentés ✅
| Talent | ID | Effet | Impact calcul | Implémentation |
|--------|-----|-------|---------------|----------------|
| Style de Combat : Défense | `style-combat` | +1 CA si armure | CA | ✅ `useEquipment.ts` |
| Style de Combat : 2 armes | `deux-armes` | Mod carac aux dégâts 2ème arme | Dégâts off-hand | ✅ `CombatStatsCard.tsx` |
| Lanceur de Guerre | `war-caster` | Avantage concentration, somatiques avec arme/bouclier | JS concentration | ⚠️ À implémenter |
| Maître des Boucliers | `shield-master` | Bonus JS DEX, pousser, annuler dégâts zone | JS DEX, réaction | ⚠️ À implémenter |
| Sentinelle | `sentinel` | Attaque opp réduit vitesse à 0, attaque si cible attaque autre | Attaques d'opportunité | ⚠️ À notifier |
| Chanceux | `lucky` | 3 points de chance par repos long | Relance de dés | ⚠️ À implémenter |

### Non implémentés ❌
| Talent | ID | Effet | Priorité |
|--------|-----|-------|----------|
| Alerte | `alert` | +5 initiative, pas de surprise | Haute |
| Athlète | `athlete` | +1 FOR/DEX, mouvement amélioré | Moyenne |
| Soigneur | `healer` | Trousse de soins optimisée | Moyenne |
| Chef Inspirant | `inspiring-leader` | PV temporaires pour alliés | Moyenne |
| Initié à la Magie | `magic-initiate` | Sorts d'autre classe | Basse |
| Observateur | `observant` | +5 perception passive | Moyenne |
| Résistant | `resilient` | Maîtrise JS d'une caractéristique | Haute |
| Lanceur de Rituels | `ritual-caster` | Livre de rituels | Basse |
| Mobile | `mobile` | Vitesse +3m, pas d'attaque opp | Moyenne |
| Robuste | `tough` | +2 PV/niveau | Haute |
| Tireur d'Élite | `sharpshooter` | -5/+10 dégâts à distance | Haute |
| Maître des Armes Lourdes | `great-weapon-master` | -5/+10 armes lourdes | Haute |
| Adepte Élémentaire | `elemental-adept` | Ignore résistance élémentaire | Moyenne |
| Tireur de Sorts | `spell-sniper` | Portée doublée sorts | Moyenne |
| Toujours en Armure | `heavily-armored` | Maîtrise armures lourdes | Moyenne |
| Maître des Armures Lourdes | `heavy-armor-master` | -3 dégâts armure lourde | Haute |
| Esprit Vif | `keen-mind` | Mémoire parfaite | Basse |

---

## 2. CAPACITÉS DE CLASSE (Core Class Features)

### Renonciation (Turn Undead) ✅
- **Niveau** : 2
- **Effet** : Les morts-vivants fuient pendant 1 minute (JS Sagesse)
- **Amélioration niveau 5** : Destruction des morts-vivants faibles
- **Implémentation** : ✅ Notification dans CombatPage

### Conduit Divin (Channel Divinity) ⚠️
- **Utilisations** : Repos court (niveau 2), repos long (niveau 6+)
- **Capacités générales** :
  - Renonciation (Turn Undead)
- **Capacités de domaine** (voir section 3)
- **Implémentation** : ✅ UI présente, effets mécaniques à lier

### Intervention Divine (Divine Intervention) ⚠️
- **Niveau** : 10
- **Effet** : Demande d'aide directe au dieu (succès sur jet < niveau)
- **Implémentation** : ❌ Non implémenté

### Amélioration de caractéristiques (ASI) ⚠️
- **Niveaux** : 4, 8, 12, 16, 19
- **Effet** : +2 à une caractéristique ou +1 à deux
- **Implémentation** : ❌ Non implémenté (gestion manuelle)

---

## 3. CAPACITÉS DE DOMAINE (Domain Features)

### Domaine de la Guerre (War Domain) ⚔️

| Niveau | Capacité | Effet | Implémentation |
|--------|----------|-------|----------------|
| 1 | **Clerc de guerre** (War Priest) | Attaque bonus (3 utilisations) | ✅ UI présente, calcul attaque à vérifier |
| 2 | **Frappe guidée** (Guided Strike) | +10 à un jet d'attaque (réaction) | ✅ Mentionné, effet à appliquer |
| 6 | **Bénédiction du dieu de la guerre** (War God's Blessing) | Relancer dégâts/attaque pour allié | ❌ Non implémenté |
| 8 | **Frappe divine** (Divine Strike) | +1d8 dégâts radiants | ⚠️ À ajouter aux calculs de dégâts |
| 17 | **Avatar de bataille** (Avatar of Battle) | Résistance contondant/perforant/tranchant | ⚠️ À notifier dans les résistances |

### Domaine de la Vie (Life Domain) ❤️

| Niveau | Capacité | Effet | Implémentation |
|--------|----------|-------|----------------|
| 1 | **Disciple de la vie** (Disciple of Life) | +2 + niveau du sort aux soins | ⚠️ **À implémenter dans les calculs de soins** |
| 2 | **Préservation de la vie** (Preserve Life) | Soigne 5×niveau PV répartis | ❌ Non implémenté |
| 6 | **Bénie par la vie** (Blessed Healer) | Soigne 3 + niveau du sort quand vous soignez | ⚠️ **À implémenter** |
| 8 | **Frappe divine** (Divine Strike) | +1d8 dégâts radiants | ⚠️ À ajouter |
| 17 | **Suprême guérison** (Supreme Healing) | Dés de soin maximisés | ⚠️ À notifier |

### Domaine de la Lumière (Light Domain) ☀️

| Niveau | Capacité | Effet | Implémentation |
|--------|----------|-------|----------------|
| 1 | **Flamboiement** (Warding Flare) | Réaction : désavantage sur attaque contre vous | ❌ Non implémenté |
| 2 | **Flamboiement radiance** (Radiance of the Dawn) | Dégâts radiants 2d10 + niveau | ❌ Non implémenté |
| 6 | **Flamboiement amélioré** (Improved Flare) | Flamboiement pour alliés | ❌ Non implémenté |
| 8 | **Potentiel de divin** (Potent Spellcasting) | +mod Sagesse aux dégâts de sort | ⚠️ **À implémenter** |
| 17 | **Couronne de lumière** (Corona of Light) | Lumière vive + désavantage attaques | ❌ Non implémenté |

### Domaine de la Nature (Nature Domain) 🌿

| Niveau | Capacité | Effet | Implémentation |
|--------|----------|-------|----------------|
| 1 | **Acolyte de la nature** | Maîtrise compétence nature | ⚠️ À notifier |
| 2 | **Charme animal/plante** | Charme créatures dans 9m | ❌ Non implémenté |
| 6 | **Atténuation des éléments** | Réaction : résistance dégâts élémentaires | ❌ Non implémenté |
| 8 | **Frappe divine** | +1d8 dégâts froid/feu/foudre | ⚠️ À ajouter |
| 17 | **Maître de la nature** | Commande animaux/plantes charmés | ❌ Non implémenté |

### Domaine de la Tempête (Tempest Domain) ⛈️

| Niveau | Capacité | Effet | Implémentation |
|--------|----------|-------|----------------|
| 1 | **Frappe de la tempête** (Wrath of the Storm) | Réaction : 2d8 foudre/tonnerre | ❌ Non implémenté |
| 2 | **Destructive Wrath** | Dés de dégâts maximaux | ❌ Non implémenté |
| 6 | **Frappe tonitruante** (Thunderbolt Strike) | Pousse cible de 3m avec foudre | ❌ Non implémenté |
| 8 | **Frappe divine** | +1d8 dégâts tonnerre | ⚠️ À ajouter |
| 17 | **Vol** (Stormborn) | Vol 12m | ⚠️ À notifier |

### Domaine de la Tromperie (Trickery Domain) 🎭

| Niveau | Capacité | Effet | Implémentation |
|--------|----------|-------|----------------|
| 1 | **Bénédiction du filou** | Avantage Discrétion pour allié | ❌ Non implémenté |
| 2 | **Invocation du double** | Crée illusion de vous | ❌ Non implémenté |
| 6 | **Déplacement insaisissable** | Invisible en lumière faible | ❌ Non implémenté |
| 8 | **Frappe divine** | +1d8 dégâts poison | ⚠️ À ajouter |
| 17 | **Duplicité améliorée** | Jusqu'à 4 doubles | ❌ Non implémenté |

### Domaine de la Connaissance (Knowledge Domain) 📚

| Niveau | Capacité | Effet | Implémentation |
|--------|----------|-------|----------------|
| 1 | **Béni du savoir** | 2 langues + maîtrise compétences | ⚠️ À notifier |
| 2 | **Connaissance des âges** | Maîtrise compétence 10 min | ❌ Non implémenté |
| 6 | **Lire les pensées** | Lecture des pensées | ❌ Non implémenté |
| 8 | **Potentiel de divin** | +mod Sagesse aux dégâts de sort | ⚠️ À implémenter |
| 17 | **Vision de l'invisible** | Vision du passé objet | ❌ Non implémenté |

### Domaine de la Forge (Forge Domain) 🔨

| Niveau | Capacité | Effet | Implémentation |
|--------|----------|-------|----------------|
| 1 | **Bénédiction du forgeron** | +1 armure ou arme | ⚠️ À ajouter aux calculs CA/dégâts |
| 2 | **Artisan de la Flamme** | Crée objet métallique | ❌ Non implémenté |
| 6 | **Âme de la forge** | Résistance feu | ⚠️ À notifier |
| 8 | **Frappe divine** | +1d8 dégâts feu | ⚠️ À ajouter |
| 17 | **Maître forgeron** | Immunité feu | ⚠️ À notifier |

### Domaine du Tombeau (Grave Domain) ⚰️

| Niveau | Capacité | Effet | Implémentation |
|--------|----------|-------|----------------|
| 1 | **Sentinelle du cercueil** | Soins max à 0 PV | ⚠️ À implémenter dans les soins |
| 2 | **Sentinelle des âmes** | Prochaine attaque = vulnérabilité | ❌ Non implémenté |
| 6 | **Sentinelles aux portes** | Avantage JS mort, max dégâts instantanée | ⚠️ À notifier |
| 8 | **Potentiel de divin** | +mod Sagesse aux dégâts de sort | ⚠️ À implémenter |
| 17 | **Garde-tombe** | Récupère PV quand créature meurt | ⚠️ À notifier |

---

## 4. MATRICE D'IMPLEMENTATION PAR CALCUL

### Calculs de CA (Armor Class)
```
CA de base = Armure + Mod DEX (selon armure) + Bouclier + Bonus divers

Bonus à intégrer :
✅ Style de Combat : Défense (+1 si armure)
⚠️ Bénédiction du forgeron (+1 armure, niveau 1 Forge)
```

**Fichiers concernés** : `useEquipment.ts`, `CombatStatsCard.tsx`

---

### Calculs de Dégâts (Weapon Damage)
```
Dégâts = Dé arme + Mod caractéristique (FOR/DEX) + Bonus divers

Bonus à intégrer :
✅ Combat à deux armes (mod carac à l'off-hand)
⚠️ Frappe divine (+1d8 selon domaine niveau 8)
⚠️ Bénédiction du forgeron (+1 arme)
⚠️ Maître des Armes Lourdes (-5/+10 optionnel)
⚠️ Tireur d'Élite (-5/+10 optionnel)
```

**Fichiers concernés** : `CombatStatsCard.tsx`, `CombatEquipmentTab.tsx`

---

### Calculs de Soins (Healing)
```
Soins = Dés du sort + Mod Sagesse + Bonus divers

Bonus à intégrer (PRIORITAIRE) :
⚠️ Disciple de la vie (+2 + niveau du sort) - Domaine Vie niveau 1
⚠️ Bénie par la vie (soigne 3 + niveau du sort quand vous soignez) - Domaine Vie niveau 6
⚠️ Sentinelle du cercueil (soins max si cible à 0 PV) - Domaine Tombeau niveau 1
```

**Fichiers concernés** : `spellComponentMappings.ts`, système de lancement de sorts

---

### Calculs de Dégâts de Sort (Spell Damage)
```
Dégâts de sort = Dés du sort + Bonus divers

Bonus à intégrer :
⚠️ Potentiel de divin (+mod Sagesse) - Domaine Lumière/Connaissance/Tombeau niveau 8
⚠️ Adepte Élémentaire (1 compte comme 2 sur dés)
```

---

### Jets de Sauvegarde (Saving Throws)
```
JS = 1d20 + Mod caractéristique + Maîtrise (si applicable) + Bonus

Bonus à intégrer :
⚠️ Résistant (maîtrise d'une caractéristique)
⚠️ Maître des Boucliers (+bouclier aux JS DEX contre zones)
⚠️ Lanceur de Guerre (avantage JS CON pour concentration)
```

---

### Points de Vie (Hit Points)
```
PV max = Dés de vie + Mod CON + Bonus divers

Bonus à intégrer :
⚠️ Robuste (+2 PV/niveau)
```

---

## 5. PLAN D'IMPLEMENTATION RECOMMANDÉ (BMAD)

### Phase 1 : Quick Wins (Haute valeur, faible effort)
1. **Disciple de la vie** (+2 + niveau aux soins) - Domaine Vie très courant
2. **Frappe divine** (+1d8 dégâts) - Niveau 8 tous les domaines de combat
3. **Robuste** (+2 PV/niveau)

### Phase 2 : Capacités de réaction
1. **Frappe guidée** (+10 attaque) - Application du bonus
2. **Flamboiement** (désavantage attaque) - Système de réactions
3. **Frappe de la tempête** (2d8 foudre) - Dégâts de réaction

### Phase 3 : Système de talents complet
1. Interface de sélection des talents
2. Application automatique des bonus
3. Système de "prérequis" (caractéristiques, maîtrises)

### Phase 4 : Capacités complexes
1. Invocation du double (illusions)
2. Charme animal/plante
3. Intervention divine

---

## 6. ARCHITECTURE RECOMMANDÉE

### Service de calcul des bonus (`bonusCalculator.ts`)
```typescript
export function calculateHealingBonus(
  character: Character,
  spellLevel: number
): number {
  let bonus = character.wisdomModifier;
  
  // Disciple de la vie (Domaine Vie niveau 1)
  if (hasDomainAbility(character, 'life', 1)) {
    bonus += 2 + spellLevel;
  }
  
  return bonus;
}

export function calculateWeaponDamageBonus(
  character: Character,
  weapon: EquipmentItem,
  isOffHand: boolean
): number {
  let bonus = getAbilityModifier(character, weapon);
  
  // Combat à deux armes
  if (isOffHand && hasFeat(character, 'deux-armes')) {
    bonus += getAbilityModifier(character, weapon);
  }
  
  // Frappe divine
  if (hasDomainAbility(character, 'war', 8)) {
    bonus += rollDie(8); // 1d8 radiants
  }
  
  return bonus;
}
```

### Store des capacités (`abilitiesStore.ts`)
- Suivi des utilisations par repos
- Gestion des cooldowns
- Notifications de disponibilité

---

## 7. VÉRIFICATION À L'EXÉCUTION

Créer un composant `ActiveBonusesPanel` qui affiche :
- Tous les bonus actuellement appliqués
- Leur source (talent, capacité de domaine, etc.)
- Les conditions d'activation

Cela permettra au joueur de vérifier que tous ses bonus sont bien pris en compte.

---

*Document généré selon la méthodologie BMAD - Version 1.0*
