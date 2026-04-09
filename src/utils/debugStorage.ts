/**
 * Utilitaire de debug pour le stockage local
 * À utiliser dans la console du navigateur
 */

export function debugSpellStorage() {
  const spellStore = localStorage.getItem('v2-cleric-spell-store');
  if (!spellStore) {
    console.log('❌ Aucun spellStore trouvé dans localStorage');
    return;
  }
  
  const data = JSON.parse(spellStore);
  console.log('=== DEBUG SPELL STORAGE ===');
  console.log('📊 Nombre de sorts préparés:', data.state?.preparedSpellIds?.length || 0);
  console.log('📋 Liste des IDs préparés:', data.state?.preparedSpellIds);
  console.log('🎰 Emplacements de sorts:', data.state?.spellSlots);
  console.log('===========================');
  return data;
}

export function clearPreparedSpells() {
  const spellStore = localStorage.getItem('v2-cleric-spell-store');
  if (!spellStore) return;
  
  const data = JSON.parse(spellStore);
  // Garde seulement les sorts de domaine (qui ont isDomainSpell = true dans allSpells)
  // Mais on ne peut pas filtrer ici car allSpells n'est pas dans le storage persisté
  // Donc on vide tout
  data.state.preparedSpellIds = [];
  localStorage.setItem('v2-cleric-spell-store', JSON.stringify(data));
  console.log('✅ Tous les sorts préparés ont été effacés !');
  console.log('🔄 Rechargez la page pour voir les changements');
}

// Rendre disponible globalement pour la console
if (typeof window !== 'undefined') {
  (window as any).debugSpells = debugSpellStorage;
  (window as any).clearSpells = clearPreparedSpells;
}
