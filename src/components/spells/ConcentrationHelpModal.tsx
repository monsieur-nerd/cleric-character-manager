import { X, Brain, Shield, AlertTriangle, Heart, Skull, Dices } from 'lucide-react';
import { useCharacterStore } from '@/stores';

interface ConcentrationHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConcentrationHelpModal({ isOpen, onClose }: ConcentrationHelpModalProps) {
  const character = useCharacterStore((state) => state.character);
  const getModifier = useCharacterStore((state) => state.getModifier);
  
  // Calculs dynamiques basés sur le personnage
  const conModifier = getModifier(character.constitution);
  const conScore = character.constitution;
  const profBonus = Math.floor((character.level - 1) / 4) + 2;
  
  // Probabilité approximative de réussir un jet de concentration
  // DD typique = 10, donc besoin de 10 - mod Con
  const neededRoll = Math.max(2, 10 - conModifier); // Minimum 2 (échec critique toujours échoue)
  const successChance = Math.max(0, Math.min(100, (21 - neededRoll) / 20 * 100));
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fade-in">
      <div className="bg-parchment rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto border-2 border-divine-gold">
        {/* Header */}
        <div className="sticky top-0 bg-parchment border-b border-divine-gold/30 p-4 flex items-center justify-between">
          <h2 className="font-display text-xl text-ink flex items-center gap-2">
            <Brain className="w-6 h-6 text-royal-purple" />
            Concentration
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-ink-muted hover:text-blood-red transition-colors rounded-full hover:bg-parchment-dark"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Introduction */}
          <div className="bg-royal-purple/10 border border-royal-purple/30 rounded-lg p-3">
            <p className="text-sm text-ink">
              Les sorts marqués <span className="badge bg-bronze/20 text-bronze border border-bronze">Conc.</span> nécessitent que tu maintiennes ta concentration pour que l'effet persiste.
            </p>
          </div>

          {/* Règle principale */}
          <div className="space-y-2">
            <h3 className="font-display text-lg text-ink flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-divine-gold" />
              Règle d'or
            </h3>
            <p className="text-sm text-ink-light">
              Tu ne peux maintenir qu'<strong className="text-blood-red">UN SEUL</strong> sort de concentration à la fois. Si tu en lances un nouveau, le précédent se termine immédiatement.
            </p>
          </div>

          {/* Stats du personnage */}
          <div className="bg-parchment-dark/30 rounded-lg p-3 border border-divine-gold/20">
            <h4 className="font-display text-sm text-ink mb-2 flex items-center gap-2">
              <Dices className="w-4 h-4 text-divine-gold" />
              Tes statistiques de concentration
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-ink-light">Constitution :</span>
                <span className="font-bold text-ink">{conScore} ({conModifier >= 0 ? '+' : ''}{conModifier})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-light">Niveau :</span>
                <span className="font-bold text-ink">{character.level}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-light">Bonus maîtrise :</span>
                <span className="font-bold text-ink">+{profBonus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-light">Chance de réussite* :</span>
                <span className={`font-bold ${successChance >= 70 ? 'text-forest' : successChance >= 40 ? 'text-divine-gold-dark' : 'text-blood-red'}`}>
                  {Math.round(successChance)}%
                </span>
              </div>
            </div>
            <p className="text-xs text-ink-muted mt-2">
              * Pour un jet DD 10 (dégâts légers)
            </p>
          </div>

          {/* Quand ça se termine */}
          <div className="space-y-2">
            <h3 className="font-display text-lg text-ink flex items-center gap-2">
              <Skull className="w-5 h-5 text-blood-red" />
              Quand la concentration se termine
            </h3>
            <ul className="space-y-2 text-sm text-ink-light">
              <li className="flex items-start gap-2">
                <span className="text-blood-red font-bold">1.</span>
                <span>Tu lances un autre sort de concentration</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blood-red font-bold">2.</span>
                <span>Tu subis des dégâts (jet de sauvegarde de Constitution)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blood-red font-bold">3.</span>
                <span>Tu es neutralisé (paralysé, inconscient, étourdi...)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blood-red font-bold">4.</span>
                <span>Tu meurs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blood-red font-bold">5.</span>
                <span>Tu décides de la terminer (action libre)</span>
              </li>
            </ul>
          </div>

          {/* Jet de sauvegarde */}
          <div className="bg-blood-red/10 border border-blood-red/30 rounded-lg p-3">
            <h4 className="font-display text-sm text-ink mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-blood-red" />
              Jet de sauvegarde (dégâts)
            </h4>
            <p className="text-sm text-ink-light mb-2">
              Quand tu subis des dégâts, fais un jet de sauvegarde de Constitution :
            </p>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between items-center bg-parchment/50 p-2 rounded">
                <span className="text-ink-light">DD (Degré de Difficulté) :</span>
                <span className="font-bold text-ink">10 OU ½ dégâts</span>
              </div>
              <div className="flex justify-between items-center bg-parchment/50 p-2 rounded">
                <span className="text-ink-light">Bonus au jet :</span>
                <span className="font-bold text-ink">+{conModifier} (Constitution)</span>
              </div>
            </div>
            <div className="mt-2 text-xs text-ink-muted">
              <p className="font-semibold">Exemples :</p>
              <ul className="list-disc list-inside mt-1 space-y-0.5">
                <li>8 dégâts → DD 10 (car 10 {'>'} 8÷2=4)</li>
                <li>12 dégâts → DD 12 (car 12 {'>'} 10)</li>
                <li>25 dégâts → DD 13 (car 25÷2=12.5 {'>'} 10)</li>
              </ul>
            </div>
          </div>

          {/* Astuce */}
          <div className="bg-forest/10 border border-forest/30 rounded-lg p-3">
            <h4 className="font-display text-sm text-ink mb-1 flex items-center gap-2">
              <Heart className="w-4 h-4 text-forest" />
              Astuce pour {character.name}
            </h4>
            <p className="text-sm text-ink-light">
              Avec {conScore} en Constitution, tu {conModifier >= 2 ? 'as un bon avantage' : conModifier >= 0 ? 'es moyennement résistant' : 'es fragile'} aux jets de concentration. 
              {conModifier < 2 && ' Privilégie les sorts rapides ou lance ta concentration après le combat.'}
              {conModifier >= 2 && ' Tu peux te permettre de maintenir des sorts même en combat intense.'}
            </p>
          </div>

          {/* Bouton fermer */}
          <button
            onClick={onClose}
            className="w-full btn-primary py-3"
          >
            J'ai compris
          </button>
        </div>
      </div>
    </div>
  );
}
