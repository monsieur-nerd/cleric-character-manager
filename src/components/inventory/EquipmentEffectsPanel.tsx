// components/inventory/EquipmentEffectsPanel.tsx
// Panneau recapitulatif des effets d equipement actifs (US-008)

import { Shield, Target, AlertTriangle, EyeOff, Sword, Sparkles, Sun, Eye, Moon } from 'lucide-react';
import { useEquipment, useLightSources, useVisionEffects } from '@/hooks/useEquipment';
import { useCharacterStore } from '@/stores';
import { useInventoryStore } from '@/stores';

export function EquipmentEffectsPanel() {
  const { calculateAC, equippedArmor, equippedShield, equippedWeapons, armorStrengthIssue, stealthDisadvantage, handConflict } = useEquipment();
  const { activeLightSources, totalBrightLight, totalDimLight } = useLightSources();
  const { activeVisionEffects, totalDarkvision, toggleVisionEffect } = useVisionEffects();
  const attunedItems = useInventoryStore((state) => state.getAttunedItems());
  const character = useCharacterStore((state) => state.character);
  
  const profBonus = Math.floor((character.level - 1) / 4) + 2;
  
  return (
    <div className="card bg-blood-red/5 border-blood-red/20">
      <h3 className="font-display text-lg text-ink mb-3 flex items-center gap-2">
        <Target className="w-5 h-5 text-blood-red" />
        Statistiques de combat
      </h3>
      
      {/* CA et Bonus de maitrise */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-parchment-light rounded-lg p-3 text-center">
          <div className="text-xs text-ink-muted">Classe d armure</div>
          <div className="font-display text-3xl text-ink">{calculateAC.total}</div>
          <div className="text-xs text-ink-light mt-1">
            {calculateAC.formula}
          </div>
        </div>
        <div className="bg-parchment-light rounded-lg p-3 text-center">
          <div className="text-xs text-ink-muted">Bonus de maitrise</div>
          <div className="font-display text-3xl text-ink">+{profBonus}</div>
          <div className="text-xs text-ink-light mt-1">Niveau {character.level}</div>
        </div>
      </div>
      
      {/* Armes equipees (US-015) */}
      {equippedWeapons.length > 0 && (
        <div className="mb-3">
          <h4 className="text-xs font-bold text-ink-light uppercase tracking-wide mb-2">
            Armes equipees
          </h4>
          <div className="space-y-1">
            {equippedWeapons.map(weapon => (
              <div key={weapon.id} className="flex items-center justify-between bg-parchment/50 rounded px-3 py-2">
                <div className="flex items-center gap-2">
                  <Sword className="w-4 h-4 text-blood-red" />
                  <span className="text-sm text-ink">{weapon.name}</span>
                </div>
                {weapon.damage && (
                  <span className="text-xs text-ink-light">{weapon.damage}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Equipement actif */}
      <div className="space-y-2">
        {/* Armure */}
        <div className="flex items-center justify-between bg-parchment/50 rounded px-3 py-2">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-forest" />
            <span className="text-sm text-ink-muted">Armure</span>
          </div>
          <div className="text-sm">
            {equippedArmor ? (
              <span className="font-medium text-ink">
                {equippedArmor.name}
                <span className="text-ink-light ml-1">
                  (CA {equippedArmor.armorClass}
                  {equippedArmor.armorType && `, ${equippedArmor.armorType}`})
                </span>
              </span>
            ) : (
              <span className="text-ink-light italic">Aucune armure equipee</span>
            )}
          </div>
        </div>
        
        {/* Bouclier */}
        <div className="flex items-center justify-between bg-parchment/50 rounded px-3 py-2">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-steel-blue" />
            <span className="text-sm text-ink-muted">Bouclier</span>
          </div>
          <div className="text-sm">
            {equippedShield ? (
              <span className="font-medium text-ink">
                {equippedShield.name}
                <span className="text-ink-light ml-1">(+2 CA)</span>
              </span>
            ) : (
              <span className="text-ink-light italic">Aucun bouclier equipe</span>
            )}
          </div>
        </div>
      </div>
      
      {/* Sources de lumiere (US-012) */}
      {activeLightSources.length > 0 && (
        <div className="mt-3">
          <h4 className="text-xs font-bold text-ink-light uppercase tracking-wide mb-2">
            <Sun className="w-3 h-3 inline mr-1" />
            Sources de lumiere
          </h4>
          <div className="bg-yellow-500/10 rounded p-2 border border-yellow-500/20">
            <div className="grid grid-cols-2 gap-2 text-center text-sm">
              <div>
                <span className="text-ink-muted">Vive:</span>
                <span className="font-medium text-yellow-600 ml-1">{totalBrightLight}m</span>
              </div>
              <div>
                <span className="text-ink-muted">Faible:</span>
                <span className="font-medium text-yellow-500 ml-1">{totalDimLight}m</span>
              </div>
            </div>
            <div className="mt-2 space-y-1">
              {activeLightSources.map(item => (
                <div key={item.id} className="text-xs text-ink-light flex items-center gap-1">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                  {item.name}
                  {item.lightSource?.fuelRemaining !== undefined && (
                    <span className="text-ink-muted">
                      ({item.lightSource.fuelRemaining.toFixed(1)}h restantes)
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Effets de vision (US-035 a US-037) */}
      {activeVisionEffects.length > 0 && (
        <div className="mt-3">
          <h4 className="text-xs font-bold text-ink-light uppercase tracking-wide mb-2">
            <Eye className="w-3 h-3 inline mr-1" />
            Capacites de vision
          </h4>
          <div className="space-y-1">
            {activeVisionEffects.map(item => (
              <div key={item.id} className="flex items-center justify-between bg-purple-500/10 rounded px-3 py-2 border border-purple-500/20">
                <div className="flex items-center gap-2">
                  {item.visionEffect?.darkvision && <Moon className="w-4 h-4 text-purple-500" />}
                  {item.visionEffect?.truesight && <Eye className="w-4 h-4 text-blue-500" />}
                  <span className="text-sm text-ink">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.visionEffect?.darkvision && (
                    <span className="text-xs text-purple-600">{item.visionEffect.darkvision}m</span>
                  )}
                  {item.visionEffect?.truesight && (
                    <span className="text-xs text-blue-600">{item.visionEffect.truesight}m</span>
                  )}
                  <button
                    onClick={() => toggleVisionEffect(item.id)}
                    className={`w-8 h-4 rounded-full relative transition-colors ${
                      item.visionEffect?.isActive ? 'bg-purple-500' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${
                      item.visionEffect?.isActive ? 'left-4.5' : 'left-0.5'
                    }`} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {totalDarkvision > 0 && (
            <div className="mt-2 text-xs text-center text-purple-600">
              Vision dans le noir: {totalDarkvision}m
            </div>
          )}
        </div>
      )}
      
      {/* Harmonisation (US-041 a US-043) */}
      {attunedItems.length > 0 && (
        <div className="mt-3">
          <h4 className="text-xs font-bold text-ink-light uppercase tracking-wide mb-2">
            <Sparkles className="w-3 h-3 inline mr-1" />
            Objets harmonises ({attunedItems.length}/3)
          </h4>
          <div className="space-y-1">
            {attunedItems.map(item => (
              <div key={item.id} className="flex items-center gap-2 bg-divine-gold/10 rounded px-3 py-1.5 border border-divine-gold/30">
                <Sparkles className="w-3 h-3 text-divine-gold" />
                <span className="text-sm text-ink">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Alertes et avertissements */}
      <div className="mt-3 space-y-2">
        {/* Avertissement Force requise (US-007) */}
        {armorStrengthIssue && (
          <div className="bg-blood-red/10 p-2 rounded border border-blood-red/30 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-blood-red flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="text-blood-red font-medium">Force insuffisante</p>
              <p className="text-ink-light">{armorStrengthIssue.message}</p>
            </div>
          </div>
        )}
        
        {/* Avertissement Discrétion (US-006) */}
        {stealthDisadvantage && (
          <div className="bg-bronze/10 p-2 rounded border border-bronze/30 flex items-start gap-2">
            <EyeOff className="w-4 h-4 text-bronze flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="text-bronze font-medium">Desavantage en Discretion</p>
              <p className="text-ink-light">Cette armure produit du bruit lors des deplacements furtifs.</p>
            </div>
          </div>
        )}
        
        {/* Avertissement conflit mains (US-004) */}
        {handConflict.hasConflict && (
          <div className="bg-blood-red/10 p-2 rounded border border-blood-red/30 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-blood-red flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="text-blood-red font-medium">Conflit d equipement</p>
              <p className="text-ink-light">{handConflict.message}</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Resume du calcul */}
      <div className="mt-3 pt-3 border-t border-parchment-dark">
        <div className="text-xs text-ink-muted mb-1">Detail du calcul de CA</div>
        <div className="text-sm text-ink space-y-1">
          <div className="flex justify-between">
            <span>Base</span>
            <span>{calculateAC.base}</span>
          </div>
          <div className="flex justify-between">
            <span>Bonus DEX</span>
            <span>{calculateAC.dexBonus >= 0 ? `+${calculateAC.dexBonus}` : calculateAC.dexBonus}</span>
          </div>
          {calculateAC.shieldBonus > 0 && (
            <div className="flex justify-between">
              <span>Bouclier</span>
              <span>+{calculateAC.shieldBonus}</span>
            </div>
          )}
          <div className="flex justify-between font-bold border-t border-parchment-dark pt-1">
            <span>Total</span>
            <span className="text-blood-red">{calculateAC.total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
