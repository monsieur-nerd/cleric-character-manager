// hooks/useEquipment.ts
// Hook pour les calculs lies a l equipement (CA, etc.)

import { useMemo } from 'react';
import { useInventoryStore } from '@/stores';
import { useCharacterStore } from '@/stores';
import type { EquipmentItem } from '@/types';

export interface ACCalculation {
  total: number;
  base: number;
  dexBonus: number;
  shieldBonus: number;
  fightingStyleBonus: number;
  hasArmor: boolean;
  hasShield: boolean;
  equippedArmor: EquipmentItem | undefined;
  equippedShield: EquipmentItem | undefined;
  formula: string;
}

export interface HandConflict {
  hasConflict: boolean;
  message: string;
  equippedTwoHandedWeapon: EquipmentItem | undefined;
  equippedShield: EquipmentItem | undefined;
  equippedLightSource: EquipmentItem | undefined;
}

export function useEquipment() {
  const items = useInventoryStore((state) => state.items);
  const character = useCharacterStore((state) => state.character);
  
  const dexMod = useMemo(() => 
    Math.floor((character.dexterity - 10) / 2), 
    [character.dexterity]
  );
  
  const equippedArmor = useMemo(() => 
    items.find(item => item.isEquipped && item.type === 'Armure'),
    [items]
  );
  
  const equippedShield = useMemo(() => 
    items.find(item => item.isEquipped && item.type === 'Bouclier'),
    [items]
  );
  
  const equippedWeapons = useMemo(() => 
    items.filter(item => item.isEquipped && item.type === 'Arme'),
    [items]
  );
  
  const equippedLightSources = useMemo(() =>
    items.filter(item => item.isEquipped && item.lightSource),
    [items]
  );
  
  const calculateAC = useMemo((): ACCalculation => {
    let baseAC = 10;
    let dexBonus = dexMod;
    let shieldBonus = 0;
    let maxDexBonus = Infinity;
    let hasArmor = false;
    let hasShield = false;
    let fightingStyleBonus = 0;
    
    if (equippedArmor?.armorClass) {
      baseAC = equippedArmor.armorClass;
      hasArmor = true;
      
      if (equippedArmor.armorType === 'lourde') {
        maxDexBonus = 0;
      } else if (equippedArmor.armorType === 'intermédiaire') {
        maxDexBonus = 2;
      }
      
      // Style de Combat : Défense (+1 CA si armure portée)
      if (character.feats?.includes('style-combat')) {
        fightingStyleBonus = 1;
      }
    }
    
    if (equippedShield?.armorClass) {
      shieldBonus = 2;
      hasShield = true;
    }
    
    const effectiveDexBonus = Math.min(dexBonus, maxDexBonus);
    
    const parts: string[] = [];
    parts.push(`${baseAC} base`);
    if (effectiveDexBonus !== 0) {
      parts.push(`${effectiveDexBonus >= 0 ? '+' : ''}${effectiveDexBonus} DEX`);
    }
    if (shieldBonus > 0) {
      parts.push(`+${shieldBonus} bouclier`);
    }
    if (fightingStyleBonus > 0) {
      parts.push(`+${fightingStyleBonus} style combat`);
    }
    
    return {
      total: baseAC + effectiveDexBonus + shieldBonus + fightingStyleBonus,
      base: baseAC,
      dexBonus: effectiveDexBonus,
      shieldBonus,
      fightingStyleBonus,
      hasArmor,
      hasShield,
      equippedArmor,
      equippedShield,
      formula: parts.join(', '),
    };
  }, [equippedArmor, equippedShield, dexMod, character.feats]);
  
  const armorStrengthIssue = useMemo(() => {
    if (!equippedArmor?.strengthRequired) return null;
    if (character.strength >= equippedArmor.strengthRequired) return null;
    
    return {
      required: equippedArmor.strengthRequired,
      current: character.strength,
      message: `Force ${equippedArmor.strengthRequired} requise`,
    };
  }, [equippedArmor, character.strength]);
  
  const stealthDisadvantage = useMemo(() => {
    return equippedArmor?.stealthDisadvantage ?? false;
  }, [equippedArmor]);
  
  const handConflict = useMemo((): HandConflict => {
    const twoHandedWeapon = equippedWeapons.find(w => 
      w.weaponProperties?.includes('A deux mains')
    );
    
    const lightSourceInHand = equippedLightSources.find(ls => 
      ls.lightSource?.requiresHand
    );
    
    if (twoHandedWeapon && equippedShield) {
      return {
        hasConflict: true,
        message: `Impossible d utiliser ${twoHandedWeapon.name} avec un bouclier`,
        equippedTwoHandedWeapon: twoHandedWeapon,
        equippedShield,
        equippedLightSource: lightSourceInHand,
      };
    }
    
    if (twoHandedWeapon && lightSourceInHand) {
      return {
        hasConflict: true,
        message: `Conflit: ${twoHandedWeapon.name} et ${lightSourceInHand.name}`,
        equippedTwoHandedWeapon: twoHandedWeapon,
        equippedShield,
        equippedLightSource: lightSourceInHand,
      };
    }
    
    return {
      hasConflict: false,
      message: '',
      equippedTwoHandedWeapon: twoHandedWeapon,
      equippedShield,
      equippedLightSource: lightSourceInHand,
    };
  }, [equippedWeapons, equippedShield, equippedLightSources]);
  
  return {
    calculateAC,
    equippedArmor,
    equippedShield,
    equippedWeapons,
    armorStrengthIssue,
    stealthDisadvantage,
    handConflict,
    dexMod,
  };
}

