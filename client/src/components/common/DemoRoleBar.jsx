import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Shield, UserCheck, Stethoscope, Eye, User } from 'lucide-react';

export const DemoRoleBar = () => {
  const { user, switchRole } = useAuth();
  const currentRole = user ? user.role : 'PUBLIC';

  const roles = [
    { key: 'PUBLIC', label: 'Public Visitor', icon: Eye, bg: 'bg-slate-700' },
    { key: 'CITIZEN', label: 'Registered Citizen', icon: User, bg: 'bg-emerald-600' },
    { key: 'STAFF', label: 'MOH Doctor / Staff', icon: Stethoscope, bg: 'bg-teal-600' },
    { key: 'PHI', label: 'PHI Inspector', icon: Shield, bg: 'bg-amber-600' },
    { key: 'ADMIN', label: 'Central Admin', icon: UserCheck, bg: 'bg-blue-600' }
  ];

  return (
    <div className="bg-slate-950 text-slate-200 py-1.5 px-4 text-xs font-medium border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 z-50">
      <div className="flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        <span className="text-emerald-400 font-semibold tracking-wider uppercase">Demo Role Tester:</span>
        <span className="text-slate-400 hidden sm:inline">Switch views instantly to test features:</span>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
        {roles.map(r => {
          const Icon = r.icon;
          const isActive = currentRole === r.key;
          return (
            <button
              key={r.key}
              onClick={() => switchRole(r.key)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                isActive 
                  ? `${r.bg} text-white font-bold shadow-sm ring-1 ring-white/30 scale-105` 
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{r.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
