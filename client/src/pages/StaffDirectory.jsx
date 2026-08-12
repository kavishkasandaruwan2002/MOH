import React from 'react';
import { useData } from '../context/DataContext';
import { Stethoscope, Phone, Mail, Award, MapPin } from 'lucide-react';

export const StaffDirectory = () => {
  const { teamMembers } = useData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-2">
        <span className="px-3 py-1 rounded-full bg-moh-100 dark:bg-moh-900/60 text-moh-700 dark:text-moh-300 font-bold text-xs uppercase tracking-wider">
          MOH Medical Leadership
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          MOH Officers & Consultant Directory
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
          List of chief Medical Officers of Health, epidemiologists, and Public Health Inspectors across Sri Lanka.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map(doc => (
          <div key={doc.id || doc.name} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-moh-600 to-teal-500 text-white flex items-center justify-center font-bold text-lg">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">{doc.name}</h3>
                <p className="text-xs text-moh-600 dark:text-teal-400 font-bold">{doc.role || doc.specialty}</p>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-700">
              <div><b>Qualifications:</b> {doc.qualifications || 'Medical Professional'}</div>
              <div><b>Experience:</b> {doc.experience || '5 years'}</div>
              <div><b>MOH Division:</b> {doc.division || 'Buttala'}</div>
              {doc.bio && <div className="text-[11px] text-slate-500 pt-1 italic">{doc.bio}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
