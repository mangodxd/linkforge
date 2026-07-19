-- LinkForge initial schema
-- Profiles, pages, blocks, assets, page_views, click_events

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_profiles_user_id ON profiles(user_id);

-- Pages table
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  theme TEXT NOT NULL DEFAULT 'minimal',
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(slug)
);

CREATE INDEX idx_pages_user_id ON pages(user_id);
CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_pages_published ON pages(published) WHERE published = true;

-- Blocks table
CREATE TABLE blocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_blocks_page_id ON blocks(page_id);
CREATE INDEX idx_blocks_position ON blocks(page_id, position);

-- Assets table
CREATE TABLE assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  storage_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_assets_user_id ON assets(user_id);

-- Page views table (analytics)
CREATE TABLE page_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  viewed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  referrer TEXT,
  user_agent TEXT,
  country TEXT
);

CREATE INDEX idx_page_views_page_id ON page_views(page_id);
CREATE INDEX idx_page_views_viewed_at ON page_views(page_id, viewed_at);

-- Click events table (analytics)
CREATE TABLE click_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  block_id UUID REFERENCES blocks(id) ON DELETE SET NULL,
  clicked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  referrer TEXT
);

CREATE INDEX idx_click_events_page_id ON click_events(page_id);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE click_events ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read/update their own profile
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Pages: users can CRUD their own pages; anyone can read published
CREATE POLICY "Users can read own pages"
  ON pages FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can read published pages"
  ON pages FOR SELECT
  USING (published = true);

CREATE POLICY "Users can insert pages"
  ON pages FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own pages"
  ON pages FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own pages"
  ON pages FOR DELETE
  USING (auth.uid() = user_id);

-- Blocks: users can CRUD blocks on their pages; anyone can read published
CREATE POLICY "Users can read own blocks"
  ON blocks FOR SELECT
  USING (EXISTS (SELECT 1 FROM pages WHERE pages.id = blocks.page_id AND pages.user_id = auth.uid()));

CREATE POLICY "Anyone can read blocks on published pages"
  ON blocks FOR SELECT
  USING (EXISTS (SELECT 1 FROM pages WHERE pages.id = blocks.page_id AND pages.published = true));

CREATE POLICY "Users can insert blocks"
  ON blocks FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM pages WHERE pages.id = blocks.page_id AND pages.user_id = auth.uid()));

CREATE POLICY "Users can update own blocks"
  ON blocks FOR UPDATE
  USING (EXISTS (SELECT 1 FROM pages WHERE pages.id = blocks.page_id AND pages.user_id = auth.uid()));

CREATE POLICY "Users can delete own blocks"
  ON blocks FOR DELETE
  USING (EXISTS (SELECT 1 FROM pages WHERE pages.id = blocks.page_id AND pages.user_id = auth.uid()));

-- Assets: users can CRUD own assets
CREATE POLICY "Users can read own assets"
  ON assets FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert assets"
  ON assets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own assets"
  ON assets FOR DELETE
  USING (auth.uid() = user_id);

-- Page views: insert for anyone, read for page owner
CREATE POLICY "Anyone can insert page views"
  ON page_views FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can read own page views"
  ON page_views FOR SELECT
  USING (EXISTS (SELECT 1 FROM pages WHERE pages.id = page_views.page_id AND pages.user_id = auth.uid()));

-- Click events: insert for anyone, read for page owner
CREATE POLICY "Anyone can insert click events"
  ON click_events FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can read own click events"
  ON click_events FOR SELECT
  USING (EXISTS (SELECT 1 FROM pages WHERE pages.id = click_events.page_id AND pages.user_id = auth.uid()));
