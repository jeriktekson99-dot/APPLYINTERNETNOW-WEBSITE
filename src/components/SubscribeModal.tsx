import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  Zap, 
  Sparkles, 
  ShieldCheck, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  User, 
  Phone, 
  Mail, 
  MapPin 
} from 'lucide-react';
import { Plan, LeadFormData } from '../types';
import { HOME_PLANS, BUSINESS_PLANS } from '../data/ispData';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlanId?: string;
  onSuccess: (data: LeadFormData) => void;
}

export const SubscribeModal: React.FC<SubscribeModalProps> = ({
  isOpen,
  onClose,
  selectedPlanId = 'plan-1500',
  onSuccess,
}) => {
  const allPlans = [...HOME_PLANS, ...BUSINESS_PLANS];
  const [currentPlanId, setCurrentPlanId] = useState(selectedPlanId);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');

  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    mobileNumber: '',
    email: '',
    installationAddress: '',
    selectedPlanId: selectedPlanId,
    serviceType: 'home',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (selectedPlanId) {
      setCurrentPlanId(selectedPlanId);
      setFormData((prev) => ({ ...prev, selectedPlanId }));
    }
  }, [selectedPlanId]);

  if (!isOpen) return null;

  const currentPlan = allPlans.find((p) => p.id === currentPlanId) || HOME_PLANS[1];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSelectPlan = (planId: string) => {
    setCurrentPlanId(planId);
    setFormData((prev) => ({ ...prev, selectedPlanId: planId }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
    if (!formData.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile number is required';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.installationAddress.trim()) newErrors.installationAddress = 'Installation address is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const generatedTicket = 'FX-' + Math.floor(100000 + Math.random() * 900000);
    setTicketNumber(generatedTicket);
    setIsSuccess(true);
    onSuccess(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          /* Confirmation State */
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase mb-2">
                Application Received Successfully
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-900">
                Welcome to FiberX Network!
              </h3>
              <p className="text-slate-600 text-sm mt-2 max-w-md mx-auto">
                Your fiber application for <span className="font-bold text-slate-900">{currentPlan.name} ({currentPlan.speed} {currentPlan.speedUnit})</span> has been logged into our regional provisioning system.
              </p>
            </div>

            {/* Ticket Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-sm mx-auto text-left">
              <div className="text-xs text-slate-500 font-semibold">Priority Application Reference</div>
              <div className="text-xl font-extrabold text-[#2A4BFF] font-mono tracking-wider">{ticketNumber}</div>
              <div className="text-xs text-slate-600 mt-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>Technician Dispatch Window: Tomorrow, 9:00 AM - 1:00 PM</span>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              A certified FiberX field team will contact you via WhatsApp/SMS at <span className="font-bold text-slate-800">{formData.mobileNumber}</span> before arrival.
            </p>

            <button
              onClick={onClose}
              className="bg-[#2A4BFF] hover:bg-[#1E3DD9] text-white font-bold text-sm px-8 py-3 rounded-full transition-all shadow-md cursor-pointer"
            >
              Done & Return to Homepage
            </button>
          </div>
        ) : (
          /* Application Form */
          <div>
            {/* Header with Selected Plan Overview */}
            <div className="bg-gradient-to-r from-[#12082b] to-[#251052] p-6 sm:p-8 text-white">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-bold">
                  <Zap className="w-3.5 h-3.5 fill-cyan-400" />
                  Fast Fiber Subscription
                </div>
                <div className="text-xs font-semibold text-slate-300">
                  Step 1 of 1 • Instant Registration
                </div>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    Subscribe to {currentPlan.name}
                  </h3>
                  <p className="text-xs text-cyan-300 mt-0.5">
                    {currentPlan.speed} {currentPlan.speedUnit} Symmetrical Optical Fiber
                  </p>
                </div>
                <div className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                  <span className="text-[#FFD000] font-black text-sm">{currentPlan.currency}</span>
                  <span className="font-display font-black text-2xl text-white">
                    {currentPlan.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-300">{currentPlan.period}</span>
                </div>
              </div>
            </div>

            {/* Quick Plan Switcher */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Change Speed Tier:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                  {HOME_PLANS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleSelectPlan(p.id)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        currentPlanId === p.id
                          ? 'border-[#2A4BFF] bg-blue-50/70 text-[#2A4BFF] font-bold shadow-xs ring-2 ring-[#2A4BFF]/20'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900 truncate">{p.name}</div>
                      <div className="text-sm font-black text-[#2A4BFF]">{p.speed} {p.speedUnit}</div>
                      <div className="text-[11px] text-slate-500 font-medium">{p.currency}{p.price.toLocaleString()} {p.period}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form inputs */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className={`w-full pl-9 pr-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 ${
                          errors.fullName ? 'border-red-400 focus:ring-red-400/20' : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500'
                        }`}
                      />
                    </div>
                    {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 000-0000"
                        className={`w-full pl-9 pr-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 ${
                          errors.mobileNumber ? 'border-red-400 focus:ring-red-400/20' : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500'
                        }`}
                      />
                    </div>
                    {errors.mobileNumber && <p className="text-[11px] text-red-500 mt-1">{errors.mobileNumber}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className={`w-full pl-9 pr-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 ${
                        errors.email ? 'border-red-400 focus:ring-red-400/20' : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Installation Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      name="installationAddress"
                      value={formData.installationAddress}
                      onChange={handleInputChange}
                      placeholder="Street address, Apt/Unit, City, Zip"
                      className={`w-full pl-9 pr-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 ${
                        errors.installationAddress ? 'border-red-400 focus:ring-red-400/20' : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500'
                      }`}
                    />
                  </div>
                  {errors.installationAddress && <p className="text-[11px] text-red-500 mt-1">{errors.installationAddress}</p>}
                </div>

                {/* Free Installation Note */}
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Promo Applied: Free Standard Optical Installation + Standard Dual-Band Wi-Fi Gateway Included!</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#FFD000] hover:bg-[#E5BC00] text-[#140830] font-extrabold text-base transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Confirm Subscription & Schedule Install</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
