import React from 'react';

interface FooterProps {
  onOpenCoverage?: () => void;
  onOpenSubscribe?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer id="footer" className="bg-[#0b0814] text-white py-12 border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-3">
        <p className="text-sm font-semibold text-slate-200">
          © 2026 Authorized Sales Partner – Converge FiberX Applications. All Rights Reserved.
        </p>
        <p className="text-xs text-slate-400 leading-relaxed max-w-3xl mx-auto">
          Disclaimer: This website is managed by an authorized sales agent for Converge ICT Solutions Inc. for application and lead processing purposes. All trademarks and brand names belong to their respective owners.
        </p>
      </div>
    </footer>
  );
};
