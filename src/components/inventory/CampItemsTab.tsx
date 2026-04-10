import { Tent, ArrowLeft, Package, MapPin } from 'lucide-react';
import { useInventoryStore } from '@/stores';
import { formatWeight, formatPrice } from '@/utils/formatters';
import type { EquipmentItem } from '@/types';

export function CampItemsTab() {
  const items = useInventoryStore((state) => state.items);
  const getCampItems = useInventoryStore((state) => state.getCampItems);
  const toggleAtCamp = useInventoryStore((state) => state.toggleAtCamp);
  const takeAllFromCamp = useInventoryStore((state) => state.takeAllFromCamp);
  const getTotalWeight = useInventoryStore((state) => state.getTotalWeight);

  const campItems = getCampItems();
  const totalCampWeight = campItems.reduce((sum, item) => sum + (item.totalWeight || 0), 0);

  const itemsByType = campItems.reduce((acc, item) => {
    const type = item.type || 'Autre';
    if (!acc[type]) acc[type] = [];
    acc[type].push(item);
    return acc;
  }, {} as Record<string, EquipmentItem[]>);

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header avec stats et bouton reprendre tout */}
      <div className="card bg-divine-gold/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-divine-gold/20 flex items-center justify-center">
              <Tent className="w-5 h-5 text-divine-gold-dark" />
            </div>
            <div>
              <h3 className="font-display text-ink">Objets au camp</h3>
              <p className="text-xs text-ink-muted">
                {campItems.length} objet{campItems.length > 1 ? 's' : ''} • {formatWeight(totalCampWeight)}
              </p>
            </div>
          </div>
          
          {campItems.length > 0 && (
            <button
              onClick={takeAllFromCamp}
              className="btn-primary flex items-center gap-2 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Reprendre tout
            </button>
          )}
        </div>
      </div>

      {/* Liste des items au camp */}
      {campItems.length === 0 ? (
        <div className="text-center py-12 text-ink-muted">
          <Tent className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <p className="font-display text-lg">Aucun objet au camp</p>
          <p className="text-sm mt-2">
            Laissez des objets ici pour alléger votre charge
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(itemsByType).map(([type, typeItems]) => (
            <section key={type}>
              <h4 className="font-display text-sm text-ink-muted mb-2">
                {type}
                <span className="ml-1">({typeItems.length})</span>
              </h4>
              
              <div className="space-y-2">
                {typeItems.map((item) => (
                  <div
                    key={item.id}
                    className="card p-3 bg-parchment-dark/20 border-dashed border-ink-muted/30"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-ink-muted" />
                          <span className="font-display text-ink">{item.name}</span>
                          <span className="badge bg-parchment-dark/50 text-ink-muted text-xs">
                            Au camp
                          </span>
                        </div>
                        
                        {item.description && (
                          <p className="text-xs text-ink-muted mt-1 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                        
                        <div className="flex gap-3 mt-2 text-xs text-ink-light">
                          <span>{formatPrice(item.unitPrice)}/u</span>
                          <span>{formatWeight(item.unitWeight)}/u</span>
                          <span className="text-ink-muted">Qty: {item.quantity}</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => toggleAtCamp(item.id)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm
                                 text-forest border border-forest/30 
                                 hover:bg-forest/10 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Reprendre
                      </button>
                    </div>
                    
                    <div className="mt-2 pt-2 border-t border-parchment-dark/50">
                      <span className="text-xs text-ink-muted">
                        Total: {formatPrice(item.totalPrice)} • {formatWeight(item.totalWeight)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
