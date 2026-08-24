import React from 'react';
import { 
  Check, 
  X, 
  Sparkles, 
  Users, 
  ArrowRight
} from 'lucide-react';
import { HOME_PLANS } from '../data/ispData';
import { Plan } from '../types';

interface PricingSectionProps {
  onSelectPlan: (plan: Plan) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const activePlans = HOME_PLANS;

  return (
    <section id="packages" className="py-16 sm:py-24 bg-white relative scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display text-4xl sm:text-5xl font-black text-[#140830] tracking-tight">
            Choose your Package
          </h2>
        </div>

        {/* Pricing Cards Grid (Rendering 5 plans in responsive grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 items-stretch pt-4">
          {activePlans.map((plan) => {
            const isHighlight = plan.isPopular;

            return (
              <div
                key={plan.id}
                id={`pricing-card-${plan.id}`}
                className={`relative rounded-3xl transition-all duration-300 flex flex-col justify-between ${
                  isHighlight
                    ? 'bg-[#160836] text-white shadow-2xl shadow-purple-950/30 border-2 border-violet-600 -translate-y-2'
                    : 'bg-white text-slate-900 shadow-xl shadow-slate-200/50 border border-slate-200/80 hover:shadow-2xl hover:border-slate-300'
                } p-5 sm:p-6`}
              >
                {/* Popular Badge if applicable */}
                {isHighlight && (
                  <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-[#00F0FF] text-slate-950 text-[10px] font-black uppercase tracking-widest px-3.5 py-1 rounded-full shadow-md flex items-center gap-1.5 whitespace-nowrap">
                    <Sparkles className="w-3 h-3 fill-slate-950" />
                    Most Popular Choice
                  </div>
                )}

                {/* Top Section: Plan Name & Speed Ring Gauge */}
                <div className={`flex flex-col items-center text-center pt-2 pb-5 border-b ${
                  isHighlight ? 'border-white/10' : 'border-black/5'
                }`}>
                  <span className={`font-display font-black text-lg sm:text-xl tracking-tight mb-2 min-h-[3rem] flex items-center justify-center ${
                    isHighlight ? 'text-white' : 'text-slate-900'
                  }`}>
                    {plan.name}
                  </span>

                  <div className="relative w-24 h-24 flex items-center justify-center my-1">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      {/* Background Track */}
                      <path
                        className={isHighlight ? 'text-violet-900/60' : 'text-slate-100'}
                        strokeWidth="3"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      {/* Progress Arc */}
                      <path
                        className={isHighlight ? 'text-[#00F0FF]' : 'text-[#2A4BFF]'}
                        strokeDasharray={`${plan.gaugePercentage}, 100`}
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    
                    {/* Gauge Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className={`font-display font-black text-2xl tracking-tight leading-none ${
                        isHighlight ? 'text-white' : 'text-slate-900'
                      }`}>
                        {plan.speedLabel}
                      </span>
                      <span className={`text-[11px] font-bold mt-0.5 ${
                        isHighlight ? 'text-purple-300' : 'text-slate-600'
                      }`}>
                        {plan.speedUnit}
                      </span>
                    </div>
                  </div>

                  {/* Headline speed tag */}
                  <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mt-2 ${
                    isHighlight
                      ? 'text-cyan-300 bg-cyan-950/80 border border-cyan-500/30'
                      : 'text-blue-700 bg-blue-50'
                  }`}>
                    UP TO {plan.speed} MBPS
                  </span>
                </div>

                {/* Middle: Features List */}
                <div className="py-5 space-y-3 flex-1">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      {feat.included ? (
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            isHighlight
                              ? 'bg-cyan-500/20 text-[#00F0FF]'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                          <X className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                      <span
                        className={`text-xs sm:text-[13px] ${
                          feat.included
                            ? isHighlight
                              ? 'text-purple-100 font-medium'
                              : 'text-slate-700 font-medium'
                            : 'text-slate-400 line-through'
                        }`}
                      >
                        {feat.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom: Price Pill and Subscribe Button */}
                <div className={`pt-4 border-t space-y-3.5 ${
                  isHighlight ? 'border-white/10' : 'border-black/5'
                }`}>
                  {/* Price Badge in Dark Capsule */}
                  <div className="flex justify-center">
                    <div className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full shadow-md ${
                      isHighlight
                        ? 'bg-black/40 border border-white/15 text-white'
                        : 'bg-[#140830] text-white'
                    }`}>
                      <span className="text-[#00F0FF] font-black text-sm">{plan.currency}</span>
                      <span className="font-display font-black text-lg text-white">
                        {plan.price.toLocaleString()}
                      </span>
                      <span className="text-[11px] font-medium text-slate-300">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    type="button"
                    onClick={() => onSelectPlan(plan)}
                    className="w-full py-3 px-4 rounded-full font-bold text-xs sm:text-sm transition-all duration-200 shadow-md cursor-pointer flex items-center justify-center gap-2 bg-[#2A4BFF] hover:bg-[#1E3DD9] text-white shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30"
                  >
                    <span>Subscribe Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
