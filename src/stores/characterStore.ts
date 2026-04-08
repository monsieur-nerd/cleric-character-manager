import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Character } from '@/types';
import type { CustomSkill } from '@/types/skills';
import type { CustomFeat } from '@/types/feats';
import { MAX_SPELL_SLOTS, DEITIES, CLERIC_DOMAINS } from '@/types';
import { STORAGE_KEYS } from './storageKeys';
import { 
  CHARACTER_IDENTITY, 
  CHARACTER_ABILITIES, 
  MASTERED_SKILLS, 
  CHARACTER_FEATS,
  INITIAL_DAILY_STATE 
} from '@/data/characterConfig';

interface CharacterState {
  character: Character;
  
  // Actions - Identité
  setName: (name: string) => void;
  setAvatar: (avatar: string | null) => void;
  setDeity: (deityId: string) => void;
  setDomain: (domainId: string) => void;
  syncDeity: () => void; // Synchronise la divinité avec les données à jour
  setRace: (race: string) => void;
  setAlignment: (alignment: string) => void;
  
  // Actions - Niveau et Caractéristiques
  setLevel: (level: number) => void;
  setWisdom: (wisdom: number) => void;
  setConstitution: (con: number) => void;
  setStrength: (str: number) => void;
  setDexterity: (dex: number) => void;
  setIntelligence: (int: number) => void;
  setCharisma: (cha: number) => void;
  
  // Capacité d'emport
  getCarryingCapacity: () => number;
  getEncumbranceLevel: (currentWeight: number) => 'light' | 'medium' | 'heavy' | 'over';
  
  // Points de vie
  takeDamage: (amount: number) => void;
  heal: (amount: number) => void;
  setMaxHp: (maxHp: number) => void;
  setTempHp: (tempHp: number) => void;
  
  // Capacités
  useWarCleric: () => boolean;
  restoreWarCleric: (amount?: number) => void;
  useChannelDivinity: () => boolean;
  restoreChannelDivinity: (amount?: number) => void;
  
  // Compétences et Talents
  toggleSkill: (skillId: string) => void;
  addFeat: (featId: string) => void;
  removeFeat: (featId: string) => void;
  getSkillBonus: (skillId: string) => number;
  getProficiencyBonus: () => number;
  
  // Jets de sauvegarde
  getSaveProficiencies: () => readonly ('strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma')[];
  getSaveBonus: (ability: 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma') => {
    total: number;
    modifier: number;
    proficiency: number;
    isProficient: boolean;
  };
  
  // Compétences personnalisées
  customSkills: CustomSkill[];
  addCustomSkill: (skill: Omit<CustomSkill, 'id'>) => void;
  removeCustomSkill: (skillId: string) => void;
  toggleCustomSkill: (skillId: string) => void;
  
  // Talents personnalisés
  customFeats: CustomFeat[];
  addCustomFeat: (feat: Omit<CustomFeat, 'id'>) => void;
  removeCustomFeat: (featId: string) => void;
  toggleCustomFeat: (featId: string) => void;
  
  // Repos
  longRest: () => void;
  shortRest: () => void;
  
  // Concentration
  setActiveConcentration: (spellId: string | null) => void;
  
  // Description et détails physiques
  setDescription: (description: string) => void;
  setAge: (age: number) => void;
  setHeight: (height: string) => void;
  setWeight: (weight: number) => void;
  setLanguages: (languages: string[]) => void;
  
  // Utils
  getModifier: (score: number | undefined) => number;
  getMaxPreparedSpells: () => number;
  calculateMaxHp: (level: number, con: number) => number;
}

const calculateModifier = (score: number | undefined): number => {
  if (score === undefined || isNaN(score)) return 0;
  return Math.floor((score - 10) / 2);
};

const calculateMaxHp = (level: number, con: number): number => {
  const conMod = calculateModifier(con);
  // Niveau 1: 8 + mod Con, Niveaux suivants: moyenne (5) + mod Con
  const level1Hp = 8 + conMod;
  const otherLevelsHp = (level - 1) * (5 + conMod);
  return Math.max(1, level1Hp + otherLevelsHp);
};

// Calcul de la capacité d'emport (D&D 5e)
// Force × 7.5 kg = charge légère (pas de pénalité)
// Force × 15 kg = charge intermédiaire (vitesse réduite)
// Force × 22.5 kg = charge lourde (désavantage)
const calculateCarryingCapacity = (strength: number): number => {
  return strength * 7.5; // Capacité sans pénalité en kg
};

