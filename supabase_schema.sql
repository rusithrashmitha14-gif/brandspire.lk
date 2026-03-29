-- Create Services table
create table public.services (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text,
  features text[] -- array of bullet points
);

-- Create Case Studies table
create table public.case_studies (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text,
  image_url text,
  client_name text,
  stats text -- e.g. "150% Growth"
);

-- Create Team Members table
create table public.team_members (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  role text,
  photo_url text
);

-- Create Blog Posts table
create table public.blog_posts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  slug text unique not null,
  content text,
  published_at timestamp with time zone,
  featured_image text
);

-- Set up Row Level Security (RLS)
-- Allow anyone to read
alter table public.services enable row level security;
create policy "Allow public read access" on public.services for select using (true);

alter table public.case_studies enable row level security;
create policy "Allow public read access" on public.case_studies for select using (true);

alter table public.team_members enable row level security;
create policy "Allow public read access" on public.team_members for select using (true);

alter table public.blog_posts enable row level security;
create policy "Allow public read access" on public.blog_posts for select using (true);
