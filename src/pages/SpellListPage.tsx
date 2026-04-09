import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { useSpellStore, useCharacterStore } from '@/stores';
import { Brain } from 'lucide-react';
import { SpellCard } from '@/components/spells/SpellCard';
import { getMaxSpellLevelForCharacter } from '@/types';
import type { Spell } from '@/types';

export function SpellListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<number | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);
  
  const allSpells = useSpellStore((state) => state.allSpells);
  const preparedSpellIds = useSpellStore((state) => state.preparedSpellIds);
  const toggleSpellPrepared = useSpellStore((state) => state.toggleSpellPrepared);
  const character = useCharacterStore((state) => state.character);
  const maxPrepared = character.maxPreparedSpells;
  const currentDomainSpellIds = character.domain?.spellIds || [];
  
  // DEBUG
  console.log('SpellList - Domain:', character.domain?.name, 'spellIds:', currentDomainSpellIds);
  
  // Niveau de sort maximum accessible selon le niveau du personnage
  const maxSpellLevel = getMaxSpellLevelForCharacter(character.level);
  
  // Filtre les sorts (uniquement ceux accessibles selon le niveau et le domaine)
  const filteredSpells = allSpells.filter((spell: Spell) => {
    // Filtre par niveau maximum accessible
    if (spell.level > maxSpellLevel) {
      return false;
    }
    // Filtre recherche
    if (searchQuery && !(spell.name || '').toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filtre niveau
    if (selectedLevel !== 'all' && spell.level !== selectedLevel) {
      return false;
    }
    
    // IMPORTANT: Filtre les sorts de domaine qui ne sont pas du domaine du personnage
    // Les sorts avec isDomainSpell: true ne sont visibles que si ils sont dans le domaine actuel
    if (spell.isDomainSpell && !currentDomainSpellIds.includes(spell.id)) {
      // DEBUG
      if (spell.name === 'Boule de feu' || spell.name === 'Marche sur l\'eau') {
        console.log('Filtered out:', spell.name, 'isDomainSpell:', spell.isDomainSpell, 'inDomain:', currentDomainSpellIds.includes(spell.id));
      }
      return false;
    }
    
    return true;
  });
  
  // Groupe par niveau
  const spellsByLevel = filteredSpells.reduce((acc, spell) => {
    const level = spell.level;
    if (!acc[level]) acc[level] = [];
    acc[level].push(spell);
    return acc;
  }, {} as Record<number, Spell[]>);
  
  const levels = Object.keys(spellsByLevel).map(Number).sort((a, b) => a - b);
  
  // Compte les sorts préparés (excluant tours de magie et sorts de domaine)
  const preparedNonDomain = allSpells.filter(s => 
    preparedSpellIds.includes(s.id) && !currentDomainSpellIds.includes(s.id) && s.level > 0
  );
  const remainingSlots = maxPrepared - preparedNonDomain.length;

  return (
    <div className="p-4 space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl text-ink">Sorts disponibles</h2>
        <div className="flex items-center gap-3">
          {/* Indicateur de limite */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${
            remainingSlots <= 0 
              ? 'bg-blood-red/10 text-blood-red border border-blood-red/30' 
              : 'bg-divine-gold/10 text-divine-gold-dark border border-divine-gold/30'
          }`}>
            <Brain className="w-4 h-4" />
            <span>{preparedNonDomain.length} / {maxPrepared} sorts préparés</span>
          </div>
          <span className="text-sm text-ink-muted font-ui">
            {filteredSpells.length} sorts
          </span>
        </div>
      </div>
      
      {/* Barre de recherche */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-muted pointer-events-none" />
        <input
          type="text"
          placeholder="Rechercher un sort..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-parchment-light border-2 border-parchment-dark rounded-lg py-2.5 pr-4 text-ink font-body focus:outline-none focus:border-divine-gold focus:ring-2 focus:ring-divine-gold/30 transition-all placeholder:text-ink-muted/70"
          style={{ paddingLeft: '45px' }}
        />
      </div>
      
      {/* Filtres */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-1 text-sm text-ink-light hover:text-ink"
        >
          <Filter className="w-4 h-4" />
          Filtres
        </button>
        
        <div className="flex gap-1 flex-wrap">
          {['all', 0, 1, 2, 3]
            .filter(level => level === 'all' || level === 0 || (level as number) <= maxSpellLevel)
            .map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level as number | 'all')}
                className={`filter-chip ${selectedLevel === level ? 'active' : ''}`}
              >
                {level === 'all' ? 'Tous' : level === 0 ? 'Mineur' : `Niv ${level}`}
              </button>
            ))}
        </div>
      </div>
      
      {/* Liste des sorts */}
      <div className="space-y-6">
        {levels.map((level) => (
          <section key={level}>
            <h3 className="font-display text-lg text-ink mb-2 sticky top-14 bg-parchment/95 py-2 z-10">
              {level === 0 ? 'Tours de magie' : `Sorts de niveau ${level}`}
              <span className="text-sm text-ink-muted ml-2">
                ({spellsByLevel[level].length})
              </span>
            </h3>
            
            <div className="space-y-2">
              {spellsByLevel[level].map((spell) => (
                <SpellCard
                  key={spell.id}
                  spell={spell}
                  isPrepared={preparedSpellIds.includes(spell.id)}
                  onTogglePrepare={() => toggleSpellPrepared(spell.id, maxPrepared)}
                  isDomainSpell={currentDomainSpellIds.includes(spell.id)}
                />
              ))}
            </div>
          </section>
        ))}
        
        {filteredSpells.length === 0 && (
          <div className="text-center py-8 text-ink-muted">
            <p>Aucun sort trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
}
