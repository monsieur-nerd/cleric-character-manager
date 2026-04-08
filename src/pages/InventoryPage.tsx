import { useState } from 'react';
import { Package, Plus, Minus, AlertCircle, ShoppingCart, PlusCircle, Sword } from 'lucide-react';
import { useInventoryStore } from '@/stores';
import { useCharacterStore } from '@/stores';
import { formatWeight, formatPrice } from '@/utils/formatters';
import { ShoppingList } from '@/components/inventory/ShoppingList';
import { AddItemModal } from '@/components/inventory/AddItemModal';
import { CombatEquipmentTab } from '@/components/inventory/CombatEquipmentTab';
import type { EquipmentItem } from '@/types';

const categories = [
  'Tous',
  'Monture',
  'Éclairage',
  'Hygiène',
  'Écriture / Dessin',
  'Sacs / Étuis',
  'Escalade',
  'Correspondances',
  'Soins',
  'Pièges',
  'Autre',
];

const tabs = [
  { id: 'inventory', label: 'Inventaire', icon: Package },
  { id: 'combat', label: 'Armement', icon: Sword },
  { id: 'shopping', label: 'À acheter', icon: ShoppingCart },
];

export function InventoryPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [activeTab, setActiveTab] = useState<'inventory' | 'combat' | 'shopping'>('inventory');
  const [showAddModal, setShowAddModal] = useState(false);
  
  const items = useInventoryStore((state) => state.items);
  const updateQuantity = useInventoryStore((state) => state.updateQuantity);
  const getTotalValue = useInventoryStore((state) => state.getTotalValue);
  const getCarriedWeight = useInventoryStore((state) => state.getCarriedWeight);
  
  const character = useCharacterStore((state) => state.character);
  const getEncumbranceLevel = useCharacterStore((state) => state.getEncumbranceLevel);
  
  // Calcul du niveau d'encombrement
  const carriedWeight = getCarriedWeight();
  const encumbranceLevel = getEncumbranceLevel(carriedWeight);
  const carryingCapacity = character.carryingCapacity;
  
  const getEncumbranceColor = () => {
    switch (encumbranceLevel) {
      case 'light': return 'text-forest';
      case 'medium': return 'text-bronze';
      case 'heavy': return 'text-blood-red';
      case 'over': return 'text-blood-red font-bold';
    }
  };
  
  const getEncumbranceText = () => {
    switch (encumbranceLevel) {
      case 'light': return 'Charge légère';
      case 'medium': return 'Charge intermédiaire (-3m)';
      case 'heavy': return 'Charge lourde (désavantage)';
      case 'over': return 'SURCHARGE !';
    }
  };
  
  // Filtre les items
  const filteredItems = items.filter((item: EquipmentItem) => {
    if (selectedCategory === 'Tous') return true;
    return item.type === selectedCategory;
  });
  
  // Groupe par type
  const itemsByType = filteredItems.reduce((acc, item) => {
    const type = item.type || 'Autre';
    if (!acc[type]) acc[type] = [];
    acc[type].push(item);
    return acc;
  }, {} as Record<string, EquipmentItem[]>);

  return (
    <div className="p-4 space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl text-ink flex items-center gap-2">
          <Package className="w-6 h-6 text-divine-gold" />
          Inventaire
        </h2>
        {activeTab === 'inventory' && (
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary flex items-center gap-2 text-sm py-2 px-3"
          >
            <PlusCircle className="w-4 h-4" />
            Ajouter
          </button>
        )}
      </div>
      
      {/* Onglets */}
      <div className="flex gap-2 border-b border-parchment-dark">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'inventory' | 'combat' | 'shopping')}
            className={`flex items-center gap-2 px-4 py-2 font-ui text-sm border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-divine-gold text-ink'
                : 'border-transparent text-ink-muted hover:text-ink'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>
      
      {activeTab === 'shopping' ? (
        <ShoppingList />
      ) : activeTab === 'combat' ? (
        <CombatEquipmentTab />
      ) : (
        <>
          {/* Stats */}
          <div className="card bg-divine-gold/5">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-xs text-ink-muted">Poids total</div>
                <div className={`font-display text-lg ${getEncumbranceColor()}`}>
                  {formatWeight(getCarriedWeight())}
                </div>
                <div className={`text-xs ${getEncumbranceColor()}`}>
                  {getEncumbranceText()}
                </div>
              </div>
              <div>
                <div className="text-xs text-ink-muted">Valeur</div>
                <div className="font-display text-lg text-ink">
                  {formatPrice(getTotalValue())}
                </div>
              </div>
            </div>
            <div className="mt-2 text-xs text-center border-t border-parchment-dark pt-2">
              <span className="text-ink-muted">Capacité: </span>
              <span className="text-forest font-medium">{carryingCapacity.toFixed(1)} kg</span>
              <span className="text-ink-muted mx-1">|</span>
              <span className="text-bronze font-medium">{(carryingCapacity * 2).toFixed(1)} kg</span>
              <span className="text-ink-muted mx-1">|</span>
              <span className="text-blood-red font-medium">{(carryingCapacity * 3).toFixed(1)} kg</span>
            </div>
          </div>
      
      {/* Filtres catégories */}
      <div className="flex flex-wrap gap-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`filter-chip ${
              selectedCategory === cat ? 'active' : ''
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      
      {/* Liste des items */}
      <div className="space-y-4">
        {Object.entries(itemsByType).map(([type, typeItems]) => (
          <section key={type}>
            <h3 className="font-display text-sm text-ink-muted mb-2 sticky top-14 bg-parchment/95 py-2 z-10">
              {type}
              <span className="ml-1">({typeItems.length})</span>
            </h3>
            
            <div className="space-y-2">
              {typeItems.map((item: EquipmentItem) => (
                <div key={item.id} className="card p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-display text-ink break-words">{item.name}</span>
                        {item.isComponent && (
                          <span className="badge badge-type text-xs flex-shrink-0">Comp.</span>
                        )}
                      </div>
                      
                      {item.description && (
                        <p className="text-xs text-ink-muted mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                      
                      <div className="flex gap-3 mt-2 text-xs text-ink-light">
                        <span>{formatPrice(item.unitPrice)}/u</span>
                        <span>{formatWeight(item.unitWeight)}/u</span>
                      </div>
                    </div>
                    
                    {/* Contrôle quantité */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 0}
                        className="w-8 h-8 rounded bg-parchment-dark flex items-center justify-center
                                 hover:bg-divine-gold/20 disabled:opacity-30"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      
                      <span className="w-8 text-center font-ui font-bold">
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded bg-parchment-dark flex items-center justify-center
                                 hover:bg-divine-gold/20"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Total */}
                  <div className="mt-2 pt-2 border-t border-parchment-dark/50 flex justify-between text-xs">
                    <span className="text-ink-muted">Total:</span>
                    <span className="text-ink">
                      {formatPrice(item.totalPrice)} • {formatWeight(item.totalWeight)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
        
        {filteredItems.length === 0 && (
          <div className="text-center py-8 text-ink-muted">
            <Package className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p>Aucun objet dans cette catégorie</p>
          </div>
        )}
      </div>
      
          {/* Alerte composantes */}
          <div className="card bg-blood-red/10 border-blood-red/30">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-blood-red flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-display text-ink text-sm">Composants importants</h4>
                <p className="text-xs text-ink-muted mt-1">
                  Assurez-vous d'avoir suffisamment de diamants (300 po) pour Retour à la vie 
                  et d'encens pour Communication avec les morts.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* Modal d'ajout */}
      <AddItemModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  );
}
