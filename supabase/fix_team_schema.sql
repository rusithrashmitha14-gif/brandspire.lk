-- Run these commands to update your existing 'team' table
-- This avoids the "already exists" error from the full schema.sql

ALTER TABLE team ADD COLUMN IF NOT EXISTS email TEXT UNIQUE;
ALTER TABLE team ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- If you haven't run admin_extensions.sql yet, do that next.
-- It already uses 'CREATE TABLE IF NOT EXISTS' so it won't error.
