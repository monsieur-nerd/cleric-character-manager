import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, RotateCcw, Sword, Flame, Skull, Compass, Shield, Star, Heart, Scroll, Sparkles, CloudLightning, Droplets, Snowflake, Zap, X, AlertTriangle, Sun, Leaf, BookOpen, Ghost, Hammer, Coffee, Users, Edit3, Save, Plus, Trash2, GripVertical, Edit } from 'lucide-react';
import { useSpellStore, useCharacterStore, usePresetStore } from '@/stores';
import { SpellCard } from '@/components/spells/SpellCard';
import { defaultPresets, getKimiRecommendedSpells, getDomainPresets } from '@/data/presets';
import type { Spell, SpellPreset } from '@/types';

const presetIcons: Record<string, React.ReactNode> = {
  'kimi-optimal': <Star className="w-5 h-5 text-divine-gold fill-divine-gold" />,
  'survie': <Heart className="w-5 h-5 text-blood-red" />,
  'combat-agressif': <Sword className="w-5 h-5 text-bronze" />,
  'vs-fire': <Flame className="w-5 h-5 text-orange-500" />,
  'vs-cold': <Snowflake className="w-5 h-5 text-blue-400" />,
  'vs-lightning': <Zap className="w-5 h-5 text-yellow-400" />,
  'vs-acid': <Droplets className="w-5 h-5 text-green-500" />,
  'vs-thunder': <CloudLightning className="w-5 h-5 text-purple-400" />,
  'vs-poison': <Skull className="w-5 h-5 text-lime-600" />,
  'vs-elements': <Shield className="w-5 h-5 text-teal-500" />,
  'vs-undead': <Skull className="w-5 h-5 text-gray-600" />,
  'support': <Shield className="w-5 h-5 text-forest" />,
  'exploration': <Compass className="w-5 h-5 text-royal-purple" />,
  'anti-mage': <Scroll className="w-5 h-5 text-steel-blue" />,
  // Domain-specific preset icons
  'war-tactician': <Sword className="w-5 h-5 text-red-500" />,
  'war-divine-striker': <Hammer className="w-5 h-5 text-orange-600" />,
  'life-divine-healer': <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />,
  'life-restoration': <Sparkles className="w-5 h-5 text-cyan-400" />,
  'light-radiant-damage': <Sun className="w-5 h-5 text-yellow-500 fill-yellow-500" />,
  'light-destroy-undead': <Skull className="w-5 h-5 text-yellow-700" />,
  'nature-elemental-control': <Leaf className="w-5 h-5 text-green-600" />,
  'nature-explorer': <Compass className="w-5 h-5 text-emerald-600" />,
  'tempest-storm-master': <CloudLightning className="w-5 h-5 text-purple-600" />,
  'tempest-fury': <Zap className="w-5 h-5 text-indigo-500 fill-indigo-500" />,
  'trickery-shadow': <Ghost className="w-5 h-5 text-slate-500" />,
  'trickery-deceiver': <Ghost className="w-5 h-5 text-purple-800" />,
  'knowledge-seeker': <BookOpen className="w-5 h-5 text-amber-600" />,
  'knowledge-strategist': <BookOpen className="w-5 h-5 text-blue-600" />,
  'forge-master': <Hammer className="w-5 h-5 text-red-700" />,
  'forge-fire-warrior': <Flame className="w-5 h-5 text-red-600 fill-red-600" />,
  'grave-keeper': <Coffee className="w-5 h-5 text-stone-600" />,
  'grave-death-watcher': <Skull className="w-5 h-5 text-stone-800" />,
  'social-investigation': <Users className="w-5 h-5 text-indigo-500" />,
  'custom-user': <Edit3 className="w-5 h-5 text-pink-500" />,
};

