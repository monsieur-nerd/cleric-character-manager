import { useState } from 'react';
import { Sword, Shield, Zap, ChevronDown, ChevronUp, Swords, Info, CheckSquare, Square, Battery, BatteryWarning, RefreshCw } from 'lucide-react';
import { useInventoryStore } from '@/stores';
import { useCharacterStore } from '@/stores';
import { getFeatById } from '@/types/feats';
import { EquipmentEffectsPanel } from './EquipmentEffectsPanel';
import type { EquipmentItem } from '@/types';

interface CombatItem extends EquipmentItem {
  combatType: 'weapon' | 'armor' | 'shield';
}

export function CombatEquipmentTab() {
  const items = useInventoryStore((state) => state.items);
  const character = useCharacterStore((state) => state.character);
  const updateQuantity = useInventoryStore((state) => state.updateQuantity);
  const equipItem = useInventoryStore((state) => state.equipItem);
  const unequipItem = useInventoryStore((state) => state.unequipItem);
  const useCharge = useInventoryStore((state) => state.useCharge);
  const rechargeItem = useInventoryStore((state) => state.rechargeItem);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [lastActionMessage, setLastActionMessage] = useState<string | null>(null);
  
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
  
  // Récupere les talents de combat du personnage
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
  
  // Regroupe par categorie
  const weapons = combatItems.filter(i => i.combatType === 'weapon');
  const armors = combatItems.filter(i => i.combatType === 'armor');
  const shields = combatItems.filter(i => i.combatType === 'shield');
  
  // Gestion de l equipement avec cases a cocher
  const handleEquipToggle = (item: CombatItem) => {
    if (item.isEquipped) {
      unequipItem(item.id);
      setLastActionMessage(`${item.name} desequipe(e)`);
    } else {
      const result = equipItem(item.id);
      if (result.success) {
        setLastActionMessage(result.message || `${item.name} equipe(e)`);
      }
    }
    
    setTimeout(() => setLastActionMessage(null), 3000);
  };

  // Utiliser une charge
  const handleUseCharge = (itemId: string) => {
    const result = useCharge(itemId, 1);
    if (result.success) {
      setLastActionMessage(result.message);
    } else {
      setLastActionMessage(`Erreur: ${result.message}`);
    }
    setTimeout(() => setLastActionMessage(null), 3000);
  };
  
  // Recharger un item
  const handleRecharge = (itemId: string) => {
    const result = rechargeItem(itemId);
    if (result.success) {
      setLastActionMessage(result.message);
    }
    setTimeout(() => setLastActionMessage(null), 3000);
  };

  // Calcule le bonus d attaque pour une arme
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
      {/* Message de confirmation d action */}
      {lastActionMessage && (
        <div className="bg-divine-gold/20 border border-divine-gold/40 rounded-lg p-2 text-sm text-center animate-fade-in">
          <span className="text-forest font-medium">{lastActionMessage}</span>
        </div>
      )}
      
      {/* Panneau recapitulatif des effets (US-008) */}
      <EquipmentEffectsPanel />
      
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
                <div key={weapon.id} className={`card p-3 ${weapon.isEquipped ? 'border-divine-gold/50 bg-divine-gold/5' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {/* Case a cocher pour equiper (US-001) */}
                        <button
                          onClick={() => handleEquipToggle(weapon)}
                          className="flex items-center gap-1 text-ink hover:text-forest transition-colors"
                          title={weapon.isEquipped ? 'Desequiper' : 'Equiper'}
                        >
                          {weapon.isEquipped ? (
                            <CheckSquare className="w-5 h-5 text-forest" />
                          ) : (
                            <Square className="w-5 h-5 text-ink-muted" />
                          )}
                        </button>
                        <span className="font-display text-ink">{weapon.name}</span>
                        {weapon.isEquipped && (
                          <span className="badge badge-success text-xs">Equipee</span>
                        )}
                      </div>
                      
                      {/* Stats de base */}
                      <div className="flex flex-wrap gap-3 mt-2 text-sm">
                        <span className="text-blood-red font-bold">
                          +{attack.toHit} pour toucher
                        </span>
                        {weapon.damage && (
                          <span className="text-ink">
                            {weapon.damage} {attack.damageMod >= 0 ? '+' : ''}{attack.damageMod} degats
                          </span>
                        )}
                        {weapon.damageType && (
                          <span className="text-ink-light">{weapon.damageType}</span>
                        )}
                      </div>
                      
                      {/* Type d action */}
                      <div className="mt-1">
                        <span className="badge bg-blood-red/10 text-blood-red border-blood-red/30 text-xs">
                          Action
                        </span>
                        {character.abilities.warCleric.currentUses > 0 && (
                          <span className="badge bg-divine-gold/10 text-divine-gold border-divine-gold/30 text-xs ml-1">
                            Action bonus (Pretre de guerre x{character.abilities.warCleric.currentUses})
                          </span>
                        )}
                      </div>
                      
                      {/* Charges (US-044 a US-047) */}
                      {weapon.charges && (
                        <div className="mt-2 bg-parchment/50 rounded p-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Battery className={`w-4 h-4 ${
                                weapon.charges.current === 0 ? 'text-red-500' :
                                weapon.charges.current <= weapon.charges.max * 0.25 ? 'text-orange-500' :
                                'text-green-500'
                              }`} />
                              <span className="text-xs text-ink-muted">Charges:</span>
                              <span className={`text-sm font-medium ${
                                weapon.charges.current === 0 ? 'text-red-500' :
                                weapon.charges.current <= weapon.charges.max * 0.25 ? 'text-orange-500' :
                                'text-ink'
                              }`}>
                                {weapon.charges.current}/{weapon.charges.max}
                              </span>
                            </div>
                            <div className="flex gap-1">
                              <button
                                onClick={() => handleUseCharge(weapon.id)}
                                disabled={weapon.charges.current <= 0}
                                className="px-2 py-1 text-xs bg-blood-red/10 text-blood-red rounded hover:bg-blood-red/20 disabled:opacity-30"
                              >
                                Utiliser
                              </button>
                              <button
                                onClick={() => handleRecharge(weapon.id)}
                                className="px-2 py-1 text-xs bg-forest/10 text-forest rounded hover:bg-forest/20"
                                title="Recharger"
                              >
                                <RefreshCw className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          <div className="h-1.5 bg-parchment-dark rounded-full overflow-hidden mt-1">
                            <div 
                              className={`h-full transition-all ${
                                weapon.charges.current === 0 ? 'bg-red-500' :
                                weapon.charges.current <= weapon.charges.max * 0.25 ? 'bg-orange-500' :
                                'bg-green-500'
                              }`}
                              style={{ width: `${(weapon.charges.current / weapon.charges.max) * 100}%` }}
                            />
                          </div>
                          {weapon.charges.current === 0 && (
                            <div className="flex items-center gap-1 mt-1 text-xs text-red-500">
                              <BatteryWarning className="w-3 h-3" />
                              <span>Epuise !</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {/* Controle quantite */}
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
                  
                  {/* Proprietes de l arme */}
                  {weapon.weaponProperties && weapon.weaponProperties.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {weapon.weaponProperties.map(prop => (
                        <span key={prop} className="badge badge-secondary text-xs">
                          {prop}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Bouton details */}
                  <button
                    onClick={() => toggleExpanded(weapon.id)}
                    className="w-full mt-2 text-xs text-ink-muted flex items-center justify-center gap-1
                             hover:text-ink transition-colors"
                  >
                    {isExpanded ? (
                      <><ChevronUp className="w-3 h-3" /> Moins d infos</>
                    ) : (
                      <><ChevronDown className="w-3 h-3" /> Regles detaillees</>
                    )}
                  </button>
                  
                  {/* Details des regles */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-parchment-dark space-y-2 text-sm">
                      {/* Calcul du jet d attaque */}
                      <div className="bg-parchment/50 p-2 rounded">
                        <p className="font-medium text-ink mb-1">Jet d attaque</p>
                        <p className="text-ink-light">
                          1d20 {attack.toHit >= 0 ? '+' : ''}{attack.toHit} = 1d20 {attack.damageMod >= 0 ? '+' : ''}{attack.damageMod} ({attack.ability}) {profBonus >= 0 ? '+' : ''}{profBonus} (maitrise)
                        </p>
                      </div>
                      
                      {/* Calcul des degats */}
                      {weapon.damage && (
                        <div className="bg-parchment/50 p-2 rounded">
                          <p className="font-medium text-ink mb-1">Degats</p>
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
                      
                      {/* Harmonisation */}
                      {weapon.attunement?.required && (
                        <div className={`p-2 rounded border ${
                          weapon.attunement.isAttuned 
                            ? 'bg-divine-gold/10 border-divine-gold/30' 
                            : 'bg-gray-100 border-gray-300'
                        }`}>
                          <p className="font-medium text-ink mb-1">Harmonisation</p>
                          <p className={`text-xs ${weapon.attunement.isAttuned ? 'text-divine-gold' : 'text-ink-muted'}`}>
                            {weapon.attunement.isAttuned 
                              ? '✨ Harmonise' 
                              : 'Necessite une harmonisation pour activer les effets'}
                          </p>
                        </div>
                      )}
                      
                      {/* Regles speciales */}
                      <div className="bg-parchment/50 p-2 rounded">
                        <p className="font-medium text-ink mb-1">Regles speciales</p>
                        <ul className="text-ink-light space-y-1 text-xs">
                          {weapon.weaponProperties?.includes('A deux mains') && (
                            <li>• Necessite les deux mains pour attaquer</li>
                          )}
                          {weapon.weaponProperties?.includes('Lancer') && (
                            <li>• Peut etre lancee (portee indiquee dans la description)</li>
                          )}
                          {weapon.weaponProperties?.includes('Finesse') && (
                            <li>• Utilise FOR ou DEX (le plus eleve)</li>
                          )}
                          {weapon.weaponProperties?.includes('Legere') && (
                            <li>• Peut etre utilisee comme arme secondaire (action bonus)</li>
                          )}
                          {weapon.weaponProperties?.includes('Polyvalente') && (
                            <li>• Peut etre utilisee a une main ou deux mains (degats augmentes)</li>
                          )}
                          {hasWarCaster && (
                            <li className="text-divine-gold">• Lanceur de Guerre : attaque d opportunite possible avec un sort</li>
                          )}
                        </ul>
                      </div>
                      
                      {/* Description */}
                      {weapon.description && (
                        <div className="bg-parchment/50 p-2 rounded">
                          <p className="font-medium text-ink mb-1">Description</p>
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
              if (armor.armorType === 'intermediaire') dexModForArmor = Math.min(dexMod, 2);
              
              return (
                <div key={armor.id} className={`card p-3 ${armor.isEquipped ? 'border-divine-gold/50 bg-divine-gold/5' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {/* Case a cocher pour equiper (US-001) */}
                        <button
                          onClick={() => handleEquipToggle(armor)}
                          className="flex items-center gap-1 text-ink hover:text-forest transition-colors"
                          title={armor.isEquipped ? 'Desequiper' : 'Equiper'}
                        >
                          {armor.isEquipped ? (
                            <CheckSquare className="w-5 h-5 text-forest" />
                          ) : (
                            <Square className="w-5 h-5 text-ink-muted" />
                          )}
                        </button>
                        <span className="font-display text-ink">{armor.name}</span>
                        {armor.isEquipped && (
                          <span className="badge badge-success text-xs">Equipee</span>
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
                    
                    {/* Controle quantite */}
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
                      <><ChevronUp className="w-3 h-3" /> Moins d infos</>
                    ) : (
                      <><ChevronDown className="w-3 h-3" /> Regles detaillees</>
                    )}
                  </button>
                  
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-parchment-dark space-y-2 text-sm">
                      <div className="bg-parchment/50 p-2 rounded">
                        <p className="font-medium text-ink mb-1">Calcul de la CA</p>
                        <p className="text-ink-light">
                          {armor.armorClass} (base) {dexModForArmor > 0 ? `+ ${dexModForArmor} DEX` : ''} = <strong>{armor.armorClass ? armor.armorClass + dexModForArmor : '?'}</strong>
                        </p>
                        {armor.armorType === 'lourde' && (
                          <p className="text-ink-muted text-xs mt-1">Armure lourde : pas de bonus de DEX</p>
                        )}
                        {armor.armorType === 'intermediaire' && dexMod > 2 && (
                          <p className="text-ink-muted text-xs mt-1">Armure intermediaire : max +2 DEX</p>
                        )}
                      </div>
                      
                      {armor.stealthDisadvantage && (
                        <div className="bg-blood-red/10 p-2 rounded border border-blood-red/30">
                          <p className="text-blood-red text-xs">
                            Desavantage aux tests de Discretion
                          </p>
                        </div>
                      )}
                      
                      {armor.strengthRequired && character.strength < armor.strengthRequired && (
                        <div className="bg-blood-red/10 p-2 rounded border border-blood-red/30">
                          <p className="text-blood-red text-xs">
                            Force {armor.strengthRequired} requise ! Vitesse reduite de 3m
                          </p>
                        </div>
                      )}
                      
                      {hasHeavyArmorMaster && armor.armorType === 'lourde' && (
                        <div className="bg-divine-gold/10 p-2 rounded border border-divine-gold/30">
                          <p className="text-divine-gold text-xs">
                            Maitre des Armures Lourdes : -3 degats contondants/perforants/tranchants
                          </p>
                        </div>
                      )}
                      
                      {armor.description && (
                        <div className="bg-parchment/50 p-2 rounded">
                          <p className="font-medium text-ink mb-1">Description</p>
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
                <div key={shield.id} className={`card p-3 ${shield.isEquipped ? 'border-divine-gold/50 bg-divine-gold/5' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {/* Case a cocher pour equiper (US-001) */}
                        <button
                          onClick={() => handleEquipToggle(shield)}
                          className="flex items-center gap-1 text-ink hover:text-forest transition-colors"
                          title={shield.isEquipped ? 'Desequiper' : 'Equiper'}
                        >
                          {shield.isEquipped ? (
                            <CheckSquare className="w-5 h-5 text-forest" />
                          ) : (
                            <Square className="w-5 h-5 text-ink-muted" />
                          )}
                        </button>
                        <span className="font-display text-ink">{shield.name}</span>
                        {shield.isEquipped && (
                          <span className="badge badge-success text-xs">Equipe</span>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-3 mt-2 text-sm">
                        <span className="text-steel-blue font-bold">
                          +2 CA
                        </span>
                        <span className="badge badge-secondary text-xs">Action bonus</span>
                      </div>
                    </div>
                    
                    {/* Controle quantite */}
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
                      <><ChevronUp className="w-3 h-3" /> Moins d infos</>
                    ) : (
                      <><ChevronDown className="w-3 h-3" /> Regles detaillees</>
                    )}
                  </button>
                  
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-parchment-dark space-y-2 text-sm">
                      <div className="bg-parchment/50 p-2 rounded">
                        <p className="font-medium text-ink mb-1">Bonus de bouclier</p>
                        <p className="text-ink-light">
                          +2 a la CA tant que le bouclier est equipe
                        </p>
                        <p className="text-ink-muted text-xs mt-1">
                          Necessite une main libre pour beneficier du bonus
                        </p>
                      </div>
                      
                      {hasShieldMaster && (
                        <div className="space-y-1">
                          <div className="bg-divine-gold/10 p-2 rounded border border-divine-gold/30">
                            <p className="text-divine-gold text-xs font-medium">Maitre des Boucliers :</p>
                            <ul className="text-ink-light text-xs mt-1 space-y-1">
                              <li>• Action bonus pour pousser une cible a 1,50m (FOR vs JS)</li>
                              <li>• Bonus de bouclier (+2) aux JS de DEX contre effets de zone</li>
                              <li>• Reaction pour ne prendre aucun degat si JS de DEX reussi contre zone</li>
                            </ul>
                          </div>
                        </div>
                      )}
                      
                      {hasWarCaster && (
                        <div className="bg-divine-gold/10 p-2 rounded border border-divine-gold/30">
                          <p className="text-divine-gold text-xs">
                            Lanceur de Guerre : gestes somatiques possibles avec bouclier en main
                          </p>
                        </div>
                      )}
                      
                      {shield.description && (
                        <div className="bg-parchment/50 p-2 rounded">
                          <p className="font-medium text-ink mb-1">Description</p>
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
      
      {/* Message si aucun equipement de combat */}
      {combatItems.length === 0 && (
        <div className="text-center py-8 text-ink-muted">
          <Swords className="w-12 h-12 mx-auto mb-2 opacity-30" />
          <p>Aucun equipement de combat</p>
          <p className="text-sm">Ajoutez des armes, armures ou boucliers a votre inventaire</p>
        </div>
      )}
      
      {/* Rappel des regles de combat */}
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
            <span className="text-ink-light">Pretre de guerre, Arme secondaire (legere), Sort rapide</span>
          </div>
          <div className="flex gap-2">
            <span className="badge bg-bronze/10 text-bronze border-bronze/30">Reaction</span>
            <span className="text-ink-light">Attaque d opportunite, Bouclier (sort), Contresort...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
