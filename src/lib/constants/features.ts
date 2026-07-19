export const FEATURE_FLAGS = {
  ANALYTICS: true,
  QR_CODE: true,
  DARK_MODE: true,
  CUSTOM_DOMAINS: false,
  IMPORT_LINKTREE: false,
} as const;

export type FeatureFlagKey = keyof typeof FEATURE_FLAGS;
