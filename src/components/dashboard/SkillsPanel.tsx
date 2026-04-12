import { useState } from 'react';
import { X, Check, GraduationCap } from 'lucide-react';
import { useCharacterStore } from '@/stores';
import { useItemEffects } from '@/hooks';
import { getSkillById, SKILLS, ABILITY_SCORES, type AbilityScore, type Skill } from '@/types/skills';
import { getFeatById } from '@/types/feats';

// Types
interface SkillBonus {
  total: number;
  itemBonus: number;
  hasAdvantage: boolean;
}

// Composant pour afficher le détail d'une compétence
function SkillDetail({ 
  skill, 
  isMastered, 
  bonus, 
  abilityMod, 
  profBonus, 
  onToggle, 
  onClose 
}: {
  skill: ReturnType<typeof getSkillById>;
  isMastered: boolean;
  bonus: SkillBonus;
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
        <div className="flex items-center justify-between p-4 border-b border-parchment-dark">
          <h3 className="font-display text-xl text-ink">{skill.name}</h3>
          <button onClick={onClose} className="p-2 hover:bg-parchment-dark rounded-lg">
            <X className="w-5 h-5 text-ink" />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-bold text-ink">{skill.abilityScoreName}</span>
            <span className="text-ink-muted">•</span>
            <span className="text-ink-light capitalize">{categoryLabels[skill.category] || skill.category}</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-parchment-dark/30 rounded-lg">
            <div className="flex items-center gap-4">
              <div className={`text-3xl font-display ${isMastered ? 'text-divine-gold-dark' : 'text-ink-muted'}`}>
                {bonus.total >= 0 ? `+${bonus.total}` : bonus.total}
              </div>
              <div className="text-xs text-ink-muted space-y-0.5">
                <div>Mod {abilityMod >= 0 ? `+${abilityMod}` : abilityMod}</div>
                {isMastered && <div>+ Maîtrise +{profBonus}</div>}
                {bonus.itemBonus > 0 && (
                  <div className="text-forest font-bold">+ Item +{bonus.itemBonus}</div>
                )}
                {bonus.hasAdvantage && (
                  <div className="text-divine-gold font-bold">🎯 Avantage!</div>
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
          
          <div>
            <h4 className="font-display text-sm text-ink mb-2">Description</h4>
            <p className="text-sm text-ink-light leading-relaxed">{skill.description}</p>
          </div>
          
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

// Composant carte de compétence
function SkillCard({ 
  skill, 
  isMastered, 
  bonus, 
  onClick 
}: { 
  skill: Skill; 
  isMastered: boolean; 
  bonus: SkillBonus;
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
          <div className="flex flex-col items-end">
            <span className={`font-display text-lg ${isMastered ? colors.text : 'text-ink-muted'}`}>
              {bonus.total >= 0 ? `+${bonus.total}` : bonus.total}
            </span>
            {bonus.itemBonus > 0 && (
              <span className="text-xs text-forest font-bold">+{bonus.itemBonus} item</span>
            )}
            {bonus.hasAdvantage && (
              <span className="text-xs text-divine-gold font-bold">Avantage!</span>
            )}
          </div>
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
    { id: 'all', label: 'Toutes', activeClass: 'bg-gray-600 text-white', inactiveClass: 'bg-parchment-dark/50 text-ink-muted hover:bg-parchment-dark hover:text-ink' },
    { id: 'STR', label: 'FOR', activeClass: 'bg-red-700 text-white', inactiveClass: 'bg-red-100 text-red-800 hover:bg-red-200' },
    { id: 'DEX', label: 'DEX', activeClass: 'bg-green-700 text-white', inactiveClass: 'bg-green-100 text-green-800 hover:bg-green-200' },
    { id: 'CON', label: 'CON', activeClass: 'bg-amber-700 text-white', inactiveClass: 'bg-amber-100 text-amber-800 hover:bg-amber-200' },
    { id: 'INT', label: 'INT', activeClass: 'bg-purple-700 text-white', inactiveClass: 'bg-purple-100 text-purple-800 hover:bg-purple-200' },
    { id: 'WIS', label: 'SAG', activeClass: 'bg-yellow-700 text-white', inactiveClass: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' },
    { id: 'CHA', label: 'CHA', activeClass: 'bg-orange-700 text-white', inactiveClass: 'bg-orange-100 text-orange-800 hover:bg-orange-200' },
  ];
  
  return (
    <div className="flex flex-wrap gap-1.5">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all shadow-sm ${
            activeFilter === filter.id ? filter.activeClass : filter.inactiveClass
          }`}
        >
          {filter.label}
          <span className="ml-1 opacity-80">({skillCounts[filter.id]})</span>
        </button>
      ))}
    </div>
  );
}

// Composant principal SkillsPanel
export function SkillsPanel() {
  const character = useCharacterStore((state) => state.character);
  const toggleSkill = useCharacterStore((state) => state.toggleSkill);
  const addFeat = useCharacterStore((state) => state.addFeat);
  const removeFeat = useCharacterStore((state) => state.removeFeat);
  const getProficiencyBonus = useCharacterStore((state) => state.getProficiencyBonus);
  const getModifier = useCharacterStore((state) => state.getModifier);
  
  const { getSkillBonus } = useItemEffects();
  
  const [activeSection, setActiveSection] = useState<'skills' | 'feats'>('feats');
  const [showFeatSelector, setShowFeatSelector] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [skillFilter, setSkillFilter] = useState<AbilityScore | 'all'>('all');
  
  const profBonus = getProficiencyBonus();
  const masteredSkills = character.masteredSkills || [];
  const characterFeats = character.feats || [];
  
  const getSkillTotalBonus = (skillId: string, abilityScore: AbilityScore): SkillBonus => {
    const abilityValue = character[abilityScore.toLowerCase() as keyof typeof character] as number ?? 10;
    const abilityMod = getModifier(abilityValue);
    const isMastered = masteredSkills.includes(skillId);
    const skillData = getSkillById(skillId);
    const skillName = skillData?.name || '';
    
    const itemEffects = getSkillBonus(skillName);
    const itemBonus = itemEffects.bonus;
    const hasAdvantage = itemEffects.hasAdvantage;
    
    return {
      total: abilityMod + (isMastered ? profBonus : 0) + itemBonus,
      itemBonus,
      hasAdvantage,
    };
  };
  
  const getAbilityMod = (abilityScore: AbilityScore): number => {
    const abilityValue = character[abilityScore.toLowerCase() as keyof typeof character] as number ?? 10;
    return getModifier(abilityValue);
  };
  
  const selectedSkillData = selectedSkill ? getSkillById(selectedSkill) : null;

  return (
    <div className="space-y-4">
      {/* Toggle Feats/Skills */}
      <div className="flex bg-parchment-dark rounded-lg p-1">
        <button
          onClick={() => setActiveSection('feats')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
            activeSection === 'feats' ? 'bg-parchment-light text-ink shadow-sm' : 'text-ink-muted hover:text-ink'
          }`}
        >
          Talents
        </button>
        <button
          onClick={() => setActiveSection('skills')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
            activeSection === 'skills' ? 'bg-parchment-light text-ink shadow-sm' : 'text-ink-muted hover:text-ink'
          }`}
        >
          Compétences
        </button>
      </div>
      
      {activeSection === 'skills' && (
        <>
          <div className="flex items-center justify-between p-3 bg-divine-gold/10 rounded-lg">
            <span className="text-sm text-ink-light">Bonus de maîtrise</span>
            <span className="font-display text-lg text-divine-gold-dark">+{profBonus}</span>
          </div>
          
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
