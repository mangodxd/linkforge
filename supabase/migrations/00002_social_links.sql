-- Add social_links column to pages table
ALTER TABLE pages ADD COLUMN social_links JSONB DEFAULT '[]'::jsonb NOT NULL;

-- Update RLS to allow reading social_links (already covered by existing policies)
