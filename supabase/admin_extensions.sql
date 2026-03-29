-- Domain & Hosting Management
CREATE TABLE IF NOT EXISTS domain_hosting (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  type TEXT NOT NULL, -- 'domain' or 'hosting'
  name TEXT NOT NULL, -- e.g. 'brandspire.lk' or 'Cloud Server 1'
  provider TEXT, -- e.g. 'Namecheap', 'DigitalOcean', 'Dreamhost'
  expiry_date DATE NOT NULL,
  cost NUMERIC,
  currency TEXT DEFAULT 'USD',
  status TEXT DEFAULT 'active', -- 'active', 'expired', 'cancelled'
  renewal_paid BOOLEAN DEFAULT FALSE, -- Track if this cycle's renewal is paid
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  brief TEXT, -- Website brief / Requirements
  due_date DATE, -- Development deadline
  credentials JSONB, -- Hosting/WP/CPanel logins
  status TEXT DEFAULT 'pending', -- pending, in_progress, completed
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tasks Table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  assigned_to UUID REFERENCES team(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending', -- pending, in-progress, completed
  priority TEXT DEFAULT 'medium', -- low, medium, high
  due_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
