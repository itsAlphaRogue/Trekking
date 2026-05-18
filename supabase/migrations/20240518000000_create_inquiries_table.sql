-- Schema for storing trekking inquiries

CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    trek TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'New' NOT NULL, -- e.g., 'New', 'Contacted', 'Converted', 'Archived'
    internal_notes TEXT -- Space for admin to leave private notes
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert (public submissions)
CREATE POLICY "Enable insert for all users" ON public.inquiries
    FOR INSERT WITH CHECK (true);

-- Policy: Only authenticated admins can read/update/delete
-- Assuming admin has a specific role or we just check authenticated for now
-- In a real scenario, you'd check for an admin role or specific email
CREATE POLICY "Admins can view all inquiries" ON public.inquiries
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can update inquiries" ON public.inquiries
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete inquiries" ON public.inquiries
    FOR DELETE USING (auth.role() = 'authenticated');

-- Indexes for performance
CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON public.inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS inquiries_status_idx ON public.inquiries (status);
