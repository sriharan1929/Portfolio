-- 1. Create Tables

-- Profile Table (Configured for exactly one row)
CREATE TABLE IF NOT EXISTS profile (
  id text PRIMARY KEY DEFAULT 'main' CHECK (id = 'main'),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  location text NOT NULL,
  status text NOT NULL,
  hero_title text NOT NULL,
  hero_subtitle text NOT NULL,
  hero_description text NOT NULL,
  about_paragraphs text[] NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id text PRIMARY KEY,
  title text NOT NULL,
  tagline text NOT NULL,
  stack text[] NOT NULL,
  features text[] NOT NULL,
  period text NOT NULL,
  github text NOT NULL,
  featured boolean DEFAULT false NOT NULL,
  sort_order integer DEFAULT 0 NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Skills Table
CREATE TABLE IF NOT EXISTS skills (
  category text PRIMARY KEY,
  skills text[] NOT NULL,
  sort_order integer DEFAULT 0 NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Education Table
CREATE TABLE IF NOT EXISTS education (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  degree text NOT NULL,
  place text NOT NULL,
  year text NOT NULL,
  score text NOT NULL,
  sort_order integer DEFAULT 0 NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Experience Table
CREATE TABLE IF NOT EXISTS experience (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  project_name text NOT NULL,
  period text NOT NULL,
  points text[] NOT NULL,
  tags text[] NOT NULL,
  sort_order integer DEFAULT 0 NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies

-- Profile Policies
DROP POLICY IF EXISTS "Public Read Access" ON profile;
DROP POLICY IF EXISTS "Admin Write Access" ON profile;
CREATE POLICY "Public Read Access" ON profile FOR SELECT USING (true);
CREATE POLICY "Admin Write Access" ON profile FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Projects Policies
DROP POLICY IF EXISTS "Public Read Access" ON projects;
DROP POLICY IF EXISTS "Admin Write Access" ON projects;
CREATE POLICY "Public Read Access" ON projects FOR SELECT USING (true);
CREATE POLICY "Admin Write Access" ON projects FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Skills Policies
DROP POLICY IF EXISTS "Public Read Access" ON skills;
DROP POLICY IF EXISTS "Admin Write Access" ON skills;
CREATE POLICY "Public Read Access" ON skills FOR SELECT USING (true);
CREATE POLICY "Admin Write Access" ON skills FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Education Policies
DROP POLICY IF EXISTS "Public Read Access" ON education;
DROP POLICY IF EXISTS "Admin Write Access" ON education;
CREATE POLICY "Public Read Access" ON education FOR SELECT USING (true);
CREATE POLICY "Admin Write Access" ON education FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Experience Policies
DROP POLICY IF EXISTS "Public Read Access" ON experience;
DROP POLICY IF EXISTS "Admin Write Access" ON experience;
CREATE POLICY "Public Read Access" ON experience FOR SELECT USING (true);
CREATE POLICY "Admin Write Access" ON experience FOR ALL TO authenticated USING (true) WITH CHECK (true);
