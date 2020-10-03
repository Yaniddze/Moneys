import { useEffect } from 'react';
import debounce from 'lodash.debounce';

import { useScreenStorage } from './useScreenStorage';

export const useResizeEventHolder = (): void => {
  const { setWidth } = useScreenStorage();

  const handleResize = debounce(() => {
    setWidth(window.innerWidth);
  }, 100);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return (): void => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
};
