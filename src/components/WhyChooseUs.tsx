import React from 'react';
import { 
  Zap, 
  TrendingUp, 
  Gamepad2, 
  Tv, 
  ArrowRight, 
  CheckCircle
} from 'lucide-react';

interface WhyChooseUsProps {
  onSubscribe: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onSubscribe }) => {

  return (
    <section id="why-us" className="py-16 sm:py-24 bg-white relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Asymmetric 2-Column Main Layout matching the Reference Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Prominent Title Block + Description + Subscribe Button */}
          <div className="lg:col-span-5 flex flex-col pt-2">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-[#140830] tracking-tight leading-[1.08] mb-5">
                Why Should <br />
                Choose Us
              </h2>

              <p className="text-base text-slate-600 leading-relaxed mb-6 max-w-md">
                We engineered our 100% pure fiber optic network from the ground up to eliminate bottlenecks, throttling, and peak-hour lag. Get the bandwidth your modern connected home truly deserves.
              </p>

              {/* Quick Trust Badges */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-[#2A4BFF] flex items-center justify-center shrink-0">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <span>Direct Tier-1 Global Backbone Peering</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-[#2A4BFF] flex items-center justify-center shrink-0">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <span>Zero Fair Usage Policy (FUP) Data Caps</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-[#2A4BFF] flex items-center justify-center shrink-0">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <span>Fast-Tracked Application & Express Processing</span>
                </div>
              </div>
            </div>

            {/* Subscribe Now Button */}
            <div>
              <button
                type="button"
                id="why-choose-us-subscribe-btn"
                onClick={onSubscribe}
                className="bg-[#2A4BFF] hover:bg-[#1C3BD8] text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer inline-flex items-center gap-2"
              >
                <span>Subscribe Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: 2x2 Feature Grid (Matching exact arrangement and Yellow Highlight in reference image) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Card 1: Blazing Fast Speeds */}
            <div
              id="feature-card-blazing-fast"
              className="bg-white rounded-3xl p-6 sm:p-7 shadow-lg shadow-slate-100 border border-slate-200/80 hover:shadow-xl hover:border-slate-300 transition-all flex flex-col justify-start"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2A4BFF] mb-5">
                  <Zap className="w-6 h-6 fill-blue-500 text-[#2A4BFF]" />
                </div>
                <h3 className="font-display font-extrabold text-xl text-[#140830] tracking-tight mb-2">
                  Blazing Fast Speeds
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Ranked #1 for internet speed and high-availability server services with symmetrical up/down bandwidth.
                </p>
              </div>
            </div>

            {/* Card 2: Higher Speeds For Less! */}
            <div
              id="feature-card-higher-speeds"
              className="bg-white rounded-3xl p-6 sm:p-7 shadow-lg shadow-slate-100 border border-slate-200/80 hover:shadow-xl hover:border-slate-300 transition-all flex flex-col justify-start"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2A4BFF] mb-5">
                  <TrendingUp className="w-6 h-6 text-[#2A4BFF]" />
                </div>
                <h3 className="font-display font-extrabold text-xl text-[#140830] tracking-tight mb-2">
                  Higher Speeds For Less!
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  For most speeds, the lowest cost per Mbps in the country – get significantly more bandwidth for what you pay.
                </p>
              </div>
            </div>

            {/* Card 3: Your Family's Favorite TV Channels */}
            <div
              id="feature-card-tv-channels"
              className="bg-white rounded-3xl p-6 sm:p-7 shadow-lg shadow-slate-100 border border-slate-200/80 hover:shadow-xl hover:border-slate-300 transition-all flex flex-col justify-start"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2A4BFF] mb-5">
                  <Tv className="w-6 h-6 text-[#2A4BFF]" />
                </div>
                <h3 className="font-display font-extrabold text-xl text-[#140830] tracking-tight mb-2">
                  Your Family's Favorite TV Channels
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  All your local favorites plus premium international 4K channels, Disney+, FOX, tvN, HBO, and live sports!
                </p>
              </div>
            </div>

            {/* Card 4: Built By Gamers For Gamers (Highlighted in Deep Purple) */}
            <div
              id="feature-card-built-for-gamers"
              className="bg-[#160836] rounded-3xl p-6 sm:p-7 shadow-xl shadow-purple-950/20 border border-violet-800/60 hover:shadow-2xl hover:border-violet-700 transition-all flex flex-col justify-start text-white"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#00F0FF] border border-white/10 flex items-center justify-center mb-5 shadow-sm">
                  <Gamepad2 className="w-6 h-6" />
                </div>
                <h3 className="font-display font-extrabold text-xl text-white tracking-tight mb-2">
                  Built By Gamers For Gamers
                </h3>
                <p className="text-sm text-purple-200/90 leading-relaxed">
                  Custom low-latency routing and BGP traffic prioritization means zero jitter, ultra-low ping, and smooth online play!
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
