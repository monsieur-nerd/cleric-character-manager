import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSpellStore, useInventoryStore, useCharacterStore } from '@/stores';
import { Dashboard } from '@/pages/Dashboard';
import { SpellListPage } from '@/pages/SpellListPage';
import { CombatPage } from '@/pages/CombatPage';
import { InventoryPage } from '@/pages/InventoryPage';
import { PreparationPage } from '@/pages/PreparationPage';
import { Layout } from '@/components/layout/Layout';
import { spellsData } from '@/data/spellsData';
import { equipmentData } from '@/data/equipmentData';
import { componentMappingData } from '@/data/componentMappingData';
import { CHARACTER_IDENTITY, CHARACTER_ABILITIES } from '@/data/characterConfig';

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
  const [needsMigration, setNeedsMigration] = useState(false);
  
  const loadSpells = useSpellStore((state) => state.loadSpells);
  const loadItems = useInventoryStore((state) => state.loadItems);
  const loadComponentMapping = useInventoryStore((state) => state.loadComponentMapping);
  const character = useCharacterStore((state) => state.character);
  const setName = useCharacterStore((state) => state.setName);
  const setLevel = useCharacterStore((state) => state.setLevel);
  const setWisdom = useCharacterStore((state) => state.setWisdom);
  const setConstitution = useCharacterStore((state) => state.setConstitution);
  const setStrength = useCharacterStore((state) => state.setStrength);
  const setDexterity = useCharacterStore((state) => state.setDexterity);
  const setIntelligence = useCharacterStore((state) => state.setIntelligence);
  const setCharisma = useCharacterStore((state) => state.setCharisma);
  const longRest = useCharacterStore((state) => state.longRest);

  useEffect(() => {
    try {
      // Charge les données directement depuis les imports
      loadSpells(spellsData);
      loadItems(equipmentData);
      loadComponentMapping(componentMappingData);
      
      // Vérifie si le personnage doit être migré
      const isWrongName = character.name === 'Mon Nom' || character.name === '' || !character.name;
      const isWrongLevel = character.level !== CHARACTER_IDENTITY.level;
      
      if (isWrongName || isWrongLevel) {
        setNeedsMigration(true);
      }
      
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement');
      setIsLoading(false);
    }
  }, [loadSpells, loadItems, loadComponentMapping]);
  
  // Fonction pour migrer le personnage vers les bonnes données
  const migrateCharacter = () => {
    // Met à jour les caractéristiques
    setName(CHARACTER_IDENTITY.name);
    setLevel(CHARACTER_IDENTITY.level);
    setWisdom(CHARACTER_ABILITIES.wisdom);
    setConstitution(CHARACTER_ABILITIES.constitution);
    setStrength(CHARACTER_ABILITIES.strength);
    setDexterity(CHARACTER_ABILITIES.dexterity);
    setIntelligence(CHARACTER_ABILITIES.intelligence);
    setCharisma(CHARACTER_ABILITIES.charisma);
    
    // Réinitialise l'état journalier
    longRest();
    
    setNeedsMigration(false);
  };

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
  
  // Bannière de migration
  const MigrationBanner = () => {
    if (!needsMigration) return null;
    
    return (
      <div className="fixed top-0 left-0 right-0 z-50 bg-divine-gold/90 border-b-2 border-divine-gold-dark p-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <p className="font-display text-ink">
              🎭 Personnage détecté : <strong>{CHARACTER_IDENTITY.name}</strong>
            </p>
            <p className="text-sm text-ink-light">
              Niveau {CHARACTER_IDENTITY.level} • Clerc de Guerre de Torm
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setNeedsMigration(false)}
              className="px-3 py-1 text-sm text-ink-muted hover:text-ink"
            >
              Ignorer
            </button>
            <button
              onClick={migrateCharacter}
              className="btn-primary text-sm py-1 px-3"
            >
              Mettre à jour
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Router basename="/cleric-character-manager">
      <RedirectHandler />
      <MigrationBanner />
      <div className={needsMigration ? 'pt-20' : ''}>
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
      </div>
    </Router>
  );
}

export default App;
