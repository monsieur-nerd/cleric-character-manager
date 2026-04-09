import { useState, useRef, useEffect } from 'react';
import { Sparkles, Zap, Brain, Sword, Stars, User, Camera, Cross, Heart, X, ChevronDown, ChevronUp, GraduationCap, Menu, Check, Scroll } from 'lucide-react';
import { useSpellStore, useCharacterStore, useModalStore } from '@/stores';
import { useItemEffects } from '@/hooks';
import { DomainRadarChart, DomainRadarCompare } from '@/components/character/DomainRadarChart';

import { formatModifier } from '@/utils/formatters';
import type { Deity, ClericDomain, DomainSpellProfile } from '@/types';
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
              src={currentDeity.symbol?.startsWith('images/') ? `/cleric-character-manager/${currentDeity.symbol}` : currentDeity.symbol}
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
                  src={deity.symbol?.startsWith('images/') ? `/cleric-character-manager/${deity.symbol}` : deity.symbol}
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

// Navigation mobile pour la fiche de personnage
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
    { id: 'skills' as const, label: 'Talents, traits et compétences', icon: GraduationCap },
  ];
  
  const activeTabInfo = tabs.find(t => t.id === activeTab);
  
  return (
    <div className="sm:hidden border-b border-parchment-dark bg-parchment-dark/5">
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
        >
          {isOpen ? <X className="w-5 h-5 text-ink" /> : <Menu className="w-5 h-5 text-ink" />}
        </button>
      </div>
      
      {isOpen && (
        <div className="absolute left-3 right-3 mt-1 bg-parchment-light border border-parchment-dark/60 rounded-xl shadow-2xl z-50">
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
function CharacterEditorModal({ isOpen, onClose, initialTab = 'identity' }: { 
  isOpen: boolean; 
  onClose: () => void; 
  initialTab?: 'identity' | 'stats' | 'abilities' | 'skills';
}) {
  const character = useCharacterStore((state) => state.character);
  const getSpellById = useSpellStore((state) => state.getSpellById);
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
  const setLanguages = useCharacterStore((state) => state.setLanguages);
  
  const [activeTab, setActiveTab] = useState(initialTab);
  const [localName, setLocalName] = useState(character.name);
  const [localLevel, setLocalLevel] = useState(character.level);
  const [localStr, setLocalStr] = useState(character.strength);
  const [localDex, setLocalDex] = useState(character.dexterity || 10);
  const [localCon, setLocalCon] = useState(character.constitution);
  const [localInt, setLocalInt] = useState(character.intelligence || 10);
  const [localWisdom, setLocalWisdom] = useState(character.wisdom);
  const [localCha, setLocalCha] = useState(character.charisma || 10);
  const [localDescription, setLocalDescription] = useState(character.description || '');
  const [localRace, setLocalRace] = useState(character.race || 'Humain');
  const [localAlignment, setLocalAlignment] = useState(character.alignment || 'Neutre Bon');
  const [localAge, setLocalAge] = useState(character.age || 25);
  const [localHeight, setLocalHeight] = useState(character.height || '');
  const [localWeight, setLocalWeight] = useState(character.weight || 75);
  const [localLanguages, setLocalLanguages] = useState(character.languages?.join(', ') || 'Commun');
  
  // Reset local state when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setLocalName(character.name);
      setLocalLevel(character.level);
      setLocalStr(character.strength);
      setLocalDex(character.dexterity || 10);
      setLocalCon(character.constitution);
      setLocalInt(character.intelligence || 10);
      setLocalWisdom(character.wisdom);
      setLocalCha(character.charisma || 10);
      setLocalDescription(character.description || '');
      setLocalRace(character.race || 'Humain');
      setLocalAlignment(character.alignment || 'Neutre Bon');
      setLocalAge(character.age || 25);
      setLocalHeight(character.height || '');
      setLocalWeight(character.weight || 75);
      setLocalLanguages(character.languages?.join(', ') || 'Commun');
    }
  }, [isOpen, initialTab, character]);
  
  const currentDeity = character.deity?.id ? DEITIES.find(d => d.id === character.deity?.id) || character.deity : character.deity;
  
  if (!isOpen) return null;
  
  const handleSave = () => {
    setName(localName);
    setLevel(localLevel);
    setStrength(localStr);
    setDexterity(localDex);
    setConstitution(localCon);
    setIntelligence(localInt);
    setWisdom(localWisdom);
    setCharisma(localCha);
    setDescription(localDescription);
    setRace(localRace);
    setAlignment(localAlignment);
    setAge(localAge);
    setHeight(localHeight);
    setWeight(localWeight);
    setLanguages(localLanguages.split(',').map(l => l.trim()).filter(l => l));
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
        
        {/* Info récapitulative du personnage */}
        <div className="bg-divine-gold/10 px-4 py-3 border-b border-divine-gold/30">
          <div className="flex items-center gap-3">
            {/* Avatar miniature */}
            <div className="w-12 h-12 rounded-full bg-parchment-dark border-2 border-divine-gold overflow-hidden flex-shrink-0">
              {character.avatar ? (
                <img 
                  src={character.avatar} 
                  alt={character.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-6 h-6 text-ink-muted m-auto mt-2.5" />
              )}
            </div>
            
            {/* Informations */}
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-lg text-ink truncate">{character.name}</h3>
              <div className="flex flex-wrap items-center gap-x-2 text-sm text-ink-muted">
                <span>{character.race || 'Humain'}</span>
                <span>•</span>
                <span>{character.alignment || 'Neutre Bon'}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                {character.deity?.symbol && (
                  <span className="text-lg">
                    {(character.deity.symbol.startsWith('images/') || character.deity.symbol.startsWith('/')) ? (
                      <img 
                        src={character.deity.symbol.startsWith('images/') ? `/cleric-character-manager/${character.deity.symbol}` : character.deity.symbol}
                        alt={character.deity.name}
                        className="w-4 h-4 object-contain inline"
                      />
                    ) : (
                      character.deity.symbol
                    )}
                  </span>
                )}
                <span className="text-sm text-amber-900 font-medium">
                  {character.deity?.name || 'Sans divinité'}
                </span>
                <span className="text-ink-muted">•</span>
                <span className="text-sm text-ink">
                  {character.domain?.name || 'Clerc'} • Niveau {character.level}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs - Desktop */}
        <div className="hidden sm:flex border-b border-parchment-dark bg-parchment-dark/5">
          {[
            { id: 'identity', label: 'Identité', icon: User },
            { id: 'stats', label: 'Caractéristiques', icon: Brain },
            { id: 'abilities', label: 'Capacités', icon: Zap },
            { id: 'skills', label: 'Compétences', icon: GraduationCap },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
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
        
        {/* Menu mobile */}
        <CharacterSheetMobileNav activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="p-4 space-y-6">
          {/* Tab Identité */}
          {activeTab === 'identity' && (
            <div className="space-y-6">
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
              
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Divinité vénérée</label>
                <DeitySelector 
                  currentDeity={currentDeity} 
                  onSelect={(deityId) => setDeity(deityId)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Domaine divin</label>
                <DomainSelector 
                  currentDomain={character.domain} 
                  onSelect={(domainId) => setDomain(domainId)}
                />
              </div>
              
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
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Âge</label>
                  <input
                    type="number"
                    value={localAge}
                    onChange={(e) => setLocalAge(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full input-field text-center"
                    min="1"
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
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Langues parlées</label>
                <input
                  type="text"
                  value={localLanguages}
                  onChange={(e) => setLocalLanguages(e.target.value)}
                  className="w-full input-field"
                  placeholder="Commun, Elfique, Draconique..."
                />
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
                    <div className="text-sm text-steel-blue font-bold">{formatModifier(localStr)}</div>
                  </div>
                  <button
                    onClick={() => setLocalStr(Math.min(30, localStr + 1))}
                    className="w-10 h-10 rounded-lg bg-parchment-dark hover:bg-steel-blue/20 flex items-center justify-center text-xl font-bold"
                  >
                    +
                  </button>
                </div>
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
                    <div className="text-sm text-forest font-bold">{formatModifier(localDex)}</div>
                  </div>
                  <button
                    onClick={() => setLocalDex(Math.min(30, localDex + 1))}
                    className="w-10 h-10 rounded-lg bg-parchment-dark hover:bg-forest/20 flex items-center justify-center text-xl font-bold"
                  >
                    +
                  </button>
                </div>
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
                    <div className="text-sm text-blood-red font-bold">{formatModifier(localCon)}</div>
                  </div>
                  <button
                    onClick={() => setLocalCon(Math.min(30, localCon + 1))}
                    className="w-10 h-10 rounded-lg bg-parchment-dark hover:bg-blood-red/20 flex items-center justify-center text-xl font-bold"
                  >
                    +
                  </button>
                </div>
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
                    <div className="text-sm text-royal-purple font-bold">{formatModifier(localInt)}</div>
                  </div>
                  <button
                    onClick={() => setLocalInt(Math.min(30, localInt + 1))}
                    className="w-10 h-10 rounded-lg bg-parchment-dark hover:bg-royal-purple/20 flex items-center justify-center text-xl font-bold"
                  >
                    +
                  </button>
                </div>
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
                    <div className="text-sm text-divine-gold-dark font-bold">{formatModifier(localWisdom)}</div>
                  </div>
                  <button
                    onClick={() => setLocalWisdom(Math.min(30, localWisdom + 1))}
                    className="w-10 h-10 rounded-lg bg-parchment-dark hover:bg-divine-gold/20 flex items-center justify-center text-xl font-bold"
                  >
                    +
                  </button>
                </div>
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
                    <div className="text-sm text-bronze font-bold">{formatModifier(localCha)}</div>
                  </div>
                  <button
                    onClick={() => setLocalCha(Math.min(30, localCha + 1))}
                    className="w-10 h-10 rounded-lg bg-parchment-dark hover:bg-bronze/20 flex items-center justify-center text-xl font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Tab Capacités */}
          {activeTab === 'abilities' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-display text-lg text-ink">Capacités du {character.domain?.name || 'domaine'}</h3>
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
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="mt-4 p-4 bg-divine-gold/10 rounded-lg border border-divine-gold/30">
                <h4 className="font-display text-ink mb-2">Sorts de domaine toujours préparés</h4>
                <div className="flex flex-wrap gap-2">
                  {character.domain?.spellIds.map((spellId) => {
                    const spell = getSpellById(spellId);
                    return (
                      <span key={spellId} className="badge-domain text-xs">
                        {spell?.name || spellId.replace(/-/g, ' ')}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          
          {/* Tab Compétences */}
          {activeTab === 'skills' && (
            <div className="p-4 text-center text-ink-muted">
              <p>Gérez vos compétences depuis le tableau de bord principal.</p>
            </div>
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

// Composant global qui utilise le store
export function CharacterEditorGlobal() {
  const isOpen = useModalStore((state) => state.isCharacterEditorOpen);
  const closeModal = useModalStore((state) => state.closeCharacterEditor);
  const initialTab = useModalStore((state) => state.editorInitialTab);
  
  return (
    <CharacterEditorModal
      isOpen={isOpen}
      onClose={closeModal}
      initialTab={initialTab}
    />
  );
}
