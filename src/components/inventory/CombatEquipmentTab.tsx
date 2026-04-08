import { useState } from 'react';
import { Sword, Shield, Target, Zap, ChevronDown, ChevronUp, Swords, Info } from 'lucide-react';
import { useInventoryStore } from '@/stores';
import { useCharacterStore } from '@/stores';
import { getFeatById } from '@/types/feats';
import type { EquipmentItem } from '@/types';

interface CombatItem extends EquipmentItem {
  combatType: 'weapon' | 'armor' | 'shield';
}

export function CombatEquipmentTab() {
  const items = useInventoryStore((state) => state.items);
  const character = useCharacterStore((state) => state.character);
  const updateQuantity = useInventoryStore((state) => state.updateQuantity);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  
  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };
  
  // Récupère les talents de combat du personnage
  const combatFeats = character.feats
    ?.map(featId => getFeatById(featId))
    .filter(feat => feat?.isCombatFeat) || [];
  
  const hasShieldMaster = combatFeats.some(f => f?.id === 'shield-master');
  const hasWarCaster = combatFeats.some(f => f?.id === 'war-caster');
  const hasHeavyArmorMaster = combatFeats.some(f => f?.id === 'heavy-armor-master');
  
  // Calcul des modificateurs
  const strMod = Math.floor((character.strength - 10) / 2);
  const dexMod = Math.floor((character.dexterity - 10) / 2);
  const profBonus = Math.floor((character.level - 1) / 4) + 2;
  
  // Filtre les items de combat
  const combatItems: CombatItem[] = items
    .filter(item => item.quantity > 0)
    .map(item => {
      if (item.type === 'Arme') return { ...item, combatType: 'weapon' as const };
      if (item.type === 'Armure') return { ...item, combatType: 'armor' as const };
      if (item.type === 'Bouclier') return { ...item, combatType: 'shield' as const };
      return null;
    })
    .filter((item): item is CombatItem => item !== null);
  
  // Regroupe par catégorie
  const weapons = combatItems.filter(i => i.combatType === 'weapon');
  const armors = combatItems.filter(i => i.combatType === 'armor');
  const shields = combatItems.filter(i => i.combatType === 'shield');
  
  // Calcule la CA totale
  const calculateAC = () => {
    let baseAC = 10;
    let dexBonus = dexMod;
    let shieldBonus = 0;
    let maxDexBonus = Infinity;
    let hasArmor = false;
    
    // Trouve l'armure équipée (ou la première armure possédée)
    const equippedArmor = armors.find(a => a.isEquipped) || armors[0];
    if (equippedArmor?.armorClass) {
      baseAC = equippedArmor.armorClass;
      hasArmor = true;
      
      // Limite le bonus de DEX selon le type d'armure
      if (equippedArmor.armorType === 'lourde') {
        maxDexBonus = 0;
      } else if (equippedArmor.armorType === 'intermédiaire') {
        maxDexBonus = 2;
      }
    }
    
    // Bonus de bouclier
    const equippedShield = shields.find(s => s.isEquipped) || shields[0];
    if (equippedShield?.armorClass) {
      shieldBonus = 2; // Bouclier standard donne +2
    }
    
    // Applique la limite de DEX
    const effectiveDexBonus = Math.min(dexBonus, maxDexBonus);
    
    return {
      total: baseAC + effectiveDexBonus + shieldBonus,
      base: baseAC,
      dexBonus: effectiveDexBonus,
      shieldBonus,
      hasArmor,
      equippedArmor: equippedArmor?.name,
      equippedShield: equippedShield?.name,
    };
  };
  
  const ac = calculateAC();
  
  // Calcule le bonus d'attaque pour une arme
  const getAttackBonus = (weapon: CombatItem) => {
    const isFinesse = weapon.weaponProperties?.includes('Finesse');
    const isRanged = weapon.weaponProperties?.includes('Ammunition') || weapon.weaponProperties?.includes('Lancer');
    
    let abilityMod = strMod;
    if (isFinesse && dexMod > strMod) {
      abilityMod = dexMod;
    } else if (isRanged) {
      abilityMod = dexMod;
    }
    
    return {
      toHit: abilityMod + profBonus,
      damageMod: abilityMod,
      ability: isFinesse && dexMod > strMod ? 'DEX' : isRanged ? 'DEX' : 'FOR',
    };
  };
  
  return (
    <div className="space-y-4 animate-fade-in">
      {/* Résumé du personnage en combat */}
      <div className="card bg-blood-red/5 border-blood-red/20">
        <h3 className="font-display text-lg text-ink mb-3 flex items-center gap-2">
          <Target className="w-5 h-5 text-blood-red" />
          Statistiques de combat
        </h3>
        
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-parchment-light rounded-lg p-3 text-center">
            <div className="text-xs text-ink-muted">Classe d'armure</div>
            <div className="font-display text-3xl text-ink">{ac.total}</div>
            <div className="text-xs text-ink-light mt-1">
              {ac.base} base {ac.dexBonus > 0 && `+ ${ac.dexBonus} DEX`} {ac.shieldBonus > 0 && `+ ${ac.shieldBonus} bouclier`}
            </div>
          </div>
          <div className="bg-parchment-light rounded-lg p-3 text-center">
            <div className="text-xs text-ink-muted">Bonus de maîtrise</div>
            <div className="font-display text-3xl text-ink">+{profBonus}</div>
            <div className="text-xs text-ink-light mt-1">Niveau {character.level}</div>
          </div>
        </div>
        
        {/* Modificateurs */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex justify-between bg-parchment/50 rounded px-2 py-1">
            <span className="text-ink-muted">Force (FOR)</span>
            <span className="font-bold text-ink">{strMod >= 0 ? `+${strMod}` : strMod}</span>
          </div>
          <div className="flex justify-between bg-parchment/50 rounded px-2 py-1">
            <span className="text-ink-muted">Dextérité (DEX)</span>
            <span className="font-bold text-ink">{dexMod >= 0 ? `+${dexMod}` : dexMod}</span>
          </div>
        </div>
        
        {/* Équipement actif */}
        {(ac.equippedArmor || ac.equippedShield) && (
          <div className="mt-3 pt-3 border-t border-parchment-dark text-xs text-ink-light">
            <span className="text-ink-muted">Équipement actif:</span>{' '}
            {ac.equippedArmor && <span className="font-medium">{ac.equippedArmor}</span>}
            {ac.equippedArmor && ac.equippedShield && ' + '}
            {ac.equippedShield && <span className="font-medium">{ac.equippedShield}</span>}
          </div>
        )}
      </div>
      
      {/* Talents de combat actifs */}
      {combatFeats.length > 0 && (
        <div className="card bg-divine-gold/5 border-divine-gold/20">
          <h3 className="font-display text-sm text-ink mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-divine-gold" />
            Talents de combat actifs
          </h3>
          <div className="space-y-1">
            {combatFeats.map(feat => (
              <div key={feat!.id} className="text-sm flex items-start gap-2">
                <span className="text-divine-gold">•</span>
                <div>
                  <span className="font-medium text-ink">{feat!.name}</span>
                  <p className="text-xs text-ink-light">{feat!.effect}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Armes */}
      {weapons.length > 0 && (
        <section>
          <h3 className="font-display text-sm text-ink-muted mb-2 flex items-center gap-2">
            <Sword className="w-4 h-4" />
            Armes ({weapons.length})
          </h3>
          <div className="space-y-2">
            {weapons.map(weapon => {
              const attack = getAttackBonus(weapon);
              const isExpanded = expandedItems.has(weapon.id);
              
              return (
                <div key={weapon.id} className="card p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-ink">{weapon.name}</span>
                        {weapon.isEquipped && (
                          <span className="badge badge-success text-xs">Équipée</span>
                        )}
                      </div>
                      
                      {/* Stats de base */}
                      <div className="flex flex-wrap gap-3 mt-2 text-sm">
                        <span className="text-blood-red font-bold">
                          +{attack.toHit} pour toucher
                        </span>
                        {weapon.damage && (
                          <span className="text-ink">
                            {weapon.damage} {attack.damageMod >= 0 ? '+' : ''}{attack.damageMod} dégâts
                          </span>
                        )}
                        {weapon.damageType && (
                          <span className="text-ink-light">{weapon.damageType}</span>
                        )}
                      </div>
                      
                      {/* Type d'action */}
                      <div className="mt-1">
                        <span className="badge bg-blood-red/10 text-blood-red border-blood-red/30 text-xs">
                          Action
                        </span>
                        {character.abilities.warCleric.currentUses > 0 && (
                          <span className="badge bg-divine-gold/10 text-divine-gold border-divine-gold/30 text-xs ml-1">
                            Action bonus (Prêtre de guerre ×{character.abilities.warCleric.currentUses})
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Contrôle quantité */}
                    <div className="flex items-center gap-1 ml-2">
                      <button
                        onClick={() => updateQuantity(weapon.id, weapon.quantity - 1)}
                        disabled={weapon.quantity <= 0}
                        className="w-6 h-6 rounded bg-parchment-dark flex items-center justify-center
                                 hover:bg-divine-gold/20 disabled:opacity-30 text-xs"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-ui font-bold text-sm">
                        {weapon.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(weapon.id, weapon.quantity + 1)}
                        className="w-6 h-6 rounded bg-parchment-dark flex items-center justify-center
                                 hover:bg-divine-gold/20 text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  {/* Propriétés de l'arme */}
                  {weapon.weaponProperties && weapon.weaponProperties.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {weapon.weaponProperties.map(prop => (
                        <span key={prop} className="badge badge-secondary text-xs">
                          {prop}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Bouton détails */}
                  <button
                    onClick={() => toggleExpanded(weapon.id)}
                    className="w-full mt-2 text-xs text-ink-muted flex items-center justify-center gap-1
                             hover:text-ink transition-colors"
                  >
                    {isExpanded ? (
                      <><ChevronUp className="w-3 h-3" /> Moins d'infos</>
                    ) : (
                      <><ChevronDown className="w-3 h-3" /> Règles détaillées</>
                    )}
                  </button>
                  
                  {/* Détails des règles */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-parchment-dark space-y-2 text-sm">
                      {/* Calcul du jet d'attaque */}
                      <div className="bg-parchment/50 p-2 rounded">
                        <p className="font-medium text-ink mb-1">🎯 Jet d'attaque</p>
                        <p className="text-ink-light">
                          1d20 {attack.toHit >= 0 ? '+' : ''}{attack.toHit} = 1d20 {attack.damageMod >= 0 ? '+' : ''}{attack.damageMod} ({attack.ability}) {profBonus >= 0 ? '+' : ''}{profBonus} (maîtrise)
                        </p>
                      </div>
                      
                      {/* Calcul des dégâts */}
                      {weapon.damage && (
                        <div className="bg-parchment/50 p-2 rounded">
                          <p className="font-medium text-ink mb-1">⚔️ Dégâts</p>
                          <p className="text-ink-light">
                            {weapon.damage} {attack.damageMod >= 0 ? '+' : ''}{attack.damageMod} ({attack.ability}) {weapon.damageType}
                          </p>
                          {character.level >= 8 && character.domain?.id === 'war' && (
                            <p className="text-divine-gold text-xs mt-1">
                              + Frappe divine : +1d8 radiants (niveau 8)
                            </p>
                          )}
                        </div>
                      )}
                      
                      {/* Règles spéciales */}
                      <div className="bg-parchment/50 p-2 rounded">
                        <p className="font-medium text-ink mb-1">📜 Règles spéciales</p>
                        <ul className="text-ink-light space-y-1 text-xs">
                          {weapon.weaponProperties?.includes('À deux mains') && (
                            <li>• Nécessite les deux mains pour attaquer</li>
                          )}
                          {weapon.weaponProperties?.includes('Lancer') && (
                            <li>• Peut être lancée (portée indiquée dans la description)</li>
                          )}
                          {weapon.weaponProperties?.includes('Finesse') && (
                            <li>• Utilise FOR ou DEX (le plus élevé)</li>
                          )}
                          {weapon.weaponProperties?.includes('Légère') && (
                            <li>• Peut être utilisée comme arme secondaire (action bonus)</li>
                          )}
                          {weapon.weaponProperties?.includes('Polyvalente') && (
                            <li>• Peut être utilisée à une main ou deux mains (dégâts augmentés)</li>
                          )}
                          {hasWarCaster && (
                            <li className="text-divine-gold">• Lanceur de Guerre : attaque d'opportunité possible avec un sort</li>
                          )}
                        </ul>
                      </div>
                      
                      {/* Description */}
                      {weapon.description && (
                        <div className="bg-parchment/50 p-2 rounded">
                          <p className="font-medium text-ink mb-1">📝 Description</p>
                          <p className="text-ink-light text-xs">{weapon.description}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
      
      {/* Armures */}
      {armors.length > 0 && (
        <section>
          <h3 className="font-display text-sm text-ink-muted mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Armures ({armors.length})
          </h3>
          <div className="space-y-2">
            {armors.map(armor => {
              const isExpanded = expandedItems.has(armor.id);
              let dexModForArmor = dexMod;
              if (armor.armorType === 'lourde') dexModForArmor = 0;
              if (armor.armorType === 'intermédiaire') dexModForArmor = Math.min(dexMod, 2);
              
              return (
                <div key={armor.id} className="card p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-ink">{armor.name}</span>
                        {armor.isEquipped && (
                          <span className="badge badge-success text-xs">Équipée</span>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-3 mt-2 text-sm">
                        <span className="text-forest font-bold">
                          CA {armor.armorClass ? armor.armorClass + dexModForArmor : '?'}
                        </span>
                        {armor.armorType && (
                          <span className="badge badge-secondary text-xs">{armor.armorType}</span>
                        )}
                      </div>
                    </div>
                    
                    {/* Contrôle quantité */}
                    <div className="flex items-center gap-1 ml-2">
                      <button
                        onClick={() => updateQuantity(armor.id, armor.quantity - 1)}
                        disabled={armor.quantity <= 0}
                        className="w-6 h-6 rounded bg-parchment-dark flex items-center justify-center
                                 hover:bg-divine-gold/20 disabled:opacity-30 text-xs"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-ui font-bold text-sm">
                        {armor.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(armor.id, armor.quantity + 1)}
                        className="w-6 h-6 rounded bg-parchment-dark flex items-center justify-center
                                 hover:bg-divine-gold/20 text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => toggleExpanded(armor.id)}
                    className="w-full mt-2 text-xs text-ink-muted flex items-center justify-center gap-1
                             hover:text-ink transition-colors"
                  >
                    {isExpanded ? (
                      <><ChevronUp className="w-3 h-3" /> Moins d'infos</>
                    ) : (
                      <><ChevronDown className="w-3 h-3" /> Règles détaillées</>
                    )}
                  </button>
                  
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-parchment-dark space-y-2 text-sm">
                      <div className="bg-parchment/50 p-2 rounded">
                        <p className="font-medium text-ink mb-1">🛡️ Calcul de la CA</p>
                        <p className="text-ink-light">
                          {armor.armorClass} (base) {dexModForArmor > 0 ? `+ ${dexModForArmor} DEX` : ''} = <strong>{armor.armorClass ? armor.armorClass + dexModForArmor : '?'}</strong>
                        </p>
                        {armor.armorType === 'lourde' && (
                          <p className="text-ink-muted text-xs mt-1">Armure lourde : pas de bonus de DEX</p>
                        )}
                        {armor.armorType === 'intermédiaire' && dexMod > 2 && (
                          <p className="text-ink-muted text-xs mt-1">Armure intermédiaire : max +2 DEX</p>
                        )}
                      </div>
                      
                      {armor.stealthDisadvantage && (
                        <div className="bg-blood-red/10 p-2 rounded border border-blood-red/30">
                          <p className="text-blood-red text-xs">
                            ⚠️ Désavantage aux tests de Discrétion
                          </p>
                        </div>
                      )}
                      
                      {armor.strengthRequired && character.strength < armor.strengthRequired && (
                        <div className="bg-blood-red/10 p-2 rounded border border-blood-red/30">
                          <p className="text-blood-red text-xs">
                            ⚠️ Force {armor.strengthRequired} requise ! Vitesse réduite de 3m
                          </p>
                        </div>
                      )}
                      
                      {hasHeavyArmorMaster && armor.armorType === 'lourde' && (
                        <div className="bg-divine-gold/10 p-2 rounded border border-divine-gold/30">
                          <p className="text-divine-gold text-xs">
                            ✨ Maître des Armures Lourdes : -3 dégâts contondants/perforants/tranchants
                          </p>
                        </div>
                      )}
                      
                      {armor.description && (
                        <div className="bg-parchment/50 p-2 rounded">
                          <p className="font-medium text-ink mb-1">📝 Description</p>
                          <p className="text-ink-light text-xs">{armor.description}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
      
      {/* Boucliers */}
      {shields.length > 0 && (
        <section>
          <h3 className="font-display text-sm text-ink-muted mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-steel-blue" />
            Boucliers ({shields.length})
          </h3>
          <div className="space-y-2">
            {shields.map(shield => {
              const isExpanded = expandedItems.has(shield.id);
              
              return (
                <div key={shield.id} className="card p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-ink">{shield.name}</span>
                        {shield.isEquipped && (
                          <span className="badge badge-success text-xs">Équipé</span>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-3 mt-2 text-sm">
                        <span className="text-steel-blue font-bold">
                          +2 CA
                        </span>
                        <span className="badge badge-secondary text-xs">Action bonus</span>
                      </div>
                    </div>
                    
                    {/* Contrôle quantité */}
                    <div className="flex items-center gap-1 ml-2">
                      <button
                        onClick={() => updateQuantity(shield.id, shield.quantity - 1)}
                        disabled={shield.quantity <= 0}
                        className="w-6 h-6 rounded bg-parchment-dark flex items-center justify-center
                                 hover:bg-divine-gold/20 disabled:opacity-30 text-xs"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-ui font-bold text-sm">
                        {shield.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(shield.id, shield.quantity + 1)}
                        className="w-6 h-6 rounded bg-parchment-dark flex items-center justify-center
                                 hover:bg-divine-gold/20 text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => toggleExpanded(shield.id)}
                    className="w-full mt-2 text-xs text-ink-muted flex items-center justify-center gap-1
                             hover:text-ink transition-colors"
                  >
                    {isExpanded ? (
                      <><ChevronUp className="w-3 h-3" /> Moins d'infos</>
                    ) : (
                      <><ChevronDown className="w-3 h-3" /> Règles détaillées</>
                    )}
                  </button>
                  
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-parchment-dark space-y-2 text-sm">
                      <div className="bg-parchment/50 p-2 rounded">
                        <p className="font-medium text-ink mb-1">🛡️ Bonus de bouclier</p>
                        <p className="text-ink-light">
                          +2 à la CA tant que le bouclier est équipé
                        </p>
                        <p className="text-ink-muted text-xs mt-1">
                          Nécessite une main libre pour bénéficier du bonus
                        </p>
                      </div>
                      
                      {hasShieldMaster && (
                        <div className="space-y-1">
                          <div className="bg-divine-gold/10 p-2 rounded border border-divine-gold/30">
                            <p className="text-divine-gold text-xs font-medium">Maître des Boucliers :</p>
                            <ul className="text-ink-light text-xs mt-1 space-y-1">
                              <li>• Action bonus pour pousser une cible à 1,50m (FOR vs JS)</li>
                              <li>• Bonus de bouclier (+2) aux JS de DEX contre effets de zone</li>
                              <li>• Réaction pour ne prendre aucun dégât si JS de DEX réussi contre zone</li>
                            </ul>
                          </div>
                        </div>
                      )}
                      
                      {hasWarCaster && (
                        <div className="bg-divine-gold/10 p-2 rounded border border-divine-gold/30">
                          <p className="text-divine-gold text-xs">
                            ✨ Lanceur de Guerre : gestes somatiques possibles avec bouclier en main
                          </p>
                        </div>
                      )}
                      
                      {shield.description && (
                        <div className="bg-parchment/50 p-2 rounded">
                          <p className="font-medium text-ink mb-1">📝 Description</p>
                          <p className="text-ink-light text-xs">{shield.description}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
      
      {/* Message si aucun équipement de combat */}
      {combatItems.length === 0 && (
        <div className="text-center py-8 text-ink-muted">
          <Swords className="w-12 h-12 mx-auto mb-2 opacity-30" />
          <p>Aucun équipement de combat</p>
          <p className="text-sm">Ajoutez des armes, armures ou boucliers à votre inventaire</p>
        </div>
      )}
      
      {/* Rappel des règles de combat */}
      <div className="card bg-parchment-dark/30">
        <h4 className="font-display text-sm text-ink mb-2 flex items-center gap-2">
          <Info className="w-4 h-4 text-steel-blue" />
          Rappel des actions en combat
        </h4>
        <div className="space-y-2 text-xs">
          <div className="flex gap-2">
            <span className="badge bg-blood-red/10 text-blood-red border-blood-red/30">Action</span>
            <span className="text-ink-light">Attaquer, Lancer un sort, Conduit divin, Aider, Se cacher...</span>
          </div>
          <div className="flex gap-2">
            <span className="badge bg-divine-gold/10 text-divine-gold border-divine-gold/30">Action bonus</span>
            <span className="text-ink-light">Prêtre de guerre, Arme secondaire (légère), Sort rapide</span>
          </div>
          <div className="flex gap-2">
            <span className="badge bg-bronze/10 text-bronze border-bronze/30">Réaction</span>
            <span className="text-ink-light">Attaque d'opportunité, Bouclier (sort), Contresort...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
