import type { EquipmentItem } from '@/types';

/**
 * Liste de courses recommandée pour un clerc de Torm niveau 5
 * Basée sur les composantes nécessaires et l'équipement prioritaire
 */

export const shoppingListItems: Partial<EquipmentItem>[] = [
  // PRIORITÉ CRITIQUE
  {
    id: 'diamants-reanimation',
    name: 'Diamants pour Retour à la vie',
    type: 'Composante',
    description: 'Diamants d\'une valeur de 300 po, consommés lors du lancement de Retour à la vie. Indispensable pour ramener un allié à la vie.',
    quantityIdeal: 2,
    unitPrice: 300,
    unitWeight: 0,
    isCarried: true,
    isComponent: true,
    relatedSpells: ['retour-a-la-vie'],
  },
  
  // PRIORITÉ HAUTE
  {
    id: 'potion-soins',
    name: 'Potion de soins',
    type: 'Consommable',
    description: 'Les alliés ramenés par Retour à la vie reviennent à 1 PV. Une potion les remet immédiatement debout !',
    quantityIdeal: 5,
    unitPrice: 50,
    unitWeight: 0.5,
    isCarried: true,
  },
  {
    id: 'armure-plaques',
    name: 'Armure de plaques',
    type: 'Armure',
    description: 'CA 18. Investissement majeur mais vital pour un clerc de guerre.',
    quantityIdeal: 1,
    unitPrice: 1500,
    unitWeight: 30,
    isCarried: false,
    isEquipped: false,
  },
  
  // Composantes pour sorts niveau 3
  {
    id: 'encens',
    name: 'Encens',
    type: 'Composante',
    description: 'Pour Communication avec les morts et Glyphe de protection.',
    quantityIdeal: 5,
    unitPrice: 5,
    unitWeight: 0.1,
    isCarried: true,
    isComponent: true,
    relatedSpells: ['communication-avec-les-morts', 'glyphe-de-protection'],
  },
  {
    id: 'poudre-diamant',
    name: 'Poudre de diamant (Glyphe)',
    type: 'Composante',
    description: 'Pour Glyphe de protection. Composante coûteuse mais réutilisable.',
    quantityIdeal: 1,
    unitPrice: 200,
    unitWeight: 0.1,
    isCarried: true,
    isComponent: true,
    relatedSpells: ['glyphe-de-protection'],
  },
  {
    id: 'poudre-argent-fer',
    name: 'Poudre d\'argent et de fer',
    type: 'Composante',
    description: 'Pour Cercle magique (contre invoqués/morts-vivants).',
    quantityIdeal: 1,
    unitPrice: 100,
    unitWeight: 0.1,
    isCarried: true,
    isComponent: true,
    relatedSpells: ['cercle-magique'],
  },
  {
    id: 'filament-cuivre',
    name: 'Filament de cuivre',
    type: 'Composante',
    description: 'Composante réutilisable pour Communication à distance.',
    quantityIdeal: 1,
    unitPrice: 5,
    unitWeight: 0,
    isCarried: true,
    isComponent: true,
    relatedSpells: ['communication-à-distance'],
  },
  {
    id: 'liege',
    name: 'Liège',
    type: 'Composante',
    description: 'Pour Marche sur l\'eau.',
    quantityIdeal: 1,
    unitPrice: 1,
    unitWeight: 0,
    isCarried: true,
    isComponent: true,
    relatedSpells: ['marche-sur-leau'],
  },
  {
    id: 'focale',
    name: 'Focale pour Clairvoyance',
    type: 'Composante',
    description: 'Focale d\'une valeur d\'au moins 100 po, réutilisable.',
    quantityIdeal: 1,
    unitPrice: 100,
    unitWeight: 0.5,
    isCarried: true,
    isComponent: true,
    relatedSpells: ['clairvoyance'],
  },
  
  // Autres équipements utiles
  {
    id: 'kit-soins',
    name: 'Kit de soins',
    type: 'Équipement aventure',
    description: 'Stabilisation automatique sans jet de Médecine.',
    quantityIdeal: 2,
    unitPrice: 5,
    unitWeight: 1,
    isCarried: true,
  },
  {
    id: 'coffre-voyage',
    name: 'Coffre de voyage',
    type: 'Équipement aventure',
    description: 'Pour protéger vos diamants de 300 po et autres objets de valeur.',
    quantityIdeal: 1,
    unitPrice: 15,
    unitWeight: 5,
    isCarried: false,
  },
  {
    id: 'symbole-sacre-rechange',
    name: 'Symboles sacrés de rechange',
    type: 'Composante',
    description: 'Sans symbole, pas de sorts avec composantes matérielles !',
    quantityIdeal: 2,
    unitPrice: 25,
    unitWeight: 0.5,
    isCarried: true,
    isComponent: true,
  },
  {
    id: 'figurine-cire',
    name: 'Figurine de cire de zézai',
    type: 'Composante',
    description: 'Pour le sort Langues.',
    quantityIdeal: 1,
    unitPrice: 10,
    unitWeight: 0,
    isCarried: true,
    isComponent: true,
    relatedSpells: ['langues'],
  },
];

// Calcul automatique des totaux
export const getShoppingListWithTotals = (): EquipmentItem[] => {
  return shoppingListItems.map(item => ({
    ...item,
    quantity: 0, // Par défaut, rien n'est acheté
    totalPrice: 0,
    totalWeight: item.unitWeight ? 0 : 0,
  })) as EquipmentItem[];
};

// Catégories de priorité pour l'affichage
export const priorityCategories = [
  { id: 'critical', label: '⚠️ Priorité Critique', color: 'text-blood-red' },
  { id: 'high', label: '🔥 Priorité Haute', color: 'text-bronze' },
  { id: 'components', label: '✨ Composantes', color: 'text-royal-purple' },
  { id: 'equipment', label: '🎒 Équipement', color: 'text-forest' },
];

// Regroupe les items par priorité
export const getShoppingListByPriority = () => {
  return {
    critical: shoppingListItems.filter(i => 
      i.id === 'diamants-reanimation'
    ),
    high: shoppingListItems.filter(i => 
      ['potion-soins', 'armure-plaques'].includes(i.id || '')
    ),
    components: shoppingListItems.filter(i => 
      i.isComponent && !['diamants-reanimation'].includes(i.id || '')
    ),
    equipment: shoppingListItems.filter(i => 
      !i.isComponent && !['potion-soins', 'armure-plaques'].includes(i.id || '')
    ),
  };
};
