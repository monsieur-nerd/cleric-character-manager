import { useState } from 'react';
import { 
  X, GraduationCap, Star, Check, Filter, BookOpen, Plus, 
  Trash2, Shield, Zap, Eye, Sparkles, Swords, Brain, Heart,
  ChevronDown, ChevronUp
} from 'lucide-react';
import { useCharacterStore } from '@/stores';
import { SKILLS, type AbilityScore, ABILITY_SCORES, type CustomSkill, type Skill } from '@/types/skills';
import { FEATS, type CustomFeat, type Feat } from '@/types/feats';

interface SkillsFeatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ABILITY_COLORS: Record<AbilityScore, string> = {
  STR: 'text-red-600',
  DEX: 'text-green-600',
  CON: 'text-orange-600',
  INT: 'text-blue-600',
  WIS: 'text-purple-600',
  CHA: 'text-pink-600',
};

const ABILITY_BG_COLORS: Record<AbilityScore, string> = {
  STR: 'bg-red-50',
  DEX: 'bg-green-50',
  CON: 'bg-orange-50',
  INT: 'bg-blue-50',
  WIS: 'bg-purple-50',
  CHA: 'bg-pink-50',
};

const ABILITY_ICONS: Record<AbilityScore, typeof Swords> = {
  STR: Swords,
  DEX: Zap,
  CON: Heart,
  INT: Brain,
  WIS: Eye,
  CHA: Sparkles,
};

// ============================================
// MODALE DE COMPÉTENCES ET TALENTS
// ============================================

