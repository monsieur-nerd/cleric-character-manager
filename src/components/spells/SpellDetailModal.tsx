import { useState, useMemo } from 'react';
import { X, Clock, Target, Sparkles, BookOpen, Zap, Shield, AlertCircle, Mic, Check, GitBranch, Flame, Recycle, ShoppingCart, Heart } from 'lucide-react';
import { formatPrice } from '@/utils/formatters';
import type { Spell } from '@/types';
import { useInventoryStore, useCharacterStore } from '@/stores';
import { useSpellIncantation, useCanHaveIncantation } from '@/hooks/useSpellIncantation';
import { ConcentrationHelpModal } from './ConcentrationHelpModal';
import { getComponentsForSpell } from '@/data/spellComponentMappings';
import { calculateHealingBonusSimple, isDiscipleOfLifeDomain } from '@/utils/bonusCalculator';

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
  const character = useCharacterStore((state) => state.character);
  
  // Les tours de magie et sorts de domaine sont toujours préparés
  const isCantrip = spell.level === 0;
  const isDomain = isDomainSpell ?? spell.isDomainSpell;
  const isAlwaysPrepared = isDomain || isCantrip;
  const isPreparedEffective = isPrepared || isAlwaysPrepared;
  
  // Calcul du bonus de soin "Disciple de la vie" pour les sorts de soin
  const healingBonus = useMemo(() => {
    const isHealingSpell = spell.type?.includes('Soin') ?? false;
    if (!isHealingSpell || isCantrip) return null;
    
    const hasDiscipleOfLife = isDiscipleOfLifeDomain(character.domain?.id);
    if (!hasDiscipleOfLife) return null;
    
    return calculateHealingBonusSimple(spell.level, character.level, true, false);
  }, [spell, character.domain?.id, character.level, isCantrip]);

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
              <h2 className="font-display text-lg sm:text-xl text-ink break-words leading-tight">{spell.name}</h2>
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
            {/* Badge niveau du sort - style cohérent avec les composants */}
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-arcane-purple/10 text-arcane-purple border border-arcane-purple/20">
              {spell.level === 0 ? 'Sort mineur' : `Sort niv. ${spell.level}`}
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

          {/* Alerte composante - Style ShoppingList */}
          {spell.components.material && componentDetails && (
            <div className="space-y-3">
              <h3 className="font-display text-ink mb-2 flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-divine-gold" />
                Composants nécessaires
              </h3>
              
              {componentDetails.map((group, groupIndex) => (
                <div 
                  key={group.groupId || `required-${groupIndex}`}
                  className={`p-3 rounded-lg border ${
                    group.isAlternative 
                      ? 'bg-arcane-purple/5 border-arcane-purple/20' 
                      : 'bg-parchment-light border-parchment-dark'
                  }`}
                >
                  {/* Indicateur d'alternative */}
                  {group.isAlternative && (
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-arcane-purple/20">
                      <GitBranch className="w-4 h-4 text-arcane-purple" />
                      <span className="text-xs text-arcane-purple font-medium">
                        Alternative - Une seule option nécessaire
                      </span>
                    </div>
                  )}
                  
                  {/* Liste des composants */}
                  <div className="space-y-2">
                    {group.components.map(comp => {
                      const isComplete = comp.isAvailable;
                      const isLow = comp.currentQty > 0 && comp.currentQty < comp.quantity;
                      
                      return (
                        <div 
                          key={comp.itemId}
                          className={`p-2 rounded ${
                            isComplete 
                              ? 'bg-forest/5 border border-forest/20' 
                              : isLow
                                ? 'bg-bronze/5 border border-bronze/20'
                                : 'bg-blood-red/5 border border-blood-red/20'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className={`font-display text-sm ${
                                  isComplete ? 'text-ink' : 'text-ink'
                                }`}>
                                  {comp.itemName}
                                </span>
                                
                                {/* Badge consommable */}
                                {comp.consumed && (
                                  <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-blood-red/10 text-blood-red">
                                    <Flame className="w-3 h-3" />
                                    Consommé
                                  </span>
                                )}
                                
                                {/* Badge réutilisable */}
                                {!comp.consumed && (
                                  <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-forest/10 text-forest">
                                    <Recycle className="w-3 h-3" />
                                    Réutilisable
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            {/* Stock */}
                            <div className="flex items-center gap-2 text-xs">
                              <span className={isComplete ? 'text-forest' : isLow ? 'text-bronze' : 'text-blood-red'}>
                                Stock: {comp.currentQty}/{comp.quantity}
                              </span>
                              {isComplete && <Check className="w-4 h-4 text-forest" />}
                              {!isComplete && !isLow && <AlertCircle className="w-4 h-4 text-blood-red" />}
                              {isLow && <AlertCircle className="w-4 h-4 text-bronze" />}
                            </div>
                          </div>
                          
                          {/* Prix si disponible */}
                          {comp.price > 0 && (
                            <div className="mt-1 text-xs text-ink-light">
                              Prix: {formatPrice(comp.price)}/u
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              
              {spell.components.materialConsumed && (
                <p className="text-xs text-ink-muted">
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

          {/* Bonus Disciple de la vie */}
          {healingBonus && healingBonus.totalBonus > 0 && (
            <div>
              <h3 className="font-display text-ink mb-2 flex items-center gap-2">
                <Heart className="w-4 h-4 text-forest" />
                Bonus de soin
              </h3>
              <div className="bg-forest/10 p-4 rounded-lg border border-forest/30">
                <p className="text-sm text-forest font-medium mb-1">
                  +{healingBonus.totalBonus} PV soignés
                </p>
                {healingBonus.breakdown.map((line, idx) => (
                  <p key={idx} className="text-xs text-forest/80">{line}</p>
                ))}
                <p className="text-xs text-ink-muted mt-2 italic">
                  Appliqué automatiquement lorsque vous lancez ce sort de soin.
                </p>
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
