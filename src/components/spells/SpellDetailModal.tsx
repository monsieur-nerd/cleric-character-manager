import { X, Clock, Target, Sparkles, BookOpen, Zap, Shield, AlertCircle } from 'lucide-react';
import type { Spell } from '@/types';
import { useInventoryStore } from '@/stores';

interface SpellDetailModalProps {
  spell: Spell;
  isOpen: boolean;
  onClose: () => void;
  isPrepared?: boolean;
  onTogglePrepare?: () => void;
}

export function SpellDetailModal({ 
  spell, 
  isOpen, 
  onClose, 
  isPrepared = false,
  onTogglePrepare 
}: SpellDetailModalProps) {
  const hasComponent = useInventoryStore((state) => state.hasComponentForSpell(spell.id));
  const componentData = useInventoryStore((state) => state.getComponentForSpell(spell.id));

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
            <span 
              className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-steel-blue to-blue-900 text-white font-bold text-sm shadow-md"
              style={{ fontFamily: "'Cinzel Decorative', serif" }}
              title={spell.level === 0 ? 'Tour de magie (Mineur)' : `Sort de niveau ${spell.level}`}
            >
              {spell.level === 0 ? 'M' : spell.level}
            </span>
            <span className="badge bg-steel-blue/20 text-steel-blue border border-steel-blue">
              {getSchoolName(spell.school)}
            </span>
            {spell.isDomainSpell && (
              <span className="badge-domain">Sort de domaine</span>
            )}
            {spell.ritual && (
              <span className="badge bg-royal-purple/20 text-royal-purple border border-royal-purple">
                Rituel
              </span>
            )}
            {spell.concentration && (
              <span className="badge bg-bronze/20 text-bronze border border-bronze">
                Concentration
              </span>
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
          {spell.components.material && (
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
          {spell.incantation && (
            <div>
              <h3 className="font-display text-ink mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-divine-gold" />
                Incantation
              </h3>
              <div className="bg-parchment-dark/30 p-4 rounded-lg border-l-4 border-divine-gold italic">
                <p className="text-sm text-ink font-body">"{spell.incantation}"</p>
              </div>
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
                disabled={spell.isDomainSpell}
                className={`w-full py-3 px-4 rounded-lg font-ui font-bold flex items-center justify-center gap-2 transition-all ${
                  spell.isDomainSpell
                    ? 'bg-divine-gold/30 text-ink-muted cursor-not-allowed'
                    : isPrepared
                      ? 'bg-blood-red/10 text-blood-red hover:bg-blood-red/20 border-2 border-blood-red/30'
                      : 'bg-divine-gold text-ink hover:bg-divine-gold-light border-2 border-divine-gold-dark'
                }`}
              >
                {spell.isDomainSpell ? (
                  <><Shield className="w-5 h-5" /> Toujours préparé (domaine)</>
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
    </div>
  );
}