const createDefaultCharacter = (): Character => {
  const level = CHARACTER_IDENTITY.level;
  const con = CHARACTER_ABILITIES.constitution;
  const str = CHARACTER_ABILITIES.strength;
  const dex = CHARACTER_ABILITIES.dexterity;
  const int = CHARACTER_ABILITIES.intelligence;
  const cha = CHARACTER_ABILITIES.charisma;
  const wis = CHARACTER_ABILITIES.wisdom;
  const maxHp = calculateMaxHp(level, con);
  const carryingCapacity = calculateCarryingCapacity(str);
  const defaultDeity = DEITIES.find(d => d.id === CHARACTER_IDENTITY.deity) || DEITIES[0];
  const defaultDomain = CLERIC_DOMAINS.find(d => d.id === CHARACTER_IDENTITY.domain) || CLERIC_DOMAINS[0];
  const wisdomModifier = calculateModifier(wis);
  
  return {
    name: CHARACTER_IDENTITY.name,
    class: CHARACTER_IDENTITY.class,
    subclass: CHARACTER_IDENTITY.subclass,
    avatar: CHARACTER_IDENTITY.avatar,
    deity: defaultDeity,
    domain: defaultDomain,
    level,
    wisdom: wis,
    wisdomModifier,
    constitution: con,
    strength: str,
    dexterity: dex,
    intelligence: int,
    charisma: cha,
    maxHp,
    currentHp: maxHp,
    maxPreparedSpells: wisdomModifier + level,
    domainSpellCount: defaultDomain.spellIds.length,
    carryingCapacity,
    abilities: {
      warCleric: {
        maxUses: Math.max(1, wisdomModifier),
        currentUses: Math.max(1, wisdomModifier),
      },
      channelDivinity: {
        maxUses: level >= 18 ? 3 : level >= 6 ? 2 : 1,
        currentUses: level >= 18 ? 3 : level >= 6 ? 2 : 1,
        shortRestRecovery: true,
      },
    },
    masteredSkills: MASTERED_SKILLS,
    customMasteredSkills: [],
    feats: CHARACTER_FEATS,
    customOwnedFeats: [],
    description: CHARACTER_IDENTITY.description,
    race: CHARACTER_IDENTITY.race,
    alignment: CHARACTER_IDENTITY.alignment,
    age: CHARACTER_IDENTITY.age,
    height: CHARACTER_IDENTITY.height,
    weight: CHARACTER_IDENTITY.weight,
    currentState: {
      date: new Date().toISOString().split('T')[0],
      preparedSpellIds: INITIAL_DAILY_STATE.preparedSpellIds,
      usedSpellSlots: { 1: 0, 2: 0, 3: 0 },
      usedAbilities: { warCleric: 0, channelDivinity: 0 },
      activeConcentration: null,
      tempHp: 0,
    },
  };
};

