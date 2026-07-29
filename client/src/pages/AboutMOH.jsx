import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Target, Compass, HeartPulse, ShieldCheck, Heart, Users, Award, MapPin, Sparkles } from 'lucide-react';
import { VisionMissionModal } from '../components/common/VisionMissionModal';
import { MohAreaProfile } from '../components/profile/MohAreaProfile';

export const AboutMOH = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace('#', '');
      const elem = 
        document.getElementById(elementId) || 
        document.getElementById('moh-area-profile') || 
        document.getElementById('vision');
        
      if (elem) {
        setTimeout(() => {
          elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 font-sans">
      
      {/* Vision & Mission Modal */}
      <VisionMissionModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2E7D6B]/15 text-[#2E7D6B] dark:text-[#4DB6AC] text-xs font-extrabold border border-[#2E7D6B]/30 shadow-xs">
          <Sparkles className="w-4 h-4 text-[#4DB6AC]" />
          <span>Ministry of Health Sri Lanka</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          About MOH Office – Buttala
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
          The primary healthcare backbone of Buttala Division in Monaragala District. Providing comprehensive maternal and child health, disease prevention, vector control, food sanitation, and environmental health.
        </p>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TRILINGUAL VISION & MISSION SECTION */}
      {/* ------------------------------------------------------------- */}
      <section id="vision" className="scroll-mt-28 space-y-8 bg-gradient-to-br from-teal-900/10 via-emerald-900/5 to-slate-900/10 dark:from-slate-900 dark:to-slate-800 p-8 sm:p-12 rounded-3xl border border-[#2E7D6B]/30 shadow-xl relative overflow-hidden">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="space-y-1">
            <span className="px-3.5 py-1 rounded-full bg-[#2E7D6B] text-white text-[11px] font-extrabold uppercase tracking-wider">
              Public Healthcare Mandate
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Our Vision & Mission (දැක්ම සහ මෙහෙවර)
            </h2>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="px-6 py-3 rounded-2xl bg-[#2E7D6B] hover:bg-[#236355] text-white text-xs font-extrabold shadow-md flex items-center gap-2 transition shrink-0"
          >
            <Target className="w-4 h-4" />
            <span>Open Interactive Vision Modal</span>
          </button>
        </div>

        {/* Trilingual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Sinhala Card */}
          <div className="bg-white dark:bg-slate-800 p-7 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-md space-y-4 flex flex-col justify-between group hover:border-[#2E7D6B] transition">
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-[#2E7D6B] text-white font-extrabold text-xs">
                දැක්ම (Sinhala)
              </span>
              <div className="text-4xl text-[#2E7D6B] font-serif leading-none opacity-40">“</div>
              <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed -mt-3">
                ප්‍රජා සෞඛ්‍ය සේවයේ ප්‍රමුඛයා වීම
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-700">
                <strong>මෙහෙවර:</strong> සුවපත් ප්‍රජාවක් උදෙසා උසස් සෞඛ්‍ය සංරක්ෂණ සහ රෝග නිවාරණ සේවාවක් සැලසීම.
              </p>
            </div>
          </div>

          {/* English Card */}
          <div className="bg-white dark:bg-slate-800 p-7 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-md space-y-4 flex flex-col justify-between group hover:border-[#2E7D6B] transition">
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-[#2E7D6B] text-white font-extrabold text-xs uppercase tracking-wider">
                VISION (English)
              </span>
              <div className="text-4xl text-[#2E7D6B] font-serif leading-none opacity-40">“</div>
              <p className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white leading-relaxed -mt-3">
                To become the leading provider of community health service
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-700">
                <strong>MISSION:</strong> To deliver high-quality preventative and community healthcare services to achieve a healthy Buttala community.
              </p>
            </div>
          </div>

          {/* Tamil Card */}
          <div className="bg-white dark:bg-slate-800 p-7 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-md space-y-4 flex flex-col justify-between group hover:border-[#BE185D] transition">
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-[#BE185D] text-white font-extrabold text-xs">
                பார்வை (Tamil)
              </span>
              <div className="text-4xl text-[#BE185D] font-serif leading-none opacity-40">“</div>
              <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed -mt-3">
                உயர்தர சமூக சுகாதார சேவையை வழங்குவதில் ஒரு முன்னணி முகமாக இருப்பது
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-700">
                <strong>நோக்கம்:</strong> மக்களுக்கு சிறந்த தடுப்பு සහ சுகாதார சேவைகளை வழங்குதல்.
              </p>
            </div>
          </div>

        </div>

      </section>

      {/* ------------------------------------------------------------- */}
      {/* MOH AREA PROFILE & ORGANIZATIONAL TREE CHART SECTION */}
      {/* ------------------------------------------------------------- */}
      <div id="profile">
        <MohAreaProfile />
      </div>

      {/* Healthcare Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-600 flex items-center justify-center font-bold">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Maternal & Child Care</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Public Health Midwives (PHMs) provide home visits, prenatal care, nutrition supplements, and early child development monitoring.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Vector & Dengue Control</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Rigorous larviciding, premises inspection, fogging, and law enforcement under the Mosquito Breeding Act.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Public Health Inspectors (PHI)</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Environmental sanitation, food safety inspections, water testing, school medical services, and epidemic response.
          </p>
        </div>
      </div>

    </div>
  );
};
