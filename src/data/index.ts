export { spellsData } from './spellsData';
export { equipmentData } from './equipmentData';
export { componentMappingData } from './componentMappingData';
export {
  allSpellComponentMappings,
  clericLevel0Components,
  clericLevel1Components,
  clericLevel2Components,
  clericLevel3Components,
  clericLevel4Components,
  clericLevel5Components,
  clericLevel6Components,
  clericLevel7Components,
  clericLevel8Components,
  clericLevel9Components,
  wizardComponents,
  getComponentsForSpell,
  getConsumedComponentsForSpell,
  getComponentsForClass,
  getCriticalComponents,
  calculateComponentsCost,
  getMissingComponents,
  groupComponentsByPriority,
} from './spellComponentMappings';
export { defaultPresets, getPresetById, getDefaultPresets, domainPresets, getDomainPresets, getAllPresetsForCharacter } from './presets';
export { shoppingListItems, getShoppingListWithTotals, getShoppingListByPriority, priorityCategories } from './shoppingListData';
export {
  CHARACTER_IDENTITY,
  CHARACTER_ABILITIES,
  MASTERED_SKILLS,
  CHARACTER_FEATS,
  SPELL_PRESETS,
  STARTING_EQUIPMENT,
  INITIAL_DAILY_STATE,
  createInitialCharacter,
  BACKGROUND_TRAITS,
} from './characterConfig';

export {
  SPELL_CATEGORIES,
  INCANTATION_TEMPLATES,
  getSpellIncantation,
  type SpellCategory,
} from './spellIncantations';
