// components/inventory/LightSourcePanel.tsx
// Panneau de gestion des sources de lumiere (US-012 a US-014)

import { useState } from 'react';
import { Sun, Moon, Flame, AlertTriangle, Droplets, Plus, Minus } from 'lucide-react';
import { useInventoryStore } from '@/stores';
import { useLightSources } from '@/hooks/useEquipment';
import type { EquipmentItem } from '@/types';

interface LightSourcePanelProps {
  compact?: boolean;
}

export function LightSourcePanel({ compact = false }: LightSourcePanelProps) {
  const items = useInventoryStore((state) => state.items);
  const equipItem = useInventoryStore((state) => state.equipItem);
  const unequipItem = useInventoryStore((state) => state.unequipItem);
  const { activeLightSources, totalBrightLight, totalDimLight, consumeFuel, refillFuel } = useLightSources();
  const [showDetails, setShowDetails] = useState(false);
  
  // Trouve toutes les sources de lumiere dans l inventaire
  const lightSourceItems = items.filter(item => item.lightSource);
  
  // Fonction pour obtenir l icone appropriee
  const getLightIcon = (item: EquipmentItem) => {
    if (item.name.toLowerCase().includes('torche')) return <Flame className="w-5 h-5 text-orange-500" />;
    if (item.name.toLowerCase().includes('lanterne')) return <Sun className="w-5 h-5 text-yellow-500" />;
    if (item.name.toLowerCase().includes('lampe')) return <Sun className="w-5 h-5 text-yellow-400" />;
    return <Moon className="w-5 h-5 text-blue-300" />;
  };
  
  // Formate la duree de carburant
  const formatFuel = (hours?: number) => {
    if (hours === undefined) return 'Illimite';
    if (hours >= 1) return `${hours.toFixed(1)}h`;
    return `${Math.round(hours * 60)}min`;
  };
  
  if (compact) {
    return (
      <div className="card bg-yellow-500/5 border-yellow-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sun className="w-5 h-5 text-yellow-500" />
            <span className="font-display text-ink">Lumiere</span>
          </div>
          <div className="text-sm text-ink-light">
            {activeLightSources.length > 0 ? (
              <span>
                {totalBrightLight}m vive / {totalDimLight}m faible
              </span>
            ) : (
              <span className="text-ink-muted">Aucune source</span>
            )}
          </div>
        </div>
        
        {activeLightSources.some(item => 
          item.lightSource?.fuelRemaining !== undefined && 
          item.lightSource.fuelRemaining < 1
        ) && (
          <div className="mt-2 bg-red-500/10 p-2 rounded border border-red-500/30 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <span className="text-xs text-red-600">Carburant faible !</span>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className="card bg-yellow-500/5 border-yellow-500/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg text-ink flex items-center gap-2">
          <Sun className="w-5 h-5 text-yellow-500" />
          Sources de lumiere
        </h3>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs text-ink-muted hover:text-ink"
        >
          {showDetails ? 'Moins' : 'Details'}
        </button>
      </div>
      
      {/* Resume de la lumiere active */}
      {activeLightSources.length > 0 ? (
        <div className="bg-parchment-light rounded-lg p-3 mb-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-xs text-ink-muted">Lumiere vive</div>
              <div className="font-display text-2xl text-yellow-600">{totalBrightLight}m</div>
            </div>
            <div>
              <div className="text-xs text-ink-muted">Lumiere faible</div>
              <div className="font-display text-2xl text-yellow-400">{totalDimLight}m</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-4 text-ink-muted mb-4">
          <Moon className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Aucune source de lumiere active</p>
          <p className="text-xs">Dans lobscurite totale</p>
        </div>
      )}
      
      {/* Liste des sources de lumiere */}
      <div className="space-y-2">
        {lightSourceItems.map(item => {
          const isEquipped = item.isEquipped;
          const fuelRemaining = item.lightSource?.fuelRemaining;
          const fuelDuration = item.lightSource?.fuelDuration;
          const hasFuel = fuelDuration === undefined || (fuelRemaining !== undefined && fuelRemaining > 0);
          const isLowFuel = fuelRemaining !== undefined && fuelRemaining < 1 && fuelRemaining > 0;
          const isEmpty = fuelRemaining !== undefined && fuelRemaining <= 0;
          
          return (
            <div 
              key={item.id} 
              className={`p-3 rounded-lg border ${
                isEquipped 
                  ? 'bg-yellow-500/10 border-yellow-500/30' 
                  : 'bg-parchment/50 border-parchment-dark'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getLightIcon(item)}
                  <div>
                    <span className={`font-medium ${isEquipped ? 'text-ink' : 'text-ink-muted'}`}>
                      {item.name}
                    </span>
                    {item.lightSource?.requiresHand && (
                      <span className="text-xs text-ink-muted ml-2">(Occupe une main)</span>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={() => isEquipped ? unequipItem(item.id) : equipItem(item.id)}
                  disabled={!hasFuel}
                  className={`px-3 py-1 rounded text-sm ${
                    isEquipped
                      ? 'bg-yellow-500 text-white'
                      : hasFuel
                        ? 'bg-parchment-dark text-ink hover:bg-yellow-500/20'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isEquipped ? 'Allume' : 'Eteint'}
                </button>
              </div>
              
              {/* Barre de carburant */}
              {fuelDuration !== undefined && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-ink-muted">Carburant:</span>
                    <span className={isEmpty ? 'text-red-500' : isLowFuel ? 'text-orange-500' : 'text-ink-light'}>
                      {formatFuel(fuelRemaining)} / {formatFuel(fuelDuration)}
                    </span>
                  </div>
                  <div className="h-2 bg-parchment-dark rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all ${
                        isEmpty ? 'bg-red-500' : isLowFuel ? 'bg-orange-500' : 'bg-yellow-500'
                      }`}
                      style={{ 
                        width: `${Math.max(0, Math.min(100, ((fuelRemaining || 0) / fuelDuration) * 100))}%` 
                      }}
                    />
                  </div>
                  
                  {/* Controles de carburant */}
                  {showDetails && (
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => consumeFuel(item.id, 0.5)}
                        className="flex-1 py-1 text-xs bg-parchment-dark rounded hover:bg-parchment"
                        title="Consommer 30 min"
                      >
                        -30min
                      </button>
                      <button
                        onClick={() => refillFuel(item.id, 1)}
                        className="flex-1 py-1 text-xs bg-parchment-dark rounded hover:bg-parchment flex items-center justify-center gap-1"
                        title="Recharger 1h"
                      >
                        <Droplets className="w-3 h-3" />
                        +1h
                      </button>
                    </div>
                  )}
                </div>
              )}
              
              {/* Avertissement carburant faible */}
              {isLowFuel && (
                <div className="mt-2 bg-orange-500/10 p-2 rounded border border-orange-500/30 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                  <span className="text-xs text-orange-600">Carburant faible</span>
                </div>
              )}
              
              {/* Avertissement epuise */}
              {isEmpty && (
                <div className="mt-2 bg-red-500/10 p-2 rounded border border-red-500/30 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span className="text-xs text-red-600">Carburant epuise - Rechargement necessaire</span>
                </div>
              )}
            </div>
          );
        })}
        
        {lightSourceItems.length === 0 && (
          <div className="text-center py-4 text-ink-muted">
            <p className="text-sm">Aucune source de lumiere dans linventaire</p>
          </div>
        )}
      </div>
    </div>
  );
}
