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
      const { data, error } = await client
        .from('applications')
        .insert([
          {
            reference_code: referenceCode,
            plan_id: formData.selectedPlanId,
            plan_name: planName,
            service_type: formData.serviceType || 'home',
            full_name: formData.fullName.trim(),
            email: formData.email.trim().toLowerCase(),
            phone: formData.mobileNumber.trim(),
            cavite_location: formData.caviteLocation || null,
            address: formData.caviteLocation 
              ? `${formData.installationAddress.trim()} (${formData.caviteLocation}, Cavite)`
              : formData.installationAddress.trim(),
            status: 'pending',
            promo_code: formData.promoCode || null,
          },
        ])
        .select()
        .single();

      if (error) {
        console.warn('Supabase insertion error, falling back to local storage:', error.message);
        saveApplicationLocally(formData, referenceCode, planName);
        return {
          success: true,
          referenceCode,
          error: error.message,
          source: 'local',
        };
      }

      return {
        success: true,
        referenceCode,
        id: data?.id,
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
