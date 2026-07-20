export const features = {
  analytics: true,
  socialLogin: false,
  darkMode: true,
  imageUpload: true,
  qrCode: true,
  ogImage: false,
  galleryBlock: true,
  videoBlock: true,
  docker: true,
} as const;

export type FeatureFlag = keyof typeof features;

export function isFeatureEnabled(flag: FeatureFlag): boolean {
  return features[flag];
}
