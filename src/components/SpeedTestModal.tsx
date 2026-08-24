import React, { useState, useEffect } from 'react';
import { X, Zap, Gauge, ArrowRight, Play, RefreshCw, CheckCircle2 } from 'lucide-react';

interface SpeedTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFiberPlan: () => void;
}

export const SpeedTestModal: React.FC<SpeedTestModalProps> = ({
  isOpen,
  onClose,
  onSelectFiberPlan,
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [testStage, setTestStage] = useState<'idle' | 'ping' | 'download' | 'upload' | 'complete'>('idle');
  const [ping, setPing] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setIsRunning(false);
      setTestStage('idle');
      setCurrentSpeed(0);
      setDownloadSpeed(0);
      setUploadSpeed(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const startTest = () => {
    setIsRunning(true);
    setTestStage('ping');
    setCurrentSpeed(0);
    setPing(18);

    // Ping stage
    setTimeout(() => {
      setTestStage('download');
      let speed = 5;
      const downloadInterval = setInterval(() => {
        speed += Math.floor(Math.random() * 8) + 3;
        if (speed >= 38) {
          clearInterval(downloadInterval);
          setDownloadSpeed(38.4);
          setCurrentSpeed(38.4);
          
          // Upload stage
          setTestStage('upload');
          let upSpeed = 2;
          const upInterval = setInterval(() => {
            upSpeed += Math.floor(Math.random() * 4) + 1;
            if (upSpeed >= 12) {
              clearInterval(upInterval);
              setUploadSpeed(11.8);
              setCurrentSpeed(11.8);
              setTestStage('complete');
              setIsRunning(false);
            } else {
              setUploadSpeed(upSpeed);
              setCurrentSpeed(upSpeed);
            }
          }, 80);

        } else {
          setCurrentSpeed(speed);
        }
      }, 70);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="bg-gradient-to-r from-[#12082b] to-[#251052] p-6 sm:p-8 text-white text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-bold mb-2">
            <Gauge className="w-3.5 h-3.5 fill-cyan-400" />
            Interactive Speed Benchmark
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Broadband Speed Meter
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Compare your current connection against FiberX Gigabit Optical Speed.
          </p>
        </div>

        <div className="p-6 sm:p-8 flex flex-col items-center">
          
          {/* Main Gauge Visual */}
          <div className="relative w-44 h-44 flex items-center justify-center my-4">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100"
                strokeWidth="3"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#2A4BFF] transition-all duration-100"
                strokeDasharray={`${Math.min(100, (currentSpeed / 100) * 100)}, 100`}
                strokeWidth="3.2"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-black text-slate-900 font-display leading-none">
                {currentSpeed.toFixed(1)}
              </span>
              <span className="text-xs font-bold text-slate-400 uppercase mt-1">
                Mbps
              </span>
              <span className="text-[10px] font-bold text-cyan-600 uppercase mt-0.5">
                {testStage === 'idle' ? 'Ready' : testStage.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Metrics Trio */}
          <div className="grid grid-cols-3 gap-3 w-full mb-6 text-center">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-[10px] uppercase font-bold text-slate-400">Ping</div>
              <div className="text-base font-extrabold text-slate-800">
                {ping ? `${ping} ms` : '--'}
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-[10px] uppercase font-bold text-slate-400">Download</div>
              <div className="text-base font-extrabold text-slate-800">
                {downloadSpeed ? `${downloadSpeed} Mbps` : '--'}
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-[10px] uppercase font-bold text-slate-400">Upload</div>
              <div className="text-base font-extrabold text-slate-800">
                {uploadSpeed ? `${uploadSpeed} Mbps` : '--'}
              </div>
            </div>
          </div>

          {/* Test Control Button */}
          {testStage === 'idle' && (
            <button
              type="button"
              onClick={startTest}
              className="w-full py-3.5 rounded-xl bg-[#2A4BFF] hover:bg-[#1E3DD9] text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start Speed Benchmark</span>
            </button>
          )}

          {isRunning && (
            <button
              disabled
              className="w-full py-3.5 rounded-xl bg-slate-200 text-slate-600 font-bold text-sm flex items-center justify-center gap-2 cursor-wait"
            >
              <RefreshCw className="w-4 h-4 animate-spin text-slate-500" />
              <span>Testing Network Stream...</span>
            </button>
          )}

          {testStage === 'complete' && (
            <div className="w-full space-y-4 animate-in fade-in duration-200">
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-center">
                <div className="text-xs font-bold text-amber-800 uppercase">
                  Upgrade Opportunity Detected
                </div>
                <p className="text-xs text-slate-700 mt-1">
                  Your current line is reaching ~38 Mbps. Upgrade to FiberX 100 Mbps or 300 Mbps for up to <strong className="text-slate-900">8x faster downloads</strong> and 4ms low-ping gaming!
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={startTest}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Retest
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectFiberPlan();
                  }}
                  className="flex-2 py-3 bg-[#FFD000] hover:bg-[#E5BC00] text-[#140830] text-xs font-extrabold rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Switch to FiberX Gigabit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
