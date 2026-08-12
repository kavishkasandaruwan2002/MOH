import React, { useState } from 'react';
import { seedImmunizationSchedule } from '../data/mohSeedData.js';
import { QRCodeSVG } from 'qrcode.react';
import { Syringe, CheckCircle2, ShieldCheck, Download, Calendar, Baby, Award, Clock, ArrowRight } from 'lucide-react';

export const Vaccination = () => {
  const [activeTab, setActiveTab] = useState('schedule'); // 'schedule' or 'digitalCard'
  const [childName, setChildName] = useState('Kavindu Jayasinghe');
  const [childDob, setChildDob] = useState('2024-05-12');
  const [motherNic, setMotherNic] = useState('199265432109');
  const [mohDivision, setMohDivision] = useState('Colombo Central');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Title */}
      <div className="text-center space-y-2 max-w-3xl mx-auto">
        <span className="px-3 py-1 rounded-full bg-moh-100 dark:bg-moh-900/60 text-moh-700 dark:text-moh-300 font-bold text-xs uppercase tracking-wider">
          National Immunization Program (NIP)
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Sri Lanka Child & Adult Vaccine Portal
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Track official vaccination schedules administered at all MOH clinics and generate your verified Digital Immunization Record card.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex justify-center">
        <div className="bg-slate-200 dark:bg-slate-800 p-1.5 rounded-2xl flex gap-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-5 py-2.5 rounded-xl transition ${
              activeTab === 'schedule'
                ? 'bg-moh-600 text-white shadow-md'
                : 'text-slate-700 dark:text-slate-300 hover:text-white'
            }`}
          >
            National Vaccine Schedule Roadmap
          </button>
          <button
            onClick={() => setActiveTab('digitalCard')}
            className={`px-5 py-2.5 rounded-xl transition ${
              activeTab === 'digitalCard'
                ? 'bg-moh-600 text-white shadow-md'
                : 'text-slate-700 dark:text-slate-300 hover:text-white'
            }`}
          >
            Digital Immunization Card Generator
          </button>
        </div>
      </div>

      {/* Tab 1: Immunization Roadmap */}
      {activeTab === 'schedule' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 dark:border-slate-700/80">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Syringe className="w-5 h-5 text-moh-600" />
              <span>Official Immunization Timeline</span>
            </h2>

            <div className="relative border-l-2 border-moh-500/30 pl-6 ml-4 space-y-6">
              {seedImmunizationSchedule.map((item, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-moh-600 ring-4 ring-white dark:ring-slate-800"></div>
                  
                  <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-extrabold text-sm text-moh-700 dark:text-moh-300">
                        {item.age}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-mono text-[10px] font-bold">
                        CODE: {item.code}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                      {item.vaccine}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Target Diseases: <b>{item.target}</b> • Administration: {item.route}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Digital Immunization Card */}
      {activeTab === 'digitalCard' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Card Inputs */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Enter Records to Preview Card</h3>
            
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Child / Recipient Name:</label>
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                className="w-full p-2.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-moh-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Date of Birth:</label>
              <input
                type="date"
                value={childDob}
                onChange={(e) => setChildDob(e.target.value)}
                className="w-full p-2.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-moh-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Mother's / Guardian's NIC:</label>
              <input
                type="text"
                value={motherNic}
                onChange={(e) => setMotherNic(e.target.value)}
                className="w-full p-2.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-moh-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Registered MOH Division:</label>
              <input
                type="text"
                value={mohDivision}
                onChange={(e) => setMohDivision(e.target.value)}
                className="w-full p-2.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-moh-500"
              />
            </div>
          </div>

          {/* Card Preview */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-gradient-to-br from-moh-800 via-moh-700 to-slate-900 text-white rounded-3xl p-6 shadow-2xl border border-white/20 relative space-y-6">
              
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                    <Award className="w-6 h-6 text-amber-300" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm tracking-tight text-white">MINISTRY OF HEALTH SRI LANKA</h3>
                    <p className="text-[11px] text-teal-200">DIGITAL IMMUNIZATION RECORD</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-extrabold text-[10px] uppercase border border-emerald-400/30">
                  VERIFIED RECORD
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Child Name</span>
                  <span className="font-bold text-white text-sm">{childName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Date of Birth</span>
                  <span className="font-bold text-white text-sm">{childDob}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Guardian NIC</span>
                  <span className="font-bold text-white">{motherNic}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">MOH Division</span>
                  <span className="font-bold text-white">{mohDivision}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs border-t border-white/15 pt-4">
                <span className="text-slate-300 font-bold block mb-1">Administered Vaccine Badges:</span>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded-xl bg-white/10 flex items-center justify-between text-[11px]">
                    <span>BCG Tuberculosis</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="p-2 rounded-xl bg-white/10 flex items-center justify-between text-[11px]">
                    <span>PENTA 1, 2, 3</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="p-2 rounded-xl bg-white/10 flex items-center justify-between text-[11px]">
                    <span>MMR 1 (9 Months)</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="p-2 rounded-xl bg-white/10 flex items-center justify-between text-[11px]">
                    <span>Live JE Vaccine</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="p-2 bg-white rounded-xl shadow-md">
                  <QRCodeSVG value={`MOH-SL-VACCINE-RECORD-${childName}-${motherNic}`} size={80} />
                </div>
                <div className="text-right text-[11px] text-slate-300">
                  <div>Issued by MOH Sri Lanka</div>
                  <div className="font-mono text-emerald-300 font-bold">REC-2026-VAX-884</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
};
