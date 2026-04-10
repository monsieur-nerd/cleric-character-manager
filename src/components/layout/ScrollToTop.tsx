import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Composant qui scroll automatiquement vers le haut de la page
 * à chaque changement de route (navigation).
 * 
 * À placer dans le Router, juste avant les Routes.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll vers le haut de la page avec un comportement fluide
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    
    // Scroll également le conteneur principal si nécessaire
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [pathname]);

  return null;
}
