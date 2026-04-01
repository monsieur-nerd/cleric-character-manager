import { Home, Sparkles, Swords, Backpack } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const tabs = [
  { id: 'dashboard', path: '/', label: 'Accueil', icon: Home },
  { id: 'spells', path: '/spells', label: 'Sorts', icon: Sparkles },
  { id: 'combat', path: '/combat', label: 'Combat', icon: Swords },
  { id: 'inventory', path: '/inventory', label: 'Inventaire', icon: Backpack },
];

export function TabBar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-parchment-dark border-t border-divine-gold/30 z-50">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-around items-center h-16">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentPath === tab.path || 
              (tab.path !== '/' && currentPath.startsWith(tab.path));
            
            // Si déjà sur cette page, afficher un div non cliquable
            if (isActive) {
              return (
                <div
                  key={tab.id}
                  className="nav-tab active cursor-default"
                >
                  <Icon className="w-6 h-6 text-divine-gold" />
                  <span className="text-xs mt-1 text-divine-gold-dark font-bold">
                    {tab.label}
                  </span>
                </div>
              );
            }
            
            return (
              <Link
                key={tab.id}
                to={tab.path}
                className="nav-tab"
              >
                <Icon className="w-6 h-6 text-ink-muted" />
                <span className="text-xs mt-1 text-ink-muted">
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
