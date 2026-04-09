import { Shield, Sword, Target, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useInventoryStore } from '@/stores';
import { useCharacterStore } from '@/stores';
import { getFeatById } from '@/types/feats';

export function CombatStatsCard() {
  const [showDetails, setShowDetails] = useState(false);
  
  const character = useCharacterStore((state) => state.character);
  const equippedArmor = useInventoryStore((state) => state.getEquippedArmor());
  const equippedShield = useInventoryStore((state) => state.getEquippedShield());
  const equippedWeapons = useInventoryStore((state) => state.getEquippedWeapons());
  
  // Calcul des modificateurs
  const strMod = Math.floor((character.strength - 10) / 2);
  const dexMod = Math.floor((character.dexterity - 10) / 2);
  const profBonus = Math.floor((character.level - 1) / 4) + 2;
  
  // Calcul de la CA
  let baseAC = 10; // Sans armure
  let dexModForArmor = dexMod;
  let armorType = 'aucune';
  
  if (equippedArmor) {
    baseAC = equippedArmor.armorClass || 10;
    armorType = equippedArmor.armorType || 'inconnue';
    
    // Armure lourde : pas de bonus DEX
    if (armorType === 'lourde') {
      dexModForArmor = 0;
    }
    // Armure intermédiaire : max +2 DEX
    else if (armorType === 'intermediaire') {
      dexModForArmor = Math.min(dexMod, 2);
    }
    // Armure légère : bonus DEX complet
  }
  
  // Bouclier : +2 CA
  const shieldBonus = equippedShield ? 2 : 0;
  
  // CA totale
  const totalAC = baseAC + dexModForArmor + shieldBonus;
  
  // Talents de combat
  const combatFeats = character.feats
    ?.map(featId => getFeatById(featId))
    .filter(feat => feat?.isCombatFeat) || [];
  
  const hasHeavyArmorMaster = combatFeats.some(f => f?.id === 'heavy-armor-master');
  const hasShieldMaster = combatFeats.some(f => f?.id === 'shield-master');
  
  // Calcul du bonus d'attaque pour une arme
  const getAttackBonus = (weapon: { weaponProperties?: string[] }) => {
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
      ability: isFinesse && dexMod > strMod ? 'DEX' : isRanged ? 'DEX' : 'FOR',
    };
  };
  
  // Détermine la couleur de la CA selon la valeur
  const getACColor = (ac: number) => {
    if (ac >= 20) return 'text-divine-gold';
    if (ac >= 17) return 'text-forest';
    if (ac >= 14) return 'text-steel-blue';
    return 'text-ink';
  };
  
  return (
    <div className="card bg-steel-blue/10 border-steel-blue/30">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display text-lg text-ink flex items-center gap-2">
          <Shield className="w-5 h-5 text-steel-blue" />
          Defense & Equipement
        </h3>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs text-ink-muted flex items-center gap-1"
        >
          <Info className="w-3 h-3" />
          {showDetails ? 'Moins' : 'Details'}
          {showDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>
      
      {/* CA Principale - Grande affichage */}
      <div className="flex items-center justify-between mb-4 p-3 bg-parchment-light rounded-lg">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-steel-blue/20 border-2 border-steel-blue flex items-center justify-center">
            <Shield className="w-7 h-7 text-steel-blue" />
          </div>
          <div>
            <div className="text-xs text-ink-muted uppercase tracking-wide">Classe d'Armure</div>
            <div className={`text-4xl font-display font-bold ${getACColor(totalAC)}`}>
              {totalAC}
            </div>
          </div>
        </div>
        
        {/* Resume rapide */}
        <div className="text-right text-sm">
          {equippedArmor ? (
            <div className="text-ink">
              <span className="font-medium">{equippedArmor.name}</span>
              <span className="text-ink-muted text-xs ml-1">({armorType})</span>
            </div>
          ) : (
            <div className="text-ink-muted">Sans armure</div>
          )}
          {equippedShield && (
            <div className="text-steel-blue text-xs">+ Bouclier</div>
          )}
        </div>
      </div>
      
      {/* Details du calcul de CA */}
      {showDetails && (
        <div className="mb-4 p-3 bg-parchment/50 rounded-lg text-sm space-y-2">
          <p className="font-medium text-ink mb-2">Calcul de la CA</p>
          
          <div className="space-y-1">
            {/* Base */}
            <div className="flex justify-between">
              <span className="text-ink-muted">
                {equippedArmor ? equippedArmor.name : 'Sans armure (base 10)'}
              </span>
              <span className="font-medium">{baseAC}</span>
            </div>
            
            {/* Mod DEX */}
            {dexModForArmor !== 0 && (
              <div className="flex justify-between">
                <span className="text-ink-muted">
                  Mod. Dextérité ({dexModForArmor > 0 ? '+' : ''}{dexModForArmor})
                  {armorType === 'intermediaire' && dexMod > 2 && (
                    <span className="text-xs text-ink-muted ml-1">(max +2)</span>
                  )}
                  {armorType === 'lourde' && (
                    <span className="text-xs text-ink-muted ml-1">(armure lourde)</span>
                  )}
                </span>
                <span className="font-medium">{dexModForArmor > 0 ? '+' : ''}{dexModForArmor}</span>
              </div>
            )}
            
            {/* Bouclier */}
            {shieldBonus > 0 && (
              <div className="flex justify-between">
                <span className="text-ink-muted">Bouclier</span>
                <span className="font-medium text-steel-blue">+{shieldBonus}</span>
              </div>
            )}
            
            {/* Total */}
            <div className="flex justify-between pt-2 border-t border-parchment-dark font-bold">
              <span className="text-ink">Total</span>
              <span className={getACColor(totalAC)}>{totalAC}</span>
            </div>
          </div>
          
          {/* Talents affectant la CA */}
          {(hasHeavyArmorMaster || hasShieldMaster) && (
            <div className="mt-3 pt-2 border-t border-parchment-dark">
              <p className="text-xs font-medium text-ink mb-1">Talents actifs</p>
              {hasHeavyArmorMaster && armorType === 'lourde' && (
                <p className="text-xs text-forest">
                  Maitre des Armures Lourdes : -3 degats contondants/perforants/tranchants
                </p>
              )}
              {hasShieldMaster && (
                <p className="text-xs text-steel-blue">
                  Maitre des Boucliers : reaction pour annuler degats de zone
                </p>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* Armes equipees */}
      {equippedWeapons.length > 0 && (
        <div className="border-t border-steel-blue/20 pt-3">
          <h4 className="text-xs font-bold text-ink-light uppercase tracking-wide mb-2 flex items-center gap-1">
            <Sword className="w-3 h-3" />
            Armes equipées
          </h4>
          <div className="space-y-2">
            {equippedWeapons.map(weapon => {
              const attack = getAttackBonus(weapon);
              return (
                <div key={weapon.id} className="flex items-center justify-between bg-parchment/50 rounded p-2">
                  <div>
                    <div className="font-medium text-sm text-ink">{weapon.name}</div>
                    <div className="text-xs text-ink-light">
                      <span className="text-blood-red font-bold">Dégâts: {weapon.damage} +{attack.damageMod}</span>
                      <span className="text-ink-muted"> ({weapon.damageType})</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-forest font-bold">
                      <Target className="w-3 h-3" />
                      +{attack.toHit} pour toucher
                    </div>
                    <div className="text-xs text-ink-muted">
                      {attack.ability} + Maîtrise
                    </div>
                  </div>
                </div>
              );
            })};
          </div>
        </div>
      )}
      
      {/* Message si aucun equipement */}
      {!equippedArmor && !equippedShield && equippedWeapons.length === 0 && (
        <div className="text-center py-4 text-ink-muted text-sm">
          <p>Aucun equipement equipe</p>
          <p className="text-xs mt-1">
            Allez dans Inventaire &gt; Equipement de combat pour equiper des armes et armures
          </p>
        </div>
      )}
    </div>
  );
}
