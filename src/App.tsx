import { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSpellStore, useInventoryStore, useCharacterStore } from '@/stores';
import type { EquipmentItem } from '@/types';
import { Dashboard } from '@/pages/Dashboard';
import { SpellListPage } from '@/pages/SpellListPage';
import { CombatPage } from '@/pages/CombatPage';
import { InventoryPage } from '@/pages/InventoryPage';
import { PreparationPage } from '@/pages/PreparationPage';
import { Layout } from '@/components/layout/Layout';
import { spellsData } from '@/data/spellsData';
import { equipmentData } from '@/data/equipmentData';
import { componentMappingData } from '@/data/componentMappingData';
import { CHARACTER_IDENTITY, CHARACTER_ABILITIES, STARTING_EQUIPMENT } from '@/data/characterConfig';
import { CLERIC_DOMAINS } from '@/types';
import '@/utils/debugStorage'; // Import pour exposer debug tools dans la console

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
  const setAge = useCharacterStore((state) => state.setAge);
  const setHeight = useCharacterStore((state) => state.setHeight);
  const setWeight = useCharacterStore((state) => state.setWeight);
  const setDescription = useCharacterStore((state) => state.setDescription);
  const setLanguages = useCharacterStore((state) => state.setLanguages);
  const setAvatar = useCharacterStore((state) => state.setAvatar);
  const longRest = useCharacterStore((state) => state.longRest);
  const setCurrentDomain = useSpellStore((state) => state.setCurrentDomain);
  const setCharacterLevel = useSpellStore((state) => state.setCharacterLevel);
  const preparedSpellIds = useSpellStore((state) => state.preparedSpellIds);
  const allSpells = useSpellStore((state) => state.allSpells);
  const prepareMultipleSpells = useSpellStore((state) => state.prepareMultipleSpells);

  useEffect(() => {
    try {
      // Charge tous les sorts (les sorts de domaine sont déjà marqués isDomainSpell dans spellsData)
      loadSpells(spellsData);
      // Fusionne les équipements de base avec l'équipement de départ du personnage
      const allEquipment = [
        ...equipmentData,
        ...STARTING_EQUIPMENT.map(item => ({
          ...item,
          totalPrice: Number(item.totalPrice),
          totalWeight: item.totalWeight || 0,
        })) as EquipmentItem[],
      ];
      loadItems(allEquipment);
      loadComponentMapping(componentMappingData);
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement');
      setIsLoading(false);
    }
  }, [loadSpells, loadItems, loadComponentMapping]);
  
  // Synchronise le domaine et le niveau du personnage avec le spellStore au démarrage
  useEffect(() => {
    if (character?.domain?.id) {
      setCurrentDomain(character.domain.id);
    }
    if (character?.level) {
      setCharacterLevel(character.level);
    }
  }, [character?.domain?.id, character?.level, setCurrentDomain, setCharacterLevel]);
  
  // Synchronise les sorts préparés une seule fois après le chargement initial
  // Cela nettoie les IDs obsolètes sans créer de boucle infinie
  const hasSyncedSpells = useRef(false);
  useEffect(() => {
    if (!isLoading && allSpells.length > 0 && character?.domain?.id && !hasSyncedSpells.current) {
      hasSyncedSpells.current = true;
      
      const currentDomain = CLERIC_DOMAINS.find(d => d.id === character.domain?.id);
      const currentDomainSpellIds = currentDomain?.spellIds || [];
      const maxSpellLevel = Math.min(5, Math.floor((character.level + 1) / 2));
      
      // Filtre les sorts préparés :
      // 1. Supprime les IDs de sorts qui n'existent pas (obsolètes)
      // 2. Supprime les sorts de domaine d'autres domaines
      // 3. Supprime les sorts au-delà du niveau accessible
      const validSpellIds = preparedSpellIds.filter(id => {
        const spell = allSpells.find(s => s.id === id);
        if (!spell) return false; // Sort inexistant (ID obsolète)
        if (spell.isDomainSpell && !currentDomainSpellIds.includes(id)) return false; // Domaine différent
        if (spell.level > maxSpellLevel) return false; // Niveau trop élevé
        return true;
      });
      
      // Si des changements sont nécessaires, met à jour
      if (validSpellIds.length !== preparedSpellIds.length) {
        prepareMultipleSpells(validSpellIds, character.maxPreparedSpells);
      }
    }
  }, [isLoading, allSpells, character?.domain?.id, character?.level, character?.maxPreparedSpells, preparedSpellIds, prepareMultipleSpells]);
  
  // Vérifie la migration une fois le chargement terminé
  useEffect(() => {
    if (!isLoading && character) {
      // Détection plus permissive : contient "mon" et "nom" (insensible à la casse)
      const nameLower = character.name?.toLowerCase() || '';
      const isWrongName = 
        nameLower.includes('mon') && nameLower.includes('nom') ||
        nameLower === '' || 
        !character.name ||
        nameLower === 'test' ||
        nameLower === 'personnage';
        
      const isWrongLevel = character.level !== CHARACTER_IDENTITY.level;
      const isWrongWisdom = character.wisdom !== CHARACTER_ABILITIES.wisdom;
      const isWrongAge = character.age !== CHARACTER_IDENTITY.age;
      const isWrongWeight = character.weight !== CHARACTER_IDENTITY.weight;
      const isWrongAvatar = character.avatar !== CHARACTER_IDENTITY.avatar;
      
      console.log('Migration check:', { 
        name: character.name, 
        isWrongName, 
        isWrongLevel, 
        isWrongWisdom,
        expectedName: CHARACTER_IDENTITY.name 
      });
      
      if (isWrongName || isWrongLevel || isWrongWisdom || isWrongAge || isWrongWeight || isWrongAvatar) {
        setNeedsMigration(true);
      }
    }
  }, [isLoading, character]);
  
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
    
    // Met à jour les infos physiques
    setAge(CHARACTER_IDENTITY.age);
    setHeight(CHARACTER_IDENTITY.height);
    setWeight(CHARACTER_IDENTITY.weight);
    setDescription(CHARACTER_IDENTITY.description);
    setLanguages(CHARACTER_IDENTITY.languages);
    setAvatar(CHARACTER_IDENTITY.avatar);
    
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
  
  // Fonction pour réinitialiser complètement les données
  const hardReset = () => {
    if (confirm('⚠️ Réinitialiser complètement le personnage ?\n\nToutes les données seront effacées et remplacées par Imildar Souffle-Tempête.')) {
      localStorage.removeItem('cleric-character-data');
      localStorage.removeItem('cleric-inventory-data');
      localStorage.removeItem('cleric-spells-data');
      window.location.reload();
    }
  };

  // Bannière de migration
  const MigrationBanner = () => {
    if (!needsMigration) return null;
    
    return (
      <div className="fixed top-0 left-0 right-0 z-[100] bg-divine-gold border-b-4 border-divine-gold-dark shadow-lg p-4 animate-fade-in">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <p className="font-display text-ink text-lg">
                🎭 Personnage configuré : <strong>{CHARACTER_IDENTITY.name}</strong>
              </p>
              <p className="text-sm text-ink-light">
                Niveau {CHARACTER_IDENTITY.level} • Clerc de Guerre de Torm • Actuellement : <strong>{character.name || 'Inconnu'}</strong>
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setNeedsMigration(false)}
                className="px-3 py-2 text-sm text-ink-muted hover:text-ink bg-parchment/50 rounded"
              >
                Ignorer
              </button>
              <button
                onClick={migrateCharacter}
                className="btn-primary text-sm py-2 px-4 shadow-md"
              >
                ✨ Mettre à jour
              </button>
              <button
                onClick={hardReset}
                className="px-3 py-2 text-sm text-blood-red hover:bg-blood-red/10 rounded"
                title="Réinitialiser tout"
              >
                🗑️
              </button>
            </div>
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