const presetColors: Record<string, string> = {
  'kimi-optimal': 'border-divine-gold bg-divine-gold/10',
  'survie': 'border-blood-red bg-blood-red/5',
  'combat-agressif': 'border-bronze bg-bronze/5',
  'vs-fire': 'border-orange-500 bg-orange-500/5',
  'vs-cold': 'border-blue-400 bg-blue-400/5',
  'vs-lightning': 'border-yellow-400 bg-yellow-400/5',
  'vs-acid': 'border-green-500 bg-green-500/5',
  'vs-thunder': 'border-purple-400 bg-purple-400/5',
  'vs-poison': 'border-lime-600 bg-lime-600/5',
  'vs-elements': 'border-teal-500 bg-teal-500/5',
  'vs-undead': 'border-gray-500 bg-gray-500/5',
  'support': 'border-forest bg-forest/5',
  'exploration': 'border-royal-purple bg-royal-purple/5',
  'anti-mage': 'border-steel-blue bg-steel-blue/5',
  // Domain-specific preset colors
  'war-tactician': 'border-red-500 bg-red-500/10',
  'war-divine-striker': 'border-orange-600 bg-orange-600/10',
  'life-divine-healer': 'border-pink-500 bg-pink-500/10',
  'life-restoration': 'border-cyan-400 bg-cyan-400/10',
  'light-radiant-damage': 'border-yellow-500 bg-yellow-500/10',
  'light-destroy-undead': 'border-yellow-700 bg-yellow-700/10',
  'nature-elemental-control': 'border-green-600 bg-green-600/10',
  'nature-explorer': 'border-emerald-600 bg-emerald-600/10',
  'tempest-storm-master': 'border-purple-600 bg-purple-600/10',
  'tempest-fury': 'border-indigo-500 bg-indigo-500/10',
  'trickery-shadow': 'border-slate-500 bg-slate-500/10',
  'trickery-deceiver': 'border-purple-800 bg-purple-800/10',
  'knowledge-seeker': 'border-amber-600 bg-amber-600/10',
  'knowledge-strategist': 'border-blue-600 bg-blue-600/10',
  'forge-master': 'border-red-700 bg-red-700/10',
  'forge-fire-warrior': 'border-red-600 bg-red-600/10',
  'grave-keeper': 'border-stone-600 bg-stone-600/10',
  'grave-death-watcher': 'border-stone-800 bg-stone-800/10',
  'social-investigation': 'border-indigo-500 bg-indigo-500/10',
  'custom-user': 'border-pink-500 bg-pink-500/10',
};

/**
 * Compte combien de sorts d'un preset seront réellement sélectionnés
 * en fonction du maxPrepared du personnage
 */
function getPresetSelectionCount(presetSpellIds: string[], maxPrepared: number, allSpells: Spell[]): number {
  // Filtre les sorts de domaine ET les sorts mineurs (niveau 0)
  // Ces sorts ne comptent pas dans la limite de préparation
  const nonDomainNonCantripSpells = presetSpellIds.filter(id => {
    const spell = allSpells.find(s => s.id === id);
    return spell && !spell.isDomainSpell && spell.level > 0;
  });
  
  // Retourne le minimum entre les sorts disponibles et la limite
  return Math.min(nonDomainNonCantripSpells.length, maxPrepared);
}

/**
 * Obtient la liste des sorts qui seront réellement sélectionnés
 */
function getSelectedSpellNames(presetSpellIds: string[], maxPrepared: number, allSpells: Spell[]): string[] {
  const nonDomainNonCantripSpells = presetSpellIds
    .map(id => allSpells.find(s => s.id === id))
    .filter((s): s is Spell => !!s && !s.isDomainSpell && s.level > 0)
    .slice(0, maxPrepared);
  
  return nonDomainNonCantripSpells.map(s => s.name);
}

