import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Zap, Brain, AlertCircle, Shield, Edit3, Sword, Stars, User, Camera, Cross, Heart, X, ChevronDown, ChevronUp, GraduationCap, Menu, Check } from 'lucide-react';
import { useSpellStore, useCharacterStore } from '@/stores';
import { SpellSlotBar } from '@/components/spells/SpellSlotBar';
import { DomainRadarChart, DomainRadarCompare } from '@/components/character/DomainRadarChart';

import { formatModifier } from '@/utils/formatters';
import type { SpellSlots, Deity, ClericDomain, DomainSpellProfile } from '@/types';
import { MAX_SPELL_SLOTS } from '@/types';
import { DEITIES, CLERIC_DOMAINS } from '@/types';
import { getSkillById, SKILLS, ABILITY_SCORES, type AbilityScore, type Skill } from '@/types/skills';
import { getFeatById } from '@/types/feats';

// Composant pour l'éditeur d'avatar
function AvatarUpload({ currentAvatar, onUpload }: { currentAvatar: string | null | undefined; onUpload: (dataUrl: string) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 2 * 1024 * 1024) {
      alert('L\'image ne doit pas dépasser 2 Mo');
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      onUpload(result);
    };
    reader.readAsDataURL(file);
  };
  
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-parchment-dark border-4 border-divine-gold overflow-hidden flex items-center justify-center">
          {currentAvatar ? (
            <img 
              src={currentAvatar} 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-12 h-12 text-ink-muted" />
          )}
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-0 right-0 w-8 h-8 bg-divine-gold rounded-full flex items-center justify-center shadow-lg hover:bg-divine-gold-light transition-colors"
        >
          <Camera className="w-4 h-4 text-ink" />
        </button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <p className="text-xs text-ink-muted">Cliquez pour changer la photo</p>
    </div>
  );
}

