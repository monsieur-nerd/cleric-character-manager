import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, RotateCcw, Sword, Flame, Skull, Compass, Shield, Star, Heart, Scroll, Sparkles, CloudLightning, Droplets, Snowflake, Zap, X, AlertTriangle } from 'lucide-react';
import { useSpellStore, useCharacterStore } from '@/stores';
import { SpellCard } from '@/components/spells/SpellCard';
import { defaultPresets, getKimiRecommendedSpells } from '@/data/presets';
import type { Spell } from '@/types';

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
  'vs-elements': <Shield className="w-5 h-5 text-rainbow" />,
  'vs-undead': <Skull className="w-5 h-5 text-gray-600" />,
  'support': <Shield className="w-5 h-5 text-forest" />,
  'exploration': <Compass className="w-5 h-5 text-royal-purple" />,
  'anti-mage': <Scroll className="w-5 h-5 text-steel-blue" />,
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
};

/**
 * Compte combien de sorts d'un preset seront réellement sélectionnés
 * en fonction du maxPrepared du personnage
 */
function getPresetSelectionCount(presetSpellIds: string[], maxPrepared: number, allSpells: Spell[]): number {
  // Filtre les sorts de domaine (toujours préparés, pas comptés dans la limite)
  const nonDomainSpells = presetSpellIds.filter(id => {
    const spell = allSpells.find(s => s.id === id);
    return spell && !spell.isDomainSpell;
  });
  
  // Retourne le minimum entre les sorts disponibles et la limite
  return Math.min(nonDomainSpells.length, maxPrepared);
}

/**
 * Obtient la liste des sorts qui seront réellement sélectionnés
 */
function getSelectedSpellNames(presetSpellIds: string[], maxPrepared: number, allSpells: Spell[]): string[] {
  const nonDomainSpells = presetSpellIds
    .map(id => allSpells.find(s => s.id === id))
    .filter((s): s is Spell => !!s && !s.isDomainSpell)
    .slice(0, maxPrepared);
  
  return nonDomainSpells.map(s => s.name);
}

export function PreparationPage() {
  const character = useCharacterStore((state) => state.character);
  const maxPrepared = character.maxPreparedSpells;
  
  const allSpells = useSpellStore((state) => state.allSpells);
  const preparedSpellIds = useSpellStore((state) => state.preparedSpellIds);
  const toggleSpellPrepared = useSpellStore((state) => state.toggleSpellPrepared);
  const prepareMultipleSpells = useSpellStore((state) => state.prepareMultipleSpells);
  const resetDaily = useSpellStore((state) => state.resetDaily);
  
  const [showKimiTips, setShowKimiTips] = useState(false);
  const [showPresetDetails, setShowPresetDetails] = useState<string | null>(null);
  const [activePresetId, setActivePresetId] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  
  const domainSpells = allSpells.filter(s => s.isDomainSpell);
  const nonDomainPrepared = allSpells.filter(s => 
    preparedSpellIds.includes(s.id) && !s.isDomainSpell
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
        <div className="text-xs text-ink-muted mt-2 pt-2 border-t border-divine-gold/20">
          + {domainSpells.length} sorts de domaine (toujours préparés gratuitement)
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
      <section>
        <h3 className="font-display text-lg text-ink mb-3 flex flex-wrap items-center gap-2">
          <Sparkles className="w-5 h-5 text-divine-gold" />
          <span>Préréglages intelligents</span>
          <span className="text-xs font-normal text-ink-muted ml-auto sm:ml-0">
            Sélectionne automatiquement {maxPrepared} sorts
          </span>
        </h3>
        
        <div className="grid grid-cols-1 gap-2">
          {defaultPresets.map((preset) => {
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
      <section>
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
      
      {/* Sorts à choisir */}
      <section>
        <h3 className="font-display text-lg text-ink mb-2">
          Choisir {remainingSlots} sort{remainingSlots > 1 ? 's' : ''}
        </h3>
        
        <div className="space-y-2">
          {allSpells
            .filter((s: Spell) => !s.isDomainSpell)
            .map((spell: Spell) => (
              <SpellCard
                key={spell.id}
                spell={spell}
                isPrepared={preparedSpellIds.includes(spell.id)}
                onTogglePrepare={() => toggleSpellPrepared(spell.id)}
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
