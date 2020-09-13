import { hostAddress } from './hostConfig';

export const ExternalGoogleAuth = (returnUrl: string): string => (
  `${hostAddress}/external/ExternalLogin?provider=Google&returnUrl=${returnUrl}`
);
