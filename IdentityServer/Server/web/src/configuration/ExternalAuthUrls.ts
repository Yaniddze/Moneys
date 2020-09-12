export const ExternalGoogleAuth = (returnUrl: string): string => (
  `https://localhost:5001/external/ExternalLogin?provider=Google&returnUrl=${returnUrl}`
);
