// hooks/index.ts
export { 
  useEquipment, 
  useEquippedWeapons, 
  useLightSources, 
  useVisionEffects 
} from './useEquipment';

export { 
  useComponentConsumption,
  type ConsumptionResult,
  type NewSpellCheckResult,
} from './useComponentConsumption';

export {
  useItemEffects,
  DEFAULT_ITEM_EFFECTS,
  type ItemEffect,
  type ItemEffectType,
} from './useItemEffects';
