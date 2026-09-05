import React, { useState } from 'react';
import { 
  Zap, 
  MapPin, 
  ArrowRight, 
  User, 
  Phone, 
  Mail, 
  CheckCircle2, 
  ChevronDown,
  Check,
  Home,
  RotateCcw,
  AlertTriangle,
  Database,
  Copy,
  CheckCheck
} from 'lucide-react';
import { LeadFormData } from '../types';
import { submitLeadApplication, ApplicationSubmissionResult } from '../lib/supabase';
import { CAVITE_LOCATIONS } from '../data/ispData';
import familyLifestyleImg from '../assets/images/family_smart_tech_1787070015425.jpg';

interface HeroSectionProps {
  selectedPlanId?: string;
  onPlanChange?: (planId: string) => void;
  onFormSubmitted?: (data: LeadFormData) => void;
  onOpenCoverage: () => void;
  onOpenSubscribe?: (planId?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedPlanId = 'plan-1500',
  onPlanChange,
  onFormSubmitted,
  onOpenCoverage,
  onOpenSubscribe,
}) => {
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    mobileNumber: '',
    email: '',
    installationAddress: '',
    selectedPlanId: selectedPlanId || 'plan-1500',
    serviceType: 'home',
    caviteLocation: '',
  });

  React.useEffect(() => {
    if (selectedPlanId) {
      setFormData((prev) => ({ ...prev, selectedPlanId }));
    }
  }, [selectedPlanId]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<ApplicationSubmissionResult | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  React.useEffect(() => {
    if (selectedPlanId) {
      setFormData((prev) => ({ ...prev, selectedPlanId }));
      setIsSubmitted(false);
    }
  }, [selectedPlanId]);

  const speedOptions = [
    { id: 'plan-1250', name: 'PLAN 1250', speed: 'Up to 100 Mbps', price: '₱1,250/mo' },
    { id: 'plan-1500', name: 'PLAN 1500', speed: 'Up to 300 Mbps', price: '₱1,500/mo' },
    { id: 'plan-2000', name: 'PLAN 2000', speed: 'Up to 500 Mbps', price: '₱2,000/mo' },
    { id: 'plan-2500', name: 'PLAN 2500', speed: 'Up to 700 Mbps', price: '₱2,500/mo' },
    { id: 'plan-s2s-700', name: 'SURF2SAWA (S2S 700)', speed: 'Up to 50 Mbps', price: '₱700 / 30 days' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'selectedPlanId' && onPlanChange) {
      onPlanChange(value);
    }
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Valid email is required';
    if (!formData.mobileNumber.trim()) errors.mobileNumber = 'Phone number is required';
    if (!formData.caviteLocation) {
      errors.caviteLocation = 'Please select your location in Cavite';
    } else if (formData.caviteLocation === 'Others') {
      errors.caviteLocation = 'We only serve regions in Cavite at this time.';
    }
    if (!formData.installationAddress.trim()) errors.installationAddress = 'Installation address is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const result = await submitLeadApplication(formData);
      setSubmissionResult(result);
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onFormSubmitted) {
        onFormSubmitted({ ...formData, ticketNumber: result.referenceCode });
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      setSubmissionResult({
        success: true,
        referenceCode: formData.ticketNumber || 'FX-PENDING',
        error: err?.message || 'Submission error',
        source: 'local'
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      mobileNumber: '',
      email: '',
      installationAddress: '',
      selectedPlanId: selectedPlanId || 'plan-1500',
      serviceType: 'home',
      caviteLocation: '',
    });
    setFormErrors({});
    setSubmissionResult(null);
    setIsSubmitted(false);
  };

  const handleReturn = () => {
    setFormData({
      fullName: '',
      mobileNumber: '',
      email: '',
      installationAddress: '',
      selectedPlanId: selectedPlanId || 'plan-1500',
      serviceType: 'home',
      caviteLocation: '',
    });
    setFormErrors({});
    setSubmissionResult(null);
    setIsSubmitted(false);
  };

  const handleGetStarted = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    const firstInput = document.querySelector('#hero-full-name') as HTMLInputElement;
    if (firstInput) {
      setTimeout(() => firstInput.focus({ preventScroll: true }), 400);
    }
  };

  const handleExplorePackages = () => {
    const pkgElement = document.querySelector('#packages');
    if (pkgElement) {
      pkgElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 overflow-hidden bg-[#160836] text-white border-b border-violet-900/60"
    >
      {/* 1. Base Layer & Lifestyle Image (Layered with Left-to-Right Violet Fade) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <img
          src={familyLifestyleImg}
          alt="Smart technology family lifestyle"
          className="w-full h-full object-cover object-right opacity-40 lg:opacity-50 filter contrast-105 brightness-100"
        />
        {/* Smooth horizontal fade: Solid deep violet purple on the left, slowly transitioning to soft low-opacity visibility on the right */}
        <div 
          className="absolute inset-0" 
          style={{
            background: 'linear-gradient(90deg, #160836 0%, #160836 32%, rgba(22, 8, 54, 0.9) 52%, rgba(22, 8, 54, 0.6) 75%, rgba(22, 8, 54, 0.3) 100%)'
          }}
        />
        {/* Soft vertical edge blending */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#160836] via-transparent via-50% to-[#160836]/80" />
      </div>

      {/* Left-to-right photo blending overlay */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Side: Bold Headline & Solid-colored Get Started Button */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7">
            
            {/* Bold Headline Text */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
              We're In The Business Of{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-cyan-300 to-[#FFD000]">
                Get Quality
              </span>{' '}
              Internet Service
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-purple-100/90 font-normal leading-relaxed max-w-xl">
              Experience seamless pure optical fiber connection with symmetrical gigabit speeds, zero buffering, and 99.99% network reliability for homes and businesses.
            </p>

            {/* CTA Button Group */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Solid-colored 'Contact Now' button leading to Facebook Messenger */}
              <a
                href="https://m.me/105613195973260"
                target="_blank"
                rel="noopener noreferrer"
                id="hero-contact-now-btn"
                className="bg-[#2A4BFF] hover:bg-[#1E3BB8] text-white font-bold text-base px-8 py-4 rounded-2xl shadow-md hover:shadow-lg shadow-black/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer flex items-center gap-2.5"
              >
                <span>Contact Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                id="hero-explore-packages-btn"
                onClick={handleExplorePackages}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold text-base px-6 py-4 rounded-2xl border border-white/20 backdrop-blur-md hover:border-white/40 shadow-xs transition-all duration-200 cursor-pointer flex items-center gap-2"
              >
                <span>Explore Packages</span>
                <ArrowRight className="w-4 h-4 text-[#00F0FF]" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/15 max-w-lg">
              <div className="flex items-center gap-2 text-xs text-purple-200 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#00F0FF] shrink-0" />
                <span>No Data Capping</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-purple-200 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#FFD000] shrink-0" />
                <span>Zero Installation Lag</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-purple-200 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>24/7 Fiber Care</span>
              </div>
            </div>
          </div>

          {/* Right Side: Apply Now Form Card / In-Place Thank You View */}
          <div className="lg:col-span-6 relative scroll-mt-28" id="hero-apply-form">
            {/* Form Container with fixed consistent dimensions */}
            <div className="relative z-10 bg-[#160836] rounded-3xl p-6 sm:p-8 shadow-xl border border-violet-800/60 text-white min-h-[530px] flex flex-col justify-between">
              
              {isSubmitted ? (
                /* In-Place Thank You Confirmation (Matches exact size of Apply Now form) */
                <div className="flex flex-col items-center justify-center text-center h-full flex-1 py-4 my-auto animate-in fade-in zoom-in-95 duration-300">
                  
                  {/* Concentric Glow Circle Icon */}
                  <div className="w-20 h-20 rounded-full border-2 border-[#00E599] flex items-center justify-center mb-5 shadow-[0_0_35px_rgba(0,229,153,0.35)]">
                    <div className="w-12 h-12 rounded-full bg-[#00E599] flex items-center justify-center text-[#160836]">
                      <Check className="w-7 h-7 stroke-[3.5]" />
                    </div>
                  </div>

                  {/* Pill Badge */}
                  <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#053225]/90 border border-[#00E599]/50 text-[#00E599] text-xs font-black tracking-wider uppercase mb-3.5 shadow-xs">
                    APPLICATION RECEIVED SUCCESSFULLY
                  </div>

                  {/* Headline */}
                  <h2 className="font-display text-2xl sm:text-3xl lg:text-[32px] font-black text-white tracking-tight mb-2.5">
                    Thank You for Submitting!
                  </h2>

                  {/* Subtitle */}
                  <p className="text-purple-200/90 text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-4">
                    Your FiberX internet application has been registered. Our deployment team is reviewing optical port availability in {formData.caviteLocation ? `${formData.caviteLocation}, Cavite` : 'your area'}.
                  </p>

                  {/* Reference Ticket & Supabase RLS Status */}
                  <div className="w-full max-w-md bg-black/30 border border-white/10 rounded-2xl p-3.5 mb-5 text-left text-xs">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-purple-300 font-semibold uppercase tracking-wider text-[11px]">Tracking Reference:</span>
                      <span className="font-mono font-bold text-[#00F0FF] bg-[#00F0FF]/10 px-2.5 py-0.5 rounded-md text-xs border border-[#00F0FF]/30">
                        {submissionResult?.referenceCode || formData.ticketNumber || 'FX-PENDING'}
                      </span>
                    </div>

                    {submissionResult?.source === 'supabase' ? (
                      <div className="flex items-center gap-1.5 text-emerald-300 font-medium text-[11px] pt-1.5 border-t border-white/10">
                        <Database className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Successfully saved to Supabase live database.</span>
                      </div>
                    ) : submissionResult?.error ? (
                      <div className="pt-2 border-t border-white/10">
                        <div className="flex items-start gap-1.5 text-amber-300 text-[11px] font-medium mb-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>Supabase rejected submission: {submissionResult.error}</span>
                        </div>
                        <p className="text-[10px] text-purple-200/80 mb-2">
                          Row Level Security (RLS) is blocking inserts. Click below to copy the SQL policy to paste into your Supabase SQL Editor:
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            const sql = `ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;\nGRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;\nGRANT ALL ON TABLE public.applications TO anon, authenticated, service_role;\nCREATE POLICY "Anyone can submit application" ON public.applications FOR INSERT TO anon, authenticated WITH CHECK (true);\nCREATE POLICY "Anyone can view applications" ON public.applications FOR SELECT TO anon, authenticated USING (true);\nDROP VIEW IF EXISTS public.applications_summary CASCADE;\nCREATE OR REPLACE VIEW public.applications_summary WITH (security_invoker = false) AS SELECT a.id, a.reference_code, a.full_name, a.email, a.phone, a.address, a.plan_name, a.service_type, a.status, p.speed_mbps, p.price_php, a.created_at, a.cavite_location FROM public.applications a LEFT JOIN public.plans p ON a.plan_id = p.id ORDER BY a.created_at DESC;\nGRANT SELECT ON public.applications_summary TO anon, authenticated, service_role;`;
                            navigator.clipboard.writeText(sql);
                            setCopiedSql(true);
                            setTimeout(() => setCopiedSql(false), 3000);
                          }}
                          className="w-full py-1.5 px-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-purple-200 hover:text-white flex items-center justify-between text-[11px] font-mono transition-colors cursor-pointer"
                        >
                          <span className="truncate text-left text-[11px] font-medium">Copy Supabase RLS Fix SQL</span>
                          {copiedSql ? (
                            <span className="text-emerald-400 flex items-center gap-1 text-[11px] shrink-0 font-sans font-semibold">
                              <CheckCheck className="w-3.5 h-3.5" /> Copied!
                            </span>
                          ) : (
                            <span className="text-[#00F0FF] flex items-center gap-1 text-[11px] shrink-0 font-sans font-semibold">
                              <Copy className="w-3.5 h-3.5" /> Copy SQL
                            </span>
                          )}
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-purple-300 text-[11px] pt-1.5 border-t border-white/10">
                        <Database className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span>Saved to local session (Supabase not configured in .env).</span>
                      </div>
                    )}
                  </div>

                  {/* Actions Block directly below description with no divider line */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
                    <button
                      type="button"
                      id="thankyou-return-btn"
                      onClick={handleReturn}
                      className="w-full sm:flex-1 py-3.5 px-5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm text-center flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Home className="w-4 h-4" />
                      <span>Return</span>
                    </button>

                    <button
                      type="button"
                      id="thankyou-another-form-btn"
                      onClick={handleResetForm}
                      className="w-full sm:flex-1 py-3.5 px-5 rounded-xl bg-[#2A4BFF] hover:bg-[#1E3BB8] text-white font-extrabold text-sm text-center flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Answer Another Form</span>
                    </button>
                  </div>

                </div>
              ) : (
                /* Apply Now Form Body */
                <div className="flex flex-col justify-between h-full">
                  {/* Form Header */}
                  <div className="pb-3 mb-5 border-b border-white/10">
                    <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
                      Apply Now
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* 1. Choose Plan */}
                    <div>
                      <label htmlFor="hero-choose-plan" className="block text-xs font-bold uppercase tracking-wider text-purple-200 mb-1.5">
                        Choose Plan <span className="text-purple-300">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-300">
                          <Zap className="w-4 h-4" />
                        </div>
                        <select
                          id="hero-choose-plan"
                          name="selectedPlanId"
                          value={formData.selectedPlanId}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-10 py-3 bg-black/45 border border-white/20 rounded-xl text-sm text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition-all appearance-none cursor-pointer"
                        >
                          {speedOptions.map((item) => (
                            <option key={item.id} value={item.id} className="bg-[#170933] text-white">
                              {item.name} ({item.speed}) — {item.price}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-purple-300">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* 2x2 Grid: Full Name, Email, Phone, and Location in Cavite */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {/* 1. Full Name */}
                      <div>
                        <label htmlFor="hero-full-name" className="block text-xs font-bold uppercase tracking-wider text-purple-200 mb-1.5">
                          Full Name <span className="text-[#00F0FF]">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-300">
                            <User className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            id="hero-full-name"
                            name="fullName"
                            placeholder="Juan dela Cruz"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-3.5 py-2.5 bg-black/35 border rounded-xl text-sm text-white placeholder:text-purple-300/50 font-medium focus:outline-none focus:ring-2 transition-all ${
                              formErrors.fullName ? 'border-rose-400 focus:ring-rose-400/30' : 'border-white/15 focus:border-blue-400 focus:ring-blue-500/30'
                            }`}
                          />
                        </div>
                        {formErrors.fullName && (
                          <p className="text-[11px] text-rose-300 font-medium mt-1">{formErrors.fullName}</p>
                        )}
                      </div>

                      {/* 2. Email */}
                      <div>
                        <label htmlFor="hero-email" className="block text-xs font-bold uppercase tracking-wider text-purple-200 mb-1.5">
                          Email <span className="text-[#00F0FF]">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-300">
                            <Mail className="w-4 h-4" />
                          </div>
                          <input
                            type="email"
                            id="hero-email"
                            name="email"
                            placeholder="juan.delacruz@gmail.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-3.5 py-2.5 bg-black/35 border rounded-xl text-sm text-white placeholder:text-purple-300/50 font-medium focus:outline-none focus:ring-2 transition-all ${
                              formErrors.email ? 'border-rose-400 focus:ring-rose-400/30' : 'border-white/15 focus:border-blue-400 focus:ring-blue-500/30'
                            }`}
                          />
                        </div>
                        {formErrors.email && (
                          <p className="text-[11px] text-rose-300 font-medium mt-1">{formErrors.email}</p>
                        )}
                      </div>

                      {/* 3. Phone */}
                      <div>
                        <label htmlFor="hero-phone" className="block text-xs font-bold uppercase tracking-wider text-purple-200 mb-1.5">
                          Phone <span className="text-[#00F0FF]">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-300">
                            <Phone className="w-4 h-4" />
                          </div>
                          <input
                            type="tel"
                            id="hero-phone"
                            name="mobileNumber"
                            placeholder="+63 917 123 4567"
                            value={formData.mobileNumber}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-3.5 py-2.5 bg-black/35 border rounded-xl text-sm text-white placeholder:text-purple-300/50 font-medium focus:outline-none focus:ring-2 transition-all ${
                              formErrors.mobileNumber ? 'border-rose-400 focus:ring-rose-400/30' : 'border-white/15 focus:border-blue-400 focus:ring-blue-500/30'
                            }`}
                          />
                        </div>
                        {formErrors.mobileNumber && (
                          <p className="text-[11px] text-rose-300 font-medium mt-1">{formErrors.mobileNumber}</p>
                        )}
                      </div>

                      {/* 4. Location in Cavite (Dropdown) */}
                      <div>
                        <label htmlFor="hero-cavite-location" className="block text-xs font-bold uppercase tracking-wider text-purple-200 mb-1.5">
                          Location in Cavite <span className="text-[#00F0FF]">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-300">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <select
                            id="hero-cavite-location"
                            name="caviteLocation"
                            value={formData.caviteLocation}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-9 py-2.5 bg-black/35 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer ${
                              formData.caviteLocation ? 'text-white' : 'text-purple-300/50'
                            } ${
                              formErrors.caviteLocation ? 'border-rose-400 focus:ring-rose-400/30' : 'border-white/15 focus:border-blue-400 focus:ring-blue-500/30'
                            }`}
                          >
                            <option value="" className="bg-[#170933] text-purple-300/50">
                              -- Select Cavite Area --
                            </option>
                            {CAVITE_LOCATIONS.map((loc) => (
                              <option key={loc.value} value={loc.value} className="bg-[#170933] text-white">
                                {loc.label}
                              </option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-purple-300">
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </div>
                        {formErrors.caviteLocation && (
                          <p className="text-[11px] text-rose-300 font-medium mt-1">{formErrors.caviteLocation}</p>
                        )}
                      </div>

                      {/* Notice if 'Others' (outside Cavite) is selected */}
                      {formData.caviteLocation === 'Others' && (
                        <div className="col-span-1 sm:col-span-2 p-3 rounded-xl bg-amber-500/15 border border-amber-400/40 text-amber-200 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
                          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold text-amber-300 mb-0.5">Service Coverage Restriction</p>
                            <p className="text-amber-200/90 leading-relaxed">
                              FiberX services are exclusively available in Cavite province. We currently only serve regions within Cavite.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 5. Address (Street & Barangay) */}
                    <div>
                      <label htmlFor="hero-address" className="block text-xs font-bold uppercase tracking-wider text-purple-200 mb-1.5">
                        Installation Address <span className="text-[#00F0FF]">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-300">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          id="hero-address"
                          name="installationAddress"
                          placeholder="House/Unit No., Street, Subdivision, Barangay"
                          value={formData.installationAddress}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-3.5 py-2.5 bg-black/35 border rounded-xl text-sm text-white placeholder:text-purple-300/50 font-medium focus:outline-none focus:ring-2 transition-all ${
                            formErrors.installationAddress ? 'border-rose-400 focus:ring-rose-400/30' : 'border-white/15 focus:border-blue-400 focus:ring-blue-500/30'
                          }`}
                        />
                      </div>
                      {formErrors.installationAddress && (
                        <p className="text-[11px] text-rose-300 font-medium mt-1">{formErrors.installationAddress}</p>
                      )}
                    </div>

                    {/* Submit Action Button */}
                    <button
                      type="submit"
                      id="hero-form-submit-btn"
                      disabled={isSubmitting || formData.caviteLocation === 'Others'}
                      className={`w-full mt-2 text-white font-extrabold text-base py-3.5 px-6 rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                        formData.caviteLocation === 'Others'
                          ? 'bg-slate-700/60 text-slate-300 cursor-not-allowed border border-white/10'
                          : 'bg-[#2A4BFF] hover:bg-[#1E3BB8] active:scale-[0.99] hover:shadow-lg shadow-black/20 disabled:opacity-75'
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Processing Application...</span>
                        </span>
                      ) : formData.caviteLocation === 'Others' ? (
                        <span>Cavite Regions Only</span>
                      ) : (
                        <>
                          <span>Apply Now</span>
                          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
