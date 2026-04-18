-- Palace Porta Potties location schema
-- One row per physical GBP location

CREATE TABLE IF NOT EXISTS locations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,                    -- portable-toilet-rental-new-york
  city TEXT NOT NULL,                           -- New York
  state TEXT NOT NULL,                          -- New York
  state_code TEXT NOT NULL,                     -- NY
  address_line TEXT NOT NULL,                   -- 251 Water St
  postal_code TEXT NOT NULL,                    -- 10038
  phone TEXT NOT NULL,                          -- (332) 241-1073
  phone_tel TEXT NOT NULL,                      -- +13322411073 (for tel: links)
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  gbp_url TEXT NOT NULL,                        -- Google Maps short URL
  gbp_cid TEXT,                                 -- CID from Maps
  gbp_place_id TEXT,                            -- ChIJ... place ID
  map_iframe TEXT NOT NULL,                     -- Full iframe HTML from Google Maps share
  hours_json TEXT NOT NULL,                     -- {"mon":"7AM-6PM",...}
  
  -- SEO fields (locked at launch per SEO-U rules)
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  h1 TEXT NOT NULL,
  
  -- Unique local content (85%+ unique per SEO-U to avoid soft 404)
  intro_html TEXT NOT NULL,                     -- First paragraph - contains EMQ once
  services_html TEXT NOT NULL,                  -- Locally-relevant services
  local_context_html TEXT NOT NULL,             -- City-specific (permits, events, geo)
  faq_json TEXT NOT NULL,                       -- [{q,a},...] city-specific FAQs
  
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_locations_slug ON locations(slug);
CREATE INDEX IF NOT EXISTS idx_locations_state ON locations(state_code);
