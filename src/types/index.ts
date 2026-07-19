export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Profile {
  id: string;
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface Page {
  id: string;
  user_id: string;
  title: string;
  slug: string;
  description: string | null;
  theme: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Block {
  id: string;
  page_id: string;
  type: string;
  content: Json;
  position: number;
  created_at: string;
  updated_at: string;
}

export interface Asset {
  id: string;
  user_id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  storage_path: string;
  public_url: string;
  created_at: string;
}

export interface PageView {
  id: string;
  page_id: string;
  viewed_at: string;
  referrer: string | null;
  user_agent: string | null;
  country: string | null;
}

export interface ClickEvent {
  id: string;
  page_id: string;
  block_id: string;
  clicked_at: string;
  referrer: string | null;
}

// Block content types
export interface HeaderBlockContent {
  text: string;
  level?: 1 | 2 | 3;
  align?: "left" | "center" | "right";
}

export interface ButtonBlockContent {
  text: string;
  url: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  icon?: string;
  openInNewTab?: boolean;
}

export interface TextBlockContent {
  text: string;
  align?: "left" | "center" | "right";
}

export interface ImageBlockContent {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  borderRadius?: string;
}

export interface GalleryBlockContent {
  images: Array<{ src: string; alt: string }>;
  layout?: "grid" | "carousel";
}

export interface VideoBlockContent {
  url: string;
  platform?: "youtube" | "vimeo" | "custom";
  autoplay?: boolean;
}

export interface DividerBlockContent {
  style?: "solid" | "dashed" | "dotted";
  color?: string;
  thickness?: number;
}

export interface SocialLinksBlockContent {
  links: Array<{ platform: string; url: string; label?: string }>;
  layout?: "row" | "column";
}

export type BlockContent =
  | HeaderBlockContent
  | ButtonBlockContent
  | TextBlockContent
  | ImageBlockContent
  | GalleryBlockContent
  | VideoBlockContent
  | DividerBlockContent
  | SocialLinksBlockContent;
