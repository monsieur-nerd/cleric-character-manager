import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { DEITIES } from '@/types';
import type { Deity } from '@/types';

interface DeitySelectorProps {
  currentDeity: Deity | undefined;
  onSelect: (deityId: string) => void;
}

export function DeitySelector({ currentDeity, onSelect }: DeitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const getDeityImageUrl = (symbol: string | undefined): string => {
    if (!symbol) return '';
    if (symbol.startsWith('images/')) {
      return `/cleric-character-manager/${symbol}`;
    }
    return symbol;
  };
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 bg-parchment-dark rounded-lg border border-parchment-dark hover:border-divine-gold transition-colors"
        type="button"
      >
        <div className="flex items-center gap-3">
          {(currentDeity?.symbol?.startsWith('/') || currentDeity?.symbol?.startsWith('images/')) ? (
            <img 
              src={getDeityImageUrl(currentDeity.symbol)}
              alt={currentDeity.name}
              className="w-8 h-8 object-contain"
            />
          ) : (
            <span className="text-2xl">{currentDeity?.symbol || '⛤'}</span>
          )}
          <div className="text-left">
            <p className="font-display text-ink">{currentDeity?.name || 'Choisir...'}</p>
            <p className="text-xs text-ink-muted">{currentDeity?.title}</p>
          </div>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-ink-muted" /> : <ChevronDown className="w-5 h-5 text-ink-muted" />}
      </button>
      
      {isOpen && (
        <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-parchment-light rounded-lg shadow-xl border border-parchment-dark max-h-64 overflow-y-auto">
          {DEITIES.map((deity: typeof DEITIES[0]) => (
            <button
              key={deity.id}
              onClick={() => {
                onSelect(deity.id);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 p-3 hover:bg-parchment-dark transition-colors text-left ${
                deity.id === currentDeity?.id ? 'bg-divine-gold/10 border-l-4 border-divine-gold' : ''
              }`}
              type="button"
            >
              {(deity.symbol.startsWith('/') || deity.symbol.startsWith('images/')) ? (
                <img 
                  src={getDeityImageUrl(deity.symbol)}
                  alt={deity.name}
                  className="w-8 h-8 object-contain"
                />
              ) : (
                <span className="text-2xl">{deity.symbol}</span>
              )}
              <div>
                <p className="font-display text-ink">{deity.name}</p>
                <p className="text-xs text-ink-muted">{deity.title} • {deity.alignment}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
