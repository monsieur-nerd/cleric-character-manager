import { useState } from 'react';
import { X, Brain, TrendingUp, Info, Heart, Shield, Dumbbell, Package } from 'lucide-react';
import { useCharacterStore } from '@/stores';
import { formatModifier } from '@/utils/formatters';

interface CharacterEditorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CharacterEditor({ isOpen, onClose }: CharacterEditorProps) {
  const character = useCharacterStore((state) => state.character);
  const setWisdom = useCharacterStore((state) => state.setWisdom);
  const setLevel = useCharacterStore((state) => state.setLevel);
  const setConstitution = useCharacterStore((state) => state.setConstitution);
  const setStrength = useCharacterStore((state) => state.setStrength);
  const calculateMaxHp = useCharacterStore((state) => state.calculateMaxHp);
  
  const [wisdom, setWisdomValue] = useState(character.wisdom);
  const [level, setLevelValue] = useState(character.level);
  const [constitution, setConstitutionValue] = useState(character.constitution);
  const [strength, setStrengthValue] = useState(character.strength);
  
  if (!isOpen) return null;
  
  const maxPrepared = Math.floor((wisdom - 10) / 2) + level;
  const calculatedMaxHp = calculateMaxHp(level, constitution);
  
  // Calcul de la capacité d'emport
  const lightLoad = strength * 7.5;
  const mediumLoad = strength * 15;
  const heavyLoad = strength * 22.5;
  
  const handleSave = () => {
    setWisdom(wisdom);
    setLevel(level);
    setConstitution(constitution);
    setStrength(strength);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-parchment-light w-full max-w-md max-h-screen overflow-y-auto rounded-xl shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-parchment-dark">
          <h2 className="font-display text-xl text-ink">Caractéristiques</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-parchment-dark rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-ink" />
          </button>
        </div>
        
        <div className="p-4 space-y-6">
          {/* Sagesse */}
          <div>
            <label className="flex items-center gap-2 text-ink font-medium mb-2">
              <Brain className="w-5 h-5 text-divine-gold" />
              Sagesse
            </label>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setWisdomValue(Math.max(1, wisdom - 1))}
                className="w-12 h-12 rounded-lg bg-parchment-dark hover:bg-divine-gold/20 
                         flex items-center justify-center text-xl font-bold transition-colors"
              >
                -
              </button>
              
              <div className="flex-1 text-center">
                <div className="text-3xl font-display text-ink">{wisdom}</div>
                <div className="text-sm text-divine-gold-dark font-bold">
                  Modificateur: {formatModifier(wisdom)}
                </div>
              </div>
              
              <button
                onClick={() => setWisdomValue(Math.min(30, wisdom + 1))}
                className="w-12 h-12 rounded-lg bg-parchment-dark hover:bg-divine-gold/20 
                         flex items-center justify-center text-xl font-bold transition-colors"
              >
                +
              </button>
            </div>
            
            <input
              type="range"
              min="1"
              max="30"
              value={wisdom}
              onChange={(e) => setWisdomValue(Number(e.target.value))}
              className="w-full mt-4 accent-divine-gold"
            />
          </div>
          
