-- Add why_trek_image column to settings table
ALTER TABLE settings ADD COLUMN IF NOT EXISTS why_trek_image TEXT;

-- Update existing settings row if it exists with a default image if it is NULL
UPDATE settings 
SET 
  why_trek_image = COALESCE(why_trek_image, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtB_Vn_h5o7hS0vK8P_v7Y6qY5rF9-FpQ0pQ0') -- Placeholder or common default
WHERE id = 1;
