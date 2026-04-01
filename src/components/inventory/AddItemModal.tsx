import { useState } from 'react';
import { X, Plus, Package, Scale, Coins, FileText, Tag } from 'lucide-react';
import { useInventoryStore } from '@/stores';
import { formatPrice } from '@/utils/formatters';
import type { EquipmentItem, EquipmentType } from '@/types';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const equipmentTypes: EquipmentType[] = [
  'Composante',
  'Arme',
  'Armure',
  'Bouclier',
  'Consommable',
  'Équipement aventure',
  'Monture',
  'Correspondances',
  'Pièges',
  'Escalade',
];

export function AddItemModal({ isOpen, onClose }: AddItemModalProps) {
  const addItem = useInventoryStore((state) => state.addItem);
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'Équipement aventure' as EquipmentType,
    description: '',
    quantity: 1,
    unitPrice: 0,
    unitWeight: 0,
    isCarried: true,
    isComponent: false,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  if (!isOpen) return null;
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    
    if (formData.quantity < 1) {
      newErrors.quantity = 'La quantité doit être au moins 1';
    }
    
    if (formData.unitPrice < 0) {
      newErrors.unitPrice = 'Le prix ne peut pas être négatif';
    }
    
    if (formData.unitWeight < 0) {
      newErrors.unitWeight = 'Le poids ne peut pas être négatif';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = () => {
    if (!validate()) return;
    
    const newItem: EquipmentItem = {
      id: `custom-${Date.now()}`,
      name: formData.name.trim(),
      type: formData.type,
      description: formData.description.trim(),
      quantity: formData.quantity,
      unitPrice: formData.unitPrice,
      totalPrice: Number((formData.unitPrice * formData.quantity).toFixed(2)),
      unitWeight: formData.unitWeight || null,
      totalWeight: (formData.unitWeight || 0) * formData.quantity,
      isCarried: formData.isCarried,
      isComponent: formData.isComponent || formData.type === 'Composante',
    };
    
    addItem(newItem);
    onClose();
    
    // Reset form
    setFormData({
      name: '',
      type: 'Équipement aventure',
      description: '',
      quantity: 1,
      unitPrice: 0,
      unitWeight: 0,
      isCarried: true,
      isComponent: false,
    });
    setErrors({});
  };
  
  const handleClose = () => {
    onClose();
    setErrors({});
  };
  
  // Calculs pour l'affichage
  const totalPrice = Number((formData.unitPrice * formData.quantity).toFixed(2));
  const totalWeight = (formData.unitWeight || 0) * formData.quantity;
  
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-parchment-light w-full max-w-md max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-parchment-dark">
          <h2 className="font-display text-xl text-ink flex items-center gap-2">
            <Plus className="w-5 h-5 text-divine-gold" />
            Ajouter un objet
          </h2>
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-parchment-dark rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-ink" />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          {/* Nom */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-ink mb-1">
              <Package className="w-4 h-4 text-divine-gold" />
              Nom de l'objet *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: Diamants pour Retour à la vie"
              className="w-full input-field"
            />
            {errors.name && (
              <p className="text-xs text-blood-red mt-1">{errors.name}</p>
            )}
          </div>
          
          {/* Type */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-ink mb-1">
              <Tag className="w-4 h-4 text-divine-gold" />
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ 
                ...formData, 
                type: e.target.value as EquipmentType,
                isComponent: e.target.value === 'Composante'
              })}
              className="w-full input-field"
            >
              {equipmentTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          {/* Description */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-ink mb-1">
              <FileText className="w-4 h-4 text-divine-gold" />
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Description de l'objet..."
              rows={2}
              className="w-full input-field resize-none"
            />
          </div>
          
          {/* Quantité et Prix */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-ink mb-1">
                Quantité *
              </label>
              <input
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: Math.max(1, parseInt(e.target.value) || 1) })}
                className="w-full input-field"
              />
              {errors.quantity && (
                <p className="text-xs text-blood-red mt-1">{errors.quantity}</p>
              )}
            </div>
            
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-ink mb-1">
                <Coins className="w-4 h-4 text-divine-gold" />
                Prix unitaire (po)
              </label>
              <input
                type="number"
                min="0"
                value={formData.unitPrice}
                onChange={(e) => setFormData({ ...formData, unitPrice: Math.max(0, parseFloat(e.target.value) || 0) })}
                className="w-full input-field"
              />
              {errors.unitPrice && (
                <p className="text-xs text-blood-red mt-1">{errors.unitPrice}</p>
              )}
            </div>
          </div>
          
          {/* Poids */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-ink mb-1">
              <Scale className="w-4 h-4 text-divine-gold" />
              Poids unitaire (kg)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={formData.unitWeight}
              onChange={(e) => setFormData({ ...formData, unitWeight: Math.max(0, parseFloat(e.target.value) || 0) })}
              placeholder="0 pour objets sans poids"
              className="w-full input-field"
            />
            {errors.unitWeight && (
              <p className="text-xs text-blood-red mt-1">{errors.unitWeight}</p>
            )}
          </div>
          
          {/* Options */}
          <div className="flex flex-wrap gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isCarried}
                onChange={(e) => setFormData({ ...formData, isCarried: e.target.checked })}
                className="w-4 h-4 accent-divine-gold"
              />
              <span className="text-sm text-ink">Transporté</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isComponent}
                onChange={(e) => setFormData({ ...formData, isComponent: e.target.checked })}
                className="w-4 h-4 accent-divine-gold"
              />
              <span className="text-sm text-ink">Composante de sort</span>
            </label>
          </div>
          
          {/* Résumé des calculs */}
          <div className="card bg-divine-gold/5 border-divine-gold/30">
            <h4 className="font-display text-sm text-ink mb-2">Résumé</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-ink-muted">Prix total:</span>
                <div className="font-display text-divine-gold-dark">{formatPrice(totalPrice)}</div>
              </div>
              <div>
                <span className="text-ink-muted">Poids total:</span>
                <div className="font-display text-divine-gold-dark">{totalWeight.toFixed(2)} kg</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex gap-3 p-4 pb-8 sm:pb-4 border-t border-parchment-dark">
          <button
            onClick={handleClose}
            className="flex-1 btn-secondary"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 btn-primary flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}
