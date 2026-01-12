import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * A component that scrolls the window to the top on every route change.
 * This ensures that users always start at the top of a new page.
 */
const ScrollToTop = () => {
  // Get the current location's pathname from react-router
  const { pathname } = useLocation();

  // Use the useEffect hook to trigger the scroll whenever the pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // This component does not render anything to the DOM
  return null;
};

export default ScrollToTop;
