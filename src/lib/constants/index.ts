export const BLOCK_TYPES = {
  HEADER: "header",
  BUTTON: "button",
  TEXT: "text",
  IMAGE: "image",
  GALLERY: "gallery",
  VIDEO: "video",
  DIVIDER: "divider",
  SOCIAL_LINKS: "social_links",
} as const;

export type BlockType = (typeof BLOCK_TYPES)[keyof typeof BLOCK_TYPES];

export const BLOCK_TYPE_LABELS: Record<BlockType, string> = {
  header: "Header",
  button: "Button",
  text: "Text",
  image: "Image",
  gallery: "Gallery",
  video: "Video",
  divider: "Divider",
  social_links: "Social Links",
};

export const BLOCK_TYPE_ICONS: Record<BlockType, string> = {
  header: "Heading",
  button: "MousePointerClick",
  text: "FileText",
  image: "Image",
  gallery: "Images",
  video: "Video",
  divider: "Minus",
  social_links: "Share2",
};

export const THEMES = {
  MINIMAL: "minimal",
  DARK: "dark",
  LIGHT: "light",
  NATURE: "nature",
  OCEAN: "ocean",
  SUNSET: "sunset",
} as const;

export type Theme = (typeof THEMES)[keyof typeof THEMES];

export const THEME_LABELS: Record<Theme, string> = {
  minimal: "Minimal",
  dark: "Dark",
  light: "Light",
  nature: "Nature",
  ocean: "Ocean",
  sunset: "Sunset",
};

export const SOCIAL_PLATFORMS = {
  GITHUB: "github",
  TWITTER: "twitter",
  LINKEDIN: "linkedin",
  YOUTUBE: "youtube",
  INSTAGRAM: "instagram",
  TIKTOK: "tiktok",
  DISCORD: "discord",
  WEBSITE: "website",
  EMAIL: "email",
} as const;

export type SocialPlatform = (typeof SOCIAL_PLATFORMS)[keyof typeof SOCIAL_PLATFORMS];

export const SOCIAL_PLATFORM_LABELS: Record<SocialPlatform, string> = {
  github: "GitHub",
  twitter: "Twitter / X",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  instagram: "Instagram",
  tiktok: "TikTok",
  discord: "Discord",
  website: "Website",
  email: "Email",
};

export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  LOGIN: "/login",
  SIGNUP: "/signup",
  SETTINGS: "/dashboard/settings",
  NEW_PAGE: "/dashboard/pages/new",
  EDIT_PAGE: (id: string) => `/dashboard/pages/${id}/edit`,
  PREVIEW_PAGE: (id: string) => `/dashboard/pages/${id}/preview`,
  PUBLIC_PAGE: (slug: string) => `/${slug}`,
} as const;

export const LIMITS = {
  MAX_PAGES_PER_USER: 50,
  MAX_BLOCKS_PER_PAGE: 20,
  MAX_FILE_SIZE_MB: 10,
  MAX_SOCIAL_LINKS: 10,
  SLUG_MIN_LENGTH: 3,
  SLUG_MAX_LENGTH: 50,
  TITLE_MIN_LENGTH: 1,
  TITLE_MAX_LENGTH: 100,
  DESCRIPTION_MAX_LENGTH: 500,
} as const;
