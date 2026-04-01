// import { formatSpellLevel } from '@/utils/formatters';

interface SpellSlotBarProps {
  level: 1 | 2 | 3;
  current: number;
  max: number;
}

export function SpellSlotBar({ level, current, max }: SpellSlotBarProps) {
  const percentage = max > 0 ? (current / max) * 100 : 0;
  const isLow = current <= max * 0.25 && current > 0;
  const isEmpty = current === 0;
  
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-ui text-ink-light w-16">
        Niv {level}
      </span>
      
      <div className="flex-1">
        <div className="spell-slot-bar">
          <div 
            className={`spell-slot-fill transition-all duration-500 ${
              isEmpty ? 'bg-blood-red' : isLow ? 'bg-bronze' : 'bg-divine-gold'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      
      <span className={`text-sm font-ui font-bold w-16 text-right ${
        isEmpty ? 'text-blood-red' : isLow ? 'text-bronze' : 'text-ink'
      }`}>
        {current}/{max}
      </span>
    </div>
  );
}
