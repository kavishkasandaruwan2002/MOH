import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Users, ChevronDown, ChevronRight, Layers, 
  ShieldCheck, Stethoscope, Award, MapPin, User, Activity, Sparkles, Home
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const MohAreaProfile = () => {
  const [activeBranch, setActiveBranch] = useState('ALL');

  return (
    <section id="moh-area-profile" className="scroll-mt-24 space-y-10 font-sans">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
        <Link to="/" className="hover:text-[#2E7D6B] flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/about" className="hover:text-[#2E7D6B]">About Us</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#2E7D6B] dark:text-[#4DB6AC] font-bold">MOH Area Profile & Organizational Structure</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1a237e] via-[#2E7D6B] to-teal-900 text-white p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden border border-white/10 space-y-4">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-[#4DB6AC]/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-extrabold text-teal-100 shadow-xs">
          <Layers className="w-4 h-4 text-amber-300" />
          <span>MOH Office – Buttala Administrative Structure</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          සංවිධාන ව්‍යුහය
          <span className="block text-lg sm:text-2xl font-bold text-teal-200 mt-1">
            Organizational Structure — MOH Office Buttala
          </span>
        </h1>

        <p className="text-xs sm:text-sm text-teal-100 max-w-3xl leading-relaxed font-medium">
          Hierarchical organizational profile and administrative team tree covering medical officers, public health inspectors (PHI), nursing sisters, dental surgeons, and field support staff across 18 PHM divisions.
        </p>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* HIERARCHICAL ORGANIZATIONAL TREE CHART */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-slate-900/95 text-white p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl space-y-12 relative overflow-hidden">
        
        {/* Ambient Wave Accents */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#2E7D6B]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#1a237e]/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Tree Header / Root Node: Medical Officer of Health (MOH) */}
        <div className="flex flex-col items-center justify-center relative z-10">
          <motion.div 
            whileHover={{ scale: 1.04 }}
            className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-950 p-5 px-8 rounded-2xl shadow-2xl border-2 border-amber-300 text-center max-w-md w-full relative group cursor-pointer"
          >
            <span className="px-3 py-0.5 rounded-full bg-slate-950 text-amber-400 font-black text-[10px] uppercase tracking-wider mb-1 inline-block">
              Chief Administrative Head
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
              සෞඛ්‍ය වෛද්‍ය නිලධාරී
            </h2>
            <p className="text-xs font-bold text-slate-900 mt-0.5">
              Medical Officer of Health (MOH) — Buttala
            </p>
          </motion.div>

          {/* Root Vertical Connector */}
          <div className="w-1 h-10 bg-gradient-to-b from-amber-400 to-[#2E7D6B] my-1"></div>
          <div className="w-full max-w-4xl h-0.5 bg-gradient-to-r from-[#1a237e] via-[#2E7D6B] to-[#0d47a1]"></div>
        </div>

        {/* Two Main Branches Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 relative z-10">

          {/* ------------------------------------------------------------- */}
          {/* BRANCH 1 (Left): Additional MOH & Public Health / Field Branch */}
          {/* ------------------------------------------------------------- */}
          <div className="space-y-6 relative">
            
            {/* Top Connector to Branch 1 */}
            <div className="hidden lg:block absolute -top-10 left-1/2 -translate-x-1/2 w-0.5 h-10 bg-[#2E7D6B]"></div>

            {/* Branch 1 Header Box */}
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-r from-[#1a237e] to-[#0d47a1] text-white p-5 rounded-2xl shadow-xl border border-blue-400/40 text-center space-y-1"
            >
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-200 font-extrabold text-[10px] uppercase">
                Public Health & Field Division
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                අතිරේක සෞඛ්‍ය වෛද්‍ය නිලධාරී
              </h3>
              <p className="text-xs text-blue-200 font-bold">
                Additional Medical Officer of Health
              </p>
            </motion.div>

            {/* Sub-branch Nodes Container */}
            <div className="space-y-5 pl-4 sm:pl-6 border-l-2 border-[#2E7D6B]/50 ml-4 sm:ml-8">

              {/* Sub-node 1: Administrative PHI & Team */}
              <div className="space-y-3 relative">
                <div className="absolute -left-[17px] top-4 w-4 h-0.5 bg-[#2E7D6B]"></div>
                
                <motion.div 
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="bg-gradient-to-r from-[#2E7D6B] to-[#236355] p-4 rounded-xl shadow-md border border-teal-400/30 text-white space-y-1"
                >
                  <h4 className="font-extrabold text-sm sm:text-base text-white">
                    පරිපාලන මහජන සෞඛ්‍ය පරීක්ෂක
                  </h4>
                  <p className="text-xs text-teal-100 font-semibold">Administrative Public Health Inspector (SPHI)</p>
                </motion.div>

                {/* Sub-sub branches */}
                <div className="pl-6 border-l-2 border-teal-500/40 space-y-2.5 ml-4">
                  <div className="bg-slate-800/90 p-3 rounded-lg border border-slate-700 space-y-0.5 hover:bg-slate-800 transition">
                    <p className="font-bold text-xs text-teal-300">මහජන සෞඛ්‍ය පරීක්ෂක (Public Health Inspector - PHI)</p>
                    <p className="text-[11px] text-slate-300 pl-3">↳ ඉදිරි යන්න / ක්‍රියාකරු (Field Officer / Operator)</p>
                  </div>

                  <div className="bg-slate-800/90 p-3 rounded-lg border border-slate-700 hover:bg-slate-800 transition">
                    <p className="font-bold text-xs text-slate-200">කාර්යාලය වෙනුවෙන් (Office Representative / Clerk)</p>
                  </div>
                </div>
              </div>

              {/* Sub-node 2: Public Health Nursing Sister & Team */}
              <div className="space-y-3 relative">
                <div className="absolute -left-[17px] top-4 w-4 h-0.5 bg-[#2E7D6B]"></div>
                
                <motion.div 
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="bg-gradient-to-r from-[#2E7D6B] to-emerald-800 p-4 rounded-xl shadow-md border border-emerald-400/30 text-white space-y-1"
                >
                  <h4 className="font-extrabold text-sm sm:text-base text-white">
                    මහජන සෞඛ්‍ය හෙද සොයුරිය
                  </h4>
                  <p className="text-xs text-emerald-100 font-semibold">Public Health Nursing Sister (PHNS)</p>
                </motion.div>

                {/* Sub-sub branches */}
                <div className="pl-6 border-l-2 border-emerald-500/40 space-y-2.5 ml-4">
                  <div className="bg-slate-800/90 p-3 rounded-lg border border-slate-700 space-y-0.5 hover:bg-slate-800 transition">
                    <p className="font-bold text-xs text-emerald-300">ජ්‍යෙෂ්ඨ මහජන සෞඛ්‍ය හෙද සොයුරිය (Senior PH Midwife / Sister)</p>
                    <p className="text-[11px] text-slate-300 pl-3">↳ සහායක නිලධාරී (Support / Midwifery Assistant)</p>
                  </div>
                </div>
              </div>

              {/* Sub-node 3: NDT Vector Control Officer */}
              <div className="relative">
                <div className="absolute -left-[17px] top-4 w-4 h-0.5 bg-[#2E7D6B]"></div>
                <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700 hover:border-teal-500 transition">
                  <p className="font-bold text-xs sm:text-sm text-[#4DB6AC]">නිට් විද්‍යාවතී සඵලාව (NDT / Vector Control Officer)</p>
                </div>
              </div>

              {/* Sub-node 4: Payroll & Admin */}
              <div className="relative">
                <div className="absolute -left-[17px] top-4 w-4 h-0.5 bg-[#2E7D6B]"></div>
                <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700 hover:border-teal-500 transition">
                  <p className="font-bold text-xs sm:text-sm text-slate-200">වැටුප් සඵලාව / සොයුරිය (Payroll & Admin Officer)</p>
                </div>
              </div>

              {/* Sub-node 5: Support Officer */}
              <div className="relative">
                <div className="absolute -left-[17px] top-4 w-4 h-0.5 bg-[#2E7D6B]"></div>
                <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700 hover:border-teal-500 transition">
                  <p className="font-bold text-xs sm:text-sm text-slate-200">තිලධාරි සොයුරිය (Thiladhari / Support Officer)</p>
                </div>
              </div>

            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* BRANCH 2 (Right): Dental Surgeon & Administrative Services */}
          {/* ------------------------------------------------------------- */}
          <div className="space-y-6 relative">
            
            {/* Top Connector to Branch 2 */}
            <div className="hidden lg:block absolute -top-10 left-1/2 -translate-x-1/2 w-0.5 h-10 bg-[#0d47a1]"></div>

            {/* Branch 2 Header Box */}
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-r from-[#0d47a1] to-[#1e88e5] text-white p-5 rounded-2xl shadow-xl border border-blue-400/40 text-center space-y-1"
            >
              <span className="px-2.5 py-0.5 rounded-full bg-blue-900/50 text-blue-200 font-extrabold text-[10px] uppercase">
                Dental Care & Admin Services
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                දන්ත ශල්‍ය වෛද්‍ය නිලධාරී
              </h3>
              <p className="text-xs text-blue-100 font-bold">
                Dental Surgeon / Dental Medical Officer
              </p>
            </motion.div>

            {/* Sub-branch Nodes Container */}
            <div className="space-y-5 pl-4 sm:pl-6 border-l-2 border-blue-500/50 ml-4 sm:ml-8">

              {/* Sub-node 1: Full Assistant Officer */}
              <div className="relative">
                <div className="absolute -left-[17px] top-4 w-4 h-0.5 bg-blue-500"></div>
                <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700 hover:border-blue-400 transition">
                  <p className="font-bold text-xs sm:text-sm text-blue-300">සම්පූර්ණ නිලධාරී (Full Officer / Dental Assistant)</p>
                </div>
              </div>

              {/* Sub-node 2: Management Services Officer */}
              <div className="relative">
                <div className="absolute -left-[17px] top-4 w-4 h-0.5 bg-blue-500"></div>
                <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700 hover:border-blue-400 transition">
                  <p className="font-bold text-xs sm:text-sm text-slate-200">කළමනාකරණ සේවා නිලධාරී (Management Services Officer - MSO)</p>
                </div>
              </div>

              {/* Sub-node 3: School Dental Therapist & Staff */}
              <div className="space-y-3 relative">
                <div className="absolute -left-[17px] top-4 w-4 h-0.5 bg-blue-500"></div>
                
                <motion.div 
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="bg-gradient-to-r from-blue-700 to-indigo-800 p-4 rounded-xl shadow-md border border-blue-400/30 text-white space-y-1"
                >
                  <h4 className="font-extrabold text-sm sm:text-base text-white">
                    පාසල් දන්ත චිකිත්සක
                  </h4>
                  <p className="text-xs text-blue-100 font-semibold">School Dental Therapist (SDT)</p>
                </motion.div>

                {/* Sub-sub branches */}
                <div className="pl-6 border-l-2 border-indigo-500/40 space-y-2.5 ml-4">
                  <div className="bg-slate-800/90 p-3 rounded-lg border border-slate-700 hover:bg-slate-800 transition">
                    <p className="font-bold text-xs text-indigo-300">රියදුරු (Official Driver)</p>
                  </div>
                  <div className="bg-slate-800/90 p-3 rounded-lg border border-slate-700 hover:bg-slate-800 transition">
                    <p className="font-bold text-xs text-indigo-300">මුරකරුවා (Watchman / Security Officer)</p>
                  </div>
                </div>
              </div>

              {/* Sub-node 4: Health Work Assistant */}
              <div className="relative">
                <div className="absolute -left-[17px] top-4 w-4 h-0.5 bg-blue-500"></div>
                <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700 hover:border-blue-400 transition">
                  <p className="font-bold text-xs sm:text-sm text-slate-200">සෞඛ්‍ය කාර්ය සහායක (Health Work Assistant - HWA)</p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
