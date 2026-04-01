import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSpellStore, useInventoryStore } from '@/stores';
import { Dashboard } from '@/pages/Dashboard';
import { SpellListPage } from '@/pages/SpellListPage';
import { CombatPage } from '@/pages/CombatPage';
import { InventoryPage } from '@/pages/InventoryPage';
import { PreparationPage } from '@/pages/PreparationPage';
import { Layout } from '@/components/layout/Layout';
import { spellsData } from '@/data/spellsData';
import { equipmentData } from '@/data/equipmentData';
import { componentMappingData } from '@/data/componentMappingData';

// Gère la redirection depuis 404.html pour GitHub Pages
function RedirectHandler() {
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirectPath = params.get('p');
    
    if (redirectPath) {
      // Supprime le paramètre ?p= de l'URL et navigue vers le bon chemin
      const cleanPath = redirectPath.replace(location.search, '');
      navigate(cleanPath + location.hash, { replace: true });
    }
  }, [location, navigate]);
  
  return null;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const loadSpells = useSpellStore((state) => state.loadSpells);
  const loadItems = useInventoryStore((state) => state.loadItems);
  const loadComponentMapping = useInventoryStore((state) => state.loadComponentMapping);

  useEffect(() => {
    try {
      // Charge les données directement depuis les imports
      loadSpells(spellsData);
      loadItems(equipmentData);
      loadComponentMapping(componentMappingData);
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement');
      setIsLoading(false);
    }
  }, [loadSpells, loadItems, loadComponentMapping]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-parchment flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚔️</div>
          <h1 className="text-2xl font-display text-ink mb-2">Cleric Spell Manager</h1>
          <p className="text-ink-muted">Chargement...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-parchment flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-display text-blood-red mb-2">Erreur</h1>
          <p className="text-ink mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <Router basename="/cleric-character-manager">
      <RedirectHandler />
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/spells" element={<SpellListPage />} />
          <Route path="/prepare" element={<PreparationPage />} />
          <Route path="/combat" element={<CombatPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
