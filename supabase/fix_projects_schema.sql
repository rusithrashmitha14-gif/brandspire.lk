-- Fix Projects Table: Add missing columns for Website Builder
ALTER TABLE projects ADD COLUMN IF NOT EXISTS brief TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS due_date DATE;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS credentials JSONB DEFAULT '{"notes": ""}'::jsonb;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';

-- Ensure Domain & Hosting is linked to Projects
DO $$ 
BEGIN 
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name='domain_hosting' AND column_name='project_id'
    ) THEN
        ALTER TABLE domain_hosting ADD COLUMN project_id UUID REFERENCES projects(id) ON DELETE SET NULL;
    END IF;
END $$;