export const useCharacterStore = create<CharacterState>()(
  persist(
    (set, get) => ({
      character: createDefaultCharacter(),
      
      setName: (name) => {
        set((state) => ({
          character: { ...state.character, name },
        }));
      },
      
      setAvatar: (avatar) => {
        set((state) => ({
          character: { ...state.character, avatar },
        }));
      },
      
      setDeity: (deityId) => {
        const deity = DEITIES.find(d => d.id === deityId);
        if (!deity) return;
        
        set((state) => ({
          character: {
            ...state.character,
            deity,
            // Si le nom est le nom du dieu précédent, on le met à jour
            name: state.character.name === state.character.deity?.name ? deity.name : state.character.name,
          },
        }));
      },
      
      syncDeity: () => {
        set((state) => {
          const currentDeityId = state.character.deity?.id;
          if (!currentDeityId) return state;
          
          const updatedDeity = DEITIES.find(d => d.id === currentDeityId);
          if (!updatedDeity) return state;
          
          return {
            character: {
              ...state.character,
              deity: updatedDeity,
            },
          };
        });
      },
      
      setDomain: (domainId) => {
        const domain = CLERIC_DOMAINS.find(d => d.id === domainId);
        if (!domain) return;
        
        set((state) => ({
          character: {
            ...state.character,
            domain,
            domainSpellCount: domain.spellIds.length,
          },
        }));
      },
      
      setDescription: (description) => {
        set((state) => ({
          character: { ...state.character, description },
        }));
      },
      
      setAge: (age) => {
        set((state) => ({
          character: { ...state.character, age },
        }));
      },
      
      setHeight: (height) => {
        set((state) => ({
          character: { ...state.character, height },
        }));
      },
      
      setWeight: (weight) => {
        set((state) => ({
          character: { ...state.character, weight },
        }));
      },
      
      setLanguages: (languages) => {
        set((state) => ({
          character: { ...state.character, languages },
        }));
      },
      
      setRace: (race) => {
        set((state) => ({
          character: { ...state.character, race },
        }));
      },
      
      setAlignment: (alignment) => {
        set((state) => ({
          character: { ...state.character, alignment },
        }));
      },
      
      setLevel: (level) => {
        const { wisdomModifier } = get().character;
        
        // Calcule le max de Conduit divin selon le niveau
        const channelDivinityMax = level >= 18 ? 3 : level >= 6 ? 2 : 1;
        
        set((state) => ({
          character: {
            ...state.character,
            level,
            maxPreparedSpells: wisdomModifier + level,
            abilities: {
              ...state.character.abilities,
              channelDivinity: {
                ...state.character.abilities.channelDivinity,
                maxUses: channelDivinityMax,
                currentUses: Math.min(
                  channelDivinityMax,
                  state.character.abilities.channelDivinity.currentUses
                ),
              },
            },
            currentState: {
              ...state.character.currentState,
              usedSpellSlots: MAX_SPELL_SLOTS[level] || MAX_SPELL_SLOTS[5],
            },
          },
        }));
      },
      
      setWisdom: (wisdom) => {
        const modifier = calculateModifier(wisdom);
        const { level } = get().character;
        const maxWarCleric = Math.max(1, modifier);
        
        set((state) => ({
          character: {
            ...state.character,
            wisdom,
            wisdomModifier: modifier,
            maxPreparedSpells: modifier + level,
            abilities: {
              ...state.character.abilities,
              warCleric: {
                ...state.character.abilities.warCleric,
                maxUses: maxWarCleric,
                currentUses: Math.min(
                  maxWarCleric,
                  state.character.abilities.warCleric.currentUses
                ),
              },
            },
          },
        }));
      },
      
      setConstitution: (con) => {
        const { level } = get().character;
        const newMaxHp = calculateMaxHp(level, con);
        
        set((state) => ({
          character: {
            ...state.character,
            constitution: con,
            maxHp: newMaxHp,
            currentHp: Math.min(state.character.currentHp, newMaxHp),
          },
        }));
      },
      
      setStrength: (str) => {
        const newCapacity = calculateCarryingCapacity(str);
        
        set((state) => ({
          character: {
            ...state.character,
            strength: str,
            carryingCapacity: newCapacity,
          },
        }));
      },
      
      setDexterity: (dex) => {
        set((state) => ({
          character: {
            ...state.character,
            dexterity: dex,
          },
        }));
      },
      
      setIntelligence: (int) => {
        set((state) => ({
          character: {
            ...state.character,
            intelligence: int,
          },
        }));
      },
      
      setCharisma: (cha) => {
        set((state) => ({
          character: {
            ...state.character,
            charisma: cha,
          },
        }));
      },
      
      getCarryingCapacity: () => {
        const { strength } = get().character;
        return calculateCarryingCapacity(strength);
      },
      
      getEncumbranceLevel: (currentWeight: number) => {
        const { strength } = get().character;
        const lightLimit = strength * 7.5;
        const mediumLimit = strength * 15;
        const heavyLimit = strength * 22.5;
        
        if (currentWeight <= lightLimit) return 'light';
        if (currentWeight <= mediumLimit) return 'medium';
        if (currentWeight <= heavyLimit) return 'heavy';
        return 'over';
      },
      
      takeDamage: (amount) => {
        set((state) => {
          const tempHp = state.character.currentState.tempHp || 0;
          let remainingDamage = amount;
          
          // Les dégâts retirent d'abord les PV temporaires
          const newTempHp = Math.max(0, tempHp - remainingDamage);
          remainingDamage = Math.max(0, remainingDamage - tempHp);
          
          // Puis les PV normaux
          const newCurrentHp = Math.max(0, state.character.currentHp - remainingDamage);
          
          // Concentration perdue si dégâts subis
          const newConcentration = remainingDamage > 0 ? null : state.character.currentState.activeConcentration;
          
          return {
            character: {
              ...state.character,
              currentHp: newCurrentHp,
              currentState: {
                ...state.character.currentState,
                tempHp: newTempHp,
                activeConcentration: newConcentration,
              },
            },
          };
        });
      },
      
      heal: (amount) => {
        set((state) => ({
          character: {
            ...state.character,
            currentHp: Math.min(state.character.maxHp, state.character.currentHp + amount),
          },
        }));
      },
      
      setMaxHp: (maxHp) => {
        set((state) => ({
          character: {
            ...state.character,
            maxHp,
            currentHp: Math.min(state.character.currentHp, maxHp),
          },
        }));
      },
      
      setTempHp: (tempHp) => {
        set((state) => ({
          character: {
            ...state.character,
            currentState: {
              ...state.character.currentState,
              tempHp,
            },
          },
        }));
      },
      
      calculateMaxHp,
      
      useWarCleric: () => {
        const { abilities } = get().character;
        if (abilities.warCleric.currentUses <= 0) return false;
        
        set((state) => ({
          character: {
            ...state.character,
            abilities: {
              ...state.character.abilities,
              warCleric: {
                ...state.character.abilities.warCleric,
                currentUses: state.character.abilities.warCleric.currentUses - 1,
              },
            },
            currentState: {
              ...state.character.currentState,
              usedAbilities: {
                ...state.character.currentState.usedAbilities,
                warCleric: state.character.currentState.usedAbilities.warCleric + 1,
              },
            },
          },
        }));
        return true;
      },
      
      restoreWarCleric: (_amount = 1) => {
        set((state) => ({
          character: {
            ...state.character,
            abilities: {
              ...state.character.abilities,
              warCleric: {
                ...state.character.abilities.warCleric,
                currentUses: Math.min(
                  state.character.abilities.warCleric.maxUses,
                  state.character.abilities.warCleric.currentUses + _amount
                ),
              },
            },
          },
        }));
      },
      
      useChannelDivinity: () => {
        const { abilities } = get().character;
        if (abilities.channelDivinity.currentUses <= 0) return false;
        
        set((state) => ({
          character: {
            ...state.character,
            abilities: {
              ...state.character.abilities,
              channelDivinity: {
                ...state.character.abilities.channelDivinity,
                currentUses: state.character.abilities.channelDivinity.currentUses - 1,
              },
            },
            currentState: {
              ...state.character.currentState,
              usedAbilities: {
                ...state.character.currentState.usedAbilities,
                channelDivinity: state.character.currentState.usedAbilities.channelDivinity + 1,
              },
            },
          },
        }));
        return true;
      },
      
      restoreChannelDivinity: (_amount = 1) => {
        set((state) => ({
          character: {
            ...state.character,
            abilities: {
              ...state.character.abilities,
              channelDivinity: {
                ...state.character.abilities.channelDivinity,
                currentUses: Math.min(
                  state.character.abilities.channelDivinity.maxUses,
                  state.character.abilities.channelDivinity.currentUses + _amount
                ),
              },
            },
          },
        }));
      },
      
      longRest: () => {
        set((state) => ({
          character: {
            ...state.character,
            currentHp: state.character.maxHp,
            abilities: {
              warCleric: {
                ...state.character.abilities.warCleric,
                currentUses: state.character.abilities.warCleric.maxUses,
              },
              channelDivinity: {
                ...state.character.abilities.channelDivinity,
                currentUses: state.character.abilities.channelDivinity.maxUses,
              },
            },
            currentState: {
              date: new Date().toISOString().split('T')[0],
              preparedSpellIds: [],
              usedSpellSlots: { 1: 0, 2: 0, 3: 0 },
              usedAbilities: { warCleric: 0, channelDivinity: 0 },
              activeConcentration: null,
              tempHp: 0,
            },
          },
        }));
      },
      
      shortRest: () => {
        set((state) => ({
          character: {
            ...state.character,
            abilities: {
              ...state.character.abilities,
              // Conduit divin se recharge complètement au repos court
              channelDivinity: {
                ...state.character.abilities.channelDivinity,
                currentUses: state.character.abilities.channelDivinity.maxUses,
              },
            },
            currentState: {
              ...state.character.currentState,
              usedAbilities: {
                ...state.character.currentState.usedAbilities,
                channelDivinity: 0,
              },
            },
          },
        }));
      },
      
      setActiveConcentration: (spellId) => {
        set((state) => ({
          character: {
            ...state.character,
            currentState: {
              ...state.character.currentState,
              activeConcentration: spellId,
            },
          },
        }));
      },
      
      // Compétences et Talents
      toggleSkill: (skillId) => {
        set((state) => {
          const currentSkills = state.character.masteredSkills || [];
          const isMastered = currentSkills.includes(skillId);
          return {
            character: {
              ...state.character,
              masteredSkills: isMastered
                ? currentSkills.filter(id => id !== skillId)
                : [...currentSkills, skillId],
            },
          };
        });
      },
      
      addFeat: (featId) => {
        set((state) => {
          const currentFeats = state.character.feats || [];
          if (currentFeats.includes(featId)) return state;
          return {
            character: {
              ...state.character,
              feats: [...currentFeats, featId],
            },
          };
        });
      },
      
      removeFeat: (featId) => {
        set((state) => ({
          character: {
            ...state.character,
            feats: (state.character.feats || []).filter(id => id !== featId),
          },
        }));
      },
      
      // Compétences personnalisées
      customSkills: [],
      addCustomSkill: (skill) => {
        set((state) => {
          const newSkill: CustomSkill = {
            ...skill,
            id: `custom-skill-${Date.now()}`,
          };
          return {
            customSkills: [...state.customSkills, newSkill],
          };
        });
      },
      removeCustomSkill: (skillId) => {
        set((state) => ({
          customSkills: state.customSkills.filter(s => s.id !== skillId),
          character: {
            ...state.character,
            customMasteredSkills: (state.character.customMasteredSkills || [])
              .filter(id => id !== skillId),
          },
        }));
      },
      toggleCustomSkill: (skillId) => {
        set((state) => {
          const currentSkills = state.character.customMasteredSkills || [];
          const isMastered = currentSkills.includes(skillId);
          return {
            character: {
              ...state.character,
              customMasteredSkills: isMastered
                ? currentSkills.filter(id => id !== skillId)
                : [...currentSkills, skillId],
            },
          };
        });
      },
      
      // Talents personnalisés
      customFeats: [],
      addCustomFeat: (feat) => {
        set((state) => {
          const newFeat: CustomFeat = {
            ...feat,
            id: `custom-feat-${Date.now()}`,
          };
          return {
            customFeats: [...state.customFeats, newFeat],
          };
        });
      },
      removeCustomFeat: (featId) => {
        set((state) => ({
          customFeats: state.customFeats.filter(f => f.id !== featId),
          character: {
            ...state.character,
            customOwnedFeats: (state.character.customOwnedFeats || [])
              .filter(id => id !== featId),
          },
        }));
      },
      toggleCustomFeat: (featId) => {
        set((state) => {
          const currentFeats = state.character.customOwnedFeats || [];
          const isOwned = currentFeats.includes(featId);
          return {
            character: {
              ...state.character,
              customOwnedFeats: isOwned
                ? currentFeats.filter(id => id !== featId)
                : [...currentFeats, featId],
            },
          };
        });
      },
      
      getSkillBonus: (skillId) => {
        const state = get();
        const { character } = state;
        const skill = character.masteredSkills?.includes(skillId);
        const profBonus = state.getProficiencyBonus();
        
        // Get ability score for the skill (simplified - would need skill data)
        // For now return basic calculation
        return skill ? profBonus : 0;
      },
      
      getProficiencyBonus: () => {
        const { level } = get().character;
        if (level === undefined || isNaN(level)) return 2;
        return Math.floor((level - 1) / 4) + 2;
      },
      
      // Retourne les maîtrises de jets de sauvegarde du clerc
      getSaveProficiencies: () => {
        // Le clerc maîtrise les JS de Sagesse et Charisme
        return ['wisdom', 'charisma'] as const;
      },
      
      // Calcule le bonus d'un jet de sauvegarde pour une caractéristique
      getSaveBonus: (ability: 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma') => {
        const state = get();
        const character = state.character;
        const profBonus = state.getProficiencyBonus();
        const modifier = calculateModifier(character[ability]);
        
        // Vérifie si c'est une maîtrise de classe
        const saveProficiencies = state.getSaveProficiencies();
        const isProficient = saveProficiencies.includes(ability);
        
        return {
          total: modifier + (isProficient ? profBonus : 0),
          modifier,
          proficiency: isProficient ? profBonus : 0,
          isProficient,
        };
      },
      
      getModifier: calculateModifier,
      
      getMaxPreparedSpells: () => {
        const { wisdomModifier, level } = get().character;
        return wisdomModifier + level;
      },
    }),
    {
      name: STORAGE_KEYS.CHARACTER,
      version: 2, // Incrémenté pour mettre à jour les compétences maîtrisées
      migrate: (persistedState: unknown, version) => {
        if (version < 2) {
          // Met à jour les compétences maîtrisées avec les nouvelles valeurs
          const state = persistedState as { character?: { masteredSkills?: string[] } };
          if (state.character) {
            state.character.masteredSkills = MASTERED_SKILLS;
          }
        }
        return persistedState as CharacterState;
      },
    }
  )
);
