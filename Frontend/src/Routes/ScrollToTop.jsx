import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export default function ScrollToTopWrapper() {
  const location = useLocation();
  useEffect(() => {
    // Scroll to top on route changes
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    // Also try to reset scrollable containers if any
    const main = document.querySelector('main');
    if (main) main.scrollTop = 0;
  }, [location.pathname, location.hash, location.search]);

  return <Outlet />;
}
