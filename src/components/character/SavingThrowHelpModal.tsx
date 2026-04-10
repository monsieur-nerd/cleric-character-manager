import { X, Shield, Sparkles, Swords, Zap, Brain, Eye, Heart, Scroll, Info } from 'lucide-react';
import { useCharacterStore } from '@/stores';
import { ABILITY_SCORES } from '@/types/skills';
import type { AbilityScore } from '@/types/skills';

interface SavingThrowHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ABILITY_ICONS: Record<AbilityScore, typeof Swords> = {
  STR: Swords,
  DEX: Zap,
  CON: Heart,
  INT: Brain,
  WIS: Eye,
  CHA: Sparkles,
};

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

export function SavingThrowHelpModal({ isOpen, onClose }: SavingThrowHelpModalProps) {
  const character = useCharacterStore((state) => state.character);
  const getProficiencyBonus = useCharacterStore((state) => state.getProficiencyBonus);
  const getModifier = useCharacterStore((state) => state.getModifier);

  if (!isOpen) return null;

  const profBonus = getProficiencyBonus() || 2;
  const charName = character.name || 'votre personnage';
  
  // Calcul des caractéristiques
  const abilities = {
    STR: character.strength || 10,
    DEX: character.dexterity || 10,
    CON: character.constitution || 10,
    INT: character.intelligence || 10,
    WIS: character.wisdom || 10,
    CHA: character.charisma || 10,
  };

  // Déterminer les maîtrises de JS en fonction de la classe
  const classProficiencies: Record<string, AbilityScore[]> = {
    barbarian: ['STR', 'CON'],
    bard: ['DEX', 'CHA'],
    cleric: ['WIS', 'CHA'],
    druid: ['INT', 'WIS'],
    fighter: ['STR', 'CON'],
    monk: ['STR', 'DEX'],
    paladin: ['WIS', 'CHA'],
    ranger: ['STR', 'DEX'],
    rogue: ['DEX', 'INT'],
    sorcerer: ['CON', 'CHA'],
    warlock: ['WIS', 'CHA'],
    wizard: ['INT', 'WIS'],
  };

  const characterClass = character.class || 'cleric';
  const masteredSaves = classProficiencies[characterClass] || ['WIS', 'CHA'];

  // Calcul des bonus de JS
  const getSaveBonus = (ability: AbilityScore): number => {
    const mod = getModifier(abilities[ability]);
    const isMastered = masteredSaves.includes(ability);
    return mod + (isMastered ? profBonus : 0);
  };

  // Trouver la meilleure sauvegarde
  const bestSave = Object.keys(abilities).reduce((best, current) => {
    const currentBonus = getSaveBonus(current as AbilityScore);
    const bestBonus = getSaveBonus(best as AbilityScore);
    return currentBonus > bestBonus ? current : best;
  }) as AbilityScore;

  const spellDC = 8 + profBonus + getModifier(abilities.WIS);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-parchment-light w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-parchment-dark bg-parchment-dark/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-divine-gold/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-divine-gold" />
            </div>
            <div>
              <h2 className="font-display text-xl text-ink">Les Jets de Sauvegarde</h2>
              <p className="text-xs text-ink-muted">Guide pour {charName}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-parchment-dark flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-ink-muted" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Introduction */}
          <div className="bg-parchment-dark/20 rounded-lg p-4 border border-parchment-dark">
            <h3 className="font-display text-lg text-ink mb-2 flex items-center gap-2">
              <Info className="w-5 h-5 text-divine-gold" />
              Qu'est-ce qu'un Jet de Sauvegarde ?
            </h3>
            <p className="text-sm text-ink leading-relaxed">
              Un <strong>jet de sauvegarde (JS)</strong> est un jet de dé que vous faites pour{' '}
              <span className="text-divine-gold font-medium">résister à un effet</span> — généralement 
              un sort, un piège, un poison, ou une capacité spéciale d'un monstre. Le Maître du Donjon 
              vous demande de faire un JS quand votre personnage tente d'éviter ou de réduire un effet nuisible.
            </p>
          </div>

          {/* Règle de base */}
          <div className="space-y-3">
            <h3 className="font-display text-lg text-ink flex items-center gap-2">
              <Scroll className="w-5 h-5 text-divine-gold" />
              La Règle de Base
            </h3>
            <div className="bg-parchment rounded-lg p-4 border-2 border-divine-gold/30">
              <p className="text-center font-display text-lg text-ink">
                <span className="text-divine-gold">1d20</span> +{' '}
                <span className="text-green-600">Modificateur</span> +{' '}
                <span className="text-purple-600">Maîtrise (si applicable)</span>
              </p>
              <p className="text-center text-sm text-ink-muted mt-2">
                Vous devez atteindre ou dépasser le <strong>DD</strong> (Degré de Difficulté) pour réussir
              </p>
            </div>
            <p className="text-sm text-ink">
              💡 <strong>Exemple</strong> : Si un gobelin lance un sort de terreur sur {charName}, 
              le MJ pourrait demander : <em>"Fais un jet de sauvegarde de Sagesse !"</em>
            </p>
          </div>

          {/* Vos bonus de JS */}
          <div className="space-y-3">
            <h3 className="font-display text-lg text-ink flex items-center gap-2">
              <Shield className="w-5 h-5 text-divine-gold" />
              Vos Bonus de Jet de Sauvegarde
            </h3>
            <p className="text-sm text-ink-muted">
              En tant que <strong>{characterClass === 'cleric' ? 'clerc' : characterClass}</strong> de niveau {character.level || 1}, 
              vous maîtrisez les sauvegardes de{' '}
              <span className="text-purple-600 font-medium">{ABILITY_SCORES[masteredSaves[0]].fullName}</span> et{' '}
              <span className="text-pink-600 font-medium">{ABILITY_SCORES[masteredSaves[1]].fullName}</span>.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(Object.keys(abilities) as AbilityScore[]).map((ability) => {
                const Icon = ABILITY_ICONS[ability];
                const bonus = getSaveBonus(ability);
                const isMastered = masteredSaves.includes(ability);
                const abilityName = ABILITY_SCORES[ability].fullName;
                const abilityValue = abilities[ability];
                
                return (
                  <div 
                    key={ability}
                    className={`p-3 rounded-lg border ${isMastered ? 'border-divine-gold bg-divine-gold/5' : 'border-parchment-dark bg-parchment-dark/10'}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className={`w-4 h-4 ${ABILITY_COLORS[ability]}`} />
                      <span className="text-xs font-bold text-ink-muted">{ability}</span>
                      {isMastered && (
                        <span className="text-[10px] bg-divine-gold text-ink px-1 rounded">★</span>
                      )}
                    </div>
                    <div className="text-lg font-display text-ink">
                      {bonus >= 0 ? '+' : ''}{bonus}
                    </div>
                    <div className="text-[10px] text-ink-muted">
                      {abilityName} {abilityValue}
                      {isMastered && ` (+${profBonus} maîtrise)`}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <p className="text-xs text-ink-muted">
              ★ = Maîtrise de classe (+{profBonus})
            </p>
          </div>

          {/* Votre meilleure sauvegarde */}
          {bestSave && (
            <div className={`${ABILITY_BG_COLORS[bestSave]} rounded-lg p-4 border border-divine-gold/30`}>
              <h4 className="font-display text-ink mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4 text-divine-gold" />
                Votre Point Fort
              </h4>
              <p className="text-sm text-ink">
                Votre meilleur jet de sauvegarde est en{' '}
                <strong className={ABILITY_COLORS[bestSave]}>
                  {ABILITY_SCORES[bestSave].fullName}
                </strong>{' '}
                avec un bonus de <strong className="text-divine-gold">{getSaveBonus(bestSave) >= 0 ? '+' : ''}{getSaveBonus(bestSave)}</strong>.
                C'est celle que vous réussissez le plus facilement !
              </p>
            </div>
          )}

          {/* Quand faire un JS ? */}
          <div className="space-y-3">
            <h3 className="font-display text-lg text-ink flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-divine-gold" />
              Quand faire un Jet de Sauvegarde ?
            </h3>
            <div className="grid gap-2 text-sm">
              <div className="flex items-start gap-3 p-2 bg-red-50 rounded border border-red-100">
                <span className="font-bold text-red-600">FOR</span>
                <span className="text-ink">Résister à être poussé, retenir une prise, ne pas tomber</span>
              </div>
              <div className="flex items-start gap-3 p-2 bg-green-50 rounded border border-green-100">
                <span className="font-bold text-green-600">DEX</span>
                <span className="text-ink">Esquiver une boule de feu, éviter un piège, réduire des dégâts de zone</span>
              </div>
              <div className="flex items-start gap-3 p-2 bg-orange-50 rounded border border-orange-100">
                <span className="font-bold text-orange-600">CON</span>
                <span className="text-ink">Résister à un poison, une maladie, maintenir la concentration sur un sort</span>
              </div>
              <div className="flex items-start gap-3 p-2 bg-blue-50 rounded border border-blue-100">
                <span className="font-bold text-blue-600">INT</span>
                <span className="text-ink">Résister à une attaque psychique, détecter une illusion</span>
              </div>
              <div className="flex items-start gap-3 p-2 bg-purple-50 rounded border border-purple-100">
                <span className="font-bold text-purple-600">SAG</span>
                <span className="text-ink">Résister à la terreur, au charme, aux tentations, voir à travers une illusion</span>
              </div>
              <div className="flex items-start gap-3 p-2 bg-pink-50 rounded border border-pink-100">
                <span className="font-bold text-pink-600">CHA</span>
                <span className="text-ink">Résister à la possession, maintenir son identité, repousser le mal</span>
              </div>
            </div>
          </div>

          {/* DD de vos sorts */}
          {characterClass === 'cleric' && (
            <div className="bg-parchment-dark/20 rounded-lg p-4 border border-parchment-dark">
              <h4 className="font-display text-ink mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-divine-gold" />
                DD de vos sorts
              </h4>
              <p className="text-sm text-ink">
                Quand <strong>{charName}</strong> lance un sort qui demande à la cible de faire un jet de sauvegarde, 
                le DD est de <strong className="text-divine-gold text-lg">{spellDC}</strong>.
              </p>
              <p className="text-xs text-ink-muted mt-2">
                Calcul : 8 (base) + {profBonus} (maîtrise) + {getModifier(abilities.WIS)} (mod Sagesse) = {spellDC}
              </p>
            </div>
          )}

          {/* Exemple concret */}
          <div className="bg-divine-gold/10 rounded-lg p-4 border border-divine-gold/30">
            <h4 className="font-display text-ink mb-2">📖 Exemple Concret</h4>
            <p className="text-sm text-ink leading-relaxed">
              Un sorcier lance <em>Boule de feu</em> sur {charName}. Le MJ dit :{' '}
              <em>"Fais un jet de sauvegarde de Dextérité pour réduire les dégâts de moitié !"</em>
            </p>
            <p className="text-sm text-ink mt-2">
              {charName} lance <strong>1d20 + {getSaveBonus('DEX')}</strong>. Si le résultat est ≥ au DD du sort, 
              les dégâts sont divisés par 2. Sinon, {charName} subit tous les dégâts !
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-parchment-dark bg-parchment-dark/20 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-divine-gold text-ink rounded-lg hover:bg-divine-gold-light transition-colors font-medium"
          >
            J'ai compris !
          </button>
        </div>
      </div>
    </div>
  );
}
