-- Add hero image columns to settings table
ALTER TABLE settings ADD COLUMN IF NOT EXISTS home_hero_image TEXT;
ALTER TABLE settings ADD COLUMN IF NOT EXISTS contact_hero_image TEXT;
ALTER TABLE settings ADD COLUMN IF NOT EXISTS destinations_hero_image TEXT;

-- Update existing settings row if it exists with default images if they are NULL
UPDATE settings 
SET 
  home_hero_image = COALESCE(home_hero_image, '/default.png'),
  contact_hero_image = COALESCE(contact_hero_image, '/default.png'),
  destinations_hero_image = COALESCE(destinations_hero_image, '/default.png')
WHERE id = 1;