export function useEquippedWeapons() {
  const items = useInventoryStore((state) => state.items);
  
  const equippedWeapons = useMemo(() => 
    items.filter(item => item.isEquipped && item.type === 'Arme'),
    [items]
  );
  
  const mainHandWeapon = useMemo(() => 
    equippedWeapons.find(w => w.equippedSlot === 'main_hand') || equippedWeapons[0],
    [equippedWeapons]
  );
  
  const offHandWeapon = useMemo(() => 
    equippedWeapons.find(w => w.equippedSlot === 'off_hand'),
    [equippedWeapons]
  );
  
  return {
    equippedWeapons,
    mainHandWeapon,
    offHandWeapon,
    hasEquippedWeapon: equippedWeapons.length > 0,
  };
}

export function useLightSources() {
  const items = useInventoryStore((state) => state.items);
  const getActiveLightSources = useInventoryStore((state) => state.getActiveLightSources);
  const consumeFuel = useInventoryStore((state) => state.consumeFuel);
  const refillFuel = useInventoryStore((state) => state.refillFuel);
  
  const activeLightSources = useMemo(() => getActiveLightSources(), [items]);
  
  const totalBrightLight = useMemo(() => {
    return Math.max(...activeLightSources.map(item => item.lightSource?.brightLightRadius || 0), 0);
  }, [activeLightSources]);
  
  const totalDimLight = useMemo(() => {
    return Math.max(...activeLightSources.map(item => item.lightSource?.dimLightRadius || 0), 0);
  }, [activeLightSources]);
  
  return {
    activeLightSources,
    totalBrightLight,
    totalDimLight,
    consumeFuel,
    refillFuel,
  };
}

export function useVisionEffects() {
  const items = useInventoryStore((state) => state.items);
  const getActiveVisionEffects = useInventoryStore((state) => state.getActiveVisionEffects);
  const toggleVisionEffect = useInventoryStore((state) => state.toggleVisionEffect);
  
  const activeVisionEffects = useMemo(() => getActiveVisionEffects(), [items]);
  
  const totalDarkvision = useMemo(() => {
    return Math.max(...activeVisionEffects.map(item => item.visionEffect?.darkvision || 0), 0);
  }, [activeVisionEffects]);
  
  const totalTruesight = useMemo(() => {
    return Math.max(...activeVisionEffects.map(item => item.visionEffect?.truesight || 0), 0);
  }, [activeVisionEffects]);
  
  return {
    activeVisionEffects,
    totalDarkvision,
    totalTruesight,
    toggleVisionEffect,
  };
}
