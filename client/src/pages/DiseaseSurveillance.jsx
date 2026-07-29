import React from 'react';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { seedHotspots } from '../data/mohSeedData.js';
import { Activity, AlertTriangle, Bug, ShieldCheck, Flame, Droplets, MapPin } from 'lucide-react';

export const DiseaseSurveillance = () => {
  const dengueTrendData = [
    { week: "Week 24", colombo: 95, gampaha: 70, kandy: 45, galle: 30 },
    { week: "Week 25", colombo: 110, gampaha: 85, kandy: 52, galle: 35 },
    { week: "Week 26", colombo: 140, gampaha: 110, kandy: 68, galle: 42 },
    { week: "Week 27", colombo: 185, gampaha: 145, kandy: 90, galle: 58 },
    { week: "Week 28", colombo: 220, gampaha: 175, kandy: 115, galle: 72 },
    { week: "Week 29", colombo: 195, gampaha: 160, kandy: 105, galle: 65 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div className="space-y-2">
        <span className="px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 font-bold text-xs uppercase tracking-wider">
          Epidemiology Unit Sri Lanka
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Dengue & Disease Surveillance Center
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
          Real-time mosquito breeding indices (Breteau Index), district-wide epidemic trends, and fogging schedule tracking.
        </p>
      </div>

      {/* Epidemic Trend Chart Component */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 dark:border-slate-700/80 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-rose-500" />
              <span>Weekly Dengue Fever Case Incidence by District</span>
            </h2>
            <p className="text-xs text-slate-500">Source: Ministry of Health Epidemiology Unit Surveillance Data</p>
          </div>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-xs rounded-lg border border-rose-500/20">
            Monsoon Peak Period
          </span>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dengueTrendData}>
              <defs>
                <linearGradient id="colomboColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#e11d48" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#e11d48" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="gampahaColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="week" stroke="#888888" fontSize={11} />
              <YAxis stroke="#888888" fontSize={11} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="colombo" name="Colombo District" stroke="#e11d48" fillOpacity={1} fill="url(#colomboColor)" />
              <Area type="monotone" dataKey="gampaha" name="Gampaha District" stroke="#f59e0b" fillOpacity={1} fill="url(#gampahaColor)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Vector Hotspots Table */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-700 space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Bug className="w-5 h-5 text-amber-500" />
          <span>Active High-Risk Mosquito Breeding Zones</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 uppercase font-bold text-[10px]">
              <tr>
                <th className="p-3">Location & Zone</th>
                <th className="p-3">District</th>
                <th className="p-3">Risk Level</th>
                <th className="p-3">Monthly Cases</th>
                <th className="p-3">Breteau Index</th>
                <th className="p-3">PHI Vector Control Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-medium text-slate-700 dark:text-slate-200">
              {seedHotspots.map(hs => (
                <tr key={hs.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                  <td className="p-3 font-bold text-slate-900 dark:text-white">{hs.location}</td>
                  <td className="p-3">{hs.district}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded font-extrabold text-[10px] ${
                      hs.riskLevel === 'HIGH' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {hs.riskLevel}
                    </span>
                  </td>
                  <td className="p-3 font-bold">{hs.dengueCasesThisMonth}</td>
                  <td className="p-3 font-mono">{hs.breedingIndex}</td>
                  <td className="p-3 text-moh-600 font-semibold">{hs.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
