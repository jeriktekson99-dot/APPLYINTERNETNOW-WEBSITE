import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LogoCarousel } from './components/LogoCarousel';
import { PricingSection } from './components/PricingSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { FaqSection } from './components/FaqSection';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { SubscribeModal } from './components/SubscribeModal';
import { CoverageModal } from './components/CoverageModal';
import { SpeedTestModal } from './components/SpeedTestModal';
import { WhyUsModal } from './components/WhyUsModal';
import { LeadFormData, Plan } from './types';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

export default function App() {
  // Modal states
  const [subscribeModalOpen, setSubscribeModalOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState('plan-1500');
  const [coverageModalOpen, setCoverageModalOpen] = useState(false);
  const [speedTestModalOpen, setSpeedTestModalOpen] = useState(false);
  const [whyUsModalOpen, setWhyUsModalOpen] = useState(false);
  
  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const scrollToHeroForm = (planId?: string) => {
    if (planId) {
      setSelectedPlanId(planId);
    }
    // Scroll directly to the very top of the website
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setTimeout(() => {
      const nameInput = document.querySelector('#hero-full-name') as HTMLInputElement;
      if (nameInput) {
        nameInput.focus({ preventScroll: true });
      }
    }, 450);
  };

  const handleOpenSubscribe = (planId?: string) => {
    scrollToHeroForm(planId);
  };

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlanId(plan.id);
    scrollToHeroForm(plan.id);
  };

  const handleHeroFormSubmitted = (data: LeadFormData) => {
    showToast(`🎉 Thank you, ${data.fullName}! Your FiberX application has been received. Our team will contact you shortly.`);
    // Open confirmation modal
    setSelectedPlanId(data.selectedPlanId);
    setSubscribeModalOpen(true);
  };

  const handleSubscribeModalSuccess = (data: LeadFormData) => {
    showToast(`✅ Application logged for ${data.fullName}! Check your phone for technician arrival updates.`);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-cyan-300 selection:text-slate-950 font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 max-w-md bg-[#140830] text-white p-4 rounded-2xl shadow-2xl border border-cyan-400/40 flex items-start gap-3 animate-in slide-in-from-top-4 duration-300">
          <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-[#00F0FF] flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div className="flex-1 text-xs font-medium leading-relaxed">
            {toastMessage}
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        onOpenSubscribe={handleOpenSubscribe}
        onOpenCoverage={() => setCoverageModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1 & 2. Hero Section with Get Started & Visual Graphic */}
        <HeroSection
          selectedPlanId={selectedPlanId}
          onPlanChange={(id) => setSelectedPlanId(id)}
          onFormSubmitted={handleHeroFormSubmitted}
          onOpenCoverage={() => setCoverageModalOpen(true)}
          onOpenSubscribe={handleOpenSubscribe}
        />

        {/* 3. Infinite Logo Marquee Carousel */}
        <LogoCarousel />

        {/* 4. Price & Plans Section */}
        <PricingSection onSelectPlan={handleSelectPlan} />

        {/* 5. Why Choose Us (Asymmetric 2x2 Layout with Highlighted Box) */}
        <WhyChooseUs onSubscribe={() => scrollToHeroForm()} />

        {/* 6. Frequently Asked Questions (Accordion UI) */}
        <FaqSection />

        {/* 7. Pre-Footer CTA Banner */}
        <CtaBanner
          onOpenSubscribe={() => scrollToHeroForm()}
          onOpenCoverage={() => setCoverageModalOpen(true)}
        />
      </main>

      {/* 8. Footer */}
      <Footer
        onOpenCoverage={() => setCoverageModalOpen(true)}
        onOpenSubscribe={() => scrollToHeroForm()}
      />

      {/* Interactive Modals */}
      <SubscribeModal
        isOpen={subscribeModalOpen}
        onClose={() => setSubscribeModalOpen(false)}
        selectedPlanId={selectedPlanId}
        onSuccess={handleSubscribeModalSuccess}
      />

      <CoverageModal
        isOpen={coverageModalOpen}
        onClose={() => setCoverageModalOpen(false)}
        onSelectPlan={(speed) => {
          scrollToHeroForm(speed.includes('100') ? 'plan-1250' : 'plan-1500');
        }}
      />

      <SpeedTestModal
        isOpen={speedTestModalOpen}
        onClose={() => setSpeedTestModalOpen(false)}
        onSelectFiberPlan={() => scrollToHeroForm()}
      />

      <WhyUsModal
        isOpen={whyUsModalOpen}
        onClose={() => setWhyUsModalOpen(false)}
        onOpenSubscribe={() => scrollToHeroForm()}
      />
    </div>
  );
}
