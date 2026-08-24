import React from 'react';
import { X, ShieldCheck, Zap, Server, Activity, ArrowRight, CheckCircle2 } from 'lucide-react';

interface WhyUsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSubscribe: () => void;
}

export const WhyUsModal: React.FC<WhyUsModalProps> = ({
  isOpen,
  onClose,
  onOpenSubscribe,
}) => {
  if (!isOpen) return null;

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

        <div className="bg-gradient-to-r from-[#12082b] to-[#251052] p-6 sm:p-8 text-white">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-bold mb-2">
            <Server className="w-3.5 h-3.5 fill-cyan-400" />
            Engineering & Infrastructure
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
            The FiberX Optical Architecture
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Why 100% Pure End-to-End Glass Fiber Outperforms Legacy Copper & Hybrid Coaxial.
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#2A4BFF] flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-sm">
                Direct Peering with CDN Giants
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct in-country optical cache peering with Google, Netflix, Steam, AWS, and Cloudflare to cut latency down to 2ms.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#2A4BFF] flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-sm">
                Symmetric 1:1 Uplink Speeds
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Upload files, 4K livestream, host Zoom calls, and seed torrents at the exact same full speed as your downloads.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#2A4BFF] flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-sm">
                Dual-Ring Redundant Backbone
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automatic sub-50ms failover routing protects your connection against submarine cable cuts or localized utility faults.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#2A4BFF] flex items-center justify-center font-bold text-sm">
                4
              </div>
              <h4 className="font-bold text-slate-900 text-sm">
                FastPath™ Low-Jitter Routing
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hardware-accelerated packet forwarding prioritizes UDP gaming voice and esports sessions over background traffic.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                onClose();
                onOpenSubscribe();
              }}
              className="w-full py-3.5 px-6 rounded-xl bg-[#2A4BFF] hover:bg-[#1E3DD9] text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Get Connected to FiberX Network</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
