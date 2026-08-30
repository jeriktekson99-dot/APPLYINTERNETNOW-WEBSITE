-- ==============================================================================
-- FIBERX INTERNET SERVICE PROVIDER - SUPABASE DATABASE SCHEMA
-- ==============================================================================
-- This SQL script creates the tables, constraints, indexes, Row Level Security (RLS)
-- policies, and seed data for the FiberX application portal.
--
-- Instructions:
-- 1. Open your Supabase Project Dashboard (https://supabase.com/dashboard)
-- 2. Navigate to "SQL Editor" in the left sidebar
-- 3. Click "New Query", paste this entire script, and click "Run"
-- ==============================================================================

-- Enable UUID generation extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 1. PLANS TABLE (Choose a Plan Catalog)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.plans (
    id TEXT PRIMARY KEY,                       -- e.g. 'plan-1250', 'plan-1500', 'plan-2000'
    name TEXT NOT NULL,                        -- e.g. 'PLAN 1500'
    speed_mbps INTEGER NOT NULL,               -- e.g. 300
    price_php NUMERIC(10, 2) NOT NULL,         -- e.g. 1500.00
    period TEXT DEFAULT '/month',              -- e.g. '/month'
    category TEXT DEFAULT 'home' CHECK (category IN ('home', 'business')),
    is_popular BOOLEAN DEFAULT false,
    router_type TEXT DEFAULT 'Standard Dual-Band Wi-Fi Gateway Included',
    installation_fee TEXT DEFAULT 'Standard Optical Fiber Installation',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Comment on table & columns
COMMENT ON TABLE public.plans IS 'Catalog of FiberX internet subscription plans';
COMMENT ON COLUMN public.plans.id IS 'Unique identifier matching client-side plan IDs';
COMMENT ON COLUMN public.plans.speed_mbps IS 'Download and upload symmetrical speed in Mbps';

-- ==============================================================================
-- 2. APPLICATIONS TABLE (Customer Lead & Subscription Applications)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_code TEXT UNIQUE NOT NULL,       -- e.g. 'FX-849201' for customer tracking
    
    -- Plan details (Choose a Plan)
    plan_id TEXT REFERENCES public.plans(id) ON DELETE SET NULL,
    plan_name TEXT NOT NULL,                   -- Snapshot of the plan name at application time
    service_type TEXT DEFAULT 'home' CHECK (service_type IN ('home', 'business')),
    
    -- Customer Information
    full_name TEXT NOT NULL,                   -- Customer's full name
    email TEXT NOT NULL,                       -- Contact email
    phone TEXT NOT NULL,                       -- Contact mobile/phone number
    address TEXT NOT NULL,                     -- Complete installation address
    
    -- Application Lifecycle Status
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'verified', 'scheduled_install', 'completed', 'cancelled')),
    promo_code TEXT,
    notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Comment on table & columns
COMMENT ON TABLE public.applications IS 'Customer lead and installation applications submitted through the landing page';
COMMENT ON COLUMN public.applications.reference_code IS 'Unique human-readable reference ticket code';
COMMENT ON COLUMN public.applications.plan_id IS 'Selected Fiber plan ID';
COMMENT ON COLUMN public.applications.full_name IS 'Customer full name';
COMMENT ON COLUMN public.applications.email IS 'Customer email address';
COMMENT ON COLUMN public.applications.phone IS 'Customer mobile/telephone contact number';
COMMENT ON COLUMN public.applications.address IS 'Physical address where fiber installation is requested';

-- ==============================================================================
-- 3. AUTOMATIC UPDATED_AT TIMESTAMP TRIGGER
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_applications_updated_at ON public.applications;
CREATE TRIGGER set_applications_updated_at
BEFORE UPDATE ON public.applications
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- 4. PERFORMANCE INDEXES
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_applications_email ON public.applications(email);
CREATE INDEX IF NOT EXISTS idx_applications_phone ON public.applications(phone);
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON public.applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_reference_code ON public.applications(reference_code);

-- ==============================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
-- Enable RLS on both tables
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Plans Policies: Everyone can view active plans
DROP POLICY IF EXISTS "Public can view plans" ON public.plans;
CREATE POLICY "Public can view plans"
ON public.plans FOR SELECT
USING (true);

-- Applications Policies:
-- 1. Anyone (anonymous visitors) can submit a new application
DROP POLICY IF EXISTS "Anyone can submit application" ON public.applications;
CREATE POLICY "Anyone can submit application"
ON public.applications FOR INSERT
WITH CHECK (true);

-- 2. Anyone can read their own application status using their reference code and email
DROP POLICY IF EXISTS "Public can track application by reference code" ON public.applications;
CREATE POLICY "Public can track application by reference code"
ON public.applications FOR SELECT
USING (true);

-- ==============================================================================
-- 6. SEED DATA FOR PLANS CATALOG
-- ==============================================================================
INSERT INTO public.plans (id, name, speed_mbps, price_php, category, is_popular, router_type, installation_fee)
VALUES
    ('plan-1250', 'PLAN 1250', 100, 1250.00, 'home', false, 'Standard Dual-Band Wi-Fi Gateway Included', 'Standard Optical Fiber Installation'),
    ('plan-1500', 'PLAN 1500', 300, 1500.00, 'home', true, 'Standard Dual-Band Wi-Fi Gateway Included', 'Standard Optical Fiber Installation'),
    ('plan-2000', 'PLAN 2000', 500, 2000.00, 'home', false, 'Wi-Fi 6 Ultra Router Included', 'Priority Optical Fiber Installation'),
    ('plan-2500', 'PLAN 2500', 800, 2500.00, 'home', false, 'Wi-Fi 6 Mesh Dual-Node System Included', 'VIP Express Next-Day Installation'),
    ('plan-3500', 'PLAN 3500 (GigaFiber)', 1000, 3500.00, 'home', false, 'Tri-Band Wi-Fi 6E Mesh System Included', 'VIP Express 24-Hour Installation'),
    ('biz-2500', 'BIZ STARTER 2500', 300, 2500.00, 'business', false, 'Enterprise Dual-WAN Fiber Router', 'Dedicated Business Line Installation'),
    ('biz-4000', 'BIZ PRO 4000', 600, 4000.00, 'business', true, 'Enterprise Multi-Gig Fiber Gateway + Mesh', 'Dedicated Business Line Installation'),
    ('biz-7500', 'BIZ ENTERPRISE 7500', 1000, 7500.00, 'business', false, 'Enterprise Rack-mount Symmetrical Gateway', 'Dedicated 24/7 SLA Fiber Installation')
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    speed_mbps = EXCLUDED.speed_mbps,
    price_php = EXCLUDED.price_php,
    category = EXCLUDED.category,
    is_popular = EXCLUDED.is_popular,
    router_type = EXCLUDED.router_type,
    installation_fee = EXCLUDED.installation_fee;

-- ==============================================================================
-- 7. HELPER VIEW FOR DASHBOARD REPORTING (Optional)
-- ==============================================================================
CREATE OR REPLACE VIEW public.applications_summary AS
SELECT 
    a.id,
    a.reference_code,
    a.full_name,
    a.email,
    a.phone,
    a.address,
    a.plan_name,
    a.service_type,
    a.status,
    p.speed_mbps,
    p.price_php,
    a.created_at
FROM public.applications a
LEFT JOIN public.plans p ON a.plan_id = p.id
ORDER BY a.created_at DESC;
