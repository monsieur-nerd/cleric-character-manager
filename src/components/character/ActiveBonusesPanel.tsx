/**
 * Panneau d'affichage des bonus actifs du personnage
 * Permet au joueur de vérifier que tous ses bonus sont pris en compte
 */

import { useMemo } from 'react';
import { Shield, Sword, Heart, Sparkles, Info, Zap, Star } from 'lucide-react';
import { useCharacterStore, useInventoryStore } from '@/stores';
import { getActiveBonusesSummary } from '@/utils/bonusCalculator';

interface SpecialAbility {
  source: string;
  description: string;
}

export function ActiveBonusesPanel() {
  const character = useCharacterStore((state) => state.character);
  const items = useInventoryStore((state) => state.items);
  
  const { bonuses, specialAbilities } = useMemo(() => {
    const baseBonuses = getActiveBonusesSummary(character);
    const abilities: SpecialAbility[] = [];
    
    // Récupération des armes équipées (filtrage local pour éviter les problèmes de référence)
    const equippedWeapons = items.filter(item => item.isEquipped && item.type === 'Arme');
    
    // Debug
    console.log('ActiveBonusesPanel - Items:', items.length);
    console.log('ActiveBonusesPanel - Armes équipées:', equippedWeapons.map(w => w.name));
    console.log('ActiveBonusesPanel - Feats:', character.feats);
    
    // Détection du combat à deux armes
    const hasTwoWeaponFighting = character.feats?.includes('deux-armes');
    const weaponCount = equippedWeapons.length;
    const hasTwoWeapons = weaponCount >= 2;
    
    console.log('ActiveBonusesPanel - hasTwoWeaponFighting:', hasTwoWeaponFighting);
    console.log('ActiveBonusesPanel - hasTwoWeapons:', hasTwoWeapons);
    
    if (hasTwoWeaponFighting && hasTwoWeapons) {
      baseBonuses.damage.push({ 
        source: 'Combat à deux armes', 
        value: '+MOD dégâts (2ème arme)' 
      });
    }
    
    // Lanceur de Guerre (War Caster)
    if (character.feats?.includes('war-caster')) {
      abilities.push({
        source: 'Lanceur de Guerre',
        description: 'Avantage JS CON (concentration), somatiques avec arme, AO avec sort'
      });
    }
    
    return { 
      bonuses: baseBonuses, 
      specialAbilities: abilities
    };
  }, [character, items]);

  const hasAnyBonus = 
    bonuses.ac.length > 0 ||
    bonuses.damage.length > 0 ||
    bonuses.healing.length > 0 ||
    bonuses.hp.length > 0 ||
    specialAbilities.length > 0;

  if (!hasAnyBonus) {
    return (
      <div className="card bg-parchment-light border-parchment-dark">
        <div className="flex items-center gap-2 text-ink-muted">
          <Info className="w-4 h-4" />
          <span className="text-sm">Aucun bonus actif</span>
        </div>
        <p className="text-xs text-ink-muted mt-1">
          Les bonus des talents et capacités apparaîtront ici.
        </p>
      </div>
    );
  }

  return (
    <div className="card bg-divine-gold/10 border-divine-gold/30">
      <h3 className="font-display text-ink mb-3 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-divine-gold" />
        Bonus actifs
      </h3>
      
      <div className="space-y-3">
        {/* Bonus de CA */}
        {bonuses.ac.length > 0 && (
          <div className="bg-steel-blue/10 rounded p-2">
            <div className="flex items-center gap-2 text-steel-blue font-medium text-sm mb-1">
              <Shield className="w-3 h-3" />
              Classe d'armure
            </div>
            <ul className="text-xs space-y-1">
              {bonuses.ac.map((bonus, idx) => (
                <li key={idx} className="text-ink-light flex justify-between">
                  <span>{bonus.source}</span>
                  <span className="text-forest font-medium">+{bonus.value}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Bonus de dégâts */}
        {bonuses.damage.length > 0 && (
          <div className="bg-blood-red/10 rounded p-2">
            <div className="flex items-center gap-2 text-blood-red font-medium text-sm mb-1">
              <Sword className="w-3 h-3" />
              Dégâts
            </div>
            <ul className="text-xs space-y-1">
              {bonuses.damage.map((bonus, idx) => (
                <li key={idx} className="text-ink-light flex justify-between">
                  <span>{bonus.source}</span>
                  <span className="text-forest font-medium">{bonus.value}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Bonus de soins */}
        {bonuses.healing.length > 0 && (
          <div className="bg-forest/10 rounded p-2">
            <div className="flex items-center gap-2 text-forest font-medium text-sm mb-1">
              <Heart className="w-3 h-3" />
              Soins
            </div>
            <ul className="text-xs space-y-1">
              {bonuses.healing.map((bonus, idx) => (
                <li key={idx} className="text-ink-light flex justify-between">
                  <span>{bonus.source}</span>
                  <span className="text-forest font-medium">{bonus.value}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Bonus de PV */}
        {bonuses.hp.length > 0 && (
          <div className="bg-royal-purple/10 rounded p-2">
            <div className="flex items-center gap-2 text-royal-purple font-medium text-sm mb-1">
              <Heart className="w-3 h-3" />
              Points de vie max
            </div>
            <ul className="text-xs space-y-1">
              {bonuses.hp.map((bonus, idx) => (
                <li key={idx} className="text-ink-light flex justify-between">
                  <span>{bonus.source}</span>
                  <span className="text-forest font-medium">+{bonus.value}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Capacités spéciales */}
        {specialAbilities.length > 0 && (
          <div className="bg-amber-500/10 rounded p-2">
            <div className="flex items-center gap-2 text-amber-600 font-medium text-sm mb-1">
              <Star className="w-3 h-3" />
              Capacités spéciales
            </div>
            <ul className="text-xs space-y-1">
              {specialAbilities.map((ability, idx) => (
                <li key={idx} className="text-ink-light">
                  <span className="font-medium">{ability.source}:</span>{' '}
                  <span className="text-ink-muted">{ability.description}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <p className="text-xs text-ink-muted mt-3">
        💡 Ces bonus sont automatiquement appliqués dans les calculs.
      </p>
    </div>
  );
}
