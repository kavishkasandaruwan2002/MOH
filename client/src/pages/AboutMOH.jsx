import React from 'react';
import { Cross, ShieldCheck, Heart, Users, Award, MapPin } from 'lucide-react';

export const AboutMOH = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Hero */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-moh-600 to-teal-400 text-white flex items-center justify-center mx-auto shadow-lg">
          <Cross className="w-8 h-8 stroke-[2.5]" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          About Medical Officer of Health (MOH) Offices Sri Lanka
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          The primary healthcare backbone of Sri Lanka. MOH offices provide comprehensive maternal and child health, disease prevention, vector control, food sanitation, and environmental health across 350+ divisions islandwide.
        </p>
      </div>

      {/* Pillars */}
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