// Composant pour sélectionner un dieu
function DeitySelector({ currentDeity, onSelect }: { currentDeity: Deity | undefined; onSelect: (deityId: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 bg-parchment-dark rounded-lg border border-parchment-dark hover:border-divine-gold transition-colors"
      >
        <div className="flex items-center gap-3">
          {(currentDeity?.symbol?.startsWith('/') || currentDeity?.symbol?.startsWith('images/')) ? (
            <img 
              src={currentDeity.symbol} 
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
          {DEITIES.map((deity) => (
            <button
              key={deity.id}
              onClick={() => {
                onSelect(deity.id);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 p-3 hover:bg-parchment-dark transition-colors text-left ${
                deity.id === currentDeity?.id ? 'bg-divine-gold/10 border-l-4 border-divine-gold' : ''
              }`}
            >
              {(deity.symbol.startsWith('/') || deity.symbol.startsWith('images/')) ? (
                <img 
                  src={deity.symbol} 
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

// Composant pour sélectionner un domaine avec diagramme radar
function DomainSelector({ currentDomain, onSelect }: { currentDomain: ClericDomain | undefined; onSelect: (domainId: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredDomain, setHoveredDomain] = useState<ClericDomain | null>(null);
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 bg-parchment-dark rounded-lg border border-parchment-dark hover:border-divine-gold transition-colors"
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
      {(hoveredDomain || currentDomain) && (
        <div className="absolute z-30 left-full top-0 ml-2 bg-parchment-light rounded-xl shadow-2xl border border-parchment-dark p-4 w-[260px]">
          <h4 className="font-display text-sm text-ink mb-2 text-center">
            Profil magique : {(hoveredDomain || currentDomain)?.name}
          </h4>
          <div className="flex justify-center">
            {hoveredDomain && currentDomain && hoveredDomain.id !== currentDomain.id ? (
              <DomainRadarCompare
                currentProfile={hoveredDomain.spellProfile as NonNullable<typeof hoveredDomain.spellProfile>}
                compareProfile={currentDomain.spellProfile as NonNullable<typeof currentDomain.spellProfile>}
                currentName={hoveredDomain.name}
                compareName={currentDomain.name}
                size={220}
              />
            ) : (
              <DomainRadarChart 
                profile={(hoveredDomain || currentDomain)!.spellProfile as NonNullable<DomainSpellProfile>} 
                size={200} 
              />
            )}
          </div>
          <p className="text-xs text-ink-muted mt-2 text-center">
            Survolez un autre domaine pour comparer
          </p>
        </div>
      )}
    </div>
  );
}

// Composant pour afficher le détail d'une compétence
function SkillDetail({ skill, isMastered, bonus, abilityMod, profBonus, onToggle, onClose }: {
  skill: ReturnType<typeof getSkillById>;
  isMastered: boolean;
  bonus: number;
  abilityMod: number;
  profBonus: number;
  onToggle: () => void;
  onClose: () => void;
}) {
  if (!skill) return null;
  
  const categoryLabels: Record<string, string> = {
    physical: 'Physique',
    mental: 'Mentale',
    social: 'Sociale'
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-parchment-light w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-t-xl sm:rounded-xl shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-parchment-dark">
          <h3 className="font-display text-xl text-ink">{skill.name}</h3>
          <button onClick={onClose} className="p-2 hover:bg-parchment-dark rounded-lg">
            <X className="w-5 h-5 text-ink" />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          {/* Info ligne : Caractéristique • Type • Bonus */}
          <div className="flex items-center gap-2 text-sm">
            <span className="font-bold text-ink">{skill.abilityScoreName}</span>
            <span className="text-ink-muted">•</span>
            <span className="text-ink-light capitalize">{categoryLabels[skill.category] || skill.category}</span>
          </div>
          
          {/* Bonus box */}
          <div className="flex items-center justify-between p-4 bg-parchment-dark/30 rounded-lg">
            <div className="flex items-center gap-4">
              <div className={`text-3xl font-display ${isMastered ? 'text-divine-gold-dark' : 'text-ink-muted'}`}>
                {bonus >= 0 ? `+${bonus}` : bonus}
              </div>
              <div className="text-xs text-ink-muted">
                {isMastered ? (
                  <>
                    <div>Mod {abilityMod >= 0 ? `+${abilityMod}` : abilityMod}</div>
                    <div>+ Maîtrise +{profBonus}</div>
                  </>
                ) : (
                  <>
                    <div>Mod seul</div>
                    <div>{abilityMod >= 0 ? `+${abilityMod}` : abilityMod}</div>
                  </>
                )}
              </div>
            </div>
            <button
              onClick={onToggle}
              className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                isMastered 
                  ? 'bg-divine-gold text-ink hover:bg-divine-gold-light' 
                  : 'bg-parchment-dark text-ink-muted hover:bg-parchment-dark/80'
              }`}
            >
              {isMastered ? '✓ Maîtrise' : 'Non maîtrisé'}
            </button>
          </div>
          
          {/* Description */}
          <div>
            <h4 className="font-display text-sm text-ink mb-2">Description</h4>
            <p className="text-sm text-ink-light leading-relaxed">{skill.description}</p>
          </div>
          
          {/* Exemples */}
          {skill.examples && skill.examples.length > 0 && (
            <div>
              <h4 className="font-display text-sm text-ink mb-2">Exemples d'utilisation</h4>
              <ul className="space-y-1">
                {skill.examples.map((example, idx) => (
                  <li key={idx} className="text-sm text-ink-light flex items-start gap-2">
                    <span className="text-divine-gold mt-1">•</span>
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Composant pour l'onglet Compétences
// Composant carte de compétence
function SkillCard({ 
  skill, 
  isMastered, 
  bonus, 
  onClick 
}: { 
  skill: Skill; 
  isMastered: boolean; 
  bonus: number;
  onClick: () => void;
}) {
  const abilityColors: Record<AbilityScore, { text: string; bg: string; border: string }> = {
    STR: { text: 'text-crimson', bg: 'bg-crimson', border: 'border-crimson/20' },
    DEX: { text: 'text-forest', bg: 'bg-forest', border: 'border-forest/20' },
    CON: { text: 'text-amber-600', bg: 'bg-amber-600', border: 'border-amber-600/20' },
    INT: { text: 'text-royal-purple', bg: 'bg-royal-purple', border: 'border-royal-purple/20' },
    WIS: { text: 'text-divine-gold-dark', bg: 'bg-divine-gold', border: 'border-divine-gold/30' },
    CHA: { text: 'text-bronze', bg: 'bg-bronze', border: 'border-bronze/20' },
  };
  
  const colors = abilityColors[skill.abilityScore];
  
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-lg border transition-all ${
        isMastered 
          ? `${colors.border} ${colors.bg.replace('bg-', 'bg-')}/10` 
          : 'border-parchment-dark/50 hover:border-parchment-dark hover:bg-parchment-dark/20'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
              isMastered ? `${colors.bg} border-transparent` : 'border-ink-muted'
            }`}>
              {isMastered && <Check className="w-3 h-3 text-white" />}
            </div>
            <span className={`font-display text-sm ${isMastered ? 'text-ink' : 'text-ink-light'}`}>
              {skill.name}
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-1 ml-6 line-clamp-2">
            {skill.summary}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`text-xs font-medium ${colors.text}`}>
            {ABILITY_SCORES[skill.abilityScore].name}
          </span>
          <span className={`font-display text-lg ${isMastered ? colors.text : 'text-ink-muted'}`}>
            {bonus >= 0 ? `+${bonus}` : bonus}
          </span>
        </div>
      </div>
    </button>
  );
}

// Filtre des compétences par caractéristique
function SkillFilter({ 
  activeFilter, 
  onFilterChange,
  skillCounts
}: { 
  activeFilter: AbilityScore | 'all';
  onFilterChange: (filter: AbilityScore | 'all') => void;
  skillCounts: Record<AbilityScore | 'all', number>;
}) {
  const filters: { id: AbilityScore | 'all'; label: string; activeClass: string; inactiveClass: string }[] = [
    { 
      id: 'all', 
      label: 'Toutes', 
      activeClass: 'bg-gray-600 text-white',
      inactiveClass: 'bg-parchment-dark/50 text-ink-muted hover:bg-parchment-dark hover:text-ink'
    },
    { 
      id: 'STR', 
      label: 'FOR', 
      activeClass: 'bg-red-700 text-white',
      inactiveClass: 'bg-red-100 text-red-800 hover:bg-red-200'
    },
    { 
      id: 'DEX', 
      label: 'DEX', 
      activeClass: 'bg-green-700 text-white',
      inactiveClass: 'bg-green-100 text-green-800 hover:bg-green-200'
    },
    { 
      id: 'CON', 
      label: 'CON', 
      activeClass: 'bg-amber-700 text-white',
      inactiveClass: 'bg-amber-100 text-amber-800 hover:bg-amber-200'
    },
    { 
      id: 'INT', 
      label: 'INT', 
      activeClass: 'bg-purple-700 text-white',
      inactiveClass: 'bg-purple-100 text-purple-800 hover:bg-purple-200'
    },
    { 
      id: 'WIS', 
      label: 'SAG', 
      activeClass: 'bg-yellow-700 text-white',
      inactiveClass: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
    },
    { 
      id: 'CHA', 
      label: 'CHA', 
      activeClass: 'bg-orange-700 text-white',
      inactiveClass: 'bg-orange-100 text-orange-800 hover:bg-orange-200'
    },
  ];
  
  return (
    <div className="flex flex-wrap gap-1.5">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all shadow-sm ${
            activeFilter === filter.id
              ? filter.activeClass
              : filter.inactiveClass
          }`}
        >
          {filter.label}
          <span className="ml-1 opacity-80">({skillCounts[filter.id]})</span>
        </button>
      ))}
    </div>
  );
}

function SkillsTab() {
  const character = useCharacterStore((state) => state.character);
  const toggleSkill = useCharacterStore((state) => state.toggleSkill);
  const addFeat = useCharacterStore((state) => state.addFeat);
  const removeFeat = useCharacterStore((state) => state.removeFeat);
  const getProficiencyBonus = useCharacterStore((state) => state.getProficiencyBonus);
  const getModifier = useCharacterStore((state) => state.getModifier);
  
  const [activeSection, setActiveSection] = useState<'skills' | 'feats'>('feats');
  const [showFeatSelector, setShowFeatSelector] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [skillFilter, setSkillFilter] = useState<AbilityScore | 'all'>('all');
  
  const profBonus = getProficiencyBonus();
  const masteredSkills = character.masteredSkills || [];
  const characterFeats = character.feats || [];
  
  const getSkillTotalBonus = (skillId: string, abilityScore: 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA'): number => {
    const abilityValue = character[abilityScore.toLowerCase() as keyof typeof character] as number ?? 10;
    const abilityMod = getModifier(abilityValue);
    const isMastered = masteredSkills.includes(skillId);
    return abilityMod + (isMastered ? profBonus : 0);
  };
  
  const getAbilityMod = (abilityScore: 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA'): number => {
    const abilityValue = character[abilityScore.toLowerCase() as keyof typeof character] as number ?? 10;
    return getModifier(abilityValue);
  };
  
  const selectedSkillData = selectedSkill ? getSkillById(selectedSkill) : null;

  return (
    <div className="space-y-4">
      {/* Toggle Feats/Skills - Talents d'abord */}
      <div className="flex bg-parchment-dark rounded-lg p-1">
        <button
          onClick={() => setActiveSection('feats')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
            activeSection === 'feats' 
              ? 'bg-parchment-light text-ink shadow-sm' 
              : 'text-ink-muted hover:text-ink'
          }`}
        >
          Talents
        </button>
        <button
          onClick={() => setActiveSection('skills')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
            activeSection === 'skills' 
              ? 'bg-parchment-light text-ink shadow-sm' 
              : 'text-ink-muted hover:text-ink'
          }`}
        >
          Compétences
        </button>
      </div>
      
      {activeSection === 'skills' && (
        <>
          {/* Info bonus de maîtrise */}
          <div className="flex items-center justify-between p-3 bg-divine-gold/10 rounded-lg">
            <span className="text-sm text-ink-light">Bonus de maîtrise</span>
            <span className="font-display text-lg text-divine-gold-dark">+{profBonus}</span>
          </div>
          
          {/* Filtres par caractéristique */}
          <SkillFilter 
            activeFilter={skillFilter} 
            onFilterChange={setSkillFilter}
            skillCounts={{
              all: SKILLS.length,
              STR: SKILLS.filter(s => s.abilityScore === 'STR').length,
              DEX: SKILLS.filter(s => s.abilityScore === 'DEX').length,
              CON: SKILLS.filter(s => s.abilityScore === 'CON').length,
              INT: SKILLS.filter(s => s.abilityScore === 'INT').length,
              WIS: SKILLS.filter(s => s.abilityScore === 'WIS').length,
              CHA: SKILLS.filter(s => s.abilityScore === 'CHA').length,
            }}
          />
          
          {/* Liste des compétences filtrées */}
          <div className="space-y-2">
            {SKILLS
              .filter(skill => skillFilter === 'all' || skill.abilityScore === skillFilter)
              .map((skill) => {
                const isMastered = masteredSkills.includes(skill.id);
                const bonus = getSkillTotalBonus(skill.id, skill.abilityScore);
                return (
                  <SkillCard
                    key={skill.id}
                    skill={skill}
                    isMastered={isMastered}
                    bonus={bonus}
                    onClick={() => setSelectedSkill(skill.id)}
                  />
                );
              })}
          </div>
          
          {/* Modal de détail de compétence */}
          {selectedSkillData && (
            <SkillDetail
              skill={selectedSkillData}
              isMastered={masteredSkills.includes(selectedSkillData.id)}
              bonus={getSkillTotalBonus(selectedSkillData.id, selectedSkillData.abilityScore)}
              abilityMod={getAbilityMod(selectedSkillData.abilityScore)}
              profBonus={profBonus}
              onToggle={() => toggleSkill(selectedSkillData.id)}
              onClose={() => setSelectedSkill(null)}
            />
          )}
        </>
      )}
      
      {activeSection === 'feats' && (
        <>
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg text-ink">Talents acquis</h3>
            <button
              onClick={() => setShowFeatSelector(true)}
              className="btn-secondary text-sm py-1.5 px-3"
            >
              + Ajouter
            </button>
          </div>
          
          {characterFeats.length === 0 ? (
            <div className="text-center py-8 text-ink-muted">
              <GraduationCap className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Aucun talent acquis</p>
              <p className="text-sm">Les talents se débloquent aux niveaux 4, 8, 12, 16 et 19</p>
            </div>
          ) : (
            <div className="space-y-2">
              {characterFeats.map((featId) => {
                const feat = getFeatById(featId);
                if (!feat) return null;
                return (
                  <div key={featId} className="p-3 bg-parchment-dark rounded-lg">
                    <div className="flex items-start justify-between">
                      <h4 className="font-display text-ink">{feat.name}</h4>
                      <button
                        onClick={() => removeFeat(featId)}
                        className="text-crimson hover:text-crimson-light text-sm"
                      >
                        Retirer
                      </button>
                    </div>
                    <p className="text-sm text-ink-light mt-1">{feat.description}</p>
                    {feat.prerequisite && (
                      <p className="text-xs text-ink-muted mt-1">Prérequis: {feat.prerequisite}</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          
          {/* Feat Selector Modal */}
          {showFeatSelector && (
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
              <div 
                className="absolute inset-0 bg-ink/60 backdrop-blur-sm" 
                onClick={() => setShowFeatSelector(false)} 
              />
              <div className="relative bg-parchment-light w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-xl shadow-2xl p-4">
                <h3 className="font-display text-lg text-ink mb-4">Choisir un talent</h3>
                
                <div className="space-y-2">
                  {(['alert', 'lucky', 'mobile', 'observant', 'resilient', 'shieldMaster', 'warCaster'] as const).map((featId) => {
                    const feat = getFeatById(featId);
                    if (!feat || characterFeats.includes(featId)) return null;
                    return (
                      <button
                        key={featId}
                        onClick={() => {
                          addFeat(featId);
                          setShowFeatSelector(false);
                        }}
                        className="w-full text-left p-3 hover:bg-parchment-dark rounded-lg transition-colors"
                      >
                        <h4 className="font-display text-ink">{feat.name}</h4>
                        <p className="text-sm text-ink-light">{feat.description}</p>
                        {feat.prerequisite && (
                          <p className="text-xs text-ink-muted mt-1">Prérequis: {feat.prerequisite}</p>
                        )}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => setShowFeatSelector(false)}
                  className="w-full btn-secondary mt-4"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Navigation mobile pour la fiche de personnage (menu hamburger)
function CharacterSheetMobileNav({ 
  activeTab, 
  onTabChange 
}: { 
  activeTab: 'identity' | 'stats' | 'abilities' | 'skills';
  onTabChange: (tab: 'identity' | 'stats' | 'abilities' | 'skills') => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  
  const tabs = [
    { id: 'identity' as const, label: 'Identité', icon: User },
    { id: 'stats' as const, label: 'Caractéristiques', icon: Brain },
    { id: 'abilities' as const, label: 'Capacités', icon: Zap },
    { id: 'skills' as const, label: 'Talents et compétences', icon: GraduationCap },
  ];
  
  const activeTabInfo = tabs.find(t => t.id === activeTab);
  
  return (
    <div className="sm:hidden border-b border-parchment-dark bg-parchment-dark/5">
      {/* Header du menu - style amélioré */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-divine-gold/15 flex items-center justify-center">
            {activeTabInfo && <activeTabInfo.icon className="w-5 h-5 text-divine-gold-dark" />}
          </div>
          <div>
            <p className="text-xs text-ink-muted">Onglet actif</p>
            <span className="font-medium text-ink">{activeTabInfo?.label}</span>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2.5 rounded-xl bg-parchment-dark/40 hover:bg-parchment-dark/60 transition-colors"
          aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {isOpen ? (
            <X className="w-5 h-5 text-ink" />
          ) : (
            <Menu className="w-5 h-5 text-ink" />
          )}
        </button>
      </div>
      
      {/* Menu déroulant - style amélioré */}
      {isOpen && (
        <div className="absolute left-3 right-3 mt-1 bg-parchment-light border border-parchment-dark/60 rounded-xl shadow-2xl z-50 animate-slide-up">
          <div className="p-2 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    onTabChange(tab.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-lg transition-all ${
                    isActive
                      ? 'bg-divine-gold/15 text-divine-gold-dark border border-divine-gold/30'
                      : 'hover:bg-parchment-dark/20 text-ink'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isActive ? 'bg-divine-gold/20' : 'bg-parchment-dark/30'
                  }`}>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-divine-gold-dark' : 'text-ink-muted'}`} />
                  </div>
                  <span className="font-medium flex-1 text-left">{tab.label}</span>
                  {isActive && (
                    <span className="text-xs bg-divine-gold/30 text-divine-gold-dark px-2.5 py-1 rounded-full font-medium">
                      Actif
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// Modal d'édition du personnage
function CharacterEditorModal({ isOpen, onClose, initialTab = 'identity' }: { isOpen: boolean; onClose: () => void; initialTab?: 'identity' | 'stats' | 'abilities' | 'skills' }) {
  const character = useCharacterStore((state) => state.character);
  const setName = useCharacterStore((state) => state.setName);
  const setAvatar = useCharacterStore((state) => state.setAvatar);
  const setDeity = useCharacterStore((state) => state.setDeity);
  const setDomain = useCharacterStore((state) => state.setDomain);
  const setLevel = useCharacterStore((state) => state.setLevel);
  const setWisdom = useCharacterStore((state) => state.setWisdom);
  const setConstitution = useCharacterStore((state) => state.setConstitution);
  const setStrength = useCharacterStore((state) => state.setStrength);
  const setDexterity = useCharacterStore((state) => state.setDexterity);
  const setIntelligence = useCharacterStore((state) => state.setIntelligence);
  const setCharisma = useCharacterStore((state) => state.setCharisma);
  const setDescription = useCharacterStore((state) => state.setDescription);
  const setRace = useCharacterStore((state) => state.setRace);
  const setAlignment = useCharacterStore((state) => state.setAlignment);
  const setAge = useCharacterStore((state) => state.setAge);
  const setHeight = useCharacterStore((state) => state.setHeight);
  const setWeight = useCharacterStore((state) => state.setWeight);
  
  const [activeTab, setActiveTab] = useState<'identity' | 'stats' | 'abilities' | 'skills'>(initialTab);
  const [localName, setLocalName] = useState(character.name);
  const [localLevel, setLocalLevel] = useState(character.level);
  const [localWisdom, setLocalWisdom] = useState(character.wisdom);
  const [localCon, setLocalCon] = useState(character.constitution);
  const [localStr, setLocalStr] = useState(character.strength);
  const [localDex, setLocalDex] = useState(character.dexterity || 10);
  const [localInt, setLocalInt] = useState(character.intelligence || 10);
  const [localCha, setLocalCha] = useState(character.charisma || 10);
  const [localDescription, setLocalDescription] = useState(character.description || '');
  const [localRace, setLocalRace] = useState(character.race || 'Humain');
  const [localAlignment, setLocalAlignment] = useState(character.alignment || 'Neutre Bon');
  const [localAge, setLocalAge] = useState(character.age || 25);
  const [localHeight, setLocalHeight] = useState(character.height || '');
  const [localWeight, setLocalWeight] = useState(character.weight || 75);
  
  // Récupère la divinité à jour depuis DEITIES
  const currentDeity = character.deity?.id ? DEITIES.find(d => d.id === character.deity?.id) || character.deity : character.deity;
  
  if (!isOpen) return null;
  
  const handleSave = () => {
    setName(localName);
    setLevel(localLevel);
    setWisdom(localWisdom);
    setConstitution(localCon);
    setStrength(localStr);
    setDexterity(localDex);
    setIntelligence(localInt);
    setCharisma(localCha);
    setDescription(localDescription);
    setRace(localRace);
    setAlignment(localAlignment);
    setAge(localAge);
    setHeight(localHeight);
    setWeight(localWeight);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-parchment-light w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-parchment-dark">
          <h2 className="font-display text-xl text-ink">Fiche de personnage</h2>
          <button onClick={onClose} className="p-2 hover:bg-parchment-dark rounded-lg">
            <X className="w-5 h-5 text-ink" />
          </button>
        </div>
        
        {/* Tabs - Desktop - style amélioré */}
        <div className="hidden sm:flex border-b border-parchment-dark bg-parchment-dark/5">
          {[
            { id: 'identity', label: 'Identité', icon: User },
            { id: 'stats', label: 'Caractéristiques', icon: Brain },
            { id: 'abilities', label: 'Capacités', icon: Zap },
            { id: 'skills', label: 'Talents et compétences', icon: GraduationCap },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'identity' | 'stats' | 'abilities' | 'skills')}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-2 text-sm font-medium transition-all ${
                activeTab === tab.id 
                  ? 'text-divine-gold-dark border-b-2 border-divine-gold bg-divine-gold/5' 
                  : 'text-ink-muted hover:text-ink hover:bg-parchment-dark/20'
              }`}
            >
              <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-divine-gold' : ''}`} />
              <span className="hidden lg:inline">{tab.label}</span>
              <span className="lg:hidden">{tab.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>
        
        {/* Menu hamburger - Mobile */}
        <CharacterSheetMobileNav activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="p-4 space-y-6">
          {/* Tab Identité */}
          {activeTab === 'identity' && (
            <div className="space-y-6">
              {/* Avatar et Nom */}
              <div className="flex flex-col items-center gap-4">
                <AvatarUpload 
                  currentAvatar={character.avatar} 
                  onUpload={setAvatar}
                />
                <div className="w-full">
                  <label className="block text-sm font-medium text-ink mb-1">Nom du personnage</label>
                  <input
                    type="text"
                    value={localName}
                    onChange={(e) => setLocalName(e.target.value)}
                    className="w-full input-field text-center text-lg font-display"
                    placeholder="Nom de votre clerc..."
                  />
                </div>
              </div>
              
              {/* Race et Alignement */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Race</label>
                  <input
                    type="text"
                    value={localRace}
                    onChange={(e) => setLocalRace(e.target.value)}
                    className="w-full input-field text-center"
                    placeholder="Humain"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Alignement</label>
                  <select
                    value={localAlignment}
                    onChange={(e) => setLocalAlignment(e.target.value)}
                    className="w-full input-field text-center"
                  >
                    <option value="Loyal Bon">Loyal Bon</option>
                    <option value="Neutre Bon">Neutre Bon</option>
                    <option value="Chaotique Bon">Chaotique Bon</option>
                    <option value="Loyal Neutre">Loyal Neutre</option>
                    <option value="Neutre">Neutre</option>
                    <option value="Chaotique Neutre">Chaotique Neutre</option>
                    <option value="Loyal Mauvais">Loyal Mauvais</option>
                    <option value="Neutre Mauvais">Neutre Mauvais</option>
                    <option value="Chaotique Mauvais">Chaotique Mauvais</option>
                  </select>
                </div>
              </div>
              
              {/* Dieu */}
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Divinité vénérée</label>
                <DeitySelector 
                  currentDeity={currentDeity} 
                  onSelect={(deityId) => setDeity(deityId)}
                />
                <p className="mt-2 text-sm text-ink-muted">{currentDeity?.description}</p>
              </div>
              
              {/* Domaine */}
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Domaine divin</label>
                <DomainSelector 
                  currentDomain={character.domain} 
                  onSelect={(domainId) => setDomain(domainId)}
                />
                <p className="mt-2 text-sm text-ink-muted">{character.domain?.description}</p>
              </div>
              
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Description</label>
                <textarea
                  value={localDescription}
                  onChange={(e) => setLocalDescription(e.target.value)}
                  className="w-full input-field text-sm min-h-[80px] resize-none"
                  placeholder="Décrivez votre personnage..."
                  rows={3}
                />
              </div>
              
              {/* Âge, Taille et Poids */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Âge</label>
                  <input
                    type="number"
                    value={localAge}
                    onChange={(e) => setLocalAge(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full input-field text-center"
                    min="1"
                    max="1000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Taille</label>
                  <input
                    type="text"
                    value={localHeight}
                    onChange={(e) => setLocalHeight(e.target.value)}
                    className="w-full input-field text-center"
                    placeholder="1m78"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Poids (kg)</label>
                  <input
                    type="number"
                    value={localWeight}
                    onChange={(e) => setLocalWeight(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full input-field text-center"
                    min="1"
                    max="500"
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Tab Caractéristiques */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              {/* Niveau */}
              <div>
                <label className="flex items-center gap-2 text-ink font-medium mb-2">
                  <Cross className="w-5 h-5 text-divine-gold" />
                  Niveau
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setLocalLevel(Math.max(1, localLevel - 1))}
                    className="w-10 h-10 rounded-lg bg-parchment-dark hover:bg-divine-gold/20 flex items-center justify-center text-xl font-bold"
                  >
                    -
                  </button>
                  <div className="flex-1 text-center">
                    <div className="text-3xl font-display text-ink">{localLevel}</div>
                  </div>
                  <button
                    onClick={() => setLocalLevel(Math.min(20, localLevel + 1))}
                    className="w-10 h-10 rounded-lg bg-parchment-dark hover:bg-divine-gold/20 flex items-center justify-center text-xl font-bold"
                  >
                    +
                  </button>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={localLevel}
                  onChange={(e) => setLocalLevel(Number(e.target.value))}
                  className="w-full mt-2 accent-divine-gold"
                />
              </div>
              
              {/* Dextérité */}
              <div>
                <label className="flex items-center gap-2 text-ink font-medium mb-2">
                  <Zap className="w-5 h-5 text-forest" />
                  Dextérité
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setLocalDex(Math.max(1, localDex - 1))}
                    className="w-10 h-10 rounded-lg bg-parchment-dark hover:bg-forest/20 flex items-center justify-center text-xl font-bold"
                  >
                    -
                  </button>
                  <div className="flex-1 text-center">
                    <div className="text-3xl font-display text-ink">{localDex}</div>
                    <div className="text-sm text-forest font-bold">
                      {formatModifier(localDex)}
                    </div>
                  </div>
                  <button
                    onClick={() => setLocalDex(Math.min(30, localDex + 1))}
                    className="w-10 h-10 rounded-lg bg-parchment-dark hover:bg-forest/20 flex items-center justify-center text-xl font-bold"
                  >
                    +
                  </button>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={localDex}
                  onChange={(e) => setLocalDex(Number(e.target.value))}
                  className="w-full mt-2 accent-forest"
                />
              </div>
              
              {/* Sagesse */}
              <div>
                <label className="flex items-center gap-2 text-ink font-medium mb-2">
                  <Brain className="w-5 h-5 text-divine-gold" />
                  Sagesse
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setLocalWisdom(Math.max(1, localWisdom - 1))}
                    className="w-10 h-10 rounded-lg bg-parchment-dark hover:bg-divine-gold/20 flex items-center justify-center text-xl font-bold"
                  >
                    -
                  </button>
                  <div className="flex-1 text-center">
                    <div className="text-3xl font-display text-ink">{localWisdom}</div>
                    <div className="text-sm text-divine-gold-dark font-bold">
                      {formatModifier(localWisdom)}
                    </div>
                  </div>
                  <button
                    onClick={() => setLocalWisdom(Math.min(30, localWisdom + 1))}
                    className="w-10 h-10 rounded-lg bg-parchment-dark hover:bg-divine-gold/20 flex items-center justify-center text-xl font-bold"
                  >
                    +
                  </button>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={localWisdom}
                  onChange={(e) => setLocalWisdom(Number(e.target.value))}
                  className="w-full mt-2 accent-divine-gold"
                />
              </div>
              
              {/* Constitution */}
              <div>
                <label className="flex items-center gap-2 text-ink font-medium mb-2">
                  <Heart className="w-5 h-5 text-blood-red" />
                  Constitution
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setLocalCon(Math.max(1, localCon - 1))}
                    className="w-10 h-10 rounded-lg bg-parchment-dark hover:bg-blood-red/20 flex items-center justify-center text-xl font-bold"
                  >
                    -
                  </button>
                  <div className="flex-1 text-center">
                    <div className="text-3xl font-display text-ink">{localCon}</div>
                    <div className="text-sm text-blood-red font-bold">
                      {formatModifier(localCon)}
                    </div>
                  </div>
                  <button
                    onClick={() => setLocalCon(Math.min(30, localCon + 1))}
                    className="w-10 h-10 rounded-lg bg-parchment-dark hover:bg-blood-red/20 flex items-center justify-center text-xl font-bold"
                  >
                    +
                  </button>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={localCon}
                  onChange={(e) => setLocalCon(Number(e.target.value))}
                  className="w-full mt-2 accent-blood-red"
                />
                <p className="text-xs text-ink-muted mt-2">
                  PV calculés : {8 + (localLevel - 1) * 5 + localLevel * Math.floor((localCon - 10) / 2)}
                </p>
              </div>
              
              {/* Force */}
              <div>
                <label className="flex items-center gap-2 text-ink font-medium mb-2">
                  <Sword className="w-5 h-5 text-steel-blue" />
                  Force
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setLocalStr(Math.max(1, localStr - 1))}
                    className="w-10 h-10 rounded-lg bg-parchment-dark hover:bg-steel-blue/20 flex items-center justify-center text-xl font-bold"
                  >
                    -
                  </button>
                  <div className="flex-1 text-center">
                    <div className="text-3xl font-display text-ink">{localStr}</div>
                    <div className="text-sm text-steel-blue font-bold">
                      {formatModifier(localStr)}
                    </div>
                  </div>
                  <button
                    onClick={() => setLocalStr(Math.min(30, localStr + 1))}
                    className="w-10 h-10 rounded-lg bg-parchment-dark hover:bg-steel-blue/20 flex items-center justify-center text-xl font-bold"
                  >
                    +
                  </button>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={localStr}
                  onChange={(e) => setLocalStr(Number(e.target.value))}
                  className="w-full mt-2 accent-steel-blue"
                />
              </div>
              
              {/* Intelligence */}
              <div>
                <label className="flex items-center gap-2 text-ink font-medium mb-2">
                  <Sparkles className="w-5 h-5 text-royal-purple" />
                  Intelligence
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setLocalInt(Math.max(1, localInt - 1))}
                    className="w-10 h-10 rounded-lg bg-parchment-dark hover:bg-royal-purple/20 flex items-center justify-center text-xl font-bold"
                  >
                    -
                  </button>
                  <div className="flex-1 text-center">
                    <div className="text-3xl font-display text-ink">{localInt}</div>
                    <div className="text-sm text-royal-purple font-bold">
                      {formatModifier(localInt)}
                    </div>
                  </div>
                  <button
                    onClick={() => setLocalInt(Math.min(30, localInt + 1))}
                    className="w-10 h-10 rounded-lg bg-parchment-dark hover:bg-royal-purple/20 flex items-center justify-center text-xl font-bold"
                  >
                    +
                  </button>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={localInt}
                  onChange={(e) => setLocalInt(Number(e.target.value))}
                  className="w-full mt-2 accent-royal-purple"
                />
              </div>
              
              {/* Charisme */}
              <div>
                <label className="flex items-center gap-2 text-ink font-medium mb-2">
                  <Stars className="w-5 h-5 text-bronze" />
                  Charisme
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setLocalCha(Math.max(1, localCha - 1))}
                    className="w-10 h-10 rounded-lg bg-parchment-dark hover:bg-bronze/20 flex items-center justify-center text-xl font-bold"
                  >
                    -
                  </button>
                  <div className="flex-1 text-center">
                    <div className="text-3xl font-display text-ink">{localCha}</div>
                    <div className="text-sm text-bronze font-bold">
                      {formatModifier(localCha)}
                    </div>
                  </div>
                  <button
                    onClick={() => setLocalCha(Math.min(30, localCha + 1))}
                    className="w-10 h-10 rounded-lg bg-parchment-dark hover:bg-bronze/20 flex items-center justify-center text-xl font-bold"
                  >
                    +
                  </button>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={localCha}
                  onChange={(e) => setLocalCha(Number(e.target.value))}
                  className="w-full mt-2 accent-bronze"
                />
              </div>
            </div>
          )}
          
          {/* Tab Capacités */}
          {activeTab === 'abilities' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-display text-lg text-ink">Capacités du {character.domain?.name || 'domaine'}</h3>
                <p className="text-sm text-ink-muted mt-1">
                  Ces capacités proviennent du <em>Manuel du Joueur</em> de D&D 5e. Elles sont liées au domaine de clerc que vous avez sélectionné et se débloquent automatiquement aux niveaux indiqués ci-dessous.
                </p>
              </div>
              
              {character.domain && Object.entries(character.domain.abilities).map(([level, ability]) => (
                <div key={level} className="card bg-parchment-dark/30">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-divine-gold flex items-center justify-center flex-shrink-0">
                      <span className="font-display text-sm text-ink">{level.replace('level', 'N')}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-display text-ink">{ability.name}</h4>
                      <p className="text-sm text-ink-light">{ability.description}</p>
                      {ability.uses && ability.uses > 0 && (
                        <p className="text-xs text-divine-gold-dark mt-1">
                          {ability.uses} utilisation{ability.uses > 1 ? 's' : ''} 
                          {ability.shortRest ? ' / repos court' : ' / repos long'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="mt-4 p-4 bg-divine-gold/10 rounded-lg border border-divine-gold/30">
                <h4 className="font-display text-ink mb-2">Sorts de domaine toujours préparés</h4>
                <div className="flex flex-wrap gap-2">
                  {character.domain?.spellIds.map((spellId) => (
                    <span key={spellId} className="badge-domain text-xs">
                      {spellId.replace(/-/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Tab Compétences */}
          {activeTab === 'skills' && (
            <SkillsTab />
          )}
        </div>
        
        {/* Footer */}
        <div className="flex gap-3 p-4 pb-8 sm:pb-4 border-t border-parchment-dark">
          <button onClick={onClose} className="flex-1 btn-secondary">
            Annuler
          </button>
          <button onClick={handleSave} className="flex-1 btn-primary">
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}

export function Dashboard() {
  const [showEditor, setShowEditor] = useState(false);
  const [editorInitialTab, setEditorInitialTab] = useState<'identity' | 'stats' | 'abilities' | 'skills'>('identity');
  
  // Synchronise la divinité au chargement pour mettre à jour le symbole
  const syncDeity = useCharacterStore((state) => state.syncDeity);
  useEffect(() => {
    syncDeity();
  }, [syncDeity]);

  const openEditor = (tab: 'identity' | 'stats' | 'abilities' | 'skills' = 'identity') => {
    setEditorInitialTab(tab);
    setShowEditor(true);
  };
  const character = useCharacterStore((state) => state.character);
  const getSaveBonus = useCharacterStore((state) => state.getSaveBonus);
  const getProficiencyBonus = useCharacterStore((state) => state.getProficiencyBonus);
  const { warCleric, channelDivinity } = character.abilities;
  const activeConcentration = character.currentState.activeConcentration;
  
  // Calcule tous les jets de sauvegarde
  const saveBonuses = {
    strength: getSaveBonus('strength'),
    dexterity: getSaveBonus('dexterity'),
    constitution: getSaveBonus('constitution'),
    intelligence: getSaveBonus('intelligence'),
    wisdom: getSaveBonus('wisdom'),
    charisma: getSaveBonus('charisma'),
  };
  const profBonus = getProficiencyBonus();
  
  const spellSlots = useSpellStore((state) => state.spellSlots);
  const maxSlots: SpellSlots = MAX_SPELL_SLOTS[character.level] || MAX_SPELL_SLOTS[5];
  
  const domainSpells = useSpellStore((state) => state.getDomainSpells());
  const nonDomainPrepared = useSpellStore((state) => state.getNonDomainPreparedSpells());
  
  const maxPrepared = character.maxPreparedSpells;
  const preparedCount = nonDomainPrepared.length;
  
  // Récupère le symbole à jour depuis DEITIES (pour avoir le nouveau gantelet)
  const currentDeity = character.deity?.id ? DEITIES.find(d => d.id === character.deity?.id) : null;
  const deitySymbol = currentDeity?.symbol || character.deity?.symbol || '⚔️';
  
  return (
    <div className="p-4 space-y-6 animate-fade-in">
      {/* En-tête du personnage avec avatar */}
      <div className="card-ornate text-center p-8">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-parchment-dark border-4 border-divine-gold overflow-hidden flex items-center justify-center">
              {character.avatar ? (
                <img 
                  src={character.avatar} 
                  alt={character.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-12 h-12 text-ink-muted" />
              )}
            </div>
            <button
              onClick={() => openEditor('identity')}
              className="absolute bottom-0 right-0 w-8 h-8 bg-divine-gold rounded-full flex items-center justify-center shadow-lg hover:bg-divine-gold-light transition-colors"
            >
              <Edit3 className="w-4 h-4 text-ink" />
            </button>
          </div>
        </div>
        
        <h2 className="font-display text-xl text-ink mt-4">{character.name}</h2>
        <div className="flex flex-col gap-1 mt-2 items-center">
          {/* Ligne Race et Alignement */}
          <div className="flex items-center justify-center gap-2 text-ink-muted font-ui text-sm">
            <span>{character.race || 'Humain'}</span>
            <span>•</span>
            <span>{character.alignment || 'Neutre Bon'}</span>
          </div>
          {/* Ligne Clerc de Torm */}
          <div className="flex items-center justify-center gap-2 text-amber-900 font-medium text-sm">
            {deitySymbol.startsWith('images/') || deitySymbol.startsWith('/') ? (
              <img 
                src={deitySymbol} 
                alt={character.deity?.name || 'Torm'}
                className="w-5 h-5 object-contain flex-shrink-0"
              />
            ) : (
              <span className="text-lg flex-shrink-0">{deitySymbol}</span>
            )}
            <span>Clerc de {character.deity?.name}</span>
          </div>
          {/* Ligne Domaine */}
          <div className="flex items-center justify-center gap-2 text-ink-light text-sm">
            <span className="text-lg flex-shrink-0">{character.domain?.icon}</span>
            <span>{character.domain?.name} • Niveau {character.level}</span>
          </div>
        </div>
        
        <div className="mt-4 pb-2">
          {/* Grille des caractéristiques */}
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
            {/* Force */}
            <button 
              onClick={() => openEditor('stats')}
              className="flex flex-col items-center p-2 bg-parchment-dark/40 rounded-lg hover:bg-parchment-dark/60 transition-colors"
            >
              <span className="text-xs font-bold text-steel-blue">FOR</span>
              <span className="font-display text-lg text-ink">{character.strength}</span>
              <span className="text-xs text-steel-blue font-medium">{formatModifier(character.strength)}</span>
              <span className="text-[10px] text-ink-muted mt-1">
                JS {saveBonuses.strength.total >= 0 ? '+' : ''}{saveBonuses.strength.total}
              </span>
            </button>
            
            {/* Dextérité */}
            <button 
              onClick={() => openEditor('stats')}
              className="flex flex-col items-center p-2 bg-parchment-dark/40 rounded-lg hover:bg-parchment-dark/60 transition-colors"
            >
              <span className="text-xs font-bold text-forest">DEX</span>
              <span className="font-display text-lg text-ink">{character.dexterity}</span>
              <span className="text-xs text-forest font-medium">{formatModifier(character.dexterity)}</span>
              <span className="text-[10px] text-ink-muted mt-1">
                JS {saveBonuses.dexterity.total >= 0 ? '+' : ''}{saveBonuses.dexterity.total}
              </span>
            </button>
            
            {/* Constitution */}
            <button 
              onClick={() => openEditor('stats')}
              className="flex flex-col items-center p-2 bg-parchment-dark/40 rounded-lg hover:bg-parchment-dark/60 transition-colors"
            >
              <span className="text-xs font-bold text-blood-red">CON</span>
              <span className="font-display text-lg text-ink">{character.constitution}</span>
              <span className="text-xs text-blood-red font-medium">{formatModifier(character.constitution)}</span>
              <span className="text-[10px] text-ink-muted mt-1">
                JS {saveBonuses.constitution.total >= 0 ? '+' : ''}{saveBonuses.constitution.total}
              </span>
            </button>
            
            {/* Intelligence */}
            <button 
              onClick={() => openEditor('stats')}
              className="flex flex-col items-center p-2 bg-parchment-dark/40 rounded-lg hover:bg-parchment-dark/60 transition-colors"
            >
              <span className="text-xs font-bold text-royal-purple">INT</span>
              <span className="font-display text-lg text-ink">{character.intelligence}</span>
              <span className="text-xs text-royal-purple font-medium">{formatModifier(character.intelligence)}</span>
              <span className="text-[10px] text-ink-muted mt-1">
                JS {saveBonuses.intelligence.total >= 0 ? '+' : ''}{saveBonuses.intelligence.total}
              </span>
            </button>
            
            {/* Sagesse - Maîtrise de classe */}
            <button 
              onClick={() => openEditor('stats')}
              className="flex flex-col items-center p-2 bg-divine-gold/20 rounded-lg hover:bg-divine-gold/30 transition-colors border border-divine-gold/30"
            >
              <span className="text-xs font-bold text-divine-gold-dark">SAG</span>
              <span className="font-display text-lg text-ink">{character.wisdom}</span>
              <span className="text-xs text-divine-gold-dark font-medium">{formatModifier(character.wisdom)}</span>
              <span className="text-[10px] text-divine-gold-dark font-bold mt-1">
                JS {saveBonuses.wisdom.total >= 0 ? '+' : ''}{saveBonuses.wisdom.total} ★
              </span>
            </button>
            
            {/* Charisme - Maîtrise de classe */}
            <button 
              onClick={() => openEditor('stats')}
              className="flex flex-col items-center p-2 bg-bronze/10 rounded-lg hover:bg-bronze/20 transition-colors border border-bronze/30"
            >
              <span className="text-xs font-bold text-bronze">CHA</span>
              <span className="font-display text-lg text-ink">{character.charisma}</span>
              <span className="text-xs text-bronze font-medium">{formatModifier(character.charisma)}</span>
              <span className="text-[10px] text-bronze font-bold mt-1">
                JS {saveBonuses.charisma.total >= 0 ? '+' : ''}{saveBonuses.charisma.total} ★
              </span>
            </button>
          </div>
          
          {/* Légende des jets de sauvegarde */}
          <div className="mt-2 flex items-center justify-center gap-4 text-[10px] text-ink-muted">
            <span>JS = Jet de Sauvegarde</span>
            <span className="text-divine-gold">★ = Maîtrise de classe (+{profBonus})</span>
          </div>
          
          {/* Bouton d'édition */}
          <button 
            onClick={() => openEditor('stats')}
            className="mt-2 w-full text-xs text-ink-muted hover:text-divine-gold-dark transition-colors flex items-center justify-center gap-1"
          >
            <Edit3 className="w-3 h-3" />
            Modifier les caractéristiques
          </button>
        </div>
      </div>
      
      {/* Emplacements de sorts */}
      <section>
        <h3 className="font-display text-lg text-ink mb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-divine-gold" />
          Emplacements de sorts
        </h3>
        
        <div className="space-y-2">
          <SpellSlotBar 
            level={1} 
            current={spellSlots[1]} 
            max={maxSlots[1]} 
          />
          <SpellSlotBar 
            level={2} 
            current={spellSlots[2]} 
            max={maxSlots[2]} 
          />
          <SpellSlotBar 
            level={3} 
            current={spellSlots[3]} 
            max={maxSlots[3]} 
          />
        </div>
      </section>
      
      {/* Sorts préparés */}
      <section className="card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-lg text-ink flex items-center gap-2">
            <Shield className="w-5 h-5 text-divine-gold" />
            Sorts préparés
          </h3>
          <span className="text-sm font-ui text-ink-muted">
            {preparedCount + domainSpells.length} / {maxPrepared + domainSpells.length}
          </span>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-ink-light">Sorts du {character.domain?.name} (toujours)</span>
            <span className="font-bold text-divine-gold-dark">{domainSpells.length}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-ink-light">Autres sorts</span>
            <span className={`font-bold ${preparedCount >= maxPrepared ? 'text-forest' : 'text-ink'}`}>
              {preparedCount} / {maxPrepared}
            </span>
          </div>
        </div>
        
        <Link 
          to="/prepare" 
          className="btn-primary w-full mt-4 text-center block"
        >
          {preparedCount === 0 ? 'Préparer les sorts du jour' : 'Modifier la préparation'}
        </Link>
      </section>
      
      {/* Capacités */}
      <section className="card">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-display text-lg text-ink flex items-center gap-2">
            <Zap className="w-5 h-5 text-divine-gold" />
            Capacités du {character.domain?.name}
          </h3>
        </div>
        
        <div className="space-y-3">
          {/* Prêtre de guerre / Capacité de niveau 1 du domaine */}
          <div className="flex flex-wrap items-center justify-between gap-y-2">
            <span className="text-ink-light text-sm flex items-center gap-1">
              <Sword className="w-4 h-4" /> 
              {character.domain?.abilities.level1.name}
            </span>
            <div className="flex flex-wrap items-center gap-1">
              {Array.from({ length: warCleric.maxUses }).map((_, i) => (
                <Zap 
                  key={i} 
                  className={`w-5 h-5 ${
                    i < warCleric.currentUses 
                      ? 'text-divine-gold fill-divine-gold' 
                      : 'text-parchment-dark'
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Conduit divin */}
          <div className="flex flex-wrap items-center justify-between gap-y-2">
            <span className="text-ink-light text-sm flex items-center gap-1">
              <Stars className="w-4 h-4" /> 
              Conduit divin
            </span>
            <div className="flex flex-wrap items-center gap-1">
              {Array.from({ length: channelDivinity.maxUses }).map((_, i) => (
                <div 
                  key={i} 
                  className={`w-4 h-4 rounded-full ${
                    i < channelDivinity.currentUses 
                      ? 'bg-divine-gold' 
                      : 'bg-parchment-dark'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        
        <button
          onClick={() => openEditor('abilities')}
          className="w-full mt-3 text-xs text-ink-muted hover:text-ink flex items-center justify-center gap-1"
        >
          <Edit3 className="w-3 h-3" />
          Voir toutes les capacités
        </button>
      </section>
      
      {/* Concentration active */}
      {activeConcentration && (
        <section className="card bg-royal-purple/10 border-royal-purple/30">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-royal-purple" />
            <h3 className="font-display text-ink">Concentration active</h3>
          </div>
          <p className="text-ink-light text-sm">
            Vous maintenez actuellement un sort de concentration.
            Lancer un autre sort de concentration le dissipera.
          </p>
        </section>
      )}
      
      {/* Talents et compétences - Résumé */}
      <section className="card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-lg text-ink flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-divine-gold" />
            Talents et compétences
          </h3>
          <button 
            onClick={() => openEditor('skills')}
            className="p-1.5 text-ink-muted hover:text-divine-gold transition-colors"
            title="Éditer les talents et compétences"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>
        
        <div className="space-y-2">
          {/* Compétences maîtrisées */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-ink-light">Compétences maîtrisées</span>
            <span className="font-bold text-divine-gold-dark">
              {(character.masteredSkills || []).length}
            </span>
          </div>
          {(character.masteredSkills || []).length > 0 && (
            <div className="flex flex-wrap gap-1">
              {(character.masteredSkills || []).slice(0, 3).map(skillId => {
                const skill = getSkillById(skillId);
                return skill ? (
                  <span key={skillId} className="text-xs bg-parchment-dark px-2 py-1 rounded">
                    {skill.name}
                  </span>
                ) : null;
              })}
              {(character.masteredSkills || []).length > 3 && (
                <span className="text-xs text-ink-muted px-2 py-1">
                  +{(character.masteredSkills || []).length - 3} autres
                </span>
              )}
            </div>
          )}
          
          {/* Talents */}
          <div className="flex items-center justify-between text-sm pt-2 border-t border-parchment-dark/50">
            <span className="text-ink-light">Talents</span>
            <span className="font-bold text-divine-gold-dark">
              {(character.feats || []).length}
            </span>
          </div>
          {(character.feats || []).length > 0 && (
            <div className="flex flex-wrap gap-1">
              {(character.feats || []).slice(0, 2).map(featId => {
                const feat = getFeatById(featId);
                return feat ? (
                  <span key={featId} className="text-xs bg-divine-gold/20 text-divine-gold-dark px-2 py-1 rounded">
                    {feat.name}
                  </span>
                ) : null;
              })}
              {(character.feats || []).length > 2 && (
                <span className="text-xs text-ink-muted px-2 py-1">
                  +{(character.feats || []).length - 2} autres
                </span>
              )}
            </div>
          )}
        </div>
      </section>
      
      {/* Actions rapides */}
      <section className="grid grid-cols-1 gap-3">
        <button 
          onClick={() => openEditor('skills')}
          className="btn-secondary text-center flex items-center justify-center gap-2"
        >
          <GraduationCap className="w-5 h-5" />
          Talents et compétences
        </button>
      </section>
      
      {/* Éditeur de personnage */}
      <CharacterEditorModal 
        isOpen={showEditor} 
        onClose={() => setShowEditor(false)}
        initialTab={editorInitialTab}
      />
    </div>
  );
}