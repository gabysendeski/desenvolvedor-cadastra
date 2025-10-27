import { useState, useEffect } from 'react';

export const useIsMobile = (breakpoint: number = 768): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth <= breakpoint;
      setIsMobile(mobile);
      
      if (mobile) {
        document.body.classList.add('is-mobile');
      } else {
        document.body.classList.remove('is-mobile');
      }
    };

    checkIsMobile();

    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkIsMobile, 100);
    };

    window.addEventListener('resize', debouncedResize);
    window.addEventListener('orientationchange', debouncedResize);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('orientationchange', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, [breakpoint]);

  return isMobile;
};