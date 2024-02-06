import { useEffect, useState } from 'react';

export const useIsMobile = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  const isMobile = width < 1024;

  return { isMobile };
};
