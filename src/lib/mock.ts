// Mock data and functions for development UI
export const MOCK_USER = {
  id: "user_123",
  email: "demo@example.com",
  name: "Demo User",
  avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo",
} as const;

export const MOCK_PAGES = [
  {
    id: "page_1",
    user_id: "user_123",
    title: "Personal Portfolio",
    slug: "demo-portfolio",
    description: "My personal projects and links",
    theme: "minimal",
    avatar: null,
    cover: null,
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "page_2",
    user_id: "user_123",
    title: "Demo Page",
    slug: "demo-page",
    description: "A demo page for LinkForge",
    theme: "dark",
    avatar: null,
    cover: null,
    published: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
] as const;

export function useMockApi() {
  // Mock API responses for development
  // In production, these will be replaced by real Supabase calls
  return {
    mockUser: MOCK_USER,
    mockPages: MOCK_PAGES,
  };
}
