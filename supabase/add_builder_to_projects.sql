-- Add builder_id to projects to track who started the build
ALTER TABLE projects ADD COLUMN IF NOT EXISTS builder_id UUID REFERENCES team(id) ON DELETE SET NULL;
