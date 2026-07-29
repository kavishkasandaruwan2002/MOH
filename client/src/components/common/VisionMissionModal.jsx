import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Compass, X, Sparkles, HeartPulse, Award, ShieldCheck, Globe } from 'lucide-react';

export const VisionMissionModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Background Overlay with 15px Blur Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-[15px] transition-all"
        />

        {/* Centered Glassmorphism Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="relative w-full max-w-4xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-[15px] rounded-3xl shadow-2xl border border-white/40 dark:border-slate-700/80 overflow-hidden z-10 my-8 font-sans"
        >
          {/* Subtle Background Animated Waves Accent */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-gradient-to-br from-[#2E7D6B]/20 to-[#4DB6AC]/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 bg-gradient-to-tr from-emerald-600/15 to-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>

          {/* Modal Header */}
          <div className="bg-gradient-to-r from-[#2E7D6B] via-[#236355] to-teal-900 text-white p-6 sm:p-8 flex items-center justify-between relative overflow-hidden border-b border-white/10">
            <div className="flex items-center gap-3.5 z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-md">
                <Target className="w-6 h-6 text-[#4DB6AC]" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-extrabold uppercase tracking-wider text-teal-100 border border-white/20">
                  Government Healthcare Mandate
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
                  Vision & Mission Statement
                </h2>
                <p className="text-xs text-teal-100 font-medium">
                  MOH Office – Buttala • Medical Officer of Health Division
                </p>
              </div>
            </div>

            {/* Close Button (X) */}
            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition backdrop-blur-md border border-white/20 z-10"
              title="Close modal (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-8 max-h-[75vh] overflow-y-auto">

            {/* Trilingual Vision Cards Grid */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                <Compass className="w-5 h-5 text-[#2E7D6B] dark:text-[#4DB6AC]" />
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white uppercase tracking-wider">
                  Our Public Vision
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* 1. Sinhala Vision Card */}
                <div className="bg-slate-50 dark:bg-slate-800/80 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-md space-y-3 relative flex flex-col justify-between group hover:border-[#2E7D6B] transition-colors">
                  <div className="space-y-3">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#2E7D6B] text-white font-bold text-xs shadow-xs">
                      දැක්ම
                    </span>
                    <div className="text-4xl text-[#2E7D6B] font-serif leading-none opacity-40">“</div>
                    <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed font-sans -mt-3">
                      ප්‍රජා සෞඛ්‍ය සේවයේ ප්‍රමුඛයා වීම
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider border-t border-slate-200 dark:border-slate-700 pt-3 block">
                    Sinhala Version
                  </span>
                </div>

                {/* 2. English Vision Card */}
                <div className="bg-slate-50 dark:bg-slate-800/80 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-md space-y-3 relative flex flex-col justify-between group hover:border-[#2E7D6B] transition-colors">
                  <div className="space-y-3">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#2E7D6B] text-white font-bold text-xs uppercase tracking-wider shadow-xs">
                      VISION
                    </span>
                    <div className="text-4xl text-[#2E7D6B] font-serif leading-none opacity-40">“</div>
                    <p className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white leading-relaxed -mt-3">
                      To become the leading provider of community health service
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider border-t border-slate-200 dark:border-slate-700 pt-3 block">
                    English Version
                  </span>
                </div>

                {/* 3. Tamil Vision Card */}
                <div className="bg-slate-50 dark:bg-slate-800/80 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-md space-y-3 relative flex flex-col justify-between group hover:border-[#2E7D6B] transition-colors">
                  <div className="space-y-3">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#BE185D] text-white font-bold text-xs shadow-xs">
                      பார்வை
                    </span>
                    <div className="text-4xl text-[#BE185D] font-serif leading-none opacity-40">“</div>
                    <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed -mt-3">
                      உயர்தர சமூக சுகாதார சேவையை வழங்குவதில் ஒரு முன்னணி முகமாக இருப்பது
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider border-t border-slate-200 dark:border-slate-700 pt-3 block">
                    Tamil Version
                  </span>
                </div>

              </div>
            </div>

            {/* Trilingual Mission Cards Grid */}
            <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                <HeartPulse className="w-5 h-5 text-[#4DB6AC]" />
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white uppercase tracking-wider">
                  Our Public Mission
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Sinhala Mission */}
                <div className="bg-slate-50 dark:bg-slate-800/80 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-md space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#2E7D6B]/20 text-[#2E7D6B] dark:text-[#4DB6AC] font-bold text-xs border border-[#2E7D6B]/30">
                      මෙහෙවර
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 leading-relaxed pt-2">
                      සුවපත් ප්‍රජාවක් උදෙසා උසස් සෞඛ්‍ය සංරක්ෂණ සහ රෝග නිවාරණ සේවාවක් සැලසීම.
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Sinhala Mission</span>
                </div>

                {/* English Mission */}
                <div className="bg-slate-50 dark:bg-slate-800/80 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-md space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#2E7D6B]/20 text-[#2E7D6B] dark:text-[#4DB6AC] font-bold text-xs uppercase tracking-wider border border-[#2E7D6B]/30">
                      MISSION
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 leading-relaxed pt-2">
                      To deliver high-quality preventative and community healthcare services to achieve a healthy Buttala community.
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">English Mission</span>
                </div>

                {/* Tamil Mission */}
                <div className="bg-slate-50 dark:bg-slate-800/80 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-md space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#BE185D]/20 text-[#BE185D] font-bold text-xs border border-[#BE185D]/30">
                      நோக்கம்
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 leading-relaxed pt-2">
                      மக்களுக்கு சிறந்த தடுப்பு மற்றும் சுகாதார சேவைகளை வழங்குதல்.
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tamil Mission</span>
                </div>

              </div>
            </div>

          </div>

          {/* Modal Footer */}
          <div className="p-5 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#2E7D6B]" />
              <span>Ministry of Health Sri Lanka • Uva Provincial Health Services</span>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-[#2E7D6B] hover:bg-[#236355] text-white font-extrabold text-xs shadow-md transition"
            >
              Close Window
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
