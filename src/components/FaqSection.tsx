import React, { useState } from 'react';
import { 
  Plus, 
  Minus
} from 'lucide-react';
import { FAQ_ITEMS } from '../data/ispData';

export const FaqSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-slate-50 relative scroll-mt-20 border-t border-slate-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#140830] tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQ_ITEMS.map((faq) => {
            const isOpen = openIds.includes(faq.id);

            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-indigo-200 shadow-md ring-1 ring-indigo-500/10'
                    : 'border-slate-200/80 hover:border-slate-300 shadow-xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full py-4 sm:py-5 px-5 sm:px-6 flex items-center justify-between text-left gap-4 cursor-pointer group"
                >
                  <span className="font-display font-bold text-base sm:text-lg text-slate-900 group-hover:text-[#2A4BFF] transition-colors">
                    {faq.question}
                  </span>

                  {/* Expand / Collapse Icon indicator */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-slate-500 ${
                      isOpen ? 'text-[#2A4BFF]' : 'text-slate-400'
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-5 h-5 stroke-[2.5]" />
                    ) : (
                      <Plus className="w-5 h-5 stroke-[2.5]" />
                    )}
                  </div>
                </button>

                {/* Collapsible Answer Content */}
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-base text-slate-600 border-t border-slate-100 leading-relaxed space-y-3 bg-slate-50/50 animate-in fade-in duration-200">
                    {faq.answer.split('\n').map((paragraph, pIdx) => {
                      if (paragraph.startsWith('1.') || paragraph.startsWith('2.') || paragraph.startsWith('3.') || paragraph.startsWith('4.')) {
                        return (
                          <div key={pIdx} className="flex items-start gap-2.5 text-slate-700 font-medium">
                            <span className="w-5 h-5 rounded-full bg-blue-100 text-[#2A4BFF] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {paragraph.charAt(0)}
                            </span>
                            <span>{paragraph.substring(3)}</span>
                          </div>
                        );
                      }
                      if (paragraph.startsWith('•')) {
                        return (
                          <div key={pIdx} className="flex items-start gap-2.5 text-slate-700 ml-2">
                            <span className="text-[#2A4BFF] font-bold">•</span>
                            <span>{paragraph.substring(2)}</span>
                          </div>
                        );
                      }
                      return <p key={pIdx}>{paragraph}</p>;
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