export function PreparationPage() {
  const character = useCharacterStore((state) => state.character);
  const maxPrepared = character.maxPreparedSpells;
  
  // Get domain-specific presets if character has a domain
  const domainPresets = character.domain ? getDomainPresets(character.domain.id) : [];
  
  // Get custom preset from store
  const customPreset = usePresetStore((state) => state.customPreset);
  const isEditingCustom = usePresetStore((state) => state.isEditingCustom);
  const setEditMode = usePresetStore((state) => state.setEditMode);
  const addSpellToCustom = usePresetStore((state) => state.addSpellToCustom);
  const removeSpellFromCustom = usePresetStore((state) => state.removeSpellFromCustom);
  const moveSpellInCustom = usePresetStore((state) => state.moveSpellInCustom);
  const updateCustomPresetDetails = usePresetStore((state) => state.updateCustomPresetDetails);
  const resetCustomPreset = usePresetStore((state) => state.resetCustomPreset);
  
  // Combine all presets including custom
  const allPresets: SpellPreset[] = [
    ...defaultPresets, 
    ...(customPreset ? [customPreset] : []),
    ...domainPresets
  ];
  
  const allSpells = useSpellStore((state) => state.allSpells);
  const preparedSpellIds = useSpellStore((state) => state.preparedSpellIds);
  const toggleSpellPrepared = useSpellStore((state) => state.toggleSpellPrepared);
  const prepareMultipleSpells = useSpellStore((state) => state.prepareMultipleSpells);
  const clearNonDomainPrepared = useSpellStore((state) => state.clearNonDomainPrepared);
  const resetDaily = useSpellStore((state) => state.resetDaily);
  
  const [showKimiTips, setShowKimiTips] = useState(false);
  const [showPresetDetails, setShowPresetDetails] = useState<string | null>(null);
  const [activePresetId, setActivePresetId] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  
  const domainSpells = allSpells.filter(s => s.isDomainSpell);
  const nonDomainPrepared = allSpells.filter(s => 
    preparedSpellIds.includes(s.id) && !s.isDomainSpell && s.level > 0
  );
  
  const preparedCount = nonDomainPrepared.length;
  const remainingSlots = maxPrepared - preparedCount;
  
  const handleApplyPreset = (preset: typeof defaultPresets[0]) => {
    prepareMultipleSpells(preset.spellIds, maxPrepared);
    setActivePresetId(preset.id);
    setShowPresetDetails(null);
    
    // Réinitialise l'indicateur visuel après 2 secondes
    setTimeout(() => setActivePresetId(null), 2000);
  };
  
  const handleReset = () => {
    setShowResetConfirm(true);
  };
  
  const confirmReset = () => {
    resetDaily(character.level);
    setShowResetConfirm(false);
  };

  // Récupère les détails des sorts du preset Kimi
  const kimRecommended = getKimiRecommendedSpells();
  const kimSpells = kimRecommended.map(r => ({
    ...r,
    spell: allSpells.find(s => s.id === r.id)
  })).filter(r => r.spell);

  return (
    <div className="p-4 space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Link to="/" className="p-2 hover:bg-parchment-dark rounded-lg">
          <ArrowLeft className="w-5 h-5 text-ink" />
        </Link>
        <h2 className="font-display text-xl text-ink">Préparation des sorts</h2>
      </div>
      
      {/* Compteur principal */}
      <div className="card bg-divine-gold/10 border-divine-gold/30">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-ink-light block">Sorts préparables</span>
            <span className="text-xs text-ink-muted">
              Sagesse {character.wisdom} (mod +{character.wisdomModifier}) + Niveau {character.level}
            </span>
          </div>
          <span className={`font-display text-3xl ${
            remainingSlots === 0 ? 'text-forest' : 'text-ink'
          }`}>
            {preparedCount} / {maxPrepared}
          </span>
        </div>
        <div className="text-xs text-ink-muted mt-2 pt-2 border-t border-divine-gold/20 flex justify-between items-center">
          <span>+ {domainSpells.length} sorts de domaine (toujours préparés gratuitement)</span>
          {preparedCount > maxPrepared && (
            <button
              onClick={() => {
                if (confirm('⚠️ URGENCE : Vider complètement le stockage des sorts ?')) {
                  localStorage.removeItem('v2-cleric-spell-store');
                  window.location.reload();
                }
              }}
              className="text-xs bg-blood-red text-white px-2 py-1 rounded hover:bg-blood-red-dark transition-colors"
            >
              🚨 RESET URGENCE
            </button>
          )}
        </div>
      </div>
      
      {/* Bouton réinitialiser en haut */}
      <button
        onClick={handleReset}
        className="w-full btn-danger flex items-center justify-center gap-2 mb-2"
      >
        <RotateCcw className="w-4 h-4" />
        Réinitialiser (repos long)
      </button>

      {/* Section Préréglages */}
      <section className="pt-6">
        <h3 className="font-display text-lg text-ink mb-3 flex flex-wrap items-center gap-2">
          <Sparkles className="w-5 h-5 text-divine-gold" />
          <span>Préréglages intelligents</span>
          {character.domain && (
            <span className="text-xs font-normal text-divine-gold bg-divine-gold/10 px-2 py-0.5 rounded-full">
              + {character.domain.name}
            </span>
          )}
          <span className="text-xs font-normal text-ink-muted ml-auto sm:ml-0">
            Sélectionne {maxPrepared} sorts
          </span>
        </h3>
        
        <div className="grid grid-cols-1 gap-2">
          {allPresets.map((preset) => {
            const selectionCount = getPresetSelectionCount(preset.spellIds, maxPrepared, allSpells);
            const isExpanded = showPresetDetails === preset.id;
            const isActive = activePresetId === preset.id;
            
            return (
              <div
                key={preset.id}
                className={`card overflow-hidden transition-all duration-150 cursor-pointer
                  hover:shadow-xl hover:scale-[1.02] hover:-translate-y-0.5
                  active:scale-[0.98] active:translate-y-0 active:shadow-inner
                  ${isActive 
                    ? 'border-forest bg-forest/20 shadow-lg' 
                    : presetColors[preset.id] || 'border-parchment-dark hover:bg-parchment-light'
                  }
                `}
              >
                {/* Header du preset */}
                <button
                  onClick={() => setShowPresetDetails(isExpanded ? null : preset.id)}
                  className="w-full text-left p-1"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {presetIcons[preset.id] || <Shield className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display text-ink font-bold break-words leading-tight text-sm sm:text-base">
                        {preset.name}
                      </h4>
                      <p className="text-xs text-ink-muted line-clamp-1">
                        {preset.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        selectionCount === maxPrepared 
                          ? 'bg-forest/20 text-forest' 
                          : 'bg-bronze/20 text-bronze'
                      }`}>
                        {selectionCount}/{maxPrepared}
                      </span>
                      <span className="text-ink-muted">{isExpanded ? '▲' : '▼'}</span>
                    </div>
                  </div>
                </button>
                
                {/* Détails du preset (expandable) */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-parchment-dark animate-slide-up">
                    {/* Interface spéciale pour le preset custom */}
                    {preset.id === 'custom-user' ? (
                      <CustomPresetEditor 
                        preset={preset}
                        allSpells={allSpells}
                        maxPrepared={maxPrepared}
                        isEditing={isEditingCustom}
                        onToggleEdit={() => setEditMode(!isEditingCustom)}
                        onAddSpell={addSpellToCustom}
                        onRemoveSpell={removeSpellFromCustom}
                        onMoveSpell={moveSpellInCustom}
                        onUpdateDetails={updateCustomPresetDetails}
                        onReset={resetCustomPreset}
                        onApply={() => handleApplyPreset(preset)}
                        isActive={isActive}
                      />
                    ) : (
                      <>
                        <p className="text-xs text-ink-muted mb-2">
                          Sorts qui seront sélectionnés ({selectionCount} sur {maxPrepared}):
                        </p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {getSelectedSpellNames(preset.spellIds, maxPrepared, allSpells).map((name, i) => (
                            <span 
                              key={i} 
                              className="text-xs bg-parchment-dark px-2 py-1 rounded text-ink"
                            >
                              {name}
                            </span>
                          ))}
                          {selectionCount < maxPrepared && (
                            <span className="text-xs bg-bronze/20 text-bronze px-2 py-1 rounded">
                              +{maxPrepared - selectionCount} sorts libres
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => handleApplyPreset(preset)}
                          className="w-full bg-divine-gold hover:bg-divine-gold-light active:bg-divine-gold-dark 
                            text-ink font-bold py-3 px-4 rounded-lg 
                            transform transition-all duration-100
                            hover:shadow-lg hover:scale-[1.02]
                            active:scale-[0.98] active:shadow-inner
                            flex items-center justify-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          {isActive ? '✓ Appliqué !' : `Appliquer ce préréglage (${selectionCount} sorts)`}
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Explications du choix optimal */}
      <div className="card bg-divine-gold/5 border-divine-gold/20">
        <button
          onClick={() => setShowKimiTips(!showKimiTips)}
          className="w-full flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-divine-gold fill-divine-gold" />
            <span className="font-display text-ink">Pourquoi ces sorts ?</span>
          </div>
          <span className="text-ink-muted">{showKimiTips ? '▲' : '▼'}</span>
        </button>
        
        {showKimiTips && (
          <div className="mt-3 space-y-2 pt-3 border-t border-divine-gold/20">
            {kimSpells.slice(0, maxPrepared).map(({ spell, reason, priority }) => (
              <div key={spell!.id} className="flex items-start gap-2 text-sm">
                <span className="text-divine-gold font-bold">{priority}.</span>
                <div>
                  <span className="font-bold text-ink">{spell!.name}</span>
                  <span className="text-ink-light"> — {reason}</span>
                </div>
              </div>
            ))}
            {maxPrepared > kimSpells.length && (
              <p className="text-xs text-ink-muted italic">
                Tu as un haut score de Sagesse ! Ajoute des sorts selon la situation.
              </p>
            )}
          </div>
        )}
      </div>
      
      {/* Sorts de domaine */}
      <section className="pt-6">
        <h3 className="font-display text-lg text-ink mb-2 flex items-center gap-2">
          <span className="text-divine-gold">⚔️</span>
          Sorts de domaine (toujours préparés)
        </h3>
        <div className="space-y-2">
          {domainSpells.map((spell: Spell) => (
            <SpellCard
              key={spell.id}
              spell={spell}
              isPrepared={true}
              onTogglePrepare={() => {}}
              showActions={false}
            />
          ))}
        </div>
      </section>
      
      {/* Tours de magie (mineurs) */}
      <section className="pt-6">
        <h3 className="font-display text-lg text-ink mb-1 flex items-center gap-2">
          <span className="text-steel-blue">✦</span>
          Tours de magie
        </h3>
        <p className="text-xs text-ink-muted mb-3 italic">
          Ces sorts mineurs sont toujours connus et disponibles sans préparation ni emplacement de sort.
        </p>
        <div className="space-y-2">
          {allSpells
            .filter((s: Spell) => s.level === 0)
            .map((spell: Spell) => (
              <SpellCard
                key={spell.id}
                spell={spell}
                isPrepared={true}
                onTogglePrepare={() => {}}
                showActions={false}
              />
            ))}
        </div>
      </section>
      
      {/* Sorts à choisir */}
      <section className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-display text-lg text-ink">
            {remainingSlots === 0 ? (
              <span className="text-forest flex items-center gap-2">
                <Check className="w-5 h-5" />
                Tous les sorts sont choisis
              </span>
            ) : (
              <>Choisir {remainingSlots} sort{remainingSlots > 1 ? 's' : ''}</>
            )}
          </h3>
          {preparedCount > 0 && (
            <button
              onClick={() => clearNonDomainPrepared()}
              className="text-xs text-ink-muted hover:text-blood-red flex items-center gap-1 px-2 py-1 rounded hover:bg-blood-red/10 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Tout désélectionner
            </button>
          )}
        </div>
        
        <div className="space-y-2">
          {allSpells
            .filter((s: Spell) => !s.isDomainSpell && s.level > 0)
            .map((spell: Spell) => (
              <SpellCard
                key={spell.id}
                spell={spell}
                isPrepared={preparedSpellIds.includes(spell.id)}
                onTogglePrepare={() => toggleSpellPrepared(spell.id, maxPrepared)}
              />
            ))}
        </div>
      </section>
      
      {/* Bouton réinitialiser */}
      <button
        onClick={handleReset}
        className="w-full btn-danger flex items-center justify-center gap-2"
      >
        <RotateCcw className="w-4 h-4" />
        Réinitialiser (repos long)
      </button>
      
      {/* Modale de confirmation de réinitialisation */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm" 
            onClick={() => setShowResetConfirm(false)} 
          />
          
          <div className="relative bg-parchment-light w-full max-w-md rounded-xl shadow-2xl border border-parchment-dark overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-parchment-dark bg-blood-red/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blood-red/20 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-blood-red" />
                </div>
                <h2 className="font-display text-lg text-ink">Confirmer la réinitialisation</h2>
              </div>
              <button 
                onClick={() => setShowResetConfirm(false)} 
                className="p-2 hover:bg-parchment-dark rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-ink" />
              </button>
            </div>
            
            {/* Body */}
            <div className="p-6 space-y-4">
              <p className="text-ink-light">
                Voulez-vous réinitialiser tous les sorts préparés ? Cette action effectue un <strong>repos long</strong> et :
              </p>
              <ul className="text-sm text-ink-muted list-disc list-inside space-y-1">
                <li>Désélectionne tous les sorts préparés</li>
                <li>Restaure tous les emplacements de sorts</li>
                <li>Réinitialise les capacités utilisées</li>
              </ul>
            </div>
            
            {/* Footer */}
            <div className="flex gap-3 p-4 border-t border-parchment-dark bg-parchment-dark/10">
              <button 
                onClick={() => setShowResetConfirm(false)} 
                className="flex-1 btn-secondary"
              >
                Annuler
              </button>
              <button 
                onClick={confirmReset} 
                className="flex-1 btn-danger"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Composant d'édition du preset custom
interface CustomPresetEditorProps {
  preset: SpellPreset;
  allSpells: Spell[];
  maxPrepared: number;
  isEditing: boolean;
  onToggleEdit: () => void;
  onAddSpell: (spellId: string) => void;
  onRemoveSpell: (spellId: string) => void;
  onMoveSpell: (fromIndex: number, toIndex: number) => void;
  onUpdateDetails: (name: string, description: string) => void;
  onReset: () => void;
  onApply: () => void;
  isActive: boolean;
}

function CustomPresetEditor({
  preset,
  allSpells,
  maxPrepared,
  isEditing,
  onToggleEdit,
  onAddSpell,
  onRemoveSpell,
  onMoveSpell,
  onUpdateDetails,
  onReset,
  onApply,
  isActive,
}: CustomPresetEditorProps) {
  const [editName, setEditName] = useState(preset.name);
  const [editDesc, setEditDesc] = useState(preset.description);
  const [showAddSpells, setShowAddSpells] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  // Sauvegarder les modifications du nom/description
  const handleSaveDetails = () => {
    onUpdateDetails(editName, editDesc);
  };

  // Annuler l'édition
  const handleCancelEdit = () => {
    setEditName(preset.name);
    setEditDesc(preset.description);
    onToggleEdit();
  };

  // Réinitialiser le preset
  const handleReset = () => {
    if (confirm('Voulez-vous vraiment réinitialiser votre préréglage personnalisé ?')) {
      onReset();
      setEditName('✏️ Mon Préréglage');
      setEditDesc('Votre préréglage personnalisé - modifiez-le librement');
    }
  };

  // Obtenir les sorts du preset avec leurs détails
  const presetSpells = preset.spellIds
    .map(id => allSpells.find(s => s.id === id))
    .filter((s): s is Spell => !!s);

  // Nombre de sorts qui seront sélectionnés
  const selectionCount = Math.min(
    presetSpells.filter(s => !s.isDomainSpell && s.level > 0).length,
    maxPrepared
  );

  // Sorts disponibles à ajouter (tous sauf ceux déjà dans le preset, les sorts de domaine et mineurs)
  const availableSpells = allSpells.filter(
    s => !preset.spellIds.includes(s.id) && !s.isDomainSpell && s.level > 0
  );

  return (
    <div className="space-y-4">
      {/* Mode édition des détails */}
      {isEditing ? (
        <div className="space-y-3 bg-parchment-dark/20 p-3 rounded-lg">
          <div>
            <label className="text-xs font-bold text-ink-light block mb-1">Nom du préréglage</label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full px-3 py-2 rounded border border-parchment-dark bg-parchment-light text-ink text-sm"
              placeholder="Nom de votre préréglage"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-ink-light block mb-1">Description</label>
            <textarea
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              className="w-full px-3 py-2 rounded border border-parchment-dark bg-parchment-light text-ink text-sm resize-none"
              rows={2}
              placeholder="Description de votre préréglage"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSaveDetails}
              className="flex-1 bg-forest hover:bg-forest-dark text-white py-2 px-3 rounded text-sm font-bold flex items-center justify-center gap-1"
            >
              <Save className="w-4 h-4" />
              Sauvegarder
            </button>
            <button
              onClick={handleCancelEdit}
              className="flex-1 bg-parchment-dark hover:bg-parchment-dark/80 text-ink py-2 px-3 rounded text-sm font-bold"
            >
              Annuler
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <p className="text-xs text-ink-muted">
            {preset.spellIds.length} sort{preset.spellIds.length > 1 ? 's' : ''} enregistré
            {preset.spellIds.length > 1 ? 's' : ''} • {selectionCount} sélectionné{selectionCount > 1 ? 's' : ''} sur {maxPrepared}
          </p>
          <div className="flex gap-1">
            <button
              onClick={onToggleEdit}
              className="p-2 hover:bg-parchment-dark rounded text-ink-light hover:text-ink"
              title="Modifier nom et description"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={handleReset}
              className="p-2 hover:bg-blood-red/10 rounded text-ink-light hover:text-blood-red"
              title="Réinitialiser le préréglage"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Liste des sorts du preset */}
      {presetSpells.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-bold text-ink-light mb-2">Sorts dans ce préréglage :</p>
          <div className="max-h-48 overflow-y-auto space-y-1">
            {presetSpells.map((spell, index) => (
              <div
                key={spell.id}
                draggable
                onDragStart={() => setDraggingIndex(index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (draggingIndex !== null && draggingIndex !== index) {
                    onMoveSpell(draggingIndex, index);
                    setDraggingIndex(null);
                  }
                }}
                className={`flex items-center gap-2 p-2 rounded text-sm ${
                  spell.isDomainSpell || spell.level === 0
                    ? 'bg-parchment-dark/30 text-ink-muted'
                    : index < maxPrepared
                    ? 'bg-forest/10 text-forest-dark'
                    : 'bg-parchment-dark/50 text-ink-light'
                }`}
              >
                <GripVertical className="w-4 h-4 text-ink-muted cursor-grab" />
                <span className="flex-1 truncate">{spell.name}</span>
                <span className="text-xs text-ink-muted">N{spell.level}</span>
                <button
                  onClick={() => onRemoveSpell(spell.id)}
                  className="p-1 hover:bg-blood-red/20 rounded text-ink-muted hover:text-blood-red"
                  title="Retirer ce sort"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink-muted italic">
            💡 Glissez-déposez pour réorganiser l'ordre de priorité
          </p>
        </div>
      )}

      {/* Bouton pour ajouter des sorts */}
      {!showAddSpells ? (
        <button
          onClick={() => setShowAddSpells(true)}
          className="w-full py-2 border-2 border-dashed border-parchment-dark hover:border-divine-gold rounded-lg text-ink-muted hover:text-divine-gold text-sm font-bold flex items-center justify-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Ajouter des sorts ({availableSpells.length} disponibles)
        </button>
      ) : (
        <div className="bg-parchment-dark/10 rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-ink">Ajouter des sorts</span>
            <button
              onClick={() => setShowAddSpells(false)}
              className="p-1 hover:bg-parchment-dark rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="max-h-40 overflow-y-auto space-y-1">
            {availableSpells.length === 0 ? (
              <p className="text-sm text-ink-muted italic">Tous les sorts sont déjà dans le préréglage.</p>
            ) : (
              availableSpells
                .sort((a, b) => a.level - b.level || a.name.localeCompare(b.name))
                .map(spell => (
                  <button
                    key={spell.id}
                    onClick={() => onAddSpell(spell.id)}
                    className="w-full flex items-center gap-2 p-2 rounded hover:bg-parchment-dark text-left text-sm"
                  >
                    <Plus className="w-4 h-4 text-forest" />
                    <span className="flex-1">{spell.name}</span>
                    <span className="text-xs text-ink-muted">N{spell.level}</span>
                  </button>
                ))
            )}
          </div>
        </div>
      )}

      {/* Bouton Appliquer */}
      <button
        onClick={onApply}
        disabled={presetSpells.length === 0}
        className="w-full bg-divine-gold hover:bg-divine-gold-light active:bg-divine-gold-dark 
          disabled:opacity-50 disabled:cursor-not-allowed
          text-ink font-bold py-3 px-4 rounded-lg 
          transform transition-all duration-100
          hover:shadow-lg hover:scale-[1.02]
          active:scale-[0.98] active:shadow-inner
          flex items-center justify-center gap-2"
      >
        <Check className="w-4 h-4" />
        {isActive ? '✓ Appliqué !' : `Appliquer ce préréglage (${selectionCount} sorts)`}
      </button>
    </div>
  );
}
