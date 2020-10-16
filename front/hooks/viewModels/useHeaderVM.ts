// Core
// import { useReactOidc } from '@axa-fr/react-oidc-context/dist';

// Hooks
import { useThemeStorage } from '../storage/useThemeStorage';

type ReturnType = {
  username: string;
  light: boolean;
  reverseLight: () => void;
}

export const useHeaderVM = (): ReturnType => {
  // const { oidcUser } = useReactOidc();
  const { light, reverseLight } = useThemeStorage();
  // const username = oidcUser.profile.preferred_username || 'unfounded';

  return {
    username: '123',
    light,
    reverseLight,
  };
};
