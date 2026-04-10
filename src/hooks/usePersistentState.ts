import { useState, useEffect, useCallback } from 'react';

/**
 * Hook pour persister un état dans localStorage
 * 
 * @param key - Clé localStorage
 * @param defaultValue - Valeur par défaut
 * @returns [value, setValue] - Tuple identique à useState
 * 
 * @example
 * const [count, setCount] = usePersistentState('my-counter', 0);
 */
export function usePersistentState<T>(
  key: string,
  defaultValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  // État initial : lecture depuis localStorage ou valeur par défaut
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return defaultValue;
    }
    
    try {
      const stored = localStorage.getItem(key);
      if (stored === null) {
        return defaultValue;
      }
      return JSON.parse(stored) as T;
    } catch (error) {
      // Erreur de parsing ou localStorage indisponible
      console.warn(`[usePersistentState] Failed to load key "${key}":`, error);
      return defaultValue;
    }
  });

  // Persistance lors des changements
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Gestion spécifique des erreurs localStorage
      if (error instanceof Error) {
        if (error.name === 'QuotaExceededError' || 
            (error as Error).message?.includes('quota')) {
          console.warn(`[usePersistentState] localStorage quota exceeded for key "${key}". Consider clearing unused data.`);
        } else {
          console.warn(`[usePersistentState] Failed to save key "${key}":`, error.message);
        }
      } else {
        console.warn(`[usePersistentState] Failed to save key "${key}":`, error);
      }
    }
  }, [key, value]);

  // Wrapper pour setValue qui supporte les callbacks
  const setPersistentValue = useCallback((
    newValue: T | ((prev: T) => T)
  ) => {
    setValue(prev => {
      const resolvedValue = typeof newValue === 'function' 
        ? (newValue as (prev: T) => T)(prev)
        : newValue;
      return resolvedValue;
    });
  }, []);

  return [value, setPersistentValue];
}