export function SkillsFeatsModal({ isOpen, onClose }: SkillsFeatsModalProps) {
  const [activeTab, setActiveTab] = useState<'skills' | 'feats'>('skills');
  const [showOnlyMastered, setShowOnlyMastered] = useState(false);
  const [showOnlyOwned, setShowOnlyOwned] = useState(false);
  const [filterAbility, setFilterAbility] = useState<AbilityScore | 'all'>('all');
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
  const [expandedFeat, setExpandedFeat] = useState<string | null>(null);

  const character = useCharacterStore((state) => state.character);
  const toggleSkill = useCharacterStore((state) => state.toggleSkill);
  const addFeat = useCharacterStore((state) => state.addFeat);
  const removeFeat = useCharacterStore((state) => state.removeFeat);
  const getProficiencyBonus = useCharacterStore((state) => state.getProficiencyBonus);
  const getModifier = useCharacterStore((state) => state.getModifier);

  if (!isOpen) return null;

  const masteredSkills = character.masteredSkills || [];
  const ownedFeats = character.feats || [];
  const profBonus = getProficiencyBonus() || 2;

  // Filter skills
  let filteredSkills = SKILLS;
  if (showOnlyMastered) {
    filteredSkills = filteredSkills.filter(skill => masteredSkills.includes(skill.id));
  }
  if (filterAbility !== 'all') {
    filteredSkills = filteredSkills.filter(skill => skill.abilityScore === filterAbility);
  }

  // Filter feats
  let filteredFeats = FEATS;
  if (showOnlyOwned) {
    filteredFeats = filteredFeats.filter(feat => ownedFeats.includes(feat.id));
  }

  // Note: getSkillTotalBonus et formatBonus sont utilisés dans SkillsContent

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-parchment-light w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-xl shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-parchment-dark bg-parchment-dark/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-divine-gold/20 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-divine-gold" />
            </div>
            <div>
              <h2 className="font-display text-xl text-ink">Talents et compétences</h2>
              <p className="text-xs text-ink-muted">
                Bonus de maîtrise : <span className="font-bold text-divine-gold">+{profBonus}</span>
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-parchment-dark rounded-lg transition-colors">
            <X className="w-5 h-5 text-ink" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-parchment-dark bg-parchment-dark/10">
          <button
            onClick={() => setActiveTab('feats')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
              activeTab === 'feats'
                ? 'text-divine-gold-dark border-b-2 border-divine-gold bg-divine-gold/5'
                : 'text-ink-muted hover:text-ink hover:bg-parchment-dark/30'
            }`}
          >
            <Star className="w-4 h-4" />
            Talents
            <span className="text-xs bg-parchment-dark px-2 py-0.5 rounded-full">
              {ownedFeats.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
              activeTab === 'skills'
                ? 'text-divine-gold-dark border-b-2 border-divine-gold bg-divine-gold/5'
                : 'text-ink-muted hover:text-ink hover:bg-parchment-dark/30'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Compétences
            <span className="text-xs bg-parchment-dark px-2 py-0.5 rounded-full">
              {masteredSkills.length}/{SKILLS.length}
            </span>
          </button>
        </div>

        {/* Filters */}
        <div className="p-3 border-b border-parchment-dark bg-parchment-dark/5">
          {activeTab === 'skills' ? (
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setShowOnlyMastered(!showOnlyMastered)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  showOnlyMastered
                    ? 'bg-divine-gold text-ink'
                    : 'bg-parchment-dark text-ink-muted hover:text-ink'
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                {showOnlyMastered ? 'Mes compétences' : 'Toutes'}
              </button>
              <div className="h-4 w-px bg-parchment-dark mx-1" />
              {(['all', 'STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'] as const).map((ability) => (
                <button
                  key={ability}
                  onClick={() => setFilterAbility(ability)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    filterAbility === ability
                      ? ability === 'all'
                        ? 'bg-ink text-parchment-light'
                        : ABILITY_BG_COLORS[ability]
                      : 'bg-parchment-dark text-ink-muted hover:text-ink'
                  } ${filterAbility === ability && ability !== 'all' ? ABILITY_COLORS[ability] : ''}`}
                >
                  {ability === 'all' ? 'Tout' : ABILITY_SCORES[ability].name}
                </button>
              ))}
            </div>
          ) : (
            <button
              onClick={() => setShowOnlyOwned(!showOnlyOwned)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                showOnlyOwned
                  ? 'bg-divine-gold text-ink'
                  : 'bg-parchment-dark text-ink-muted hover:text-ink'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              {showOnlyOwned ? 'Mes talents' : 'Tous les talents'}
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'skills' ? (
            <SkillsContent 
              skills={filteredSkills}
              masteredSkills={masteredSkills}
              profBonus={profBonus}
              character={character}
              getModifier={getModifier}
              toggleSkill={toggleSkill}
              expandedSkill={expandedSkill}
              setExpandedSkill={setExpandedSkill}
            />
          ) : (
            <FeatsContent 
              feats={filteredFeats}
              ownedFeats={ownedFeats}
              addFeat={addFeat}
              removeFeat={removeFeat}
              expandedFeat={expandedFeat}
              setExpandedFeat={setExpandedFeat}
            />
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-parchment-dark bg-parchment-dark/10">
          {activeTab === 'skills' ? (
            <div className="flex justify-between items-center text-sm">
              <span className="text-ink-muted">
                {masteredSkills.length} compétence{masteredSkills.length > 1 ? 's' : ''} maîtrisée{masteredSkills.length > 1 ? 's' : ''}
              </span>
              <span className="text-ink-muted">
                Bonus de maîtrise : +{profBonus}
              </span>
            </div>
          ) : (
            <div className="flex justify-between items-center text-sm">
              <span className="text-ink-muted">
                {ownedFeats.length} talent{ownedFeats.length > 1 ? 's' : ''} possédé{ownedFeats.length > 1 ? 's' : ''}
              </span>
              <span className="text-ink-muted">
                {FEATS.length} talents disponibles
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================
// SOUS-COMPOSANT : CONTENU COMPÉTENCES
// ============================================

interface SkillsContentProps {
  skills: typeof SKILLS;
  masteredSkills: string[];
  profBonus: number;
  character: ReturnType<typeof useCharacterStore.getState>['character'];
  getModifier: (score: number | undefined) => number;
  toggleSkill: (skillId: string) => void;
  expandedSkill: string | null;
  setExpandedSkill: (id: string | null) => void;
}

function SkillsContent({
  skills,
  masteredSkills,
  profBonus,
  character,
  getModifier,
  toggleSkill,
  expandedSkill,
  setExpandedSkill,
}: SkillsContentProps) {
  const customSkills = useCharacterStore((state) => state.customSkills);
  const addCustomSkill = useCharacterStore((state) => state.addCustomSkill);
  const removeCustomSkill = useCharacterStore((state) => state.removeCustomSkill);
  const toggleCustomSkill = useCharacterStore((state) => state.toggleCustomSkill);
  const customMasteredSkills = character.customMasteredSkills || [];
  
  const [showAddModal, setShowAddModal] = useState(false);

  const getSkillTotalBonus = (skillId: string, abilityScore: AbilityScore): number => {
    const abilityValue = (character[abilityScore.toLowerCase() as keyof typeof character] as number) || 10;
    const abilityMod = getModifier(abilityValue);
    const isMastered = masteredSkills.includes(skillId) || customMasteredSkills.includes(skillId);
    return abilityMod + (isMastered ? profBonus : 0);
  };

  const formatBonus = (bonus: number): string => {
    return bonus >= 0 ? `+${bonus}` : `${bonus}`;
  };

  return (
    <div className="space-y-4">
      {/* Bouton ajouter compétence perso */}
      <button
        onClick={() => setShowAddModal(true)}
        className="w-full flex items-center justify-center gap-2 p-3 rounded-lg border-2 border-dashed border-divine-gold/50 text-divine-gold-dark hover:bg-divine-gold/5 transition-colors"
      >
        <Plus className="w-4 h-4" />
        Ajouter une compétence personnalisée
      </button>

      {/* Grille de compétences */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Compétences standards */}
        {skills.map((skill) => {
          const isMastered = masteredSkills.includes(skill.id);
          const bonus = getSkillTotalBonus(skill.id, skill.abilityScore);
          const isExpanded = expandedSkill === skill.id;
          const AbilityIcon = ABILITY_ICONS[skill.abilityScore];

          return (
            <SkillCard
              key={skill.id}
              skill={skill}
              isMastered={isMastered}
              bonus={bonus}
              isExpanded={isExpanded}
              AbilityIcon={AbilityIcon}
              onToggle={() => toggleSkill(skill.id)}
              onExpand={() => setExpandedSkill(isExpanded ? null : skill.id)}
              formatBonus={formatBonus}
            />
          );
        })}

        {/* Compétences personnalisées */}
        {customSkills.map((skill) => {
          const isMastered = customMasteredSkills.includes(skill.id);
          const bonus = getSkillTotalBonus(skill.id, skill.abilityScore);
          const isExpanded = expandedSkill === skill.id;
          const AbilityIcon = ABILITY_ICONS[skill.abilityScore];

          return (
            <SkillCard
              key={skill.id}
              skill={skill}
              isMastered={isMastered}
              bonus={bonus}
              isExpanded={isExpanded}
              AbilityIcon={AbilityIcon}
              onToggle={() => toggleCustomSkill(skill.id)}
              onExpand={() => setExpandedSkill(isExpanded ? null : skill.id)}
              formatBonus={formatBonus}
              isCustom
              onDelete={() => removeCustomSkill(skill.id)}
            />
          );
        })}
      </div>

      {/* Modal d'ajout de compétence */}
      {showAddModal && (
        <AddSkillModal 
          onClose={() => setShowAddModal(false)} 
          onAdd={addCustomSkill}
        />
      )}
    </div>
  );
}

// ============================================
// CARTE DE COMPÉTENCE
// ============================================

interface SkillCardProps {
  skill: Skill | CustomSkill;
  isMastered: boolean;
  bonus: number;
  isExpanded: boolean;
  AbilityIcon: typeof Swords;
  onToggle: () => void;
  onExpand: () => void;
  formatBonus: (bonus: number) => string;
  isCustom?: boolean;
  onDelete?: () => void;
}

function SkillCard({
  skill,
  isMastered,
  bonus,
  isExpanded,
  AbilityIcon,
  onToggle,
  onExpand,
  formatBonus,
  isCustom,
  onDelete,
}: SkillCardProps) {
  // Assurer que abilityScore est une clé valide
  const abilityScore = skill.abilityScore as AbilityScore;
  const abilityName = ABILITY_SCORES[abilityScore]?.name || abilityScore;
  const abilityColor = ABILITY_COLORS[abilityScore];
  const abilityBg = ABILITY_BG_COLORS[abilityScore];

  return (
    <div
      className={`relative p-3 rounded-lg border-2 transition-all ${
        isMastered
          ? 'bg-divine-gold/10 border-divine-gold shadow-sm'
          : 'bg-parchment-light border-parchment-dark/50 hover:border-parchment-dark'
      }`}
    >
      {/* Badge personnalisé */}
      {isCustom && (
        <span className="absolute -top-2 -right-2 text-[10px] bg-royal-purple text-white px-1.5 py-0.5 rounded-full">
          Perso
        </span>
      )}

      <div className="flex items-start gap-3">
        {/* Checkbox de maîtrise */}
        <button
          onClick={onToggle}
          className={`flex-shrink-0 w-6 h-6 rounded flex items-center justify-center transition-colors ${
            isMastered
              ? 'bg-divine-gold text-ink'
              : 'bg-parchment-dark/50 text-transparent hover:text-ink-muted'
          }`}
        >
          <Check className="w-4 h-4" />
        </button>

        {/* Contenu */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-medium text-ink text-sm">{skill.name}</h3>
              {/* Résumé succinct */}
              <p className="text-xs text-ink-muted mt-0.5 line-clamp-1">
                {skill.summary}
              </p>
            </div>
            
            {/* Bonus */}
            <div className={`text-right flex-shrink-0 ${isMastered ? 'text-divine-gold-dark' : 'text-ink-muted'}`}>
              <span className="font-display text-lg">{formatBonus(bonus)}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 mt-2">
            <span className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${abilityBg} ${abilityColor}`}>
              <AbilityIcon className="w-3 h-3" />
              {abilityName}
            </span>
            {isMastered && (
              <span className="text-[10px] bg-divine-gold/30 text-divine-gold-dark px-1.5 py-0.5 rounded">
                Maîtrisé
              </span>
            )}
          </div>

          {/* Description détaillée (expandable) */}
          {isExpanded && (
            <div className="mt-3 pt-3 border-t border-parchment-dark/50 text-sm animate-fade-in">
              <p className="text-ink-light mb-2">{skill.description}</p>
              {'examples' in skill && skill.examples && (
                <div className="space-y-1">
                  <p className="text-xs font-medium text-ink">Exemples d&apos;utilisation :</p>
                  <ul className="text-xs text-ink-muted list-disc list-inside">
                    {skill.examples.map((example: string, i: number) => (
                      <li key={i}>{example}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Bouton expand */}
          <button
            onClick={onExpand}
            className="mt-2 text-xs text-ink-muted hover:text-ink flex items-center gap-1"
          >
            {isExpanded ? (
              <><ChevronUp className="w-3 h-3" /> Moins</>
            ) : (
              <><ChevronDown className="w-3 h-3" /> Plus</>
            )}
          </button>
        </div>

        {/* Bouton supprimer (compétence perso uniquement) */}
        {isCustom && onDelete && (
          <button
            onClick={onDelete}
            className="flex-shrink-0 p-1 text-ink-muted hover:text-blood-red transition-colors"
            title="Supprimer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

// ============================================
// MODALE D'AJOUT DE COMPÉTENCE
// ============================================

interface AddSkillModalProps {
  onClose: () => void;
  onAdd: (skill: Omit<CustomSkill, 'id'>) => void;
}

function AddSkillModal({ onClose, onAdd }: AddSkillModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [summary, setSummary] = useState('');
  const [abilityScore, setAbilityScore] = useState<AbilityScore>('WIS');
  const [category, setCategory] = useState<'physical' | 'mental' | 'social'>('mental');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;
    
    onAdd({
      name: name.trim(),
      description: description.trim(),
      summary: summary.trim() || description.trim().slice(0, 50) + '...',
      abilityScore,
      category,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-parchment-light w-full max-w-md rounded-xl shadow-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg text-ink">Nouvelle compétence</h3>
          <button onClick={onClose} className="p-1 hover:bg-parchment-dark rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Nom</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              placeholder="Ex: Connaissance des dragons"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1">Résumé (court)</label>
            <input
              type="text"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="input-field"
              placeholder="Ex: Connaissance des espèces draconiques"
              maxLength={50}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Caractéristique</label>
              <select
                value={abilityScore}
                onChange={(e) => setAbilityScore(e.target.value as AbilityScore)}
                className="input-field"
              >
                {Object.entries(ABILITY_SCORES).map(([key, { name }]) => (
                  <option key={key} value={key}>{name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Catégorie</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as typeof category)}
                className="input-field"
              >
                <option value="physical">Physique</option>
                <option value="mental">Mentale</option>
                <option value="social">Sociale</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1">Description complète</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field min-h-[80px] resize-none"
              placeholder="Décrivez quand et comment utiliser cette compétence..."
              required
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Annuler
            </button>
            <button type="submit" className="btn-primary flex-1">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ============================================
// SOUS-COMPOSANT : CONTENU TALENTS
// ============================================

interface FeatsContentProps {
  feats: typeof FEATS;
  ownedFeats: string[];
  addFeat: (featId: string) => void;
  removeFeat: (featId: string) => void;
  expandedFeat: string | null;
  setExpandedFeat: (id: string | null) => void;
}

function FeatsContent({
  feats,
  ownedFeats,
  addFeat,
  removeFeat,
  expandedFeat,
  setExpandedFeat,
}: FeatsContentProps) {
  const customFeats = useCharacterStore((state) => state.customFeats);
  const addCustomFeat = useCharacterStore((state) => state.addCustomFeat);
  const removeCustomFeat = useCharacterStore((state) => state.removeCustomFeat);
  const toggleCustomFeat = useCharacterStore((state) => state.toggleCustomFeat);
  const character = useCharacterStore((state) => state.character);
  const customOwnedFeats = character.customOwnedFeats || [];
  
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="space-y-4">
      {/* Bouton ajouter talent perso */}
      <button
        onClick={() => setShowAddModal(true)}
        className="w-full flex items-center justify-center gap-2 p-3 rounded-lg border-2 border-dashed border-divine-gold/50 text-divine-gold-dark hover:bg-divine-gold/5 transition-colors"
      >
        <Plus className="w-4 h-4" />
        Ajouter un talent personnalisé
      </button>

      {/* Liste des talents */}
      <div className="space-y-3">
        {/* Talents standards */}
        {feats.map((feat) => {
          const isOwned = ownedFeats.includes(feat.id);
          const isExpanded = expandedFeat === feat.id;

          return (
            <FeatCard
              key={feat.id}
              feat={feat}
              isOwned={isOwned}
              isExpanded={isExpanded}
              onToggle={() => isOwned ? removeFeat(feat.id) : addFeat(feat.id)}
              onExpand={() => setExpandedFeat(isExpanded ? null : feat.id)}
            />
          );
        })}

        {/* Talents personnalisés */}
        {customFeats.map((feat) => {
          const isOwned = customOwnedFeats.includes(feat.id);
          const isExpanded = expandedFeat === feat.id;

          return (
            <FeatCard
              key={feat.id}
              feat={feat}
              isOwned={isOwned}
              isExpanded={isExpanded}
              onToggle={() => toggleCustomFeat(feat.id)}
              onExpand={() => setExpandedFeat(isExpanded ? null : feat.id)}
              isCustom
              onDelete={() => removeCustomFeat(feat.id)}
            />
          );
        })}
      </div>

      {/* Modal d'ajout de talent */}
      {showAddModal && (
        <AddFeatModal 
          onClose={() => setShowAddModal(false)} 
          onAdd={addCustomFeat}
        />
      )}
    </div>
  );
}

// ============================================
// CARTE DE TALENT
// ============================================

interface FeatCardProps {
  feat: Feat | CustomFeat;
  isOwned: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  onExpand: () => void;
  isCustom?: boolean;
  onDelete?: () => void;
}

function FeatCard({
  feat,
  isOwned,
  isExpanded,
  onToggle,
  onExpand,
  isCustom,
  onDelete,
}: FeatCardProps) {
  return (
    <div
      className={`relative p-4 rounded-lg border-2 transition-all ${
        isOwned
          ? 'bg-divine-gold/10 border-divine-gold shadow-sm'
          : 'bg-parchment-light border-parchment-dark/50'
      }`}
    >
      {/* Badge personnalisé */}
      {isCustom && (
        <span className="absolute -top-2 -right-2 text-[10px] bg-royal-purple text-white px-1.5 py-0.5 rounded-full">
          Perso
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-medium text-ink">{feat.name}</h3>
            
            {/* Badges */}
            <div className="flex items-center gap-1">
              {'isCombatFeat' in feat && feat.isCombatFeat && (
                <span className="flex items-center gap-1 text-[10px] bg-blood-red/20 text-blood-red px-1.5 py-0.5 rounded">
                  <Swords className="w-3 h-3" />
                  Combat
                </span>
              )}
              {'isPassive' in feat && feat.isPassive && (
                <span className="flex items-center gap-1 text-[10px] bg-forest/20 text-forest px-1.5 py-0.5 rounded">
                  <Shield className="w-3 h-3" />
                  Passif
                </span>
              )}
              {isOwned && (
                <span className="text-[10px] bg-divine-gold/30 text-divine-gold-dark px-1.5 py-0.5 rounded">
                  Possédé
                </span>
              )}
            </div>
          </div>

          {/* Prérequis */}
          {feat.prerequisite && (
            <p className="text-xs text-ink-muted mt-1">
              Prérequis : {feat.prerequisite}
            </p>
          )}

          {/* Description courte */}
          <p className="text-sm text-ink-light mt-2">{feat.description}</p>

          {/* Effet principal */}
          <div className="mt-2 p-2 bg-parchment-dark/30 rounded text-sm">
            <span className="font-medium text-ink">Effet : </span>
            <span className="text-ink-light">{feat.effect}</span>
          </div>

          {/* Détails expansibles */}
          {isExpanded && (
            <div className="mt-3 pt-3 border-t border-parchment-dark/50 animate-fade-in">
              {'benefit' in feat && feat.benefit && feat.benefit.length > 0 && (
                <div className="space-y-1">
                  <p className="text-xs font-medium text-ink">Avantages :</p>
                  <ul className="text-xs text-ink-muted list-disc list-inside space-y-0.5">
                    {feat.benefit.map((b: string, i: number) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 mt-3">
            <button
              onClick={onToggle}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                isOwned
                  ? 'bg-parchment-dark text-ink hover:bg-blood-red/20 hover:text-blood-red'
                  : 'bg-divine-gold text-ink hover:bg-divine-gold-light'
              }`}
            >
              {isOwned ? 'Retirer' : 'Ajouter'}
            </button>
            
            <button
              onClick={onExpand}
              className="text-xs text-ink-muted hover:text-ink flex items-center gap-1"
            >
              {isExpanded ? (
                <><ChevronUp className="w-3 h-3" /> Moins</>
              ) : (
                <><ChevronDown className="w-3 h-3" /> Détails</>
              )}
            </button>

            {isCustom && onDelete && (
              <button
                onClick={onDelete}
                className="ml-auto text-ink-muted hover:text-blood-red transition-colors"
                title="Supprimer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// MODALE D'AJOUT DE TALENT
// ============================================

interface AddFeatModalProps {
  onClose: () => void;
  onAdd: (feat: Omit<CustomFeat, 'id'>) => void;
}

function AddFeatModal({ onClose, onAdd }: AddFeatModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [effect, setEffect] = useState('');
  const [prerequisite, setPrerequisite] = useState('');
  const [isCombatFeat, setIsCombatFeat] = useState(false);
  const [isPassive, setIsPassive] = useState(true);
  const [benefits, setBenefits] = useState(['']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim() || !effect.trim()) return;
    
    onAdd({
      name: name.trim(),
      description: description.trim(),
      effect: effect.trim(),
      prerequisite: prerequisite.trim() || undefined,
      isCombatFeat,
      isPassive,
      benefit: benefits.filter(b => b.trim()),
    });
    onClose();
  };

  const addBenefit = () => setBenefits([...benefits, '']);
  const updateBenefit = (i: number, v: string) => {
    const newB = [...benefits];
    newB[i] = v;
    setBenefits(newB);
  };
  const removeBenefit = (i: number) => {
    setBenefits(benefits.filter((_, idx) => idx !== i));
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-parchment-light w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-xl shadow-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg text-ink">Nouveau talent</h3>
          <button onClick={onClose} className="p-1 hover:bg-parchment-dark rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Nom</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              placeholder="Ex: Maître des sorts"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center gap-2 p-2 bg-parchment-dark/20 rounded cursor-pointer">
              <input
                type="checkbox"
                checked={isCombatFeat}
                onChange={(e) => setIsCombatFeat(e.target.checked)}
                className="rounded border-parchment-dark"
              />
              <span className="text-sm">Talent de combat</span>
            </label>
            <label className="flex items-center gap-2 p-2 bg-parchment-dark/20 rounded cursor-pointer">
              <input
                type="checkbox"
                checked={isPassive}
                onChange={(e) => setIsPassive(e.target.checked)}
                className="rounded border-parchment-dark"
              />
              <span className="text-sm">Effet passif</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1">Prérequis (optionnel)</label>
            <input
              type="text"
              value={prerequisite}
              onChange={(e) => setPrerequisite(e.target.value)}
              className="input-field"
              placeholder="Ex: Niveau 4, Force 13+"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field min-h-[60px] resize-none"
              placeholder="Description générale du talent..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1">Effet principal</label>
            <textarea
              value={effect}
              onChange={(e) => setEffect(e.target.value)}
              className="input-field min-h-[60px] resize-none"
              placeholder="Décrivez l'effet mécanique du talent..."
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-ink">Avantages détaillés</label>
              <button
                type="button"
                onClick={addBenefit}
                className="text-xs text-divine-gold-dark hover:text-divine-gold flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Ajouter
              </button>
            </div>
            <div className="space-y-2">
              {benefits.map((b, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={b}
                    onChange={(e) => updateBenefit(i, e.target.value)}
                    className="input-field flex-1 text-sm"
                    placeholder={`Avantage ${i + 1}`}
                  />
                  {benefits.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeBenefit(i)}
                      className="p-2 text-ink-muted hover:text-blood-red"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Annuler
            </button>
            <button type="submit" className="btn-primary flex-1">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
