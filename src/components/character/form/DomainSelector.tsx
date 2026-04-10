import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { CLERIC_DOMAINS } from '@/types';
import type { ClericDomain, DomainSpellProfile } from '@/types';
import { DomainRadarChart, DomainRadarCompare } from '@/components/character/DomainRadarChart';

interface DomainSelectorProps {
  currentDomain: ClericDomain | undefined;
  onSelect: (domainId: string) => void;
}

export function DomainSelector({ currentDomain, onSelect }: DomainSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredDomain, setHoveredDomain] = useState<ClericDomain | null>(null);
  
  const displayDomain = hoveredDomain || currentDomain;
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 bg-parchment-dark rounded-lg border border-parchment-dark hover:border-divine-gold transition-colors"
        type="button"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{currentDomain?.icon || '✦'}</span>
          <div className="text-left">
            <p className="font-display text-ink">{currentDomain?.name || 'Choisir...'}</p>
            <p className="text-xs text-ink-muted">{currentDomain?.spellIds.length || 0} sorts de domaine</p>
          </div>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-ink-muted" /> : <ChevronDown className="w-5 h-5 text-ink-muted" />}
      </button>
      
      {isOpen && (
        <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-parchment-light rounded-lg shadow-xl border border-parchment-dark overflow-hidden">
          <div className="max-h-64 overflow-y-auto">
            {CLERIC_DOMAINS.map((domain) => (
              <button
                key={domain.id}
                onClick={() => {
                  onSelect(domain.id);
                  setIsOpen(false);
                }}
                onMouseEnter={() => setHoveredDomain(domain)}
                onMouseLeave={() => setHoveredDomain(null)}
                className={`w-full flex items-start gap-3 p-3 hover:bg-parchment-dark transition-colors text-left ${
                  domain.id === currentDomain?.id ? 'bg-divine-gold/10 border-l-4 border-divine-gold' : ''
                }`}
                type="button"
              >
                <span className="text-2xl">{domain.icon}</span>
                <div>
                  <p className="font-display text-ink">{domain.name}</p>
                  <p className="text-xs text-ink-muted line-clamp-2">{domain.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Diagramme radar affiché quand on survole ou un domaine est sélectionné */}
      {displayDomain && (
        <div className="absolute z-30 left-full top-0 ml-2 bg-parchment-light rounded-xl shadow-2xl border border-parchment-dark p-4 w-[260px]">
          <h4 className="font-display text-sm text-ink mb-2 text-center">
            Profil magique : {displayDomain.name}
          </h4>
          <div className="flex justify-center">
            {hoveredDomain && currentDomain && hoveredDomain.id !== currentDomain.id ? (
              <DomainRadarCompare
                currentProfile={hoveredDomain.spellProfile!}
                compareProfile={currentDomain.spellProfile!}
                currentName={hoveredDomain.name}
                compareName={currentDomain.name}
                size={220}
              />
            ) : (
              <DomainRadarChart 
                profile={displayDomain.spellProfile as NonNullable<DomainSpellProfile>} 
                size={200} 
              />
            )}
          </div>
          <p className="text-xs text-ink-muted mt-2 text-center">
            Profil des sorts de domaine
          </p>
        </div>
      )}
    </div>
  );
}
