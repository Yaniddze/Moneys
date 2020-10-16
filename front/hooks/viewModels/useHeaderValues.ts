// Hooks
import { useThemeStorage } from '../storage/useThemeStorage';
import { useUserStorage } from '../storage/useUserStorage';

type ReturnType = {
  username: string;
  light: boolean;
  reverseLight: () => void;
}

export const useHeaderValues = (): ReturnType => {
  const { user } = useUserStorage();
  const { light, reverseLight } = useThemeStorage();
  const username = user?.profile.preferred_username || 'not found';

  return {
    username,
    light,
    reverseLight,
  };
};
