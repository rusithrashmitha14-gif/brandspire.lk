-- Create tables for Brandspire Website

-- 1. Services
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Case Studies
CREATE TABLE case_studies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name TEXT NOT NULL,
  industry TEXT,
  problem TEXT,
  solution TEXT,
  results TEXT,
  tech_stack TEXT[],
  images TEXT[],
  live_url TEXT,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Team
CREATE TABLE team (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE, -- Used for login mapping
  role TEXT,
  is_admin BOOLEAN DEFAULT FALSE, -- Admin vs Builder
  bio TEXT,
  photo TEXT,
  social_links JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Blog Posts
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  meta_description TEXT,
  featured_image TEXT,
  author_id UUID REFERENCES team(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
