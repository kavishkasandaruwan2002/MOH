import React from 'react';
import { Download, FileText, CheckCircle2, Shield } from 'lucide-react';

export const Downloads = () => {
  const files = [
    { title: "National Immunization Schedule Chart (2026)", type: "PDF", size: "1.8 MB", category: "Vaccination" },
    { title: "MOH Clinic Patient Registration Form H-508", type: "PDF", size: "450 KB", category: "Forms" },
    { title: "Dengue Prevention & Premises Self-Inspection Checklist", type: "PDF", size: "820 KB", category: "Dengue Control" },
    { title: "PHI Environmental Complaint Lodgement Form", type: "PDF", size: "320 KB", category: "PHI Forms" },
    { title: "Maternal Health Record Book Guidelines (Mother & Child)", type: "PDF", size: "3.2 MB", category: "Maternal Care" },
    { title: "Anti-Rabies Vaccination (ARV) First Aid Protocol", type: "PDF", size: "610 KB", category: "First Aid" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-2">
        <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 font-bold text-xs uppercase tracking-wider">
          Official Documents & PDF Forms
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          MOH Public Downloads & Form Templates
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Download official Ministry of Health forms, Dengue checklists, and immunization guides.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {files.map((f, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">{f.title}</h3>
              <p className="text-[11px] text-slate-500 font-mono">{f.category} • {f.type} • {f.size}</p>
            </div>

            <button
              onClick={() => alert(`Downloading ${f.title}...`)}
              className="mt-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download File</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
