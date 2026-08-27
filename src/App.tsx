import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LogoCarousel } from './components/LogoCarousel';
import { PricingSection } from './components/PricingSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { FaqSection } from './components/FaqSection';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { CoverageModal } from './components/CoverageModal';
import { SpeedTestModal } from './components/SpeedTestModal';
import { WhyUsModal } from './components/WhyUsModal';
import { LeadFormData, Plan } from './types';

export default function App() {
  // Modal & Selection states
  const [selectedPlanId, setSelectedPlanId] = useState('plan-1500');
  const [coverageModalOpen, setCoverageModalOpen] = useState(false);
  const [speedTestModalOpen, setSpeedTestModalOpen] = useState(false);
  const [whyUsModalOpen, setWhyUsModalOpen] = useState(false);

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
    // Handled in-place within the form
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-cyan-300 selection:text-slate-950 font-sans">
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

      {/* Modals */}
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
