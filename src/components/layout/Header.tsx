import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SaveLoadButton } from './SaveLoadButton';
import { useCharacterStore } from '@/stores';

export function Header() {
  const character = useCharacterStore((state) => state.character);
  const { name, deity } = character;
  
  // Format : "Nom, Clerc de Torm"
  const characterInfo = deity 
    ? `${name}, Clerc de ${deity.name}`
    : `${name}, Clerc`;
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-parchment-dark border-b border-divine-gold/30 z-50">
      <div className="max-w-screen-xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-divine-gold" />
          <h1 className="font-display text-lg text-ink hidden sm:block">
            Cleric Character Manager
          </h1>
          <h1 className="font-display text-lg text-ink sm:hidden">
            CCM
          </h1>
        </Link>
        
        <div className="flex items-center gap-3">
          <span className="text-sm text-ink font-ui hidden md:block truncate max-w-[300px]">
            {characterInfo}
          </span>
          <span className="text-xs text-ink-muted font-ui hidden sm:block md:hidden">
            {name}
          </span>
          <SaveLoadButton />
        </div>
      </div>
    </header>
  );
}
