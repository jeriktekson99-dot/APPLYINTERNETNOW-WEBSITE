import React, { useState } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import subscribeFamilyImg from '../assets/images/subscribe_family_wifi_1787070578707.jpg';

interface CtaBannerProps {
  onOpenSubscribe: () => void;
  onOpenCoverage: () => void;
}

const EXTERNAL_IMG = "https://mb.com.ph/uploads/imported_images/mb-mkt-neo-prod-1-uploads/PLDT_Home_Wifi_family_c88640d048/PLDT_Home_Wifi_family_c88640d048.jpg";

export const CtaBanner: React.FC<CtaBannerProps> = ({
  onOpenSubscribe,
  onOpenCoverage,
}) => {
  const [imgSrc, setImgSrc] = useState(EXTERNAL_IMG);

  return (
    <section className="relative w-full bg-[#160836] text-white overflow-hidden py-16 sm:py-20 lg:py-24 border-y border-violet-900/60" id="cta-banner">
      {/* 1. Base Layer & Family Lifestyle Image (Layered with Left-to-Right Violet Fade) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <img
          src={imgSrc}
          onError={() => setImgSrc(subscribeFamilyImg)}
          alt="Family enjoying home wifi"
          referrerPolicy="no-referrer"
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

      {/* 2. Top subtle divider */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] mb-4">
          Come Subscribe <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-cyan-300 to-[#FFD000]">with Us</span>
        </h2>

        <p className="text-base sm:text-lg lg:text-xl text-purple-100/90 font-medium max-w-2xl mb-8 leading-relaxed">
          Ready to upgrade your internet experience? Apply today, enjoy tomorrow with guaranteed zero buffering and ultra-low ping.
        </p>

        {/* CTA Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            id="cta-banner-subscribe-btn"
            onClick={onOpenSubscribe}
            className="bg-[#2A4BFF] hover:bg-[#1E3BB8] active:scale-[0.99] text-white font-bold text-base px-8 py-4 rounded-2xl shadow-md hover:shadow-lg shadow-black/20 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex items-center gap-2"
          >
            <span>Subscribe Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            id="cta-banner-explore-packages-btn"
            onClick={() => {
              const el = document.querySelector('#packages');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-white/10 hover:bg-white/20 text-white font-semibold text-base px-8 py-4 rounded-2xl border border-white/20 backdrop-blur-md hover:border-white/40 shadow-xs transition-all duration-200 cursor-pointer flex items-center gap-2"
          >
            <span>Explore Packages</span>
            <ArrowRight className="w-4 h-4 text-[#00F0FF]" />
          </button>
        </div>
      </div>
    </section>
  );
};