          {/* Niveau */}
          <div>
            <label className="flex items-center gap-2 text-ink font-medium mb-2">
              <TrendingUp className="w-5 h-5 text-divine-gold" />
              Niveau de clerc
            </label>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setLevelValue(Math.max(1, level - 1))}
                className="w-12 h-12 rounded-lg bg-parchment-dark hover:bg-divine-gold/20 
                         flex items-center justify-center text-xl font-bold transition-colors"
              >
                -
              </button>
              
              <div className="flex-1 text-center">
                <div className="text-3xl font-display text-ink">{level}</div>
                <div className="text-sm text-ink-muted">
                  Niveau actuel
                </div>
              </div>
              
              <button
                onClick={() => setLevelValue(Math.min(20, level + 1))}
                className="w-12 h-12 rounded-lg bg-parchment-dark hover:bg-divine-gold/20 
                         flex items-center justify-center text-xl font-bold transition-colors"
              >
                +
              </button>
            </div>
            
            <input
              type="range"
              min="1"
              max="20"
              value={level}
              onChange={(e) => setLevelValue(Number(e.target.value))}
              className="w-full mt-4 accent-divine-gold"
            />
          </div>
          
          {/* Constitution */}
          <div>
            <label className="flex items-center gap-2 text-ink font-medium mb-2">
              <Shield className="w-5 h-5 text-blood-red" />
              Constitution
            </label>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setConstitutionValue(Math.max(1, constitution - 1))}
                className="w-12 h-12 rounded-lg bg-parchment-dark hover:bg-blood-red/20 
                         flex items-center justify-center text-xl font-bold transition-colors"
              >
                -
              </button>
              
              <div className="flex-1 text-center">
                <div className="text-3xl font-display text-ink">{constitution}</div>
                <div className="text-sm text-blood-red font-bold">
                  Modificateur: {formatModifier(constitution)}
                </div>
              </div>
              
              <button
                onClick={() => setConstitutionValue(Math.min(30, constitution + 1))}
                className="w-12 h-12 rounded-lg bg-parchment-dark hover:bg-blood-red/20 
                         flex items-center justify-center text-xl font-bold transition-colors"
              >
                +
              </button>
            </div>
            
            <input
              type="range"
              min="1"
              max="30"
              value={constitution}
              onChange={(e) => setConstitutionValue(Number(e.target.value))}
              className="w-full mt-4 accent-blood-red"
            />
          </div>
          
          {/* Calcul des sorts */}
          <div className="card bg-divine-gold/10 border-divine-gold/30">
            <div className="flex items-start gap-2 mb-2">
              <Info className="w-5 h-5 text-divine-gold flex-shrink-0 mt-0.5" />
              <h3 className="font-display text-ink">Calculs</h3>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-ink-light">Mod. Sagesse ({wisdom})</span>
                <span className="font-bold text-divine-gold-dark">{formatModifier(wisdom)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-light">Niveau de clerc</span>
                <span className="font-bold text-divine-gold-dark">+ {level}</span>
              </div>
              <div className="border-t border-divine-gold/30 pt-2 flex justify-between">
                <span className="text-ink font-medium">Sorts préparables</span>
                <span className="font-display text-xl text-divine-gold-dark">{maxPrepared}</span>
              </div>
            </div>
          </div>
          
          {/* Force */}
          <div>
            <label className="flex items-center gap-2 text-ink font-medium mb-2">
              <Dumbbell className="w-5 h-5 text-forest" />
              Force
            </label>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setStrengthValue(Math.max(1, strength - 1))}
                className="w-12 h-12 rounded-lg bg-parchment-dark hover:bg-forest/20 
                         flex items-center justify-center text-xl font-bold transition-colors"
              >
                -
              </button>
              
              <div className="flex-1 text-center">
                <div className="text-3xl font-display text-ink">{strength}</div>
                <div className="text-sm text-forest font-bold">
                  Modificateur: {formatModifier(strength)}
                </div>
              </div>
              
              <button
                onClick={() => setStrengthValue(Math.min(30, strength + 1))}
                className="w-12 h-12 rounded-lg bg-parchment-dark hover:bg-forest/20 
                         flex items-center justify-center text-xl font-bold transition-colors"
              >
                +
              </button>
            </div>
            
            <input
              type="range"
              min="1"
              max="30"
              value={strength}
              onChange={(e) => setStrengthValue(Number(e.target.value))}
              className="w-full mt-4 accent-forest"
            />
          </div>
          
          {/* Capacité d'emport */}
          <div className="card bg-forest/10 border-forest/30">
            <div className="flex items-start gap-2 mb-2">
              <Package className="w-5 h-5 text-forest flex-shrink-0 mt-0.5" />
              <h3 className="font-display text-ink">Capacité d'emport</h3>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-ink-light">Force ({strength}) × 7.5</span>
                <span className="font-bold text-forest">{lightLoad.toFixed(1)} kg</span>
              </div>
              <div className="border-t border-forest/30 pt-2">
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-forest/10 rounded">
                    <div className="font-bold text-forest">Légère</div>
                    <div className="text-ink-muted">≤ {lightLoad.toFixed(1)} kg</div>
                    <div className="text-[10px] text-forest mt-1">Pas de pénalité</div>
                  </div>
                  <div className="p-2 bg-bronze/10 rounded">
                    <div className="font-bold text-bronze">Interm.</div>
                    <div className="text-ink-muted">≤ {mediumLoad.toFixed(1)} kg</div>
                    <div className="text-[10px] text-bronze mt-1">-3m vitesse</div>
                  </div>
                  <div className="p-2 bg-blood-red/10 rounded">
                    <div className="font-bold text-blood-red">Lourde</div>
                    <div className="text-ink-muted">≤ {heavyLoad.toFixed(1)} kg</div>
                    <div className="text-[10px] text-blood-red mt-1">Désavantage</div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-ink-muted mt-1">
                Au-delà de {heavyLoad.toFixed(1)} kg : Vitesse 0, impossible de se déplacer.
              </p>
            </div>
          </div>
          
          {/* Points de vie */}
          <div className="card bg-blood-red/10 border-blood-red/30">
            <div className="flex items-start gap-2 mb-2">
              <Heart className="w-5 h-5 text-blood-red flex-shrink-0 mt-0.5" />
              <h3 className="font-display text-ink">Points de vie</h3>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-ink-light">Dé de vie</span>
                <span className="font-bold text-blood-red">d8 (Clerc)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-light">Mod. Constitution ({constitution})</span>
                <span className="font-bold text-blood-red">{formatModifier(constitution)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-light">Niveau</span>
                <span className="font-bold text-blood-red">× {level}</span>
              </div>
              <div className="border-t border-blood-red/30 pt-2 flex justify-between">
                <span className="text-ink font-medium">PV maximum calculés</span>
                <span className="font-display text-xl text-blood-red">{calculatedMaxHp}</span>
              </div>
              <p className="text-xs text-ink-muted mt-1">
                Formule : 8 + (niveau-1)×5 + niveau×mod Con
              </p>
            </div>
          </div>
          
          {/* Note */}
          <p className="text-xs text-ink-muted text-center">
            Les sorts de domaine sont toujours préparés et ne comptent pas dans cette limite.
          </p>
        </div>
        
        {/* Footer */}
        <div className="flex gap-3 p-4 pb-8 sm:pb-4 border-t border-parchment-dark">
          <button
            onClick={onClose}
            className="flex-1 btn-secondary"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            className="flex-1 btn-primary"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}
