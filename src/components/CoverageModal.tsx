import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  CheckCircle2, 
  Zap, 
  Search, 
  ArrowRight, 
  Wifi, 
  Building, 
  Home, 
  ShieldCheck, 
  Calendar 
} from 'lucide-react';

interface CoverageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (speed: string) => void;
}

export const CoverageModal: React.FC<CoverageModalProps> = ({
  isOpen,
  onClose,
  onSelectPlan,
}) => {
  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
    }, 600);
  };

  const sampleAreas = [
    'Downtown Metropolis',
    'Oakland Green Valley',
    'Northridge Tech District',
    'Harbor View Subdivisions',
    'Evergreen Park Residential',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#12082b] to-[#251052] p-6 sm:p-8 text-white">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-bold mb-2">
            <MapPin className="w-3.5 h-3.5 fill-cyan-400" />
            Fiber Optic Coverage Checker
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Check Fiber Availability
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Verify whether 100% Pure Optical Gigabit Fiber is ready at your street or building.
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Search form */}
          <form onSubmit={handleSearch} className="space-y-3">
            <label className="block text-xs font-bold text-slate-700">
              Enter Street Address, Building, or Postal Code:
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. Bonifacio Global City, Taguig or Zip 1634"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={isSearching}
                className="px-6 py-3 bg-[#2A4BFF] hover:bg-[#1E3DD9] text-white text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer shrink-0 disabled:opacity-75"
              >
                {isSearching ? 'Checking...' : 'Verify'}
              </button>
            </div>
          </form>

          {/* Quick Click Samples */}
          {!hasSearched && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Popular Gigabit Live Areas:
              </span>
              <div className="flex flex-wrap gap-2">
                {sampleAreas.map((area) => (
                  <button
                    key={area}
                    type="button"
                    onClick={() => {
                      setQuery(area);
                      setIsSearching(true);
                      setTimeout(() => {
                        setIsSearching(false);
                        setHasSearched(true);
                      }, 400);
                    }}
                    className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <MapPin className="w-3 h-3 text-cyan-600" />
                    <span>{area}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Verified Results Card */}
          {hasSearched && (
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-emerald-700">
                    High-Speed Fiber Ready!
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    {query || 'Your Location'} is 100% Optical Fiber Covered
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Tier-1 Fiber Distribution Hub #FDH-904 is active on your street.
                  </p>
                </div>
              </div>

              {/* Stats Box */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-emerald-200/60 text-center">
                <div className="p-2 bg-white rounded-xl border border-emerald-100">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Max Speed</div>
                  <div className="text-base font-black text-slate-900">1,000 Mbps</div>
                </div>
                <div className="p-2 bg-white rounded-xl border border-emerald-100">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Latency</div>
                  <div className="text-base font-black text-emerald-600">2 - 4 ms</div>
                </div>
                <div className="p-2 bg-white rounded-xl border border-emerald-100">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Install Window</div>
                  <div className="text-base font-black text-slate-900">Next-Day</div>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => {
                  onClose();
                  onSelectPlan('50 Mbps');
                }}
                className="w-full py-3 bg-[#FFD000] hover:bg-[#E5BC00] text-[#140830] font-extrabold text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Proceed with Installation Application</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
