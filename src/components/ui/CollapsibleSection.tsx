import { useState, useCallback } from 'react';
import { ChevronDown, ChevronUp, LucideIcon } from 'lucide-react';
import { usePersistentState } from '@/hooks/usePersistentState';

interface CollapsibleSectionProps {
  /** Titre de la section */
  title: string;
  /** Icône optionnelle (composant Lucide) */
  icon?: LucideIcon;
  /** État initial (si pas de persistance) */
  defaultExpanded?: boolean;
  /** Clé de persistance localStorage (optionnel) */
  persistKey?: string;
  /** Contenu de la section */
  children: React.ReactNode;
  /** Classes CSS additionnelles */
  className?: string;
  /** Badge/Compteur optionnel affiché à côté du titre */
  badge?: string | number;
}

/**
 * Composant de section repliable avec support de persistance
 * 
 * @example
 * <CollapsibleSection 
 *   title="Compétences"
 *   icon={Check}
 *   persistKey="dashboard-skills"
 *   badge={skills.length}
 * >
 *   <SkillsList />
 * </CollapsibleSection>
 */
export function CollapsibleSection({
  title,
  icon: Icon,
  defaultExpanded = false,
  persistKey,
  children,
  className = '',
  badge,
}: CollapsibleSectionProps) {
  // Toujours appeler les hooks (règles React), conditionner l'utilisation
  const persistentState = usePersistentState<boolean>(
    persistKey || '__no_persist__',
    defaultExpanded
  );
  const [localState, setLocalState] = useState<boolean>(defaultExpanded);
  
  // Utilise la persistence seulement si persistKey est fourni
  const [isExpanded, setIsExpanded] = persistKey ? persistentState : [localState, setLocalState];

  const toggleExpanded = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, [setIsExpanded]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleExpanded();
    }
  }, [toggleExpanded]);

  const badgeText = badge !== undefined ? ` (${badge})` : '';

  return (
    <div className={`mb-4 ${className}`}>
      <button
        onClick={toggleExpanded}
        onKeyDown={handleKeyDown}
        className="w-full flex items-center justify-between text-sm font-medium text-ink-light mb-3 hover:text-ink transition-colors focus:outline-none focus:ring-2 focus:ring-divine-gold/50 rounded"
        aria-expanded={isExpanded}
        aria-controls={`collapsible-content-${persistKey || title.replace(/\s+/g, '-').toLowerCase()}`}
        type="button"
      >
        <span className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4" />}
          <span>
            {title}
            {badgeText && (
              <span className="text-ink-muted">{badgeText}</span>
            )}
          </span>
        </span>
        <span className="transition-transform duration-200">
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" aria-hidden="true" />
          ) : (
            <ChevronDown className="w-4 h-4" aria-hidden="true" />
          )}
        </span>
      </button>

      {isExpanded && (
        <div
          id={`collapsible-content-${persistKey || title.replace(/\s+/g, '-').toLowerCase()}`}
          className="animate-fade-in"
        >
          {children}
        </div>
      )}
    </div>
  );
}
