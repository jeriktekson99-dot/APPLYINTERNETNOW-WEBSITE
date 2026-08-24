import React, { useState } from 'react';
import { 
  Zap, 
  MapPin, 
  ArrowRight, 
  User, 
  Phone, 
  Mail, 
  CheckCircle2, 
  ChevronDown
} from 'lucide-react';
import { LeadFormData } from '../types';
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
  });

  React.useEffect(() => {
    if (selectedPlanId) {
      setFormData((prev) => ({ ...prev, selectedPlanId }));
    }
  }, [selectedPlanId]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

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
    if (!formData.installationAddress.trim()) errors.installationAddress = 'Installation address is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (onFormSubmitted) {
        onFormSubmitted(formData);
      }
    }, 600);
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
              {/* Solid-colored 'Get Started' button with rounded corners and white text */}
              <button
                type="button"
                id="hero-get-started-btn"
                onClick={handleGetStarted}
                className="bg-[#2A4BFF] hover:bg-[#1E3BB8] text-white font-bold text-base px-8 py-4 rounded-2xl shadow-md hover:shadow-lg shadow-black/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer flex items-center gap-2.5"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>

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

          {/* Right Side: Apply Now Form Card */}
          <div className="lg:col-span-6 relative scroll-mt-28" id="hero-apply-form">
            {/* Form Container */}
            <div className="relative z-10 bg-[#160836] rounded-3xl p-6 sm:p-8 shadow-xl border border-violet-800/60 text-white">
              
              {/* Form Header */}
              <div className="pb-3 mb-5 border-b border-white/10">
                <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Apply Now
                </h2>
              </div>

              {/* Form Body */}
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

                {/* 2. Full Name */}
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
                      placeholder="e.g. Alex Henderson"
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

                {/* 3 & 4. Email and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
                        placeholder="alex@example.com"
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
                        placeholder="+1 (555) 019-2834"
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
                </div>

                {/* 5. Address */}
                <div>
                  <label htmlFor="hero-address" className="block text-xs font-bold uppercase tracking-wider text-purple-200 mb-1.5">
                    Address <span className="text-[#00F0FF]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-300">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="hero-address"
                      name="installationAddress"
                      placeholder="Unit 14B, 742 Evergreen Terrace, Springfield"
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
                  disabled={isSubmitting}
                  className="w-full mt-2 bg-[#2A4BFF] hover:bg-[#1E3BB8] active:scale-[0.99] text-white font-extrabold text-base py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg shadow-black/20 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing Application...</span>
                    </span>
                  ) : (
                    <>
                      <span>Apply Now</span>
                      <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
