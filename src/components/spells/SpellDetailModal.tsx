import { useState, useMemo } from 'react';
import { X, Clock, Target, Sparkles, BookOpen, Zap, Shield, AlertCircle, Mic, Check, GitBranch } from 'lucide-react';
import type { Spell } from '@/types';
import { useInventoryStore } from '@/stores';
import { useSpellIncantation, useCanHaveIncantation } from '@/hooks/useSpellIncantation';
import { ConcentrationHelpModal } from './ConcentrationHelpModal';
import { getComponentsForSpell } from '@/data/spellComponentMappings';

interface SpellDetailModalProps {
  spell: Spell;
  isOpen: boolean;
  onClose: () => void;
  isPrepared?: boolean;
  onTogglePrepare?: () => void;
  isDomainSpell?: boolean; // Override pour le calcul du domaine actuel
}

export function SpellDetailModal({ 
  spell, 
  isOpen, 
  onClose, 
  isPrepared = false,
  onTogglePrepare,
  isDomainSpell,
}: SpellDetailModalProps) {
  const [showConcentrationHelp, setShowConcentrationHelp] = useState(false);
  const hasComponent = useInventoryStore((state) => state.hasComponentForSpell(spell.id));
  const componentData = useInventoryStore((state) => state.getComponentForSpell(spell.id));
  const inventoryItems = useInventoryStore((state) => state.items);
  const incantation = useSpellIncantation(spell);
  const canHaveIncantation = useCanHaveIncantation(spell);
  
  // Les tours de magie et sorts de domaine sont toujours préparés
  const isCantrip = spell.level === 0;
  const isDomain = isDomainSpell ?? spell.isDomainSpell;
  const isAlwaysPrepared = isDomain || isCantrip;
  const isPreparedEffective = isPrepared || isAlwaysPrepared;

  // Récupère les détails des composants pour ce sort
  const componentDetails = useMemo(() => {
    const mappings = getComponentsForSpell(spell.id);
    if (mappings.length === 0) return null;

    // Regroupe par groupe d'alternatives
    const groups = new Map<string | undefined, typeof mappings>();
    mappings.forEach(m => {
      const groupId = m.alternativeGroupId;
      if (!groups.has(groupId)) {
        groups.set(groupId, []);
      }
      groups.get(groupId)!.push(m);
    });

    return Array.from(groups.entries()).map(([groupId, groupMappings]) => ({
      isAlternative: groupId !== undefined,
      groupId,
      components: groupMappings.map(m => {
        const item = inventoryItems.find(i => i.id === m.itemId);
        const hasQty = item ? item.quantity : 0;
        return {
          ...m,
          currentQty: hasQty,
          isAvailable: hasQty >= m.quantity,
        };
      }),
    }));
  }, [spell.id, inventoryItems]);

  if (!isOpen) return null;

  const getSchoolIcon = (school: string) => {
    switch (school) {
      case 'abjuration': return '🛡️';
      case 'conjuration': return '✨';
      case 'divination': return '🔮';
      case 'enchantment': return '💖';
      case 'evocation': return '⚡';
      case 'illusion': return '🎭';
      case 'necromancy': return '💀';
      case 'transmutation': return '🔄';
      default: return '✨';
    }
  };

  const getSchoolName = (school: string) => {
    const names: Record<string, string> = {
      'abjuration': 'Abjuration',
      'conjuration': 'Invocation',
      'divination': 'Divination',
      'enchantment': 'Enchantement',
      'evocation': 'Évocation',
      'illusion': 'Illusion',
      'necromancy': 'Nécromancie',
      'transmutation': 'Transmutation',
    };
    return names[school] || school;
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-parchment-light w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-t-xl sm:rounded-xl shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-parchment-light border-b border-parchment-dark p-4 flex items-start justify-between gap-3 z-10">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl flex-shrink-0">{getSchoolIcon(spell.school)}</span>
              <h2 className="font-display text-lg sm:text-xl text-ink break-words leading-tight">{spell.name} {spell.level === 0 ? '(M)' : `(${spell.level})`}</h2>
            </div>
            {spell.nameEn && (
              <p className="text-sm text-ink-muted italic">{spell.nameEn}</p>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-parchment-dark rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-ink" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <span 
              className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-steel-blue to-blue-900 text-white font-bold text-sm shadow-md"
              style={{ fontFamily: "'Cinzel', serif" }}
              title={spell.level === 0 ? 'Tour de magie (Mineur)' : `Sort de niveau ${spell.level}`}
            >
              {spell.level === 0 ? 'M' : spell.level}
            </span>
            <span className="badge bg-steel-blue/20 text-steel-blue border border-steel-blue">
              {getSchoolName(spell.school)}
            </span>
            {isDomain && (
              <span className="badge-domain">Sort de domaine</span>
            )}
            {spell.ritual && (
              <span className="badge bg-royal-purple/20 text-royal-purple border border-royal-purple">
                Rituel
              </span>
            )}
            {spell.concentration && (
              <button
                onClick={() => setShowConcentrationHelp(true)}
                className="badge bg-bronze/20 text-bronze border border-bronze hover:bg-bronze/30 transition-colors cursor-pointer"
                title="Cliquez pour voir les règles de concentration"
              >
                Concentration
              </button>
            )}
          </div>

          {/* Recommandation */}
          {spell.recommendation && (
            <div className={`p-3 rounded-lg ${
              spell.recommendation === 'ESSENTIEL' ? 'bg-blood-red/10 border border-blood-red/30' :
              spell.recommendation === 'INDISPENSABLE' ? 'bg-bronze/10 border border-bronze/30' :
              spell.recommendation === 'TRÈS RECOMMANDÉ' ? 'bg-forest/10 border border-forest/30' :
              'bg-parchment-dark/50'
            }`}>
              <span className={`font-bold text-sm ${
                spell.recommendation === 'ESSENTIEL' ? 'text-blood-red' :
                spell.recommendation === 'INDISPENSABLE' ? 'text-bronze' :
                spell.recommendation === 'TRÈS RECOMMANDÉ' ? 'text-forest' :
                'text-ink'
              }`}>
                {spell.recommendation}
              </span>
            </div>
          )}

          {/* Détails techniques */}
          <div className="grid grid-cols-2 gap-3">
            <div className="card p-3">
              <div className="flex items-center gap-2 text-ink-muted mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-ui">Incantation</span>
              </div>
              <p className="text-sm text-ink font-medium">{spell.castingTime}</p>
            </div>

            <div className="card p-3">
              <div className="flex items-center gap-2 text-ink-muted mb-1">
                <Target className="w-4 h-4" />
                <span className="text-xs font-ui">Portée</span>
              </div>
              <p className="text-sm text-ink font-medium">{spell.range}</p>
            </div>

            <div className="card p-3">
              <div className="flex items-center gap-2 text-ink-muted mb-1">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-ui">Durée</span>
              </div>
              <p className="text-sm text-ink font-medium">
                {spell.duration.value || 'Instantanée'}
              </p>
            </div>

            <div className="card p-3">
              <div className="flex items-center gap-2 text-ink-muted mb-1">
                <BookOpen className="w-4 h-4" />
                <span className="text-xs font-ui">Composantes</span>
              </div>
              <p className="text-sm text-ink font-medium">
                {spell.components.verbal && 'V '}
                {spell.components.somatic && 'S '}
                {spell.components.material && `M (${spell.components.material})`}
                {!spell.components.verbal && !spell.components.somatic && !spell.components.material && 'Aucune'}
              </p>
            </div>
          </div>

          {/* Alerte composante */}
          {spell.components.material && componentDetails && (
            <div className={`p-3 rounded-lg ${
              hasComponent ? 'bg-forest/10 border border-forest/30' : 'bg-blood-red/10 border border-blood-red/30'
            }`}>
              <div className="flex items-start gap-2 mb-2">
                <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${hasComponent ? 'text-forest' : 'text-blood-red'}`} />
                <p className={`text-sm font-medium ${hasComponent ? 'text-forest' : 'text-blood-red'}`}>
                  {hasComponent 
                    ? '✓ Composantes disponibles'
                    : '✗ Composantes manquantes'
                  }
                </p>
              </div>
              
              {/* Liste détaillée des composants */}
              <div className="space-y-2 mt-2">
                {componentDetails.map((group, groupIndex) => (
                  <div 
                    key={group.groupId || `required-${groupIndex}`}
                    className={`p-2 rounded ${group.isAlternative ? 'bg-arcane-purple/5 border border-arcane-purple/20' : 'bg-parchment/50'}`}
                  >
                    {group.isAlternative && (
                      <p className="text-xs text-arcane-purple mb-1 flex items-center gap-1">
                        <GitBranch className="w-3 h-3" />
                        Alternative (une seule nécessaire)
                      </p>
                    )}
                    <div className="space-y-1">
                      {group.components.map(comp => (
                        <div 
                          key={comp.itemId}
                          className={`flex items-center justify-between text-sm ${
                            comp.isAvailable ? 'text-forest' : 'text-blood-red'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {comp.isAvailable ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <AlertCircle className="w-4 h-4" />
                            )}
                            <span className={comp.isAvailable ? '' : 'font-medium'}>
                              {comp.itemName}
                            </span>
                            {comp.consumed && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blood-red/10 text-blood-red">
                                Consommé
                              </span>
                            )}
                          </div>
                          <span className="text-xs">
                            {comp.currentQty}/{comp.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              {spell.components.materialConsumed && (
                <p className="text-xs text-ink-muted mt-2 pt-2 border-t border-ink/10">
                  Certains composants sont consommés lors du lancement du sort.
                </p>
              )}
            </div>
          )}
          
          {/* Fallback si pas de mapping mais composante textuelle */}
          {spell.components.material && !componentDetails && (
            <div className={`p-3 rounded-lg flex items-start gap-2 ${
              hasComponent ? 'bg-forest/10 border border-forest/30' : 'bg-blood-red/10 border border-blood-red/30'
            }`}>
              <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${hasComponent ? 'text-forest' : 'text-blood-red'}`} />
              <div>
                <p className={`text-sm font-medium ${hasComponent ? 'text-forest' : 'text-blood-red'}`}>
                  {hasComponent 
                    ? `✓ Composante disponible (${componentData?.item.quantity || 0} en stock)`
                    : `✗ Composante manquante : ${spell.components.material}`
                  }
                </p>
                {spell.components.materialConsumed && (
                  <p className="text-xs text-ink-muted mt-1">
                    Cette composante est consommée lors du lancement du sort.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="font-display text-ink mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-divine-gold" />
              Description
            </h3>
            <div className="bg-parchment p-4 rounded-lg border border-parchment-dark">
              <p className="text-sm text-ink-light whitespace-pre-wrap leading-relaxed">
                {spell.description}
              </p>
            </div>
          </div>

          {/* Effets aux niveaux supérieurs */}
          {spell.higherLevels && (
            <div>
              <h3 className="font-display text-ink mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-divine-gold" />
                Aux niveaux supérieurs
              </h3>
              <div className="bg-divine-gold/5 p-4 rounded-lg border border-divine-gold/20">
                <p className="text-sm text-ink-light">{spell.higherLevels}</p>
              </div>
            </div>
          )}

          {/* Incantation */}
          {canHaveIncantation && (
            <div>
              <h3 className="font-display text-ink mb-2 flex items-center gap-2">
                <Mic className="w-4 h-4 text-divine-gold" />
                Incantation
                {!spell.incantation && (
                  <span className="text-xs text-ink-muted font-normal">(générée selon votre dieu)</span>
                )}
              </h3>
              {incantation ? (
                <div className="bg-parchment-dark/30 p-4 rounded-lg border-l-4 border-divine-gold italic">
                  <p className="text-sm text-ink font-body">"{incantation}"</p>
                </div>
              ) : (
                <div className="bg-parchment-dark/20 p-4 rounded-lg border-l-4 border-ink/20">
                  <p className="text-sm text-ink-muted italic">
                    Ce sort nécessite une incantation, mais aucune n'est définie pour votre dieu.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          {onTogglePrepare && (
            <div className="pt-4 border-t border-parchment-dark">
              <button
                onClick={() => {
                  onTogglePrepare();
                  onClose();
                }}
                disabled={isAlwaysPrepared}
                className={`w-full py-3 px-4 rounded-lg font-ui font-bold flex items-center justify-center gap-2 transition-all ${
                  isAlwaysPrepared
                    ? 'bg-divine-gold/30 text-ink-muted cursor-not-allowed'
                    : isPrepared
                      ? 'bg-blood-red/10 text-blood-red hover:bg-blood-red/20 border-2 border-blood-red/30'
                      : 'bg-divine-gold text-ink hover:bg-divine-gold-light border-2 border-divine-gold-dark'
                }`}
              >
                {isAlwaysPrepared ? (
                  <><Shield className="w-5 h-5" /> {isCantrip ? 'Toujours disponible (tour de magie)' : 'Toujours préparé (domaine)'}</>
                ) : isPrepared ? (
                  <><X className="w-5 h-5" /> Retirer de la préparation</>
                ) : (
                  <><Sparkles className="w-5 h-5" /> Préparer ce sort</>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Modal d'aide concentration */}
      <ConcentrationHelpModal
        isOpen={showConcentrationHelp}
        onClose={() => setShowConcentrationHelp(false)}
      />
    </div>
  );
}
