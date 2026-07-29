import React from 'react';
import { seedEmergencyNumbers } from '../data/mohSeedData.js';
import { PhoneCall, ShieldAlert, Ambulance, Flame, Shield, AlertTriangle, MapPin } from 'lucide-react';

export const Emergency = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2 max-w-3xl mx-auto">
        <span className="px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 font-bold text-xs uppercase tracking-wider">
          24/7 National Emergency Directory
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Sri Lanka Health & Emergency Contacts
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Instant 1-tap call access for Suwa Seriya free ambulance, poison control, Dengue control, police, and fire services.
        </p>
      </div>

      {/* Primary Highlight Card: Suwa Seriya 1990 */}
      <div className="bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase">
            <Ambulance className="w-4 h-4" />
            <span>Toll-Free Islandwide Ambulance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold">Suwa Seriya Ambulance 1990</h2>
          <p className="text-xs sm:text-sm text-rose-100 max-w-xl">
            Free pre-hospital emergency care equipped with EMT staff, oxygen, and ECG monitoring. Dispatched immediately to your GPS location.
          </p>
        </div>

        <a
          href="tel:1990"
          className="px-8 py-4 bg-white text-rose-600 rounded-2xl font-extrabold text-xl shadow-xl hover:scale-105 transition flex items-center gap-3 shrink-0"
        >
          <PhoneCall className="w-6 h-6 animate-bounce" />
          <span>DIAL 1990 NOW</span>
        </a>
      </div>

      {/* Grid of Emergency Hotlines */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {seedEmergencyNumbers.map((item, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 flex items-center justify-center font-bold">
                <PhoneCall className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">{item.name}</h3>
              <p className="text-xs text-slate-500">{item.available}</p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <span className="text-xl font-extrabold font-mono text-rose-600">{item.number}</span>
              <a
                href={`tel:${item.number.replace(/\s+/g, '')}`}
                className="px-4 py-2 bg-rose-600 text-white font-bold text-xs rounded-xl hover:bg-rose-700 transition"
              >
                Call Hotline
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
