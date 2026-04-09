import { useState } from 'react';
import { Check, Sparkles, Clock, Focus, AlertCircle } from 'lucide-react';
import type { Spell } from '@/types';
import { useInventoryStore } from '@/stores';
import { SpellDetailModal } from './SpellDetailModal';
import { formatCastingTimeShort } from '@/utils/formatters';

interface SpellCardProps {
  spell: Spell;
  isPrepared: boolean;
  onTogglePrepare: () => void;
  showActions?: boolean;
  isDomainSpell?: boolean; // Override pour le calcul du domaine actuel
}

export function SpellCard({ 
  spell, 
  isPrepared, 
  onTogglePrepare,
  showActions = true,
  isDomainSpell,
}: SpellCardProps) {
  const [showDetail, setShowDetail] = useState(false);
  const hasComponent = useInventoryStore((state) => state.hasComponentForSpell(spell.id));
  const summary = spell.summary;
  
  // Utilise la prop si fournie, sinon fallback sur spell.isDomainSpell
  const isDomain = isDomainSpell ?? spell.isDomainSpell;
  const isCantrip = spell.level === 0;
  // Les tours de magie sont toujours considérés comme préparés
  const isPreparedEffective = isPrepared || isDomain || isCantrip;
  const isUsed = spell.isUsed;
  const missingComponent = spell.components.material && !hasComponent;

  return (
    <>
      <div 
        className={`card relative overflow-hidden transition-all duration-150
          hover:shadow-xl
          ${isPreparedEffective 
            ? 'border-divine-gold bg-divine-gold/10 shadow-md hover:bg-divine-gold/15' 
            : 'hover:border-parchment-dark hover:bg-parchment-light'
          } 
          ${isUsed ? 'opacity-50' : ''} 
          ${missingComponent ? 'border-blood-red hover:border-blood-red hover:shadow-red-500/20' : ''}
        `}
      >
        <div className="flex items-start gap-3">
          {/* Checkbox de préparation - zone de clic élargie */}
          {showActions && (
            <div 
              className="flex-shrink-0 p-2 -m-2 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                if (!isDomain && !isCantrip) {
                  onTogglePrepare();
                }
              }}
            >
              <div
                className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                  isDomain || isCantrip
                    ? 'border-divine-gold bg-divine-gold cursor-not-allowed' 
                    : isPrepared
                      ? 'border-divine-gold bg-divine-gold'
                      : 'border-parchment-dark hover:border-divine-gold'
                }`}
              >
                {(isPreparedEffective) && (
                  <Check className="w-4 h-4 text-ink" />
                )}
              </div>
            </div>
          )}
          
          {/* Contenu cliquable pour ouvrir la modale */}
          <div 
            onClick={() => setShowDetail(true)}
            className="flex-1 min-w-0 cursor-pointer"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h4 className={`font-display text-ink font-bold break-words leading-tight text-sm sm:text-base ${isUsed ? 'line-through' : ''}`}>
                  {spell.name}
                </h4>
                {spell.nameEn && (
                  <p className="text-xs text-ink-muted italic">
                    {spell.nameEn}
                  </p>
                )}
              </div>
              
              {/* Badges */}
              <div className="flex flex-wrap gap-1 justify-end flex-shrink-0">
                {isDomain && (
                  <span 
                    className="badge-domain overflow-hidden whitespace-nowrap"
                    title="Sort de domaine - Toujours préparé"
                  >
                    Domaine
                  </span>
                )}
                <span 
                  className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-steel-blue to-blue-900 text-white font-bold text-sm shadow-md"
                  style={{ fontFamily: "'Cinzel', serif" }}
                  title={spell.level === 0 ? 'Tour de magie (Mineur)' : `Sort de niveau ${spell.level}`}
                >
                  {spell.level === 0 ? 'M' : spell.level}
                </span>
              </div>
            </div>
            
            {/* Méta-informations */}
            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-xs text-ink-light">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatCastingTimeShort(spell.castingTime)}
              </span>
              
              {spell.ritual && (
                <span 
                  className="flex items-center gap-1 text-royal-purple"
                  title="Rituel - Peut être lancé sans dépenser d'emplacement (prend 10 minutes de plus)"
                >
                  <Sparkles className="w-3 h-3" />
                  Rituel
                </span>
              )}
              
              {spell.concentration && (
                <span 
                  className="flex items-center gap-1 text-royal-purple"
                  title="Concentration - Le sort se termine si vous lancez un autre sort de concentration ou subissez des dégâts"
                >
                  <Focus className="w-3 h-3" />
                  Conc.
                </span>
              )}
              
              {missingComponent && (
                <span 
                  className="flex items-center gap-1 text-blood-red"
                  title="Composante matérielle manquante - Vous ne pouvez pas lancer ce sort"
                >
                  <AlertCircle className="w-3 h-3" />
                  Comp. manquante
                </span>
              )}
              
              {summary && (
                <span className="font-bold text-ink ml-auto">
                  {summary}
                </span>
              )}
            </div>
            
            {/* Recommandation */}
            {spell.recommendation && (
              <p className={`text-xs mt-1 font-bold ${
                spell.recommendation === 'ESSENTIEL' ? 'text-blood-red' :
                spell.recommendation === 'INDISPENSABLE' ? 'text-bronze' :
                spell.recommendation === 'TRÈS RECOMMANDÉ' ? 'text-forest' :
                'text-ink-muted'
              }`}>
                {spell.recommendation}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Modal de détail */}
      <SpellDetailModal
        spell={spell}
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        isPrepared={isPrepared}
        onTogglePrepare={showActions ? onTogglePrepare : undefined}
        isDomainSpell={isDomain}
      />
    </>
  );
}
