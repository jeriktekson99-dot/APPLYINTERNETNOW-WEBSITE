import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { LeadFormData } from '../types';
import { HOME_PLANS, BUSINESS_PLANS } from '../data/ispData';

// Retrieve environment variables safely
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabaseInstance: SupabaseClient | null = null;

/**
 * Checks whether Supabase environment variables are properly configured.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== 'https://your-project-ref.supabase.co' &&
    !supabaseUrl.includes('your-project')
  );
}

/**
 * Gets or initializes the Supabase client instance.
 */
export function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) {
    return null;
  }

  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }

  return supabaseInstance;
}

/**
 * Generates a human-friendly unique reference code for applications.
 * e.g. "FX-749201"
 */
export function generateReferenceCode(): string {
  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  return `FX-${randomDigits}`;
}

export interface ApplicationSubmissionResult {
  success: boolean;
  referenceCode: string;
  id?: string;
  error?: string;
  source: 'supabase' | 'local';
}

/**
 * Submits a new customer subscription application to Supabase database.
 * Table: applications
 * Columns: plan_id, plan_name, service_type, full_name, email, phone, address, reference_code, status
 */
export async function submitLeadApplication(
  formData: LeadFormData
): Promise<ApplicationSubmissionResult> {
  const referenceCode = formData.ticketNumber || generateReferenceCode();
  
  // Find friendly plan name
  const allPlans = [...HOME_PLANS, ...BUSINESS_PLANS];
  const matchedPlan = allPlans.find((p) => p.id === formData.selectedPlanId);
  const planName = matchedPlan ? matchedPlan.name : formData.selectedPlanId;

  const client = getSupabaseClient();

  if (client) {
    try {
      const formattedAddress = formData.caviteLocation 
        ? `${formData.installationAddress.trim()} (${formData.caviteLocation}, Cavite)`
        : formData.installationAddress.trim();

      const basePayload: Record<string, any> = {
        reference_code: referenceCode,
        plan_id: formData.selectedPlanId,
        plan_name: planName,
        service_type: formData.serviceType || 'home',
        full_name: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.mobileNumber.trim(),
        address: formattedAddress,
        status: 'pending',
        promo_code: formData.promoCode || null,
      };

      const payloadWithLocation = {
        ...basePayload,
        cavite_location: formData.caviteLocation || null,
      };

      // 1. Primary insert attempt with cavite_location.
      // NOTE: We do NOT force `.select()` because if the table's RLS policy allows INSERT
      // but lacks a matching SELECT policy for 'anon', chaining `.select()` causes Postgres
      // to evaluate SELECT RLS and reject the entire insert transaction!
      let insertResult = await client
        .from('applications')
        .insert([payloadWithLocation]);

      // 2. If it fails because 'cavite_location' column is missing on an existing table:
      if (
        insertResult.error &&
        (insertResult.error.message?.includes('cavite_location') ||
          insertResult.error.message?.toLowerCase().includes('column'))
      ) {
        console.warn('Retrying insert without cavite_location column (schema mismatch)...');
        insertResult = await client
          .from('applications')
          .insert([basePayload]);
      }

      if (insertResult.error) {
        console.error(
          `%c[Supabase RLS Error] Failed to insert application into 'applications' table:`,
          'color: #ef4444; font-weight: bold; font-size: 14px;',
          insertResult.error.message
        );
        console.info(
          `%c👉 To fix Row Level Security (RLS) in your Supabase project:\n` +
          `1. Open Supabase Dashboard -> SQL Editor\n` +
          `2. Paste and Run the following SQL:\n\n` +
          `ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;\n` +
          `GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;\n` +
          `GRANT ALL ON TABLE public.applications TO anon, authenticated, service_role;\n` +
          `CREATE POLICY "Anyone can submit application" ON public.applications FOR INSERT TO anon, authenticated WITH CHECK (true);\n` +
          `CREATE POLICY "Anyone can view applications" ON public.applications FOR SELECT TO anon, authenticated USING (true);\n` +
          `DROP VIEW IF EXISTS public.applications_summary CASCADE;\n` +
          `CREATE OR REPLACE VIEW public.applications_summary WITH (security_invoker = false) AS SELECT a.id, a.reference_code, a.full_name, a.email, a.phone, a.address, a.plan_name, a.service_type, a.status, p.speed_mbps, p.price_php, a.created_at, a.cavite_location FROM public.applications a LEFT JOIN public.plans p ON a.plan_id = p.id ORDER BY a.created_at DESC;\n` +
          `GRANT SELECT ON public.applications_summary TO anon, authenticated, service_role;`,
          'color: #3b82f6; font-size: 12px;'
        );

        saveApplicationLocally(formData, referenceCode, planName);
        return {
          success: true,
          referenceCode,
          error: insertResult.error.message,
          source: 'local',
        };
      }

      console.info(
        `%c[Supabase Success] Application saved to Supabase! Ref: ${referenceCode}`,
        'color: #10b981; font-weight: bold;'
      );

      return {
        success: true,
        referenceCode,
        source: 'supabase',
      };
    } catch (err: any) {
      console.error('Error submitting application to Supabase:', err);
      saveApplicationLocally(formData, referenceCode, planName);
      return {
        success: true,
        referenceCode,
        error: err.message,
        source: 'local',
      };
    }
  } else {
    // When Supabase is not configured yet, store application in localStorage
    saveApplicationLocally(formData, referenceCode, planName);
    return {
      success: true,
      referenceCode,
      source: 'local',
    };
  }
}

/**
 * Saves application to browser localStorage for offline reliability and development inspection.
 */
function saveApplicationLocally(formData: LeadFormData, referenceCode: string, planName: string) {
  try {
    const existingRaw = localStorage.getItem('fiberx_applications');
    const existing = existingRaw ? JSON.parse(existingRaw) : [];
    
    const newEntry = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      reference_code: referenceCode,
      plan_id: formData.selectedPlanId,
      plan_name: planName,
      service_type: formData.serviceType || 'home',
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.mobileNumber,
      cavite_location: formData.caviteLocation || null,
      address: formData.installationAddress,
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    existing.unshift(newEntry);
    localStorage.setItem('fiberx_applications', JSON.stringify(existing.slice(0, 100)));
  } catch (e) {
    console.error('Failed to save application locally:', e);
  }
}

/**
 * Fetches existing applications from Supabase or local storage.
 */
export async function fetchApplications() {
  const client = getSupabaseClient();
  if (client) {
    const { data, error } = await client
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      return data;
    }
  }

  try {
    const existingRaw = localStorage.getItem('fiberx_applications');
    return existingRaw ? JSON.parse(existingRaw) : [];
  } catch {
    return [];
  }
}
