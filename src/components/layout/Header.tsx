import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SaveLoadButton } from './SaveLoadButton';
import { useCharacterStore, useModalStore } from '@/stores';

export function Header() {
  const character = useCharacterStore((state) => state.character);
  const openCharacterEditor = useModalStore((state) => state.openCharacterEditor);
  const { name, deity, avatar } = character;
  
  // Format : "Nom, Clerc de Torm"
  const characterInfo = deity 
    ? `${name}, Clerc de ${deity.name}`
    : `${name}, Clerc`;

  // Handle avatar path for GitHub Pages
  const avatarSrc = avatar?.startsWith('images/') 
    ? `/cleric-character-manager/${avatar}` 
    : avatar;
  
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
          {/* Clickable Avatar */}
          <button
            onClick={() => openCharacterEditor('identity')}
            className="flex items-center justify-center group"
            title="Modifier le personnage"
          >
            {avatarSrc ? (
              <img
                src={avatarSrc}
                alt={name}
                className="w-8 h-8 rounded-full object-cover border-2 border-divine-gold/50 group-hover:border-divine-gold transition-colors"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-slate-300 border-2 border-divine-gold/50 group-hover:border-divine-gold transition-colors flex items-center justify-center">
                <span className="text-xs font-bold text-slate-600">
                  {name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </button>

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
