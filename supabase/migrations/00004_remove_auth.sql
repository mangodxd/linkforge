-- LinkForge auth removal migration
-- Removes all auth dependencies since this is a single-user self-hosted app
-- This drops RLS policies, disables RLS, and removes FK constraints to auth.users

-- Drop all RLS policies
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

DROP POLICY IF EXISTS "Users can read own pages" ON pages;
DROP POLICY IF EXISTS "Anyone can read published pages" ON pages;
DROP POLICY IF EXISTS "Users can insert pages" ON pages;
DROP POLICY IF EXISTS "Users can update own pages" ON pages;
DROP POLICY IF EXISTS "Users can delete own pages" ON pages;

DROP POLICY IF EXISTS "Users can read own blocks" ON blocks;
DROP POLICY IF EXISTS "Anyone can read blocks on published pages" ON blocks;
DROP POLICY IF EXISTS "Users can insert blocks" ON blocks;
DROP POLICY IF EXISTS "Users can update own blocks" ON blocks;
DROP POLICY IF EXISTS "Users can delete own blocks" ON blocks;

DROP POLICY IF EXISTS "Users can read own assets" ON assets;
DROP POLICY IF EXISTS "Users can insert assets" ON assets;
DROP POLICY IF EXISTS "Users can delete own assets" ON assets;

DROP POLICY IF EXISTS "Anyone can insert page views" ON page_views;
DROP POLICY IF EXISTS "Users can read own page views" ON page_views;

DROP POLICY IF EXISTS "Anyone can insert click events" ON click_events;
DROP POLICY IF EXISTS "Users can read own click events" ON click_events;

-- Disable RLS on all tables
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE pages DISABLE ROW LEVEL SECURITY;
ALTER TABLE blocks DISABLE ROW LEVEL SECURITY;
ALTER TABLE assets DISABLE ROW LEVEL SECURITY;
ALTER TABLE page_views DISABLE ROW LEVEL SECURITY;
ALTER TABLE click_events DISABLE ROW LEVEL SECURITY;

-- Drop FK constraints to auth.users
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_user_id_fkey;
ALTER TABLE pages DROP CONSTRAINT IF EXISTS pages_user_id_fkey;
ALTER TABLE assets DROP CONSTRAINT IF EXISTS assets_user_id_fkey;

-- Make user_id columns nullable since we no longer have auth.users
ALTER TABLE profiles ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE pages ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE assets ALTER COLUMN user_id DROP NOT NULL;
