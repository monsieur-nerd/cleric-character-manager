import { useState, useCallback, useEffect } from 'react';

// Types d'effets d'items
export type ItemEffectType = 
  | 'skill_advantage'      // Avantage sur un test de compétence
  | 'skill_bonus'          // Bonus de +X à un test
  | 'saving_throw_bonus'   // Bonus aux jets de sauvegarde
  | 'movement'             // Bonus/Malus de déplacement
  | 'vision'               // Vision spéciale
  | 'resistance'           // Résistance à un type de dégâts
  | 'temporary_hp'         // PV temporaires
  | 'healing'              // Soins
  | 'other';               // Autre

export interface ItemEffect {
  id: string;
  itemId: string;
  itemName: string;
  type: ItemEffectType;
  description: string;
  skill?: string;              // Pour skill_advantage/bonus
  ability?: string;            // Pour les JS liés à une carac
  bonus?: number;              // Bonus numérique
  damageType?: string;         // Pour résistance
  duration: string;            // Description de la durée
  durationMinutes?: number;    // Durée en minutes (pour auto-expiration)
  usedAt: number;              // Timestamp
}

// Configuration des effets par défaut pour certains items
export const DEFAULT_ITEM_EFFECTS: Record<string, Partial<ItemEffect>> = {
  // Escalade
  'corde-15m': {
    type: 'skill_advantage',
    description: 'Avantage aux tests d\'Athlétisme pour escalader',
    skill: 'Athlétisme',
  },
  'corde-30m': {
    type: 'skill_advantage',
    description: 'Avantage aux tests d\'Athlétisme pour escalader',
    skill: 'Athlétisme',
  },
  'pitons': {
    type: 'skill_bonus',
    description: 'Facilite l\'escalade (avantage si combiné avec corde)',
    skill: 'Athlétisme',
    bonus: 0, // Surtout pour le RP, avantage si corde
  },
  'grappin': {
    type: 'skill_advantage',
    description: 'Avantage pour sécuriser une corde en hauteur',
    skill: 'Athlétisme',
  },
  'matériel-escalade': {
    type: 'skill_bonus',
    description: '+2 aux tests d\'Athlétisme pour escalader',
    skill: 'Athlétisme',
    bonus: 2,
  },
  // Survie
  'torche': {
    type: 'vision',
    description: 'Lumière vive dans un rayon de 6m',
  },
  'lanterne-à-huile': {
    type: 'vision',
    description: 'Lumière vive 9m, faible 18m',
  },
  'silex-et-acier': {
    type: 'other',
    description: 'Permet d\'allumer un feu',
  },
  // Soins
  'trousse-de-soins': {
    type: 'healing',
    description: 'Stabilise une créature à 0 PV',
  },
  'pansements': {
    type: 'temporary_hp',
    description: '+1d4 PV temporaires',
    bonus: 0, // 1d4
  },
  // Furtivité
  'cape-de-dissimulation': {
    type: 'skill_advantage',
    description: 'Avantage en Discrétion dans la nature',
    skill: 'Discrétion',
  },
  // Social
  'vêtements-fins': {
    type: 'skill_bonus',
    description: '+1 en Persuasion lors de réceptions',
    skill: 'Persuasion',
    bonus: 1,
  },
  'déguisement': {
    type: 'skill_advantage',
    description: 'Avantage en Tromperie pour se faire passer pour quelqu\'un d\'autre',
    skill: 'Tromperie',
  },
  // Outils
  'pied-de-biche': {
    type: 'skill_advantage',
    description: 'Avantage en Force pour forcer une porte/coffre',
    ability: 'Force',
  },
  'sac-à-couchage': {
    type: 'other',
    description: 'Confort lors du repos, résistance au froid',
  },
  'tente': {
    type: 'other',
    description: 'Abri, avantage aux jets de sauvegarde contre la faim/le froid',
  },
  // Navigation
  'boussole': {
    type: 'other',
    description: 'Permet de s\'orienter sans test de Survie',
  },
  'cartes': {
    type: 'skill_bonus',
    description: '+2 en Survie pour ne pas se perdre',
    skill: 'Survie',
    bonus: 2,
  },
};

// Hook pour gérer les effets d'items
export function useItemEffects() {
  const [activeEffects, setActiveEffects] = useState<ItemEffect[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cleric-item-effects');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Sauvegarde
  useEffect(() => {
    localStorage.setItem('cleric-item-effects', JSON.stringify(activeEffects));
  }, [activeEffects]);

  // Auto-expiration des effets temporaires
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setActiveEffects(prev => 
        prev.filter(effect => {
          if (!effect.durationMinutes) return true;
          const elapsedMinutes = (now - effect.usedAt) / (1000 * 60);
          return elapsedMinutes < effect.durationMinutes;
        })
      );
    }, 60000); // Check toutes les minutes

    return () => clearInterval(interval);
  }, []);

  const addEffect = useCallback((effect: Omit<ItemEffect, 'id' | 'usedAt'>) => {
    const newEffect: ItemEffect = {
      ...effect,
      id: `${effect.itemId}-${Date.now()}`,
      usedAt: Date.now(),
    };
    setActiveEffects(prev => [...prev, newEffect]);
    return newEffect;
  }, []);

  const removeEffect = useCallback((effectId: string) => {
    setActiveEffects(prev => prev.filter(e => e.id !== effectId));
  }, []);

  const clearAllEffects = useCallback(() => {
    setActiveEffects([]);
  }, []);

  // Helper pour obtenir les effets par type
  const getEffectsByType = useCallback((type: ItemEffectType) => {
    return activeEffects.filter(e => e.type === type);
  }, [activeEffects]);

  // Helper pour les bonus de compétence
  const getSkillBonus = useCallback((skillName: string) => {
    const effects = activeEffects.filter(e => 
      (e.type === 'skill_bonus' || e.type === 'skill_advantage') && 
      e.skill?.toLowerCase() === skillName.toLowerCase()
    );
    
    const hasAdvantage = effects.some(e => e.type === 'skill_advantage');
    const totalBonus = effects.reduce((sum, e) => sum + (e.bonus || 0), 0);
    
    return { hasAdvantage, bonus: totalBonus, effects };
  }, [activeEffects]);

  // Helper pour les jets de sauvegarde
  const getSaveBonus = useCallback((abilityName?: string) => {
    const effects = activeEffects.filter(e => 
      e.type === 'saving_throw_bonus' && 
      (!abilityName || e.ability?.toLowerCase() === abilityName.toLowerCase())
    );
    
    const totalBonus = effects.reduce((sum, e) => sum + (e.bonus || 0), 0);
    return { bonus: totalBonus, effects };
  }, [activeEffects]);

  return {
    activeEffects,
    addEffect,
    removeEffect,
    clearAllEffects,
    getEffectsByType,
    getSkillBonus,
    getSaveBonus,
  };
}
