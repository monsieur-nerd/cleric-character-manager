import { useState, useRef, useCallback } from 'react';
import { Zap, Swords, Info, ChevronDown, ChevronUp, Heart, Shield, Plus, Minus, RotateCcw, Sparkles, Target, Flame, CloudRain } from 'lucide-react';
import { useSpellStore, useCharacterStore } from '@/stores';
import type { Spell, Character } from '@/types';
import { getFeatById } from '@/types/feats';
import type { Feat } from '@/types/feats';
import { SpellCastAnimation } from '@/components/effects/SpellCastAnimation';

const castingTimeFilters = [
  { id: 'all', label: 'Tous' },
  { id: 'action', label: 'Action' },
  { id: 'bonus', label: 'Action bonus' },
  { id: 'reaction', label: 'Réaction' },
];

function ReactionsCard({ character, preparedSpells }: { character: Character; preparedSpells: Spell[] }) {
  const domainId = character.domain?.id;
  const level = character.level;
  const feats = character.feats || [];
  const reactionSpells = preparedSpells.filter(s => (s.castingTime || '').toLowerCase().includes('réaction'));

  const domainReactions: { icon: React.ReactNode; title: string; desc: string; condition?: boolean }[] = [];

  if (domainId === 'light') {
    domainReactions.push({
      icon: <Flame className="w-4 h-4 text-divine-gold" />,
      title: 'Flamboiement',
      desc: 'Réaction pour imposer un désavantage à une attaque contre vous ou un allié à 9 m.',
    });
  }
  if (domainId === 'tempest') {
    domainReactions.push({
      icon: <CloudRain className="w-4 h-4 text-steel-blue" />,
      title: 'Frappe de la tempête',
      desc: 'Réaction quand une créature vous touche au corps à corps : 2d8 dégâts de foudre ou tonnerre.',
    });
  }
  if (domainId === 'nature' && level >= 6) {
    domainReactions.push({
      icon: <Shield className="w-4 h-4 text-forest" />,
      title: 'Dampen Elements',
      desc: 'Réaction pour donner la résistance à un dégât élémentaire subi par vous ou un allié à 9 m.',
    });
  }
  if (domainId === 'war') {
    domainReactions.push({
      icon: <Target className="w-4 h-4 text-bronze" />,
      title: 'Guided Strike (timing)',
      desc: "Action Conduit divin utilisée après avoir vu le résultat d'un jet d'attaque. Pas une réaction, mais un timing très rapide.",
    });
  }

  const featReactions = feats
    .map((id: string) => getFeatById(id))
    .filter((f): f is Feat => Boolean(f))
    .filter((f: Feat) => ['sentinel', 'shield-master', 'war-caster', 'lucky'].includes(f.id));

  const hasAnyReaction = domainReactions.length > 0 || reactionSpells.length > 0 || featReactions.length > 0;

  return (
    <div className="card bg-bronze/5 border-bronze/20">
      <h3 className="font-display text-lg text-ink mb-2 flex items-center gap-2">
        <RotateCcw className="w-5 h-5 text-bronze" />
        Vos réactions
      </h3>

      {!hasAnyReaction && (
        <p className="text-sm text-ink-muted mb-3">
          Votre build actuel n'a pas de réaction native. En D&D 5e, tout le monde peut faire une
          <strong> attaque d'opportunité</strong> en réaction quand une créature hostile quitte votre portée au corps à corps.
        </p>
      )}

      {domainReactions.length > 0 && (
        <div className="mb-3">
          <h4 className="text-xs font-bold text-ink-light uppercase tracking-wide mb-1">Réactions du domaine</h4>
          <div className="space-y-2">
            {domainReactions.map((r, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <div className="mt-0.5 flex-shrink-0">{r.icon}</div>
                <div>
                  <span className="font-bold text-ink">{r.title}</span>
                  <span className="text-ink-light"> — {r.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {reactionSpells.length > 0 && (
        <div className="mb-3">
          <h4 className="text-xs font-bold text-ink-light uppercase tracking-wide mb-1">Sorts de réaction préparés</h4>
          <div className="flex flex-wrap gap-2">
            {reactionSpells.map(s => (
              <span key={s.id} className="badge bg-royal-purple/20 text-royal-purple border-royal-purple text-xs">
                {s.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {reactionSpells.length === 0 && (
        <div className="mb-3 p-2 bg-parchment-dark/30 rounded text-sm text-ink-light">
          <strong>Sorts de réaction suggérés :</strong>{' '}
          <em>Bouclier</em> (+5 CA), <em>Absorption des éléments</em> (résistance élémentaire), <em>Contresort</em> (annuler un sort).
          <br />
          <span className="text-xs text-ink-muted">Ces sorts ne font pas partie de la liste de clerc de base, mais peuvent être obtenus via le talent <strong>Initié à la Magie</strong> ou le multiclassage.</span>
        </div>
      )}

      {featReactions.length > 0 && (
        <div className="mb-3">
          <h4 className="text-xs font-bold text-ink-light uppercase tracking-wide mb-1">Talents actifs</h4>
          <div className="space-y-2">
            {featReactions.map((f: Feat) => {
              let desc = '';
              if (f!.id === 'sentinel') desc = 'Attaque d\'opportunité : vitesse à 0, fonctionne même après Désengagement.';
              if (f!.id === 'shield-master') desc = 'Réaction pour ne prendre aucun dégât sur un JS de DEX réussi contre une zone.';
              if (f!.id === 'war-caster') desc = 'Attaque d\'opportunité avec un sort ciblé (pas de sort de zone).'; 
              if (f!.id === 'lucky') desc = 'Forcer une créature à relancer une attaque contre vous.';
              return (
                <div key={f!.id} className="flex items-start gap-2 text-sm">
                  <Sparkles className="w-4 h-4 text-divine-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-ink">{f!.name}</span>
                    <span className="text-ink-light"> — {desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="pt-2 border-t border-parchment-dark/50">
        <h4 className="text-xs font-bold text-ink-light uppercase tracking-wide mb-1">Conseils de talents</h4>
        <ul className="text-sm text-ink-light space-y-1">
          <li>• <strong>Lanceur de Guerre</strong> : attaque d'opportunité avec un sort + avantage sur la concentration.</li>
          <li>• <strong>Sentinelle</strong> : contrôle total du champ de bataille avec vos attaques d'opportunité.</li>
          <li>• <strong>Maître des Boucliers</strong> : réaction pour annuler les dégâts de zone (très fort pour un clerc de guerre).</li>
          <li>• <strong>Chanceux</strong> : forcer un ennemi à relancer une attaque critique contre vous.</li>
        </ul>
      </div>
    </div>
  );
}

export function CombatPage() {
  const [filter, setFilter] = useState('all');
  const [showWarClericInfo, setShowWarClericInfo] = useState(false);
  const [showChannelDivinityInfo, setShowChannelDivinityInfo] = useState(false);
  const [showActionExplanation, setShowActionExplanation] = useState(false);
  
  const character = useCharacterStore((state) => state.character);
  const { warCleric, channelDivinity } = character.abilities;
  const useWarCleric = useCharacterStore((state) => state.useWarCleric);
  const useChannelDivinity = useCharacterStore((state) => state.useChannelDivinity);
  const activeConcentration = character.currentState.activeConcentration;
  
  const preparedSpells = useSpellStore((state) => state.getPreparedSpells());
  const markAsUsed = useSpellStore((state) => state.markAsUsed);
  const spellSlots = useSpellStore((state) => state.spellSlots);
  
  // Points de vie
  const { currentHp, maxHp, constitution, currentState } = character;
  const tempHp = currentState.tempHp || 0;
  const takeDamage = useCharacterStore((state) => state.takeDamage);
  const heal = useCharacterStore((state) => state.heal);
  const setMaxHp = useCharacterStore((state) => state.setMaxHp);
  const setTempHp = useCharacterStore((state) => state.setTempHp);
  const [damageInput, setDamageInput] = useState('');
  const [healInput, setHealInput] = useState('');
  const [showHpRules, setShowHpRules] = useState(false);
  
  // Animations de lancement de sort
  const [castAnimations, setCastAnimations] = useState<{ id: number; x: number; y: number }[]>([]);
  const nextAnimId = useRef(0);
  
  const triggerCastAnimation = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    // Récupérer les coordonnées du clic/touch
    let clientX: number;
    let clientY: number;
    
    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    } else {
      return;
    }
    
    const id = nextAnimId.current++;
    setCastAnimations(prev => [...prev, { id, x: clientX, y: clientY }]);
  }, []);
  
  const removeCastAnimation = useCallback((id: number) => {
    setCastAnimations(prev => prev.filter(anim => anim.id !== id));
  }, []);
  
  const [pressedSpellIds, setPressedSpellIds] = useState<Set<string>>(new Set());

  const handleCastSpell = useCallback((e: React.MouseEvent | React.TouchEvent, spellId: string) => {
    triggerCastAnimation(e);
    markAsUsed(spellId);
    setPressedSpellIds(prev => new Set(prev).add(spellId));
    setTimeout(() => {
      setPressedSpellIds(prev => {
        const next = new Set(prev);
        next.delete(spellId);
        return next;
      });
    }, 1000);
  }, [triggerCastAnimation, markAsUsed]);
  const [showMaxHpEdit, setShowMaxHpEdit] = useState(false);
  const [maxHpInput, setMaxHpInput] = useState(maxHp.toString());
  
  // Filtre les sorts (plus de filtre usedSpellIds - on peut lancer le même sort plusieurs fois)
  const availableSpells = preparedSpells.filter((spell: Spell) => {
    if (filter === 'all') return true;
    
    const castingTime = (spell.castingTime || '').toLowerCase();
    if (filter === 'action') return castingTime.includes('action') && !castingTime.includes('bonus');
    if (filter === 'bonus') return castingTime.includes('bonus');
    if (filter === 'reaction') return castingTime.includes('réaction');
    
    return true;
  });
  
  // Groupe par niveau
  const spellsByLevel = availableSpells.reduce((acc, spell) => {
    const level = spell.level;
    if (!acc[level]) acc[level] = [];
    acc[level].push(spell);
    return acc;
  }, {} as Record<number, Spell[]>);

  return (
    <div className="p-4 space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl text-ink flex items-center gap-2">
          <Swords className="w-6 h-6 text-blood-red" />
          Mode Combat
        </h2>
      </div>
      
      {/* Points de vie */}
      <div className="card bg-blood-red/10 border-blood-red/30">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-lg text-ink flex items-center gap-2">
            <Heart className="w-5 h-5 text-blood-red fill-blood-red" />
            Points de vie
          </h3>
          <button
            onClick={() => setShowHpRules(!showHpRules)}
            className="text-xs text-ink-muted flex items-center gap-1"
          >
            <Info className="w-3 h-3" />
            Règles
          </button>
        </div>
        
        {/* Barre de PV */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-2xl font-display text-ink">
              {currentHp}
              {tempHp > 0 && <span className="text-divine-gold text-lg">+{tempHp}</span>}
              <span className="text-ink-muted text-lg">/{maxHp}</span>
            </span>
            <button
              onClick={() => {
                setShowMaxHpEdit(!showMaxHpEdit);
                setMaxHpInput(maxHp.toString());
              }}
              className="text-xs text-ink-muted hover:text-ink"
            >
              Modif. max
            </button>
          </div>
          
          {/* Barre de progression */}
          <div className="h-4 bg-parchment-dark rounded-full overflow-hidden">
            <div 
              className="h-full bg-blood-red transition-all"
              style={{ width: `${Math.min(100, (currentHp / maxHp) * 100)}%` }}
            />
          </div>
          
          {/* Modification du max PV */}
          {showMaxHpEdit && (
            <div className="mt-2 flex gap-2">
              <input
                type="number"
                value={maxHpInput}
                onChange={(e) => setMaxHpInput(e.target.value)}
                className="w-20 input-field text-center"
                min="1"
              />
              <button
                onClick={() => {
                  const newMax = parseInt(maxHpInput) || maxHp;
                  setMaxHp(newMax);
                  setShowMaxHpEdit(false);
                }}
                className="btn-primary text-sm py-1 px-3"
              >
                OK
              </button>
            </div>
          )}
        </div>
        
        {/* Contrôles dégâts/soins */}
        <div className="grid grid-cols-2 gap-3">
          {/* Dégâts */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blood-red">
              <Minus className="w-4 h-4" />
              <span className="font-bold text-sm">Dégâts</span>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                value={damageInput}
                onChange={(e) => setDamageInput(e.target.value)}
                placeholder="0"
                className="w-full input-field text-center"
                min="0"
              />
              <button
                onClick={() => {
                  const dmg = parseInt(damageInput) || 1;
                  takeDamage(dmg);
                  setDamageInput('');
                }}
                className="btn-danger text-sm py-2 px-3"
              >
                -
              </button>
            </div>
          </div>
          
          {/* Soins */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-forest">
              <Plus className="w-4 h-4" />
              <span className="font-bold text-sm">Soins</span>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                value={healInput}
                onChange={(e) => setHealInput(e.target.value)}
                placeholder="0"
                className="w-full input-field text-center"
                min="0"
              />
              <button
                onClick={() => {
                  const healAmount = parseInt(healInput) || 1;
                  heal(healAmount);
                  setHealInput('');
                }}
                className="btn-primary text-sm py-2 px-3 bg-forest border-forest hover:bg-forest/80"
              >
                +
              </button>
            </div>
          </div>
        </div>
        
        {/* PV temporaires */}
        <div className="mt-3 pt-3 border-t border-blood-red/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-divine-gold">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-bold">PV temporaires</span>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                value={tempHp}
                onChange={(e) => setTempHp(parseInt(e.target.value) || 0)}
                className="w-16 input-field text-center text-sm"
                min="0"
              />
            </div>
          </div>
        </div>
        
        {/* Règles de calcul */}
        {showHpRules && (
          <div className="mt-3 pt-3 border-t border-blood-red/20 text-sm space-y-2">
            <p className="font-bold text-ink">Calcul des points de vie (Clerc d8)</p>
            <div className="bg-parchment p-3 rounded space-y-1 text-ink-light">
              <p><strong>Niveau 1 :</strong> 8 + modificateur de Constitution</p>
              <p><strong>Niveaux 2-5 :</strong> 5 (moyenne du d8) + mod Con par niveau</p>
              <p className="border-t border-parchment-dark pt-2 mt-2">
                <strong>Votre calcul (CON {constitution}) :</strong>
              </p>
              <p>8 + 4×5 + 5×{Math.floor((constitution - 10) / 2)} = <strong>{maxHp} PV max</strong></p>
              <p className="text-xs text-ink-muted mt-2">
                💡 Les PV temporaires sont retirés en premier. 
                Si vous subissez des dégâts, vous perdez la concentration.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Explication Actions */}
      <div className="card bg-parchment-dark/30 border-parchment-dark">
        <button 
          onClick={() => setShowActionExplanation(!showActionExplanation)}
          className="w-full flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-steel-blue" />
            <span className="text-sm font-bold text-ink">Règle importante : Action vs Action Bonus</span>
          </div>
          {showActionExplanation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        
        {showActionExplanation && (
          <div className="mt-3 pt-3 border-t border-parchment-dark text-sm space-y-2">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-parchment p-2 rounded">
                <span className="font-bold text-blood-red">ACTION</span>
                <p className="text-ink-muted">1 par tour</p>
                <p className="text-ink">Attaquer, Lancer un sort, Conduit Divin</p>
              </div>
              <div className="bg-parchment p-2 rounded">
                <span className="font-bold text-divine-gold">ACTION BONUS</span>
                <p className="text-ink-muted">1 par tour maximum</p>
                <p className="text-ink">Clerc de Guerre, Sort rapide, Arme secondaire</p>
              </div>
            </div>
            <div className="bg-bronze/10 p-2 rounded border border-bronze/30">
              <p className="font-bold text-bronze">❌ Pas 4 attaques !</p>
              <p className="text-ink-light">
                Même avec 2 armes + Clerc de Guerre, tu n'as qu'<strong>UNE</strong> action bonus.
                Tu dois choisir : attaque avec arme secondaire <em>OU</em> Clerc de Guerre.
              </p>
            </div>
            <div className="bg-forest/10 p-2 rounded border border-forest/30">
              <p className="font-bold text-forest">✅ Le combo optimal</p>
              <p className="text-ink-light">
                <strong>Action :</strong> Attaque (arme principale)<br/>
                <strong>Action Bonus :</strong> Clerc de Guerre (arme secondaire)<br/>
                → Les 2 attaques ont le modificateur de dégâts !
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Capacités */}
      <div className="grid grid-cols-2 gap-2">
        {/* Clerc de Guerre */}
        <div className={`card p-3 ${warCleric.currentUses > 0 ? 'border-divine-gold' : ''}`}>
          <button
            onClick={() => useWarCleric()}
            disabled={warCleric.currentUses <= 0}
            className="w-full text-center disabled:opacity-50"
          >
            <div className="text-2xl mb-1">⚔️</div>
            <div className="text-xs font-bold text-ink">Prêtre de guerre</div>
            <div className="text-xs text-divine-gold font-bold">ACTION BONUS</div>
            <div className="flex justify-center gap-1 mt-1">
              {Array.from({ length: warCleric.maxUses }).map((_, i) => (
                <Zap 
                  key={i} 
                  className={`w-4 h-4 ${
                    i < warCleric.currentUses 
                      ? 'text-divine-gold fill-divine-gold' 
                      : 'text-parchment-dark'
                  }`}
                />
              ))}
            </div>
          </button>
          <button
            onClick={() => setShowWarClericInfo(!showWarClericInfo)}
            className="w-full mt-2 text-xs text-ink-muted flex items-center justify-center gap-1"
          >
            {showWarClericInfo ? 'Moins' : 'Plus'} d'infos
            {showWarClericInfo ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
          
          {showWarClericInfo && (
            <div className="mt-2 pt-2 border-t border-parchment-dark text-xs text-ink-light">
              <p className="mb-1">
                <strong>Quand :</strong> Quand tu fais l'action Attaquer
              </p>
              <p className="mb-1">
                <strong>Effet :</strong> Une attaque supplémentaire (action bonus)
              </p>
              <p className="text-forest">
                💡 Avec 2 armes : utilises Clerc de Guerre pour la 2ème attaque (avec mod dégâts !)
              </p>
            </div>
          )}
        </div>
        
        {/* Conduit Divin */}
        <div className={`card p-3 ${channelDivinity.currentUses > 0 ? 'border-royal-purple' : ''}`}>
          <button
            onClick={() => useChannelDivinity()}
            disabled={channelDivinity.currentUses <= 0}
            className="w-full text-center disabled:opacity-50"
          >
            <div className="text-2xl mb-1">✨</div>
            <div className="text-xs font-bold text-ink">Conduit divin</div>
            <div className="text-xs text-royal-purple font-bold">ACTION</div>
            <div className="flex justify-center gap-1 mt-1">
              {Array.from({ length: channelDivinity.maxUses }).map((_, i) => (
                <div 
                  key={i} 
                  className={`w-3 h-3 rounded-full ${
                    i < channelDivinity.currentUses 
                      ? 'bg-divine-gold' 
                      : 'bg-parchment-dark'
                  }`}
                />
              ))}
            </div>
          </button>
          <button
            onClick={() => setShowChannelDivinityInfo(!showChannelDivinityInfo)}
            className="w-full mt-2 text-xs text-ink-muted flex items-center justify-center gap-1"
          >
            {showChannelDivinityInfo ? 'Moins' : 'Options'}
            {showChannelDivinityInfo ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
          
          {showChannelDivinityInfo && (
            <div className="mt-2 pt-2 border-t border-parchment-dark text-xs space-y-2">
              <p className="text-ink-light">
                <strong>Choisis une option quand tu utilises :</strong>
              </p>
              
              <div className="bg-royal-purple/10 p-2 rounded">
                <p className="font-bold text-royal-purple">⚔️ Clerc de Guerre (Guided Strike)</p>
                <p className="text-ink-light">
                  Après avoir vu le résultat d'une attaque : <strong>+10 au jet d'attaque</strong>
                </p>
              </div>
              
              <div className="bg-divine-gold/10 p-2 rounded">
                <p className="font-bold text-divine-gold">😈 Renonciation (Turn Undead)</p>
                <p className="text-ink-light">
                  Les morts-vivants/fiélons à 9m doivent fuir (JS Sagesse)
                </p>
              </div>
              
              <div className="bg-forest/10 p-2 rounded">
                <p className="font-bold text-forest">🎲 Tournant de la bataille (War God's Blessing)</p>
                <p className="text-ink-light">
                  À 9m d'un allié : il peut reroll un dé de dégâts ou d'attaque
                </p>
              </div>
              
              <p className="text-xs text-ink-muted mt-2">
                💡 <strong>Conseil :</strong> "Clerc de Guerre" du Conduit Divin ≠ "Clerc de Guerre" l'aptitude !
                L'un donne +10 à toucher (Action), l'autre une attaque bonus (Action Bonus).
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Concentration */}
      {activeConcentration && (
        <div className="card bg-royal-purple/10 border-royal-purple">
          <div className="text-sm text-ink">
            🧠 Concentration: <span className="font-bold">{activeConcentration}</span>
          </div>
        </div>
      )}
      
      {/* Filtres */}
      <div className="flex flex-wrap gap-1">
        {castingTimeFilters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`filter-chip ${filter === f.id ? 'active' : ''}`}
          >
            {f.label}
          </button>
        ))}
      </div>
      
      {/* 🪄 Sorts ou Réactions */}
      {filter === 'reaction' ? (
        <ReactionsCard character={character} preparedSpells={preparedSpells} />
      ) : (
        /* Carte Sorts unifiée */
        <div className="card bg-royal-purple/5 border-royal-purple/20">
          <h3 className="font-display text-lg text-ink mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-royal-purple" />
            Sorts
          </h3>
          
          {/* Emplacements de sorts restants */}
          <div className="mb-4">
            <h4 className="text-xs font-bold text-ink-light uppercase tracking-wide mb-2">
              Emplacements de sorts restants
            </h4>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-parchment-light rounded-lg p-2">
                <div className="text-xs text-ink-muted">N1</div>
                <div className="font-display text-xl text-ink">{spellSlots[1]}</div>
              </div>
              <div className="bg-parchment-light rounded-lg p-2">
                <div className="text-xs text-ink-muted">N2</div>
                <div className="font-display text-xl text-ink">{spellSlots[2]}</div>
              </div>
              <div className="bg-parchment-light rounded-lg p-2">
                <div className="text-xs text-ink-muted">N3</div>
                <div className="font-display text-xl text-ink">{spellSlots[3]}</div>
              </div>
            </div>
          </div>
          
          {/* Sorts préparés */}
          <div>
            <h4 className="text-xs font-bold text-ink-light uppercase tracking-wide mb-3">
              Sorts préparés
            </h4>
            
            <div className="space-y-4">
              {Object.entries(spellsByLevel)
                .sort(([a], [b]) => Number(a) - Number(b))
                .map(([level, spells]) => (
                  <section key={level}>
                    <h5 className="font-display text-sm text-ink-muted mb-2">
                      {level === '0' ? 'Mineur' : `Niveau ${level}`} 
                      <span className="ml-1">({spells.length})</span>
                    </h5>
                    
                    <div className="space-y-2">
                      {spells.map((spell: Spell) => (
                        <div 
                          key={spell.id}
                          className="bg-parchment-light rounded-lg p-3 flex items-center justify-between gap-2"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="font-display text-ink break-words leading-tight text-sm sm:text-base">{spell.name}</div>
                            <div className="text-xs text-ink-muted break-words">
                              {spell.castingTime} • {spell.range}
                            </div>
                            {spell.summary && (
                              <div className="text-xs text-ink font-bold mt-1">
                                {spell.summary}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex gap-2">
                            <button
                              onClick={(e) => handleCastSpell(e, spell.id)}
                              onTouchStart={(e) => {
                                e.preventDefault();
                                handleCastSpell(e, spell.id);
                              }}
                              className={`text-sm py-2 px-4 relative overflow-visible rounded-lg font-ui font-bold border-2 transition-all duration-150 select-none ${
                                pressedSpellIds.has(spell.id)
                                  ? 'bg-divine-gold-dark border-divine-gold-dark text-ink scale-95'
                                  : 'bg-divine-gold border-divine-gold-dark text-ink hover:bg-divine-gold-light shadow-md'
                              }`}
                              style={{ WebkitTapHighlightColor: 'transparent' }}
                            >
                              {pressedSpellIds.has(spell.id) ? 'Lancé !' : 'Lancer'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              
              {availableSpells.length === 0 && (
                <div className="text-center py-8 text-ink-muted">
                  <p>Aucun sort disponible</p>
                  <p className="text-sm">Préparez des sorts dans l'onglet Préparation</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Animations de lancement de sort */}
      {castAnimations.map(anim => (
        <SpellCastAnimation
          key={anim.id}
          x={anim.x}
          y={anim.y}
          onComplete={() => removeCastAnimation(anim.id)}
        />
      ))}
    </div>
  );
}
