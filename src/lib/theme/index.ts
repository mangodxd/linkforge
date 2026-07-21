export type ThemeVars = {
  "--bg-primary": string;
  "--bg-secondary": string;
  "--bg-card": string;
  "--text-primary": string;
  "--text-secondary": string;
  "--text-muted": string;
  "--accent": string;
  "--accent-hover": string;
  "--accent-text": string;
  "--border": string;
  "--font-heading": string;
  "--font-body": string;
  "--radius": string;
};

export type ThemeDefinition = {
  name: string;
  label: string;
  vars: ThemeVars;
};

export const themes: Record<string, ThemeDefinition> = {
  minimal: {
    name: "minimal",
    label: "Minimal",
    vars: {
      "--bg-primary": "#ffffff",
      "--bg-secondary": "#f9fafb",
      "--bg-card": "#ffffff",
      "--text-primary": "#111827",
      "--text-secondary": "#4b5563",
      "--text-muted": "#9ca3af",
      "--accent": "#111827",
      "--accent-hover": "#374151",
      "--accent-text": "#ffffff",
      "--border": "#e5e7eb",
      "--font-heading": "var(--font-geist-sans)",
      "--font-body": "var(--font-geist-sans)",
      "--radius": "8px",
    },
  },
  dark: {
    name: "dark",
    label: "Dark",
    vars: {
      "--bg-primary": "#0f0f0f",
      "--bg-secondary": "#1a1a1a",
      "--bg-card": "#1a1a1a",
      "--text-primary": "#f5f5f5",
      "--text-secondary": "#a3a3a3",
      "--text-muted": "#6b6b6b",
      "--accent": "#f5f5f5",
      "--accent-hover": "#e5e5e5",
      "--accent-text": "#0f0f0f",
      "--border": "#2a2a2a",
      "--font-heading": "var(--font-geist-sans)",
      "--font-body": "var(--font-geist-sans)",
      "--radius": "8px",
    },
  },
  light: {
    name: "light",
    label: "Light",
    vars: {
      "--bg-primary": "#f0f0f0",
      "--bg-secondary": "#ffffff",
      "--bg-card": "#ffffff",
      "--text-primary": "#1a1a1a",
      "--text-secondary": "#5c5c5c",
      "--text-muted": "#a8a8a8",
      "--accent": "#2563eb",
      "--accent-hover": "#1d4ed8",
      "--accent-text": "#ffffff",
      "--border": "#e0e0e0",
      "--font-heading": "var(--font-geist-sans)",
      "--font-body": "var(--font-geist-sans)",
      "--radius": "10px",
    },
  },
  nature: {
    name: "nature",
    label: "Nature",
    vars: {
      "--bg-primary": "#f5f0eb",
      "--bg-secondary": "#e8e0d6",
      "--bg-card": "#ffffff",
      "--text-primary": "#2d2a24",
      "--text-secondary": "#6b6258",
      "--text-muted": "#a89f94",
      "--accent": "#4a7c59",
      "--accent-hover": "#3d6b4b",
      "--accent-text": "#ffffff",
      "--border": "#ddd6cc",
      "--font-heading": "var(--font-geist-sans)",
      "--font-body": "var(--font-geist-sans)",
      "--radius": "6px",
    },
  },
  ocean: {
    name: "ocean",
    label: "Ocean",
    vars: {
      "--bg-primary": "#f0f7fb",
      "--bg-secondary": "#e0eff7",
      "--bg-card": "#ffffff",
      "--text-primary": "#0c2340",
      "--text-secondary": "#3a5a78",
      "--text-muted": "#7a9bb5",
      "--accent": "#0c7b9e",
      "--accent-hover": "#096a89",
      "--accent-text": "#ffffff",
      "--border": "#cde0ed",
      "--font-heading": "var(--font-geist-sans)",
      "--font-body": "var(--font-geist-sans)",
      "--radius": "12px",
    },
  },
  sunset: {
    name: "sunset",
    label: "Sunset",
    vars: {
      "--bg-primary": "#fdf2ed",
      "--bg-secondary": "#fae2d8",
      "--bg-card": "#ffffff",
      "--text-primary": "#2d1810",
      "--text-secondary": "#7a4535",
      "--text-muted": "#b58a7a",
      "--accent": "#d45a3a",
      "--accent-hover": "#c04d2e",
      "--accent-text": "#ffffff",
      "--border": "#edd5cb",
      "--font-heading": "var(--font-geist-sans)",
      "--font-body": "var(--font-geist-sans)",
      "--radius": "10px",
    },
  },
};
