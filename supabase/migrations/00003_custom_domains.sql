-- Custom domains for pages
CREATE TABLE custom_domains (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  domain TEXT NOT NULL UNIQUE,
  verified BOOLEAN NOT NULL DEFAULT false,
  verification_token TEXT NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_custom_domains_page_id ON custom_domains(page_id);
CREATE INDEX idx_custom_domains_domain ON custom_domains(domain);

ALTER TABLE custom_domains ENABLE ROW LEVEL SECURITY;

-- Users can CRUD own domains via page ownership
CREATE POLICY "Users can read own custom domains"
  ON custom_domains FOR SELECT
  USING (EXISTS (SELECT 1 FROM pages WHERE pages.id = custom_domains.page_id AND pages.user_id = auth.uid()));

CREATE POLICY "Anyone can read verified custom domains"
  ON custom_domains FOR SELECT
  USING (verified = true);

CREATE POLICY "Users can insert custom domains"
  ON custom_domains FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM pages WHERE pages.id = custom_domains.page_id AND pages.user_id = auth.uid()));

CREATE POLICY "Users can update own custom domains"
  ON custom_domains FOR UPDATE
  USING (EXISTS (SELECT 1 FROM pages WHERE pages.id = custom_domains.page_id AND pages.user_id = auth.uid()));

CREATE POLICY "Users can delete own custom domains"
  ON custom_domains FOR DELETE
  USING (EXISTS (SELECT 1 FROM pages WHERE pages.id = custom_domains.page_id AND pages.user_id = auth.uid()));
