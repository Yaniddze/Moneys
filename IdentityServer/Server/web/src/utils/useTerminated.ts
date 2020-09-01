import { useEffect } from 'react';

export const useTerminated = (): boolean => {
  let terminated = false;

  useEffect(() => (): void => {
    terminated = false;
  });

  return terminated;
};
